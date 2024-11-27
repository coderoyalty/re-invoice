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
  useSidebar,
} from "@/components/ui/sidebar";
import { auth } from "@/lib";
import { AwaitedReturnType } from "@/lib/types";
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

function DashboardSidebarFooter({
  user,
}: {
  user: AwaitedReturnType<typeof auth>["user"] & {};
}) {
  return (
    <>
      <SidebarFooter>
        <NavUser
          user={{
            avatar: user.avatarUrl || "",
            email: user.email,
            name: user.displayName,
          }}
        />
      </SidebarFooter>
    </>
  );
}

export function DashboardSidebar({
  user,
}: {
  user: AwaitedReturnType<typeof auth>["user"] & {};
}) {
  const { toggleSidebar, isMobile } = useSidebar();
  return (
    <>
      <Sidebar collapsible="icon" variant="floating">
        <SidebarHeader>
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
        </SidebarHeader>
        <SidebarContent>
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
        </SidebarContent>
        <DashboardSidebarFooter user={user} />
      </Sidebar>
    </>
  );
}
