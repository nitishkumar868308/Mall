import Link from "next/link";
import { KineticType } from "@/components/motion/KineticType";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { InquireDialog } from "@/components/nav/InquireDialog";
import type { InquiryType } from "@/lib/types";

interface ComingSoonPageProps {
  eyebrow: string;
  title: string;
  body: string;
  inquiryTab: InquiryType;
}

export function ComingSoonPage({
  eyebrow,
  title,
  body,
  inquiryTab,
}: ComingSoonPageProps) {
  return (
    <section className="relative flex min-h-svh flex-col items-start justify-center overflow-hidden px-6 py-24 lg:px-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(201,162,74,0.10),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(201,162,74,0.06),transparent_55%)]"
      />
      <div className="relative z-10 max-w-4xl">
        <Link
          href="/"
          className="text-[10px] uppercase tracking-[0.24em] text-ivory/60 transition-colors hover:text-gilt"
        >
          ← Back to deck
        </Link>
        <span className="mt-10 block text-[10px] uppercase tracking-[0.36em] text-gilt">
          {eyebrow}
        </span>
        <KineticType
          as="h1"
          text={title}
          className="mt-4 font-display font-light text-[clamp(2.4rem,6vw,5.6rem)] leading-[1.02] tracking-tight"
        />
        <Reveal delay={0.5}>
          <p className="mt-10 max-w-2xl text-base text-ivory/70">{body}</p>
        </Reveal>
        <Reveal delay={0.7}>
          <div className="mt-14 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <InquireDialog
              trigger={<Button size="md">Start the conversation</Button>}
              defaultTab={inquiryTab}
            />
            <Button asChild variant="ghost" size="md">
              <Link href="/events">Explore events module →</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
