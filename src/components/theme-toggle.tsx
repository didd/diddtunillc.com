"use client";

import { useEffect, useState } from "react";
import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "./theme-provider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mounted && theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={mounted ? theme === "dark" : undefined}
      className={cn(buttonVariants({ variant: "icon", size: "icon" }), "shrink-0 rounded-full", className)}
    >
      {!mounted ? (
        <span aria-hidden="true" className="h-4 w-4 rounded-full border border-current opacity-70" />
      ) : theme === "dark" ? (
        <MoonStar aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
      ) : (
        <SunMedium aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
      )}
    </button>
  );
}
