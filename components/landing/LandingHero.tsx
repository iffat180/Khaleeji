import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function LandingHero() {
  return (
    <section className="relative h-[calc(100vh-5rem)] min-h-[400px] overflow-hidden py-24 lg:py-28">
      {/* Image as hero background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-courses.png"
          alt=""
          fill
          className="object-cover object-right"
          sizes="100vw"
          priority
        />
        {/* Blend left into sand bg; image more opaque on right */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[var(--sand)] via-[var(--sand)]/60 to-transparent"
          aria-hidden
        />
      </div>

      {/* Content on top */}
      <div className="relative z-10 mx-auto flex h-full min-h-0 max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          {/* Eyebrow label */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[var(--cream)]/80 px-3.5 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--gold-dark)]">
              Gulf Arabic Course
            </span>
          </div>

          <h1 className="font-display font-extrabold leading-[1.1] text-[var(--navy)] tracking-tight">
            <span className="block text-4xl sm:text-5xl lg:text-6xl">Speak Real</span>
            <span className="block text-4xl sm:text-5xl lg:text-6xl">Gulf Arabic</span>
            <span className="mt-3 block text-xl font-medium text-[var(--navy-soft)] sm:text-2xl lg:text-[1.5rem] lg:leading-snug">
              the way locals actually speak
            </span>
          </h1>
          <p className="mt-5 text-[15px] text-[var(--navy-soft)] leading-relaxed">
            Practical phrases for Qatar, UAE, and Saudi Arabia.
          </p>

          {/* CTA panel */}
          <div className="mt-10 rounded-2xl border border-[var(--gold)]/15 bg-[var(--cream)]/95 p-6 shadow-[0_8px_32px_rgba(13,27,42,0.1)] backdrop-blur-sm lg:mt-12">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <Button asChild size="lg" className="w-fit px-8 py-6 text-base sm:text-lg">
                  <Link href="/courses">Start Free</Link>
                </Button>
                <Link
                  href="/courses#curriculum"
                  className="text-sm font-medium text-[var(--navy-soft)] transition-colors hover:text-[var(--navy)]"
                >
                  View Curriculum →
                </Link>
              </div>
              <p className="text-xs text-[var(--navy-muted)] sm:text-right sm:max-w-[180px] leading-relaxed">
                Level 0 & Level 1<br className="hidden sm:block" /> included free.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
