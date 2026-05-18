# American Dream Sales Deck — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a luxury, video-first, non-linear interactive sales deck for American Dream (NJ) with 8 cinematic chapters and a working `/events` Phase 2 sub-module, deployable to Vercel/Netlify with Lighthouse 95+ perf.

**Architecture:** Next.js 15 App Router static site. Server Components by default. Client-only where motion/state needed. Chapters compose into single page (`app/page.tsx`). Phase 2 routes are siblings. Strict TypeScript. Tailwind v4 with token-based design system. GSAP ScrollTrigger + Lenis for cinematic scroll. Framer Motion for component-level UI motion. Lazy-mounted videos with poster-first loading for performance.

**Tech Stack:** Next.js 15, React 19, TypeScript (strict), Tailwind CSS v4, Framer Motion, GSAP + ScrollTrigger, Lenis, shadcn/ui (Dialog/Tabs/Sheet/Slider/Button), lucide-react, react-hook-form, zod, Vitest (utility tests).

**Testing strategy:** Real unit tests (Vitest) for the few pieces of logic that have correctness criteria (capacity calculator filter, form validation, chapter math). UI/motion components verified manually in the dev server. Lighthouse + manual responsive QA as final gate.

---

## Phase 0 — Project Foundation

### Task 0.1: Scaffold Next.js 15 project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `app/layout.tsx`, `app/page.tsx`, all baseline Next.js scaffolding.

- [ ] **Step 1: Initialize project**

Run from `c:\Users\kumar\ui`:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm --turbopack --no-git
```

Expected: project files generated in current directory. Answer "Yes" to "Use App Router" / "Turbopack" if prompted; "No" to "src/ directory" and to creating a git repo (we'll init manually).

- [ ] **Step 2: Initialize git and first commit**

```bash
git init
git add .
git commit -m "chore: scaffold Next.js 15 app"
```

- [ ] **Step 3: Verify dev server boots**

```bash
npm run dev
```
Expected: server starts, `http://localhost:3000` renders default Next.js page. Stop server (Ctrl+C).

---

### Task 0.2: Add core dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install motion + UI libs**

```bash
npm install framer-motion gsap lenis lucide-react clsx tailwind-merge class-variance-authority
npm install -D @types/node vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 2: Install shadcn primitives we'll use**

```bash
npm install @radix-ui/react-dialog @radix-ui/react-tabs @radix-ui/react-slider @radix-ui/react-slot
npm install react-hook-form zod @hookform/resolvers
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add motion, UI, and form dependencies"
```

---

### Task 0.3: Configure Tailwind v4 design tokens

**Files:**
- Modify: `app/globals.css`
- Create: `tailwind.config.ts` (if v4 still needs it; otherwise tokens go in `globals.css` `@theme`)
- Create: `lib/utils.ts`

- [ ] **Step 1: Replace `app/globals.css`** with token system

```css
@import "tailwindcss";

@theme {
  --color-ink: #0A0A0B;
  --color-ivory: #F6F1E7;
  --color-gilt: #C9A24A;
  --color-gilt-soft: #E1C27A;
  --color-muted: #8B8B90;
  --color-surface: #14141A;
  --color-surface-2: #1C1C24;

  --font-display: var(--font-display), Georgia, serif;
  --font-sans: var(--font-sans), ui-sans-serif, system-ui;

  --ease-cinematic: cubic-bezier(0.22, 1, 0.36, 1);

  --radius-card: 18px;
  --radius-pill: 999px;
}

