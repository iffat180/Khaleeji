-- ============================================================
-- KHALEEJI — Full Course Content Seed
-- Levels 0, 1, 2, 3
-- ============================================================

-- ============================================================
-- LEVEL 0: FOUNDATIONS (FREE)
-- ============================================================

INSERT INTO modules (id, title, slug, description, level, level_title, "order", is_premium) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Arabizi + Pronunciation', 'arabizi-pronunciation',
   'Learn the romanization system and Emirati-specific sounds', 0, 'Foundations', 1, false),
  ('a0000000-0000-0000-0000-000000000002', 'Core Sentence Building', 'sentence-building',
   'Build basic sentences in Emirati Arabic', 0, 'Foundations', 2, false)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- Module 0.1: Arabizi + Pronunciation — 5 lessons
-- ============================================================

INSERT INTO lessons (id, module_id, title, slug, type, "order", duration_seconds, is_premium) VALUES
  ('b0100000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001',
   'Understanding Arabizi Numbers', 'arabizi-numbers', 'phrase_card', 1, 300, false),
  ('b0100000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001',
   'Emirati Sound Shifts', 'emirati-sound-shifts', 'phrase_card', 2, 300, false),
  ('b0100000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001',
   'The Emirati "ch" and "g" Sounds', 'ch-and-g-sounds', 'phrase_card', 3, 300, false),
  ('b0100000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001',
   'Common Mistakes to Avoid', 'common-mistakes', 'phrase_card', 4, 300, false),
  ('b0100000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001',
   'Quiz: Can You Hear the Difference?', 'arabizi-quiz', 'quiz', 5, 600, false)
ON CONFLICT (slug) DO NOTHING;

-- Lesson 0.1.1 — Understanding Arabizi Numbers
INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b0100000-0000-0000-0000-000000000001', 'ع', '3 = ع (ain)', 'The number 3 represents the ''ayn sound', 1),
  ('b0100000-0000-0000-0000-000000000001', 'ح', '7 = ح (haa)', 'The number 7 represents the deep h sound', 2),
  ('b0100000-0000-0000-0000-000000000001', 'ء', '2 = ء (hamza)', 'The number 2 represents the glottal stop', 3),
  ('b0100000-0000-0000-0000-000000000001', 'خ', '5 = خ (kha)', 'The number 5 represents the kh sound', 4),
  ('b0100000-0000-0000-0000-000000000001', 'مرحبا', 'mar7aba', 'Hello — notice the 7 = ح', 5),
  ('b0100000-0000-0000-0000-000000000001', 'عفوا', '3afwan', 'You''re welcome — 3 = ع', 6),
  ('b0100000-0000-0000-0000-000000000001', 'شكرا', 'shukran', 'Thank you', 7)
ON CONFLICT DO NOTHING;

-- Lesson 0.1.2 — Emirati Sound Shifts
INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b0100000-0000-0000-0000-000000000002', 'يميل', 'yameel', 'Beautiful (j→y shift: jameel → yameel)', 1),
  ('b0100000-0000-0000-0000-000000000002', 'قهوة', 'gahwa', 'Coffee (q→g shift: qahwa → gahwa)', 2),
  ('b0100000-0000-0000-0000-000000000002', 'كبيرة', 'chbeera', 'Big (k→ch shift: kabeera → chbeera)', 3),
  ('b0100000-0000-0000-0000-000000000002', 'جميل', 'yameel (Emirati)', 'Beautiful — Emirati pronunciation', 4),
  ('b0100000-0000-0000-0000-000000000002', 'قبل', 'gabal', 'Before — Gulf pronunciation', 5)
ON CONFLICT DO NOTHING;

-- Lesson 0.1.3 — The ch and g sounds
INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b0100000-0000-0000-0000-000000000003', 'چبير', 'chbeera', 'Big — the ch sound', 1),
  ('b0100000-0000-0000-0000-000000000003', 'چان', 'chaan', 'Was — very common Gulf word', 2),
  ('b0100000-0000-0000-0000-000000000003', 'قبل', 'gabal', 'Before — q becomes g in Gulf', 3),
  ('b0100000-0000-0000-0000-000000000003', 'وين الچبر؟', 'wain il-chubur?', 'Where are the bridges?', 4)
ON CONFLICT DO NOTHING;

-- Lesson 0.1.4 — Common Mistakes
INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b0100000-0000-0000-0000-000000000004', 'إي', 'ee', 'Yes — use this, not "na3am"', 1),
  ('b0100000-0000-0000-0000-000000000004', 'إيوا', 'iywa', 'Yes — also common in Gulf', 2),
  ('b0100000-0000-0000-0000-000000000004', 'مشكور', 'mashkoor', 'Thank you — use this, not "laa ashkuruk"', 3),
  ('b0100000-0000-0000-0000-000000000004', 'موب', 'mob', 'Not / No — use this for negation', 4),
  ('b0100000-0000-0000-0000-000000000004', 'موب زين', 'mob zain', 'Not good — example of mob negation', 5)
ON CONFLICT DO NOTHING;

-- Lesson 0.1.5 — Quiz
INSERT INTO quiz_questions (lesson_id, question, correct_answer, wrong_answers, "order") VALUES
  ('b0100000-0000-0000-0000-000000000005', 'What does the number 3 represent in Arabizi?', 'ع (ain)', '["ح (haa)", "خ (kha)", "ء (hamza)"]', 1),
  ('b0100000-0000-0000-0000-000000000005', 'How do Emiratis pronounce "jameel" (beautiful)?', 'yameel', '["jameel", "chameel", "gameel"]', 2),
  ('b0100000-0000-0000-0000-000000000005', 'What is the Gulf word for "coffee"?', 'gahwa', '["qahwa", "kahwa", "chahwa"]', 3),
  ('b0100000-0000-0000-0000-000000000005', 'Which word means "Yes" in Gulf Arabic?', 'ee', '["na3am", "aywa", "ya"]', 4),
  ('b0100000-0000-0000-0000-000000000005', 'What does "mob" mean?', 'Not / No (negation)', '["Yes", "Hello", "Thank you"]', 5)
ON CONFLICT DO NOTHING;

-- ============================================================
-- Module 0.2: Core Sentence Building — 6 lessons
-- ============================================================

INSERT INTO lessons (id, module_id, title, slug, type, "order", duration_seconds, is_premium) VALUES
  ('b0200000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002',
   'Personal Pronouns', 'personal-pronouns', 'phrase_card', 1, 300, false),
  ('b0200000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002',
   'Yes / No Basics', 'yes-no-basics', 'phrase_card', 2, 300, false),
  ('b0200000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000002',
   'Basic Word Order', 'basic-word-order', 'phrase_card', 3, 300, false),
  ('b0200000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000002',
   'Using "fee" (there is/are)', 'using-fee', 'phrase_card', 4, 300, false),
  ('b0200000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000002',
   'Using "mob" (not/don''t)', 'using-mob', 'phrase_card', 5, 300, false),
  ('b0200000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000002',
   'Quiz: Build Your First Sentences', 'sentence-quiz', 'quiz', 6, 600, false)
ON CONFLICT (slug) DO NOTHING;

-- Lesson 0.2.1 — Personal Pronouns
INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b0200000-0000-0000-0000-000000000001', 'أنا', 'ana', 'I', 1),
  ('b0200000-0000-0000-0000-000000000001', 'إنت', 'inta', 'You (masculine)', 2),
  ('b0200000-0000-0000-0000-000000000001', 'إنتِ', 'inti', 'You (feminine)', 3),
  ('b0200000-0000-0000-0000-000000000001', 'إنتو', 'into', 'You (plural)', 4),
  ('b0200000-0000-0000-0000-000000000001', 'هو', 'howa', 'He', 5),
  ('b0200000-0000-0000-0000-000000000001', 'هي', 'hiya', 'She', 6),
  ('b0200000-0000-0000-0000-000000000001', 'هم', 'hoom', 'They', 7)
ON CONFLICT DO NOTHING;

-- Lesson 0.2.2 — Yes/No Basics
INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b0200000-0000-0000-0000-000000000002', 'إي', 'ee', 'Yes (most common in Gulf)', 1),
  ('b0200000-0000-0000-0000-000000000002', 'إيوا', 'iywa', 'Yes (emphatic)', 2),
  ('b0200000-0000-0000-0000-000000000002', 'نعم', 'na3am', 'Yes (formal — avoid in conversation)', 3),
  ('b0200000-0000-0000-0000-000000000002', 'لا', 'la', 'No', 4),
  ('b0200000-0000-0000-0000-000000000002', 'إنت إمريكي؟ إي', 'inta im-reekee? ee', 'Are you American? Yes.', 5)
