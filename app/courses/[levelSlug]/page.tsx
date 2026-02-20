import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { LevelWorkspace } from "@/components/course/LevelWorkspace";
import type { FlatLesson } from "@/components/course/LevelWorkspace";

async function getLevelWorkspaceData(slug: string) {
  const supabase = await createClient();

  const { data: level } = await supabase
    .from("levels")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!level) return null;

  const { data: modules } = await supabase
    .from("modules")
    .select("id, title, slug, order")
    .eq("level_id", level.id)
    .order("order", { ascending: true });

  if (!modules?.length) {
    return { level, flatLessons: [] };
  }

  const { data: lessons } = await supabase
    .from("lessons")
    .select("id, module_id, title, slug, type, order")
    .in("module_id", modules.map((m) => m.id))
    .order("order", { ascending: true });

  if (!lessons?.length) {
    return { level, flatLessons: [] };
  }

  const { data: phrases } = await supabase
    .from("phrases")
    .select("lesson_id, arabic_text, transliteration, english_meaning, order")
    .in("lesson_id", lessons.map((l) => l.id))
    .order("order", { ascending: true });

  const { data: questions } = await supabase
    .from("quiz_questions")
    .select("lesson_id, question, correct_answer, order")
    .in("lesson_id", lessons.map((l) => l.id))
    .order("order", { ascending: true });

  const phrasesByLesson = new Map<string, { arabic_text: string; transliteration: string; english_meaning: string }[]>();
  (phrases ?? []).forEach((p) => {
    if (!phrasesByLesson.has(p.lesson_id)) phrasesByLesson.set(p.lesson_id, []);
    phrasesByLesson.get(p.lesson_id)!.push({
      arabic_text: p.arabic_text,
      transliteration: p.transliteration,
      english_meaning: p.english_meaning,
    });
  });

  const questionsByLesson = new Map<string, { question: string; correct_answer: string }[]>();
  (questions ?? []).forEach((q) => {
    if (!questionsByLesson.has(q.lesson_id)) questionsByLesson.set(q.lesson_id, []);
    questionsByLesson.get(q.lesson_id)!.push({
      question: q.question,
      correct_answer: q.correct_answer,
    });
  });

  const moduleMap = new Map(modules.map((m) => [m.id, m]));
  const lessonsByModule = new Map<string, typeof lessons>();
  lessons.forEach((l) => {
    if (!lessonsByModule.has(l.module_id)) lessonsByModule.set(l.module_id, []);
    lessonsByModule.get(l.module_id)!.push(l);
  });

  const flatLessons: FlatLesson[] = [];
  for (const module of modules) {
    const moduleLessons = lessonsByModule.get(module.id) ?? [];
    moduleLessons.sort((a, b) => a.order - b.order);
    for (const lesson of moduleLessons) {
      flatLessons.push({
        lesson: {
          id: lesson.id,
          title: lesson.title,
          slug: lesson.slug,
          type: lesson.type,
          order: lesson.order,
        },
        module: { id: module.id, title: module.title, slug: module.slug },
        phrases: phrasesByLesson.get(lesson.id) ?? [],
        questions: lesson.type === "quiz" ? questionsByLesson.get(lesson.id) : undefined,
      });
    }
  }

  return { level, flatLessons };
}

export default async function LevelPage({
  params,
}: {
  params: Promise<{ levelSlug: string }>;
}) {
  const { levelSlug } = await params;
  const data = await getLevelWorkspaceData(levelSlug);

  if (!data) notFound();

  return <LevelWorkspace level={data.level} flatLessons={data.flatLessons} />;
}
