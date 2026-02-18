export type UserTier = 'free' | 'pro' | 'lifetime';

export interface Profile {
  id: string;
  full_name: string | null;
  tier: UserTier;
  stripe_customer_id: string | null;
  created_at: string;
}

export interface Module {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  order: number;
  level: number;
  level_title: string;
  is_premium: boolean;
  created_at: string;
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  slug: string;
  type: 'phrase_card' | 'quiz' | 'audio';
  order: number;
  duration_seconds: number | null;
  is_premium: boolean;
  created_at: string;
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

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed_at: string;
}

export interface LessonWithProgress extends Lesson {
  completed: boolean;
}

export interface ModuleWithProgress extends Module {
  lessons: LessonWithProgress[];
  completed_count: number;
  total_count: number;
  progress_percent: number;
  can_access: boolean;
}
