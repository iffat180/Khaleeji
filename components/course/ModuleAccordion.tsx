"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Lesson {
  id: string;
  title: string;
}

export interface Module {
  number: number;
  slug: string;
  title: string;
  lessons: Lesson[];
}

interface ModuleAccordionProps {
  modules: Module[];
  levelSlug: string;
}

export function ModuleAccordion({ modules, levelSlug }: ModuleAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {modules.map((mod, i) => {
        const isOpen = openIndex === i;

        return (
          <div
            key={mod.slug}
            className={`overflow-hidden rounded-2xl border-2 transition-colors ${
              isOpen
                ? "border-[var(--gold)]/40 bg-[var(--cream)] shadow-md"
                : "border-border bg-[var(--sand-dark)]/60 hover:border-[var(--gold)]/20"
            }`}
          >
            {/* Header */}
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4 min-w-0">
                <span
                  className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    isOpen
                      ? "bg-[var(--gold)] text-[var(--navy)]"
                      : "bg-[var(--navy-muted)]/15 text-[var(--navy-muted)]"
                  }`}
                >
                  {mod.number}
                </span>
                <span className="font-display text-base font-semibold text-[var(--navy)] sm:text-lg leading-snug">
                  {mod.title}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="hidden text-xs text-[var(--navy-muted)] sm:block">
                  {mod.lessons.length} lesson{mod.lessons.length !== 1 ? "s" : ""}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-[var(--navy-muted)] transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {/* Collapsible lesson list */}
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-border/60 px-6 pb-5 pt-4">
                  <ol className="space-y-2">
                    {mod.lessons.map((lesson) => (
                      <li
                        key={lesson.id}
                        className="flex items-start gap-3 text-sm text-[var(--navy-soft)]"
                      >
                        <span className="mt-px shrink-0 font-mono text-xs text-[var(--navy-muted)]">
                          {lesson.id}
                        </span>
                        <span className="leading-snug">{lesson.title}</span>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-5">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-[var(--gold)]/40 text-[var(--navy)] hover:border-[var(--gold)] hover:bg-[var(--gold)]/5"
                    >
                      <Link href={`/courses/${levelSlug}/${mod.slug}`}>
                        Open Module →
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
