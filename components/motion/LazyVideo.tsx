"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface LazyVideoProps {
  src?: string;
  poster: string;
  alt?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  rootMargin?: string;
  preload?: "none" | "metadata" | "auto";
  fallbackBg?: string;
  priority?: boolean;
}

export function LazyVideo({
  src,
  poster,
  alt = "",
  className,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  rootMargin = "200px",
  preload = "metadata",
  fallbackBg,
  priority = false,
}: LazyVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [mountVideo, setMountVideo] = useState(false);
  const [videoOk, setVideoOk] = useState(true);
  const [posterOk, setPosterOk] = useState(true);

  useEffect(() => {
    if (!src) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const node = wrapRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setMountVideo(true);
            io.disconnect();
          }
        }
      },
      { rootMargin },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [src, rootMargin]);

  return (
    <div
      ref={wrapRef}
      className={cn("relative overflow-hidden", className)}
      style={fallbackBg ? { background: fallbackBg } : undefined}
      aria-hidden={alt ? undefined : true}
    >
      {posterOk && (
        <Image
          src={poster}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          onError={() => setPosterOk(false)}
          className="object-cover"
        />
      )}
      {mountVideo && videoOk && src && (
        <video
          src={src}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload={preload}
          onError={() => setVideoOk(false)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
