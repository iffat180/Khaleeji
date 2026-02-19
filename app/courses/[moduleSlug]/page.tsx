import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";

async function getModuleBySlug(slug: string) {
  const supabase = await createClient();
  const { data: module } = await supabase
    .from("modules")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!module) return null;

  const { data: lessons } = await supabase
    .from("lessons")
    .select("id, title, slug, type, order")
    .eq("module_id", module.id)
    .order("order", { ascending: true });

  return { ...module, lessons: lessons ?? [] };
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleSlug: string }>;
}) {
  const { moduleSlug } = await params;
  const moduleData = await getModuleBySlug(moduleSlug);

  if (!moduleData) notFound();

  return (
    <div className="min-h-screen bg-[var(--sand)]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/courses"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          ← Back to courses
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-[var(--navy)]">
          {moduleData.title}
        </h1>
        {moduleData.description && (
          <p className="mt-2 text-muted-foreground">{moduleData.description}</p>
        )}

        <ul className="mt-8 border border-border rounded-[12px] bg-[var(--cream)] overflow-hidden">
          {moduleData.lessons.map((lesson, index) => (
            <li key={lesson.id} className="border-b border-border last:border-b-0">
              <Link
                href={`/lessons/${lesson.slug}`}
                className="flex items-center gap-4 px-6 py-4 hover:bg-[var(--sand-dark)] transition-colors"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--navy)] text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground">{lesson.title}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {lesson.type.replace("_", " ")}
                  </p>
                </div>
                <span className="text-muted-foreground">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
