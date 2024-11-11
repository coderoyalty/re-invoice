import React from "react";
import Logo from "../Logo";
import DashboardNav from "./nav";
import ThemeSwitch from "../ThemeSwitch";
import { Separator } from "../ui/separator";
import UserDropDown, { UserDropDownProps } from "./user-dropdown";

export default function DashboardHeader({
  user,
}: {
  user: UserDropDownProps["user"];
}) {
  return (
    <>
      <header className="top-0 sticky bg-transparent gap-2 bg-opacity-30 backdrop-blur-md border-b border-white border-opacity-20 shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-2">
            <Logo />
            <div className="flex-auto flex items-center h-full py-5 space-x-3">
              <DashboardNav />
              <Separator orientation="vertical" />
              <UserDropDown user={user} />
              <Separator orientation="vertical" />
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
