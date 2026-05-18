export type ChapterId =
  | "hero"
  | "why-here"
  | "retail"
  | "luxury"
  | "dining"
  | "attractions"
  | "events-platform"
  | "close";

export interface Chapter {
  id: ChapterId;
  index: number;
  title: string;
  eyebrow: string;
}

export interface Metric {
  label: string;
  value: string;
  sublabel?: string;
}

export type TenantCategory =
  | "anchor"
  | "lifestyle"
  | "specialty"
  | "luxury"
  | "dining";

export interface Tenant {
  name: string;
  category: TenantCategory;
}

export interface AttractionStat {
  label: string;
  value: string;
}

export interface Attraction {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stats: AttractionStat[];
  posterColor: string;
}

export interface Venue {
  slug: string;
  name: string;
  capacityMin: number;
  capacityMax: number;
  dimensions: string;
  features: string[];
  fits: string[];
}

export type EventType =
  | "concert"
  | "launch"
  | "convention"
  | "activation"
  | "celebrity"
  | "seasonal";

export interface EventHighlight {
  title: string;
  type: EventType;
  year: number;
  blurb: string;
}

export type InquiryType = "lease" | "sponsor" | "venue";

export interface InquiryPayload {
  type: InquiryType;
  segment?: string;
  name: string;
  company: string;
  email: string;
  message: string;
  attendees?: number;
  eventDate?: string;
}