ON CONFLICT DO NOTHING;

-- Lesson 0.2.3 — Basic Word Order
INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b0200000-0000-0000-0000-000000000003', 'أنا أروح المطعم', 'ana aroo7 il-maT3am', 'I go to the restaurant', 1),
  ('b0200000-0000-0000-0000-000000000003', 'هو يشتغل في دبي', 'howa yishtaghil fee Dubai', 'He works in Dubai', 2),
  ('b0200000-0000-0000-0000-000000000003', 'هي تحب القهوة', 'hiya t7ib il-gahwa', 'She likes coffee', 3)
ON CONFLICT DO NOTHING;

-- Lesson 0.2.4 — Using fee
INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b0200000-0000-0000-0000-000000000004', 'في مطعم؟', 'fee maT3am?', 'Is there a restaurant?', 1),
  ('b0200000-0000-0000-0000-000000000004', 'في زحمة', 'fee za7mah', 'There is traffic', 2),
  ('b0200000-0000-0000-0000-000000000004', 'في ناس كثير', 'fee naas katheer', 'There are many people', 3),
  ('b0200000-0000-0000-0000-000000000004', 'ما في', 'ma fee', 'There isn''t / There are none', 4)
ON CONFLICT DO NOTHING;

-- Lesson 0.2.5 — Using mob
INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b0200000-0000-0000-0000-000000000005', 'أنا موب متعب', 'ana mob mita3ib', 'I am not tired', 1),
  ('b0200000-0000-0000-0000-000000000005', 'موب عارف', 'mob 3aarif', 'I don''t know', 2),
  ('b0200000-0000-0000-0000-000000000005', 'موب زين', 'mob zain', 'Not good', 3),
  ('b0200000-0000-0000-0000-000000000005', 'موب جوعان', 'mob yoo3aan', 'Not hungry', 4)
ON CONFLICT DO NOTHING;

-- Lesson 0.2.6 — Quiz
INSERT INTO quiz_questions (lesson_id, question, correct_answer, wrong_answers, "order") VALUES
  ('b0200000-0000-0000-0000-000000000006', 'How do you say "I" in Gulf Arabic?', 'ana', '["inta", "howa", "hiya"]', 1),
  ('b0200000-0000-0000-0000-000000000006', 'What does "fee za7mah" mean?', 'There is traffic', '["No traffic", "I am tired", "Where is the traffic?"]', 2),
  ('b0200000-0000-0000-0000-000000000006', 'How do you say "I am not tired"?', 'ana mob mita3ib', '["ana fee mita3ib", "mob ana mita3ib", "ana mita3ib mob"]', 3),
  ('b0200000-0000-0000-0000-000000000006', 'What does "inti" mean?', 'You (feminine)', '["You (masculine)", "She", "I"]', 4)
ON CONFLICT DO NOTHING;

-- ============================================================
-- LEVEL 1: SURVIVAL EMIRATI (FREE)
-- ============================================================

INSERT INTO modules (id, title, slug, description, level, level_title, "order", is_premium) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Greetings + Politeness', 'greetings-politeness',
   'Essential greetings to survive any social situation in the Emirates', 1, 'Survival Emirati', 3, false),
  ('a1000000-0000-0000-0000-000000000002', 'Daily Questions', 'daily-questions',
   'Ask the 6 most important question words', 1, 'Survival Emirati', 4, false),
  ('a1000000-0000-0000-0000-000000000003', 'Directions + Location', 'directions-location',
   'Navigate the city and give or receive directions', 1, 'Survival Emirati', 5, false),
  ('a1000000-0000-0000-0000-000000000004', 'Numbers + Money', 'numbers-money',
   'Count, tell time, and ask prices', 1, 'Survival Emirati', 6, false)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- Module 1.1: Greetings + Politeness — 8 lessons
-- ============================================================

INSERT INTO lessons (id, module_id, title, slug, type, "order", duration_seconds, is_premium) VALUES
  ('b1100000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001',
   'Basic Hellos', 'basic-hellos', 'phrase_card', 1, 300, false),
  ('b1100000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001',
   'Formal Greetings', 'formal-greetings', 'phrase_card', 2, 300, false),
  ('b1100000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000001',
   'How Are You?', 'how-are-you', 'phrase_card', 3, 300, false),
  ('b1100000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000001',
   'What''s Up?', 'whats-up', 'phrase_card', 4, 300, false),
  ('b1100000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000001',
   'Thanks & You''re Welcome', 'thanks-welcome', 'phrase_card', 5, 300, false),
  ('b1100000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000001',
   'Welcome Phrases', 'welcome-phrases', 'phrase_card', 6, 300, false),
  ('b1100000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000001',
   'Entering a Home', 'entering-a-home', 'phrase_card', 7, 300, false),
  ('b1100000-0000-0000-0000-000000000008', 'a1000000-0000-0000-0000-000000000001',
   'Quiz: Greeting Simulation', 'greetings-quiz', 'quiz', 8, 600, false)
ON CONFLICT (slug) DO NOTHING;

-- Lesson 1.1.1 — Basic Hellos
INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b1100000-0000-0000-0000-000000000001', 'مرحبا', 'mar7aba', 'Hello', 1),
  ('b1100000-0000-0000-0000-000000000001', 'هلا وغلا', 'hala wa ghala', 'Hello precious — warm greeting', 2),
  ('b1100000-0000-0000-0000-000000000001', 'أهلاً وسهلاً', 'ahlan wa sahlan', 'Hello and welcome', 3),
  ('b1100000-0000-0000-0000-000000000001', 'هلا والله', 'hala wallah', 'Hey! — very common, emphatic', 4)
ON CONFLICT DO NOTHING;

-- Lesson 1.1.2 — Formal Greetings
INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b1100000-0000-0000-0000-000000000002', 'السلام عليكم', 'as-salaam 3alaikom', 'Peace be upon you', 1),
  ('b1100000-0000-0000-0000-000000000002', 'وعليكم السلام', 'wa3alaikom is-salaam', 'And peace upon you too (response)', 2),
  ('b1100000-0000-0000-0000-000000000002', 'صباح الخير', 'SabaH il-khair', 'Good morning', 3),
  ('b1100000-0000-0000-0000-000000000002', 'صباح النور', 'SabaH in-noor', 'Good morning (response)', 4),
  ('b1100000-0000-0000-0000-000000000002', 'مساء الخير', 'masa il-khair', 'Good evening', 5),
  ('b1100000-0000-0000-0000-000000000002', 'مساء النور', 'masa in-noor', 'Good evening (response)', 6)
ON CONFLICT DO NOTHING;

-- Lesson 1.1.3 — How Are You?
INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b1100000-0000-0000-0000-000000000003', 'إيش حالك؟', 'ish-7aalik?', 'How are you? (masculine)', 1),
  ('b1100000-0000-0000-0000-000000000003', 'إيش حالج؟', 'ish-7aalich?', 'How are you? (feminine)', 2),
  ('b1100000-0000-0000-0000-000000000003', 'إيش حالكم؟', 'ish-7aalkom?', 'How are you? (plural)', 3),
  ('b1100000-0000-0000-0000-000000000003', 'الحمد لله بخير', 'il-7amdillah bikhair', 'Fine, thank God', 4),
  ('b1100000-0000-0000-0000-000000000003', 'شخبارك؟', 'shakh-barik?', 'What''s your news? (alternative)', 5),
  ('b1100000-0000-0000-0000-000000000003', 'الحمد لله ماشي الحال', 'il-7amdillah mashee il-7aal', 'Getting along fine', 6)
ON CONFLICT DO NOTHING;

-- Lesson 1.1.4 — What's Up?
INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b1100000-0000-0000-0000-000000000004', 'شو إمسوي؟', 'shoo im-saw-wee?', 'What are you up to? (masculine)', 1),
  ('b1100000-0000-0000-0000-000000000004', 'شو إمسوية؟', 'shoo im-saw-yah?', 'What are you up to? (feminine)', 2),
  ('b1100000-0000-0000-0000-000000000004', 'شو إمسوين؟', 'shoo im-saw-ween?', 'What are you up to? (plural)', 3),
  ('b1100000-0000-0000-0000-000000000004', 'والله زين', 'wallah zain', 'Really good / Going well', 4)
