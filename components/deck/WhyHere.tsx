import { Section } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { KineticType } from "@/components/motion/KineticType";
import { Counter } from "@/components/motion/Counter";
import { RegionMap } from "./RegionMap";
import { REACH_METRICS } from "@/lib/data/metrics";

export function WhyHere() {
  return (
    <Section
      id="why-here"
      eyebrow="II · Why Here"
      className="px-6 py-32 lg:px-20 lg:py-48"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-16 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.32em] text-gilt">
            02 · Reach
          </span>
          <KineticType
            as="h2"
            text="The single most-trafficked corner of the Tri-State."
            className="mt-4 font-display font-light text-[clamp(2rem,4.6vw,4.2rem)] leading-[1.02] tracking-tight"
          />
          <Reveal delay={0.4}>
            <p className="mt-8 max-w-xl text-base text-ivory/70">
              American Dream sits at the intersection of the largest media
              market on Earth and one of the densest concentrations of
              high-income households in North America. We are not in the
              neighborhood. We are the neighborhood.
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
            <li className="rounded-[var(--radius-card)] border border-ivory/10 bg-surface/60 p-6 backdrop-blur-sm transition-colors duration-500 hover:border-gilt/40">
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
