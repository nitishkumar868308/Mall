"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface KineticTypeProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  stagger?: number;
}

const VARIANTS = {
  hidden: { opacity: 0, y: "0.6em" },
  visible: { opacity: 1, y: 0 },
};

export function KineticType({
  text,
  as = "h1",
  className,
  delay = 0,
  stagger = 0.06,
}: KineticTypeProps) {
  const words = text.split(" ");
  const MotionTag = motion[as] as typeof motion.h1;

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-baseline pb-[0.1em] -mb-[0.1em]"
        >
          <motion.span
            className="inline-block"
            variants={VARIANTS}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
