import { Hero } from "@/components/deck/Hero";
import { WhyHere } from "@/components/deck/WhyHere";
import { Retail } from "@/components/deck/Retail";
import { Luxury } from "@/components/deck/Luxury";
import { DiningLifestyle } from "@/components/deck/DiningLifestyle";
import { Attractions } from "@/components/deck/Attractions";
import { EventsPlatform } from "@/components/deck/EventsPlatform";
import { Close } from "@/components/deck/Close";

export default function Page() {
  return (
    <>
      <Hero />
      <WhyHere />
      <Retail />
      <Luxury />
      <DiningLifestyle />
      <Attractions />
      <EventsPlatform />
      <Close />
    </>
  );
}
