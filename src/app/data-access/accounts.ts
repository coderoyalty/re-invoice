import prisma from "@/lib/prisma";
import { GitHubUser } from "../api/login/github/callback/route";
import { PublicError } from "@/use-cases/errors";

enum AuthProvider {
  EMAIL = "email",
  GITHUB = "github",
  GOOGLE = "google",
}

export const getAccountByGitHubId = async (githubId: number) => {
  return await prisma.account.findFirst({
    where: {
      githubId: githubId,
      provider: AuthProvider.GITHUB,
    },
  });
};

export const createGithubUser = async ({
  email,
  avatar_url: avatarUrl,
  id: githubId,
  login: displayName,
}: GitHubUser) => {
  if (!email || !githubId || !displayName) {
    throw new PublicError("Missing required GitHub user information");
  }

  try {
    return await prisma.$transaction(async (tx) => {
      let user = await tx.user.findUnique({
        where: { email },
      });

      if (!user) {
        user = await tx.user.create({
          data: {
            displayName,
            avatarUrl,
            email,
            password: "",
            emailConfirmedAt: new Date(),
            accounts: {
              create: {
                provider: AuthProvider.GITHUB,
                githubId,
              },
            },
          },
        });
      } else {
        await tx.account.create({
          data: {
            provider: AuthProvider.GITHUB,
            githubId,
            userId: user.id,
          },
        });
      }

      return user.id;
    });
  } catch (err) {
    throw new PublicError("Failed to create user account");
  }
};
