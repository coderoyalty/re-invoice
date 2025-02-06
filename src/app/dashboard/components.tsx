"use client";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  Building2,
  FileText,
  Group,
  LayoutDashboard,
  Plus,
  Receipt,
  Users,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { CreateOrganisationForm } from "./org/form";

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
  {
    url: "/dashboard/members",
    icon: Users,
    title: "Members",
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
            {items.map((item, key) => (
              <SidebarMenuItem key={key}>
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
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}

export function NavOrganisationAction() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Actions</SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Dialog>
              <SidebarMenuButton asChild>
                <DialogTrigger>
                  <Plus />
                  Create Organisation
                </DialogTrigger>
              </SidebarMenuButton>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create Organisation</DialogTitle>
                  <DialogDescription>
                    Create a new organisation
                  </DialogDescription>
                </DialogHeader>
                <CreateOrganisationForm />
              </DialogContent>
            </Dialog>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
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
          <NavOrganisationAction />
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
