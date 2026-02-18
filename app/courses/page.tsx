import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ModuleCard } from "@/components/course/ModuleCard";
import { BookOpen } from "lucide-react";

const LEVEL_CONFIG = [
  {
    level: 0,
    badge: "START HERE",
    badgeClass: "bg-[var(--success)] text-white",
    borderClass: "border-[var(--success)]/30",
    description: "Essential basics to get started. Learn Arabizi and build simple sentences.",
  },
  {
    level: 1,
    badge: "FREE",
    badgeClass: "bg-[var(--gold)] text-[var(--navy)]",
    borderClass: "border-[var(--gold)]/30",
    description: "The most useful phrases for daily life. Navigate the Emirates with confidence.",
  },
  {
    level: 2,
    badge: "PREMIUM",
    badgeClass: "bg-[var(--navy)] text-white",
    borderClass: "border-[var(--navy)]/20",
    description: "Talk about home, food, plans, and emotions like a local.",
  },
  {
    level: 3,
    badge: "PREMIUM",
    badgeClass: "bg-[var(--navy)] text-white",
    borderClass: "border-[var(--navy)]/20",
    description: "Sound warm and natural. Family, compliments, and endearment.",
  },
];

async function getAllModulesWithProgress(userId: string, userTier: string) {
  const supabase = await createClient();

  const { data: modules } = await supabase
    .from("modules")
    .select("*")
    .order("order");

  if (!modules) return [];

  const { data: lessons } = await supabase
    .from("lessons")
    .select("id, module_id")
    .order("order");

  const { data: progress } = await supabase
    .from("user_progress")
    .select("lesson_id")
    .eq("user_id", userId);

  const completedIds = new Set(progress?.map((p) => p.lesson_id) || []);

  return modules.map((mod) => {
    const modLessons = lessons?.filter((l) => l.module_id === mod.id) || [];
    const completedCount = modLessons.filter((l) => completedIds.has(l.id)).length;
    const totalCount = modLessons.length;

    return {
      ...mod,
      lessons: modLessons,
      completed_count: completedCount,
      total_count: totalCount,
      progress_percent: totalCount > 0 ? (completedCount / totalCount) * 100 : 0,
      can_access: !mod.is_premium || userTier !== "free",
    };
  });
}

export default async function AllCoursesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("tier")
    .eq("id", user.id)
    .single();

  const userTier = profile?.tier || "free";
  const allModules = await getAllModulesWithProgress(user.id, userTier);

  // Group modules by level
  const levels = LEVEL_CONFIG.map((config) => ({
    ...config,
    title: allModules.find((m) => m.level === config.level)?.level_title || "",
    modules: allModules.filter((m) => m.level === config.level),
  })).filter((l) => l.modules.length > 0);

  return (
    <div className="min-h-screen bg-[var(--sand)]">
      {/* Page Header */}
      <div className="bg-[var(--navy)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-6 w-6 text-[var(--gold)]" />
            <span className="text-[var(--gold)] text-sm font-semibold uppercase tracking-widest">
              Course Library
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Your Emirati Arabic Journey
          </h1>
          <p className="text-lg text-white/60 max-w-xl">
            Learn at your own pace. Start from zero and work your way to sounding like a local.
          </p>
        </div>
      </div>

      {/* Levels */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {levels.map((level) => (
          <section key={level.level}>
            {/* Level heading */}
            <div className={`mb-8 border-l-4 pl-5 ${level.borderClass}`}>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-[var(--navy)]">
                  Level {level.level}: {level.title}
                </h2>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${level.badgeClass}`}
                >
                  {level.badge}
                </span>
              </div>
              <p className="text-[var(--navy-muted)] text-base max-w-2xl">
                {level.description}
              </p>
            </div>

            {/* Modules grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {level.modules.map((mod) => (
                <ModuleCard key={mod.id} module={mod} />
              ))}
            </div>

            {/* Upgrade CTA for premium levels */}
            {level.badge === "PREMIUM" && userTier === "free" && (
              <div className="mt-8 rounded-[var(--radius-lg)] border border-[var(--gold)]/30 bg-gradient-to-r from-[var(--cream)] to-[var(--sand-dark)] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-[var(--navy)]">
                    Unlock Level {level.level}: {level.title}
                  </p>
                  <p className="text-sm text-[var(--navy-muted)] mt-1">
                    Upgrade to Pro to access all {level.modules.length} modules in this level.
                  </p>
                </div>
                <Link
                  href="/pricing"
                  className="inline-flex shrink-0 items-center rounded-[var(--radius-md)] bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)] px-5 py-2.5 text-sm font-semibold text-[var(--navy)] shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Unlock with Pro →
                </Link>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
