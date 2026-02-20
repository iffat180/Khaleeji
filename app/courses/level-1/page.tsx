import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModuleAccordion } from "@/components/course/ModuleAccordion";
import type { Module } from "@/components/course/ModuleAccordion";
import { BookOpen, Layers, GraduationCap } from "lucide-react";

const MODULES: Module[] = [
  {
    number: 1,
    slug: "module-1",
    title: "Introduction to SpokenGulf Arabic",
    lessons: [
      { id: "1.1", title: "What is Emirati Dialect?" },
      { id: "1.2", title: "MSA vs Spoken Emirati" },
      { id: "1.3", title: "Regional Differences (Abu Dhabi / Northern Emirates / East Coast)" },
      { id: "1.4", title: "Common Pronunciation Shifts (j → y, q → g, k → ch)" },
    ],
  },
  {
    number: 2,
    slug: "module-2",
    title: "Arabizi & Pronunciation",
    lessons: [
      { id: "2.1", title: "What is Arabizi?" },
      { id: "2.2", title: "Numbers in Arabizi (3, 7, etc.)" },
      { id: "2.3", title: "Emirati Alphabet Sounds (28 letters simplified)" },
      { id: "2.4", title: "Special Colloquial Sounds (ch, g)" },
      { id: "2.5", title: "Pronunciation Practice" },
    ],
  },
  {
    number: 3,
    slug: "module-3",
    title: "Core Survival Phrases",
    lessons: [
      { id: "3.1", title: "Greetings" },
      { id: "3.2", title: "Responses to Greetings" },
      { id: "3.3", title: "Thanking & Replying" },
      { id: "3.4", title: "How Are You? Variations (m/f/pl)" },
      { id: "3.5", title: "Goodbye & Polite Expressions" },
    ],
  },
  {
    number: 4,
    slug: "module-4",
    title: "Question Words",
    lessons: [
      { id: "4.1", title: "Why — ليش" },
      { id: "4.2", title: "When — متى" },
      { id: "4.3", title: "Where — وين" },
      { id: "4.4", title: "How — كيف" },
      { id: "4.5", title: "How Much / How Many — كم" },
      { id: "4.6", title: "Who — منو" },
      { id: "4.7", title: "What — شو" },
      { id: "4.8", title: "Which — أي" },
    ],
  },
  {
    number: 5,
    slug: "module-5",
    title: "Numbers & Counting",
    lessons: [
      { id: "5.1", title: "Numbers 0–10" },
      { id: "5.2", title: "11–20" },
      { id: "5.3", title: "Tens (20–90)" },
      { id: "5.4", title: "Hundreds, Thousands, Millions" },
      { id: "5.5", title: "Ordinal Numbers (First, Second…)" },
      { id: "5.6", title: "Using Numbers in Questions (Age, Salary, Quantity)" },
    ],
  },
  {
    number: 6,
    slug: "module-6",
    title: "Pronouns & Basic Grammar",
    lessons: [
      { id: "6.1", title: "Personal Pronouns" },
      { id: "6.2", title: "Demonstratives (This / Here / There)" },
      { id: "6.3", title: "Negative Particle (mob)" },
      { id: "6.4", title: "Definite Article (il-)" },
      { id: "6.5", title: "Gender Differences (m / f / pl)" },
    ],
  },
  {
    number: 7,
    slug: "module-7",
    title: "Family & Relationships",
    lessons: [
      { id: "7.1", title: "Immediate Family" },
      { id: "7.2", title: "Extended Family" },
      { id: "7.3", title: "Marital Status Vocabulary" },
      { id: "7.4", title: "Social Relationship Terms" },
    ],
  },
  {
    number: 8,
    slug: "module-8",
    title: "Body & Feelings",
    lessons: [
      { id: "8.1", title: "Body Parts" },
      { id: "8.2", title: "Basic Health Terms" },
      { id: "8.3", title: "Feelings & Emotions" },
      { id: "8.4", title: "Physical States (Hot, Cold, Tired)" },
    ],
  },
];

