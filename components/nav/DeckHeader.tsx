"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { InquireDialog } from "@/components/nav/InquireDialog";
import { Logo } from "@/components/nav/Logo";
import { ThemeToggle } from "@/components/nav/ThemeToggle";

export function DeckHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 lg:px-10">
      <Link
        href="/"
        className="pointer-events-auto text-sm text-ivory transition-colors duration-500 hover:text-gilt"
      >
        <Logo />
      </Link>
      <div className="pointer-events-auto flex items-center gap-2">
        <ThemeToggle />
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
