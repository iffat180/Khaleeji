import { Card, CardContent } from "@/components/ui/card";

const TESTIMONIALS = [
  {
    quote:
      "Finally! A course that teaches the Arabic my colleagues actually speak.",
    name: "Sarah, Dubai",
  },
  {
    quote:
      "I tried three other apps. This is the only one that taught me phrases I use every day.",
    name: "Ahmed, Riyadh",
  },
  {
    quote:
      "My Saudi friends are shocked I learned Gulf Arabic online. Worth every penny.",
    name: "Lisa, Abu Dhabi",
  },
];

export function Testimonials() {
  return (
    <section className="bg-[var(--cream)] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
          What Gulf Arabic learners say
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <Card
              key={item.name}
              className="h-full border border-border bg-card shadow-sm text-left"
            >
              <CardContent className="flex h-full flex-col px-6 py-8">
                <p className="text-sm text-foreground italic leading-relaxed">
                  “{item.quote}”
                </p>
                <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{item.name}</span>
                  <span className="text-primary">★★★★★</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

