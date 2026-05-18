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
import type { EventType } from "@/lib/types";

const TYPE_TONES: Record<EventType, string> = {
  concert: "from-fuchsia-900/40 via-fuchsia-700/15 to-transparent",
  launch: "from-cyan-900/40 via-cyan-700/15 to-transparent",
  convention: "from-indigo-900/40 via-indigo-700/15 to-transparent",
  activation: "from-orange-900/40 via-orange-700/15 to-transparent",
  celebrity: "from-rose-900/40 via-rose-700/15 to-transparent",
  seasonal: "from-emerald-900/40 via-emerald-700/15 to-transparent",
};

export function EventsPlatform() {
  const [sponsorOpen, setSponsorOpen] = useState(false);

  return (
    <Section
      id="events-platform"
      eyebrow="VII · Events"
      className="px-6 py-32 lg:px-20 lg:py-48"
    >
      <div className="mx-auto max-w-7xl">
        <span className="text-[10px] uppercase tracking-[0.32em] text-gilt">
          07 · Events & Platform
        </span>
        <KineticType
          as="h2"
          text="A stage built for global moments."
          className="mt-4 max-w-4xl font-display font-light text-[clamp(2rem,4.8vw,4.2rem)] leading-[1.02] tracking-tight"
        />
        <Reveal delay={0.3}>
          <p className="mt-8 max-w-2xl text-base text-ivory/70">
            Twelve programmable venues. Twenty-five-thousand-capacity festival
            grounds. Year-round programming that turns brand activations into
            citywide moments.
          </p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {EVENTS_METRICS.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08}>
              <li className="rounded-card border border-ivory/10 bg-surface/60 p-6 backdrop-blur-sm transition-colors duration-500 hover:border-gilt/40">
                <div className="font-display text-3xl text-gilt">
                  <Counter value={m.value} />
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-ivory/55">
                  {m.label}
                </div>
              </li>
            </Reveal>
          ))}
        </ul>

        <div className="mt-24">
          <h3 className="font-display text-2xl text-ivory">Past activations</h3>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EVENT_HIGHLIGHTS.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.06}>
                <article
                  className={`group relative h-60 overflow-hidden rounded-card border border-ivory/10 bg-linear-to-br ${TYPE_TONES[e.type]} p-6 transition-transform duration-700 ease-cinematic hover:-translate-y-1`}
                >
                  <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_60%)]"
                    aria-hidden
                  />
                  <div className="relative flex h-full flex-col justify-between">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-gilt">
                      {e.type} · {e.year}
                    </span>
                    <div>
                      <h4 className="font-display text-xl text-ivory">
                        {e.title}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-ivory/65">
                        {e.blurb}
                      </p>
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
          <Button variant="ghost" onClick={() => setSponsorOpen(true)}>
            Activate Your Brand
          </Button>
          <Button asChild variant="ghost">
            <Link href="/events">Plan a Convention</Link>
          </Button>
        </div>

        <InquireDialog
          open={sponsorOpen}
          onOpenChange={setSponsorOpen}
          defaultTab="sponsor"
        />
      </div>
    </Section>
  );
}
