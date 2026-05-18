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
    <Section
      id="attractions"
      eyebrow="VI · Attractions"
      className="px-6 py-20 lg:px-16 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <span className="text-[10px] uppercase tracking-[0.32em] text-gilt">
          06 · Attractions
        </span>
        <KineticType
          as="h2"
          text="An entire city of experiences."
          className="mt-4 max-w-4xl font-display font-light text-[clamp(2rem,4.8vw,4.2rem)] leading-[1.02] tracking-tight"
        />
        <Reveal delay={0.3}>
          <p className="mt-8 max-w-2xl text-base text-ivory/70">
            What separates a mega-destination from a mall: the reasons you
            have to come, even when you weren't planning to shop.
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
