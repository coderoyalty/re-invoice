"use server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/utils/password";
import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
  const { displayName, email, password } = Object.fromEntries(
    formData.entries()
  );
  const data = {
    displayName: displayName! as string,
    email: email! as string,
    password: password! as string,
  };
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

  const newUser = await prisma.user.create({
    data: {
      ...data,
    },
  });

  redirect("/login");
}
