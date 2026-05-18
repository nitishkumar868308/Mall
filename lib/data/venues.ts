import type { Venue } from "@/lib/types";

export const VENUES: Venue[] = [
  {
    slug: "the-rink",
    name: "The Rink",
    capacityMin: 200,
    capacityMax: 1500,
    dimensions: "NHL-size · 17,000 sq ft",
    features: ["Ice or floor convert", "Built-in sound", "Adjacent green rooms"],
    fits: ["Brand activation", "Corporate gala", "Private screening"],
  },
  {
    slug: "the-court",
    name: "The Court",
    capacityMin: 500,
    capacityMax: 3500,
    dimensions: "Soaring atrium · 4 stories of vertical signage",
    features: ["Stage-ready", "LED-mappable surfaces", "Multi-level viewing"],
    fits: ["Product launch", "Fashion show", "Award ceremony"],
  },
  {
    slug: "the-plaza",
    name: "The Plaza",
    capacityMin: 2000,
    capacityMax: 8000,
    dimensions: "Outdoor courtyard · 65,000 sq ft",
    features: ["NYC skyline backdrop", "Power + rigging", "Adjacent retail wing"],
    fits: ["Concert", "Festival", "Public-facing launch"],
  },
  {
    slug: "expo-hall",
    name: "Expo Hall",
    capacityMin: 1000,
    capacityMax: 12000,
    dimensions: "Convention floor · 120,000 sq ft column-free",
    features: ["Loading docks ×6", "30 ft ceilings", "Modular configuration"],
    fits: ["Convention", "Trade show", "Conference"],
  },
  {
    slug: "festival-grounds",
    name: "Festival Grounds",
    capacityMin: 5000,
    capacityMax: 25000,
    dimensions: "Outdoor event lawn · 8 acres",
    features: [
      "Full broadcast infrastructure",
      "Camp-build ready",
      "Adjacent parking 30K",
    ],
    fits: ["Headline concert", "Festival", "Citywide moment"],
  },
];
