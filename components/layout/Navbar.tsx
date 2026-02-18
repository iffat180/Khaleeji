import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="arabic text-2xl font-bold text-primary" dir="rtl">
            خليجي
          </span>
          <span className="text-2xl font-semibold tracking-tight">
            Khaleeji
            <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-primary align-middle" />
          </span>
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link
            href="/courses"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            Courses
          </Link>
          <Link
            href="/dashboard"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            href="/pricing"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            Pricing
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <form action="/auth/signout" method="post">
                <Button type="submit" variant="outline" size="sm">
                  Sign Out
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  size="sm"
                  className="shadow-md shadow-[rgba(201,168,76,0.35)]"
                >
                  Start Free
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

