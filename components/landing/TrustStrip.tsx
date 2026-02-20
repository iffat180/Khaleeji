export function TrustStrip() {
  const items = [
    "Designed for Expats",
    "Built for Real Conversations",
    "Cultural Context Included",
  ];

  return (
    <section className="border-b border-[var(--gold)]/15 bg-[var(--cream)] py-5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-y-3">
          {items.map((label, i) => (
            <span key={label} className="flex items-center">
              <span className="text-[13px] font-medium tracking-wide text-[var(--navy-soft)]">
                {label}
              </span>
              {i < items.length - 1 && (
                <span
                  className="mx-8 h-1 w-1 rounded-full bg-[var(--gold)]/50"
                  aria-hidden
                />
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
