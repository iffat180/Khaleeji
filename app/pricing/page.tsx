import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { CheckoutButton } from "@/components/pricing/CheckoutButton";

export default async function PricingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase.from("profiles").select("tier").eq("id", user.id).single()
    : { data: null };

  const userTier = profile?.tier || "free";

  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-[980px] text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-lg text-muted-foreground">
          Start free forever. Upgrade when you&apos;re ready for more.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Free Tier */}
        <Card>
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <CardDescription>Forever</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">$0</div>
            <ul className="space-y-3 text-left mb-6">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Module 1: Greetings & Basics</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>5 free lessons</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Progress tracking</span>
              </li>
            </ul>
            {userTier === "free" ? (
              <Button variant="outline" className="w-full" disabled>
                Current Plan
              </Button>
            ) : (
              <Link href="/dashboard">
                <Button variant="outline" className="w-full">
                  View Dashboard
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>

        {/* Pro Tier */}
        <Card className={`border-2 ${userTier === "pro" ? "border-primary" : ""}`}>
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>Monthly subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">
              $9.99<span className="text-lg font-normal">/mo</span>
            </div>
            <ul className="space-y-3 text-left mb-6">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>All modules unlocked</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Unlimited lessons</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Progress tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Future content updates</span>
              </li>
            </ul>
            {userTier === "pro" ? (
              <Button variant="outline" className="w-full" disabled>
                Current Plan
              </Button>
            ) : (
              <CheckoutButton 
                priceId={process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "pro_monthly"} 
                tier="pro" 
              />
            )}
          </CardContent>
        </Card>

        {/* Lifetime Tier */}
        <Card>
          <CardHeader>
            <CardTitle>Lifetime</CardTitle>
            <CardDescription>One-time payment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">$99</div>
            <ul className="space-y-3 text-left mb-6">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>All modules unlocked</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Lifetime access</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>All future content</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>No recurring charges</span>
              </li>
            </ul>
            {userTier === "lifetime" ? (
              <Button variant="outline" className="w-full" disabled>
                Current Plan
              </Button>
            ) : (
              <CheckoutButton 
                priceId={process.env.NEXT_PUBLIC_STRIPE_LIFETIME_PRICE_ID || "lifetime"} 
                tier="lifetime" 
              />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>All plans include a 7-day money-back guarantee.</p>
      </div>
    </div>
  );
}
