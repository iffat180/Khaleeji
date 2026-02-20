import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  ModuleWorkspace,
  type SectionWithBlocks,
  type ContentBlock,
} from "@/components/course/ModuleWorkspace";

// ─── Data fetching ────────────────────────────────────────────────────────────

async function getModulePageData(levelSlug: string, moduleSlug: string) {
  const supabase = await createClient();

  // Level
  const { data: level } = await supabase
    .from("levels")
    .select("id, title, slug")
    .eq("slug", levelSlug)
    .single();

  if (!level) return null;

  // Module (scoped to this level)
  const { data: module } = await supabase
    .from("modules")
    .select("id, title, slug, description")
    .eq("slug", moduleSlug)
    .eq("level_id", level.id)
    .single();

  if (!module) return null;

  // Sections for this module
  const { data: rawSections } = await supabase
    .from("sections")
    .select("id, module_id, title, order_number")
    .eq("module_id", module.id)
    .order("order_number");

  const sections = rawSections ?? [];

  if (sections.length === 0) {
    return { level, module, sections: [] as SectionWithBlocks[] };
  }

  // All content_blocks for these sections in one query
  const sectionIds = sections.map((s) => s.id);
  const { data: rawBlocks } = await supabase
    .from("content_blocks")
    .select("*")
    .in("section_id", sectionIds)
    .order("order_number");

  const blocks = (rawBlocks ?? []) as ContentBlock[];

  // Group blocks by section_id
  const blocksBySectionId = new Map<string, ContentBlock[]>();
  for (const block of blocks) {
    const arr = blocksBySectionId.get(block.section_id) ?? [];
    arr.push(block);
    blocksBySectionId.set(block.section_id, arr);
  }

  const sectionsWithBlocks: SectionWithBlocks[] = sections.map((s) => ({
    id: s.id,
    title: s.title,
    order_number: s.order_number,
    blocks: blocksBySectionId.get(s.id) ?? [],
  }));

  return { level, module, sections: sectionsWithBlocks };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ModulePage({
  params,
}: {
  params: Promise<{ levelSlug: string; moduleSlug: string }>;
}) {
  const { levelSlug, moduleSlug } = await params;
  const data = await getModulePageData(levelSlug, moduleSlug);

  if (!data) notFound();

  return (
    <ModuleWorkspace
      level={data.level}
      module={data.module}
      sections={data.sections}
    />
  );
}
