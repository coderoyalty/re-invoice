import DashboardHeader from "@/components/dashboard/header";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 w-full py-6 px-4 lg:px-8">{children}</main>
      </div>
    </>
  );
}
