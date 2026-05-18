"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TENANT_GROWTH } from "@/lib/data/tenants";

export function GrowthChart() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const max = Math.max(...TENANT_GROWTH.map((d) => d.count));
  const W = 600;
  const H = 240;
  const padding = 36;
  const barW = (W - padding * 2) / TENANT_GROWTH.length - 16;

  return (
    <div className="rounded-card border border-ivory/10 bg-surface/60 p-6">
      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-2xl text-ivory">Tenants by year</h3>
        <span className="text-xs uppercase tracking-[0.18em] text-ivory/50">
          2020 → 2025
        </span>
      </div>
      <svg
        ref={ref}
        viewBox={`0 0 ${W} ${H}`}
        className="mt-6 w-full"
        role="img"
        aria-label="Tenant growth from 2020 to 2025"
      >
        {/* Faint gridlines */}
        {[0.25, 0.5, 0.75, 1].map((p) => (
          <line
            key={p}
            x1={padding}
            y1={H - padding - (H - padding * 2) * p}
            x2={W - padding}
            y2={H - padding - (H - padding * 2) * p}
            stroke="#1C1C24"
            strokeWidth="1"
          />
        ))}
        {TENANT_GROWTH.map((d, i) => {
          const x = padding + i * (barW + 16);
          const h = ((H - padding * 2) * d.count) / max;
          return (
            <g key={d.year}>
              <motion.rect
                x={x}
                y={H - padding}
                width={barW}
                height={0}
                fill="#C9A24A"
                fillOpacity={0.85}
                initial={false}
                animate={
                  inView ? { y: H - padding - h, height: h } : { height: 0 }
                }
                transition={{
                  duration: 1.2,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                rx={4}
              />
              <text
                x={x + barW / 2}
                y={H - padding + 18}
                textAnchor="middle"
                className="fill-ivory/50 text-[10px]"
              >
                {d.year}
              </text>
              <motion.text
                x={x + barW / 2}
                y={H - padding - h - 8}
                textAnchor="middle"
                className="fill-ivory text-[11px] font-medium"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 1 + i * 0.1 }}
              >
                {d.count}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