ON CONFLICT DO NOTHING;

-- Lesson 1.1.5 — Thanks & Welcome
INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b1100000-0000-0000-0000-000000000005', 'مشكور', 'mashkoor', 'Thank you (to a male)', 1),
  ('b1100000-0000-0000-0000-000000000005', 'مشكورة', 'mashkoorah', 'Thank you (to a female)', 2),
  ('b1100000-0000-0000-0000-000000000005', 'شكراً', 'shukran', 'Thanks (universal)', 3),
  ('b1100000-0000-0000-0000-000000000005', 'عفواً', '3afwan', 'You''re welcome', 4)
ON CONFLICT DO NOTHING;

-- Lesson 1.1.6 — Welcome Phrases
INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b1100000-0000-0000-0000-000000000006', 'حياك الله', '7ayyaak Allah', 'Welcome (literally: may God keep you alive)', 1),
  ('b1100000-0000-0000-0000-000000000006', 'الله يحييك', 'Allah yi7ayyeek', 'Response to 7ayyaak Allah', 2),
  ('b1100000-0000-0000-0000-000000000006', 'أهلاً', 'ahlan', 'Welcome / Hi (casual)', 3)
ON CONFLICT DO NOTHING;

-- Lesson 1.1.7 — Entering a Home
INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b1100000-0000-0000-0000-000000000007', 'هود', 'hoad', 'I''m coming — announce before entering', 1),
  ('b1100000-0000-0000-0000-000000000007', 'هيدا', 'hidaa', 'You can come — permission to enter', 2),
  ('b1100000-0000-0000-0000-000000000007', 'اقرب', 'igrab', 'Please have a seat / come closer', 3),
  ('b1100000-0000-0000-0000-000000000007', 'قريب / جريب', 'greeb / jireeb', 'Response when invited to sit', 4)
ON CONFLICT DO NOTHING;

-- Lesson 1.1.8 — Quiz
INSERT INTO quiz_questions (lesson_id, question, correct_answer, wrong_answers, "order") VALUES
  ('b1100000-0000-0000-0000-000000000008', 'What is the response to "SabaH il-khair"?', 'SabaH in-noor', '["masa in-noor", "il-7amdillah", "hala wallah"]', 1),
  ('b1100000-0000-0000-0000-000000000008', 'How do you say "thank you" to a male in Gulf Arabic?', 'mashkoor', '[''"3afwan"'', '"shukran"'', '"mar7aba"'']', 2),
  ('b1100000-0000-0000-0000-000000000008', 'What does "hala wallah" mean?', 'Hey! (warm, emphatic greeting)', '["Goodbye", "Thank you", "You''re welcome"]', 3),
  ('b1100000-0000-0000-0000-000000000008', 'What do you say before entering an Emirati home?', 'hoad', '["hidaa", "igrab", "ahlan"]', 4),
  ('b1100000-0000-0000-0000-000000000008', 'How do you ask "how are you?" to a woman?', 'ish-7aalich?', '["ish-7aalik?", "ish-7aalkom?", "shakh-barik?"]', 5)
ON CONFLICT DO NOTHING;

-- ============================================================
-- Module 1.2: Daily Questions — 7 lessons
-- ============================================================

INSERT INTO lessons (id, module_id, title, slug, type, "order", duration_seconds, is_premium) VALUES
  ('b1200000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000002',
   'Where? (wain?)', 'question-where', 'phrase_card', 1, 300, false),
  ('b1200000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000002',
   'When? (mita?)', 'question-when', 'phrase_card', 2, 300, false),
  ('b1200000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000002',
   'How Much? (kam? / bi-cham?)', 'question-how-much', 'phrase_card', 3, 300, false),
  ('b1200000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000002',
   'Who? (imnoo? / min?)', 'question-who', 'phrase_card', 4, 300, false),
  ('b1200000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000002',
   'What? (shoo? / ish?)', 'question-what', 'phrase_card', 5, 300, false),
  ('b1200000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000002',
   'Why? (leash?)', 'question-why', 'phrase_card', 6, 300, false),
  ('b1200000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000002',
   'How? (keaf? / shlon?)', 'question-how', 'phrase_card', 7, 300, false)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b1200000-0000-0000-0000-000000000001', 'وين؟', 'wain?', 'Where?', 1),
  ('b1200000-0000-0000-0000-000000000001', 'وين بيتكم؟', 'wain baitkom?', 'Where is your house?', 2),
  ('b1200000-0000-0000-0000-000000000001', 'وين المطعم؟', 'wain il-maT3am?', 'Where is the restaurant?', 3),
  ('b1200000-0000-0000-0000-000000000001', 'وين دبي مول؟', 'wain Dubai Mall?', 'Where is Dubai Mall?', 4)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b1200000-0000-0000-0000-000000000002', 'متى؟', 'mita?', 'When?', 1),
  ('b1200000-0000-0000-0000-000000000002', 'متى الغداء؟', 'mita il-ghada?', 'When is lunch?', 2),
  ('b1200000-0000-0000-0000-000000000002', 'متى الحفلة؟', 'mita il-7aflah?', 'When is the party?', 3),
  ('b1200000-0000-0000-0000-000000000002', 'متى نروح؟', 'mita in-roo7?', 'When do we go?', 4)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b1200000-0000-0000-0000-000000000003', 'كم؟', 'kam?', 'How much / many?', 1),
  ('b1200000-0000-0000-0000-000000000003', 'بكم هذا؟', 'bi-cham hatha?', 'How much is this?', 2),
  ('b1200000-0000-0000-0000-000000000003', 'كم درهم؟', 'kam dirham?', 'How many dirhams?', 3)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b1200000-0000-0000-0000-000000000004', 'إمنو هذا؟', 'imnoo hatha?', 'Who is this?', 1),
  ('b1200000-0000-0000-0000-000000000004', 'من يشتغل هنا؟', 'min yishtaghil hni?', 'Who works here?', 2)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b1200000-0000-0000-0000-000000000005', 'شو هذا؟', 'shoo hatha?', 'What is this?', 1),
  ('b1200000-0000-0000-0000-000000000005', 'إيش اسمك؟', 'ish-ismik?', 'What is your name?', 2),
  ('b1200000-0000-0000-0000-000000000005', 'شو تبي؟', 'shoo tabe?', 'What do you want?', 3)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b1200000-0000-0000-0000-000000000006', 'ليش؟', 'leash?', 'Why?', 1),
  ('b1200000-0000-0000-0000-000000000006', 'ليش في زحمة؟', 'leash za7mah?', 'Why is there traffic?', 2),
  ('b1200000-0000-0000-0000-000000000006', 'ليش زعلان؟', 'leash za3laan?', 'Why are you upset?', 3),
  ('b1200000-0000-0000-0000-000000000006', 'ليش متأخر؟', 'leash mit-akhir?', 'Why are you late?', 4)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b1200000-0000-0000-0000-000000000007', 'كيف أقول؟', 'keaf a-gool?', 'How do I say?', 1),
  ('b1200000-0000-0000-0000-000000000007', 'كيف أروح؟', 'keaf aroo7?', 'How do I get there?', 2),
  ('b1200000-0000-0000-0000-000000000007', 'شلون؟', 'shlon?', 'How? (casual version)', 3)
ON CONFLICT DO NOTHING;

-- ============================================================
-- Module 1.3: Directions + Location — 5 lessons
-- ============================================================

