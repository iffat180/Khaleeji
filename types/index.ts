export interface Level {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  order: number;
  created_at?: string;
}

export interface Module {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  order: number;
  level_id: string | null;
  created_at?: string;
}

export interface Phrase {
  id: string;
  lesson_id: string;
  arabic_text: string;
  transliteration: string;
  english_meaning: string;
  audio_url: string | null;
  order: number;
}

export interface QuizQuestion {
  id: string;
  lesson_id: string;
  question: string;
  correct_answer: string;
  wrong_answers: string[];
  order: number;
}

export type LevelBadge = "FREE" | "PREMIUM" | "LOCKED";

export interface LevelConfig {
  level: number;
  title: string;
  description: string;
  badge: LevelBadge;
}
