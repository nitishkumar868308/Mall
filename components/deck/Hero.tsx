"use client";

import { ChevronDown } from "lucide-react";
import { Section } from "./Section";
import { LazyVideo } from "@/components/motion/LazyVideo";
import { KineticType } from "@/components/motion/KineticType";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { HEADLINE_METRICS } from "@/lib/data/metrics";
import { IMG } from "@/lib/images";

export function Hero() {
  return (
    <Section
      id="hero"
      className="relative h-svh min-h-160 overflow-hidden"
    >
      <LazyVideo
        src="/videos/hero.mp4"
        poster={IMG.hero}
        priority
        fallbackBg="radial-gradient(ellipse at 30% 30%, #1C1C24 0%, #0A0A0B 70%)"
        className="absolute inset-0 h-full w-full"
      />
      {/* Cinematic layered overlays — depth without obscuring */}
      <div
        className="absolute inset-0 bg-linear-to-b from-ink/55 via-ink/35 to-ink"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(201,162,74,0.22),transparent_55%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 mix-blend-overlay bg-[radial-gradient(ellipse_at_70%_30%,rgba(201,162,74,0.18),transparent_55%)]"
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <Reveal delay={0.15}>
          <span className="text-[11px] uppercase tracking-[0.36em] text-ivory/75">
            East Rutherford, NJ · 12 minutes from Manhattan
          </span>
        </Reveal>

        <KineticType
          as="h1"
          text="Where retail becomes a destination."
          delay={0.35}
          className="mt-8 max-w-5xl font-display font-light text-[clamp(2.4rem,8vw,7.6rem)] leading-[0.96] tracking-tight text-ivory"
        />

        <Reveal delay={1.1}>
          <p className="mt-8 max-w-xl text-sm text-ivory/75 sm:text-base">
            Three million square feet. Forty million annual visitors. One
            unforgettable destination — and an unmatched canvas for the brands
            that meet them here.
          </p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-3 gap-x-8 gap-y-2 sm:gap-x-16">
          {HEADLINE_METRICS.map((m, i) => (
            <li key={m.label} className="text-center">
              <Reveal delay={1.3 + i * 0.12}>
                <div className="font-display text-3xl text-gilt sm:text-5xl">
                  <Counter value={m.value} />
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.24em] text-ivory/70">
                  {m.label}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <a
        href="#why-here"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-ivory/70 transition-colors hover:text-gilt"
        aria-label="Begin tour"
      >
        Begin tour
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </Section>
  );
}