INSERT INTO lessons (id, module_id, title, slug, type, "order", duration_seconds, is_premium) VALUES
  ('b1300000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000003',
   'Basic Directions', 'basic-directions', 'phrase_card', 1, 300, false),
  ('b1300000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000003',
   'Inside / Outside', 'inside-outside', 'phrase_card', 2, 300, false),
  ('b1300000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000003',
   'In Front / Behind', 'in-front-behind', 'phrase_card', 3, 300, false),
  ('b1300000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000003',
   'With / Without', 'with-without', 'phrase_card', 4, 300, false),
  ('b1300000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000003',
   'Quiz: Give Directions', 'directions-quiz', 'quiz', 5, 600, false)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b1300000-0000-0000-0000-000000000001', 'يمين', 'yimeen', 'Right', 1),
  ('b1300000-0000-0000-0000-000000000001', 'شمال / يسار', 'shamal / yasar', 'Left', 2),
  ('b1300000-0000-0000-0000-000000000001', 'سيدا', 'siDa', 'Straight ahead', 3),
  ('b1300000-0000-0000-0000-000000000001', 'دور', 'dor', 'Turn', 4)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b1300000-0000-0000-0000-000000000002', 'داخل', 'dakhil', 'Inside', 1),
  ('b1300000-0000-0000-0000-000000000002', 'برّا', 'bara', 'Outside', 2),
  ('b1300000-0000-0000-0000-000000000002', 'فوق', 'foag', 'Up / Upstairs', 3),
  ('b1300000-0000-0000-0000-000000000002', 'تحت', 'ta7at', 'Down / Downstairs', 4)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b1300000-0000-0000-0000-000000000003', 'قدام', 'guddaam', 'In front', 1),
  ('b1300000-0000-0000-0000-000000000003', 'ورا', 'wara', 'Behind', 2),
  ('b1300000-0000-0000-0000-000000000003', 'يم / جنب', 'yamm / janib', 'Next to', 3),
  ('b1300000-0000-0000-0000-000000000003', 'بين', 'bain', 'Between', 4)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b1300000-0000-0000-0000-000000000004', 'وياي / معاي', 'wiya / ma3a', 'With', 1),
  ('b1300000-0000-0000-0000-000000000004', 'بدون', 'bidoon', 'Without', 2),
  ('b1300000-0000-0000-0000-000000000004', 'قهوة بدون سكر', 'gahwa bidoon sukkar', 'Coffee without sugar', 3)
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (lesson_id, question, correct_answer, wrong_answers, "order") VALUES
  ('b1300000-0000-0000-0000-000000000005', 'How do you say "Turn right"?', 'dor yimeen', '["dor yasar", "siDa yimeen", "yimeen guddaam"]', 1),
  ('b1300000-0000-0000-0000-000000000005', 'What does "bara" mean?', 'Outside', '["Inside", "Behind", "Next to"]', 2),
  ('b1300000-0000-0000-0000-000000000005', 'How do you say "straight ahead"?', 'siDa', '["yimeen", "wara", "bain"]', 3),
  ('b1300000-0000-0000-0000-000000000005', 'What does "bidoon" mean?', 'Without', '["With", "Between", "Next to"]', 4)
ON CONFLICT DO NOTHING;

-- ============================================================
-- Module 1.4: Numbers + Money — 6 lessons
-- ============================================================

INSERT INTO lessons (id, module_id, title, slug, type, "order", duration_seconds, is_premium) VALUES
  ('b1400000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000004',
   'Numbers 0–10', 'numbers-0-10', 'phrase_card', 1, 300, false),
  ('b1400000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000004',
   'Numbers 11–20', 'numbers-11-20', 'phrase_card', 2, 300, false),
  ('b1400000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000004',
   'Tens (20–100)', 'numbers-tens', 'phrase_card', 3, 300, false),
  ('b1400000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000004',
   'Hundreds + Thousands', 'numbers-large', 'phrase_card', 4, 300, false),
  ('b1400000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000004',
   'Asking Prices', 'asking-prices', 'phrase_card', 5, 300, false),
  ('b1400000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000004',
   'Quiz: Shopping Scenarios', 'numbers-quiz', 'quiz', 6, 600, false)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b1400000-0000-0000-0000-000000000001', 'صفر', 'Sifir', 'Zero', 1),
  ('b1400000-0000-0000-0000-000000000001', 'واحد', 'wa7id', 'One', 2),
  ('b1400000-0000-0000-0000-000000000001', 'اثنين', 'ithain', 'Two', 3),
  ('b1400000-0000-0000-0000-000000000001', 'ثلاثة', 'thalatha', 'Three', 4),
  ('b1400000-0000-0000-0000-000000000001', 'أربعة', 'arba3', 'Four', 5),
  ('b1400000-0000-0000-0000-000000000001', 'خمسة', 'khams', 'Five', 6),
  ('b1400000-0000-0000-0000-000000000001', 'ستة', 'sitt', 'Six', 7),
  ('b1400000-0000-0000-0000-000000000001', 'سبعة', 'sab3a', 'Seven', 8),
  ('b1400000-0000-0000-0000-000000000001', 'ثمانية', 'thamania', 'Eight', 9),
  ('b1400000-0000-0000-0000-000000000001', 'تسعة', 'tis3a', 'Nine', 10),
  ('b1400000-0000-0000-0000-000000000001', 'عشرة', '3ashra', 'Ten', 11)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b1400000-0000-0000-0000-000000000002', 'أحد عشر', '7idaashar', 'Eleven', 1),
  ('b1400000-0000-0000-0000-000000000002', 'اثنا عشر', 'ithnashar', 'Twelve', 2),
  ('b1400000-0000-0000-0000-000000000002', 'ثلاثة عشر', 'thalaTTashar', 'Thirteen', 3),
  ('b1400000-0000-0000-0000-000000000002', 'أربعة عشر', 'arba3Tashar', 'Fourteen', 4),
  ('b1400000-0000-0000-0000-000000000002', 'خمسة عشر', 'khamsTashar', 'Fifteen', 5),
  ('b1400000-0000-0000-0000-000000000002', 'عشرين', '3ishreen', 'Twenty', 6)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b1400000-0000-0000-0000-000000000003', 'عشرين', '3ishreen', 'Twenty', 1),
  ('b1400000-0000-0000-0000-000000000003', 'ثلاثين', 'thalatheen', 'Thirty', 2),
  ('b1400000-0000-0000-0000-000000000003', 'أربعين', 'arba3een', 'Forty', 3),
  ('b1400000-0000-0000-0000-000000000003', 'خمسين', 'khamseen', 'Fifty', 4),
  ('b1400000-0000-0000-0000-000000000003', 'مية', 'miya', 'One hundred', 5)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b1400000-0000-0000-0000-000000000004', 'ميتين', 'mitain', 'Two hundred', 1),
  ('b1400000-0000-0000-0000-000000000004', 'ثلاث مية', 'thalath-miya', 'Three hundred', 2),
  ('b1400000-0000-0000-0000-000000000004', 'ألف', 'alf', 'One thousand', 3),
  ('b1400000-0000-0000-0000-000000000004', 'ألفين', 'alfain', 'Two thousand', 4)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b1400000-0000-0000-0000-000000000005', 'بكم هذا؟', 'bi-cham hatha?', 'How much is this?', 1),
  ('b1400000-0000-0000-0000-000000000005', 'غالي', 'ghaalee', 'Expensive', 2),
  ('b1400000-0000-0000-0000-000000000005', 'رخيص', 'rakheeS', 'Cheap', 3),
  ('b1400000-0000-0000-0000-000000000005', 'كم درهم؟', 'kam dirham?', 'How many dirhams?', 4)
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (lesson_id, question, correct_answer, wrong_answers, "order") VALUES
  ('b1400000-0000-0000-0000-000000000006', 'How do you say "How much is this?" in Emirati?', 'bi-cham hatha?', '["wain hatha?", "shoo hatha?", "mita hatha?"]', 1),
  ('b1400000-0000-0000-0000-000000000006', 'What does "ghaalee" mean?', 'Expensive', '["Cheap", "Beautiful", "Good"]', 2),
  ('b1400000-0000-0000-0000-000000000006', 'How do you say "fifty"?', 'khamseen', '["khams", "khamsTashar", "khamsmeya"]', 3),
  ('b1400000-0000-0000-0000-000000000006', 'What is "alf"?', 'One thousand', '["One hundred", "One million", "Ten"]', 4)
ON CONFLICT DO NOTHING;

-- ============================================================
-- LEVEL 2: DAILY LIFE CONVERSATIONS (PREMIUM)
-- ============================================================

INSERT INTO modules (id, title, slug, description, level, level_title, "order", is_premium) VALUES
  ('a2000000-0000-0000-0000-000000000001', 'Home + Furniture', 'home-furniture',
   'Talk about your living space in Emirati Arabic', 2, 'Daily Life Conversations', 7, true),
  ('a2000000-0000-0000-0000-000000000002', 'Food + Ordering', 'food-ordering',
   'Order food confidently at restaurants', 2, 'Daily Life Conversations', 8, true),
  ('a2000000-0000-0000-0000-000000000003', 'Time + Days + Plans', 'time-days-plans',
   'Talk about schedules and make plans', 2, 'Daily Life Conversations', 9, true),
  ('a2000000-0000-0000-0000-000000000004', 'Emotions + Daily States', 'emotions-daily-states',
   'Express how you feel in Gulf Arabic', 2, 'Daily Life Conversations', 10, true)
