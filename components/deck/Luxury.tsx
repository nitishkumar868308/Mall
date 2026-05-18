import { Section } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { LazyVideo } from "@/components/motion/LazyVideo";
import { MeshBackdrop } from "@/components/motion/MeshBackdrop";
import { KineticType } from "@/components/motion/KineticType";
import { TENANTS } from "@/lib/data/tenants";
import { IMG, VID } from "@/lib/images";

export function Luxury() {
  const houses = TENANTS.filter((t) => t.category === "luxury");

  return (
    <Section
      id="luxury"
      className="relative min-h-svh overflow-hidden"
    >
      <LazyVideo
        src={VID.luxury}
        poster={IMG.luxury}
        fallbackBg="linear-gradient(135deg, #1C1C24 0%, #0A0A0B 100%)"
        className="absolute inset-0 h-full w-full"
      />
      <div
        className="absolute inset-0 bg-linear-to-b from-ink/80 via-ink/55 to-ink"
        aria-hidden
      />
      <MeshBackdrop variant="warm" intensity="subtle" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-center px-6 py-40 lg:min-h-svh lg:px-20">
        <span className="text-[10px] uppercase tracking-[0.36em] text-gilt">
          IV · The Avenue
        </span>
        <KineticType
          as="h2"
          text="A luxury wing built like a private invitation."
          className="mt-8 max-w-4xl font-display font-light text-[clamp(2.2rem,5.2vw,4.8rem)] leading-[1.02] tracking-tight text-ivory"
        />
        <Reveal delay={0.5}>
          <p className="mt-12 max-w-2xl border-l border-gilt/40 pl-6 font-display text-xl italic leading-relaxed text-ivory/85 lg:text-2xl">
            “The only place outside Fifth Avenue where luxury feels at home.”
          </p>
        </Reveal>

        <Reveal delay={0.7}>
          <ul className="mt-20 flex flex-wrap gap-x-10 gap-y-5">
            {houses.map((h) => (
              <li
                key={h.name}
                className="font-display text-xl tracking-wide text-ivory/90"
              >
                {h.name}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.9}>
          <p className="mt-16 max-w-md text-sm text-ivory/65">
            Discreet entrances. Concierge service. Private appointments. A
            wing designed for the world's most considered houses.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