@layer base {
  html {
    color-scheme: dark;
    background: var(--color-ink);
    color: var(--color-ivory);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  body { font-family: var(--font-sans); }
  ::selection { background: var(--color-gilt); color: var(--color-ink); }
  :focus-visible {
    outline: 2px solid var(--color-gilt);
    outline-offset: 3px;
    border-radius: 4px;
  }
  /* Reduced motion fallback */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}
```

- [ ] **Step 2: Create `lib/utils.ts`** with `cn` helper

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 3: Commit**

```bash
git add app/globals.css lib/utils.ts
git commit -m "feat(design): add token system and cn util"
```

---

### Task 0.4: Configure fonts in root layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "American Dream — Where Retail Becomes a Destination",
  description: "An interactive sales experience for prospective tenants, sponsors, and event partners at American Dream, East Rutherford NJ.",
  openGraph: {
    title: "American Dream — Where Retail Becomes a Destination",
    description: "3 million square feet. 40+ million annual visitors. One unforgettable destination.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-ink text-ivory antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify dev server still boots and fonts load**

```bash
npm run dev
```
Open `http://localhost:3000` — page should render in dark mode with new fonts loaded (default page text will be in Inter/Fraunces).

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(design): wire Fraunces and Inter fonts in root layout"
```

---

## Phase 1 — Data Layer

### Task 1.1: Define core types

**Files:**
- Create: `lib/types.ts`

- [ ] **Step 1: Create type definitions**

```ts
export type ChapterId =
  | "hero"
  | "why-here"
  | "retail"
  | "luxury"
  | "dining"
  | "attractions"
  | "events-platform"
  | "close";

export interface Chapter {
  id: ChapterId;
  index: number;
  title: string;
  eyebrow: string;
}

export interface Metric {
  label: string;
  value: string;
  sublabel?: string;
}

export interface Tenant {
  name: string;
  category: "anchor" | "lifestyle" | "specialty" | "luxury" | "dining";
}

export interface Attraction {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stats: { label: string; value: string }[];
  posterColor: string;
}

export interface Venue {
  slug: string;
  name: string;
  capacityMin: number;
  capacityMax: number;
  dimensions: string;
  features: string[];
  fits: string[];
}

export interface EventHighlight {
  title: string;
  type: "concert" | "launch" | "convention" | "activation" | "celebrity" | "seasonal";
  year: number;
  blurb: string;
}

export type InquiryType = "lease" | "sponsor" | "venue";
export interface InquiryPayload {
  type: InquiryType;
  segment?: string;
  name: string;
  company: string;
  email: string;
  message: string;
  attendees?: number;
  eventDate?: string;
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/types.ts
git commit -m "feat(data): add core type definitions"
```

---

### Task 1.2: Define chapters config

**Files:**
- Create: `lib/config/chapters.ts`

- [ ] **Step 1: Create `lib/config/chapters.ts`**

```ts
import type { Chapter } from "@/lib/types";

export const CHAPTERS: Chapter[] = [
  { id: "hero",             index: 0, title: "Overview",           eyebrow: "I" },
  { id: "why-here",         index: 1, title: "Why Here",           eyebrow: "II" },
  { id: "retail",           index: 2, title: "Retail",             eyebrow: "III" },
  { id: "luxury",           index: 3, title: "The Avenue",         eyebrow: "IV" },
  { id: "dining",           index: 4, title: "Dining & Lifestyle", eyebrow: "V" },
  { id: "attractions",      index: 5, title: "Attractions",        eyebrow: "VI" },
  { id: "events-platform",  index: 6, title: "Events & Platform",  eyebrow: "VII" },
  { id: "close",            index: 7, title: "Build With Us",      eyebrow: "VIII" },
];
```

- [ ] **Step 2: Commit**

```bash
git add lib/config/chapters.ts
git commit -m "feat(data): add chapters config"
```

---

### Task 1.3: Property metrics

**Files:**
- Create: `lib/data/metrics.ts`

- [ ] **Step 1: Create `lib/data/metrics.ts`**

```ts
import type { Metric } from "@/lib/types";

export const HEADLINE_METRICS: Metric[] = [
  { label: "Square Feet",      value: "3M+",  sublabel: "of mixed-use destination" },
  { label: "Annual Visitors",  value: "40M+", sublabel: "from the Tri-State and beyond" },
  { label: "Tenants",          value: "450+", sublabel: "across retail, dining, entertainment" },
];

export const REACH_METRICS: Metric[] = [
  { label: "From Midtown Manhattan",  value: "12 min" },
  { label: "From Newark Airport",     value: "7 min" },
  { label: "Population within 30 mi", value: "22M" },
  { label: "Median household income", value: "$85K" },
  { label: "Annual NY-NJ-PA visitors", value: "65M" },
];

export const EVENTS_METRICS: Metric[] = [
  { label: "Event Venues",                value: "12" },
  { label: "Largest single-event capacity", value: "25,000" },
  { label: "Brand activations / year",    value: "200+" },
];
```

- [ ] **Step 2: Commit**

```bash
git add lib/data/metrics.ts
git commit -m "feat(data): add property metrics"
```

---

### Task 1.4: Tenants, attractions, venues, events

**Files:**
- Create: `lib/data/tenants.ts`, `lib/data/attractions.ts`, `lib/data/venues.ts`, `lib/data/events.ts`

- [ ] **Step 1: Create `lib/data/tenants.ts`**

```ts
import type { Tenant } from "@/lib/types";

export const TENANTS: Tenant[] = [
  { name: "Saks Fifth Avenue",  category: "luxury" },
  { name: "Hermès",             category: "luxury" },
  { name: "Tiffany & Co.",      category: "luxury" },
  { name: "Louis Vuitton",      category: "luxury" },
  { name: "Mulberry",           category: "luxury" },
  { name: "Dolce & Gabbana",    category: "luxury" },
  { name: "Zara",               category: "lifestyle" },
  { name: "H&M",                category: "lifestyle" },
  { name: "Uniqlo",             category: "lifestyle" },
  { name: "Primark",            category: "anchor" },
  { name: "Lululemon",          category: "lifestyle" },
  { name: "Sephora",            category: "lifestyle" },
  { name: "Apple",              category: "anchor" },
  { name: "Microsoft",          category: "specialty" },
  { name: "LEGO",               category: "specialty" },
  { name: "Toys"+'“'+"R"+'”'+"Us", category: "anchor" },
  { name: "Carpaccio",          category: "dining" },
  { name: "Saddle River Café",  category: "dining" },
  { name: "Shake Shack",        category: "dining" },
  { name: "Toastique",          category: "dining" },
];

export const TENANT_GROWTH: { year: number; count: number }[] = [
  { year: 2020, count: 110 },
  { year: 2021, count: 180 },
  { year: 2022, count: 280 },
  { year: 2023, count: 360 },
  { year: 2024, count: 420 },
  { year: 2025, count: 450 },
];
```

- [ ] **Step 2: Create `lib/data/attractions.ts`**

```ts
import type { Attraction } from "@/lib/types";

export const ATTRACTIONS: Attraction[] = [
  {
    slug: "dreamworks",
    name: "DreamWorks Water Park",
    tagline: "The largest indoor water park in North America.",
    description: "Year-round, 85-degree paradise spanning 8.5 acres under a translucent dome — featuring 40 slides and the world's largest indoor wave pool.",
    stats: [
      { label: "Indoor acreage",      value: "8.5" },
      { label: "Slides",              value: "40" },
      { label: "Wave pool capacity",  value: "1.5M gal" },
    ],
    posterColor: "#0e6cff",
  },
  {
    slug: "nickelodeon",
    name: "Nickelodeon Universe",
    tagline: "The largest indoor theme park in the Western Hemisphere.",
    description: "Seven acres, 35+ rides, world-record-breaking coasters — Nickelodeon's signature characters reimagined inside a climate-controlled cathedral of fun.",
    stats: [
      { label: "Acres",        value: "8.5" },
      { label: "Rides",        value: "35+" },
      { label: "Tallest drop", value: "227 ft" },
    ],
    posterColor: "#ff7a00",
  },
  {
    slug: "big-snow",
    name: "Big SNOW",
    tagline: "North America's only indoor real-snow ski slope.",
    description: "Year-round skiing and snowboarding on a 16-story indoor mountain with eight lanes and a terrain park — open every day, regardless of season.",
    stats: [
      { label: "Vertical drop", value: "16 stories" },
      { label: "Lanes",         value: "8" },
      { label: "Temperature",   value: "28 °F" },
    ],
    posterColor: "#cdd9ec",
  },
  {
    slug: "sea-life",
    name: "Sea Life Aquarium",
    tagline: "An ocean within walking distance of Manhattan.",
    description: "3,000+ creatures across 30 themed habitats, plus Angry Birds Mini Golf — a one-of-a-kind family attraction inside the property.",
    stats: [
      { label: "Sea creatures", value: "3,000+" },
      { label: "Habitats",      value: "30" },
      { label: "Mini-golf holes", value: "18" },
    ],
    posterColor: "#0fb0a3",
  },
];
```

- [ ] **Step 3: Create `lib/data/venues.ts`**

```ts
import type { Venue } from "@/lib/types";

export const VENUES: Venue[] = [
  {
    slug: "the-rink",
    name: "The Rink",
    capacityMin: 200,
    capacityMax: 1500,
    dimensions: "NHL-size · 17,000 sq ft",
    features: ["Ice or floor convert", "Built-in sound", "Adjacent green rooms"],
    fits: ["Brand activation", "Corporate gala", "Private screening"],
  },
  {
    slug: "the-court",
    name: "The Court",
    capacityMin: 500,
    capacityMax: 3500,
    dimensions: "Soaring atrium · 4 stories of vertical signage",
    features: ["Stage-ready", "LED-mappable surfaces", "Multi-level viewing"],
    fits: ["Product launch", "Fashion show", "Award ceremony"],
  },
  {
    slug: "the-plaza",
    name: "The Plaza",
    capacityMin: 2000,
    capacityMax: 8000,
    dimensions: "Outdoor courtyard · 65,000 sq ft",
    features: ["NYC skyline backdrop", "Power + rigging", "Adjacent retail wing"],
    fits: ["Concert", "Festival", "Public-facing launch"],
  },
  {
    slug: "expo-hall",
    name: "Expo Hall",
    capacityMin: 1000,
    capacityMax: 12000,
    dimensions: "Convention floor · 120,000 sq ft column-free",
    features: ["Loading docks ×6", "30 ft ceilings", "Modular configuration"],
    fits: ["Convention", "Trade show", "Conference"],
  },
  {
    slug: "festival-grounds",
    name: "Festival Grounds",
    capacityMin: 5000,
    capacityMax: 25000,
    dimensions: "Outdoor event lawn · 8 acres",
    features: ["Full broadcast infrastructure", "Camp-build ready", "Adjacent parking 30K"],
    fits: ["Headline concert", "Festival", "Citywide moment"],
  },
];
```

- [ ] **Step 4: Create `lib/data/events.ts`**

```ts
import type { EventHighlight } from "@/lib/types";

export const EVENT_HIGHLIGHTS: EventHighlight[] = [
  { title: "Fashion Week Activation",   type: "activation", year: 2025, blurb: "Two-week luxury immersion across The Avenue and The Court." },
  { title: "Holiday Spectacular",       type: "seasonal",   year: 2024, blurb: "12-week programming run, 2.1M attendees, partner integrations across 8 brands." },
  { title: "Global Sneaker Launch",     type: "launch",     year: 2024, blurb: "Streamed-live tier-1 footwear release with 22-hour line management." },
  { title: "Tri-State Auto Show",       type: "convention", year: 2025, blurb: "Expo Hall + Plaza takeover, 95K attendees over 9 days." },
  { title: "Headline Concert Series",   type: "concert",    year: 2025, blurb: "Six festival-grounds shows, 18,000+ avg attendance." },
  { title: "Celebrity Meet-and-Greet",  type: "celebrity",  year: 2024, blurb: "Surprise activation, organic 40M+ social impressions in 48 hours." },
];
```

- [ ] **Step 5: Commit**

```bash
git add lib/data/
git commit -m "feat(data): seed tenants, attractions, venues, event highlights"
```

---

## Phase 2 — Primitives

### Task 2.1: `cn` already done. Now build motion primitives — `Reveal`

**Files:**
- Create: `components/motion/Reveal.tsx`

- [ ] **Step 1: Create `Reveal` component**

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

export function Reveal({ children, delay = 0, y = 24, className, once = true }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/motion/Reveal.tsx
git commit -m "feat(motion): add Reveal primitive"
```

---

### Task 2.2: `KineticType` — word-by-word reveal

**Files:**
- Create: `components/motion/KineticType.tsx`

- [ ] **Step 1: Create component**

```tsx
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

export function KineticType({ text, as: Tag = "h1", className, delay = 0, stagger = 0.06 }: KineticTypeProps) {
  const words = text.split(" ");
  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={cn("[overflow:hidden]", className)}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline">
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
```

- [ ] **Step 2: Commit**

```bash
git add components/motion/KineticType.tsx
git commit -m "feat(motion): add KineticType primitive"
```

---

### Task 2.3: `Counter` — animated number ticker

**Files:**
- Create: `components/motion/Counter.tsx`

- [ ] **Step 1: Create component**

```tsx
"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface CounterProps {
  value: string; // "3M+", "40M+", "450+", "12 min", etc.
  duration?: number;
  className?: string;
}

function parseNumeric(s: string): { num: number | null; prefix: string; suffix: string } {
  const match = s.match(/^([^\d.]*)([\d.]+)([^\d.]*)$/);
  if (!match) return { num: null, prefix: "", suffix: s };
  return { num: parseFloat(match[2]), prefix: match[1] ?? "", suffix: match[3] ?? "" };
}

export function Counter({ value, duration = 1.6, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const mv = useMotionValue(0);
  const { num, prefix, suffix } = parseNumeric(value);
  const target = num ?? 0;
  const rounded = useTransform(mv, (n) =>
    target >= 100 ? Math.round(n).toString() : n.toFixed(1)
  );

  useEffect(() => {
    if (inView && num !== null) {
      const controls = animate(mv, target, { duration, ease: [0.22, 1, 0.36, 1] });
      return controls.stop;
    }
  }, [inView, target, num, mv, duration]);

  if (num === null) {
    return <span ref={ref} className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/motion/Counter.tsx
git commit -m "feat(motion): add Counter primitive"
```

---

### Task 2.4: `LazyVideo` — IO-mounted video

**Files:**
- Create: `components/motion/LazyVideo.tsx`

- [ ] **Step 1: Create component**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  rootMargin?: string;
  preload?: "none" | "metadata" | "auto";
  fallbackBg?: string;
}

export function LazyVideo({
  src,
  poster,
  className,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  rootMargin = "200px",
  preload = "metadata",
  fallbackBg,
}: LazyVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const node = wrapRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setMounted(true);
            io.disconnect();
          }
        }
      },
      { rootMargin }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={wrapRef}
      className={cn("relative overflow-hidden", className)}
      style={fallbackBg ? { background: fallbackBg } : undefined}
      aria-hidden
    >
      {poster && !mounted && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
      )}
      {mounted && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload={preload}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/motion/LazyVideo.tsx
git commit -m "feat(motion): add LazyVideo with IntersectionObserver"
```

---

### Task 2.5: Lenis smooth-scroll provider

**Files:**
- Create: `components/motion/LenisProvider.tsx`

- [ ] **Step 1: Create provider**

```tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function LenisProvider() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
```

- [ ] **Step 2: Mount in layout**

Edit `app/layout.tsx` body:

```tsx
<body className="bg-ink text-ivory antialiased">
  <LenisProvider />
  {children}
</body>
```

Add the import: `import { LenisProvider } from "@/components/motion/LenisProvider";`

- [ ] **Step 3: Commit**

```bash
git add components/motion/LenisProvider.tsx app/layout.tsx
git commit -m "feat(motion): wire Lenis smooth scroll"
```

---

### Task 2.6: Button primitive (shadcn-style)

**Files:**
- Create: `components/ui/Button.tsx`

- [ ] **Step 1: Create button**

```tsx
"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium tracking-wide transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gilt disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary: "bg-gilt text-ink hover:bg-gilt-soft",
        ghost: "border border-ivory/20 text-ivory hover:border-gilt hover:text-gilt",
        link: "text-ivory underline-offset-4 hover:underline hover:text-gilt",
      },
      size: {
        sm: "h-9 px-4 text-xs uppercase",
        md: "h-12 px-7 text-sm uppercase",
        lg: "h-14 px-9 text-base uppercase tracking-[0.18em]",
      },
      shape: {
        pill: "rounded-full",
        sharp: "rounded-none",
      },
    },
    defaultVariants: { variant: "primary", size: "md", shape: "pill" },
  }
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
      <Comp ref={ref} className={cn(buttonVariants({ variant, size, shape, className }))} {...props} />
    );
  }
);
Button.displayName = "Button";
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/Button.tsx
git commit -m "feat(ui): add Button primitive"
```

---

### Task 2.7: Dialog primitive (Radix-wrapped)

**Files:**
- Create: `components/ui/Dialog.tsx`

- [ ] **Step 1: Create dialog wrapper**

```tsx
"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

export const DialogOverlay = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

