import Image from "next/image";
import { Section } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { KineticType } from "@/components/motion/KineticType";
import { IMG } from "@/lib/images";

const TILES: { label: string; blurb: string; span: string; img: string }[] = [
  {
    label: "Hudson Food Hall",
    blurb: "Two-floor culinary marketplace",
    span: "sm:col-span-2 sm:row-span-2",
    img: IMG.diningHall,
  },
  {
    label: "Korean Food Hall",
    blurb: "12 vendors, one block of Seoul",
    span: "sm:col-span-1",
    img: IMG.diningKorean,
  },
  {
    label: "Kosher Food Hall",
    blurb: "Largest in the Northeast",
    span: "sm:col-span-1",
    img: IMG.diningKosher,
  },
  {
    label: "Carpaccio",
    blurb: "Italian fine dining",
    span: "sm:col-span-1",
    img: IMG.diningItalian,
  },
  {
    label: "Saddle River Café",
    blurb: "All-day social spot",
    span: "sm:col-span-1",
    img: IMG.diningCafe,
  },
  {
    label: "Shake Shack",
    blurb: "An American staple",
    span: "sm:col-span-1",
    img: IMG.diningBurger,
  },
  {
    label: "Toastique",
    blurb: "Toast, coffee, lifestyle",
    span: "sm:col-span-1",
    img: IMG.diningToast,
  },
];

export function DiningLifestyle() {
  return (
    <Section
      id="dining"
      eyebrow="V · Dining"
      className="px-6 py-20 lg:px-16 lg:py-28"
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
              <article className="group relative h-full overflow-hidden rounded-card border border-ivory/10 transition-transform duration-700 ease-cinematic hover:-translate-y-1">
                <Image
                  src={t.img}
                  alt={t.label}
                  fill
                  sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-1000 ease-cinematic group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/35 to-transparent" aria-hidden />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.10),transparent_60%)]" aria-hidden />
                <div className="relative flex h-full flex-col justify-end p-6">
                  <h3 className="font-display text-xl text-ivory lg:text-2xl">
                    {t.label}
                  </h3>
                  <p className="mt-1 text-xs text-ivory/75">{t.blurb}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
