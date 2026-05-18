import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/placeholder/ComingSoonPage";

export const metadata: Metadata = {
  title: "Sponsorship — American Dream",
  description: "Partnership and sponsorship opportunities at American Dream.",
};

export default function SponsorshipPage() {
  return (
    <ComingSoonPage
      eyebrow="Sponsorship Module"
      title="Brand partnerships, at scale."
      body="A dedicated sponsorship experience — partnership tiers, audience data, and activation case studies — is coming. In the meantime, our partnerships team can walk you through a tailored proposal."
      inquiryTab="sponsor"
    />
  );
}
