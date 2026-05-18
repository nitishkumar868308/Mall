"use client";

import { useEffect } from "react";
import { CHAPTERS } from "@/lib/config/chapters";

export function KeyboardNav() {
  useEffect(() => {
    function scrollTo(id: string) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    function currentIndex(): number {
      const y = window.scrollY + window.innerHeight * 0.5;
      let best = 0;
      let bestDist = Infinity;
      CHAPTERS.forEach((c, i) => {
        const el = document.getElementById(c.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const mid = top + el.offsetHeight / 2;
        const dist = Math.abs(mid - y);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      return best;
    }
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      const idx = currentIndex();
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        const next = CHAPTERS[Math.min(idx + 1, CHAPTERS.length - 1)];
        if (next) {
          e.preventDefault();
          scrollTo(next.id);
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        const prev = CHAPTERS[Math.max(idx - 1, 0)];
        if (prev) {
          e.preventDefault();
          scrollTo(prev.id);
        }
      } else if (/^[1-8]$/.test(e.key)) {
        const target = CHAPTERS[Number(e.key) - 1];
        if (target) {
          e.preventDefault();
          scrollTo(target.id);
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return null;
}
