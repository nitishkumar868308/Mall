import Image from "next/image";
import { Section } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { KineticType } from "@/components/motion/KineticType";
import { LogoMarquee } from "./LogoMarquee";
import { GrowthChart } from "./GrowthChart";
import { TENANTS } from "@/lib/data/tenants";
import type { TenantCategory } from "@/lib/types";
import { IMG } from "@/lib/images";

const CATEGORY_LABELS: { label: string; key: TenantCategory }[] = [
  { label: "Anchor", key: "anchor" },
  { label: "Lifestyle", key: "lifestyle" },
  { label: "Specialty", key: "specialty" },
  { label: "Luxury", key: "luxury" },
  { label: "Dining", key: "dining" },
];

export function Retail() {
  const row1 = TENANTS.filter((_, i) => i % 2 === 0).map((t) => t.name);
  const row2 = TENANTS.filter((_, i) => i % 2 === 1).map((t) => t.name);
  const counts = TENANTS.reduce<Record<TenantCategory, number>>(
    (acc, t) => {
      acc[t.category] = (acc[t.category] ?? 0) + 1;
      return acc;
    },
    { anchor: 0, lifestyle: 0, specialty: 0, luxury: 0, dining: 0 },
  );

  return (
    <Section
      id="retail"
      eyebrow="III · Retail"
      className="relative px-6 py-20 lg:px-16 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src={IMG.retail}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15"
          aria-hidden
        />
        <div className="absolute inset-0 bg-linear-to-b from-ink via-ink/92 to-ink" aria-hidden />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <span className="text-[10px] uppercase tracking-[0.32em] text-gilt">
          03 · Retail
        </span>
        <KineticType
          as="h2"
          text="Where 450+ brands meet their next 40 million customers."
          className="mt-4 max-w-5xl font-display font-light text-[clamp(2rem,4.6vw,4.2rem)] leading-[1.02] tracking-tight"
        />
      </div>

      <div className="relative mt-20">
        <LogoMarquee items={row1} speed={70} />
        <div className="mt-4">
          <LogoMarquee items={row2} reverse speed={85} />
        </div>
      </div>

      <div className="relative mx-auto mt-24 grid max-w-7xl gap-8 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div className="rounded-card border border-ivory/10 bg-surface/70 p-8 backdrop-blur-md">
            <h3 className="font-display text-2xl text-ivory">
              Across every tier.
            </h3>
            <p className="mt-2 text-sm text-ivory/60">
              Curated by category — sized for the next decade.
            </p>
            <ul className="mt-8 grid grid-cols-1 gap-y-3 text-sm sm:grid-cols-2">
              {CATEGORY_LABELS.map((c) => (
                <li
                  key={c.key}
                  className="flex items-baseline justify-between gap-4 border-b border-ivory/5 pb-3 pr-2"
                >
                  <span className="uppercase tracking-[0.18em] text-ivory/70">
                    {c.label}
                  </span>
                  <span className="font-display text-3xl text-gilt">
                    {counts[c.key] ?? 0}
                  </span>
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
