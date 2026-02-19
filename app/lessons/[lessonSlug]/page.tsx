import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { PhraseCard } from "@/components/lesson/PhraseCard";
import { QuizBlock } from "@/components/lesson/QuizBlock";
import { Button } from "@/components/ui/button";

async function getLessonBySlug(slug: string) {
  const supabase = await createClient();
  const { data: lesson } = await supabase
    .from("lessons")
    .select("id, module_id, title, slug, type, order")
    .eq("slug", slug)
    .single();

  if (!lesson) return null;

  const { data: module } = await supabase
    .from("modules")
    .select("id, title, slug")
    .eq("id", lesson.module_id)
    .single();

  const { data: moduleLessons } = await supabase
    .from("lessons")
    .select("slug, title, order")
    .eq("module_id", lesson.module_id)
    .order("order", { ascending: true });

  const lessons = moduleLessons ?? [];
  const currentIndex = lessons.findIndex((l) => l.slug === lesson.slug);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex >= 0 && currentIndex < lessons.length - 1
      ? lessons[currentIndex + 1]
      : null;

  if (lesson.type === "phrase_card") {
    const { data: phrases } = await supabase
      .from("phrases")
      .select("*")
      .eq("lesson_id", lesson.id)
      .order("order", { ascending: true });
    return { lesson, module, phrases: phrases ?? [], prevLesson, nextLesson };
  }

  if (lesson.type === "quiz") {
    const { data: questions } = await supabase
      .from("quiz_questions")
      .select("*")
      .eq("lesson_id", lesson.id)
      .order("order", { ascending: true });
    return { lesson, module, questions: questions ?? [], prevLesson, nextLesson };
  }

  return {
    lesson,
    module,
    phrases: [] as any[],
    questions: [] as any[],
    prevLesson,
    nextLesson,
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonSlug: string }>;
}) {
  const { lessonSlug } = await params;
  const data = await getLessonBySlug(lessonSlug);

  if (!data) notFound();

  const { lesson, module } = data;

  return (
    <div className="min-h-screen bg-[var(--sand)]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href={module ? `/courses/${module.slug}` : "/courses"}
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          ← Back to {module?.title ?? "courses"}
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-[var(--navy)]">
          {lesson.title}
        </h1>

        {lesson.type === "phrase_card" && data.phrases.length > 0 && (
          <div className="mt-8 space-y-4">
              {data.phrases.map((phrase, index) => (
                <div key={phrase.id}>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Phrase {index + 1} of {data.phrases.length}
                  </p>
                  <PhraseCard phrase={phrase} />
                </div>
              ))}
            </div>
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
            <Link href={`/lessons/${data.prevLesson.slug}`}>
              <Button variant="outline">← Previous lesson</Button>
            </Link>
          ) : (
            <span />
          )}
          {data.nextLesson ? (
            <Link href={`/lessons/${data.nextLesson.slug}`}>
              <Button>Next lesson →</Button>
            </Link>
          ) : (
            <Link href={module ? `/courses/${module.slug}` : "/courses"}>
              <Button variant="outline">Back to module</Button>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
