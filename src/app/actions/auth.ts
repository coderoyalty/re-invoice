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
import { hashPassword, verifyPassword } from "@/utils/password";
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
  const result = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (result) {
    // user already exist?
    throw new Error("An account already exist with the provided email address");
  }

  data.password = await hashPassword(data.password);

  const newUser = await prisma.user.create({
    data: {
      ...data,
    },
  });

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
  });

  if (result === null) {
    throw new Error("Incorrect email or password");
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

  redirect("/");
}

export async function signOut() {
  const sessionId = getSessionCookie();
  if (!sessionId) {
    return redirect("/login");
  }
  deleteSessionCookie();
  await invalidateSession(sessionId);

  redirect("/login");
}