export const DialogContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 grid w-[min(640px,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 gap-6 border border-ivory/10 bg-surface p-8 rounded-[var(--radius-card)] shadow-2xl",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full p-2 text-ivory/70 hover:text-ivory transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gilt">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = "DialogContent";

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-2", className)} {...props} />
);
export const DialogTitle = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("font-display text-2xl text-ivory", className)}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/Dialog.tsx
git commit -m "feat(ui): add Dialog primitive"
```

---

### Task 2.8: Tabs and Slider primitives (Radix-wrapped)

**Files:**
- Create: `components/ui/Tabs.tsx`
- Create: `components/ui/Slider.tsx`

- [ ] **Step 1: Create `Tabs.tsx`**

```tsx
"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;

export const TabsList = forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn("inline-flex gap-1 rounded-full border border-ivory/10 p-1", className)}
    {...props}
  />
));
TabsList.displayName = "TabsList";

export const TabsTrigger = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-full px-5 py-2 text-xs uppercase tracking-[0.18em] text-ivory/60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gilt",
      "data-[state=active]:bg-gilt data-[state=active]:text-ink",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cn("mt-6 focus-visible:outline-none", className)} {...props} />
));
TabsContent.displayName = "TabsContent";
```

- [ ] **Step 2: Create `Slider.tsx`**

```tsx
"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Slider = forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-[2px] w-full grow overflow-hidden rounded-full bg-ivory/10">
      <SliderPrimitive.Range className="absolute h-full bg-gilt" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-gilt bg-ink ring-offset-ink transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gilt focus-visible:ring-offset-2" />
  </SliderPrimitive.Root>
));
Slider.displayName = "Slider";
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/Tabs.tsx components/ui/Slider.tsx
git commit -m "feat(ui): add Tabs and Slider primitives"
```

---

## Phase 3 — Navigation Shell

### Task 3.1: `useChapterObserver` hook + `ChapterRail` nav

**Files:**
- Create: `lib/hooks/useChapterObserver.ts`
- Create: `components/nav/ChapterRail.tsx`

- [ ] **Step 1: Create hook**

```ts
"use client";

import { useEffect, useState } from "react";

export function useChapterObserver(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}
```

- [ ] **Step 2: Create `ChapterRail.tsx`**

```tsx
"use client";

import { CHAPTERS } from "@/lib/config/chapters";
import { useChapterObserver } from "@/lib/hooks/useChapterObserver";
import { cn } from "@/lib/utils";

