import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-[0.88rem] font-semibold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-bg shadow-[0_8px_30px_var(--color-accent-glow)] hover:-translate-y-0.5 hover:shadow-[0_14px_36px_var(--color-accent-glow)]",
        secondary:
          "border border-border bg-bg-card/65 text-text hover:border-text-muted hover:bg-bg-card hover:-translate-y-0.5",
        outline:
          "border border-accent bg-transparent text-accent hover:bg-accent hover:text-bg",
        ghost:
          "text-text-muted hover:bg-bg-card hover:text-accent",
        icon: "border border-border bg-bg-card/70 text-text-dim hover:border-accent hover:text-accent",
      },
      size: {
        default: "px-8 py-3.5",
        sm: "px-5 py-2.5 text-[0.8rem]",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, variant, size, type = "button", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...(!asChild ? { type } : {})}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
