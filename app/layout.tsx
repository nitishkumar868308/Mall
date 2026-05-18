import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { GrainOverlay } from "@/components/motion/GrainOverlay";
import { Spotlight } from "@/components/motion/Spotlight";
import { DeckHeader } from "@/components/nav/DeckHeader";
import { ChapterRail } from "@/components/nav/ChapterRail";
import { MobileChapterMenu } from "@/components/nav/MobileChapterMenu";
import { ProgressBar } from "@/components/nav/ProgressBar";
import { KeyboardNav } from "@/components/nav/KeyboardNav";
import { SkipLink } from "@/components/nav/SkipLink";

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
      <body className="bg-ink text-ivory antialiased">
        <SkipLink />
        <LenisProvider />
        <Spotlight />
        <DeckHeader />
        <ChapterRail />
        <MobileChapterMenu />
        <ProgressBar />
        <KeyboardNav />
        <main>{children}</main>
        <GrainOverlay />
      </body>
    </html>
  );
}
