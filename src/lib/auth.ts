import { AuthenticationError } from "@/use-cases/errors";
import { cache } from "react";
import * as session from "@/lib/server/session";
import { getSessionCookie } from "./server/cookies";
import prisma from "./prisma";
import { createCheckAuthorization } from "./authorization";

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

export type CheckAuthorizationFn<Params> = (
  isAuthorizedParams: Params
) => boolean;

export type CheckAuthorizationWithCustomPermissions =
  CheckAuthorizationFn<CheckAuthorizationParamsWithCustomPermissions>;

export type CheckAuthorizationParamsWithCustomPermissions =
  | {
      role: "";
      permission?: never;
    }
  | {
      role?: never;
      permission: "";
    }
  | { role?: never; permission?: never };

interface SignedInAuthObject {
  sessionId: string;
  userId: string;
  orgId: string | undefined;
  orgRole: string | undefined;
}

type SignedOutAuthObject = {
  sessionId: null;
  userId: null;
  orgId: null;
  orgRole: null;
};

export function signedOutAuthObject(): SignedOutAuthObject {
  return {
    sessionId: null,
    userId: null,
    orgId: null,
    orgRole: null,
  };
}

export async function signedInAuthObject(
  user: Awaited<ReturnType<typeof getCurrentUser>>["user"] & {},
  session: Awaited<ReturnType<typeof getCurrentUser>>["session"] & {}
): Promise<SignedInAuthObject | SignedOutAuthObject> {
  const userId = user.id;
  let orgId = undefined;
  let orgRole = undefined;

  if (user.activeOrganisation?.id ?? user.defaultOrganisation?.id) {
    const organisation = await prisma.organisation.findUnique({
      where: {
        id: user.activeOrganisation?.id ?? user.defaultOrganisation?.id,
      },
      include: {
        members: {
          include: {
            role: true,
          },
        },
      },
    });

    const orgMember = organisation?.members.find(
      (member) => member.userId === user.id
    );

    orgId = organisation ? organisation.id : undefined;
    orgRole = organisation && orgMember ? orgMember.role.name : undefined;
  }

  const authObject: SignedInAuthObject = {
    sessionId: session.id,
    userId,
    orgId,
    orgRole,
  };

  return authObject;
}

type AuthObject = SignedInAuthObject | SignedOutAuthObject;

export const auth = cache(async (): Promise<AuthObject> => {
  const { user, session } = await getCurrentUser();

  if (!user) {
    return signedOutAuthObject();
  }

  return await signedInAuthObject(user, session);
});

export const assertAuth = cache(async () => {
  const { user, session } = await getCurrentUser();

  if (!user || !session) {
    throw new AuthenticationError();
  }

  return { user, session };
});
