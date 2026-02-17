import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PREVIEWS = [
  {
    lesson: "Lesson 1",
    title: "Hello & How are you",
    arabic: "كيف حالك",
    transliteration: "Chaif Halak",
    meaning: "How are you?",
  },
  {
    lesson: "Lesson 2",
    title: "Goodbye & See you later",
    arabic: "مع السلامة",
    transliteration: "Ma3 Elsalama",
    meaning: "Goodbye",
  },
  {
    lesson: "Lesson 3",
    title: "Yes / No / Please / Thank you",
    arabic: "شكراً",
    transliteration: "Shukran",
    meaning: "Thank you",
  },
];

export function ModulePreview() {
  return (
    <section className="bg-[var(--sand)] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
          What you&apos;ll learn in Module 1
        </h2>
        <p className="mt-2 text-base font-medium text-primary">
          (FREE — Try it now)
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PREVIEWS.map((item) => (
            <Card
              key={item.title}
              className="h-full border-none bg-[var(--cream)] shadow-md"
            >
              <CardContent className="px-6 py-8 text-left">
                <p className="text-xs font-semibold uppercase text-primary">
                  {item.lesson}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <div className="mt-6">
                  <p className="arabic text-2xl text-foreground" dir="rtl">
                    {item.arabic}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.transliteration} — {item.meaning}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Link href="/dashboard" className="mt-10 inline-block">
          <Button variant="outline">Browse all courses →</Button>
        </Link>
      </div>
    </section>
  );
}

