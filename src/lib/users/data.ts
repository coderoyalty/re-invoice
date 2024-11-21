import { hashPassword } from "@/utils/password";
import prisma from "../prisma";
import { PublicError } from "@/use-cases/errors";
import { z } from "zod";
import { onboardingSchema } from "@/app/_lib/definitions";
import {
  ALL_PERMISSIONS,
  SYSTEM_ROLES,
  USER_ROLE_PERMISSIONS,
} from "../permissions";

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

      permissions: {
        createMany: {
          data: ALL_PERMISSIONS.map((value) => {
            return {
              key: value,
              name: value.split(":")[1].toUpperCase().replace("_", " "),
            };
          }),
        },
      },
    },

    include: {
      permissions: true,
    },
  });

  const adminRole = await prisma.role.create({
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

  await prisma.role.create({
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

  // first organisation member
  await prisma.organisationMember.create({
    data: {
      orgId: newOrg.id,
      userId: user.id,
      roleId: adminRole.id,
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

export async function getUser(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      avatarUrl: true,
      displayName: true,
      email: true,
      id: true,
    },
  });
}
