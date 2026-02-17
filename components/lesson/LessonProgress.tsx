"use client";

import { Card, CardContent } from "@/components/ui/card";

interface LessonProgressProps {
  current: number;
  total: number;
}

export function LessonProgress({ current, total }: LessonProgressProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Lesson {current} of {total}
          </span>
          <div className="flex gap-1">
            {Array.from({ length: total }).map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index < current ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
