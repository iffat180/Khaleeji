import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)] py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-[var(--navy)]">
          Ready to speak Gulf Arabic?
        </h2>
        <p className="mt-4 text-lg text-[var(--navy-soft)]">
          Start with 5 free lessons from Module 1. No credit card required.
        </p>
        <Link href="/signup">
          <Button
            size="lg"
            className="mt-8 bg-[var(--cream)] text-[var(--navy)] hover:bg-white"
          >
            Start Free Now
          </Button>
        </Link>
      </div>
    </section>
  );
}

