import type { User, Session } from "@prisma/client";
import { base32, encodeHex } from "oslo/encoding";
import { sha256 } from "oslo/crypto";
import prisma from "./prisma";

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
  //TODO
  const sessionId = encodeHex(await sha256(base32.decode(token)));
  const sessionData = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    refreshedAt: null,
    ...data,
  };

  const session = prisma.session.create({
    data: {
      ...sessionData,
    },
  });

  return session;
}

export async function validateSessionToken(
  token: string
): Promise<SessionInvalidationResult> {
  const sessionId = encodeHex(await sha256(base32.decode(token)));

  const result = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
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

export async function invalidateSession(sessionId: string): Promise<void> {
  await prisma.session.delete({
    where: {
      id: sessionId,
    },
  });
}

export type SessionInvalidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };
