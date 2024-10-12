import { FileText } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <>
      <header className="px-4 lg:px-6 h-14 bg-white flex items-center z-50 top-0 sticky">
        <Link className="flex items-center justify-center gap-2" href="#">
          <FileText className="h-6 w-6" />
          <span className="max-sm:sr-only text-xl">Invoicely</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#pricing"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#testimonials"
          >
            Testimonials
          </Link>
        </nav>
      </header>
    </>
  );
}
