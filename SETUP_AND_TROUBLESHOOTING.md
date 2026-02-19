# Khaleeji — Setup & Troubleshooting

## What You Have Now (Summary)

### App structure (no auth, no payments)
- **`/`** — Landing page (hero, how it works, sample phrases, CTA to courses).
- **`/courses`** — Lists **all modules** from the database. Each card shows title, description snippet, lesson count, and “Start Learning” → module page.
- **`/courses/[moduleSlug]`** — Shows **one module** (e.g. “Gulf Greetings & Basics”) and a **list of its lessons**. Each row links to a lesson.
- **`/lessons/[lessonSlug]`** — Shows **one lesson**: phrase cards, quiz, or audio placeholder, plus Prev/Next.

### Where the data comes from
All course content is read from **Supabase**:

| Page            | What it reads |
|-----------------|----------------|
| `/courses`      | `modules` table + lesson count from `lessons` |
| `/courses/[slug]` | One row from `modules` + all rows from `lessons` for that module |
| `/lessons/[slug]` | One row from `lessons` (+ module), then `phrases` or `quiz_questions` depending on type |

So if **no modules** appear on `/courses`, the app is either not talking to Supabase, or the `modules` table is empty / not visible.

---

## Why You Might See No Courses/Modules

### 1. Migrations not run, or wrong order

The app expects these **three** migrations to be run in **this exact order** in the Supabase SQL Editor:

| Order | File | What it does |
|-------|------|----------------|
| 1 | `001_initial_schema.sql` | Creates tables: `profiles`, `modules`, `lessons`, `phrases`, `quiz_questions`, `user_progress`, RLS, trigger |
| 2 | `002_seed_data.sql` | **Inserts** 5 modules and 5 lessons (plus phrases and quiz questions) into `modules` and `lessons` |
| 3 | `003_simplify_mvp.sql` | Drops `profiles`, `user_progress`, drops `is_premium` from `modules` and `lessons`, disables RLS on content tables |

- If you **never ran 002**, `modules` is empty → nothing on `/courses`.
- If you **ran 003 before 002**, then 002’s `INSERT` statements fail (they use `is_premium`, which 003 removes). So you get no (or incomplete) data.

**Fix:** Run in order: **001 → 002 → 003**. If you already ran 003 first, see “If you already ran 003 before 002” below.

---

### 2. Wrong Supabase project or env

The app reads from whatever project is in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL` — e.g. `https://xxxxx.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — anon/public key

If these point to a **different** project than the one where you ran the migrations, you’ll see no data.

**Fix:** In Supabase dashboard, open **Project Settings → API** and copy:
- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Restart the dev server after changing `.env.local` (`npm run dev`).

---

### 3. Looking at the wrong page

- **`/`** (home) = landing only. It does **not** load modules.
- **`/courses`** = page that loads and shows modules.

**Fix:** Open **http://localhost:3000/courses** (or your deployed URL + `/courses`). The “All Courses” page is the one that lists modules.

---

### 4. RLS / permissions (if you didn’t run 003)

If you only ran 001 and 002, RLS is still on. The “Modules are viewable by everyone” policy should allow reads. If you changed or removed that policy, the anon key might not be allowed to read `modules`.

**Fix:** Either run **003** (it disables RLS on `modules`, `lessons`, `phrases`, `quiz_questions`), or in Supabase **Table Editor → modules** check that the anon key can read (e.g. no extra restrictive policies).

---

## Step-by-step: “I see no courses”

Do this in order:

1. **Confirm you’re on the courses page**  
   Go to: `http://localhost:3000/courses`.

2. **Confirm env**  
   In `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` = full URL (e.g. `https://xxxxx.supabase.co`)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon key from the same project.  
   Restart dev server.

3. **Check Supabase tables**  
   In Supabase **Table Editor**:
   - Open **`modules`**. You should see at least one row (e.g. “Gulf Greetings & Basics”).
   - If `modules` is empty, you need to run the migrations (see below).

4. **Run migrations in the right order**  
   In Supabase **SQL Editor**, run **one file at a time**, in this order:
   - Run **all** of `001_initial_schema.sql` → Run.
   - Run **all** of `002_seed_data.sql` → Run.
   - Run **all** of `003_simplify_mvp.sql` → Run.  
   Then reload **http://localhost:3000/courses**. You should see 5 modules.

5. **If 002 fails with “column is_premium does not exist”**  
   You ran 003 before 002, so `modules`/`lessons` no longer have `is_premium`. Either:
   - **Option A:** Create a new Supabase project and run **001 → 002 → 003** in order, then point `.env.local` at this new project.  
   - **Option B:** In the same project, add the column back, run 002, then run 003 again:
     - Run:
       - `ALTER TABLE modules ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT false;`
       - `ALTER TABLE lessons ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT false;`
     - Then run the full **002_seed_data.sql** again.
     - Then run **003_simplify_mvp.sql** again.

---

## If you already ran 003 before 002

Your `modules` and `lessons` tables no longer have `is_premium`, so 002’s inserts fail.

**Quick fix in Supabase SQL Editor:**

1. Add columns back (so 002 can run):
```sql
ALTER TABLE modules ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT false;
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT false;
```

2. Run the **entire** `002_seed_data.sql` (creates 5 modules, 5 lessons, phrases, quiz questions).

3. Run the **entire** `003_simplify_mvp.sql` again (drops those columns and cleans up RLS).

After that, **http://localhost:3000/courses** should show 5 modules.

---

## Quick checklist

- [ ] I opened **/courses** (not just the home page).
- [ ] `.env.local` has `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` for the same project.
- [ ] I restarted `npm run dev` after changing env.
- [ ] In Supabase Table Editor, **modules** has rows.
- [ ] Migrations were run in order: **001 → 002 → 003**.

If all are true and you still see no courses, the next step is to check the browser Network tab for the request to Supabase and any error response (e.g. 401/403 or empty array).
