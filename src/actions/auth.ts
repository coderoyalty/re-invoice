"use server";
import prisma from "@/lib/prisma";
import {
  deleteSessionCookie,
  getSessionCookie,
  setSessionCookie,
} from "@/lib/server/cookies";
import {
  createSession,
  generateSessionToken,
  invalidateSession,
} from "@/lib/server/session";
import { createAccount } from "@/lib/users/data";
import { verifyPassword } from "@/utils/password";
import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
  const { displayName, email, password } = Object.fromEntries(
    formData.entries()
  );
  const data = {
    displayName: displayName! as string,
    email: email! as string,
    password: password! as string,
  };

  const user = await createAccount(data);

  redirect("/login");
}

export async function signIn(formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
    include: {
      defaultOrganisation: true,
    },
  });

  if (result === null) {
    throw new Error("Incorrect email or password");
  }

  if (!result.emailConfirmedAt) {
    throw new Error("Email address has not been confirmed");
  }

  const validPassword = await verifyPassword(data.password, result.password);
  if (!validPassword) {
    throw new Error("Incorrect email or password");
  }

  const userAgent = "";
  const ipAddress = "";

  const token = generateSessionToken();
  const session = await createSession(token, result.id, {
    userAgent,
    ipAddress,
  });

  setSessionCookie(token, session.expiresAt);

  redirect("/dashboard");
}

export async function signOut() {
  const token = getSessionCookie();
  if (!token) {
    return;
  }
  deleteSessionCookie();
  await invalidateSession(token);
}
