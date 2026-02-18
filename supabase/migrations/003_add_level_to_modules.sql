-- Add level columns to modules table
ALTER TABLE modules ADD COLUMN IF NOT EXISTS level INTEGER DEFAULT 1;
ALTER TABLE modules ADD COLUMN IF NOT EXISTS level_title TEXT DEFAULT 'Survival Emirati';
ALTER TABLE modules ADD COLUMN IF NOT EXISTS lesson_count INTEGER DEFAULT 0;

-- Update existing modules with level info
UPDATE modules SET level = 1, level_title = 'Survival Emirati' WHERE is_premium = false;
UPDATE modules SET level = 2, level_title = 'Daily Life Conversations' WHERE is_premium = true;
