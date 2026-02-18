import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ModuleCard } from "@/components/course/ModuleCard";
import { Lock } from "lucide-react";
import type { Module, Lesson, UserProgress, Profile } from "@/types";

async function getModulesWithProgress(userId: string, userTier: string) {
  const supabase = await createClient();
  
  // Get all modules
  const { data: modules } = await supabase
    .from("modules")
    .select("*")
    .order("order");

  if (!modules) return [];

  // Get all lessons
  const { data: lessons } = await supabase
    .from("lessons")
    .select("*")
    .order("order");

  if (!lessons) return [];

  // Get user progress
  const { data: progress } = await supabase
    .from("user_progress")
    .select("lesson_id")
    .eq("user_id", userId);

  const completedLessonIds = new Set(progress?.map((p) => p.lesson_id) || []);

  // Calculate progress for each module
  return modules.map((module) => {
    const moduleLessons = lessons.filter((l) => l.module_id === module.id);
    const completedCount = moduleLessons.filter((l) =>
      completedLessonIds.has(l.id)
    ).length;
    const totalCount = moduleLessons.length;
    const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    // Check if user can access this module
    const canAccess = !module.is_premium || userTier !== "free";

    return {
      ...module,
      lessons: moduleLessons,
      completed_count: completedCount,
      total_count: totalCount,
      progress_percent: progressPercent,
      can_access: canAccess,
    };
  });
}

async function getLastVisitedLesson(userId: string) {
  const supabase = await createClient();
  
  const { data: progress } = await supabase
    .from("user_progress")
    .select("lesson_id, completed_at")
    .eq("user_id", userId)
    .order("completed_at", { ascending: false })
    .limit(1)
    .single();

  if (!progress) return null;

  const { data: lesson } = await supabase
    .from("lessons")
    .select("*, modules(slug, title)")
    .eq("id", progress.lesson_id)
    .single();

  return lesson;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const userTier = profile?.tier || "free";

  // Get modules with progress
  const modulesWithProgress = await getModulesWithProgress(user.id, userTier);

  // Calculate overall progress
  const totalLessons = modulesWithProgress.reduce((sum, m) => sum + m.total_count, 0);
  const completedLessons = modulesWithProgress.reduce((sum, m) => sum + m.completed_count, 0);
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  // Get last visited lesson
  const lastLesson = await getLastVisitedLesson(user.id);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome back{profile?.full_name ? `, ${profile.full_name}` : ""}
        </h1>
        <p className="text-muted-foreground mt-2">
          Continue your journey learning Gulf Arabic
        </p>
      </div>

      {/* Overall Progress */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
          <CardDescription>
            {completedLessons} of {totalLessons} lessons completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={overallProgress} className="h-3" />
        </CardContent>
      </Card>

      {/* Continue Where You Left Off */}
      {lastLesson && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Continue where you left off</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{lastLesson.title}</p>
                <p className="text-sm text-muted-foreground">
                  {lastLesson.modules?.title}
                </p>
              </div>
              <Link href={`/lessons/${lastLesson.slug}`}>
                <Button>Continue</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Start Here CTA for new users */}
      {completedLessons === 0 && (
        <div className="mb-8 rounded-[var(--radius-lg)] bg-[var(--navy)] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--gold)] mb-2">
              New here?
            </p>
            <h3 className="text-xl font-bold text-white">Start with Level 0: Foundations</h3>
            <p className="text-white/60 text-sm mt-1">
              Learn Arabizi and basic sentence building — free forever.
            </p>
          </div>
          <Link
            href="/courses/arabizi-pronunciation"
            className="inline-flex shrink-0 items-center rounded-[var(--radius-md)] bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)] px-5 py-2.5 text-sm font-semibold text-[var(--navy)] shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Start Level 0 →
          </Link>
        </div>
      )}

      {/* Modules Grid */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Continue Learning</h2>
          <Link
            href="/courses"
            className="text-sm font-medium text-[var(--gold)] hover:text-[var(--gold-dark)] transition-colors"
          >
            View all courses →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modulesWithProgress.slice(0, 6).map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>
    </div>
  );
}
