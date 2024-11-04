import Link from "next/link";
import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import Logo from "./Logo";
import { Separator } from "./ui/separator";

export default function Header() {
  return (
    <>
      <header className="top-0 sticky bg-transparent gap-2 bg-opacity-30 backdrop-blur-md border-b border-white border-opacity-20 shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center gap-2">
            <Logo />
            <div className="flex-auto h-full py-5 flex items-center space-x-3">
              <nav className="ml-auto flex gap-4 sm:gap-6">
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="/#features"
                >
                  Features
                </Link>
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="/#pricing"
                >
                  Pricing
                </Link>
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="/#testimonials"
                >
                  Testimonials
                </Link>
              </nav>
              <Separator orientation="vertical" />
              <div>
                <ThemeSwitch />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
