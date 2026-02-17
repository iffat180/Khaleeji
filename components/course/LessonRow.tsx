import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Lock, PlayCircle, FileText, Headphones } from "lucide-react";
import type { Lesson } from "@/types";

interface LessonRowProps {
  lesson: Lesson & {
    completed: boolean;
    can_access: boolean;
  };
  index: number;
  total: number;
}

const typeIcons = {
  phrase_card: FileText,
  quiz: PlayCircle,
  audio: Headphones,
};

const typeLabels = {
  phrase_card: "Phrases",
  quiz: "Quiz",
  audio: "Audio",
};

export function LessonRow({ lesson, index, total }: LessonRowProps) {
  const Icon = typeIcons[lesson.type] || FileText;
  const duration = lesson.duration_seconds
    ? `${Math.floor(lesson.duration_seconds / 60)} min`
    : null;

  if (!lesson.can_access) {
    return (
      <Card className="opacity-80 bg-[var(--cream)]">
        <CardContent className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-9 h-9 rounded-full border border-border bg-[var(--sand-dark)] flex items-center justify-center text-sm font-semibold text-muted-foreground">
                {index}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">{lesson.title}</span>
                  <span className="text-xs rounded-full bg-[var(--gold-light)] px-2 py-0.5 text-[var(--navy)]">
                    Premium
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  <span>{typeLabels[lesson.type]}</span>
                  {duration && <span>{duration}</span>}
                </div>
              </div>
            </div>
            <Lock className="h-5 w-5 text-[var(--warning)]" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Link href={`/lessons/${lesson.slug}`}>
      <Card className="bg-[var(--cream)] border-none hover:bg-[var(--sand-dark)] transition-all cursor-pointer">
        <CardContent className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                {lesson.completed ? <Check className="h-4 w-4" /> : index}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">{lesson.title}</span>
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  <span>{typeLabels[lesson.type]}</span>
                  {duration && <span>{duration}</span>}
                  <span>Lesson {index} of {total}</span>
                </div>
              </div>
            </div>
            {lesson.completed && (
              <div className="mr-1 text-primary">
                <Check className="h-5 w-5" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

