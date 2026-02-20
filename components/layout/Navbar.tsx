import Link from "next/link";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--gold)]/15 bg-[var(--cream)]/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo — يلا (Yalla) in Arabic + Khaleeji */}
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <span className="arabic text-xl font-semibold text-[var(--gold)]" dir="rtl">يلا</span>
            <span className="text-xl font-semibold tracking-tight text-[var(--navy)]" style={{ fontFamily: 'var(--font-logo)' }}>
              Khaleeji
            </span>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-1">
            <Link
              href="/#about"
              className="rounded-md px-3.5 py-2 text-sm font-medium text-[var(--navy-soft)] transition-colors hover:bg-[var(--sand)] hover:text-[var(--navy)]"
            >
              About
            </Link>
            <Link
              href="/courses"
              className="rounded-md px-3.5 py-2 text-sm font-medium text-[var(--navy-soft)] transition-colors hover:bg-[var(--sand)] hover:text-[var(--navy)]"
            >
              Courses
            </Link>
            <Link
              href="/pricing"
              className="rounded-md px-3.5 py-2 text-sm font-medium text-[var(--navy-soft)] transition-colors hover:bg-[var(--sand)] hover:text-[var(--navy)]"
            >
              Pricing
            </Link>

            <div className="mx-3 h-4 w-px bg-[var(--gold)]/25" aria-hidden />

            <Link
              href="/dashboard"
              className="rounded-md px-3.5 py-2 text-sm font-medium text-[var(--navy-soft)] transition-colors hover:bg-[var(--sand)] hover:text-[var(--navy)]"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="ml-1 rounded-md bg-[var(--navy)] px-4 py-2 text-sm font-medium text-[var(--sand)] shadow-sm transition-all hover:bg-[var(--navy-soft)] hover:shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
