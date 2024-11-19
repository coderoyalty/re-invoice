"use server";

import prisma from "@/lib/prisma";
import { authenticatedAction } from "@/lib/safe-action";
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
      return;
    }

    if (user.activeOrganisation && user.activeOrganisation.id === input.orgId) {
      return;
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        activeOrganisationId: input.orgId,
      },
    });

    return revalidatePath("/dashboard");
  });
