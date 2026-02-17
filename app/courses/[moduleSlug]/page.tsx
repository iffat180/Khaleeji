import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LessonRow } from "@/components/course/LessonRow";
import { Lock } from "lucide-react";
import type { Lesson, UserProgress } from "@/types";

async function getModule(slug: string) {
  const supabase = await createClient();
  const { data: module } = await supabase
    .from("modules")
    .select("*")
    .eq("slug", slug)
    .single();

  return module;
}

async function getLessonsWithProgress(moduleId: string, userId: string, userTier: string) {
  const supabase = await createClient();
  
  const { data: lessons } = await supabase
    .from("lessons")
    .select("*")
    .eq("module_id", moduleId)
    .order("order");

  if (!lessons) return [];

  const { data: progress } = await supabase
    .from("user_progress")
    .select("lesson_id")
    .eq("user_id", userId);

  const completedLessonIds = new Set(progress?.map((p) => p.lesson_id) || []);

  return lessons.map((lesson) => ({
    ...lesson,
    completed: completedLessonIds.has(lesson.id),
    can_access: !lesson.is_premium || userTier !== "free",
  }));
}

export default async function CourseModulePage({
  params,
}: {
  params: { moduleSlug: string };
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const userTier = profile?.tier || "free";

  const courseModule = await getModule(params.moduleSlug);
  if (!courseModule) {
    redirect("/dashboard");
  }

  // Check if user can access this module
  if (courseModule.is_premium && userTier === "free") {
    redirect("/pricing");
  }

  const lessons = await getLessonsWithProgress(courseModule.id, user.id, userTier);

  const completedCount = lessons.filter((l) => l.completed).length;
  const totalCount = lessons.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Link href="/dashboard" className="text-muted-foreground hover:text-foreground mb-4 inline-block">
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold">{courseModule.title}</h1>
        {courseModule.description && (
          <p className="text-muted-foreground mt-2">{courseModule.description}</p>
        )}
      </div>

      {/* Progress Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Module Progress</CardTitle>
          <CardDescription>
            {completedCount} of {totalCount} lessons completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-secondary rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Lessons List */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold mb-4">Lessons</h2>
        {lessons.map((lesson, index) => (
          <LessonRow key={lesson.id} lesson={lesson} index={index + 1} total={lessons.length} />
        ))}
      </div>
    </div>
  );
}
