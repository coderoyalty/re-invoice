import { PrismaClient } from "@prisma/client";
import { users } from "./seed-data/users.seed";
import {
  orgPermissions,
  invoicePermissions,
  userPermissions,
} from "./seed-data/permissions";
import { defaultRoles } from "./seed-data/default-roles";

const prisma = new PrismaClient();

async function main() {
  // Seed Permissions
  const allPermissions = [
    ...orgPermissions,
    ...invoicePermissions,
    ...userPermissions,
  ];

  prisma.$transaction(async (trx) => {
    // create/update permission
    for (const perm of allPermissions) {
      await trx.permission.upsert({
        where: {
          action_entity_scope: {
            action: perm.action,
            entity: perm.entity,
            scope: perm.scope,
          },
        },
        update: {},
        create: perm,
      });
    }

    // Seed Default Roles (global system roles)
    for (const roleData of defaultRoles) {
      const role = await trx.role.upsert({
        where: {
          name: roleData.name,
        },
        update: {},
        create: {
          name: roleData.name,
        },
      });

      // Assign permissions
      for (const permKey of roleData.permissions) {
        const [action, entity, scope] = permKey.split(":");

        const permission = await trx.permission.findUnique({
          where: {
            action_entity_scope: {
              action,
              entity,
              scope,
            },
          },
        });

        if (permission) {
          await trx.rolePermission.upsert({
            where: {
              roleId_permissionId: {
                roleId: role.id,
                permissionId: permission.id,
              },
            },
            update: {},
            create: {
              roleId: role.id,
              permissionId: permission.id,
            },
          });
        }
      }
    }

    await trx.user.createManyAndReturn({
      data: users.map((user) => ({
        ...user,
        password:
          "$2b$10$L3NnQiMBOMSrwGZnh.9ZFeDncH1G.UOoqMDmgYmqON16epgx4nFjS", //Abcd123@
      })),
    });
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
