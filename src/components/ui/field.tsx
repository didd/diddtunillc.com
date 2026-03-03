"use client";

import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const controlClasses =
  "w-full rounded-xl border border-border bg-bg-elevated px-4 py-3.5 text-[0.95rem] text-text outline-none transition-[border-color,box-shadow,background-color,color] placeholder:text-text-dim focus:border-accent focus:bg-bg-card focus:shadow-[0_0_0_4px_var(--color-accent-muted)]";

interface FieldProps {
  children: ReactNode;
  htmlFor: string;
  label: string;
  required?: boolean;
  hint?: string;
  className?: string;
}

export function Field({
  children,
  htmlFor,
  label,
  required = false,
  hint,
  className,
}: FieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-2.5 block text-[0.82rem] font-medium uppercase tracking-[0.08em] text-text-muted"
      >
        {label}
        {required ? " *" : ""}
      </label>
      {children}
      {hint ? (
        <p id={`${htmlFor}-hint`} className="mt-2 text-[0.8rem] text-text-dim">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-text-dim">
            {icon}
          </span>
        ) : null}
        <input
          ref={ref}
          className={cn(controlClasses, icon ? "pr-4 pl-11" : "", className)}
          {...props}
        />
      </div>
    );
  },
);

TextInput.displayName = "TextInput";

export const SelectInput = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(controlClasses, "appearance-none pr-11", className)}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-text-dim"
          strokeWidth={2}
        />
      </div>
    );
  },
);

SelectInput.displayName = "SelectInput";

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(controlClasses, "min-h-[168px] resize-y", className)}
        {...props}
      />
    );
  },
);

TextArea.displayName = "TextArea";
