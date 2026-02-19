-- Add level column to modules
ALTER TABLE modules ADD COLUMN IF NOT EXISTS level INTEGER DEFAULT 1;

-- Set existing modules to levels by order
UPDATE modules SET level = 0 WHERE "order" <= 2;
UPDATE modules SET level = 1 WHERE "order" > 2 AND "order" <= 6;
UPDATE modules SET level = 2 WHERE "order" > 6;
