import { cache } from "react";
import * as session from "@/lib/server/session";
import { getSessionCookie } from "@/lib/server/cookies";
import { AuthenticationError } from "@/use-cases/errors";

export const getCurrentUser = async () => {
  const sessionId = getSessionCookie();

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await session.validateSessionToken(sessionId);
  return result;
};

export const auth = cache(async () => {
  const { user, session } = await getCurrentUser();

  return { user, session };
});

export const assertAuth = cache(async () => {
  const { user, session } = await getCurrentUser();

  if (!user || !session) {
    throw new AuthenticationError();
  }

  return { user, session };
});