const OUTCOMES = [
  "Understand how Emirati dialect differs from MSA",
  "Read and interpret Arabizi",
  "Use core survival phrases confidently",
  "Ask and answer basic questions",
  "Count and use numbers in real contexts",
  "Understand pronouns and basic grammar",
];

const LESSON_INCLUDES = [
  "Spoken phrase",
  "Arabizi version",
  "English meaning",
  "Cultural context",
  "Audio practice",
  "Quick knowledge check",
];

export default function Level1OverviewPage() {
  return (
    <div className="min-h-screen bg-[var(--sand)]">

      {/* ─── SECTION 1 — HERO ─── */}
      <section className="border-b border-border bg-[var(--cream)]">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--navy-muted)] hover:text-[var(--navy)] transition-colors"
          >
            ← Back to Guided Path
          </Link>

          <div className="mt-6 max-w-3xl">
            {/* Eyebrow */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[var(--sand)] px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--gold-dark)]">
                Stage 1 · Foundations
              </span>
            </div>

            <h1 className="font-display text-3xl font-bold leading-tight text-[var(--navy)] sm:text-4xl lg:text-5xl">
              Level 1 — Foundations of Spoken Gulf Arabic
            </h1>
            <p className="mt-4 text-base text-[var(--navy-soft)] sm:text-lg leading-relaxed max-w-2xl">
              Build your core understanding of Gulf Arabic pronunciation, structure, and survival communication.
            </p>

            {/* Metadata row */}
            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-[var(--navy-muted)]">
              <span className="flex items-center gap-1.5">
                <Layers className="h-4 w-4" />
                8 Modules
              </span>
              <span className="h-1 w-1 rounded-full bg-[var(--navy-muted)]/40" />
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                40+ Lessons
              </span>
              <span className="h-1 w-1 rounded-full bg-[var(--navy-muted)]/40" />
              <span className="flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4" />
                Beginner Level
              </span>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Button asChild size="lg" className="px-8 py-6 text-base">
                <Link href="/courses/level-1/module-1">Start Level 1</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2 — WHAT YOU'LL MASTER ─── */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <h2 className="font-display text-2xl font-bold text-[var(--navy)] sm:text-3xl">
          What You&apos;ll Master
        </h2>
        <p className="mt-2 text-sm text-[var(--navy-muted)]">
          After completing Level 1, you will be able to:
        </p>
        <ul className="mt-6 space-y-3">
          {OUTCOMES.map((outcome) => (
            <li key={outcome} className="flex items-start gap-3 text-[var(--navy-soft)]">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" />
              <span className="text-sm sm:text-base leading-snug">{outcome}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── SECTION 3 — MODULE BREAKDOWN ─── */}
      <section className="border-t border-border bg-[var(--cream)] py-14 sm:py-18 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold text-[var(--navy)] sm:text-3xl">
              Module Breakdown
            </h2>
            <p className="mt-2 text-sm text-[var(--navy-muted)]">
              8 modules · click any module to see its lessons
            </p>
          </div>

          <ModuleAccordion modules={MODULES} levelSlug="level-1" />
        </div>
      </section>

      {/* ─── SECTION 4 — HOW LEVEL 1 WORKS ─── */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <h2 className="font-display text-2xl font-bold text-[var(--navy)] sm:text-3xl">
          How Level 1 Works
        </h2>
        <p className="mt-3 text-sm text-[var(--navy-soft)] sm:text-base leading-relaxed max-w-2xl">
          Each module contains structured lessons. Lessons are short, focused, and progress in difficulty.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-[var(--cream)] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--navy-muted)] mb-5">
            Each lesson includes
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LESSON_INCLUDES.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-[var(--navy-soft)]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/15">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── SECTION 5 — FINAL CTA ─── */}
      <section className="border-t border-border bg-[var(--cream)] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-bold text-[var(--navy)] sm:text-3xl">
            Ready to Start Level 1?
          </h2>
          <p className="mt-3 text-sm text-[var(--navy-muted)] sm:text-base">
            8 modules · 40+ lessons · self-paced
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="px-10 py-6 text-base">
              <Link href="/courses/level-1/module-1">Begin Foundations</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
