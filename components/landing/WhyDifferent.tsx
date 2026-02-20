const FEATURES = [
  {
    title: "Spoken Gulf Dialect",
    description: "Everyday language used in the Gulf, not formal Fusha.",
  },
  {
    title: "Arabizi Support",
    description: "Romanized script so you can read and speak from day one.",
  },
  {
    title: "Real-Life Situations",
    description: "Cafés, taxis, offices, and markets — not textbook scenarios.",
  },
  {
    title: "Cultural Nuance",
    description: "Understand how and when to use phrases in context.",
  },
];

export function WhyDifferent() {
  return (
    <section id="about" className="bg-[var(--sand)] py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="mb-5 flex justify-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--gold-dark)]">
            Why Yalla Khaleeji
          </span>
        </div>
        {/* Accent line */}
        <div className="mx-auto mb-6 h-px w-10 bg-[var(--gold)]/50" />
        <h2 className="font-display text-3xl font-bold text-[var(--navy)] sm:text-4xl text-center mb-16 tracking-tight">
          Why This Isn&apos;t Textbook Arabic
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-border/60 bg-[var(--cream)] p-6 shadow-[0_2px_16px_rgba(13,27,42,0.05)] transition-all hover:border-[var(--gold)]/30 hover:shadow-[0_8px_32px_rgba(13,27,42,0.08)]"
            >
              {/* Gold top accent bar */}
              <div className="mb-5 h-0.5 w-8 rounded-full bg-[var(--gold)]/60 transition-all group-hover:w-12" />
              <h3 className="font-display text-lg font-semibold text-[var(--navy)]">
                {item.title}
              </h3>
              <p className="mt-3 text-[13px] text-[var(--navy-soft)] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
