import * as React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ArrowUpRight, Hexagon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Platform", hash: "platform" },
  { label: "Projects", hash: "projects" },
  { label: "Engineering", hash: "engineering" },
  { label: "Experience", hash: "experience" },
  { label: "Contact", hash: "contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState<string>(NAV_ITEMS[0].hash);
  const [open, setOpen] = React.useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section indicator
  React.useEffect(() => {
    const sections = NAV_ITEMS.map((i) => document.querySelector(i.href)).filter(
      (el): el is Element => Boolean(el),
    );
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.05, 0.25, 0.5] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
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
        <a
          href="#top"
          className="flex min-w-0 items-center gap-2.5 rounded-md text-foreground"
          aria-label="Back to top"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-surface/80">
            <Hexagon className="h-4 w-4 text-primary" aria-hidden />
          </span>
          <span className="truncate font-display text-sm font-semibold tracking-tight">
            Vikram Madhyasta
          </span>
        </a>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
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
              </a>
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
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-3 text-base transition-colors",
                      active === item.href
                        ? "bg-surface text-foreground"
                        : "text-muted-foreground hover:bg-surface/70 hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </a>
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
