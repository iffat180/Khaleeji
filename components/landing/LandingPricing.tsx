import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function LandingPricing() {
  return (
    <section className="bg-[var(--sand)] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
          Choose your plan
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Start free. Upgrade when you&apos;re ready for more Gulf Arabic.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {/* Free */}
          <Card className="border border-border bg-card shadow-md">
            <CardHeader>
              <CardTitle>Free</CardTitle>
              <CardDescription>Forever</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-left">
              <div className="text-4xl font-semibold text-foreground">$0</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Module 1 (5 lessons)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Greetings & daily basics</span>
                </li>
              </ul>
              <Link href="/signup">
                <Button variant="outline" className="mt-4 w-full">
                  Start Free
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Pro */}
          <Card className="scale-[1.03] border-2 border-primary bg-card shadow-xl">
            <CardHeader>
              <div className="mb-2 inline-flex rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Most popular
              </div>
              <CardTitle>Pro</CardTitle>
              <CardDescription>Monthly subscription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-left">
              <div className="text-4xl font-semibold text-foreground">
                $9.99
                <span className="text-base font-normal text-muted-foreground">
                  /mo
                </span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>All 5 modules unlocked</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>40+ lessons</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Quizzes & progress tracking</span>
                </li>
              </ul>
              <Link href="/pricing">
                <Button className="mt-4 w-full">Get Pro</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Lifetime */}
          <Card className="border border-border bg-card shadow-md">
            <CardHeader>
              <CardTitle>Lifetime</CardTitle>
              <CardDescription>One-time payment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-left">
              <div className="text-4xl font-semibold text-foreground">$99</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Lifetime access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>All future content</span>
                </li>
              </ul>
              <Link href="/pricing">
                <Button variant="outline" className="mt-4 w-full">
                  Buy Lifetime
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

