import { hashPassword } from "@/utils/password";
import prisma from "../prisma";

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
  orgName: string;
  businessType: string;
};

export async function createOrganisation({
  userId,
  orgName,
  businessType,
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
    throw new Error("An account does not exist for the provided user");
  }

  if (!user.emailConfirmedAt) {
    throw new Error("Your account is not confirmed, request confirmation mail");
  }

  // create default organisation
  const newOrg = await prisma.organisation.create({
    data: {
      name: orgName,
      creatorId: user.id,
      businessType: businessType as any,
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

  // add the organisation owner as the first member of an organisation
  await prisma.organisationMember.create({
    data: {
      userId: user.id,
      orgId: newOrg.id,
    },
  });

  return {
    org: newOrg,
  };
}
