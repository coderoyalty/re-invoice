import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

interface HasPermissionOptions {
  userId: string;
  orgId: string;
  action: string;
  entity: string;
  entityId?: string; // For ownership checks
}

type CheckScopeFn = (
  scope: string,
  userId: string,
  entityId?: string
) => Promise<boolean>;

export async function hasPermission(
  { userId, orgId, action, entity, entityId }: HasPermissionOptions,
  checkScope?: CheckScopeFn
): Promise<boolean> {
  // 1. Get user's role in organisation
  const membership = await prisma.organisationMember.findUnique({
    where: {
      userId_orgId: { userId, orgId },
    },
    include: {
      role: {
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });

  if (!membership?.role) return false;

  // 2. check for matching permission

  const hasDirectPermission = membership.role.permissions.some((rp) => {
    const p = rp.permission;

    const matchesAction = p.action === action;
    const matchesEntity = p.entity === entity;
    const matchesScope = checkScope
      ? checkScope(p.scope, userId, entityId).then((value) => value)
      : true;

    return matchesAction && matchesEntity && matchesScope;
  });

  return hasDirectPermission;
}

type CheckPermissionOptions = Omit<HasPermissionOptions, "userId">;

export async function checkPermission(
  options: CheckPermissionOptions,
  checkScope?: CheckScopeFn
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  if (!options.orgId) {
    throw new Error("Organisation context required");
  }

  return hasPermission({ userId, ...options }, checkScope);
}
