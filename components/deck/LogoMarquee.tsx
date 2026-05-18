import { cn } from "@/lib/utils";

interface LogoMarqueeProps {
  items: string[];
  reverse?: boolean;
  speed?: number;
  className?: string;
}

export function LogoMarquee({
  items,
  reverse = false,
  speed = 60,
  className,
}: LogoMarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-linear-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-linear-to-l from-ink to-transparent" />
      <ul
        className="flex gap-12 whitespace-nowrap will-change-transform motion-reduce:!animate-none"
        style={{
          animation: `marquee ${speed}s linear infinite ${reverse ? "reverse" : "normal"}`,
        }}
      >
        {doubled.map((label, i) => (
          <li
            key={`${label}-${i}`}
            className="flex h-20 items-center justify-center px-6 font-display text-2xl tracking-wide text-ivory/55 transition-colors hover:text-ivory"
          >
            {label}
          </li>
        ))}
      </ul>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
