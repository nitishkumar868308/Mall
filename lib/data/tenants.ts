import type { Tenant } from "@/lib/types";

export const TENANTS: Tenant[] = [
  { name: "Saks Fifth Avenue", category: "luxury" },
  { name: "Hermès",            category: "luxury" },
  { name: "Tiffany & Co.",     category: "luxury" },
  { name: "Louis Vuitton",     category: "luxury" },
  { name: "Mulberry",          category: "luxury" },
  { name: "Dolce & Gabbana",   category: "luxury" },
  { name: "Gucci",             category: "luxury" },
  { name: "Zara",              category: "lifestyle" },
  { name: "H&M",               category: "lifestyle" },
  { name: "Uniqlo",            category: "lifestyle" },
  { name: "Primark",           category: "anchor" },
  { name: "Lululemon",         category: "lifestyle" },
  { name: "Sephora",           category: "lifestyle" },
  { name: "Apple",             category: "anchor" },
  { name: "Microsoft",         category: "specialty" },
  { name: "LEGO",              category: "specialty" },
  { name: "Toys“R”Us", category: "anchor" },
  { name: "Carpaccio",         category: "dining" },
  { name: "Saddle River Café", category: "dining" },
  { name: "Shake Shack",       category: "dining" },
  { name: "Toastique",         category: "dining" },
  { name: "Five Guys",         category: "dining" },
];

export const TENANT_GROWTH: { year: number; count: number }[] = [
  { year: 2020, count: 110 },
  { year: 2021, count: 180 },
  { year: 2022, count: 280 },
  { year: 2023, count: 360 },
  { year: 2024, count: 420 },
  { year: 2025, count: 450 },
];
