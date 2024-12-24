"use server";

import prisma from "@/lib/prisma";
import { authenticatedAction } from "@/lib/safe-action";
import { PublicError } from "@/use-cases/errors";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const setActiveOrganisation = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      orgId: z.string().cuid(),
    })
  )
  .handler(async ({ input, ctx: { user } }) => {
    const member = await prisma.organisationMember.findFirst({
      where: {
        userId: user.id,
        orgId: input.orgId,
      },
    });

    if (!member) {
      throw new PublicError(
        "User is not a member of the specified organization"
      );
    }

    if (user.activeOrganisation && user.activeOrganisation.id === input.orgId) {
      return;
    }

    try {
      await prisma.$transaction(async (tx) => {
        const memberExists = await tx.organisationMember.findFirst({
          where: {
            userId: user.id,
            orgId: input.orgId,
          },
        });

        if (!memberExists) {
          throw new PublicError("Membership verification failed");
        }

        await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            activeOrganisationId: input.orgId,
          },
        });
      });
    } catch (error: any) {
      throw new PublicError(
        `Failed to update active organization: ${error.message}`
      );
    }

    return revalidatePath("/dashboard");
  });
