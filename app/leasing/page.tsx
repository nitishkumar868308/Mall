import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/placeholder/ComingSoonPage";

export const metadata: Metadata = {
  title: "Leasing — American Dream",
  description:
    "Leasing inquiries for luxury, retail, F&B, and pop-up at American Dream.",
};

export default function LeasingPage() {
  return (
    <ComingSoonPage
      eyebrow="Leasing Module"
      title="Your space, on the world's stage."
      body="A segmented leasing experience for luxury, retail, F&B, and pop-up tenants is in production. To start a conversation now, send us a brief — our leasing team will follow up within one business day."
      inquiryTab="lease"
    />
  );
}
