import { Section } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { KineticType } from "@/components/motion/KineticType";

const TILES = [
  {
    label: "Hudson Food Hall",
    blurb: "Two-floor culinary marketplace",
    span: "sm:col-span-2 sm:row-span-2",
    tone: "from-amber-900/40 via-amber-700/15 to-transparent",
  },
  {
    label: "Korean Food Hall",
    blurb: "12 vendors, one block of Seoul",
    span: "sm:col-span-1",
    tone: "from-rose-900/40 via-rose-700/15 to-transparent",
  },
  {
    label: "Kosher Food Hall",
    blurb: "Largest in the Northeast",
    span: "sm:col-span-1",
    tone: "from-blue-900/40 via-blue-700/15 to-transparent",
  },
  {
    label: "Carpaccio",
    blurb: "Italian fine dining",
    span: "sm:col-span-1",
    tone: "from-stone-800/50 via-stone-600/15 to-transparent",
  },
  {
    label: "Saddle River Café",
    blurb: "All-day social spot",
    span: "sm:col-span-1",
    tone: "from-emerald-900/40 via-emerald-700/15 to-transparent",
  },
  {
    label: "Shake Shack",
    blurb: "An American staple",
    span: "sm:col-span-1",
    tone: "from-yellow-900/40 via-yellow-700/15 to-transparent",
  },
  {
    label: "Toastique",
    blurb: "Toast, coffee, lifestyle",
    span: "sm:col-span-1",
    tone: "from-orange-900/40 via-orange-700/15 to-transparent",
  },
];

export function DiningLifestyle() {
  return (
    <Section
      id="dining"
      eyebrow="V · Dining"
      className="px-6 py-32 lg:px-20 lg:py-48"
    >
      <div className="mx-auto max-w-7xl">
        <span className="text-[10px] uppercase tracking-[0.32em] text-gilt">
          05 · Dining & Lifestyle
        </span>
        <KineticType
          as="h2"
          text="Dining as destination."
          className="mt-4 font-display font-light text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.02] tracking-tight"
        />
        <Reveal delay={0.3}>
          <p className="mt-8 max-w-2xl text-base text-ivory/70">
            120+ restaurants and food experiences, anchored by the largest
            concentration of culinary halls in the New York metro — designed
            to keep guests on-property from breakfast to late night.
          </p>
        </Reveal>

        <div className="mt-16 grid auto-rows-[200px] grid-cols-2 gap-4 sm:grid-cols-3 sm:auto-rows-[220px] lg:grid-cols-4">
          {TILES.map((t, i) => (
            <Reveal key={t.label} delay={i * 0.06} className={t.span}>
              <article
                className={`group relative h-full overflow-hidden rounded-[var(--radius-card)] border border-ivory/10 bg-gradient-to-br ${t.tone} p-6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1`}
              >
                <div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_60%)]"
                  aria-hidden
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/60 to-transparent"
                  aria-hidden
                />
                <div className="relative flex h-full flex-col justify-end">
                  <h3 className="font-display text-xl text-ivory lg:text-2xl">
                    {t.label}
                  </h3>
                  <p className="mt-1 text-xs text-ivory/65">{t.blurb}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
