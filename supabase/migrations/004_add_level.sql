-- Levels table + modules.level_id (hierarchy: levels → modules → lessons)
-- Run after 001, 002, 003. Do not enable RLS; consistent with current setup.

-- Remove previous integer level column if present
ALTER TABLE modules DROP COLUMN IF EXISTS level;

-- Target: levels table
CREATE TABLE IF NOT EXISTS levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  "order" INT4 NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Modules: add level_id, keep existing columns unchanged
ALTER TABLE modules ADD COLUMN IF NOT EXISTS level_id UUID REFERENCES levels(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_modules_level_id ON modules(level_id);

-- Seed levels (unique slugs)
INSERT INTO levels (id, title, slug, description, "order") VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Level 0 – Foundations', 'level-0', 'Learn Arabizi and build your first sentences', 0),
  ('a0000000-0000-0000-0000-000000000002', 'Level 1 – Survival Emirati', 'level-1', 'Greetings, questions, directions, and numbers', 1),
  ('a0000000-0000-0000-0000-000000000003', 'Level 2 – Daily Conversations', 'level-2', 'Talk about home, food, time, and emotions', 2)
ON CONFLICT (slug) DO NOTHING;

-- Assign every existing module to Level 1 (Survival Emirati). lessons.module_id unchanged.
UPDATE modules SET level_id = 'a0000000-0000-0000-0000-000000000002' WHERE level_id IS NULL;

/*
 * VERIFICATION
 * ------------
 * Added:
 *   - Table "levels" (id uuid PK, title, slug unique, description, order, created_at).
 *   - Column modules.level_id (uuid, references levels(id) ON DELETE SET NULL).
 *   - Index idx_modules_level_id on modules(level_id).
 * Module assignment:
 *   - All existing modules (from 002 seed) assigned to Level 1 (slug: level-1).
 *   - Module UUIDs and lessons.module_id are unchanged; no references broken.
 */
