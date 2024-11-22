"use server";

import { authenticatedAction } from "@/lib/safe-action";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { PublicError } from "@/use-cases/errors";
import { z } from "zod";
import {
  ALL_PERMISSIONS,
  SYSTEM_ROLES,
  USER_ROLE_PERMISSIONS,
} from "@/lib/permissions";

const createOrgSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["individual", "organisation"]),
});

export const createOrgAction = authenticatedAction
  .createServerAction()
  .input(createOrgSchema)
  .handler(async ({ input, ctx }) => {
    //TODO: set a max organisation limit

    const [newOrg] = await prisma.$transaction(async (tx) => {
      const newOrg = await tx.organisation.create({
        data: {
          name: input.name,
          creatorId: ctx.user.id,
          businessType: input.type,

          permissions: {
            createMany: {
              data: ALL_PERMISSIONS.map((value) => {
                const namePart = value.includes(":")
                  ? value.split(":")[1]
                  : value;
                return {
                  key: value,
                  name: namePart.toUpperCase().replace("_", " "),
                };
              }),
            },
          },
        },
        include: {
          permissions: true,
        },
      });

      const adminRole = await tx.role.create({
        data: {
          key: SYSTEM_ROLES.ADMIN,
          name: "Admin",
          orgId: newOrg.id,
          permissions: {
            connect: newOrg.permissions.map((permission) => ({
              id: permission.id,
            })),
          },
        },
      });

      await tx.role.create({
        data: {
          key: SYSTEM_ROLES.MEMBER,
          name: "Member",
          orgId: newOrg.id,
          permissions: {
            connect: newOrg.permissions
              .filter(({ key }) => USER_ROLE_PERMISSIONS.includes(key as any))
              .map((permission) => ({
                id: permission.id,
              })),
          },
        },
      });

      await tx.organisationMember.create({
        data: {
          orgId: newOrg.id,
          userId: newOrg.creatorId,
          roleId: adminRole.id,
        },
      });

      return [newOrg];
    });

    if (!newOrg) {
      throw new PublicError(
        "Something went wrong! we couldn't create a new organisation"
      );
    }

    return redirect(`/dashboard/org/${newOrg.id}`);
  });
