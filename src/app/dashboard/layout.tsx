import DashboardHeader from "@/components/dashboard/header";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { userId, orgId } = await auth();

  if (!userId) {
    return redirect("/login");
  }

  if (orgId === undefined) {
    return redirect("/onboarding/");
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <DashboardHeader userId={userId} />
        <main className="flex-1 w-full py-6 px-[2px] md:px-2 lg:px-8">
          {children}
        </main>
      </div>
    </>
  );
}