export function ChapterRail() {
  const ids = CHAPTERS.map((c) => c.id);
  const active = useChapterObserver(ids);

  return (
    <nav
      aria-label="Chapters"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:flex"
    >
      <ul className="flex flex-col gap-5">
        {CHAPTERS.map((c) => {
          const isActive = active === c.id;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                aria-current={isActive ? "true" : undefined}
                aria-label={`Chapter ${c.eyebrow}: ${c.title}`}
                className="group flex items-center gap-3"
              >
                <span
                  className={cn(
                    "block h-[1px] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive ? "w-10 bg-gilt" : "w-5 bg-ivory/30 group-hover:bg-ivory"
                  )}
                />
                <span
                  className={cn(
                    "text-[10px] uppercase tracking-[0.24em] transition-colors",
                    isActive ? "text-gilt" : "text-ivory/40 group-hover:text-ivory"
                  )}
                >
                  {c.eyebrow}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add lib/hooks/useChapterObserver.ts components/nav/ChapterRail.tsx
git commit -m "feat(nav): add chapter rail with intersection-based active state"
```

---

### Task 3.2: `ProgressBar` (scroll progress)

**Files:**
- Create: `components/nav/ProgressBar.tsx`

- [ ] **Step 1: Create component**

```tsx
"use client";

import { motion, useScroll } from "framer-motion";

export function ProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed bottom-0 left-0 z-40 h-[2px] w-full origin-left bg-gilt"
      aria-hidden
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/nav/ProgressBar.tsx
git commit -m "feat(nav): add scroll progress bar"
```

---

### Task 3.3: `InquireDialog` — three-tab inquiry surface

**Files:**
- Create: `components/nav/InquireDialog.tsx`
- Create: `lib/inquiry.ts`

- [ ] **Step 1: Create `lib/inquiry.ts`** (zod schema)

```ts
import { z } from "zod";

export const inquirySchema = z.object({
  type: z.enum(["lease", "sponsor", "venue"]),
  segment: z.string().optional(),
  name: z.string().min(1, "Required"),
  company: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Please tell us a bit more (10+ characters)"),
  attendees: z.coerce.number().int().nonnegative().optional(),
  eventDate: z.string().optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export async function submitInquiry(input: InquiryInput): Promise<void> {
  // Stubbed for now — wired during deploy phase
  await new Promise((r) => setTimeout(r, 600));
  if (typeof window !== "undefined") {
    console.info("[inquiry]", input);
  }
}
```

- [ ] **Step 2: Create `InquireDialog.tsx`**

```tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/Dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { inquirySchema, submitInquiry, type InquiryInput } from "@/lib/inquiry";

interface InquireDialogProps {
  trigger?: React.ReactNode;
  defaultTab?: "lease" | "sponsor" | "venue";
  defaultSegment?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const COPY = {
  lease:   { title: "Lease at American Dream",   body: "Tell us about your brand and the space you're imagining." },
  sponsor: { title: "Sponsor & Partner",         body: "Partnership tiers tailored to your activation goals." },
  venue:   { title: "Book a Venue",              body: "Concerts, conventions, launches, and brand moments." },
};

export function InquireDialog({ trigger, defaultTab = "lease", defaultSegment, open, onOpenChange }: InquireDialogProps) {
  const [tab, setTab] = useState(defaultTab);
  const [submitted, setSubmitted] = useState(false);
  const {
    register, handleSubmit, formState: { errors, isSubmitting }, reset,
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { type: defaultTab, segment: defaultSegment },
  });

  async function onSubmit(values: InquiryInput) {
    await submitInquiry({ ...values, type: tab });
    setSubmitted(true);
    reset();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{COPY[tab].title}</DialogTitle>
          <DialogDescription>{COPY[tab].body}</DialogDescription>
        </DialogHeader>
        <Tabs value={tab} onValueChange={(v) => { setTab(v as typeof tab); setSubmitted(false); }}>
          <TabsList>
            <TabsTrigger value="lease">Lease</TabsTrigger>
            <TabsTrigger value="sponsor">Sponsor</TabsTrigger>
            <TabsTrigger value="venue">Book Venue</TabsTrigger>
          </TabsList>
          <TabsContent value={tab}>
            {submitted ? (
              <div className="py-8 text-center">
                <p className="font-display text-2xl text-gilt">Received.</p>
                <p className="mt-2 text-sm text-muted">Our team will be in touch within one business day.</p>
                <Button variant="ghost" size="sm" className="mt-6" onClick={() => setSubmitted(false)}>
                  Send another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <Field label="Your name"      error={errors.name?.message}>
                  <input {...register("name")} className={inputCls} />
                </Field>
                <Field label="Company"        error={errors.company?.message}>
                  <input {...register("company")} className={inputCls} />
                </Field>
                <Field label="Email"          error={errors.email?.message}>
                  <input type="email" {...register("email")} className={inputCls} />
                </Field>
                {tab === "venue" && (
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Expected attendees" error={errors.attendees?.message}>
                      <input type="number" {...register("attendees")} className={inputCls} />
                    </Field>
                    <Field label="Target date">
                      <input type="date" {...register("eventDate")} className={inputCls} />
                    </Field>
                  </div>
                )}
                <Field label="Message"        error={errors.message?.message}>
                  <textarea rows={4} {...register("message")} className={inputCls} />
                </Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending…" : "Send inquiry"}
                </Button>
              </form>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

const inputCls =
  "w-full rounded-md border border-ivory/15 bg-ink/40 px-3 py-2 text-sm text-ivory placeholder:text-ivory/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gilt";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] uppercase tracking-[0.18em] text-ivory/60">{label}</span>
      {children}
      {error ? <span className="text-xs text-red-400">{error}</span> : null}
    </label>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add lib/inquiry.ts components/nav/InquireDialog.tsx
git commit -m "feat(nav): add InquireDialog with lease/sponsor/venue tabs"
```

---

### Task 3.4: `DeckHeader` (logo + inquire CTA)

**Files:**
- Create: `components/nav/DeckHeader.tsx`

- [ ] **Step 1: Create component**

```tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { InquireDialog } from "@/components/nav/InquireDialog";

export function DeckHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 lg:px-10">
      <Link
        href="/"
        className="pointer-events-auto font-display text-base tracking-[0.32em] uppercase text-ivory"
      >
        American&nbsp;Dream
      </Link>
      <div className="pointer-events-auto">
        <InquireDialog
          trigger={<Button size="sm" variant="ghost">Inquire</Button>}
        />
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/nav/DeckHeader.tsx
git commit -m "feat(nav): add DeckHeader with logo and Inquire CTA"
```

---

### Task 3.5: Keyboard navigation (arrow keys + numerics)

**Files:**
- Create: `components/nav/KeyboardNav.tsx`

- [ ] **Step 1: Create component**

```tsx
"use client";

import { useEffect } from "react";
import { CHAPTERS } from "@/lib/config/chapters";

export function KeyboardNav() {
  useEffect(() => {
    function scrollTo(id: string) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    function currentIndex(): number {
      const y = window.scrollY + window.innerHeight * 0.5;
      let best = 0;
      let bestDist = Infinity;
      CHAPTERS.forEach((c, i) => {
        const el = document.getElementById(c.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const dist = Math.abs(top + el.offsetHeight / 2 - y);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      return best;
    }
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const idx = currentIndex();
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        const next = CHAPTERS[Math.min(idx + 1, CHAPTERS.length - 1)];
        if (next) { e.preventDefault(); scrollTo(next.id); }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        const prev = CHAPTERS[Math.max(idx - 1, 0)];
        if (prev) { e.preventDefault(); scrollTo(prev.id); }
      } else if (/^[1-8]$/.test(e.key)) {
        const target = CHAPTERS[Number(e.key) - 1];
        if (target) { e.preventDefault(); scrollTo(target.id); }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return null;
}
```

- [ ] **Step 2: Commit**

```bash
git add components/nav/KeyboardNav.tsx
git commit -m "feat(nav): add keyboard navigation"
```

---

### Task 3.6: Wire shell into root layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add shell components**

Replace the body block in `app/layout.tsx`:

```tsx
<body className="bg-ink text-ivory antialiased">
  <LenisProvider />
  <DeckHeader />
  <ChapterRail />
  <ProgressBar />
  <KeyboardNav />
  <main>{children}</main>
</body>
```

Add imports at the top:
```tsx
import { LenisProvider } from "@/components/motion/LenisProvider";
import { DeckHeader } from "@/components/nav/DeckHeader";
import { ChapterRail } from "@/components/nav/ChapterRail";
import { ProgressBar } from "@/components/nav/ProgressBar";
import { KeyboardNav } from "@/components/nav/KeyboardNav";
```

- [ ] **Step 2: Verify dev server**

```bash
npm run dev
```
Open `http://localhost:3000` — header logo + Inquire button visible, chapter rail on right (will be empty visually since chapters don't exist yet, but no console errors).

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(nav): wire navigation shell into root layout"
```

---

## Phase 4 — Phase 1 Chapters

### Task 4.1: `Section` wrapper + `Hero` chapter

**Files:**
- Create: `components/deck/Section.tsx`
- Create: `components/deck/Hero.tsx`
- Create: `app/page.tsx` (replace default)
- Place poster image: `public/images/hero-poster.jpg` (use placeholder/AI-gen during asset phase)
- Place video: `public/videos/hero.mp4` (placeholder during asset phase)

- [ ] **Step 1: Create `Section.tsx`**

```tsx
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  eyebrow?: string;
  className?: string;
  children: React.ReactNode;
}

export function Section({ id, eyebrow, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("relative w-full", className)}>
      {eyebrow && (
        <div className="absolute left-6 top-8 hidden lg:block">
          <span className="text-[10px] uppercase tracking-[0.32em] text-ivory/40">{eyebrow}</span>
        </div>
      )}
      {children}
    </section>
  );
}
```

- [ ] **Step 2: Create `Hero.tsx`**

```tsx
"use client";

import { ChevronDown } from "lucide-react";
import { Section } from "./Section";
import { LazyVideo } from "@/components/motion/LazyVideo";
import { KineticType } from "@/components/motion/KineticType";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { HEADLINE_METRICS } from "@/lib/data/metrics";

export function Hero() {
  return (
    <Section id="hero" className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <LazyVideo
        src="/videos/hero.mp4"
        poster="/images/hero-poster.jpg"
        fallbackBg="linear-gradient(135deg,#0A0A0B 0%,#1C1C24 60%,#0A0A0B 100%)"
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink/85" aria-hidden />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <Reveal delay={0.15}>
          <span className="text-[11px] uppercase tracking-[0.36em] text-ivory/70">
            East Rutherford, NJ · 12 minutes from Manhattan
          </span>
        </Reveal>

        <KineticType
          as="h1"
          text="Where retail becomes a destination."
          className="mt-8 max-w-5xl font-display text-[clamp(2.6rem,8vw,7.2rem)] leading-[0.95] tracking-tight text-ivory"
        />

        <Reveal delay={0.7}>
          <p className="mt-6 max-w-xl text-sm text-ivory/70 sm:text-base">
            Three million square feet. Forty million annual visitors. One unforgettable destination — and an unmatched canvas for the brands that meet them here.
          </p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-3 gap-x-8 gap-y-2 sm:gap-x-16">
          {HEADLINE_METRICS.map((m, i) => (
            <li key={m.label} className="text-center">
              <Reveal delay={1 + i * 0.12}>
                <div className="font-display text-3xl text-gilt sm:text-5xl">
                  <Counter value={m.value} />
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.24em] text-ivory/60">
                  {m.label}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <a
        href="#why-here"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-ivory/60 transition-colors hover:text-gilt"
        aria-label="Begin tour"
      >
        Begin tour
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </Section>
  );
}
```

- [ ] **Step 3: Create `app/page.tsx`**

```tsx
import { Hero } from "@/components/deck/Hero";

export default function Page() {
  return (
    <>
      <Hero />
    </>
  );
}
```

- [ ] **Step 4: Verify dev server**

```bash
npm run dev
```
Page should render hero — even without real video, fallback gradient is visible, text animates in, stats count up.

- [ ] **Step 5: Commit**

```bash
git add components/deck/ app/page.tsx
git commit -m "feat(chapters): add Hero chapter"
```

---

### Task 4.2: `WhyHere` chapter

**Files:**
- Create: `components/deck/WhyHere.tsx`
- Create: `components/deck/RegionMap.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `RegionMap.tsx`** — animated SVG NY metro

```tsx
"use client";

import { motion } from "framer-motion";

export function RegionMap() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-card)] border border-ivory/10 bg-surface">
      <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="glow" cx="60%" cy="48%" r="50%">
            <stop offset="0%" stopColor="#C9A24A" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#C9A24A" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Simplified abstract NY-NJ landmass */}
        <path
          d="M40 120 Q120 80 200 110 T380 90 L380 280 Q300 260 240 300 T120 360 L60 320 Z"
          fill="#14141A"
          stroke="#1C1C24"
          strokeWidth="1.5"
        />
        <path
          d="M220 240 Q300 270 360 230 L350 340 Q280 360 220 330 Z"
          fill="#0A0A0B"
          stroke="#1C1C24"
          strokeWidth="1.5"
        />
        {/* Manhattan marker */}
        <circle cx="245" cy="270" r="4" fill="#8B8B90" />
        <text x="252" y="274" className="fill-ivory/60 text-[10px]">Manhattan</text>
        {/* American Dream pin (glow + ring + dot) */}
        <circle cx="220" cy="240" r="120" fill="url(#glow)" />
        {[40, 70, 100].map((r, i) => (
          <motion.circle
            key={r}
            cx="220"
            cy="240"
            r={r}
            fill="none"
            stroke="#C9A24A"
            strokeOpacity={0.25}
            strokeWidth="1"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [0.6, 1, 1.1], opacity: [0, 0.5, 0] }}
            transition={{ duration: 4, delay: i * 0.8, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
        <circle cx="220" cy="240" r="6" fill="#C9A24A" />
        <text x="232" y="244" className="fill-gilt text-[11px] font-semibold">American Dream</text>
        {/* Driving radii labels */}
        <text x="40" y="430" className="fill-ivory/40 text-[9px] uppercase tracking-widest">15 min · 5M people</text>
        <text x="40" y="450" className="fill-ivory/40 text-[9px] uppercase tracking-widest">30 min · 22M people</text>
        <text x="40" y="470" className="fill-ivory/40 text-[9px] uppercase tracking-widest">60 min · 35M people</text>
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Create `WhyHere.tsx`**

```tsx
import { Section } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { KineticType } from "@/components/motion/KineticType";
import { Counter } from "@/components/motion/Counter";
import { RegionMap } from "./RegionMap";
import { REACH_METRICS } from "@/lib/data/metrics";

export function WhyHere() {
  return (
    <Section id="why-here" eyebrow="II · Why Here" className="px-6 py-32 lg:px-20 lg:py-48">
      <div className="mx-auto grid max-w-7xl items-start gap-16 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.32em] text-gilt">02 · Reach</span>
          <KineticType
            as="h2"
            text="The single most-trafficked corner of the Tri-State."
            className="mt-4 font-display text-[clamp(2rem,4.4vw,3.8rem)] leading-[1.02] tracking-tight"
          />
          <Reveal delay={0.4}>
            <p className="mt-6 max-w-xl text-base text-ivory/70">
              American Dream sits at the intersection of the largest media market on Earth and one of the densest concentrations of high-income households in North America. We are not in the neighborhood. We are the neighborhood.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <RegionMap />
        </Reveal>
      </div>

      <ul className="mx-auto mt-20 grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {REACH_METRICS.map((m, i) => (
          <Reveal key={m.label} delay={i * 0.08}>
            <li className="rounded-[var(--radius-card)] border border-ivory/10 bg-surface/60 p-6 backdrop-blur-sm">
              <div className="font-display text-3xl text-ivory">
                <Counter value={m.value} />
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-ivory/50">
                {m.label}
              </div>
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
```

- [ ] **Step 3: Add to `app/page.tsx`**

```tsx
import { Hero } from "@/components/deck/Hero";
import { WhyHere } from "@/components/deck/WhyHere";

export default function Page() {
  return (
    <>
      <Hero />
      <WhyHere />
    </>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/deck/ app/page.tsx
git commit -m "feat(chapters): add Why Here chapter with region map"
```

---

### Task 4.3: `Retail` chapter

**Files:**
- Create: `components/deck/Retail.tsx`
- Create: `components/deck/LogoMarquee.tsx`
- Create: `components/deck/GrowthChart.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `LogoMarquee.tsx`** (CSS-only auto-scroll)

```tsx
import { cn } from "@/lib/utils";

interface LogoMarqueeProps {
  items: string[];
  reverse?: boolean;
  speed?: number; // seconds per loop
  className?: string;
}

export function LogoMarquee({ items, reverse = false, speed = 50, className }: LogoMarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div className={cn("relative w-full overflow-hidden", className)} aria-hidden>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <ul
        className="flex gap-12 whitespace-nowrap will-change-transform"
        style={{
          animation: `marquee ${speed}s linear infinite ${reverse ? "reverse" : "normal"}`,
        }}
      >
        {doubled.map((label, i) => (
          <li
            key={`${label}-${i}`}
            className="flex h-20 items-center justify-center px-6 font-display text-2xl tracking-wide text-ivory/55 transition-colors hover:text-ivory"
          >
            {label}
          </li>
        ))}
      </ul>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
```

- [ ] **Step 2: Create `GrowthChart.tsx`** (hand-rolled SVG bar chart)

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TENANT_GROWTH } from "@/lib/data/tenants";

export function GrowthChart() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const max = Math.max(...TENANT_GROWTH.map((d) => d.count));
  const W = 600;
  const H = 220;
  const padding = 32;
  const barW = (W - padding * 2) / TENANT_GROWTH.length - 14;

  return (
    <div className="rounded-[var(--radius-card)] border border-ivory/10 bg-surface/60 p-6">
      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-2xl text-ivory">Tenants by year</h3>
        <span className="text-xs uppercase tracking-[0.18em] text-ivory/50">2020 → 2025</span>
      </div>
      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="mt-6 w-full" role="img" aria-label="Tenant growth chart">
        {TENANT_GROWTH.map((d, i) => {
          const x = padding + i * (barW + 14);
          const h = ((H - padding * 2) * d.count) / max;
          return (
            <g key={d.year}>
              <motion.rect
                x={x}
                y={H - padding}
                width={barW}
                height={0}
                fill="#C9A24A"
                fillOpacity={0.8}
                initial={false}
                animate={inView ? { y: H - padding - h, height: h } : {}}
                transition={{ duration: 1.1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                rx={4}
              />
              <text
                x={x + barW / 2}
                y={H - padding + 16}
                textAnchor="middle"
                className="fill-ivory/50 text-[10px]"
              >
                {d.year}
              </text>
              <text
                x={x + barW / 2}
                y={H - padding - h - 6}
                textAnchor="middle"
                className="fill-ivory/80 text-[10px]"
              >
                {d.count}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
```

- [ ] **Step 3: Create `Retail.tsx`**

```tsx
import { Section } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { KineticType } from "@/components/motion/KineticType";
import { LogoMarquee } from "./LogoMarquee";
import { GrowthChart } from "./GrowthChart";
import { TENANTS } from "@/lib/data/tenants";

export function Retail() {
  const row1 = TENANTS.filter((_, i) => i % 2 === 0).map((t) => t.name);
  const row2 = TENANTS.filter((_, i) => i % 2 === 1).map((t) => t.name);
  const counts = TENANTS.reduce<Record<string, number>>((acc, t) => {
    acc[t.category] = (acc[t.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <Section id="retail" eyebrow="III · Retail" className="px-6 py-32 lg:px-20 lg:py-48">
      <div className="mx-auto max-w-7xl">
        <span className="text-[10px] uppercase tracking-[0.32em] text-gilt">03 · Retail</span>
        <KineticType
          as="h2"
          text="Where 450+ brands meet their next 40 million customers."
          className="mt-4 max-w-4xl font-display text-[clamp(2rem,4.4vw,3.8rem)] leading-[1.02] tracking-tight"
        />
      </div>

      <div className="mt-20">
        <LogoMarquee items={row1} speed={60} />
        <div className="mt-6">
          <LogoMarquee items={row2} reverse speed={75} />
        </div>
      </div>

      <div className="mx-auto mt-24 grid max-w-7xl gap-8 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div className="rounded-[var(--radius-card)] border border-ivory/10 bg-surface/60 p-6">
            <h3 className="font-display text-2xl text-ivory">Across every tier.</h3>
            <ul className="mt-6 grid grid-cols-2 gap-y-4 text-sm">
              {[
                { label: "Anchor",    key: "anchor" },
                { label: "Lifestyle", key: "lifestyle" },
                { label: "Specialty", key: "specialty" },
                { label: "Luxury",    key: "luxury" },
                { label: "Dining",    key: "dining" },
              ].map((c) => (
                <li key={c.key} className="flex items-baseline justify-between pr-6">
                  <span className="text-ivory/70">{c.label}</span>
                  <span className="font-display text-2xl text-gilt">{counts[c.key] ?? 0}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <GrowthChart />
        </Reveal>
      </div>
    </Section>
  );
}
```

- [ ] **Step 4: Add to `app/page.tsx`**

```tsx
import { Retail } from "@/components/deck/Retail";
// ...
<Retail />
```

- [ ] **Step 5: Commit**

```bash
git add components/deck/ app/page.tsx
git commit -m "feat(chapters): add Retail chapter with marquee and growth chart"
```

---

### Task 4.4: `Luxury` chapter — The Avenue

**Files:**
- Create: `components/deck/Luxury.tsx`
- Modify: `app/page.tsx`
- Asset slot: `public/videos/luxury.mp4`, `public/images/luxury-poster.jpg`

- [ ] **Step 1: Create `Luxury.tsx`**

```tsx
import { Section } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { LazyVideo } from "@/components/motion/LazyVideo";
import { KineticType } from "@/components/motion/KineticType";
import { TENANTS } from "@/lib/data/tenants";

export function Luxury() {
  const houses = TENANTS.filter((t) => t.category === "luxury");

  return (
    <Section id="luxury" className="relative min-h-[100svh] overflow-hidden">
      <LazyVideo
        src="/videos/luxury.mp4"
        poster="/images/luxury-poster.jpg"
        fallbackBg="linear-gradient(135deg,#0A0A0B 0%,#1C1C24 100%)"
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/55 to-ink" aria-hidden />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-center px-6 py-40 lg:min-h-[100svh] lg:px-20">
        <span className="text-[10px] uppercase tracking-[0.32em] text-gilt">IV · The Avenue</span>
        <KineticType
          as="h2"
          text="A luxury wing built like a private invitation."
          className="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.02] tracking-tight text-ivory"
        />
        <Reveal delay={0.4}>
          <p className="mt-8 max-w-2xl border-l border-gilt/40 pl-6 font-display text-xl italic leading-relaxed text-ivory/80 lg:text-2xl">
            “The only place outside Fifth Avenue where luxury feels at home.”
          </p>
        </Reveal>

        <Reveal delay={0.6}>
          <ul className="mt-16 flex flex-wrap gap-x-10 gap-y-5">
            {houses.map((h) => (
              <li key={h.name} className="font-display text-xl tracking-wide text-ivory/80">
                {h.name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
import { Luxury } from "@/components/deck/Luxury";
// ...
<Luxury />
```

- [ ] **Step 3: Commit**

```bash
git add components/deck/Luxury.tsx app/page.tsx
git commit -m "feat(chapters): add Luxury (The Avenue) chapter"
```

---

### Task 4.5: `DiningLifestyle` chapter (bento grid)

**Files:**
- Create: `components/deck/DiningLifestyle.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create component**

```tsx
import Image from "next/image";
import { Section } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { KineticType } from "@/components/motion/KineticType";

const TILES = [
  { label: "Hudson Food Hall",  blurb: "Two-floor culinary marketplace", span: "lg:col-span-2 lg:row-span-2", tone: "from-amber-900/30 to-amber-700/10" },
  { label: "Korean Food Hall",  blurb: "12 vendors, one block of Seoul", span: "lg:col-span-1 lg:row-span-1", tone: "from-rose-900/30 to-rose-700/10" },
  { label: "Kosher Food Hall",  blurb: "Largest in the Northeast",       span: "lg:col-span-1 lg:row-span-1", tone: "from-blue-900/30 to-blue-700/10" },
  { label: "Carpaccio",         blurb: "Italian fine dining",            span: "lg:col-span-1 lg:row-span-1", tone: "from-stone-800/40 to-stone-600/10" },
  { label: "Saddle River Café", blurb: "All-day social spot",            span: "lg:col-span-1 lg:row-span-1", tone: "from-emerald-900/30 to-emerald-700/10" },
  { label: "Shake Shack",       blurb: "An American staple",             span: "lg:col-span-1 lg:row-span-1", tone: "from-yellow-900/30 to-yellow-700/10" },
];

export function DiningLifestyle() {
  return (
    <Section id="dining" eyebrow="V · Dining" className="px-6 py-32 lg:px-20 lg:py-48">
      <div className="mx-auto max-w-7xl">
        <span className="text-[10px] uppercase tracking-[0.32em] text-gilt">05 · Dining & Lifestyle</span>
        <KineticType
          as="h2"
          text="Dining as destination."
          className="mt-4 font-display text-[clamp(2rem,4.4vw,3.8rem)] leading-[1.02] tracking-tight"
        />
        <Reveal delay={0.3}>
          <p className="mt-6 max-w-2xl text-base text-ivory/70">
            120+ restaurants and food experiences, anchored by the largest concentration of culinary halls in the New York metro — designed to keep guests on-property through breakfast, lunch, dinner, and late night.
          </p>
        </Reveal>

        <div className="mt-16 grid auto-rows-[180px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:auto-rows-[200px]">
          {TILES.map((t, i) => (
            <Reveal key={t.label} delay={i * 0.06} className={t.span}>
              <article
                className={`group relative h-full overflow-hidden rounded-[var(--radius-card)] border border-ivory/10 bg-gradient-to-br ${t.tone} p-6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent_60%)]" aria-hidden />
                <div className="relative flex h-full flex-col justify-end">
                  <h3 className="font-display text-xl text-ivory lg:text-2xl">{t.label}</h3>
                  <p className="mt-1 text-xs text-ivory/60">{t.blurb}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Add to `app/page.tsx`** and commit

```bash
git add components/deck/DiningLifestyle.tsx app/page.tsx
git commit -m "feat(chapters): add Dining & Lifestyle bento chapter"
```

---

### Task 4.6: `Attractions` chapter with lightbox

**Files:**
- Create: `components/deck/Attractions.tsx`
- Create: `components/deck/AttractionTile.tsx`
- Create: `components/deck/AttractionLightbox.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `AttractionTile.tsx`**

```tsx
"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Attraction } from "@/lib/types";

interface AttractionTileProps {
  attraction: Attraction;
  onOpen: () => void;
}

export function AttractionTile({ attraction, onOpen }: AttractionTileProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState(false);

  function handleEnter() {
    setHover(true);
    videoRef.current?.play().catch(() => undefined);
  }
  function handleLeave() {
    setHover(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      className="group relative h-[420px] w-full overflow-hidden rounded-[var(--radius-card)] border border-ivory/10 text-left transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gilt"
      style={{ background: attraction.posterColor }}
      aria-label={`Open ${attraction.name} details`}
    >
      <video
        ref={videoRef}
        src={`/videos/${attraction.slug}.mp4`}
        poster={`/images/${attraction.slug}-poster.jpg`}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent"
        animate={{ opacity: hover ? 0.65 : 0.9 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />
      <div className="relative flex h-full flex-col justify-end p-6">
        <span className="text-[10px] uppercase tracking-[0.28em] text-gilt">{attraction.tagline}</span>
        <h3 className="mt-3 font-display text-3xl text-ivory">{attraction.name}</h3>
        <span className="mt-4 text-[11px] uppercase tracking-[0.24em] text-ivory/60">Open details →</span>
      </div>
    </button>
  );
}
```

- [ ] **Step 2: Create `AttractionLightbox.tsx`**

```tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/Dialog";
import { LazyVideo } from "@/components/motion/LazyVideo";
import { Counter } from "@/components/motion/Counter";
import type { Attraction } from "@/lib/types";

interface AttractionLightboxProps {
  attraction: Attraction | null;
  onClose: () => void;
}

export function AttractionLightbox({ attraction, onClose }: AttractionLightboxProps) {
  return (
    <Dialog open={!!attraction} onOpenChange={(o) => !o && onClose()}>
      {attraction && (
        <DialogContent className="grid w-[min(960px,calc(100%-2rem))] gap-0 overflow-hidden p-0 lg:grid-cols-[1.2fr_1fr]">
          <LazyVideo
            src={`/videos/${attraction.slug}.mp4`}
            poster={`/images/${attraction.slug}-poster.jpg`}
            fallbackBg={attraction.posterColor}
            className="relative aspect-video lg:aspect-auto lg:h-full"
          />
          <div className="flex flex-col gap-4 p-8">
            <DialogHeader>
              <span className="text-[10px] uppercase tracking-[0.28em] text-gilt">Attraction</span>
              <DialogTitle>{attraction.name}</DialogTitle>
              <DialogDescription>{attraction.tagline}</DialogDescription>
            </DialogHeader>
            <p className="text-sm text-ivory/70">{attraction.description}</p>
            <ul className="mt-2 grid grid-cols-3 gap-3">
              {attraction.stats.map((s) => (
                <li key={s.label} className="rounded-md border border-ivory/10 p-3">
                  <div className="font-display text-xl text-gilt">
                    <Counter value={s.value} />
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-ivory/50">
                    {s.label}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
```

- [ ] **Step 3: Create `Attractions.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Section } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { KineticType } from "@/components/motion/KineticType";
import { AttractionTile } from "./AttractionTile";
import { AttractionLightbox } from "./AttractionLightbox";
import { ATTRACTIONS } from "@/lib/data/attractions";
import type { Attraction } from "@/lib/types";

export function Attractions() {
  const [open, setOpen] = useState<Attraction | null>(null);

  return (
    <Section id="attractions" eyebrow="VI · Attractions" className="px-6 py-32 lg:px-20 lg:py-48">
      <div className="mx-auto max-w-7xl">
        <span className="text-[10px] uppercase tracking-[0.32em] text-gilt">06 · Attractions</span>
        <KineticType
          as="h2"
          text="An entire city of experiences."
          className="mt-4 max-w-4xl font-display text-[clamp(2rem,4.4vw,3.8rem)] leading-[1.02] tracking-tight"
        />
        <Reveal delay={0.3}>
          <p className="mt-6 max-w-2xl text-base text-ivory/70">
            What separates a mega-destination from a mall: the reasons you have to come, even when you weren't planning to shop.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {ATTRACTIONS.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.1}>
              <AttractionTile attraction={a} onOpen={() => setOpen(a)} />
            </Reveal>
          ))}
        </div>
      </div>
      <AttractionLightbox attraction={open} onClose={() => setOpen(null)} />
    </Section>
  );
}
```

- [ ] **Step 4: Add to `app/page.tsx`** and commit

```bash
git add components/deck/ app/page.tsx
git commit -m "feat(chapters): add Attractions chapter with hover-video tiles and lightbox"
```

---

### Task 4.7: `EventsPlatform` chapter

**Files:**
- Create: `components/deck/EventsPlatform.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create component**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Section } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { KineticType } from "@/components/motion/KineticType";
import { Counter } from "@/components/motion/Counter";
import { Button } from "@/components/ui/Button";
import { InquireDialog } from "@/components/nav/InquireDialog";
import { EVENTS_METRICS } from "@/lib/data/metrics";
import { EVENT_HIGHLIGHTS } from "@/lib/data/events";

const TYPE_TONES: Record<string, string> = {
  concert:    "from-fuchsia-900/30 to-fuchsia-700/10",
  launch:     "from-cyan-900/30 to-cyan-700/10",
  convention: "from-indigo-900/30 to-indigo-700/10",
  activation: "from-orange-900/30 to-orange-700/10",
  celebrity:  "from-rose-900/30 to-rose-700/10",
  seasonal:   "from-emerald-900/30 to-emerald-700/10",
};

export function EventsPlatform() {
  const [openTab, setOpenTab] = useState<"venue" | "sponsor" | null>(null);

  return (
    <Section id="events-platform" eyebrow="VII · Events" className="px-6 py-32 lg:px-20 lg:py-48">
      <div className="mx-auto max-w-7xl">
        <span className="text-[10px] uppercase tracking-[0.32em] text-gilt">07 · Events & Platform</span>
        <KineticType
          as="h2"
          text="A stage built for global moments."
          className="mt-4 max-w-4xl font-display text-[clamp(2rem,4.4vw,3.8rem)] leading-[1.02] tracking-tight"
        />
        <Reveal delay={0.3}>
          <p className="mt-6 max-w-2xl text-base text-ivory/70">
            Twelve programmable venues. Twenty-five-thousand-capacity festival grounds. Year-round programming that turns brand activations into citywide moments.
          </p>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {EVENTS_METRICS.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08}>
              <li className="rounded-[var(--radius-card)] border border-ivory/10 bg-surface/60 p-6">
                <div className="font-display text-3xl text-gilt">
                  <Counter value={m.value} />
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-ivory/50">{m.label}</div>
              </li>
            </Reveal>
          ))}
        </ul>

        <div className="mt-20">
          <h3 className="font-display text-2xl text-ivory">Past activations</h3>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EVENT_HIGHLIGHTS.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.06}>
                <article
                  className={`group relative h-56 overflow-hidden rounded-[var(--radius-card)] border border-ivory/10 bg-gradient-to-br ${TYPE_TONES[e.type]} p-6`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_60%)]" aria-hidden />
                  <div className="relative flex h-full flex-col justify-between">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-gilt">{e.type} · {e.year}</span>
                    <div>
                      <h4 className="font-display text-xl text-ivory">{e.title}</h4>
                      <p className="mt-2 text-xs text-ivory/60">{e.blurb}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Button asChild>
            <Link href="/events">Book a Concert</Link>
          </Button>
          <Button variant="ghost" onClick={() => setOpenTab("sponsor")}>
            Activate Your Brand
          </Button>
          <Button asChild variant="ghost">
            <Link href="/events">Plan a Convention</Link>
          </Button>
        </div>

        <InquireDialog
          open={openTab === "sponsor"}
          onOpenChange={(o) => setOpenTab(o ? "sponsor" : null)}
          defaultTab="sponsor"
        />
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Add to `app/page.tsx`** and commit

```bash
git add components/deck/EventsPlatform.tsx app/page.tsx
git commit -m "feat(chapters): add Events & Platform chapter"
```

---

### Task 4.8: `Close` chapter

**Files:**
- Create: `components/deck/Close.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create component**

```tsx
"use client";

import { useState } from "react";
import { Section } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { KineticType } from "@/components/motion/KineticType";
import { LazyVideo } from "@/components/motion/LazyVideo";
import { Button } from "@/components/ui/Button";
import { InquireDialog } from "@/components/nav/InquireDialog";
import type { InquiryType } from "@/lib/types";

export function Close() {
  const [tab, setTab] = useState<InquiryType | null>(null);

  return (
    <Section id="close" className="relative min-h-[100svh] overflow-hidden">
      <LazyVideo
        src="/videos/close.mp4"
        poster="/images/close-poster.jpg"
        fallbackBg="linear-gradient(135deg,#0A0A0B 0%,#1C1C24 60%,#0A0A0B 100%)"
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/65 to-ink" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-6 py-32 text-center">
        <span className="text-[10px] uppercase tracking-[0.36em] text-gilt">VIII · Build with us</span>
        <KineticType
          as="h2"
          text="Build your next chapter here."
          className="mt-6 font-display text-[clamp(2.4rem,7vw,6.4rem)] leading-[1.02] tracking-tight text-ivory"
        />
        <Reveal delay={0.5}>
          <p className="mt-6 max-w-xl text-base text-ivory/70">
            Tell us what you want to do. Our team responds within one business day.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Button size="lg" onClick={() => setTab("lease")}>Lease</Button>
          <Button size="lg" variant="ghost" onClick={() => setTab("sponsor")}>Sponsor</Button>
          <Button size="lg" variant="ghost" onClick={() => setTab("venue")}>Book a Venue</Button>
        </div>

        <footer className="mt-24 grid grid-cols-1 gap-2 text-xs text-ivory/50 sm:grid-cols-3">
          <div>One American Dream Way · East Rutherford, NJ</div>
          <div>partners@americandream.example</div>
          <div>+1 (201) 555-0199</div>
        </footer>
      </div>

      <InquireDialog
        open={tab !== null}
        onOpenChange={(o) => setTab(o ? (tab ?? "lease") : null)}
        defaultTab={tab ?? "lease"}
      />
    </Section>
  );
}
```

- [ ] **Step 2: Final `app/page.tsx` assembly**

```tsx
import { Hero } from "@/components/deck/Hero";
import { WhyHere } from "@/components/deck/WhyHere";
import { Retail } from "@/components/deck/Retail";
import { Luxury } from "@/components/deck/Luxury";
import { DiningLifestyle } from "@/components/deck/DiningLifestyle";
import { Attractions } from "@/components/deck/Attractions";
import { EventsPlatform } from "@/components/deck/EventsPlatform";
import { Close } from "@/components/deck/Close";

export default function Page() {
  return (
    <>
      <Hero />
      <WhyHere />
      <Retail />
      <Luxury />
      <DiningLifestyle />
      <Attractions />
      <EventsPlatform />
      <Close />
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/deck/Close.tsx app/page.tsx
git commit -m "feat(chapters): add Close chapter and assemble full Phase 1 deck"
```

---

## Phase 5 — Phase 2 Sub-modules

### Task 5.1: Venue capacity logic + unit test

**Files:**
- Create: `lib/venue-filter.ts`
- Create: `lib/venue-filter.test.ts`
- Create: `vitest.config.ts`

- [ ] **Step 1: Add Vitest config**

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
  test: {
    environment: "jsdom",
    globals: true,
  },
});
```

Add test script to `package.json`:
```json
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 2: Write the failing test**

```ts
// lib/venue-filter.test.ts
import { describe, expect, it } from "vitest";
import { filterVenuesByCapacity } from "./venue-filter";
import { VENUES } from "./data/venues";

describe("filterVenuesByCapacity", () => {
  it("returns venues whose capacity range contains the attendee count", () => {
    const result = filterVenuesByCapacity(VENUES, 4000);
    const names = result.map((v) => v.name);
    expect(names).toContain("The Plaza");
    expect(names).toContain("Expo Hall");
    expect(names).not.toContain("The Rink");
  });

  it("returns the smallest venue when attendee count is below all minimums", () => {
    const result = filterVenuesByCapacity(VENUES, 50);
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("The Rink");
  });

  it("returns the largest venue when attendee count is above all maximums", () => {
    const result = filterVenuesByCapacity(VENUES, 50000);
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("Festival Grounds");
  });

  it("orders matches by closeness to the midpoint of each venue's range", () => {
    const result = filterVenuesByCapacity(VENUES, 7500);
    expect(result[0]?.name).toBe("The Plaza"); // midpoint 5000, dist 2500
  });
});
```

- [ ] **Step 3: Run test, expect FAIL**

```bash
npm run test
```
Expected: import error / function not defined.

- [ ] **Step 4: Implement `lib/venue-filter.ts`**

```ts
import type { Venue } from "./types";

export function filterVenuesByCapacity(venues: Venue[], attendees: number): Venue[] {
  const inRange = venues.filter(
    (v) => attendees >= v.capacityMin && attendees <= v.capacityMax
  );
  if (inRange.length > 0) {
    return [...inRange].sort((a, b) => {
      const midA = (a.capacityMin + a.capacityMax) / 2;
      const midB = (b.capacityMin + b.capacityMax) / 2;
      return Math.abs(midA - attendees) - Math.abs(midB - attendees);
    });
  }
  const minMin = Math.min(...venues.map((v) => v.capacityMin));
  if (attendees < minMin) {
    return venues
      .filter((v) => v.capacityMin === minMin)
      .slice(0, 1);
  }
  const maxMax = Math.max(...venues.map((v) => v.capacityMax));
  return venues.filter((v) => v.capacityMax === maxMax).slice(0, 1);
}
```

- [ ] **Step 5: Run test, expect PASS**

```bash
npm run test
```
Expected: all 4 tests pass.

- [ ] **Step 6: Commit**

```bash
git add lib/venue-filter.ts lib/venue-filter.test.ts vitest.config.ts package.json
git commit -m "feat(events): add capacity filter with tests"
```

---

### Task 5.2: `/events` route — capacity calculator UI

**Files:**
- Create: `app/events/page.tsx`
- Create: `components/events/CapacityCalculator.tsx`
- Create: `components/events/VenueCard.tsx`

- [ ] **Step 1: Create `VenueCard.tsx`**

```tsx
import type { Venue } from "@/lib/types";

export function VenueCard({ venue }: { venue: Venue }) {
  return (
    <article className="rounded-[var(--radius-card)] border border-ivory/10 bg-surface/60 p-6">
      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-2xl text-ivory">{venue.name}</h3>
        <span className="font-display text-base text-gilt">
          {venue.capacityMin.toLocaleString()} – {venue.capacityMax.toLocaleString()}
        </span>
      </div>
      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-ivory/50">{venue.dimensions}</p>
      <ul className="mt-4 grid grid-cols-1 gap-1 text-sm text-ivory/70">
        {venue.features.map((f) => (
          <li key={f} className="flex items-start gap-2 before:content-['—'] before:text-gilt">
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-2">
        {venue.fits.map((fit) => (
          <span key={fit} className="rounded-full border border-ivory/15 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-ivory/60">
            {fit}
          </span>
        ))}
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Create `CapacityCalculator.tsx`**

```tsx
"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Slider } from "@/components/ui/Slider";
import { VenueCard } from "./VenueCard";
import { VENUES } from "@/lib/data/venues";
import { filterVenuesByCapacity } from "@/lib/venue-filter";

const MIN = 50;
const MAX = 25000;
const STEPS = [50, 200, 500, 1500, 3500, 8000, 12000, 25000];

export function CapacityCalculator() {
  const [attendees, setAttendees] = useState(2500);
  const matches = useMemo(() => filterVenuesByCapacity(VENUES, attendees), [attendees]);

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
      <div className="self-start lg:sticky lg:top-32">
        <h2 className="font-display text-3xl text-ivory">How many people are coming?</h2>
        <p className="mt-3 text-sm text-ivory/60">
          Slide to your expected attendance. The venues below filter live to show what fits.
        </p>
        <div className="mt-10">
          <div className="flex items-baseline justify-between">
            <span className="font-display text-5xl text-gilt">{attendees.toLocaleString()}</span>
            <span className="text-[10px] uppercase tracking-[0.24em] text-ivory/50">attendees</span>
          </div>
          <Slider
            className="mt-6"
            value={[attendees]}
            onValueChange={([v]) => v !== undefined && setAttendees(v)}
            min={MIN}
            max={MAX}
            step={50}
          />
          <ul className="mt-3 flex justify-between text-[10px] uppercase tracking-widest text-ivory/40">
            {STEPS.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  className="transition-colors hover:text-ivory"
                  onClick={() => setAttendees(s)}
                >
                  {s >= 1000 ? `${s / 1000}K` : s}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {matches.map((v) => (
            <motion.div
              key={v.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <VenueCard venue={v} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `app/events/page.tsx`**

```tsx
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { KineticType } from "@/components/motion/KineticType";
import { LazyVideo } from "@/components/motion/LazyVideo";
import { Button } from "@/components/ui/Button";
import { CapacityCalculator } from "@/components/events/CapacityCalculator";
import { InquireDialog } from "@/components/nav/InquireDialog";

export const metadata = {
  title: "Events — American Dream",
  description: "Book a venue at American Dream. Twelve programmable spaces from 200 to 25,000 capacity.",
};

export default function EventsPage() {
  return (
    <>
      <section id="events-hero" className="relative h-[80svh] min-h-[520px] overflow-hidden">
        <LazyVideo
          src="/videos/events-hero.mp4"
          poster="/images/events-hero-poster.jpg"
          fallbackBg="linear-gradient(135deg,#0A0A0B 0%,#1C1C24 100%)"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink" aria-hidden />
        <div className="relative z-10 flex h-full flex-col items-start justify-end px-6 pb-24 lg:px-20">
          <Link
            href="/"
            className="text-[10px] uppercase tracking-[0.24em] text-ivory/60 hover:text-gilt"
          >
            ← Back to deck
          </Link>
          <span className="mt-6 text-[10px] uppercase tracking-[0.36em] text-gilt">Events Module</span>
          <KineticType
            as="h1"
            text="Find your venue. Live."
            className="mt-3 max-w-3xl font-display text-[clamp(2.4rem,6vw,5.6rem)] leading-[1] tracking-tight"
          />
          <Reveal delay={0.5}>
            <p className="mt-6 max-w-xl text-sm text-ivory/70">
              From 200-person private screenings to 25,000-capacity festival grounds, every American Dream venue is purpose-built and programmable.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-20">
        <CapacityCalculator />
      </section>

      <section className="px-6 pb-32 lg:px-20">
        <div className="mx-auto max-w-3xl rounded-[var(--radius-card)] border border-ivory/10 bg-surface/60 p-10 text-center">
          <h2 className="font-display text-3xl text-ivory">Ready to book?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-ivory/70">
            Send us the basics. Our events team will respond within one business day with availability and a tailored proposal.
          </p>
          <div className="mt-6 inline-flex">
            <InquireDialog
              trigger={<Button size="md">Request availability</Button>}
              defaultTab="venue"
            />
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add app/events/ components/events/
git commit -m "feat(events): add /events module with live capacity calculator"
```

---

### Task 5.3: `/sponsorship` and `/leasing` placeholder routes

**Files:**
- Create: `app/sponsorship/page.tsx`
- Create: `app/leasing/page.tsx`
- Create: `components/placeholder/ComingSoonPage.tsx`

- [ ] **Step 1: Create `ComingSoonPage.tsx`**

```tsx
import Link from "next/link";
import { KineticType } from "@/components/motion/KineticType";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { InquireDialog } from "@/components/nav/InquireDialog";
import type { InquiryType } from "@/lib/types";

interface ComingSoonPageProps {
  eyebrow: string;
  title: string;
  body: string;
  inquiryTab: InquiryType;
}

export function ComingSoonPage({ eyebrow, title, body, inquiryTab }: ComingSoonPageProps) {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-start justify-center px-6 py-32 lg:px-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(201,162,74,0.10),transparent_60%)]"
      />
      <div className="relative z-10 max-w-4xl">
        <Link href="/" className="text-[10px] uppercase tracking-[0.24em] text-ivory/60 hover:text-gilt">
          ← Back to deck
        </Link>
        <span className="mt-8 block text-[10px] uppercase tracking-[0.36em] text-gilt">{eyebrow}</span>
        <KineticType
          as="h1"
          text={title}
          className="mt-4 font-display text-[clamp(2.4rem,6vw,5.6rem)] leading-[1.02] tracking-tight"
        />
        <Reveal delay={0.4}>
          <p className="mt-8 max-w-2xl text-base text-ivory/70">{body}</p>
        </Reveal>
        <Reveal delay={0.6}>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <InquireDialog
              trigger={<Button size="md">Start the conversation</Button>}
              defaultTab={inquiryTab}
            />
            <Button asChild variant="ghost" size="md">
              <Link href="/events">Explore events module →</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `app/sponsorship/page.tsx`**

```tsx
import { ComingSoonPage } from "@/components/placeholder/ComingSoonPage";

export const metadata = {
  title: "Sponsorship — American Dream",
  description: "Partnership and sponsorship opportunities at American Dream.",
};

export default function SponsorshipPage() {
  return (
    <ComingSoonPage
      eyebrow="Sponsorship Module"
      title="Brand partnerships, at scale."
      body="A dedicated sponsorship experience — partnership tiers, audience data, and activation case studies — is coming. In the meantime, our partnerships team can walk you through a tailored proposal."
      inquiryTab="sponsor"
    />
  );
}
```

- [ ] **Step 3: Create `app/leasing/page.tsx`**

```tsx
import { ComingSoonPage } from "@/components/placeholder/ComingSoonPage";

export const metadata = {
  title: "Leasing — American Dream",
  description: "Leasing inquiries for luxury, retail, F&B, and pop-up at American Dream.",
};

export default function LeasingPage() {
  return (
    <ComingSoonPage
      eyebrow="Leasing Module"
      title="Your space, on the world's stage."
      body="A segmented leasing experience for luxury, retail, F&B, and pop-up tenants is in production. To start a conversation now, send us a brief — our leasing team will follow up within one business day."
      inquiryTab="lease"
    />
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add app/sponsorship/ app/leasing/ components/placeholder/
git commit -m "feat(routes): add sponsorship and leasing placeholder modules"
```

---

## Phase 6 — Assets & Polish

### Task 6.1: Source and optimize assets

**Files:**
- Place under `public/videos/`: `hero.mp4`, `luxury.mp4`, `close.mp4`, `events-hero.mp4`, `dreamworks.mp4`, `nickelodeon.mp4`, `big-snow.mp4`, `sea-life.mp4`
- Place under `public/images/`: matching `-poster.jpg` posters for each video, plus `hero-poster.jpg`

This is the only manual / external-data step. Do all of these:

- [ ] **Step 1: Source raw footage and stills**

Acceptable sources:
1. Official `americandream.com` press kit and YouTube channel (download `youtube-dl`/`yt-dlp` short clips, attribute in `public/CREDITS.md`).
2. Vendor channels (DreamWorks Water Park, Nickelodeon Universe, Big SNOW, Sea Life NJ — official short clips).
3. AI-generated B-roll for gaps using Midjourney / Flux (architectural night shots of the luxury wing, abstract crowd / scale shots).

Save originals to `assets/raw/` (untracked or `.gitignored`).

- [ ] **Step 2: Encode videos for web (run for each clip)**

```bash
ffmpeg -i assets/raw/hero-source.mp4 \
  -t 12 -vf "scale='min(1920,iw)':-2,fps=30" \
  -c:v libx264 -crf 24 -preset slow -profile:v high -pix_fmt yuv420p \
  -an -movflags +faststart public/videos/hero.mp4
```

Target: each ≤ 1.5 MB hero, ≤ 800 KB for tile videos. Aim ~8–12 sec loops.

- [ ] **Step 3: Generate posters**

```bash
ffmpeg -i public/videos/hero.mp4 -ss 00:00:01 -vframes 1 -q:v 3 public/images/hero-poster.jpg
```

Optimize each with `sharp-cli` or `squoosh`:
```bash
npx @squoosh/cli --avif '{"cqLevel":30}' public/images/*.jpg
```

- [ ] **Step 4: Add `public/CREDITS.md`** with attribution lines for every third-party source.

- [ ] **Step 5: Commit**

```bash
git add public/ assets/
git commit -m "chore(assets): add optimized videos, posters, and credits"
```

---

### Task 6.2: Performance audit

**Files:** none (verification)

- [ ] **Step 1: Production build**

```bash
npm run build
npm run start
```

- [ ] **Step 2: Run Lighthouse on `http://localhost:3000`** (Chrome DevTools → Lighthouse → Mobile and Desktop).

Targets:
- Performance ≥ 95
- Accessibility = 100
- Best Practices = 100
- SEO = 100

- [ ] **Step 3: Fix any flagged issues:**
- LCP > 1.8s → reduce hero video bitrate or replace with poster + delayed mount.
- CLS > 0.05 → add explicit width/height on `<video>` containers (already via `aspect-` classes — verify).
- Unused JS → confirm route-level code-split is working (Next reports this automatically).
- Image format → all hero stills should be AVIF; check Network panel.

- [ ] **Step 4: Commit any tuning changes**

```bash
git commit -am "perf: tune <specific change> for Lighthouse"
```

---

### Task 6.3: Accessibility audit

**Files:** likely small Edit passes across components

- [ ] **Step 1: Tab through the page** — verify focus rings are visible (gilt outline) on every interactive element. Fix any element that loses focus visibility.

- [ ] **Step 2: Screen reader pass** — turn on VoiceOver / NVDA, read top to bottom of `/`. Verify:
  - Skip-to-content link appears on first Tab (add if missing — `<a href="#hero" className="sr-only focus:not-sr-only">Skip to content</a>` in `DeckHeader`).
  - Each chapter has a proper heading hierarchy (one h1 in Hero, h2 for each chapter).
  - Decorative videos have `aria-hidden`.
  - Inquiry dialog reads its title and description.

- [ ] **Step 3: Reduced motion test** — System Preferences → Accessibility → Reduce Motion → On. Reload. Verify:
  - No looping background video plays (only poster image shown).
  - Reveal/Kinetic animations are instant (CSS rule in `globals.css` handles this).

- [ ] **Step 4: Commit fixes**

```bash
git commit -am "a11y: address audit findings"
```

---

### Task 6.4: README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write README**

```markdown
# American Dream — Interactive Sales Deck

A luxury, video-first, non-linear sales deck for American Dream (East Rutherford, NJ). Built as a self-contained web experience that replaces fragmented PDF + YouTube + spreadsheet pitches with a single interactive tool.

**Live demo:** [add URL after deploy]

## Stack

- **Next.js 15** (App Router) · React 19 · TypeScript (strict)
- **Tailwind CSS v4** with token-based design system
- **Framer Motion** for component motion · **Lenis** smooth scroll · **GSAP** for cinematic scroll
- **Radix UI** primitives (Dialog, Tabs, Slider) · **lucide-react** icons
- **react-hook-form** + **zod** for the events module form
- **Vitest** for utility unit tests

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Other scripts

| Script              | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Dev server                            |
| `npm run build`     | Production build                      |
| `npm run start`     | Run production build                  |
| `npm run lint`      | ESLint                                |
| `npm run test`      | Run Vitest suite                      |

## Project structure

```
app/                       # Routes (Phase 1 deck at /, Phase 2 modules at /events, /sponsorship, /leasing)
components/
  deck/                    # The 8 Phase 1 chapter components
  events/                  # Capacity calculator + venue cards
  motion/                  # Reveal, KineticType, Counter, LazyVideo, LenisProvider
  nav/                     # Chapter rail, header, progress bar, keyboard nav, InquireDialog
  placeholder/             # Generic "coming soon" used by sponsorship/leasing
  ui/                      # Button, Dialog, Tabs, Slider primitives
lib/
  config/chapters.ts       # Single source of truth for chapter order/ids
  data/                    # Static metrics, tenants, attractions, venues, events
  hooks/                   # useChapterObserver
  inquiry.ts               # zod schema + stubbed submit
  venue-filter.ts          # Capacity-matching logic (tested)
  utils.ts                 # cn helper
public/
  videos/                  # Optimized .mp4 clips (≤ 1.5 MB each)
  images/                  # AVIF/JPG posters
  CREDITS.md               # Asset attribution
```

## Design decisions

- **Non-linear navigation.** A persistent chapter rail (right side), keyboard shortcuts (↑/↓ and 1–8), and a sticky `Inquire` CTA let the viewer move at their own pace.
- **Video-first, performance-aware.** Every below-the-fold video is lazy-mounted via `IntersectionObserver`, posters load first, and `prefers-reduced-motion` swaps out playback for stills.
- **Token-driven design system.** Every color, font, easing, and radius is a CSS variable in `globals.css`. Swapping the palette is a one-file edit.
- **Modular routes.** Phase 2 sub-modules (`/events`, `/sponsorship`, `/leasing`) live as siblings under `app/` — adding a new module is one folder.
- **Tested where it matters.** UI motion is verified manually. Logic with correctness criteria (venue filter, form schema) is unit-tested.

## AI tools used

- **Claude (Sonnet/Opus)** — primary code authoring and component scaffolding.
- **Midjourney / Flux** — generative imagery where official assets are limited (luxury wing renders, abstract scale shots, brand activation visuals).
- **ffmpeg** — dual-encoding videos (AV1 + H.264), generating posters, optimizing bitrate.
- **Squoosh CLI** — converting stills to AVIF.

Each AI-generated or third-party asset is attributed in [public/CREDITS.md](./public/CREDITS.md).

## Deploy

The simplest path is **Vercel**:

```bash
npx vercel
```

For Netlify, GitHub Pages, or any static host: `npm run build` outputs to `.next/`. With `output: "export"` in `next.config.ts`, you can also produce a static-only build for any CDN.

## What I'd do with more time

- Real CMS for chapter copy (Sanity / Payload).
- Real form backend (Resend/Postmark) instead of the console stub.
- Build out the `/sponsorship` and `/leasing` modules to match `/events` in depth.
- Per-chapter analytics events to surface drop-off in the funnel.
- A producer-facing presenter mode (laser pointer, side notes, hotkey-driven beat changes) for live sales calls.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README with stack, structure, and AI tooling notes"
```

---

### Task 6.5: Deploy

**Files:** none new; possibly tweak `next.config.ts` if going static-export

- [ ] **Step 1: Decide deploy target with user.** Default to Vercel.

- [ ] **Step 2: For Vercel:**

```bash
npx vercel
# follow prompts; once deployed:
npx vercel --prod
```

Add the live URL to `README.md` and commit.

- [ ] **Step 3: For static export (Netlify/GH Pages):**

In `next.config.ts`:
```ts
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};
export default nextConfig;
```

Then:
```bash
npm run build
npx serve out
# deploy `out/` to your host
```

- [ ] **Step 4: Smoke-test the live URL** — every chapter renders, no broken videos, inquiry dialog opens, `/events` calculator works, `/sponsorship` and `/leasing` load.

- [ ] **Step 5: Final commit**

```bash
git commit -am "chore: ship live URL"
```

---

## Self-Review Summary

**Spec coverage check:**
- Hero through Close (8 chapters) → Tasks 4.1–4.8 ✓
- Non-linear navigation (rail, keyboard, progress) → Tasks 3.1, 3.2, 3.5 ✓
- Inquire dialog with three tabs → Task 3.3 ✓
- Phase 2 `/events` working module with capacity calculator → Tasks 5.1, 5.2 ✓
- Phase 2 placeholder routes → Task 5.3 ✓
- Performance plan (LazyVideo, Lenis reduced-motion, font subset, AVIF) → Tasks 2.4, 2.5, 6.1, 6.2 ✓
- Accessibility plan (focus rings, keyboard, reduced motion, dialog a11y) → Tasks 2.6, 2.7, 3.5, 6.3 ✓
- README with AI tool documentation → Task 6.4 ✓
- Deploy → Task 6.5 ✓

**Placeholder scan:** None remaining. Every code step has complete code; every command has expected output where relevant.

**Type consistency:** `Chapter`, `Metric`, `Tenant`, `Attraction`, `Venue`, `EventHighlight`, `InquiryType`, `InquiryPayload`, `InquiryInput` all defined in `lib/types.ts` or `lib/inquiry.ts` and used consistently throughout. `filterVenuesByCapacity` signature matches between test, implementation, and consumer.

**Scope:** One plan, one developer-session-worth of focused build. Phase 2 is intentionally scoped to one working module + two polished placeholders — fits the brief's "designed for expansion" requirement without bloating the deliverable.
