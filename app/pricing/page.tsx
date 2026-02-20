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

export const metadata = {
  title: "Pricing — Yalla Khaleeji",
  description: "Start free with Level 0 & 1. Upgrade to Pro or Lifetime for full Gulf Arabic access.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--cream)] to-[var(--sand)]">
      {/* Header */}
      <section className="relative border-b border-[var(--gold)]/15 bg-[var(--cream)]/80 py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold-dark)]">
            Pricing
          </span>
          <div className="mx-auto mt-5 mb-7 h-px w-12 bg-[var(--gold)]/60" />
          <h1 className="font-display text-4xl font-bold tracking-tight text-[var(--navy)] sm:text-5xl">
            Choose your plan
          </h1>
          <p className="mt-7 text-[17px] leading-relaxed text-[var(--navy-soft)]">
            Start free. Upgrade when you&apos;re ready for more Gulf Arabic.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          {/* Free */}
          <Card className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--gold)]/20 bg-[var(--cream)] shadow-[0_4px_24px_rgba(13,27,42,0.06)] transition-all hover:border-[var(--gold)]/40 hover:shadow-[0_12px_40px_rgba(13,27,42,0.08)]">
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent" />
            <CardHeader className="pb-2 pt-8">
              <CardTitle className="font-display text-2xl font-semibold text-[var(--navy)]">Free</CardTitle>
              <CardDescription className="text-[var(--navy-muted)]">Forever</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col space-y-6 text-left pb-8">
              <div className="font-display text-4xl font-bold tracking-tight text-[var(--navy)]">$0</div>
              <ul className="space-y-3.5 text-sm text-[var(--navy-soft)]">
                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/15">
                    <Check className="h-3 w-3 text-[var(--gold-dark)]" />
                  </span>
                  <span>Level 0 & Level 1</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/15">
                    <Check className="h-3 w-3 text-[var(--gold-dark)]" />
                  </span>
                  <span>Greetings & daily basics</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/15">
                    <Check className="h-3 w-3 text-[var(--gold-dark)]" />
                  </span>
                  <span>Arabizi & core phrases</span>
                </li>
              </ul>
              <Link href="/courses" className="mt-auto pt-2">
                <Button variant="outline" className="w-full rounded-xl border-[var(--gold)]/50 py-6 text-[var(--navy)] hover:border-[var(--gold)] hover:bg-[var(--gold)]/10">
                  Browse Courses
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Pro — featured */}
          <Card className="group relative flex flex-col overflow-hidden rounded-2xl border-2 border-[var(--gold)] bg-[var(--cream)] shadow-[0_12px_48px_rgba(201,168,76,0.18)] transition-all hover:shadow-[0_16px_56px_rgba(201,168,76,0.22)] md:-mt-1 md:scale-[1.02]">
            <div className="h-1 w-full bg-[var(--gold)]" />
            <div className="absolute right-6 top-6 rounded-full bg-[var(--gold)] px-3 py-1 text-xs font-semibold text-[var(--navy)]">
              Most popular
            </div>
            <CardHeader className="pb-2 pt-10">
              <CardTitle className="font-display text-2xl font-semibold text-[var(--navy)]">Pro</CardTitle>
              <CardDescription className="text-[var(--navy-muted)]">Monthly subscription</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col space-y-6 text-left pb-8">
              <div className="font-display text-4xl font-bold tracking-tight text-[var(--navy)]">
                $9.99
                <span className="text-lg font-normal text-[var(--navy-soft)]">/mo</span>
              </div>
              <ul className="space-y-3.5 text-sm text-[var(--navy-soft)]">
                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/20">
                    <Check className="h-3 w-3 text-[var(--gold-dark)]" />
                  </span>
                  <span>All 6 levels unlocked</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/20">
                    <Check className="h-3 w-3 text-[var(--gold-dark)]" />
                  </span>
                  <span>40+ lessons</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/20">
                    <Check className="h-3 w-3 text-[var(--gold-dark)]" />
                  </span>
                  <span>Quizzes & progress tracking</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/20">
                    <Check className="h-3 w-3 text-[var(--gold-dark)]" />
                  </span>
                  <span>Business & advanced fluency</span>
                </li>
              </ul>
              <Link href="/dashboard" className="mt-auto pt-2">
                <Button className="w-full rounded-xl py-6">Get Pro</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Lifetime */}
          <Card className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--gold)]/20 bg-[var(--cream)] shadow-[0_4px_24px_rgba(13,27,42,0.06)] transition-all hover:border-[var(--gold)]/40 hover:shadow-[0_12px_40px_rgba(13,27,42,0.08)]">
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent" />
            <CardHeader className="pb-2 pt-8">
              <CardTitle className="font-display text-2xl font-semibold text-[var(--navy)]">Lifetime</CardTitle>
              <CardDescription className="text-[var(--navy-muted)]">One-time payment</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col space-y-6 text-left pb-8">
              <div className="font-display text-4xl font-bold tracking-tight text-[var(--navy)]">$99</div>
              <ul className="space-y-3.5 text-sm text-[var(--navy-soft)]">
                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/15">
                    <Check className="h-3 w-3 text-[var(--gold-dark)]" />
                  </span>
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/15">
                    <Check className="h-3 w-3 text-[var(--gold-dark)]" />
                  </span>
                  <span>Lifetime access</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/15">
                    <Check className="h-3 w-3 text-[var(--gold-dark)]" />
                  </span>
                  <span>All future content</span>
                </li>
              </ul>
              <Link href="/dashboard" className="mt-auto pt-2">
                <Button variant="outline" className="w-full rounded-xl border-[var(--gold)]/50 py-6 text-[var(--navy)] hover:border-[var(--gold)] hover:bg-[var(--gold)]/10">
                  Buy Lifetime
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--gold)]/15 bg-[var(--cream)]/70 py-14">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-4 h-px w-8 bg-[var(--gold)]/40" />
          <p className="text-[15px] text-[var(--navy-soft)]">
            Not sure yet? Start with{" "}
            <Link href="/courses" className="font-medium text-[var(--gold-dark)] underline underline-offset-2 hover:text-[var(--navy)]">
              free courses
            </Link>{" "}
            — no card required.
          </p>
        </div>
      </section>
    </div>
  );
}
