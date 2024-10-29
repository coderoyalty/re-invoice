import React from "react";
import Logo from "../Logo";
import DashboardNav from "./nav";
import ThemeSwitch from "../ThemeSwitch";

const orgs = [
  { id: "default", name: "My Organization" },
  { id: "org1", name: "Client A Inc." },
  { id: "org2", name: "Client B Ltd." },
];

export default function DashboardHeader() {
  return (
    <>
      <header className="px-4 lg:px-6 h-14 flex items-center border-b gap-2 top-0 z-10 bg-primary-foreground sticky">
        <Logo />
        <DashboardNav />
        <ThemeSwitch />
      </header>
    </>
  );
}
