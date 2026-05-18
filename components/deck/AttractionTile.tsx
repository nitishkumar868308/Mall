"use client";

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
      className="group relative block h-[440px] w-full overflow-hidden rounded-card border border-ivory/10 text-left transition-transform duration-700 ease-cinematic hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gilt cursor-pointer"
      style={{
        background: `linear-gradient(135deg, ${attraction.posterColor} 0%, color-mix(in srgb, ${attraction.posterColor} 40%, #0A0A0B) 100%)`,
      }}
      aria-label={`Open ${attraction.name} details`}
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.16),transparent_60%)]"
        aria-hidden
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
          className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 ease-cinematic group-hover:scale-[1.04]"
        />
      )}
      <motion.div
        className="absolute inset-0 bg-linear-to-t from-ink via-ink/45 to-transparent"
        animate={{ opacity: hover ? 0.6 : 0.92 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />
      <div className="relative flex h-full flex-col justify-end p-6">
        <span className="text-[10px] uppercase tracking-[0.28em] text-gilt">
          {attraction.tagline}
        </span>
        <h3 className="mt-3 font-display text-3xl text-ivory">
          {attraction.name}
        </h3>
        <span className="mt-5 inline-flex w-fit items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-ivory/70 transition-colors group-hover:text-gilt">
          Open details
          <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </button>
  );
}
