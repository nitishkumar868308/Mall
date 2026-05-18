"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Attraction } from "@/lib/types";

interface AttractionTileProps {
  attraction: Attraction;
  onOpen: () => void;
}

export function AttractionTile({ attraction, onOpen }: AttractionTileProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState(false);
  const [videoOk, setVideoOk] = useState(true);

  function handleEnter() {
    setHover(true);
    videoRef.current?.play().catch(() => undefined);
  }
  function handleLeave() {
    setHover(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      className="group relative block h-110 w-full overflow-hidden rounded-card border border-ivory/10 text-left transition-transform duration-700 ease-cinematic hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gilt cursor-pointer"
      aria-label={`Open ${attraction.name} details`}
    >
      <Image
        src={attraction.image}
        alt={attraction.name}
        fill
        sizes="(min-width:768px) 50vw, 100vw"
        className="object-cover transition-transform duration-1000 ease-cinematic group-hover:scale-110"
      />
      {videoOk && (
        <video
          ref={videoRef}
          src={`/videos/${attraction.slug}.mp4`}
          muted
          loop
          playsInline
          preload="none"
          onError={() => setVideoOk(false)}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}
      <motion.div
        className="absolute inset-0 bg-linear-to-t from-ink via-ink/40 to-transparent"
        animate={{ opacity: hover ? 0.55 : 0.85 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />
      <div
        className="absolute inset-0 mix-blend-overlay bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]"
        aria-hidden
      />
      <div className="relative flex h-full flex-col justify-end p-6">
        <span className="text-[10px] uppercase tracking-[0.28em] text-gilt">
          {attraction.tagline}
        </span>
        <h3 className="mt-3 font-display text-3xl text-ivory">
          {attraction.name}
        </h3>
        <span className="mt-5 inline-flex w-fit items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-ivory/80 transition-colors group-hover:text-gilt">
          Open details
          <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </button>
  );
}
