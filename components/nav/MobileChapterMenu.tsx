"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { CHAPTERS } from "@/lib/config/chapters";

export function MobileChapterMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Open chapter menu"
          className="fixed bottom-6 right-5 z-40 inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-gilt/40 bg-surface/90 text-ivory shadow-xl backdrop-blur-md transition-colors hover:border-gilt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gilt lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-[min(420px,calc(100%-2rem))]">
        <DialogHeader>
          <span className="text-[10px] uppercase tracking-[0.28em] text-gilt">
            Chapters
          </span>
          <DialogTitle>Jump anywhere</DialogTitle>
        </DialogHeader>
        <ul className="mt-2 grid divide-y divide-ivory/5">
          {CHAPTERS.map((c) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-4 py-3 transition-colors hover:text-gilt"
              >
                <span className="font-display text-lg">{c.title}</span>
                <span className="text-[10px] uppercase tracking-[0.24em] text-ivory/40">
                  {c.eyebrow}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
