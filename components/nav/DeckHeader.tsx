"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { InquireDialog } from "@/components/nav/InquireDialog";

export function DeckHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 lg:px-10">
      <Link
        href="/"
        className="pointer-events-auto font-display text-base tracking-[0.32em] uppercase text-ivory mix-blend-difference"
      >
        American&nbsp;Dream
      </Link>
      <div className="pointer-events-auto">
        <InquireDialog
          trigger={
            <Button size="sm" variant="ghost">
              Inquire
            </Button>
          }
        />
      </div>
    </header>
  );
}
