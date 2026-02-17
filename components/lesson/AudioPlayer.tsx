"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AudioPlayerProps {
  audioUrl: string | null;
  title: string;
}

export function AudioPlayer({ audioUrl, title }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const handlePlayPause = () => {
    if (audioUrl) {
      if (audio) {
        if (isPlaying) {
          audio.pause();
          setIsPlaying(false);
        } else {
          audio.play();
          setIsPlaying(true);
        }
      } else {
        const newAudio = new Audio(audioUrl);
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
      alert("Audio coming soon! This is a placeholder for MVP.");
    }
  };

  return (
    <Card>
      <CardContent className="p-8">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <Button
            variant="outline"
            size="lg"
            onClick={handlePlayPause}
            className="rounded-full w-20 h-20"
          >
            {isPlaying ? (
              <Pause className="h-8 w-8" />
            ) : (
              <Play className="h-8 w-8" />
            )}
          </Button>
          <p className="text-sm text-muted-foreground">
            {audioUrl ? "Click to play audio" : "Audio coming soon"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
