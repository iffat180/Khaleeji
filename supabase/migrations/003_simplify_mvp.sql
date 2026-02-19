-- Simplify to content-only MVP: remove auth, payments, user tracking.
-- Run this AFTER 001 and 002. Existing data in modules/lessons is kept.

-- Drop auth trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Drop tables (their RLS policies are dropped with them)
DROP TABLE IF EXISTS user_progress;
DROP TABLE IF EXISTS profiles;

-- Remove is_premium from modules and lessons (all content free)
ALTER TABLE modules DROP COLUMN IF EXISTS is_premium;
ALTER TABLE lessons DROP COLUMN IF EXISTS is_premium;

-- Drop all RLS policies on content tables, then disable RLS (anon can read without policies)
DROP POLICY IF EXISTS "Modules are viewable by everyone" ON modules;
DROP POLICY IF EXISTS "Lessons are viewable by everyone" ON lessons;
DROP POLICY IF EXISTS "Phrases are viewable by everyone" ON phrases;
DROP POLICY IF EXISTS "Quiz questions are viewable by everyone" ON quiz_questions;
ALTER TABLE modules DISABLE ROW LEVEL SECURITY;
ALTER TABLE lessons DISABLE ROW LEVEL SECURITY;
ALTER TABLE phrases DISABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions DISABLE ROW LEVEL SECURITY;
