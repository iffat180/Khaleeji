import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Layers, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { ModuleAccordion } from "@/components/course/ModuleAccordion";
import type { Module } from "@/components/course/ModuleAccordion";

// ─── Curriculum helpers ───────────────────────────────────────────────────────

function getStageLabel(order: number): string {
  if (order <= 2) return "Stage 1 · Foundations";
  if (order <= 5) return "Stage 2 · Survival";
  if (order <= 8) return "Stage 3 · Daily Life";
  if (order <= 10) return "Stage 4 · Social Communication";
  if (order <= 13) return "Stage 5 · Professional Fluency";
  return "Stage 6 · Advanced Expression";
}

function getBand(order: number): string {
  if (order <= 5) return "Beginner";
  if (order <= 10) return "Intermediate";
  return "Advanced";
}

// ─── Data fetching ────────────────────────────────────────────────────────────

async function getLevelData(slug: string) {
  const supabase = await createClient();

  const { data: level } = await supabase
    .from("levels")
    .select("id, title, slug, description, order")
    .eq("slug", slug)
    .single();

  if (!level) return null;

  const { data: rawModules } = await supabase
    .from("modules")
    .select("id, title, slug, order")
    .eq("level_id", level.id)
    .order("order");

  const mods = rawModules ?? [];

  if (!mods.length) {
    return { level, modules: [] as Module[], lessonCount: 0, firstModuleSlug: null };
  }

  const { data: rawSections } = await supabase
    .from("sections")
    .select("id, module_id, title, order_number")
    .in("module_id", mods.map((m) => m.id))
    .order("order_number");

  const sections = rawSections ?? [];

  // Group sections by module
  const sectionsByModule = new Map<string, { title: string }[]>();
  sections.forEach((s) => {
    if (!sectionsByModule.has(s.module_id)) sectionsByModule.set(s.module_id, []);
    sectionsByModule.get(s.module_id)!.push({ title: s.title });
  });

  // Build accordion-ready modules — sections become the lesson list items
  const accordionModules: Module[] = mods.map((m, mi) => ({
    number: mi + 1,
    slug: m.slug,
    title: m.title,
    lessons: (sectionsByModule.get(m.id) ?? []).map((s, si) => ({
      id: `${mi + 1}.${si + 1}`,
      title: s.title,
    })),
  }));

  return {
    level,
    modules: accordionModules,
    lessonCount: sections.length,
    firstModuleSlug: mods[0]?.slug ?? null,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function LevelPage({
  params,
}: {
  params: Promise<{ levelSlug: string }>;
}) {
  const { levelSlug } = await params;
  const data = await getLevelData(levelSlug);

  if (!data) notFound();

  const { level, modules, lessonCount, firstModuleSlug } = data;
  const stageLabel  = getStageLabel(level.order ?? 1);
  const band        = getBand(level.order ?? 1);
  const startHref   = firstModuleSlug
    ? `/courses/${levelSlug}/${firstModuleSlug}`
    : `/courses/${levelSlug}`;

  return (
    <div className="min-h-screen bg-[var(--sand)]">

      {/* ─── HERO ─── */}
      <section className="border-b border-border bg-[var(--cream)]">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--navy-muted)] hover:text-[var(--navy)] transition-colors"
          >
            ← Back to Guided Path
          </Link>

          <div className="mt-6 max-w-3xl">
            {/* Stage eyebrow */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[var(--sand)] px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--gold-dark)]">
                {stageLabel}
              </span>
            </div>

            <h1 className="font-display text-3xl font-bold leading-tight text-[var(--navy)] sm:text-4xl lg:text-5xl">
              {level.title}
            </h1>

            {level.description && (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--navy-soft)] sm:text-lg">
                {level.description}
              </p>
            )}

            {/* Metadata */}
            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-[var(--navy-muted)]">
              <span className="flex items-center gap-1.5">
                <Layers className="h-4 w-4" />
                {modules.length} Module{modules.length !== 1 ? "s" : ""}
              </span>
              {lessonCount > 0 && (
                <>
                  <span className="h-1 w-1 rounded-full bg-[var(--navy-muted)]/40" />
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4" />
                    {lessonCount}+ Lessons
                  </span>
                </>
              )}
              <span className="h-1 w-1 rounded-full bg-[var(--navy-muted)]/40" />
              <span className="flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4" />
                {band}
              </span>
            </div>

            <div className="mt-8">
              <Button asChild size="lg" className="px-8 py-6 text-base">
                <Link href={startHref}>Start {level.title}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MODULE BREAKDOWN ─── */}
      <section className="border-t border-border bg-[var(--cream)] py-14 sm:py-18 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold text-[var(--navy)] sm:text-3xl">
              Module Breakdown
            </h2>
            <p className="mt-2 text-sm text-[var(--navy-muted)]">
              {modules.length} module{modules.length !== 1 ? "s" : ""} · click any module to see its lessons
            </p>
          </div>

          {modules.length > 0 ? (
            <ModuleAccordion modules={modules} levelSlug={levelSlug} />
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-border bg-[var(--sand)] py-16 text-center">
              <p className="text-sm text-[var(--navy-muted)]">
                Modules for this level are being prepared.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <h2 className="font-display text-2xl font-bold text-[var(--navy)] sm:text-3xl">
          How This Level Works
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--navy-soft)] sm:text-base">
          Each module contains structured lessons. Lessons are short, focused, and progress in difficulty.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-[var(--cream)] p-6 sm:p-8">
          <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-[var(--navy-muted)]">
            Each lesson includes
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {["Spoken phrase", "Arabizi version", "English meaning", "Cultural context", "Audio practice", "Quick knowledge check"].map((item) => (
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

      {/* ─── FINAL CTA ─── */}
      <section className="border-t border-border bg-[var(--cream)] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-bold text-[var(--navy)] sm:text-3xl">
            Ready to Start {level.title}?
          </h2>
          <p className="mt-3 text-sm text-[var(--navy-muted)] sm:text-base">
            {modules.length} modules · {lessonCount > 0 ? `${lessonCount}+ lessons` : "self-paced"} · self-paced
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="px-10 py-6 text-base">
              <Link href={startHref}>Begin {level.title}</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
