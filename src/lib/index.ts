import { cache } from "react";
import * as session from "@/lib/server/session";
import { getSessionCookie } from "@/lib/server/cookies";

export const auth = cache(async () => {
  const sessionId = getSessionCookie();

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await session.validateSessionToken(sessionId);
  return result;
});
