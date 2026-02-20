import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LandingFinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-[var(--gold)]/15 bg-gradient-to-b from-[var(--cream)] to-[var(--sand-dark)] py-28 sm:py-36">
      {/* Calligraphy texture — 5% opacity */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "url(/calligraphy-texture.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        {/* Section label */}
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--gold-dark)]">
          Get Started
        </span>
        {/* Accent line */}
        <div className="mx-auto mt-4 mb-8 h-px w-10 bg-[var(--gold)]/50" />
        <h2 className="font-display text-4xl font-bold tracking-tight text-[var(--navy)] sm:text-5xl">
          Start Speaking Gulf Arabic Today
        </h2>
        <p className="mt-6 text-base text-[var(--navy-soft)]">
          Begin with Level 0 — completely free. No card required.
        </p>
        <div className="mt-10">
          <Button asChild size="lg" className="px-10 py-6 text-base sm:text-lg">
            <Link href="/dashboard">Create Free Account</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
