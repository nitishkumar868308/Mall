"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MeshBackdropProps {
  variant?: "warm" | "cool" | "noir";
  intensity?: "subtle" | "rich";
  className?: string;
}

const VARIANTS = {
  warm: {
    a: "rgba(201,162,74,0.45)",
    b: "rgba(225,194,122,0.35)",
    c: "rgba(120,72,30,0.40)",
  },
  cool: {
    a: "rgba(80,110,180,0.35)",
    b: "rgba(201,162,74,0.30)",
    c: "rgba(40,55,90,0.50)",
  },
  noir: {
    a: "rgba(201,162,74,0.28)",
    b: "rgba(40,40,55,0.55)",
    c: "rgba(20,20,28,0.65)",
  },
} as const;

const SIZE = {
  subtle: { blur: 100, scale: 1.0, opacity: 0.55 },
  rich: { blur: 80, scale: 1.15, opacity: 0.85 },
} as const;

export function MeshBackdrop({
  variant = "warm",
  intensity = "rich",
  className,
}: MeshBackdropProps) {
  const c = VARIANTS[variant];
  const s = SIZE[intensity];
  const reduced = useReducedMotion();

  const float = (delay: number) =>
    reduced
      ? {}
      : {
          animate: {
            x: [0, 40, -20, 0],
            y: [0, -30, 25, 0],
            scale: [1, 1.08, 0.95, 1],
          },
          transition: {
            duration: 14,
            ease: "easeInOut" as const,
            repeat: Infinity,
            delay,
          },
        };

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{ opacity: s.opacity }}
    >
      <motion.div
        {...float(0)}
        className="absolute -left-[10%] top-[5%] h-[60%] w-[60%] rounded-full"
        style={{ background: c.a, filter: `blur(${s.blur}px)`, mixBlendMode: "screen" }}
      />
      <motion.div
        {...float(3)}
        className="absolute right-[-15%] top-[20%] h-[55%] w-[55%] rounded-full"
        style={{ background: c.b, filter: `blur(${s.blur}px)`, mixBlendMode: "screen" }}
      />
      <motion.div
        {...float(6)}
        className="absolute left-[20%] bottom-[-10%] h-[55%] w-[55%] rounded-full"
        style={{ background: c.c, filter: `blur(${s.blur}px)`, mixBlendMode: "screen" }}
      />
    </div>
  );
}
