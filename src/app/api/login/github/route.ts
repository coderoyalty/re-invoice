import { github } from "@/lib";
import { generateState } from "arctic";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
  try {
    const state = generateState();
    const url = github.createAuthorizationURL(state, ["user:email"]);

    cookies().set("github_oauth_state", state, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 60 * 10,
      sameSite: "lax",
    });

    return Response.redirect(url);
  } catch (error) {
    return new Response("Failed to initialize GitHub login", { status: 500 });
  }
}
