import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  eyebrow?: string;
  className?: string;
  children: React.ReactNode;
}

export function Section({ id, eyebrow, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("relative w-full", className)}>
      {eyebrow && (
        <div className="absolute left-6 top-8 hidden lg:block">
          <span className="text-[10px] uppercase tracking-[0.32em] text-ivory/40">
            {eyebrow}
          </span>
        </div>
      )}
      {children}
    </section>
  );
}
