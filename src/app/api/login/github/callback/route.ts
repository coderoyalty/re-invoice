import {
  createGithubUser,
  getAccountByGitHubId,
} from "@/app/data-access/accounts";
import { github } from "@/lib";
import { setSession } from "@/lib/server/session";
import { OAuth2RequestError } from "arctic";
import { cookies } from "next/headers";

export interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  email: string;
}

interface GitHubEmail {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string | null;
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("github_oauth_state")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);

    const resp = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken()}`,
      },
    });

    const githubUser: GitHubUser = await resp.json();

    const existingAccount = await getAccountByGitHubId(githubUser.id);

    if (existingAccount) {
      await setSession(existingAccount.userId);
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/dashboard",
        },
      });
    }

    if (!githubUser.email) {
      const githubUserEmailResponse = await fetch(
        "https://api.github.com/user/emails",
        {
          headers: {
            Authorization: `Bearer ${tokens.accessToken()}`,
          },
        }
      );
      const githubUserEmails: GitHubEmail[] =
        await githubUserEmailResponse.json();

      const githubEmail = githubUserEmails.find(
        (userEmail) => userEmail.primary
      );
      githubUser.email = githubEmail!.email;
    }

    const userId = await createGithubUser(githubUser);
    await setSession(userId);

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/dashboard",
      },
    });
  } catch (err) {
    console.error(err);

    if (err instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}
