import type { Venue } from "@/lib/types";

export function VenueCard({ venue }: { venue: Venue }) {
  return (
    <article className="rounded-[var(--radius-card)] border border-ivory/10 bg-surface/60 p-6 transition-colors duration-500 hover:border-gilt/40">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-2xl text-ivory">{venue.name}</h3>
        <span className="font-display text-base text-gilt whitespace-nowrap">
          {venue.capacityMin.toLocaleString()} – {venue.capacityMax.toLocaleString()}
        </span>
      </div>
      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-ivory/50">
        {venue.dimensions}
      </p>
      <ul className="mt-5 grid grid-cols-1 gap-1.5 text-sm text-ivory/75">
        {venue.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span className="text-gilt mt-1">—</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-2">
        {venue.fits.map((fit) => (
          <span
            key={fit}
            className="rounded-full border border-ivory/15 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-ivory/60"
          >
            {fit}
          </span>
        ))}
      </div>
    </article>
  );
}
