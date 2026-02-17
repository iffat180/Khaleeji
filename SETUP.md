# Khaleeji Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. **Create a Supabase project:**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for the database to be ready

2. **Run migrations:**
   - Go to SQL Editor in your Supabase dashboard
   - Run `supabase/migrations/001_initial_schema.sql` first
   - Then run `supabase/migrations/002_seed_data.sql`
   - Verify tables were created: `profiles`, `modules`, `lessons`, `phrases`, `quiz_questions`, `user_progress`

3. **Get your API keys:**
   - Go to Project Settings → API
   - Copy your Project URL (for `NEXT_PUBLIC_SUPABASE_URL`)
   - Copy your `anon` `public` key (for `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - Copy your `service_role` `secret` key (for `SUPABASE_SERVICE_ROLE_KEY`)

4. **Enable Google OAuth (optional):**
   - Go to Authentication → Providers
   - Enable Google provider
   - Add your OAuth credentials

### 3. Set Up Stripe

1. **Create a Stripe account:**
   - Go to [stripe.com](https://stripe.com)
   - Sign up or log in
   - Get your API keys from Dashboard → Developers → API keys

2. **Create products and prices:**
   - Go to Products in Stripe Dashboard
   - Create a product "Pro Monthly" with recurring price $9.99/month
   - Copy the Price ID (starts with `price_`)
   - Create a product "Lifetime" with one-time price $99
   - Copy the Price ID

3. **Set up webhook:**
   - Go to Developers → Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe` (use ngrok for local testing)
   - Select events: `checkout.session.completed`, `customer.subscription.deleted`
   - Copy the webhook signing secret

### 4. Configure Environment Variables

Create `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Update Stripe Price IDs

In `components/pricing/CheckoutButton.tsx` or `app/pricing/page.tsx`, replace the placeholder price IDs:

```typescript
// Replace "pro_monthly" and "lifetime" with your actual Stripe price IDs
<CheckoutButton priceId="price_xxxxx" tier="pro" />
<CheckoutButton priceId="price_xxxxx" tier="lifetime" />
```

### 6. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Testing the Application

### Test Free Tier

1. Sign up for a new account
2. You should see Module 1 unlocked (5 free lessons)
3. Complete a lesson and mark it as complete
4. Check your progress on the dashboard

### Test Premium Content Lock

1. Try to access Module 2-5 (they should redirect to pricing)
2. Try to access a premium lesson directly (should redirect to pricing)

### Test Stripe Checkout (Test Mode)

1. Go to `/pricing`
2. Click "Upgrade to Pro" or "Get Lifetime"
3. Use Stripe test card: `4242 4242 4242 4242`
4. Any future expiry date, any CVC
5. Complete checkout
6. Verify webhook updates your profile tier
7. Check that premium content is now unlocked

## Local Webhook Testing

For local development, use [ngrok](https://ngrok.com):

```bash
ngrok http 3000
```

Copy the HTTPS URL and use it in your Stripe webhook endpoint:
`https://xxxxx.ngrok.io/api/webhooks/stripe`

## Troubleshooting

### "Unauthorized" errors
- Check that your Supabase keys are correct
- Verify RLS policies are set up correctly

### Stripe checkout not working
- Verify your Stripe keys are correct
- Check that price IDs match your Stripe products
- Ensure webhook endpoint is accessible

### Database errors
- Verify migrations ran successfully
- Check that seed data was inserted
- Verify RLS policies allow public read access to modules/lessons

### Arabic text not displaying correctly
- Ensure Cairo font is loaded (check browser console)
- Verify `dir="rtl"` is set on Arabic text elements

## Next Steps

- Add real audio files to Supabase Storage
- Customize branding colors/fonts
- Add more lessons and modules
- Set up production environment variables
- Deploy to Vercel
