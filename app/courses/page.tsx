import { createClient } from "@/lib/supabase/server";
import { ModuleCard } from "@/components/course/ModuleCard";

async function getAllModules() {
  const supabase = await createClient();
  const { data: modules } = await supabase
    .from("modules")
    .select("*")
    .order("order", { ascending: true });

  if (!modules) return [];

  const { data: lessons } = await supabase
    .from("lessons")
    .select("id, module_id");

  return modules.map((mod) => {
    const total_count =
      lessons?.filter((l) => l.module_id === mod.id).length ?? 0;
    return { ...mod, total_count };
  });
}

export default async function CoursesPage() {
  const modules = await getAllModules();

  return (
    <div className="min-h-screen bg-[var(--sand)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-foreground">All Courses</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Learn Gulf Arabic step by step
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => (
            <ModuleCard key={mod.id} module={mod} />
          ))}
        </div>
      </div>
    </div>
  );
}
