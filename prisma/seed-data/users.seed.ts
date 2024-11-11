import { type User } from "@prisma/client";

export const users: {
  displayName: User["displayName"];
  email: User["email"];
  emailConfirmedAt: User["emailConfirmedAt"];
}[] = [
  {
    displayName: "Cody James",
    email: "codyjames@gmail.com",
    emailConfirmedAt: new Date(),
  },
  {
    displayName: "Tom Cruise",
    email: "tommycruise@outlook.com",
    emailConfirmedAt: new Date(),
  },
  {
    displayName: "Jackie Chang",
    email: "jackie.chang@gmail.com",
    emailConfirmedAt: new Date(),
  },
];
