"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

interface CounterProps {
  value: string;
  duration?: number;
  className?: string;
}

function parseNumeric(s: string): {
  num: number | null;
  prefix: string;
  suffix: string;
} {
  const match = s.match(/^([^\d.]*)([\d.,]+)([^\d.]*)$/);
  if (!match) return { num: null, prefix: "", suffix: s };
  const raw = (match[2] ?? "").replace(/,/g, "");
  const num = parseFloat(raw);
  return { num, prefix: match[1] ?? "", suffix: match[3] ?? "" };
}

function formatNumber(n: number, originalDigits: number) {
  if (originalDigits >= 4) {
    return Math.round(n).toLocaleString("en-US");
  }
  if (Number.isInteger(n) || n >= 100) {
    return Math.round(n).toString();
  }
  return n.toFixed(1);
}

export function Counter({ value, duration = 1.6, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const mv = useMotionValue(0);
  const parsed = parseNumeric(value);
  const target = parsed.num ?? 0;
  const digits = (parsed.num ?? 0).toString().replace(".", "").length;

  const rounded = useTransform(mv, (n) => formatNumber(n, digits));

  useEffect(() => {
    if (inView && parsed.num !== null) {
      const controls = animate(mv, target, {
        duration,
        ease: [0.22, 1, 0.36, 1],
      });
      return () => controls.stop();
    }
  }, [inView, target, parsed.num, mv, duration]);

  if (parsed.num === null) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      <motion.span>{rounded}</motion.span>
      {parsed.suffix}
    </span>
  );
}
