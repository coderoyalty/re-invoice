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
      <header className="top-0 sticky bg-transparent gap-2 bg-opacity-30 backdrop-blur-md border-b border-white border-opacity-20 shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-2">
            <Logo />
            <DashboardNav />
            <ThemeSwitch />
          </div>
        </div>
      </header>
    </>
  );
}
