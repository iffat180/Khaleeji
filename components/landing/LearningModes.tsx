import Link from "next/link";
import { Check } from "lucide-react";

const MODES = [
  {
    title: "Guided Path",
    description: "Follow a structured roadmap from foundations to fluency.",
    badge: "Available Now",
    badgeColor: "bg-[var(--gold)] text-[var(--navy)]",
    href: "/courses",
    isActive: true,
  },
  {
    title: "Real Situations",
    description: "Learn exactly what to say in everyday real-life scenarios.",
    badge: "Coming Soon",
    badgeColor: "bg-[var(--navy-soft)]/10 text-[var(--navy-soft)] border border-[var(--navy-soft)]/20",
    href: null,
    isActive: false,
  },
  {
    title: "Cultural Insight",
    description: "Understand tone, etiquette, humor, and local nuance.",
    badge: "Coming Soon",
    badgeColor: "bg-[var(--navy-soft)]/10 text-[var(--navy-soft)] border border-[var(--navy-soft)]/20",
    href: null,
    isActive: false,
  },
  {
    title: "AI Coach",
    description: "Practice conversations and receive instant feedback.",
    badge: "Coming Soon",
    badgeColor: "bg-[var(--navy-soft)]/10 text-[var(--navy-soft)] border border-[var(--navy-soft)]/20",
    href: null,
    isActive: false,
  },
];

export function LearningModes() {
  return (
    <section className="border-y border-[var(--gold)]/10 bg-[var(--cream)] py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="mb-5 flex justify-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--gold-dark)]">
            Learning Modes
          </span>
        </div>
        <div className="mx-auto mb-6 h-px w-10 bg-[var(--gold)]/50" />
        <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--navy)] sm:text-4xl text-center mb-4">
          Choose Your Learning Mode
        </h2>
        <p className="text-center text-[var(--navy-soft)] mb-16">
          Start structured — or explore new ways to learn Gulf Arabic.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {MODES.map((mode) => {
            const CardContent = (
              <div
                className={`group relative flex h-full flex-col rounded-2xl border bg-[var(--cream)] p-6 shadow-[0_4px_24px_rgba(13,27,42,0.06)] transition-all ${
                  mode.isActive
                    ? "border-[var(--gold)]/40 hover:border-[var(--gold)] hover:shadow-[0_12px_40px_rgba(201,168,76,0.15)] hover:-translate-y-1"
                    : "border-[var(--gold)]/15 hover:border-[var(--gold)]/30 hover:shadow-[0_8px_32px_rgba(13,27,42,0.08)] hover:-translate-y-0.5"
                }`}
              >
                {/* Top accent bar for active */}
                {mode.isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-[var(--gold)]" />
                )}

                {/* Badge */}
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${mode.badgeColor}`}
                  >
                    {mode.badge}
                  </span>
                  {mode.isActive && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--gold)]/15">
                      <Check className="h-3 w-3 text-[var(--gold-dark)]" />
                    </span>
                  )}
                </div>

                <h3 className="font-display text-xl font-semibold text-[var(--navy)] mb-2">
                  {mode.title}
                </h3>
                <p className="text-sm text-[var(--navy-soft)] leading-relaxed">
                  {mode.description}
                </p>
              </div>
            );

            if (mode.href) {
              return (
                <Link key={mode.title} href={mode.href} className="block">
                  {CardContent}
                </Link>
              );
            }

            return (
              <div key={mode.title} className="cursor-default">
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
