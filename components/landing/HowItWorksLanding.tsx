"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MODES = [
  {
    title: "Guided Path",
    description: "Progress through structured levels from Foundations to Advanced Fluency. Each level includes focused lessons, practical phrases, and step-by-step skill building.",
    isActive: true,
  },
  {
    title: "Real Situations",
    description: "Jump directly into real-life scenarios like restaurants, taxis, meetings, and small talk. Learn exactly what to say when it matters.",
    isActive: false,
  },
  {
    title: "Cultural Insight",
    description: "Go beyond vocabulary. Understand tone, etiquette, humor, and how locals actually communicate in context.",
    isActive: false,
  },
  {
    title: "AI Coach",
    description: "Practice live conversations, roleplay real scenarios, and receive instant feedback on pronunciation and phrasing.",
    isActive: false,
  },
];

export function HowItWorksLanding() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % MODES.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + MODES.length) % MODES.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentMode = MODES[currentIndex];

  return (
    <section className="border-y border-[var(--gold)]/10 bg-[var(--sand)] py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="mb-5 flex justify-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--gold-dark)]">
            How It Works
          </span>
        </div>
        <div className="mx-auto mb-6 h-px w-10 bg-[var(--gold)]/50" />
        <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--navy)] sm:text-4xl text-center mb-4">
          How It Works
        </h2>
        <p className="text-center text-[var(--navy-soft)] mb-12">
          Choose your mode. Learn your way.
        </p>

        {/* Carousel */}
        <div className="space-y-6">
          {/* Main carousel card */}
          <div className="relative overflow-hidden rounded-2xl border border-[var(--gold)]/20 bg-[var(--cream)] shadow-[0_8px_32px_rgba(13,27,42,0.08)]">
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[var(--gold)]/30 via-[var(--gold)] to-[var(--gold)]/30" />

            <div className="flex flex-col lg:flex-row lg:min-h-[280px]">
              {/* Left — Big Title */}
              <div className="flex flex-1 flex-col justify-center border-b border-[var(--gold)]/10 bg-gradient-to-br from-[var(--sand)]/50 to-transparent px-8 py-12 lg:border-b-0 lg:border-r lg:border-[var(--gold)]/10">
                <div className="mb-3 flex items-center justify-between">
                  {currentMode.isActive ? (
                    <span className="inline-flex items-center rounded-full bg-[var(--gold)] px-3 py-1 text-xs font-semibold text-[var(--navy)]">
                      Available Now
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-[var(--navy-soft)]/20 bg-[var(--navy-soft)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--navy-soft)]">
                      Coming Soon
                    </span>
                  )}
                  <span className="text-xs font-medium text-[var(--navy-muted)]">
                    {currentIndex + 1} / {MODES.length}
                  </span>
                </div>
                <h3 className="font-display text-3xl font-bold tracking-tight text-[var(--navy)] sm:text-4xl lg:text-5xl">
                  {currentMode.title}
                </h3>
              </div>

              {/* Right — Description */}
              <div className="flex flex-1 flex-col justify-center px-8 py-12">
                <p className="text-base leading-relaxed text-[var(--navy-soft)] sm:text-lg">
                  {currentMode.description}
                </p>
              </div>
            </div>
          </div>

          {/* Controls bar: arrows + dots, below the card (no overlap) */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={goToPrevious}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--gold)]/30 bg-[var(--cream)]/90 shadow-sm transition-all hover:bg-[var(--cream)] hover:shadow-md"
              aria-label="Previous mode"
            >
              <ChevronLeft className="h-4 w-4 text-[var(--navy)]" />
            </button>

            <div className="flex items-center gap-2">
              {MODES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-[var(--gold)]"
                      : "w-2 bg-[var(--gold)]/30 hover:bg-[var(--gold)]/50"
                  }`}
                  aria-label={`Go to ${MODES[index].title}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--gold)]/30 bg-[var(--cream)]/90 shadow-sm transition-all hover:bg-[var(--cream)] hover:shadow-md"
              aria-label="Next mode"
            >
              <ChevronRight className="h-4 w-4 text-[var(--navy)]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
