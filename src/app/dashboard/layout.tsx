import DashboardHeader from "@/components/dashboard/header";
import { auth } from "@/lib";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { user } = await auth();

  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 w-full py-6 px-4 lg:px-8">{children}</main>
      </div>
    </>
  );
}
