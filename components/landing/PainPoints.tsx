import { Card, CardContent } from "@/components/ui/card";

const ITEMS = [
  {
    title: "Can’t order food naturally",
    description:
      "Waiters look confused when you try to use textbook Fusha at restaurants.",
  },
  {
    title: "Don’t understand colleagues",
    description:
      "Everyone at work speaks Gulf Arabic but your course focused on formal grammar.",
  },
  {
    title: "Sound like a textbook",
    description:
      "You memorised rules and verb tables but still can’t have a relaxed conversation.",
  },
];

export function PainPoints() {
  return (
    <section className="bg-[var(--cream)] py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
          You studied Arabic but still…
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ITEMS.map((item) => (
            <Card
              key={item.title}
              className="h-full border border-border bg-card shadow-sm"
            >
              <CardContent className="flex h-full flex-col items-start px-6 py-8 text-left">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500 text-xl">
                  ❌
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

