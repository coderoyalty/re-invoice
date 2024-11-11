import { PrismaClient } from "@prisma/client";
import { users } from "./seed-data/users.seed";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createManyAndReturn({
    data: users.map((user) => ({
      ...user,
      password: "$2b$10$L3NnQiMBOMSrwGZnh.9ZFeDncH1G.UOoqMDmgYmqON16epgx4nFjS", //Abcd123@
    })),
  });
}

main()
  .then(() => {
    console.log("Done!");
  })
  .catch(() => {
    console.error("Error!");
  });
