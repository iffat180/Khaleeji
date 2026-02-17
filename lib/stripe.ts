import Stripe from "stripe";

// Use the default API version bundled with the Stripe SDK
// to avoid type mismatches in Vercel/TypeScript builds.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  typescript: true,
});
