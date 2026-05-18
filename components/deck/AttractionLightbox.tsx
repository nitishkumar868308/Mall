"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { LazyVideo } from "@/components/motion/LazyVideo";
import { Counter } from "@/components/motion/Counter";
import type { Attraction } from "@/lib/types";

interface AttractionLightboxProps {
  attraction: Attraction | null;
  onClose: () => void;
}

export function AttractionLightbox({
  attraction,
  onClose,
}: AttractionLightboxProps) {
  return (
    <Dialog open={!!attraction} onOpenChange={(o) => !o && onClose()}>
      {attraction && (
        <DialogContent className="grid w-[min(960px,calc(100%-2rem))] gap-0 overflow-hidden p-0 lg:grid-cols-[1.2fr_1fr]">
          <LazyVideo
            src={`/videos/${attraction.slug}.mp4`}
            poster={`/images/${attraction.slug}-poster.jpg`}
            fallbackBg={attraction.posterColor}
            className="relative aspect-video lg:aspect-auto lg:h-full"
          />
          <div className="flex flex-col gap-5 p-8">
            <DialogHeader>
              <span className="text-[10px] uppercase tracking-[0.28em] text-gilt">
                Attraction
              </span>
              <DialogTitle>{attraction.name}</DialogTitle>
              <DialogDescription>{attraction.tagline}</DialogDescription>
            </DialogHeader>
            <p className="text-sm leading-relaxed text-ivory/75">
              {attraction.description}
            </p>
            <ul className="mt-2 grid grid-cols-3 gap-3">
              {attraction.stats.map((s) => (
                <li
                  key={s.label}
                  className="rounded-md border border-ivory/10 p-3"
                >
                  <div className="font-display text-xl text-gilt">
                    <Counter value={s.value} />
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-ivory/55">
                    {s.label}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
