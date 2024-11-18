import prisma from "@/lib/prisma";
import { GitHubUser } from "../api/login/github/callback/route";

export const getAccountByGitHubId = async (githubId: number) => {
  return await prisma.account.findFirst({
    where: {
      githubId: githubId,
      provider: "github",
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
};

export const createAccountViaGithub = async (
  userId: string,
  githubId: number
) => {
  const existingAccount = await getAccountByGitHubId(githubId);
  if (existingAccount) {
    return;
  }

  await prisma.account.create({
    data: {
      provider: "github",
      githubId: githubId,
      userId: userId,
    },
  });
};

export const createGithubUser = async ({
  email,
  avatar_url,
  id: githubId,
  login: displayName,
}: GitHubUser) => {
  let user = await getUserByEmail(email);

  if (!user) {
    user = await prisma.user.create({
      data: {
        displayName,
        avatarUrl: avatar_url,
        email: email,
        password: "",
        emailConfirmedAt: new Date(),
      },
    });
  }

  await createAccountViaGithub(user.id, githubId);

  return user.id;
};
