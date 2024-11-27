import type { Metadata } from "next";
import { Providers } from "./providers";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Invoicely",
  description: "Seamlessly generate invoices for your business or personal use",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={clsx(
          "antialiased dark:bg-black dark:text-white",
          "flex min-h-[100vh] flex-col bg-slate-100",
          inter.className
        )}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
