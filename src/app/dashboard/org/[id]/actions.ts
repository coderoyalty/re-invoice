"use server";
import { extendedBusinessProfileSchema } from "@/app/_lib/definitions";
import { auth } from "@/lib";
import prisma from "@/lib/prisma";
import { authenticatedAction } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

export async function getOrganisation(id: string) {
  const { user } = await auth();

  if (!user) {
    return { organisation: null, membership: null };
  }

  const organisation = await prisma.organisation.findFirst({
    where: {
      id: id,
      members: {
        some: {
          userId: user.id,
        },
      },
    },
    include: {
      businessProfile: true,
      creator: true,
      members: {
        include: {
          role: true,
          user: true,
        },
      },
    },
  });

  return {
    organisation,
    membership: organisation
      ? organisation.members
          .filter((member) => member.userId === user.id)!
          .at(0)
      : null,
  };
}

export const createBusinessProfileAction = authenticatedAction
  .createServerAction()
  .input(extendedBusinessProfileSchema)
  .handler(async ({ input, ctx }) => {
    const { orgId, ...businessProfile } = input;

    //1. user is a member of the organisation
    const organisation = await prisma.organisation.findFirst({
      where: {
        id: orgId,
        members: {
          some: {
            userId: ctx.user.id,
          },
        },
      },
      include: {
        businessProfile: true,
      },
    });

    if (!organisation) {
      return notFound();
    }

    //2. if businessProfile already exists, do nothing
    if (organisation.businessProfile) {
      return; // do nothing!
    }
    //3. create and connect business data
    await prisma.businessProfile.create({
      data: {
        ...businessProfile,
        organisationName: organisation.name,
        orgId: orgId,
      },
    });

    revalidatePath("/dashboard/org/[id]");
  });
