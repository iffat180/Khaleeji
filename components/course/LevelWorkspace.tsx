"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PhraseViewer } from "@/components/lesson/PhraseViewer";

export interface FlatLesson {
  lesson: { id: string; title: string; slug: string; type: string; order: number };
  module: { id: string; title: string; slug: string };
  phrases: { arabic_text: string; transliteration: string; english_meaning: string }[];
  questions?: { question: string; correct_answer: string }[];
}

interface LevelWorkspaceProps {
  level: { id: string; title: string; slug: string; description: string | null };
  flatLessons: FlatLesson[];
}

export function LevelWorkspace({ level, flatLessons }: LevelWorkspaceProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const active = flatLessons[activeIndex] ?? null;
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < flatLessons.length - 1;

  const currentPhrase = active?.phrases?.[0];
  const isQuiz = active?.lesson?.type === "quiz";

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-[var(--sand)]">
      {/* Left: Lesson viewer (70%) */}
      <div className="flex-1 lg:w-[70%] p-4 sm:p-6 lg:p-8">
        <Link
          href="/courses"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          ← Back to courses
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-[var(--navy)] sm:text-3xl">
          {level.title}
        </h1>
        {level.description && (
          <p className="mt-2 text-muted-foreground">{level.description}</p>
        )}

        {flatLessons.length === 0 ? (
          <div className="mt-12 rounded-2xl border-2 border-dashed border-border bg-[var(--cream)] py-16 text-center">
            <p className="text-lg font-medium text-[var(--navy-muted)]">No lessons in this level yet.</p>
          </div>
        ) : active ? (
          <div className="mt-8 rounded-2xl border-2 border-border bg-[var(--cream)] p-6 sm:p-10 shadow-md">
            <p className="mb-4 text-sm text-muted-foreground">
              {active.module.title} • {active.lesson.title}
            </p>

            {isQuiz ? (
              <div className="space-y-4">
                <p className="text-lg text-[var(--navy-soft)]">Quiz lesson</p>
                {active.questions?.[0] && (
                  <p className="text-xl font-medium text-[var(--navy)]">
                    {active.questions[0].question}
                  </p>
                )}
              </div>
            ) : currentPhrase ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div
                    className="arabic text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--navy)]"
                    dir="rtl"
                  >
                    {currentPhrase.arabic_text}
                  </div>
                  <p className="mt-4 text-xl sm:text-2xl text-muted-foreground italic">
                    {currentPhrase.transliteration}
                  </p>
                  <p className="mt-4 text-2xl sm:text-3xl font-semibold text-[var(--navy)]">
                    {currentPhrase.english_meaning}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">No content yet.</p>
            )}

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
              <Button
                variant="outline"
                onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
                disabled={!hasPrev}
              >
                ← Previous
              </Button>
              <Button disabled>Mark Complete</Button>
              <Button
                onClick={() => setActiveIndex((i) => Math.min(flatLessons.length - 1, i + 1))}
                disabled={!hasNext}
              >
                Next →
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      {/* Right: Sticky sidebar (30%) */}
      <aside className="w-full lg:w-[30%] lg:min-w-[280px] border-t lg:border-t-0 lg:border-l border-border bg-[var(--cream)] p-4 sm:p-6 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--navy-muted)] mb-4">
          Lessons
        </h2>
        <div className="space-y-6">
          {(() => {
            const byModule = new Map<string, { module: FlatLesson["module"]; items: { fl: FlatLesson; idx: number }[] }>();
            flatLessons.forEach((fl, idx) => {
              const key = fl.module.id;
              if (!byModule.has(key)) {
                byModule.set(key, { module: fl.module, items: [] });
              }
              byModule.get(key)!.items.push({ fl, idx });
            });
            return Array.from(byModule.values()).map(({ module, items }) => (
              <div key={module.id}>
                <h3 className="font-display text-base font-semibold text-[var(--navy)]">
                  {module.title}
                </h3>
                <ul className="mt-2 space-y-1">
                  {items.map(({ fl, idx }) => {
                    const isActive = idx === activeIndex;
                    return (
                      <li key={fl.lesson.id}>
                        <button
                          type="button"
                          onClick={() => setActiveIndex(idx)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            isActive
                              ? "bg-[var(--gold)]/30 text-[var(--navy)] font-medium"
                              : "text-muted-foreground hover:bg-[var(--sand-dark)] hover:text-foreground"
                          }`}
                        >
                          {fl.lesson.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ));
          })()}
        </div>
      </aside>
    </div>
  );
}
