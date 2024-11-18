import type { User, Session } from "@prisma/client";
import { base32, encodeHex } from "oslo/encoding";
import { sha256 } from "oslo/crypto";
import prisma from "../prisma";
import { setSessionCookie } from "./cookies";

export function generateSessionToken() {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = base32.encode(bytes);
  return token;
}

export async function createSession(
  token: string,
  userId: string,
  data: {
    userAgent: string;
    ipAddress: string;
  }
): Promise<Session> {
  const sessionId = encodeHex(await sha256(base32.decode(token)));
  const sessionData = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    refreshedAt: null,
    ...data,
  };

  const session = await prisma.session.create({
    data: {
      ...sessionData,
    },
  });

  return session;
}

export async function validateSessionToken(token: string) {
  const sessionId = encodeHex(await sha256(base32.decode(token)));

  const result = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: {
        select: {
          id: true,
          displayName: true,
          email: true,
          emailConfirmedAt: true,
          password: false,
          defaultOrganisation: true,
          avatarUrl: true,
        },
      },
    },
  });

  if (result == null) {
    return { session: null, user: null };
  }

  const { user, ...session } = result;

  if (Date.now() >= session.expiresAt.getTime()) {
    await prisma.session.delete({
      where: {
        id: session.id,
      },
    });

    return { session: null, user: null };
  }

  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    session.refreshedAt = new Date();
    await prisma.session.update({
      where: {
        id: session.id,
      },
      data: {
        refreshedAt: session.refreshedAt,
        expiresAt: session.expiresAt,
      },
    });
  }

  return { session, user };
}

export async function invalidateSession(token: string): Promise<void> {
  const sessionId = encodeHex(await sha256(base32.decode(token)));

  await prisma.session.delete({
    where: {
      id: sessionId,
    },
  });
}

export async function setSession(user: string) {
  const token = generateSessionToken();
  const session = await createSession(token, user, {
    userAgent: "", //TODO:
    ipAddress: "",
  });

  setSessionCookie(token, session.expiresAt);
}

export type SessionInvalidationResult = Awaited<
  ReturnType<typeof validateSessionToken>
>;
