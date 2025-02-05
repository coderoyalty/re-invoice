"use server";

import { authenticatedAction } from "@/lib/safe-action";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { PublicError } from "@/use-cases/errors";
import { z } from "zod";
import {
  ALL_PERMISSIONS,
  SYSTEM_ROLES,
  MEMBER_ROLE_PERMISSIONS,
  ADMIN_ROLE_PERMISSIONS,
  OWNER_ROLE_PERMISSIONS,
  MANAGER_ROLE_PERMISSIONS,
} from "@/lib/permissions";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { checkPermission } from "@/lib/permission";

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
          businessType: input.type as any,
        },
      });

      const role = await tx.role.findUniqueOrThrow({
        where: {
          name: "Owner",
        },
      });

      await tx.organisationMember.create({
        data: {
          orgId: newOrg.id,
          userId: newOrg.creatorId,
          roleId: role.id,
        },
      });

      return [newOrg];
    });

    if (!newOrg) {
      throw new PublicError(
        "Something went wrong! we couldn't create a new organisation"
      );
    }

    revalidatePath(`/dashboard`);
    return redirect(`/dashboard/org/${newOrg.id}`);
  });
