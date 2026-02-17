# Khaleeji — Gulf Arabic Language Learning Platform

Learn the Arabic people actually speak in the Gulf. Khaleeji teaches Gulf Arabic (خليجي) — the actual spoken dialect of Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, and Oman.

## Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database & Auth:** Supabase (PostgreSQL + Auth)
- **Payments:** Stripe
- **Deployment:** Vercel (recommended)

## Features

### MVP Features ✅

- ✅ Landing page with hero, pain points, sample lessons, pricing preview
- ✅ Authentication (Email/Password + Google OAuth)
- ✅ Dashboard with progress tracking
- ✅ Course modules with lesson lists
- ✅ Three lesson types:
  - Phrase cards (Arabic script, transliteration, English meaning)
  - Interactive quizzes (multiple choice with instant feedback)
  - Audio lessons (placeholder for MVP)
- ✅ Progress tracking (mark lessons as complete)
- ✅ Pricing page with Stripe Checkout
- ✅ Tier-gating (Free/Pro/Lifetime)

### Coming in Phase 2

- AI Pronunciation Tutor
- Community features
- Live 1-on-1 session booking
- Mobile app (React Native)

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the migrations:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_seed_data.sql`
3. Get your Supabase URL and anon key from Project Settings → API
4. Enable Google OAuth in Authentication → Providers (optional)

### 3. Set Up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Dashboard
3. Create products and prices:
   - **Pro Monthly:** Create a recurring price ($9.99/month)
   - **Lifetime:** Create a one-time price ($99)
4. Set up webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Events to listen for: `checkout.session.completed`, `customer.subscription.deleted`
   - Copy the webhook signing secret

### 4. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Note:** Update `STRIPE_WEBHOOK_SECRET` and `NEXT_PUBLIC_APP_URL` for production.

### 5. Update Stripe Price IDs

In `app/api/checkout/route.ts`, replace the placeholder `priceId` values with your actual Stripe price IDs:

```typescript
// Replace these with your actual Stripe price IDs
const priceId = tier === "lifetime" ? "price_xxxxx" : "price_xxxxx";
```

Or pass them from the `CheckoutButton` component (already implemented).

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Database Schema

The database includes:

- `profiles` — User profiles with tier (free/pro/lifetime)
- `modules` — Course modules (e.g., "Greetings", "Restaurants")
- `lessons` — Lessons within modules
- `phrases` — Phrase cards for phrase_card lessons
- `quiz_questions` — Questions for quiz lessons
- `user_progress` — Tracks which lessons users have completed

See `supabase/migrations/001_initial_schema.sql` for full schema.

## Seed Data

Module 1 (FREE) includes:
- Hello & How are you
- Goodbye & See you later
- Yes / No / Please / Thank you
- Quiz on Module 1 phrases
- Numbers 1–10

Modules 2-5 are premium and seeded but locked for free users.

## Project Structure

```
/app
  /(auth)              # Login/signup pages
  /dashboard           # User dashboard
  /courses/[slug]      # Module pages
  /lessons/[slug]      # Lesson pages
  /pricing             # Pricing page
  /api                 # API routes (checkout, webhooks)

/components
  /auth                # Login/signup forms
  /course              # Module cards, lesson rows
  /lesson              # PhraseCard, QuizBlock, AudioPlayer
  /layout              # Navbar, Footer
  /pricing             # Checkout button
  /ui                  # shadcn/ui components

/lib
  /supabase            # Supabase clients (browser/server)
  stripe.ts            # Stripe client

/types
  index.ts             # TypeScript types

/supabase/migrations   # Database migrations
```

## Arabic Text Support

- All Arabic text renders right-to-left using `dir="rtl"`
- Uses Cairo font for Arabic script (loaded from Google Fonts)
- Transliteration uses informal Gulf romanization (3 = ع, 2 = ء)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

Make sure to set:
- `NEXT_PUBLIC_APP_URL` to your production domain
- `STRIPE_WEBHOOK_SECRET` from your Stripe webhook endpoint
- All Supabase and Stripe keys

## License

MIT
