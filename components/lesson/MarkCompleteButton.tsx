"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface MarkCompleteButtonProps {
  lessonId: string;
  isCompleted: boolean;
}

export function MarkCompleteButton({ lessonId, isCompleted }: MarkCompleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(isCompleted);

  const handleMarkComplete = async () => {
    setLoading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    if (completed) {
      // Unmark as complete
      const { error } = await supabase
        .from("user_progress")
        .delete()
        .eq("user_id", user.id)
        .eq("lesson_id", lessonId);

      if (!error) {
        setCompleted(false);
      }
    } else {
      // Mark as complete
      const { error } = await supabase.from("user_progress").insert({
        user_id: user.id,
        lesson_id: lessonId,
      });

      if (!error) {
        setCompleted(true);
      }
    }

    setLoading(false);
    router.refresh();
  };

  return (
    <Button
      onClick={handleMarkComplete}
      disabled={loading}
      variant={completed ? "default" : "outline"}
    >
      {completed ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Completed
        </>
      ) : (
        "Mark as Complete"
      )}
    </Button>
  );
}
