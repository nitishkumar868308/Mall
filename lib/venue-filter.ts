import type { Venue } from "./types";

export function filterVenuesByCapacity(
  venues: Venue[],
  attendees: number,
): Venue[] {
  const inRange = venues.filter(
    (v) => attendees >= v.capacityMin && attendees <= v.capacityMax,
  );
  if (inRange.length > 0) {
    return [...inRange].sort((a, b) => {
      const midA = (a.capacityMin + a.capacityMax) / 2;
      const midB = (b.capacityMin + b.capacityMax) / 2;
      return Math.abs(midA - attendees) - Math.abs(midB - attendees);
    });
  }
  const minMin = Math.min(...venues.map((v) => v.capacityMin));
  if (attendees < minMin) {
    return venues.filter((v) => v.capacityMin === minMin).slice(0, 1);
  }
  const maxMax = Math.max(...venues.map((v) => v.capacityMax));
  return venues.filter((v) => v.capacityMax === maxMax).slice(0, 1);
}
