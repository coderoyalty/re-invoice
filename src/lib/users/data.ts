import { hashPassword } from "@/utils/password";
import prisma from "../prisma";
import { PublicError } from "@/use-cases/errors";
import { z } from "zod";
import { onboardingSchema } from "@/app/_lib/definitions";

type AccountProps = {
  displayName: string;
  email: string;
  password: string;
};

export async function createAccount(data: AccountProps) {
  const result = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (result) {
    // user already exist?
    throw new Error("An account already exist with the provided email address");
  }

  data.password = await hashPassword(data.password);

  let newUser = await prisma.user.create({
    data: {
      ...data,
    },
  });

  return newUser;
}

type CreateOrgProps = {
  userId: string;
} & z.infer<typeof onboardingSchema>;

export async function createOrganisation({
  userId,
  name,
  type,
  ...data
}: CreateOrgProps) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      defaultOrganisation: true,
    },
  });

  if (!user) {
    throw new PublicError("An account does not exist for the provided user");
  }

  if (!user.emailConfirmedAt) {
    throw new PublicError(
      "Your account is not confirmed, request confirmation mail"
    );
  }

  // create organisation
  const newOrg = await prisma.organisation.create({
    data: {
      name,
      creatorId: user.id,
      businessType: type as any,

      // create the business profile
      businessProfile: {
        create: {
          ...data,
          organisationName: name,
        },
      },

      // transactionally add user as member of the organisation
      members: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  // if first organisation created by the user, set as the default organisation
  if (!user.defaultOrganisation) {
    await prisma.user.update({
      data: {
        defaultOrganisationId: newOrg.id,
      },
      where: {
        id: user.id,
      },
      include: {
        defaultOrganisation: true,
      },
    });
  }

  return {
    org: newOrg,
  };
}
