import * as React from "react";

export type SectionId =
  | "home"
  | "engineering"
  | "experience"
  | "platform"
  | "projects"
  | "credentials"
  | "education"
  | "contact";

export type NavItem = { id: SectionId; label: string };

/** Single source of truth for navigation order + labels (navbar + right rail). */
export const NAV_SECTIONS: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "engineering", label: "Engineering" },
  { id: "experience", label: "Experience" },
  { id: "platform", label: "Platform" },
  { id: "projects", label: "Projects" },
  { id: "credentials", label: "Credentials" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

/**
 * Shared active-section store. One IntersectionObserver for the whole app so
 * the navbar and the right-side rail can never disagree.
 */
let activeId: SectionId = "home";
let observer: IntersectionObserver | null = null;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function start() {
  if (observer || typeof window === "undefined") return;
  const ratios = new Map<string, number>();
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
      }
      let best: SectionId | null = null;
      let bestRatio = 0;
      for (const item of NAV_SECTIONS) {
        const r = ratios.get(item.id) ?? 0;
        if (r > bestRatio) {
          bestRatio = r;
          best = item.id;
        }
      }
      if (best && best !== activeId) {
        activeId = best;
        emit();
      }
    },
    { rootMargin: "-35% 0px -45% 0px", threshold: [0.01, 0.15, 0.35, 0.6] },
  );
  for (const item of NAV_SECTIONS) {
    const el = document.getElementById(item.id);
    if (el) observer.observe(el);
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  start();
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      observer?.disconnect();
      observer = null;
    }
  };
}

/** Active homepage section, shared by every navigation surface. */
export function useActiveSection(enabled: boolean): SectionId | null {
  const value = React.useSyncExternalStore(
    subscribe,
    () => activeId,
    () => "home" as SectionId,
  );
  return enabled ? value : null;
}
