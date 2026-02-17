-- Seed Module 1: Gulf Greetings & Basics (FREE)
INSERT INTO modules (id, title, slug, description, "order", is_premium) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Gulf Greetings & Basics', 'gulf-greetings-basics', 'Master the essential greetings and basic phrases used daily in the Gulf', 1, false)
ON CONFLICT (slug) DO NOTHING;

-- Seed Module 2-5 (PREMIUM)
INSERT INTO modules (id, title, slug, description, "order", is_premium) VALUES
  ('00000000-0000-0000-0000-000000000002', 'At the Restaurant', 'at-the-restaurant', 'Order food, ask for the bill, and navigate restaurant conversations', 2, true),
  ('00000000-0000-0000-0000-000000000003', 'Shopping & Bargaining', 'shopping-bargaining', 'Prices, haggling phrases, colors, sizes, and complimenting items', 3, true),
  ('00000000-0000-0000-0000-000000000004', 'Getting Around', 'getting-around', 'Taxis, directions, asking where things are, Uber/Careem phrases', 4, true),
  ('00000000-0000-0000-0000-000000000005', 'At Work with Gulf Colleagues', 'at-work', 'Professional small talk, meetings, compliments, common office expressions', 5, true)
ON CONFLICT (slug) DO NOTHING;

-- Module 1 Lessons
INSERT INTO lessons (id, module_id, title, slug, type, "order", duration_seconds, is_premium) VALUES
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Hello & How are you', 'hello-how-are-you', 'phrase_card', 1, 300, false),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Goodbye & See you later', 'goodbye-see-you-later', 'phrase_card', 2, 300, false),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'Yes / No / Please / Thank you', 'yes-no-please-thank-you', 'phrase_card', 3, 300, false),
  ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', 'Quiz on Module 1 phrases', 'quiz-module-1', 'quiz', 4, 600, false),
  ('10000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001', 'Numbers 1–10', 'numbers-1-10', 'phrase_card', 5, 300, false)
ON CONFLICT (slug) DO NOTHING;

-- Lesson 1 Phrases: Hello & How are you
INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('10000000-0000-0000-0000-000000000001', 'مرحبا', 'Marhaba', 'Hello', 1),
  ('10000000-0000-0000-0000-000000000001', 'كيف حالك', 'Chaif Halak', 'How are you?', 2),
  ('10000000-0000-0000-0000-000000000001', 'الحمدلله', 'Hamdillah', 'I''m good (praise God)', 3),
  ('10000000-0000-0000-0000-000000000001', 'هلا والله', 'Hala Wallah', 'Hey! (warm greeting)', 4)
ON CONFLICT DO NOTHING;

-- Lesson 2 Phrases: Goodbye & See you later
INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('10000000-0000-0000-0000-000000000002', 'مع السلامة', 'Ma3 Elsalama', 'Goodbye', 1),
  ('10000000-0000-0000-0000-000000000002', 'بشوفك', 'Bshofak', 'See you later', 2),
  ('10000000-0000-0000-0000-000000000002', 'يلا باي', 'Yalla Bye', 'Bye bye (very common)', 3)
ON CONFLICT DO NOTHING;

-- Lesson 3 Phrases: Yes / No / Please / Thank you
INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('10000000-0000-0000-0000-000000000003', 'إي', 'Ee', 'Yes (Gulf, not نعم)', 1),
  ('10000000-0000-0000-0000-000000000003', 'لا', 'La', 'No', 2),
  ('10000000-0000-0000-0000-000000000003', 'لو سمحت', 'Law Samaht', 'Please / Excuse me', 3),
  ('10000000-0000-0000-0000-000000000003', 'شكراً', 'Shukran', 'Thank you', 4),
  ('10000000-0000-0000-0000-000000000003', 'عفواً', 'Afwan', 'You''re welcome', 5)
ON CONFLICT DO NOTHING;

-- Lesson 4 Quiz Questions
INSERT INTO quiz_questions (lesson_id, question, correct_answer, wrong_answers, "order") VALUES
  ('10000000-0000-0000-0000-000000000004', 'What does "مرحبا" mean?', 'Hello', '["Goodbye", "Thank you", "Please"]', 1),
  ('10000000-0000-0000-0000-000000000004', 'What does "كيف حالك" mean?', 'How are you?', '["Goodbye", "Thank you", "Yes"]', 2),
  ('10000000-0000-0000-0000-000000000004', 'What does "الحمدلله" mean?', 'I''m good (praise God)', '["Hello", "Goodbye", "Thank you"]', 3),
  ('10000000-0000-0000-0000-000000000004', 'What does "مع السلامة" mean?', 'Goodbye', '["Hello", "Thank you", "Please"]', 4),
  ('10000000-0000-0000-0000-000000000004', 'What does "إي" mean?', 'Yes', '["No", "Please", "Thank you"]', 5),
  ('10000000-0000-0000-0000-000000000004', 'What does "شكراً" mean?', 'Thank you', '["Please", "Yes", "No"]', 6)
ON CONFLICT DO NOTHING;

-- Lesson 5 Phrases: Numbers 1–10
INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('10000000-0000-0000-0000-000000000005', 'واحد', 'Wahid', 'One', 1),
  ('10000000-0000-0000-0000-000000000005', 'اثنين', 'Ithneen', 'Two', 2),
  ('10000000-0000-0000-0000-000000000005', 'ثلاثة', 'Thalatha', 'Three', 3),
  ('10000000-0000-0000-0000-000000000005', 'أربعة', 'Arba3a', 'Four', 4),
  ('10000000-0000-0000-0000-000000000005', 'خمسة', 'Khamsa', 'Five', 5),
  ('10000000-0000-0000-0000-000000000005', 'ستة', 'Sitta', 'Six', 6),
  ('10000000-0000-0000-0000-000000000005', 'سبعة', 'Sab3a', 'Seven', 7),
  ('10000000-0000-0000-0000-000000000005', 'ثمانية', 'Thamaniya', 'Eight', 8),
  ('10000000-0000-0000-0000-000000000005', 'تسعة', 'Tis3a', 'Nine', 9),
  ('10000000-0000-0000-0000-000000000005', 'عشرة', '3ashara', 'Ten', 10)
ON CONFLICT DO NOTHING;
