"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Phrase } from "@/types";

interface PhraseCardProps {
  phrase: Phrase;
}

export function PhraseCard({ phrase }: PhraseCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const handlePlayAudio = () => {
    if (phrase.audio_url) {
      if (audio) {
        if (isPlaying) {
          audio.pause();
          setIsPlaying(false);
        } else {
          audio.play();
          setIsPlaying(true);
        }
      } else {
        const newAudio = new Audio(phrase.audio_url);
        newAudio.onended = () => setIsPlaying(false);
        newAudio.onerror = () => {
          console.error("Audio playback failed");
          setIsPlaying(false);
        };
        setAudio(newAudio);
        newAudio.play();
        setIsPlaying(true);
      }
    } else {
      alert("Audio coming soon! For now, practice reading the transliteration.");
    }
  };

  return (
    <Card className="mb-8 border-2 border-border bg-gradient-to-b from-[var(--cream)] to-[var(--sand-dark)] rounded-[var(--radius-xl)] phrase-card">
      <CardContent className="px-6 sm:px-10 py-10">
        <div className="space-y-8">
          {/* Arabic + Audio */}
          <div className="flex items-start justify-between">
            <div className="flex-1 text-center">
              <div
                className="arabic mb-4 text-4xl sm:text-5xl font-bold text-foreground"
                dir="rtl"
              >
                {phrase.arabic_text}
              </div>
              <p className="text-lg sm:text-xl text-muted-foreground italic">
                {phrase.transliteration}
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handlePlayAudio}
              className="ml-4 rounded-full bg-primary text-primary-foreground hover:scale-105 hover:bg-primary/90 transition-transform"
              aria-label="Play phrase audio"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* English Meaning */}
          <div className="border-t border-border pt-4 text-center">
            <p className="text-xl sm:text-2xl font-semibold text-foreground">
              {phrase.english_meaning}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

