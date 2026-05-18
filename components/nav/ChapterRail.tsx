"use client";

import { CHAPTERS } from "@/lib/config/chapters";
import { useChapterObserver } from "@/lib/hooks/useChapterObserver";
import { cn } from "@/lib/utils";

export function ChapterRail() {
  const ids = CHAPTERS.map((c) => c.id);
  const active = useChapterObserver(ids);

  return (
    <nav
      aria-label="Chapters"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:flex"
    >
      <ul className="flex flex-col gap-5">
        {CHAPTERS.map((c) => {
          const isActive = active === c.id;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                aria-current={isActive ? "true" : undefined}
                aria-label={`Chapter ${c.eyebrow}: ${c.title}`}
                className="group flex items-center justify-end gap-3"
              >
                <span
                  className={cn(
                    "text-[10px] uppercase tracking-[0.24em] transition-colors duration-500",
                    isActive
                      ? "text-gilt"
                      : "text-ivory/40 group-hover:text-ivory",
                  )}
                >
                  {c.eyebrow}
                </span>
                <span
                  className={cn(
                    "block h-[1px] transition-all duration-500 ease-cinematic",
                    isActive
                      ? "w-12 bg-gilt"
                      : "w-5 bg-ivory/30 group-hover:w-8 group-hover:bg-ivory",
                  )}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
