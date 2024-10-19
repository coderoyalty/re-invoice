import Footer from "@/components/Footer";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
