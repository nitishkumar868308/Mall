"use client";

import { motion } from "framer-motion";

export function RegionMap() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card border border-ivory/10 bg-surface">
      <svg
        viewBox="0 0 400 500"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="American Dream location in the New York metropolitan area"
      >
        <defs>
          <radialGradient id="glow" cx="55%" cy="48%" r="50%">
            <stop offset="0%" stopColor="#C9A24A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#C9A24A" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#14141A" />
            <stop offset="100%" stopColor="#0A0A0B" />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill="url(#bgGrad)" />
        <path
          d="M30 130 Q130 100 220 130 T395 110 L390 290 Q300 270 240 305 T120 365 L60 320 Z"
          fill="#14141A"
          stroke="#1C1C24"
          strokeWidth="1.5"
        />
        <path
          d="M225 245 Q310 270 365 235 L355 350 Q280 365 220 335 Z"
          fill="#0F0F15"
          stroke="#1C1C24"
          strokeWidth="1.5"
        />
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={50 * i}
            y1={0}
            x2={50 * i}
            y2={500}
            stroke="#1C1C24"
            strokeOpacity={0.4}
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1={0}
            y1={50 * i}
            x2={400}
            y2={50 * i}
            stroke="#1C1C24"
            strokeOpacity={0.4}
          />
        ))}
        <circle cx="255" cy="275" r="3" fill="#8B8B90" />
        <text x="263" y="279" className="fill-ivory/60 text-[10px]">
          Manhattan
        </text>
        <circle cx="298" cy="335" r="3" fill="#8B8B90" />
        <text x="306" y="339" className="fill-ivory/40 text-[9px]">
          Newark
        </text>
        <circle cx="220" cy="240" r="130" fill="url(#glow)" />
        {[45, 75, 105].map((r, i) => (
          <motion.circle
            key={r}
            cx="220"
            cy="240"
            r={r}
            fill="none"
            stroke="#C9A24A"
            strokeOpacity={0.3}
            strokeWidth="1"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [0.6, 1, 1.15], opacity: [0, 0.55, 0] }}
            transition={{
              duration: 4,
              delay: i * 0.9,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
        <circle cx="220" cy="240" r="6" fill="#C9A24A" />
        <circle
          cx="220"
          cy="240"
          r="11"
          fill="none"
          stroke="#C9A24A"
          strokeWidth="1.5"
        />
        <text
          x="235"
          y="244"
          className="fill-gilt text-[11px] font-semibold"
        >
          American Dream
        </text>
        <text
          x="30"
          y="425"
          className="fill-ivory/45 text-[9px] uppercase tracking-widest"
        >
          15 min · 5M people
        </text>
        <text
          x="30"
          y="448"
          className="fill-ivory/45 text-[9px] uppercase tracking-widest"
        >
          30 min · 22M people
        </text>
        <text
          x="30"
          y="471"
          className="fill-ivory/45 text-[9px] uppercase tracking-widest"
        >
          60 min · 35M people
        </text>
      </svg>
    </div>
  );
}
