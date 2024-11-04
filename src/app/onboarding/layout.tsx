import { auth } from "@/lib";
import { redirect } from "next/navigation";
import React from "react";

export default async function ({ children }: { children?: React.ReactNode }) {
  const { user } = await auth();

  if (!user) {
    return redirect("/login");
  }

  const { defaultOrganisation } = user;

  if (defaultOrganisation) {
    return redirect("/dashboard");
  }

  return (
    <>
      <main className="flex-1 w-full py-6 px-[2px] md:px-2 lg:px-8">
        {children}
      </main>
    </>
  );
}
