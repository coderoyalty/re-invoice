import DashboardHeader from "@/components/dashboard/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib";
import { redirect } from "next/navigation";
import React from "react";
import { DashboardSidebar } from "./components";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { user } = await auth();

  if (!user) {
    return redirect("/login");
  }

  if (!user.defaultOrganisation) {
    return redirect("/onboarding/");
  }

  const cookieStore = cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <>
      <SidebarProvider defaultOpen={defaultOpen}>
        <DashboardSidebar user={user} />
        <SidebarInset>
          <DashboardHeader />
          <div className="flex flex-col min-h-screen w-full">
            <main className="flex-1 py-6 px-[2px] md:px-2 lg:px-8">
              {children}
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
