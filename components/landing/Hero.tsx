import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-b from-[var(--sand)] to-[var(--sand-dark)] py-16 md:min-h-[90vh]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5">
        <span className="arabic text-[8rem] sm:text-[10rem] md:text-[14rem]" dir="rtl">
          خليجي
        </span>
      </div>
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight">
          Learn the Arabic People{" "}
          <span className="text-primary">Actually Speak</span> in the Gulf
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground">
          Most courses teach formal Arabic. Khaleeji teaches the Gulf dialect people
          actually use in Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, and Oman.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/courses">
            <Button size="lg" className="px-8 py-4 text-base md:text-lg">
              Browse Courses
            </Button>
          </Link>
          <Link href="#">
            <Button
              size="lg"
              variant="outline"
              className="border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold-light)] hover:text-[var(--navy)] px-8 py-4 text-base md:text-lg"
            >
              View Pricing
            </Button>
          </Link>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Trusted by 2,000+ expats in the Gulf
        </p>
        <div className="mt-10 flex flex-col items-center gap-2 text-sm text-muted-foreground">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold)]">
            ↓
          </span>
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}

