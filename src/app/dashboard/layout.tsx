import DashboardHeader from "@/components/dashboard/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import { DashboardSidebar } from "./components";
import { cookies } from "next/headers";
import { getUser } from "@/lib/users/data";

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

  const user = await getUser(userId);

  const cookieStore = cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <>
      <SidebarProvider defaultOpen={defaultOpen}>
        <DashboardSidebar user={user!} />
        <SidebarInset>
          <DashboardHeader />
          <div className="flex flex-col min-h-screen w-full mt-4 md:mt-6 lg:mt-8">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
