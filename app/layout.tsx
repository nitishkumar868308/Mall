import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "American Dream — Where Retail Becomes a Destination",
  description:
    "An interactive sales experience for prospective tenants, sponsors, and event partners at American Dream, East Rutherford NJ.",
  openGraph: {
    title: "American Dream — Where Retail Becomes a Destination",
    description:
      "3 million square feet. 40+ million annual visitors. One unforgettable destination.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-ink text-ivory antialiased">{children}</body>
    </html>
  );
}
