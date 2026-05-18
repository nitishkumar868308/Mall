"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Slider } from "@/components/ui/Slider";
import { VenueCard } from "./VenueCard";
import { VENUES } from "@/lib/data/venues";
import { filterVenuesByCapacity } from "@/lib/venue-filter";

const MIN = 50;
const MAX = 25000;
const PRESETS = [50, 500, 2500, 5000, 10000, 25000];

export function CapacityCalculator() {
  const [attendees, setAttendees] = useState(2500);
  const matches = useMemo(
    () => filterVenuesByCapacity(VENUES, attendees),
    [attendees],
  );

  return (
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.4fr]">
      <div className="self-start lg:sticky lg:top-32">
        <span className="text-[10px] uppercase tracking-[0.32em] text-gilt">
          Venue match
        </span>
        <h2 className="mt-3 font-display font-light text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] text-ivory">
          How many people are coming?
        </h2>
        <p className="mt-4 max-w-md text-sm text-ivory/65">
          Slide to your expected attendance. The venues on the right filter
          live to show what fits.
        </p>
        <div className="mt-12">
          <div className="flex items-baseline justify-between">
            <span className="font-display text-5xl text-gilt lg:text-6xl">
              {attendees.toLocaleString()}
            </span>
            <span className="text-[10px] uppercase tracking-[0.24em] text-ivory/50">
              attendees
            </span>
          </div>
          <Slider
            className="mt-6"
            value={[attendees]}
            onValueChange={([v]) =>
              v !== undefined && setAttendees(v)
            }
            min={MIN}
            max={MAX}
            step={50}
          />
          <ul className="mt-4 flex flex-wrap justify-between gap-2 text-[10px] uppercase tracking-widest text-ivory/40">
            {PRESETS.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  className="cursor-pointer transition-colors hover:text-ivory"
                  onClick={() => setAttendees(s)}
                >
                  {s >= 1000 ? `${s / 1000}K` : s}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 rounded-[var(--radius-card)] border border-ivory/10 bg-surface/40 p-5 text-xs text-ivory/55">
          <p className="font-medium text-ivory/75">
            {matches.length} {matches.length === 1 ? "venue" : "venues"} match
          </p>
          <p className="mt-1">
            Sorted by the closest fit to your headcount.
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {matches.map((v) => (
            <motion.div
              key={v.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <VenueCard venue={v} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
