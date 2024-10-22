import { FileText } from "lucide-react";
import Link from "next/link";
import React from "react";

type LogoType = {
  href?: string;
};

const Logo: React.FC<LogoType> = ({ href = "/" }) => {
  return (
    <>
      <Link className="flex items-center justify-center gap-2" href={href}>
        <FileText className="h-6 w-6" />
        <span className="max-sm:sr-only text-xl">Invoicely</span>
      </Link>
    </>
  );
};

export default Logo;
