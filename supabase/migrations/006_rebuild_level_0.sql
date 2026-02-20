-- Rebuild Level 0 content: insert new modules and lessons
-- Run after 005_clear_level_0.sql

-- Step 1: Insert 3 modules under Level 0
INSERT INTO modules (id, title, slug, description, "order", level_id) VALUES
  (
    gen_random_uuid(),
    'How Emirati Changes Sounds',
    'emirati-sound-changes',
    NULL,
    1,
    (SELECT id FROM levels WHERE slug = 'level-0')
  ),
  (
    gen_random_uuid(),
    'Arabizi Basics',
    'arabizi-basics',
    NULL,
    2,
    (SELECT id FROM levels WHERE slug = 'level-0')
  ),
  (
    gen_random_uuid(),
    'Pronunciation System',
    'pronunciation-system',
    NULL,
    3,
    (SELECT id FROM levels WHERE slug = 'level-0')
  )
ON CONFLICT (slug) DO NOTHING;

-- Step 2: Insert lessons for Module 1 (How Emirati Changes Sounds)
INSERT INTO lessons (id, module_id, title, slug, type, "order") VALUES
  (
    gen_random_uuid(),
    (SELECT id FROM modules WHERE slug = 'emirati-sound-changes'),
    'Letter Replacements in Emirati',
    'letter-replacements',
    'phrase_card',
    1
  ),
  (
    gen_random_uuid(),
    (SELECT id FROM modules WHERE slug = 'emirati-sound-changes'),
    'Sound Change Examples',
    'sound-change-examples',
    'phrase_card',
    2
  )
ON CONFLICT (slug) DO NOTHING;

-- Step 3: Insert lessons for Module 2 (Arabizi Basics)
INSERT INTO lessons (id, module_id, title, slug, type, "order") VALUES
  (
    gen_random_uuid(),
    (SELECT id FROM modules WHERE slug = 'arabizi-basics'),
    'What is Arabizi?',
    'what-is-arabizi',
    'phrase_card',
    1
  ),
  (
    gen_random_uuid(),
    (SELECT id FROM modules WHERE slug = 'arabizi-basics'),
    'Arabizi Numbers System',
    'arabizi-numbers',
    'phrase_card',
    2
  )
ON CONFLICT (slug) DO NOTHING;

-- Step 4: Insert lessons for Module 3 (Pronunciation System)
INSERT INTO lessons (id, module_id, title, slug, type, "order") VALUES
  (
    gen_random_uuid(),
    (SELECT id FROM modules WHERE slug = 'pronunciation-system'),
    'The 28 Arabic Letters',
    '28-arabic-letters',
    'phrase_card',
    1
  ),
  (
    gen_random_uuid(),
    (SELECT id FROM modules WHERE slug = 'pronunciation-system'),
    'Special Emirati Sounds',
    'special-emirati-sounds',
    'phrase_card',
    2
  ),
  (
    gen_random_uuid(),
    (SELECT id FROM modules WHERE slug = 'pronunciation-system'),
    'DH Pronunciation Note',
    'dh-note',
    'phrase_card',
    3
  )
ON CONFLICT (slug) DO NOTHING;

/*
 * VERIFICATION
 * ------------
 * Inserted:
 *   - 3 modules under Level 0:
 *     1. How Emirati Changes Sounds (order: 1)
 *     2. Arabizi Basics (order: 2)
 *     3. Pronunciation System (order: 3)
 *   - 7 lessons total:
 *     Module 1: 2 lessons (Letter Replacements, Sound Change Examples)
 *     Module 2: 2 lessons (What is Arabizi?, Arabizi Numbers System)
 *     Module 3: 3 lessons (28 Arabic Letters, Special Emirati Sounds, DH Pronunciation Note)
 * All foreign keys properly set (level_id, module_id)
 * Order values respected
 */
