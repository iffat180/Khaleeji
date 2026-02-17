import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Solution() {
  return (
    <section className="bg-[var(--sand)] py-16 md:py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
        <div className="flex-1">
          <Card className="mx-auto max-w-md border-none bg-[var(--cream)] shadow-md">
            <CardContent className="px-6 py-8">
              <div className="arabic text-4xl font-bold text-foreground" dir="rtl">
                مرحبا
              </div>
              <p className="mt-2 text-lg text-muted-foreground">Marhaba — Hello</p>
              <p className="mt-6 text-sm text-muted-foreground">
                Real phrases for greetings, work, taxis, cafes and more — the way Gulf
                Arabs actually speak every day.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="flex-1 space-y-5">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
            We teach the Arabic people <span className="text-primary">actually</span>{" "}
            speak.
          </h2>
          <ul className="space-y-3 text-base text-muted-foreground">
            <li>• Real-life situations: markets, taxis, offices, homes.</li>
            <li>• Gulf dialect phrases, not just formal Fusha sentences.</li>
            <li>• Native pronunciation and quizzes so it sticks.</li>
          </ul>
          <Button className="mt-4">Start learning Gulf Arabic</Button>
        </div>
      </div>
    </section>
  );
}