ON CONFLICT (slug) DO NOTHING;

-- Module 2.1: Home + Furniture — 5 lessons
INSERT INTO lessons (id, module_id, title, slug, type, "order", duration_seconds, is_premium) VALUES
  ('b2100000-0000-0000-0000-000000000001', 'a2000000-0000-0000-0000-000000000001',
   'House Rooms', 'house-rooms', 'phrase_card', 1, 300, true),
  ('b2100000-0000-0000-0000-000000000002', 'a2000000-0000-0000-0000-000000000001',
   'Kitchen Items', 'kitchen-items', 'phrase_card', 2, 300, true),
  ('b2100000-0000-0000-0000-000000000003', 'a2000000-0000-0000-0000-000000000001',
   'Living Room', 'living-room-vocab', 'phrase_card', 3, 300, true),
  ('b2100000-0000-0000-0000-000000000004', 'a2000000-0000-0000-0000-000000000001',
   'Bedroom Items', 'bedroom-items', 'phrase_card', 4, 300, true),
  ('b2100000-0000-0000-0000-000000000005', 'a2000000-0000-0000-0000-000000000001',
   'Quiz: Describe Your Home', 'home-quiz', 'quiz', 5, 600, true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b2100000-0000-0000-0000-000000000001', 'بيت', 'bait', 'House', 1),
  ('b2100000-0000-0000-0000-000000000001', 'غرفة', 'ghurfa', 'Room', 2),
  ('b2100000-0000-0000-0000-000000000001', 'صالة', 'Sala', 'Living room', 3),
  ('b2100000-0000-0000-0000-000000000001', 'مطبخ', 'maTbakh', 'Kitchen', 4),
  ('b2100000-0000-0000-0000-000000000001', 'حمام', '7ammam', 'Bathroom', 5),
  ('b2100000-0000-0000-0000-000000000001', 'غرفة النوم', 'ghurfat in-noom', 'Bedroom', 6),
  ('b2100000-0000-0000-0000-000000000001', 'حديقة', '7adeega', 'Garden', 7)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b2100000-0000-0000-0000-000000000002', 'طبخ', 'Tabakh', 'Cooking', 1),
  ('b2100000-0000-0000-0000-000000000002', 'سفرة', 'Sifrah', 'Dining table', 2),
  ('b2100000-0000-0000-0000-000000000002', 'كرسي', 'kursi', 'Chair', 3),
  ('b2100000-0000-0000-0000-000000000002', 'كاس', 'kas', 'Cup / Glass', 4),
  ('b2100000-0000-0000-0000-000000000002', 'ملعقة', 'milga', 'Spoon', 5),
  ('b2100000-0000-0000-0000-000000000002', 'شوكة', 'shokah', 'Fork', 6),
  ('b2100000-0000-0000-0000-000000000002', 'سكين', 'sikkeen', 'Knife', 7)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b2100000-0000-0000-0000-000000000003', 'كنبة', 'kanaba', 'Sofa', 1),
  ('b2100000-0000-0000-0000-000000000003', 'طاولة', 'Taawla', 'Table', 2),
  ('b2100000-0000-0000-0000-000000000003', 'تلفزيون', 'tilifizyon', 'TV', 3),
  ('b2100000-0000-0000-0000-000000000003', 'مراية', 'miraya', 'Mirror', 4),
  ('b2100000-0000-0000-0000-000000000003', 'سجادة', 'sujjada', 'Carpet', 5)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b2100000-0000-0000-0000-000000000004', 'سرير', 'sireer', 'Bed', 1),
  ('b2100000-0000-0000-0000-000000000004', 'مخدة', 'mikhada', 'Pillow', 2),
  ('b2100000-0000-0000-0000-000000000004', 'لفحاف', 'lif7aaf', 'Blanket', 3),
  ('b2100000-0000-0000-0000-000000000004', 'دولاب', 'dawlaa', 'Wardrobe', 4)
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (lesson_id, question, correct_answer, wrong_answers, "order") VALUES
  ('b2100000-0000-0000-0000-000000000005', 'What does "maTbakh" mean?', 'Kitchen', '["Bedroom", "Bathroom", "Living room"]', 1),
  ('b2100000-0000-0000-0000-000000000005', 'How do you say "sofa"?', 'kanaba', '["kursi", "sireer", "Taawla"]', 2),
  ('b2100000-0000-0000-0000-000000000005', 'What is "ghurfat in-noom"?', 'Bedroom', '["Bathroom", "Kitchen", "Garden"]', 3)
ON CONFLICT DO NOTHING;

-- Module 2.2: Food + Ordering — 8 lessons
INSERT INTO lessons (id, module_id, title, slug, type, "order", duration_seconds, is_premium) VALUES
  ('b2200000-0000-0000-0000-000000000001', 'a2000000-0000-0000-0000-000000000002',
   'Meals of the Day', 'meals-of-the-day', 'phrase_card', 1, 300, true),
  ('b2200000-0000-0000-0000-000000000002', 'a2000000-0000-0000-0000-000000000002',
   'Basic Food Items', 'basic-food-items', 'phrase_card', 2, 300, true),
  ('b2200000-0000-0000-0000-000000000003', 'a2000000-0000-0000-0000-000000000002',
   'Common Emirati Dishes', 'emirati-dishes', 'phrase_card', 3, 300, true),
  ('b2200000-0000-0000-0000-000000000004', 'a2000000-0000-0000-0000-000000000002',
   'At the Restaurant', 'at-the-restaurant', 'phrase_card', 4, 300, true),
  ('b2200000-0000-0000-0000-000000000005', 'a2000000-0000-0000-0000-000000000002',
   'Drinks', 'drinks-vocab', 'phrase_card', 5, 300, true),
  ('b2200000-0000-0000-0000-000000000006', 'a2000000-0000-0000-0000-000000000002',
   'I Want / I Don''t Want', 'i-want-dont-want', 'phrase_card', 6, 300, true),
  ('b2200000-0000-0000-0000-000000000007', 'a2000000-0000-0000-0000-000000000002',
   'Compliments on Food', 'food-compliments', 'phrase_card', 7, 300, true),
  ('b2200000-0000-0000-0000-000000000008', 'a2000000-0000-0000-0000-000000000002',
   'Quiz: Order a Meal', 'food-quiz', 'quiz', 8, 600, true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b2200000-0000-0000-0000-000000000001', 'فطور', 'fiToor', 'Breakfast', 1),
  ('b2200000-0000-0000-0000-000000000001', 'غداء', 'ghada', 'Lunch', 2),
  ('b2200000-0000-0000-0000-000000000001', 'عشاء', '3asha', 'Dinner', 3)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b2200000-0000-0000-0000-000000000002', 'خبز', 'khubiz', 'Bread', 1),
  ('b2200000-0000-0000-0000-000000000002', 'رز', 'ruz', 'Rice', 2),
  ('b2200000-0000-0000-0000-000000000002', 'لحم', 'laham', 'Meat', 3),
  ('b2200000-0000-0000-0000-000000000002', 'دجاج', 'dijaj', 'Chicken', 4),
  ('b2200000-0000-0000-0000-000000000002', 'سمك', 'samak', 'Fish', 5),
  ('b2200000-0000-0000-0000-000000000002', 'بيض', 'baiD', 'Eggs', 6)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b2200000-0000-0000-0000-000000000003', 'مچبوس', 'machboos', 'Spiced rice with meat — national dish', 1),
  ('b2200000-0000-0000-0000-000000000003', 'هريس', 'harees', 'Wheat and meat porridge', 2),
  ('b2200000-0000-0000-0000-000000000003', 'لقيمات', 'luqaimat', 'Sweet fried dumplings with date syrup', 3),
  ('b2200000-0000-0000-0000-000000000003', 'بلاليط', 'balaleet', 'Sweet vermicelli with eggs', 4)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b2200000-0000-0000-0000-000000000004', 'أبي...', 'abee...', 'I want...', 1),
  ('b2200000-0000-0000-0000-000000000004', 'جيب لي...', 'jeeb-lee...', 'Bring me...', 2),
  ('b2200000-0000-0000-0000-000000000004', 'بالعافية', 'bil-3afya', 'Enjoy your meal (said to someone eating)', 3),
  ('b2200000-0000-0000-0000-000000000004', 'جيب لي الحساب', 'jeeb-lee il-7isab', 'Bring me the bill', 4)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b2200000-0000-0000-0000-000000000005', 'قهوة', 'gahwa', 'Coffee (Gulf: cardamom coffee)', 1),
  ('b2200000-0000-0000-0000-000000000005', 'شاي', 'shay', 'Tea', 2),
  ('b2200000-0000-0000-0000-000000000005', 'عصير', '3aSeer', 'Juice', 3),
  ('b2200000-0000-0000-0000-000000000005', 'ماي', 'mayy', 'Water', 4),
  ('b2200000-0000-0000-0000-000000000005', 'حليب', '7aleeb', 'Milk', 5)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b2200000-0000-0000-0000-000000000006', 'أبي قهوة', 'abee gahwa', 'I want coffee', 1),
  ('b2200000-0000-0000-0000-000000000006', 'ما أبي سكر', 'ma abee sukkar', 'I don''t want sugar', 2),
  ('b2200000-0000-0000-0000-000000000006', 'أبي مچبوس دجاج', 'abee machboos dijaj', 'I want chicken machboos', 3)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b2200000-0000-0000-0000-000000000007', 'زين', 'zain', 'Good / Delicious', 1),
  ('b2200000-0000-0000-0000-000000000007', 'طيب', 'Teeb', 'Tasty', 2),
  ('b2200000-0000-0000-0000-000000000007', 'تكة', 'Tikka', 'Very good (slang)', 3),
  ('b2200000-0000-0000-0000-000000000007', 'موب زين', 'moo zaiin', 'Not good', 4)
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (lesson_id, question, correct_answer, wrong_answers, "order") VALUES
  ('b2200000-0000-0000-0000-000000000008', 'How do you say "I want coffee"?', 'abee gahwa', '["jeeb-lee gahwa", "ma abee gahwa", "abee shay"]', 1),
  ('b2200000-0000-0000-0000-000000000008', 'What is machboos?', 'Spiced rice with meat', '["Sweet dumplings", "Wheat porridge", "Sweet vermicelli"]', 2),
  ('b2200000-0000-0000-0000-000000000008', 'How do you ask for the bill?', 'jeeb-lee il-7isab', '["abee gahwa", "bil-3afya", "ma abee sukkar"]', 3),
  ('b2200000-0000-0000-0000-000000000008', 'What does "Teeb" mean?', 'Tasty', '["Not good", "Expensive", "Bring me"]', 4)
ON CONFLICT DO NOTHING;

-- Module 2.3: Time + Days + Plans — 7 lessons
INSERT INTO lessons (id, module_id, title, slug, type, "order", duration_seconds, is_premium) VALUES
  ('b2300000-0000-0000-0000-000000000001', 'a2000000-0000-0000-0000-000000000003',
   'Today / Tomorrow / Yesterday', 'today-tomorrow', 'phrase_card', 1, 300, true),
  ('b2300000-0000-0000-0000-000000000002', 'a2000000-0000-0000-0000-000000000003',
   'Morning / Evening / Night', 'times-of-day', 'phrase_card', 2, 300, true),
  ('b2300000-0000-0000-0000-000000000003', 'a2000000-0000-0000-0000-000000000003',
   'Days of the Week', 'days-of-week', 'phrase_card', 3, 300, true),
  ('b2300000-0000-0000-0000-000000000004', 'a2000000-0000-0000-0000-000000000003',
   'Making Plans', 'making-plans', 'phrase_card', 4, 300, true),
  ('b2300000-0000-0000-0000-000000000005', 'a2000000-0000-0000-0000-000000000003',
   'Time Expressions', 'time-expressions', 'phrase_card', 5, 300, true),
  ('b2300000-0000-0000-0000-000000000006', 'a2000000-0000-0000-0000-000000000003',
   'Agreeing to Plans', 'agreeing-plans', 'phrase_card', 6, 300, true),
  ('b2300000-0000-0000-0000-000000000007', 'a2000000-0000-0000-0000-000000000003',
   'Quiz: Schedule a Meeting', 'time-quiz', 'quiz', 7, 600, true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b2300000-0000-0000-0000-000000000001', 'اليوم', 'ilyoom', 'Today', 1),
  ('b2300000-0000-0000-0000-000000000001', 'بكرة', 'bukra', 'Tomorrow', 2),
  ('b2300000-0000-0000-0000-000000000001', 'أمس', 'ams', 'Yesterday', 3)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b2300000-0000-0000-0000-000000000002', 'صبح', 'SubuH', 'Morning', 1),
  ('b2300000-0000-0000-0000-000000000002', 'ضهر', 'DHuhur', 'Noon', 2),
  ('b2300000-0000-0000-0000-000000000002', 'مساء', 'masa', 'Evening', 3),
  ('b2300000-0000-0000-0000-000000000002', 'ليل', 'lail', 'Night', 4)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b2300000-0000-0000-0000-000000000003', 'يوم الحد', 'yoom il-7ad', 'Sunday', 1),
  ('b2300000-0000-0000-0000-000000000003', 'يوم الاثنين', 'yoom il-ithain', 'Monday', 2),
  ('b2300000-0000-0000-0000-000000000003', 'يوم الثلاثاء', 'yoom il-thalatha', 'Tuesday', 3),
  ('b2300000-0000-0000-0000-000000000003', 'يوم الأربعاء', 'yoom il-arbi3a', 'Wednesday', 4),
  ('b2300000-0000-0000-0000-000000000003', 'يوم الخميس', 'yoom il-khamees', 'Thursday', 5),
  ('b2300000-0000-0000-0000-000000000003', 'يوم الجمعة', 'yoom il-yuma', 'Friday', 6),
  ('b2300000-0000-0000-0000-000000000003', 'يوم السبت', 'yoom is-sabit', 'Saturday', 7)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b2300000-0000-0000-0000-000000000004', 'نروح', 'n-roo7', 'Let''s go', 1),
  ('b2300000-0000-0000-0000-000000000004', 'يلا', 'yalla', 'Come on / Let''s go', 2),
  ('b2300000-0000-0000-0000-000000000004', 'تبي؟', 'tabe?', 'Do you want to?', 3),
  ('b2300000-0000-0000-0000-000000000004', 'كيف نخي؟', 'keaf nukhi?', 'How about we...?', 4)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b2300000-0000-0000-0000-000000000005', 'بعدين', 'ba3dain', 'Later', 1),
  ('b2300000-0000-0000-0000-000000000005', 'الحين', 'il-7een', 'Now', 2),
  ('b2300000-0000-0000-0000-000000000005', 'قبل', 'gabal', 'Before', 3),
  ('b2300000-0000-0000-0000-000000000005', 'عقب', '3ugub', 'After', 4)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b2300000-0000-0000-0000-000000000006', 'ماشي', 'maashee', 'Okay / Deal', 1),
  ('b2300000-0000-0000-0000-000000000006', 'تمام', 'tamaam', 'Perfect', 2),
  ('b2300000-0000-0000-0000-000000000006', 'على طول', '3alaa Tool', 'Right away', 3)
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (lesson_id, question, correct_answer, wrong_answers, "order") VALUES
  ('b2300000-0000-0000-0000-000000000007', 'How do you say "tomorrow"?', 'bukra', '["ilyoom", "ams", "ba3dain"]', 1),
  ('b2300000-0000-0000-0000-000000000007', 'What does "yalla" mean?', 'Come on / Let''s go', '["Okay", "Later", "Now"]', 2),
  ('b2300000-0000-0000-0000-000000000007', 'How do you say "Friday"?', 'yoom il-yuma', '["yoom il-7ad", "yoom is-sabit", "yoom il-khamees"]', 3),
  ('b2300000-0000-0000-0000-000000000007', 'What does "tamaam" mean?', 'Perfect', '["Later", "Now", "Let''s go"]', 4)
ON CONFLICT DO NOTHING;

-- Module 2.4: Emotions + Daily States — 6 lessons
INSERT INTO lessons (id, module_id, title, slug, type, "order", duration_seconds, is_premium) VALUES
  ('b2400000-0000-0000-0000-000000000001', 'a2000000-0000-0000-0000-000000000004',
   'Hungry / Thirsty / Full', 'hungry-thirsty', 'phrase_card', 1, 300, true),
  ('b2400000-0000-0000-0000-000000000002', 'a2000000-0000-0000-0000-000000000004',
   'Tired / Sleepy', 'tired-sleepy', 'phrase_card', 2, 300, true),
  ('b2400000-0000-0000-0000-000000000003', 'a2000000-0000-0000-0000-000000000004',
   'Happy / Sad / Upset', 'happy-sad-upset', 'phrase_card', 3, 300, true),
  ('b2400000-0000-0000-0000-000000000004', 'a2000000-0000-0000-0000-000000000004',
   'Bored / Busy', 'bored-busy', 'phrase_card', 4, 300, true),
  ('b2400000-0000-0000-0000-000000000005', 'a2000000-0000-0000-0000-000000000004',
   'Nervous / Scared', 'nervous-scared', 'phrase_card', 5, 300, true),
  ('b2400000-0000-0000-0000-000000000006', 'a2000000-0000-0000-0000-000000000004',
   'Quiz: How Do You Feel?', 'emotions-quiz', 'quiz', 6, 600, true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b2400000-0000-0000-0000-000000000001', 'جوعان', 'yoo3aan', 'Hungry', 1),
  ('b2400000-0000-0000-0000-000000000001', 'عطشان', '3aT-shaan', 'Thirsty', 2),
  ('b2400000-0000-0000-0000-000000000001', 'شبعان', 'shab3aan', 'Full', 3)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b2400000-0000-0000-0000-000000000002', 'تعبان', 'ta3baan', 'Tired', 1),
  ('b2400000-0000-0000-0000-000000000002', 'نعسان', 'na3saan', 'Sleepy', 2),
  ('b2400000-0000-0000-0000-000000000002', 'مرتاح', 'mirtaa7', 'Relaxed / Comfortable', 3)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b2400000-0000-0000-0000-000000000003', 'فرحان', 'far7aan', 'Happy', 1),
  ('b2400000-0000-0000-0000-000000000003', 'زعلان', 'za3laan', 'Upset / Angry', 2),
  ('b2400000-0000-0000-0000-000000000003', 'حزين', '7azeen', 'Sad', 3),
  ('b2400000-0000-0000-0000-000000000003', 'مبسوط', 'mabsooT', 'Happy / Content', 4)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b2400000-0000-0000-0000-000000000004', 'ملان', 'mil-laan', 'Bored', 1),
  ('b2400000-0000-0000-0000-000000000004', 'زلقان', 'zilgaan', 'Bored (slang)', 2),
  ('b2400000-0000-0000-0000-000000000004', 'مشغول', 'mashghool', 'Busy', 3)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b2400000-0000-0000-0000-000000000005', 'خايف', 'kha-yif', 'Scared', 1),
  ('b2400000-0000-0000-0000-000000000005', 'متورطر', 'mitwartiir', 'Nervous', 2),
  ('b2400000-0000-0000-0000-000000000005', 'صلفة', 'Salfa', 'A big deal / An issue', 3)
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (lesson_id, question, correct_answer, wrong_answers, "order") VALUES
  ('b2400000-0000-0000-0000-000000000006', 'How do you say "I am tired"?', 'ana ta3baan', '["ana far7aan", ''"ana za3laan"'', '"ana mabsooT"'']', 1),
  ('b2400000-0000-0000-0000-000000000006', 'What does "3aT-shaan" mean?', 'Thirsty', '["Hungry", "Full", "Sleepy"]', 2),
  ('b2400000-0000-0000-0000-000000000006', 'What does "mashghool" mean?', 'Busy', '["Bored", "Scared", "Happy"]', 3)
ON CONFLICT DO NOTHING;

-- ============================================================
-- LEVEL 3: SOCIAL EMIRATI (PREMIUM)
-- ============================================================

INSERT INTO modules (id, title, slug, description, level, level_title, "order", is_premium) VALUES
  ('a3000000-0000-0000-0000-000000000001', 'Relationships + Family', 'relationships-family',
   'Talk about family and social connections in Gulf Arabic', 3, 'Social Emirati', 11, true),
  ('a3000000-0000-0000-0000-000000000002', 'Compliments + Adjectives', 'compliments-adjectives',
   'Describe people, places and things with natural Gulf flair', 3, 'Social Emirati', 12, true),
  ('a3000000-0000-0000-0000-000000000003', 'Love + Endearment', 'love-endearment',
   'Warm, affectionate expressions that make you sound like a local', 3, 'Social Emirati', 13, true)
ON CONFLICT (slug) DO NOTHING;

-- Module 3.1: Relationships + Family — 6 lessons
INSERT INTO lessons (id, module_id, title, slug, type, "order", duration_seconds, is_premium) VALUES
  ('b3100000-0000-0000-0000-000000000001', 'a3000000-0000-0000-0000-000000000001',
   'Immediate Family', 'immediate-family', 'phrase_card', 1, 300, true),
  ('b3100000-0000-0000-0000-000000000002', 'a3000000-0000-0000-0000-000000000001',
   'Extended Family', 'extended-family', 'phrase_card', 2, 300, true),
  ('b3100000-0000-0000-0000-000000000003', 'a3000000-0000-0000-0000-000000000001',
   'Friends', 'friends-vocab', 'phrase_card', 3, 300, true),
  ('b3100000-0000-0000-0000-000000000004', 'a3000000-0000-0000-0000-000000000001',
   'Relationships', 'relationships-vocab', 'phrase_card', 4, 300, true),
  ('b3100000-0000-0000-0000-000000000005', 'a3000000-0000-0000-0000-000000000001',
   'Marriage Terms', 'marriage-terms', 'phrase_card', 5, 300, true),
  ('b3100000-0000-0000-0000-000000000006', 'a3000000-0000-0000-0000-000000000001',
   'Quiz: Introduce Your Family', 'family-quiz', 'quiz', 6, 600, true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b3100000-0000-0000-0000-000000000001', 'بابا / الوالد', 'baba / il-waaled', 'Father', 1),
  ('b3100000-0000-0000-0000-000000000001', 'ماما / الوالدة', 'mama / il-waalda', 'Mother', 2),
  ('b3100000-0000-0000-0000-000000000001', 'أخ', 'akh', 'Brother', 3),
  ('b3100000-0000-0000-0000-000000000001', 'أخت', 'ukht', 'Sister', 4),
  ('b3100000-0000-0000-0000-000000000001', 'ابن', 'ibn', 'Son', 5),
  ('b3100000-0000-0000-0000-000000000001', 'بنت', 'bint', 'Daughter', 6)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b3100000-0000-0000-0000-000000000002', 'جد', 'jid', 'Grandfather', 1),
  ('b3100000-0000-0000-0000-000000000002', 'يدة', 'yidda', 'Grandmother', 2),
  ('b3100000-0000-0000-0000-000000000002', 'عم', '3am', 'Paternal uncle', 3),
  ('b3100000-0000-0000-0000-000000000002', 'خال', 'khal', 'Maternal uncle', 4),
  ('b3100000-0000-0000-0000-000000000002', 'عمة', '3amma', 'Paternal aunt', 5),
  ('b3100000-0000-0000-0000-000000000002', 'خالة', 'khaala', 'Maternal aunt', 6)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b3100000-0000-0000-0000-000000000003', 'صديق', 'Sadiig', 'Friend (masculine)', 1),
  ('b3100000-0000-0000-0000-000000000003', 'صديقة', 'Sadiiqa', 'Friend (feminine)', 2),
  ('b3100000-0000-0000-0000-000000000003', 'رفيق', 'rifiig', 'Close friend', 3),
  ('b3100000-0000-0000-0000-000000000003', 'ربعي / رفيجي', 'rabi3 / rafeeji', 'My buddy', 4)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b3100000-0000-0000-0000-000000000004', 'زوج', 'zawj', 'Husband', 1),
  ('b3100000-0000-0000-0000-000000000004', 'زوجة', 'zawja', 'Wife', 2),
  ('b3100000-0000-0000-0000-000000000004', 'خطيب', 'khaTiib', 'Fiancé', 3),
  ('b3100000-0000-0000-0000-000000000004', 'خطيبة', 'khaTiiba', 'Fiancée', 4)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b3100000-0000-0000-0000-000000000005', 'عرس', '3urs', 'Wedding', 1),
  ('b3100000-0000-0000-0000-000000000005', 'زواج', 'zwaaj', 'Marriage', 2),
  ('b3100000-0000-0000-0000-000000000005', 'طلاق', 'Tilaag', 'Divorce', 3)
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (lesson_id, question, correct_answer, wrong_answers, "order") VALUES
  ('b3100000-0000-0000-0000-000000000006', 'How do you say "sister"?', 'ukht', '["akh", "bint", "zawja"]', 1),
  ('b3100000-0000-0000-0000-000000000006', 'What does "jid" mean?', 'Grandfather', '["Grandmother", "Uncle", "Father"]', 2),
  ('b3100000-0000-0000-0000-000000000006', 'What is "rafeeji"?', 'My buddy / close friend', '["My brother", "My father", "My wife"]', 3)
ON CONFLICT DO NOTHING;

-- Module 3.2: Compliments + Adjectives — 7 lessons
INSERT INTO lessons (id, module_id, title, slug, type, "order", duration_seconds, is_premium) VALUES
  ('b3200000-0000-0000-0000-000000000001', 'a3000000-0000-0000-0000-000000000002',
   'Nice / Beautiful', 'nice-beautiful', 'phrase_card', 1, 300, true),
  ('b3200000-0000-0000-0000-000000000002', 'a3000000-0000-0000-0000-000000000002',
   'Big / Small', 'big-small', 'phrase_card', 2, 300, true),
  ('b3200000-0000-0000-0000-000000000003', 'a3000000-0000-0000-0000-000000000002',
   'Expensive / Cheap', 'expensive-cheap', 'phrase_card', 3, 300, true),
  ('b3200000-0000-0000-0000-000000000004', 'a3000000-0000-0000-0000-000000000002',
   'Clean / Dirty', 'clean-dirty', 'phrase_card', 4, 300, true),
  ('b3200000-0000-0000-0000-000000000005', 'a3000000-0000-0000-0000-000000000002',
   'Fast / Slow', 'fast-slow', 'phrase_card', 5, 300, true),
  ('b3200000-0000-0000-0000-000000000006', 'a3000000-0000-0000-0000-000000000002',
   'New / Old', 'new-old', 'phrase_card', 6, 300, true),
  ('b3200000-0000-0000-0000-000000000007', 'a3000000-0000-0000-0000-000000000002',
   'Quiz: Describe Objects', 'adjectives-quiz', 'quiz', 7, 600, true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b3200000-0000-0000-0000-000000000001', 'حلو / زين', '7ilo / zain', 'Nice / Good', 1),
  ('b3200000-0000-0000-0000-000000000001', 'يميل / يميلة', 'yameel / yameela', 'Beautiful', 2),
  ('b3200000-0000-0000-0000-000000000001', 'قشيح', 'gasheeh', 'Ugly (slang)', 3)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b3200000-0000-0000-0000-000000000002', 'چبيرة', 'chbeera', 'Big', 1),
  ('b3200000-0000-0000-0000-000000000002', 'صغير / صغيرة', 'Sgheer / Sgheera', 'Small', 2)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b3200000-0000-0000-0000-000000000003', 'غالي', 'ghaalee', 'Expensive', 1),
  ('b3200000-0000-0000-0000-000000000003', 'رخيص', 'rakheeS', 'Cheap', 2)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b3200000-0000-0000-0000-000000000004', 'نظيف', 'naDHeef', 'Clean', 1),
  ('b3200000-0000-0000-0000-000000000004', 'وسخ', 'wasikh', 'Dirty', 2)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b3200000-0000-0000-0000-000000000005', 'سريع', 'saree3', 'Fast', 1),
  ('b3200000-0000-0000-0000-000000000005', 'بطيء', 'baTeei', 'Slow', 2)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b3200000-0000-0000-0000-000000000006', 'جديد', 'yadeed', 'New', 1),
  ('b3200000-0000-0000-0000-000000000006', 'قديمة', 'gadeema', 'Old', 2)
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (lesson_id, question, correct_answer, wrong_answers, "order") VALUES
  ('b3200000-0000-0000-0000-000000000007', 'How do you say "big" in Gulf Arabic?', 'chbeera', '["Sgheera", "yadeed", "saree3"]', 1),
  ('b3200000-0000-0000-0000-000000000007', 'What does "naDHeef" mean?', 'Clean', '["Dirty", "New", "Fast"]', 2),
  ('b3200000-0000-0000-0000-000000000007', 'How do you say "beautiful" (feminine) in Gulf?', 'yameela', '["gasheeh", "7ilo", "zain"]', 3)
ON CONFLICT DO NOTHING;

-- Module 3.3: Love + Endearment — 6 lessons
INSERT INTO lessons (id, module_id, title, slug, type, "order", duration_seconds, is_premium) VALUES
  ('b3300000-0000-0000-0000-000000000001', 'a3000000-0000-0000-0000-000000000003',
   'Terms of Endearment', 'terms-of-endearment', 'phrase_card', 1, 300, true),
  ('b3300000-0000-0000-0000-000000000002', 'a3000000-0000-0000-0000-000000000003',
   'Protective Phrases', 'protective-phrases', 'phrase_card', 2, 300, true),
  ('b3300000-0000-0000-0000-000000000003', 'a3000000-0000-0000-0000-000000000003',
   'Praise Phrases', 'praise-phrases', 'phrase_card', 3, 300, true),
  ('b3300000-0000-0000-0000-000000000004', 'a3000000-0000-0000-0000-000000000003',
   'Friendship Warmth', 'friendship-warmth', 'phrase_card', 4, 300, true),
  ('b3300000-0000-0000-0000-000000000005', 'a3000000-0000-0000-0000-000000000003',
   'Phrases for Children', 'phrases-for-children', 'phrase_card', 5, 300, true),
  ('b3300000-0000-0000-0000-000000000006', 'a3000000-0000-0000-0000-000000000003',
   'Quiz: Use Endearment Appropriately', 'endearment-quiz', 'quiz', 6, 600, true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b3300000-0000-0000-0000-000000000001', 'يا قلبي', 'ya galbi', 'My heart', 1),
  ('b3300000-0000-0000-0000-000000000001', 'حياتي', '7ayaati', 'My life', 2),
  ('b3300000-0000-0000-0000-000000000001', 'غالي / غالية', 'ghaali / ghaalya', 'Precious / Dear', 3),
  ('b3300000-0000-0000-0000-000000000001', 'عزيزي / عزيزتي', '3azio / 3azeeza', 'Dear / Beloved', 4)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b3300000-0000-0000-0000-000000000002', 'في ديدتك', 'fi-deitak', 'It''s in your hands — shows trust', 1),
  ('b3300000-0000-0000-0000-000000000002', 'الله يخليك لي', 'Allah ykhalleek lee', 'May God keep you for me', 2),
  ('b3300000-0000-0000-0000-000000000002', 'على راسي', '3ala raasi', 'On my head — I''ll gladly do it', 3)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b3300000-0000-0000-0000-000000000003', 'ما شاء الله', 'mashallah', 'God willed it — said when admiring', 1),
  ('b3300000-0000-0000-0000-000000000003', 'بركة الله فيك', 'barakat Allah feek', 'God''s blessings on you', 2),
  ('b3300000-0000-0000-0000-000000000003', 'الله يبارك فيك', 'Allah ybarik feek', 'God bless you', 3)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b3300000-0000-0000-0000-000000000004', 'ربعي', 'rabi3', 'My buddy', 1),
  ('b3300000-0000-0000-0000-000000000004', 'يا ريال', 'ya rayyaal', 'Hey man', 2),
  ('b3300000-0000-0000-0000-000000000004', 'يا أخوي', 'ya akhoi', 'My brother', 3)
ON CONFLICT DO NOTHING;

INSERT INTO phrases (lesson_id, arabic_text, transliteration, english_meaning, "order") VALUES
  ('b3300000-0000-0000-0000-000000000005', 'يا حبيبي', 'ya 7abeebi', 'My dear (to a child)', 1),
  ('b3300000-0000-0000-0000-000000000005', 'يا عيني', 'ya 3aini', 'My eye (very affectionate)', 2),
  ('b3300000-0000-0000-0000-000000000005', 'حبيبي', '7ibibi', 'My beloved', 3)
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (lesson_id, question, correct_answer, wrong_answers, "order") VALUES
  ('b3300000-0000-0000-0000-000000000006', 'What does "mashallah" express?', 'Admiration / God willed it', '["Goodbye", "I''m tired", "Thank you"]', 1),
  ('b3300000-0000-0000-0000-000000000006', 'What does "ya galbi" literally mean?', 'My heart', '["My life", "My eye", "My buddy"]', 2),
  ('b3300000-0000-0000-0000-000000000006', 'What does "3ala raasi" mean?', 'On my head — I''ll gladly do it', '["God bless you", "My heart", "May God keep you"]', 3)
ON CONFLICT DO NOTHING;
