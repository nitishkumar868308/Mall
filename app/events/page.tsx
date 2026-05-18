import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { KineticType } from "@/components/motion/KineticType";
import { LazyVideo } from "@/components/motion/LazyVideo";
import { Button } from "@/components/ui/Button";
import { CapacityCalculator } from "@/components/events/CapacityCalculator";
import { InquireDialog } from "@/components/nav/InquireDialog";
import { MeshBackdrop } from "@/components/motion/MeshBackdrop";
import { IMG, VID } from "@/lib/images";

export const metadata: Metadata = {
  title: "Events — American Dream",
  description:
    "Book a venue at American Dream. Twelve programmable spaces from 200 to 25,000 capacity.",
};

export default function EventsPage() {
  return (
    <>
      <section
        id="events-hero"
        className="relative h-[80svh] min-h-130 overflow-hidden"
      >
        <LazyVideo
          src={VID.eventsHero}
          poster={IMG.eventsHero}
          priority
          fallbackBg="radial-gradient(ellipse at 70% 30%, #1C1C24 0%, #0A0A0B 70%)"
          className="absolute inset-0 h-full w-full"
        />
        <div
          className="absolute inset-0 bg-linear-to-b from-ink/65 via-ink/45 to-ink"
          aria-hidden
        />
        <MeshBackdrop variant="cool" intensity="rich" />
        <div className="relative z-10 flex h-full flex-col items-start justify-end px-6 pb-24 lg:px-20">
          <Link
            href="/"
            className="text-[10px] uppercase tracking-[0.24em] text-ivory/60 transition-colors hover:text-gilt"
          >
            ← Back to deck
          </Link>
          <span className="mt-8 text-[10px] uppercase tracking-[0.36em] text-gilt">
            Events Module
          </span>
          <KineticType
            as="h1"
            text="Find your venue. Live."
            className="mt-3 max-w-3xl font-display font-light text-[clamp(2.4rem,6vw,5.6rem)] leading-none tracking-tight"
          />
          <Reveal delay={0.6}>
            <p className="mt-8 max-w-xl text-base text-ivory/70">
              From 200-person private screenings to 25,000-capacity festival
              grounds, every American Dream venue is purpose-built and
              programmable.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-20 lg:py-24">
        <CapacityCalculator />
      </section>

      <section className="px-6 pb-24 lg:px-16">
        <div className="mx-auto max-w-3xl rounded-card border border-ivory/10 bg-surface/60 p-12 text-center">
          <h2 className="font-display text-3xl text-ivory lg:text-4xl">
            Ready to book?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-ivory/70">
            Send us the basics. Our events team will respond within one
            business day with availability and a tailored proposal.
          </p>
          <div className="mt-8 inline-flex">
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
