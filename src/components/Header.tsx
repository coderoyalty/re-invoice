import { FileText } from "lucide-react";
import Link from "next/link";
import React from "react";
import ThemeSwitch from "./ThemeSwitch";

export default function Header() {
  return (
    <>
      <header className="px-4 lg:px-6 h-14 border-b-2 border-black dark:border-neutral-300 bg-white dark:bg-black dark:text-white flex items-center z-50 top-0 sticky">
        <Link className="flex items-center justify-center gap-2" href="#">
          <FileText className="h-6 w-6" />
          <span className="max-sm:sr-only text-xl">Invoicely</span>
        </Link>
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
          <ThemeSwitch />
        </nav>
      </header>
    </>
  );
}
