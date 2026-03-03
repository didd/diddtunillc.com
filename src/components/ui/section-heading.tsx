import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  id: string;
  title: ReactNode;
  className?: string;
}

export function SectionHeading({ eyebrow, id, title, className }: SectionHeadingProps) {
  return (
    <div className={cn(className)}>
      <div className="font-mono text-[0.78rem] uppercase tracking-[0.15em] text-text-dim">
        {eyebrow}
      </div>
      <h2
        id={id}
        className="mt-4 mb-8 text-[clamp(2rem,4vw,3rem)] leading-[1.2] font-semibold tracking-tight"
      >
        {title}
      </h2>
    </div>
  );
}
