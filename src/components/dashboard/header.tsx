import React from "react";
import DashboardNav from "./nav";
import ThemeSwitch from "../ThemeSwitch";
import { SidebarTrigger } from "../ui/sidebar";
import clsx from "clsx";

export default function DashboardHeader() {
  return (
    <>
      <header
        className={clsx(
          "top-0 sticky bg-transparent bg-opacity-30 backdrop-blur-md border-b border-white border-opacity-20 shadow-md z-50",
          "flex h-16 shrink-0 items-center gap-2 border-b px-4"
        )}
      >
        <SidebarTrigger />

        <div className="ml-auto flex items-center gap-1 px-2">
          <DashboardNav />
          <ThemeSwitch />
        </div>
      </header>
    </>
  );
}
