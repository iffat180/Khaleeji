const STEPS = [
  {
    step: "1",
    title: "Pick a topic",
    description:
      "Start with greetings, restaurants, shopping, taxis, or working with Gulf colleagues.",
  },
  {
    step: "2",
    title: "Learn Gulf phrases",
    description:
      "See Arabic script, read the transliteration, and understand the English meaning.",
  },
  {
    step: "3",
    title: "Practice with quizzes",
    description:
      "Test yourself with mini quizzes so phrases are ready when you need them.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-[var(--cream)] py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
          How Khaleeji works
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <div key={step.step} className="relative">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-semibold">
                {step.step}
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {step.description}
              </p>
              {index < STEPS.length - 1 && (
                <div className="pointer-events-none absolute top-6 hidden h-px w-full translate-x-1/2 border-t-2 border-dashed border-[var(--gold-light)] md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

