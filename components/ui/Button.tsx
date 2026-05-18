"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium tracking-wide transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gilt disabled:pointer-events-none disabled:opacity-40 cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-gilt text-ink hover:bg-gilt-soft",
        ghost:
          "border border-ivory/20 text-ivory hover:border-gilt hover:text-gilt bg-transparent",
        link: "text-ivory underline-offset-4 hover:underline hover:text-gilt",
      },
      size: {
        sm: "h-9 px-4 text-xs uppercase tracking-[0.18em]",
        md: "h-12 px-7 text-sm uppercase tracking-[0.18em]",
        lg: "h-14 px-9 text-base uppercase tracking-[0.20em]",
      },
      shape: {
        pill: "rounded-full",
        sharp: "rounded-none",
      },
    },
    defaultVariants: { variant: "primary", size: "md", shape: "pill" },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, shape, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
