import * as React from "react";

import { Section } from "@/components/site/section";
import { SYSTEM_NODES, type SystemNodeId } from "./data";
import { SystemMap } from "./system-map";
import { TelemetryPanel } from "./telemetry";
import { MobileStack } from "./mobile-stack";

function useMedia(query: string) {
  const [matches, setMatches] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/**
 * "Infrastructure that explains itself" — a self-describing platform map.
 * Data, visualization, telemetry and mobile composition live in sibling modules.
 */
export function PlatformSystem() {
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const isTablet = useMedia("(min-width: 768px) and (max-width: 1279px)");
  const isMobile = useMedia("(max-width: 767px)");
  const [selected, setSelected] = React.useState<SystemNodeId | null>(null);

  const active = SYSTEM_NODES.find((n) => n.id === selected);

  return (
    <Section
      bordered
      id="system"
      label="04 · Engineering the system"
      heading="Infrastructure that explains itself"
      description="From infrastructure provisioning to deployment and observability, every layer is designed to make system behavior visible, predictable, and maintainable."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-8">
        <div className="surface-panel grid-texture overflow-hidden p-4 sm:p-6">
          {isMobile ? (
            <MobileStack reduced={reduced} />
          ) : (
            <>
              <SystemMap
                simplified={isTablet}
                reduced={reduced}
                selected={selected}
                onSelect={setSelected}
              />
              <div
                className="mt-4 min-h-[3.25rem] rounded-xl border border-border bg-surface/50 p-3"
                aria-live="polite"
              >
                <p className="font-mono text-[0.625rem] tracking-[0.18em] text-primary uppercase">
                  {active ? active.label : "System overview"}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {active
                    ? active.note
                    : "Hover or focus a domain to see the role it plays in the platform."}
                </p>
              </div>
            </>
          )}
        </div>

        <TelemetryPanel reduced={reduced} compact={isMobile} />
      </div>

      {/* Text equivalent of the decorative visualization */}
      <ul className="sr-only">
        {SYSTEM_NODES.map((node) => (
          <li key={node.id}>
            {node.label}: {node.note}
          </li>
        ))}
      </ul>
    </Section>
  );
}
