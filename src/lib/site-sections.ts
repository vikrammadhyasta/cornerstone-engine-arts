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
  const visible = new Set<string>();

  const resolve = () => {
    // Bottom of the document: the last section is the one being read.
    const atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    let next: SectionId | null = atBottom ? NAV_SECTIONS[NAV_SECTIONS.length - 1]!.id : null;
    if (!next) {
      for (const item of NAV_SECTIONS) {
        if (visible.has(item.id)) next = item.id;
      }
    }
    if (next && next !== activeId) {
      activeId = next;
      emit();
    }
  };

  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target.id);
        else visible.delete(e.target.id);
      }
      resolve();
    },
    // Thin detection band just below the sticky navbar — cheap and stable.
    { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
  );
  for (const item of NAV_SECTIONS) {
    const el = document.getElementById(item.id);
    if (el) observer.observe(el);
  }
  document.addEventListener("scrollend", resolve, { passive: true } as AddEventListenerOptions);
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
