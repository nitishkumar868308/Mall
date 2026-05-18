import type { Attraction } from "@/lib/types";

export const ATTRACTIONS: Attraction[] = [
  {
    slug: "dreamworks",
    name: "DreamWorks Water Park",
    tagline: "The largest indoor water park in North America.",
    description:
      "Year-round, 85-degree paradise spanning 8.5 acres under a translucent dome — featuring 40 slides and the largest indoor wave pool in the country.",
    stats: [
      { label: "Indoor acreage",     value: "8.5" },
      { label: "Slides",             value: "40" },
      { label: "Wave pool capacity", value: "1.5M gal" },
    ],
    posterColor: "#0e6cff",
  },
  {
    slug: "nickelodeon",
    name: "Nickelodeon Universe",
    tagline: "The largest indoor theme park in the Western Hemisphere.",
    description:
      "Seven acres, 35+ rides, world-record-breaking coasters — Nickelodeon's signature characters reimagined inside a climate-controlled cathedral of fun.",
    stats: [
      { label: "Acres",        value: "8.5" },
      { label: "Rides",        value: "35+" },
      { label: "Tallest drop", value: "227 ft" },
    ],
    posterColor: "#ff7a00",
  },
  {
    slug: "big-snow",
    name: "Big SNOW",
    tagline: "North America's only indoor real-snow ski slope.",
    description:
      "Year-round skiing and snowboarding on a 16-story indoor mountain with eight lanes and a terrain park — open every day, regardless of season.",
    stats: [
      { label: "Vertical drop", value: "16 stories" },
      { label: "Lanes",         value: "8" },
      { label: "Temperature",   value: "28 °F" },
    ],
    posterColor: "#cdd9ec",
  },
  {
    slug: "sea-life",
    name: "Sea Life Aquarium",
    tagline: "An ocean within walking distance of Manhattan.",
    description:
      "3,000+ creatures across 30 themed habitats, plus Angry Birds Mini Golf — a one-of-a-kind family attraction inside the property.",
    stats: [
      { label: "Sea creatures",   value: "3,000+" },
      { label: "Habitats",        value: "30" },
      { label: "Mini-golf holes", value: "18" },
    ],
    posterColor: "#0fb0a3",
  },
];
