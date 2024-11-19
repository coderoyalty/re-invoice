"use server";
import { auth } from "@/lib";
import prisma from "@/lib/prisma";

export async function getOrganisation(id: string) {
  const { user } = await auth();

  if (!user) {
    return null;
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
      members: true,
    },
  });

  return organisation;
}
