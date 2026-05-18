"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Section } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { KineticType } from "@/components/motion/KineticType";
import { Counter } from "@/components/motion/Counter";
import { Button } from "@/components/ui/Button";
import { InquireDialog } from "@/components/nav/InquireDialog";
import { EVENTS_METRICS } from "@/lib/data/metrics";
import { EVENT_HIGHLIGHTS } from "@/lib/data/events";
import type { EventType } from "@/lib/types";
import { IMG } from "@/lib/images";

const TYPE_IMAGE: Record<EventType, string> = {
  concert: IMG.evConcert,
  launch: IMG.evSneaker,
  convention: IMG.evAuto,
  activation: IMG.evFashion,
  celebrity: IMG.evCelebrity,
  seasonal: IMG.evHoliday,
};

export function EventsPlatform() {
  const [sponsorOpen, setSponsorOpen] = useState(false);

  return (
    <Section
      id="events-platform"
      eyebrow="VII · Events"
      className="relative px-6 py-20 lg:px-16 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src={IMG.events}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
          aria-hidden
        />
        <div className="absolute inset-0 bg-linear-to-b from-ink via-ink/92 to-ink" aria-hidden />
      </div>

      <div className="relative mx-auto max-w-7xl">
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
              <li className="rounded-card border border-ivory/10 bg-surface/70 p-6 backdrop-blur-md transition-colors duration-500 hover:border-gilt/40">
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
                <article className="group relative h-64 overflow-hidden rounded-card border border-ivory/10 transition-transform duration-700 ease-cinematic hover:-translate-y-1">
                  <Image
                    src={TYPE_IMAGE[e.type]}
                    alt={e.title}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-1000 ease-cinematic group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/55 to-ink/15" aria-hidden />
                  <div className="relative flex h-full flex-col justify-between p-6">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-gilt">
                      {e.type} · {e.year}
                    </span>
                    <div>
                      <h4 className="font-display text-xl text-ivory">
                        {e.title}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-ivory/75">
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
