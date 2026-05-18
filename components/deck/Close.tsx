"use client";

import { useState } from "react";
import { Section } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { KineticType } from "@/components/motion/KineticType";
import { LazyVideo } from "@/components/motion/LazyVideo";
import { MeshBackdrop } from "@/components/motion/MeshBackdrop";
import { Button } from "@/components/ui/Button";
import { InquireDialog } from "@/components/nav/InquireDialog";
import type { InquiryType } from "@/lib/types";
import { IMG, VID } from "@/lib/images";

export function Close() {
  const [tab, setTab] = useState<InquiryType | null>(null);

  return (
    <Section id="close" className="relative min-h-svh overflow-hidden">
      <LazyVideo
        src={VID.close}
        poster={IMG.close}
        fallbackBg="radial-gradient(ellipse at 50% 50%, #1C1C24 0%, #0A0A0B 70%)"
        className="absolute inset-0 h-full w-full"
      />
      <div
        className="absolute inset-0 bg-linear-to-b from-ink/80 via-ink/55 to-ink"
        aria-hidden
      />
      <MeshBackdrop variant="warm" intensity="rich" />

      <div className="relative z-10 mx-auto flex min-h-svh max-w-5xl flex-col items-center justify-center px-6 py-32 text-center">
        <span className="text-[10px] uppercase tracking-[0.36em] text-gilt">
          VIII · Build with us
        </span>
        <KineticType
          as="h2"
          text="Build your next chapter here."
          className="mt-8 font-display font-light text-[clamp(2.4rem,7vw,6.6rem)] leading-[0.98] tracking-tight text-ivory"
        />
        <Reveal delay={0.6}>
          <p className="mt-8 max-w-xl text-base text-ivory/75">
            Tell us what you want to do. Our team responds within one business
            day.
          </p>
        </Reveal>

        <Reveal delay={0.85}>
          <div className="mt-14 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button size="lg" onClick={() => setTab("lease")}>
              Lease
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => setTab("sponsor")}
            >
              Sponsor
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => setTab("venue")}
            >
              Book a Venue
            </Button>
          </div>
        </Reveal>

        <Reveal delay={1.05}>
          <footer className="mt-24 grid grid-cols-1 gap-2 text-xs text-ivory/55 sm:grid-cols-3 sm:gap-12">
            <div>One American Dream Way · East Rutherford, NJ</div>
            <div>partners@americandream.example</div>
            <div>+1 (201) 555-0199</div>
          </footer>
        </Reveal>
      </div>

      <InquireDialog
        open={tab !== null}
        onOpenChange={(o) => setTab(o ? (tab ?? "lease") : null)}
        defaultTab={tab ?? "lease"}
      />
    </Section>
  );
}
