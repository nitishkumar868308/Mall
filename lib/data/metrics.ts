import type { Metric } from "@/lib/types";

export const HEADLINE_METRICS: Metric[] = [
  { label: "Square Feet",     value: "3M+",  sublabel: "of mixed-use destination" },
  { label: "Annual Visitors", value: "40M+", sublabel: "from the Tri-State and beyond" },
  { label: "Tenants",         value: "450+", sublabel: "across retail, dining, entertainment" },
];

export const REACH_METRICS: Metric[] = [
  { label: "From Midtown Manhattan",   value: "12 min" },
  { label: "From Newark Airport",      value: "7 min" },
  { label: "Population within 30 mi",  value: "22M" },
  { label: "Median household income",  value: "$85K" },
  { label: "Annual NY-NJ-PA visitors", value: "65M" },
];

export const EVENTS_METRICS: Metric[] = [
  { label: "Event Venues",                  value: "12" },
  { label: "Largest single-event capacity", value: "25,000" },
  { label: "Brand activations / year",      value: "200+" },
];
