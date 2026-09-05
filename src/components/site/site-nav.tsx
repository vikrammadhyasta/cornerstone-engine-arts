import * as React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ArrowUpRight, Hexagon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { NAV_SECTIONS, useActiveSection } from "@/lib/site-sections";

const NAV_ITEMS = NAV_SECTIONS;

export function SiteNav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";
  const active = useActiveSection(onHome);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="container-page flex h-16 items-center gap-4 md:h-20"
      >
        <Link
          to="/"
          hash="home"
          activeOptions={{ exact: true, includeHash: true }}
          className="flex min-w-0 items-center gap-2.5 rounded-md text-foreground"
          aria-label="Back to top"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-surface/80">
            <Hexagon className="h-4 w-4 text-primary" aria-hidden />
          </span>
          <span className="truncate font-display text-sm font-semibold tracking-tight">
            Vikram Madhyasta
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = onHome && active === item.id;
            return (
              <Link
                key={item.id}
                to="/"
                hash={item.id}
                activeOptions={{ exact: true, includeHash: true }}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm transition-colors duration-200",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3 -bottom-px h-px bg-primary transition-transform duration-300 ease-out",
                    isActive ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-2 lg:ml-4">
          <Button variant="secondary" size="sm" className="hidden sm:inline-flex" asChild>
            <a href="/resume.pdf" download>
              Resume
              <ArrowUpRight />
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[86vw] max-w-sm border-l border-border bg-background/95 backdrop-blur-xl"
            >
              <SheetTitle className="font-display text-base">Navigation</SheetTitle>
              <div className="mt-8 flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.id}
                    to="/"
                    hash={item.id}
                activeOptions={{ exact: true, includeHash: true }}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-3 text-base transition-colors",
                      onHome && active === item.id
                        ? "bg-surface text-foreground"
                        : "text-muted-foreground hover:bg-surface/70 hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <Button className="mt-8 w-full" asChild>
                <a href="/resume.pdf" download onClick={() => setOpen(false)}>
                  Resume
                  <ArrowUpRight />
                </a>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
