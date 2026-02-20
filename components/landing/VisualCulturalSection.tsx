import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function VisualCulturalSection() {
  return (
    <section className="relative min-h-[60vh] overflow-hidden bg-[var(--sand-dark)] md:min-h-[70vh]">
      <div className="relative mx-auto flex max-w-7xl flex-col lg:min-h-[70vh] lg:flex-row">
        {/* Text — left, spacious */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-4 py-16 text-left sm:px-6 lg:max-w-xl lg:px-12 lg:py-24 xl:pl-16">
          <h2 className="font-display text-3xl font-bold leading-tight text-[var(--navy)] sm:text-4xl md:text-5xl">
            Speak Real Gulf Arabic{" "}
            <span className="text-[var(--gold)]">— Not Textbook Arabic</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--navy-soft)] sm:text-xl">
            Learn the everyday Emirati dialect used in homes, cafés, and offices across the UAE.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="px-8 py-6 text-base sm:text-lg">
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>
        </div>

        {/* Image — right, full-height column, no stretch */}
        <div className="relative flex-1 lg:min-h-[70vh]">
          <div className="relative h-[50vh] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[55%]">
            <Image
              src="/images/hero-courses.png"
              alt="Two people having a conversation in a Gulf café"
              fill
              className="object-cover object-right"
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority={false}
            />
            {/* Gradient overlay for readability at edge */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-[var(--sand-dark)] via-[var(--sand-dark)]/20 to-transparent lg:from-[var(--sand-dark)] lg:via-transparent lg:to-transparent"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
