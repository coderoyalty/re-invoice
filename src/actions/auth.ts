"use server";
import prisma from "@/lib/prisma";
import { deleteSessionCookie, getSessionCookie } from "@/lib/server/cookies";
import { invalidateSession, setSession } from "@/lib/server/session";
import { createAccount } from "@/lib/users/data";
import { LoginError } from "@/use-cases/errors";
import { verifyPassword } from "@/utils/password";

export async function signUp(formData: FormData) {
  const { displayName, email, password } = Object.fromEntries(
    formData.entries()
  );
  const data = {
    displayName: displayName! as string,
    email: email! as string,
    password: password! as string,
  };

  try {
    const user = await createAccount(data);
    return { user };
  } catch (err: any) {
    return {
      error: err.message as string,
    };
  }
}

export async function signIn(data: { email: string; password: string }) {
  const result = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
    include: {
      defaultOrganisation: true,
    },
  });

  if (result === null) {
    throw new LoginError();
  }

  if (!result.emailConfirmedAt) {
    throw new LoginError("Email address has not been confirmed");
  }

  const validPassword = await verifyPassword(data.password, result.password);
  if (!validPassword) {
    throw new LoginError("Email address has not been confirmed");
  }
  return result.id;
}

export async function signOut() {
  const token = getSessionCookie();
  if (!token) {
    return;
  }
  deleteSessionCookie();
  await invalidateSession(token);
}
