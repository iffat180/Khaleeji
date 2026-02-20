import Link from "next/link";
import { Button } from "@/components/ui/button";

const LEVELS = [
  { num: "00", name: "Level 0", subtitle: "Foundations" },
  { num: "01", name: "Level 1", subtitle: "Survival" },
  { num: "02", name: "Level 2", subtitle: "Daily Life" },
  { num: "03", name: "Level 3", subtitle: "Social & Cultural" },
  { num: "04", name: "Level 4", subtitle: "Business & Professional" },
  { num: "05", name: "Level 5", subtitle: "Advanced Fluency" },
];

export function LearningPathPreview() {
  return (
    <section className="bg-[var(--sand)] py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="mb-5 flex justify-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--gold-dark)]">
            The Curriculum
          </span>
        </div>
        <div className="mx-auto mb-6 h-px w-10 bg-[var(--gold)]/50" />
        <h2 className="font-display text-3xl font-bold text-[var(--navy)] sm:text-4xl text-center mb-16 tracking-tight">
          Explore the Learning Journey
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
          {LEVELS.map((level) => (
            <div
              key={level.name}
              className="group rounded-xl border-l-2 border-l-[var(--gold)]/40 border-t border-r border-b border-border/50 bg-[var(--cream)] px-5 py-5 shadow-[0_2px_12px_rgba(13,27,42,0.04)] transition-all hover:border-l-[var(--gold)] hover:shadow-[0_6px_24px_rgba(13,27,42,0.07)]"
            >
              <span className="font-display text-[11px] font-bold tracking-widest text-[var(--gold-dark)] opacity-60">
                {level.num}
              </span>
              <p className="mt-1 font-display text-base font-semibold text-[var(--navy)]">
                {level.name}
              </p>
              <p className="mt-0.5 text-[13px] text-[var(--navy-soft)]">{level.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border border-[var(--navy)]/20 bg-transparent text-[var(--navy)] hover:border-[var(--gold)] hover:bg-[var(--gold)]/5"
          >
            <Link href="/courses#curriculum">See Full Curriculum →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
