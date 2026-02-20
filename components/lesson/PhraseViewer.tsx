"use client";

import { useState } from "react";
import { PhraseCard } from "./PhraseCard";
import { Button } from "@/components/ui/button";
import type { Phrase } from "@/types";

interface PhraseViewerProps {
  phrases: Phrase[];
}

export function PhraseViewer({ phrases }: PhraseViewerProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  if (!phrases || phrases.length === 0) {
    return (
      <div className="mt-8">
        <p className="text-muted-foreground">No phrases available.</p>
      </div>
    );
  }

  const currentPhrase = phrases[currentPhraseIndex];
  const hasPrev = currentPhraseIndex > 0;
  const hasNext = currentPhraseIndex < phrases.length - 1;

  if (!currentPhrase) return null;

  return (
    <div className="mt-8">
      <p className="mb-4 text-sm text-muted-foreground">
        Phrase {currentPhraseIndex + 1} of {phrases.length}
      </p>
      <PhraseCard phrase={currentPhrase} />
      <div className="mt-6 flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={() => setCurrentPhraseIndex((i) => Math.max(0, i - 1))}
          disabled={!hasPrev}
        >
          ← Previous
        </Button>
        <Button
          onClick={() => setCurrentPhraseIndex((i) => Math.min(phrases.length - 1, i + 1))}
          disabled={!hasNext}
        >
          Next →
        </Button>
      </div>
    </div>
  );
}
