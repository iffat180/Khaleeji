import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Module } from "@/types";

interface ModuleCardProps {
  module: Module & { total_count: number };
  levelSlug?: string;
}

function truncate(str: string | null, max: number): string {
  if (!str) return "";
  if (str.length <= max) return str;
  return str.slice(0, max).trim() + "…";
}

export function ModuleCard({ module, levelSlug }: ModuleCardProps) {
  const description = truncate(module.description, 100);
  const href = levelSlug ? `/courses/${levelSlug}/${module.slug}` : `/courses/${module.slug}`;

  return (
    <div className="group flex h-full flex-col rounded-[12px] border border-border bg-[var(--cream)] p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <h3 className="text-xl font-semibold text-foreground">{module.title}</h3>
      {description && (
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
      )}
      <p className="mt-3 text-sm text-muted-foreground">
        {module.total_count} lesson{module.total_count !== 1 ? "s" : ""}
      </p>
      <div className="mt-auto pt-4">
        <Link href={href}>
          <Button className="w-full sm:w-auto">Start Learning</Button>
        </Link>
      </div>
    </div>
  );
}
