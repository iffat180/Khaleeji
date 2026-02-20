import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { PhraseViewer } from "@/components/lesson/PhraseViewer";
import { QuizBlock } from "@/components/lesson/QuizBlock";
import { Button } from "@/components/ui/button";

async function getLessonBySlugModuleAndLevel(
  lessonSlug: string,
  moduleSlug: string,
  levelSlug: string
) {
  const supabase = await createClient();

  const { data: level } = await supabase
    .from("levels")
    .select("id, title, slug")
    .eq("slug", levelSlug)
    .single();

  if (!level) return null;

  const { data: module } = await supabase
    .from("modules")
    .select("id, title, slug, level_id")
    .eq("slug", moduleSlug)
    .eq("level_id", level.id)
    .single();

  if (!module) return null;
  if (module.level_id !== level.id) return null;

  const { data: lesson } = await supabase
    .from("lessons")
    .select("id, module_id, title, slug, type, order")
    .eq("slug", lessonSlug)
    .eq("module_id", module.id)
    .single();

  if (!lesson) return null;
  if (lesson.module_id !== module.id) return null;

  const { data: moduleLessons } = await supabase
    .from("lessons")
    .select("slug, title, order")
    .eq("module_id", module.id)
    .order("order", { ascending: true });

  const lessons = moduleLessons ?? [];
  const currentIndex = lessons.findIndex((l) => l.slug === lesson.slug);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex >= 0 && currentIndex < lessons.length - 1
      ? lessons[currentIndex + 1]
      : null;

  const lessonPath = `/courses/${level.slug}/${module.slug}`;

  const { data: phrases } = await supabase
    .from("phrases")
    .select("*")
    .eq("lesson_id", lesson.id)
    .order("order", { ascending: true });

  const { data: questions } = await supabase
    .from("quiz_questions")
    .select("*")
    .eq("lesson_id", lesson.id)
    .order("order", { ascending: true });

  return {
    lesson,
    module,
    level,
    phrases: phrases ?? [],
    questions: questions ?? [],
    prevLesson,
    nextLesson,
    lessonPath,
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ levelSlug: string; moduleSlug: string; lessonSlug: string }>;
}) {
  const { levelSlug, moduleSlug, lessonSlug } = await params;
  const data = await getLessonBySlugModuleAndLevel(lessonSlug, moduleSlug, levelSlug);

  if (!data) notFound();

  const { lesson, module, level, lessonPath } = data;

  return (
    <div className="min-h-screen bg-[var(--sand)]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href={lessonPath}
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          ← Back to {module.title}
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-[var(--navy)]">
          {lesson.title}
        </h1>

        {lesson.type === "phrase_card" && data.phrases.length > 0 && (
          <PhraseViewer phrases={data.phrases} />
        )}

        {lesson.type === "quiz" && data.questions.length > 0 && (
          <div className="mt-8">
            <QuizBlock
              questions={data.questions}
              onComplete={() => {}}
            />
          </div>
        )}

        {((lesson.type === "phrase_card" && data.phrases.length === 0) ||
          (lesson.type === "quiz" && data.questions.length === 0)) && (
          <p className="mt-8 text-muted-foreground">No content yet.</p>
        )}

        <nav className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
          {data.prevLesson ? (
            <Link href={`${lessonPath}/${data.prevLesson.slug}`}>
              <Button variant="outline">← Previous lesson</Button>
            </Link>
          ) : (
            <span />
          )}
          {data.nextLesson ? (
            <Link href={`${lessonPath}/${data.nextLesson.slug}`}>
              <Button>Next lesson →</Button>
            </Link>
          ) : (
            <Link href={lessonPath}>
              <Button variant="outline">Back to module</Button>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
