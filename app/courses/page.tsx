import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const STAGES = [
  {
    id: "foundations",
    title: "Foundations",
    levels: "Levels 1–2",
    description:
      "Core sounds, Arabizi basics, greetings, and simple sentence building.",
  },
  {
    id: "survival",
    title: "Survival",
    levels: "Levels 3–5",
    description:
      "Essential phrases for restaurants, taxis, directions, and daily situations.",
  },
  {
    id: "daily-life",
    title: "Daily Life",
    levels: "Levels 6–8",
    description:
      "Conversations about home, time, emotions, shopping, and everyday interactions.",
  },
  {
    id: "social",
    title: "Social Communication",
    levels: "Levels 9–10",
    description:
      "Invitations, apologies, humor, cultural etiquette, and tone awareness.",
  },
  {
    id: "professional",
    title: "Professional Fluency",
    levels: "Levels 11–13",
    description:
      "Workplace phrases, meetings, negotiation, and formal communication.",
  },
  {
    id: "advanced",
    title: "Advanced Expression",
    levels: "Levels 14–15",
    description:
      "Slang, idioms, storytelling, and natural conversational rhythm.",
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-[var(--sand)]">
      {/* Header */}
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6 lg:px-8 lg:pt-20 lg:pb-16 text-center">
        <h1 className="font-display text-3xl font-bold text-[var(--navy)] sm:text-4xl md:text-5xl">
          Gulf Arabic — Guided Path
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[var(--navy-soft)]">
          A structured curriculum of 15 levels, organised into 6 progressive stages.
        </p>
        <div className="mt-8">
          <Button asChild size="lg" className="px-8 py-6 text-base sm:text-lg">
            <Link href="/courses/level-1">Begin at Level 1</Link>
          </Button>
        </div>
      </section>

      {/* Your Learning Path – 6-stage cards */}
      <section
        id="curriculum"
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-[var(--navy)] sm:text-4xl">
            Your Learning Path
          </h2>
          <p className="mt-4 text-lg text-[var(--navy-soft)]">
            Six structured stages covering Levels 1–15.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STAGES.map((stage, i) => {
            const isOpen = i === 0;

            return (
              <div
                key={stage.id}
                className={`group relative overflow-hidden rounded-2xl border-2 transition-all ${
                  isOpen
                    ? "border-[var(--gold)]/30 bg-[var(--cream)] shadow-lg hover:border-[var(--gold)] hover:shadow-xl"
                    : "border-border bg-[var(--sand-dark)]/50 opacity-90"
                }`}
              >
                {/* Badge */}
                <div className="absolute right-4 top-4 z-10">
                  {isOpen ? (
                    <span className="inline-flex items-center rounded-full bg-[var(--gold)] px-3 py-1 text-xs font-semibold text-[var(--navy)] shadow-sm">
                      FREE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full border border-[var(--gold)] bg-[var(--cream)] px-3 py-1 text-xs font-semibold text-[var(--gold)] shadow-sm">
                      <Lock className="h-3 w-3" />
                      PREMIUM
                    </span>
                  )}
                </div>

                <div className="p-6 sm:p-8">
                  <div className="mb-4">
                    <h3 className="font-display text-xl font-bold text-[var(--navy)] sm:text-2xl">
                      {stage.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[var(--navy-muted)]">
                      {stage.levels}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--navy-soft)]">
                      {stage.description}
                    </p>
                  </div>

                  <div className="mt-6">
                    {isOpen ? (
                      <Button
                        asChild
                        className="w-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)] text-[var(--navy)] shadow-md hover:shadow-lg hover:-translate-y-0.5"
                      >
                        <Link href="/courses/level-1">Start Learning →</Link>
                      </Button>
                    ) : (
                      <Button
                        disabled
                        className="w-full cursor-not-allowed bg-[var(--navy-muted)]/20 text-[var(--navy-muted)]"
                      >
                        <Lock className="mr-2 h-4 w-4" />
                        Unlock with Subscription
                      </Button>
                    )}
                  </div>
                </div>

                {isOpen && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-[var(--gold)] opacity-50" />
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
