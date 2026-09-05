import { Link, useRouterState } from "@tanstack/react-router";

import { NAV_SECTIONS, useActiveSection } from "@/lib/site-sections";
import { cn } from "@/lib/utils";

/** Right-side section indicator. Shares the active-section store with the navbar. */
export function SectionRail() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";
  const active = useActiveSection(onHome);

  if (!onHome) return null;

  return (
    <nav
      aria-label="Section"
      className="fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="flex flex-col items-end gap-3">
        {NAV_SECTIONS.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <Link
                to="/"
                hash={item.id}
                activeOptions={{ exact: true, includeHash: true }}
                aria-label={`Go to ${item.label}`}
                aria-current={isActive ? "true" : undefined}
                className="group flex items-center gap-2 rounded-full p-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <span
                  className={cn(
                    "text-[0.7rem] tracking-wide transition-opacity duration-200",
                    isActive
                      ? "text-foreground opacity-100"
                      : "text-muted-foreground opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
                  )}
                >
                  {item.label}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "block rounded-full border transition-all duration-200",
                    isActive
                      ? "h-2.5 w-2.5 border-primary bg-primary"
                      : "h-2 w-2 border-border bg-muted-foreground/40 group-hover:border-primary",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
