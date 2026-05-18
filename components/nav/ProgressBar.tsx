"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed bottom-0 left-0 z-40 h-[2px] w-full origin-left bg-gilt"
      aria-hidden
    />
  );
}
