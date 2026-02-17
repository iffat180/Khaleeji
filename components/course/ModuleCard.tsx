import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Lock } from "lucide-react";
import type { Module } from "@/types";

interface ModuleCardProps {
  module: Module & {
    completed_count: number;
    total_count: number;
    progress_percent: number;
    can_access: boolean;
  };
}

export function ModuleCard({ module }: ModuleCardProps) {
  return (
    <Link href={module.can_access ? `/courses/${module.slug}` : "/pricing"}>
      <Card
        className={`group relative h-full bg-[var(--cream)] border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all rounded-[var(--radius-lg)] ${
          !module.can_access ? "opacity-80" : ""
        }`}
      >
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="flex items-center gap-3 text-2xl text-foreground">
                {module.title}
                {module.is_premium && (
                  <span className="inline-flex items-center rounded-full bg-[var(--gold-light)] px-3 py-1 text-xs font-semibold text-[var(--navy)]">
                    Premium
                  </span>
                )}
              </CardTitle>
              {module.description && (
                <CardDescription className="mt-2 text-sm text-muted-foreground">
                  {module.description}
                </CardDescription>
              )}
            </div>
            {!module.can_access && (
              <Lock className="h-5 w-5 text-[var(--warning)] flex-shrink-0" />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {module.completed_count} of {module.total_count} lessons
              </span>
              <span className="font-semibold text-foreground">
                {Math.round(module.progress_percent)}%
              </span>
            </div>
            <Progress value={module.progress_percent} />
            <p className="mt-1 text-sm text-muted-foreground">
              Approx. {Math.max(module.total_count * 5, 10)} min total
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

