"use client";

import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitch() {
  const [mounted, setMounted] = React.useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <></>;

  if (resolvedTheme === "dark") {
    // sun icon
    return (
      <Sun
        className="w-5 h-5 cursor-pointer"
        onClick={() => setTheme("light")}
      />
    );
  }

  if (resolvedTheme === "light") {
    // moon icon
    return (
      <Moon
        className="w-5 h-5 cursor-pointer"
        onClick={() => setTheme("dark")}
      />
    );
  }
}
