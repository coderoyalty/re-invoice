"use client";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { AwaitedReturnType } from "@/lib/types";
import { getUser } from "@/lib/users/data";
import { Building2, FileText, LayoutDashboard, Receipt } from "lucide-react";
import Link from "next/link";
import React from "react";

const items = [
  {
    url: "/dashboard",
    icon: LayoutDashboard,
    title: "Dashboard",
  },
  {
    url: "/dashboard/org",
    icon: Building2,
    title: "Organisations",
  },
  {
    url: "/dashboard/invoices",
    icon: Receipt,
    title: "Invoices",
  },
];

export function AppLogoHeader() {
  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href={"/"}>
              <FileText />
              Invoicely
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}

export function NavMain() {
  const { toggleSidebar, isMobile } = useSidebar();
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <>
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="p-2"
                    onClick={() => {
                      if (isMobile) {
                        toggleSidebar();
                      }
                    }}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}

export function DashboardSidebar({
  user,
}: {
  user: AwaitedReturnType<typeof getUser> & {};
}) {
  return (
    <>
      <Sidebar collapsible="icon" variant="floating">
        <SidebarHeader>
          <AppLogoHeader />
        </SidebarHeader>
        <SidebarContent>
          <NavMain />
        </SidebarContent>
        <SidebarFooter>
          <NavUser
            user={{
              avatar: user.avatarUrl || "",
              email: user.email,
              name: user.displayName,
            }}
          />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  );
}
