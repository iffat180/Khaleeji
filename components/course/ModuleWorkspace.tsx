"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight, LayoutGrid, List } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ContentBlock = Record<string, unknown> & {
  id: string;
  section_id: string;
  order_number: number;
};

export type SectionWithBlocks = {
  id: string;
  title: string;
  order_number: number;
  blocks: ContentBlock[];
};

export interface ModuleWorkspaceProps {
  level: { id: string; title: string; slug: string };
  module: { id: string; title: string; slug: string; description: string | null };
  sections: SectionWithBlocks[];
}

// ─── Flat block (carries its section context) ─────────────────────────────────

type FlatBlock = ContentBlock & {
  sectionId: string;
  sectionTitle: string;
  sectionIndex: number;
};

// ─── Inline markdown renderer ─────────────────────────────────────────────────

function parseBoldInline(text: string): React.ReactNode[] {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-[var(--navy)]">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

function renderMarkdown(raw: string): React.ReactNode {
  const lines = raw.split("\n");
  const nodes: React.ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = (key: string) => {
    if (!listBuffer.length) return;
    nodes.push(
      <ul key={key} className="mt-2 space-y-2">
        {listBuffer.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[var(--navy-soft)]">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" />
            <span className="leading-relaxed">{parseBoldInline(item)}</span>
          </li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  lines.forEach((line, i) => {
    const t = line.trim();
    if (t.startsWith("- ") || t.startsWith("• ")) {
      listBuffer.push(t.slice(2));
    } else {
      flushList(`list-${i}`);
      if (t === "") {
        nodes.push(<div key={`gap-${i}`} className="h-3" />);
      } else {
        nodes.push(
          <p key={`p-${i}`} className="leading-relaxed text-[var(--navy-soft)]">
            {parseBoldInline(t)}
          </p>
        );
      }
    }
  });
  flushList("list-end");
  return <>{nodes}</>;
}

// ─── Lesson card ──────────────────────────────────────────────────────────────

function LessonCard({ block, animKey }: { block: FlatBlock; animKey: number }) {
  const label    = block.title           as string | null;
  const arabic   = block.arabic_text     as string | null;
  const roman    = block.transliteration as string | null;
  const english  = block.english_meaning as string | null;
  const bodyText = (block.content as string | null) ?? (block.notes as string | null);
  const hasPhrase = !!(arabic || roman || english);

  const unknownFields =
    hasPhrase || bodyText || label
      ? []
      : Object.entries(block).filter(
          ([k, v]) =>
            !["id", "section_id", "order_number", "sectionId", "sectionTitle", "sectionIndex"].includes(k) &&
            v !== null && v !== undefined && typeof v !== "object"
        );

  return (
    <>
      {/* Card */}
      <div
        key={`card-${animKey}`}
        className="w-full max-w-[700px] rounded-[20px] border border-[var(--gold)]/25 bg-gradient-to-b from-[var(--cream)] to-[var(--sand-dark)] shadow-[0_8px_40px_rgba(13,27,42,0.08)]"
        style={{ animation: "cardEnter 0.3s cubic-bezier(0.22,1,0.36,1) both" }}
      >
        <div className="px-10 py-12 sm:px-14 sm:py-14">
          {label && (
            <p className="mb-7 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--navy-muted)]">
              {label}
            </p>
          )}

          {/* Phrase layout */}
          {hasPhrase && (
            <div className="space-y-5 text-center">
              {arabic && (
                <p
                  className="arabic leading-[1.55] text-5xl font-bold text-[var(--navy)] sm:text-6xl"
                  dir="rtl"
                >
                  {arabic}
                </p>
              )}
              {roman && (
                <p className="text-xl italic text-[var(--navy-muted)] sm:text-2xl">
                  {roman}
                </p>
              )}
              {english && (
                <p className="text-2xl font-semibold text-[var(--navy-soft)] sm:text-3xl">
                  {english}
                </p>
              )}
            </div>
          )}

          {/* Text-only block */}
          {!hasPhrase && bodyText && (
            <div className="text-base leading-relaxed text-[var(--navy-soft)] sm:text-lg">
              {renderMarkdown(bodyText)}
            </div>
          )}

          {/* Fallback */}
          {unknownFields.length > 0 && (
            <dl className="space-y-1.5 text-sm">
              {unknownFields.map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <dt className="font-medium text-[var(--navy-muted)]">{k}:</dt>
                  <dd className="text-[var(--navy-soft)]">{String(v)}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>

      {/* Deep Explanation — only when block has BOTH phrase AND notes */}
      {hasPhrase && bodyText && (
        <div
          key={`exp-${animKey}`}
          className="mt-8 w-full max-w-[700px]"
          style={{ animation: "cardEnter 0.4s 0.1s cubic-bezier(0.22,1,0.36,1) both" }}
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-border/70" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--navy-muted)]">
              Explanation
            </span>
            <div className="h-px flex-1 bg-border/70" />
          </div>
          <div className="rounded-2xl border border-border/60 bg-[var(--cream)] px-7 py-6 sm:px-8 sm:py-7 text-sm">
            {renderMarkdown(bodyText)}
          </div>
        </div>
      )}
    </>
  );
}

// ─── List view block card ─────────────────────────────────────────────────────

function ListBlockCard({ block }: { block: ContentBlock }) {
  const label    = block.title           as string | null;
  const arabic   = block.arabic_text     as string | null;
  const roman    = block.transliteration as string | null;
  const english  = block.english_meaning as string | null;
  const bodyText = (block.content as string | null) ?? (block.notes as string | null);
  const hasPhrase = !!(arabic || roman || english);

  const unknownFields =
    hasPhrase || bodyText || label
      ? []
      : Object.entries(block).filter(
          ([k, v]) =>
            !["id", "section_id", "order_number"].includes(k) &&
            v !== null && v !== undefined && typeof v !== "object"
        );

  return (
    <div className="rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-b from-[var(--cream)] to-[var(--sand-dark)] shadow-[0_4px_24px_rgba(13,27,42,0.07)] p-8 sm:p-10">
      {label && (
        <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--navy-muted)]">
          {label}
        </p>
      )}
      {hasPhrase && (
        <div className="space-y-4 text-center">
          {arabic && (
            <p className="arabic text-4xl font-bold leading-relaxed text-[var(--navy)] sm:text-5xl" dir="rtl">
              {arabic}
            </p>
          )}
          {roman && (
            <p className="text-lg italic text-[var(--navy-muted)] sm:text-xl">{roman}</p>
          )}
          {english && (
            <p className="text-xl font-semibold text-[var(--navy-soft)] sm:text-2xl">{english}</p>
          )}
        </div>
      )}
      {bodyText && (
        <div
          className={`leading-relaxed text-[var(--navy-soft)] ${
            hasPhrase
              ? "mt-6 border-t border-border/50 pt-5 text-sm text-[var(--navy-muted)]"
              : "text-base sm:text-lg"
          }`}
        >
          {renderMarkdown(bodyText)}
        </div>
      )}
      {unknownFields.length > 0 && (
        <dl className="space-y-1 text-sm text-[var(--navy-soft)]">
          {unknownFields.map(([k, v]) => (
            <div key={k} className="flex gap-2">
              <dt className="font-medium text-[var(--navy-muted)]">{k}:</dt>
              <dd>{String(v)}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

// ─── View toggle pill ─────────────────────────────────────────────────────────

function ViewToggle({
  value,
  onChange,
}: {
  value: "card" | "list";
  onChange: (v: "card" | "list") => void;
}) {
  return (
    <div className="flex items-center rounded-lg border border-border bg-[var(--sand)] p-0.5">
      <button
        type="button"
        onClick={() => onChange("list")}
        className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
          value === "list"
            ? "bg-[var(--cream)] text-[var(--navy)] shadow-sm"
            : "text-[var(--navy-muted)] hover:text-[var(--navy)]"
        }`}
      >
        <List className="h-3.5 w-3.5" />
        List
      </button>
      <button
        type="button"
        onClick={() => onChange("card")}
        className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
          value === "card"
            ? "bg-[var(--cream)] text-[var(--navy)] shadow-sm"
            : "text-[var(--navy-muted)] hover:text-[var(--navy)]"
        }`}
      >
        <LayoutGrid className="h-3.5 w-3.5" />
        Card
      </button>
    </div>
  );
}

// ─── Sidebar section item (unchanged) ────────────────────────────────────────

function SidebarSection({
  section,
  index,
  isActive,
  onNavigate,
}: {
  section: SectionWithBlocks;
  index: number;
  isActive: boolean;
  onNavigate: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (isActive) setExpanded(true);
  }, [isActive]);

  const blockTitles = section.blocks
    .map((b) => (b.title as string | null) ?? (b.english_meaning as string | null))
    .filter(Boolean) as string[];

  return (
    <li>
      <button
        type="button"
        onClick={() => {
          onNavigate(section.id);
          setExpanded((v) => !v);
        }}
        className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
          isActive
            ? "bg-[var(--gold)]/15 font-semibold text-[var(--navy)]"
            : "text-[var(--navy-soft)] hover:bg-[var(--sand-dark)] hover:text-[var(--navy)]"
        }`}
      >
        <span className="flex items-center gap-2.5 min-w-0">
          <span
            className={`shrink-0 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
              isActive
                ? "bg-[var(--gold)] text-[var(--navy)]"
                : "bg-[var(--navy-muted)]/15 text-[var(--navy-muted)]"
            }`}
          >
            {index + 1}
          </span>
          <span className="truncate leading-snug">{section.title}</span>
        </span>
        {blockTitles.length > 0 && (
          <ChevronDown
            className={`h-3.5 w-3.5 shrink-0 text-[var(--navy-muted)] transition-transform duration-150 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      {expanded && blockTitles.length > 0 && (
        <ul className="mt-1 ml-8 space-y-0.5 border-l border-border/50 pl-3">
          {blockTitles.map((title, bi) => (
            <li
              key={bi}
              className="truncate py-0.5 text-xs text-[var(--navy-muted)] leading-snug"
            >
              {title}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

// ─── Main workspace ───────────────────────────────────────────────────────────

export function ModuleWorkspace({ level, module, sections }: ModuleWorkspaceProps) {
  const [idx, setIdx]               = useState(0);
  const [animKey, setAnimKey]       = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [viewMode, setViewMode]     = useState<"card" | "list">("card");

  // Flatten all blocks across sections into one sequential list
  const flatBlocks = useMemo<FlatBlock[]>(
    () =>
      sections.flatMap((s, si) =>
        s.blocks.map((b) => ({
          ...b,
          sectionId: s.id,
          sectionTitle: s.title,
          sectionIndex: si,
        }))
      ),
    [sections]
  );

  const total   = flatBlocks.length;
  const current = flatBlocks[idx] ?? null;
  const activeId = current?.sectionId ?? sections[0]?.id ?? "";
  const activeSection = sections.find((s) => s.id === activeId);

  function navigate(newIdx: number) {
    if (newIdx < 0 || newIdx >= total) return;
    setIdx(newIdx);
    setAnimKey((k) => k + 1);
  }

  // Card mode: jump to first block of that section
  function jumpToSection(sectionId: string) {
    const firstIdx = flatBlocks.findIndex((b) => b.sectionId === sectionId);
    if (firstIdx >= 0) {
      navigate(firstIdx);
      setMobileOpen(false);
    }
  }

  // List mode: smooth-scroll to the section element
  function scrollToSection(sectionId: string) {
    const el = document.getElementById(`section-${sectionId}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  }

  function handleSidebarNavigate(sectionId: string) {
    if (viewMode === "card") jumpToSection(sectionId);
    else scrollToSection(sectionId);
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setIdx((i) => {
          const n = Math.min(i + 1, total - 1);
          if (n !== i) setAnimKey((k) => k + 1);
          return n;
        });
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setIdx((i) => {
          const n = Math.max(i - 1, 0);
          if (n !== i) setAnimKey((k) => k + 1);
          return n;
        });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [total]);

  return (
    <>
      {/* Animation keyframes */}
      <style>{`
        @keyframes cardEnter {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>

      <div className="min-h-screen bg-[var(--sand)]">

        {/* ── Top bar ── */}
        <div className="sticky top-0 z-20 border-b border-border bg-[var(--cream)]/90 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <Link
              href={`/courses/${level.slug}`}
              className="shrink-0 text-sm text-[var(--navy-muted)] hover:text-[var(--navy)] transition-colors"
            >
              ← {level.title}
            </Link>
            <span className="text-[var(--navy-muted)]">/</span>
            <span className="truncate text-sm font-medium text-[var(--navy)]">
              {module.title}
            </span>

            {/* View toggle — always visible */}
            <div className="ml-auto hidden sm:block">
              <ViewToggle value={viewMode} onChange={setViewMode} />
            </div>

            {sections.length > 0 && (
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                className="sm:hidden ml-auto flex items-center gap-1.5 rounded-full border border-border bg-[var(--sand)] px-3 py-1 text-xs font-medium text-[var(--navy-soft)]"
              >
                {activeSection?.title ?? "Sections"}
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${mobileOpen ? "rotate-180" : ""}`}
                />
              </button>
            )}
          </div>

          {mobileOpen && (
            <div className="border-t border-border bg-[var(--cream)] px-4 py-3 lg:hidden">
              {/* Toggle inside mobile dropdown */}
              <div className="mb-3 flex justify-center sm:hidden">
                <ViewToggle value={viewMode} onChange={setViewMode} />
              </div>
              <ul className="space-y-1">
                {sections.map((s, i) => (
                  <SidebarSection
                    key={s.id}
                    section={s}
                    index={i}
                    isActive={s.id === activeId}
                    onNavigate={handleSidebarNavigate}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ── 2-column body ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12 xl:grid-cols-[1fr_300px]">

            {/* ── LEFT: main content (card or list) ── */}
            <main className="py-10 lg:py-14">

              {/* Module title */}
              <header className="mb-10 max-w-[700px]">
                <h1 className="font-display text-3xl font-bold leading-tight text-[var(--navy)] sm:text-4xl">
                  {module.title}
                </h1>
                {module.description && (
                  <p className="mt-3 text-base leading-relaxed text-[var(--navy-soft)]">
                    {module.description}
                  </p>
                )}
              </header>

              {/* ── CARD VIEW ── */}
              {viewMode === "card" && (
                <>
                  {total === 0 ? (
                    <div className="max-w-[700px] rounded-2xl border-2 border-dashed border-border bg-[var(--cream)] py-20 text-center">
                      <p className="text-base font-medium text-[var(--navy-muted)]">
                        Content for this module is being prepared.
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Section breadcrumb */}
                      {current && (
                        <div className="mb-5 flex items-center gap-2.5">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--gold)] text-[10px] font-bold text-[var(--navy)]">
                            {current.sectionIndex + 1}
                          </span>
                          <span className="text-sm font-medium text-[var(--navy-muted)]">
                            {current.sectionTitle}
                          </span>
                        </div>
                      )}

                      {current && <LessonCard block={current} animKey={animKey} />}

                      {/* Navigation row */}
                      <div className="mt-8 flex w-full max-w-[700px] items-center justify-between gap-4">
                        <button
                          type="button"
                          onClick={() => navigate(idx - 1)}
                          disabled={idx === 0}
                          className="flex items-center gap-2 rounded-xl border border-border bg-[var(--cream)] px-5 py-3 text-sm font-medium text-[var(--navy-soft)] transition-all hover:border-[var(--gold)]/40 hover:shadow-sm hover:text-[var(--navy)] disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </button>

                        <span className="text-sm font-medium tabular-nums text-[var(--navy-muted)]">
                          {idx + 1}{" "}
                          <span className="text-[var(--navy-muted)]/50">/</span>{" "}
                          {total}
                        </span>

                        <button
                          type="button"
                          onClick={() => navigate(idx + 1)}
                          disabled={idx === total - 1}
                          className="flex items-center gap-2 rounded-xl border border-border bg-[var(--cream)] px-5 py-3 text-sm font-medium text-[var(--navy-soft)] transition-all hover:border-[var(--gold)]/40 hover:shadow-sm hover:text-[var(--navy)] disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          Next
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-4 h-1 w-full max-w-[700px] overflow-hidden rounded-full bg-border/50">
                        <div
                          className="h-full rounded-full bg-[var(--gold)] transition-all duration-300"
                          style={{ width: `${((idx + 1) / total) * 100}%` }}
                        />
                      </div>
                    </>
                  )}
                </>
              )}

              {/* ── LIST VIEW ── */}
              {viewMode === "list" && (
                <>
                  {sections.length === 0 ? (
                    <div className="rounded-2xl border-2 border-dashed border-border bg-[var(--cream)] py-20 text-center">
                      <p className="text-base font-medium text-[var(--navy-muted)]">
                        Content for this module is being prepared.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-16">
                      {sections.map((section, si) => (
                        <section
                          key={section.id}
                          id={`section-${section.id}`}
                          className="scroll-mt-24"
                        >
                          <div className="mb-7 flex items-center gap-3">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--gold)] text-xs font-bold text-[var(--navy)]">
                              {si + 1}
                            </span>
                            <h2 className="font-display text-xl font-semibold text-[var(--navy)] sm:text-2xl">
                              {section.title}
                            </h2>
                          </div>

                          {section.blocks.length === 0 ? (
                            <p className="text-sm text-[var(--navy-muted)]">No content yet.</p>
                          ) : (
                            <div className="space-y-5">
                              {section.blocks.map((block) => (
                                <ListBlockCard key={block.id} block={block} />
                              ))}
                            </div>
                          )}
                        </section>
                      ))}
                    </div>
                  )}
                </>
              )}
            </main>

            {/* ── RIGHT: sticky sidebar (desktop only) — unchanged ── */}
            <aside className="hidden lg:block">
              <div className="sticky top-[72px] py-10">
                <div className="rounded-2xl border border-border bg-[var(--cream)] p-5">
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--navy-muted)]">
                    {level.title}
                  </p>
                  <p className="mb-5 font-display text-sm font-semibold leading-snug text-[var(--navy)]">
                    {module.title}
                  </p>

                  <div className="mb-4 h-px bg-border/60" />

                  {sections.length === 0 ? (
                    <p className="text-xs text-[var(--navy-muted)]">No sections.</p>
                  ) : (
                    <ul className="space-y-0.5">
                      {sections.map((s, i) => (
                        <SidebarSection
                          key={s.id}
                          section={s}
                          index={i}
                          isActive={s.id === activeId}
                          onNavigate={handleSidebarNavigate}
                        />
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </>
  );
}
