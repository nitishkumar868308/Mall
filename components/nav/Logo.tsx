import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className, size = 26 }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 align-middle font-display tracking-[0.32em] uppercase",
        className,
      )}
      aria-label="American Dream"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <path
          d="M20 2 L38 20 L20 38 L2 20 Z"
          stroke="currentColor"
          strokeWidth="1.6"
          opacity="0.9"
        />
        <path
          d="M13 27 L20 12 L27 27 M16 22 L24 22"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <circle cx="20" cy="20" r="1.5" fill="currentColor" />
      </svg>
      <span className="hidden sm:inline">American&nbsp;Dream</span>
    </span>
  );
}
