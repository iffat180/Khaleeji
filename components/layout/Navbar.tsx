import Link from "next/link";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-xl font-semibold text-foreground hover:opacity-90"
          >
            خليجي Khaleeji
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/courses"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Courses
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
