import { Prisma, type User } from "@prisma/client";
import { randomUUID } from "node:crypto";

export const users: {
  id: User["id"];
  displayName: User["displayName"];
  email: User["email"];
  emailConfirmedAt: User["emailConfirmedAt"];
}[] = [
  {
    id: randomUUID(),
    displayName: "Cody James",
    email: "codyjames@gmail.com",
    emailConfirmedAt: new Date(),
  },
  {
    id: randomUUID(),
    displayName: "Tom Cruise",
    email: "tommycruise@outlook.com",
    emailConfirmedAt: new Date(),
  },
  {
    id: randomUUID(),
    displayName: "Jackie Chang",
    email: "jackie.chang@gmail.com",
    emailConfirmedAt: new Date(),
  },
];
