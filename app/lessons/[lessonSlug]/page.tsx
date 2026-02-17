import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { PhraseCard } from "@/components/lesson/PhraseCard";
import { QuizBlock } from "@/components/lesson/QuizBlock";
import { AudioPlayer } from "@/components/lesson/AudioPlayer";
import { LessonProgress } from "@/components/lesson/LessonProgress";
import { MarkCompleteButton } from "@/components/lesson/MarkCompleteButton";
import type { Lesson, Phrase, QuizQuestion } from "@/types";

async function getLesson(slug: string) {
  const supabase = await createClient();
  const { data: lesson } = await supabase
    .from("lessons")
    .select("*, modules(id, slug, title)")
    .eq("slug", slug)
    .single();

  return lesson;
}

async function getPhrases(lessonId: string) {
  const supabase = await createClient();
  const { data: phrases } = await supabase
    .from("phrases")
    .select("*")
    .eq("lesson_id", lessonId)
    .order("order");

  return phrases || [];
}

async function getQuizQuestions(lessonId: string) {
  const supabase = await createClient();
  const { data: questions } = await supabase
    .from("quiz_questions")
    .select("*")
    .eq("lesson_id", lessonId)
    .order("order");

  return questions || [];
}

async function getLessonNavigation(moduleId: string, currentOrder: number) {
  const supabase = await createClient();
  
  const { data: allLessons } = await supabase
    .from("lessons")
    .select("slug, order")
    .eq("module_id", moduleId)
    .order("order");

  if (!allLessons) return { prev: null, next: null };

  const currentIndex = allLessons.findIndex((l) => l.order === currentOrder);
  const prev = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const next = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return { prev, next };
}

async function checkLessonCompleted(userId: string, lessonId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("user_progress")
    .select("id")
    .eq("user_id", userId)
    .eq("lesson_id", lessonId)
    .single();

  return !!data;
}

export default async function LessonPage({
  params,
}: {
  params: { lessonSlug: string };
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

  const lesson = await getLesson(params.lessonSlug);
  if (!lesson) {
    redirect("/dashboard");
  }

  // Check if user can access this lesson
  if (lesson.is_premium && userTier === "free") {
    redirect("/pricing");
  }

  const courseModule = lesson.modules as { id: string; slug: string; title: string };
  const { prev, next } = await getLessonNavigation(courseModule.id, lesson.order);
  const isCompleted = await checkLessonCompleted(user.id, lesson.id);

  let content: React.ReactNode = null;

  if (lesson.type === "phrase_card") {
    const phrases = await getPhrases(lesson.id);
    content = (
      <div className="space-y-6">
        {phrases.map((phrase) => (
          <PhraseCard key={phrase.id} phrase={phrase} />
        ))}
      </div>
    );
  } else if (lesson.type === "quiz") {
    const questions = await getQuizQuestions(lesson.id);
    content = (
      <QuizBlock
        questions={questions}
        onComplete={async (score, total) => {
          "use server";
          // This will be handled client-side
        }}
      />
    );
  } else if (lesson.type === "audio") {
    content = <AudioPlayer audioUrl={null} title={lesson.title} />;
  }

  // Get total lessons in module for progress
  const { data: moduleLessons } = await supabase
    .from("lessons")
    .select("id")
    .eq("module_id", courseModule.id);

  const totalLessons = moduleLessons?.length || 0;

  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-6">
        <Link
          href={`/courses/${courseModule.slug}`}
          className="text-muted-foreground hover:text-foreground mb-4 inline-block"
        >
          ← Back to {courseModule.title}
        </Link>
        <h1 className="text-3xl font-bold">{lesson.title}</h1>
      </div>

      <LessonProgress current={lesson.order} total={totalLessons} />

      <div className="my-8">{content}</div>

      <div className="flex items-center justify-between mt-8 pt-8 border-t">
        <MarkCompleteButton lessonId={lesson.id} isCompleted={isCompleted} />
        <div className="flex gap-4">
          {prev && (
            <Link href={`/lessons/${prev.slug}`}>
              <Button variant="outline">Previous Lesson</Button>
            </Link>
          )}
          {next && (
            <Link href={`/lessons/${next.slug}`}>
              <Button>Next Lesson</Button>
            </Link>
          )}
          {!next && (
            <Link href={`/courses/${courseModule.slug}`}>
              <Button variant="outline">Back to Module</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
