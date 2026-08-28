import * as React from "react";

import { Section } from "@/components/site/section";
import { cn } from "@/lib/utils";
import { ARCH_LAYERS, PRINCIPLES } from "./data";
import { ArchLayer, Connector } from "./layer";
import { SystemSignals } from "./signals";

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

/** Connector tone between layer i and i + 1. */
const CONNECTOR_TONE = ["ai", "primary", "primary", "primary", "primary", "primary", "observe"] as const;

/**
 * "Platform Architecture" — a layered, interactive representation of how the
 * platform is built and operated. Each layer is data-driven, so individual
 * layers can be updated in `data.ts` without touching the composition.
 */
export function PlatformArchitecture() {
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const [hovered, setHovered] = React.useState<string | null>(null);

  return (
    <Section
      bordered
      id="system"
      label="Platform architecture"
      heading="AI-assisted engineering for reliable cloud platforms."
      description="I design systems where infrastructure, delivery, observability, security, and AI-assisted engineering work together."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-8">
        <div className="min-w-0">
          {ARCH_LAYERS.map((layer, i) => (
            <React.Fragment key={layer.id}>
              <ArchLayer
                layer={layer}
                reduced={reduced}
                lit={hovered === null || hovered === layer.id}
                onHover={setHovered}
              />
              {i < ARCH_LAYERS.length - 1 && (
                <Connector
                  tone={CONNECTOR_TONE[i] ?? "primary"}
                  reduced={reduced}
                  lit={hovered === null || hovered === layer.id || hovered === ARCH_LAYERS[i + 1]!.id}
                />
              )}
            </React.Fragment>
          ))}

          {/* Feedback loop */}
          <div
            className={cn(
              "mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-dashed border-success/40 bg-success/[0.04] px-4 py-3 transition-opacity duration-300",
              hovered === null || hovered === "observability" || hovered === "assurance"
                ? "opacity-100"
                : "opacity-50",
            )}
          >
            <span className="font-mono text-[0.625rem] tracking-[0.2em] text-success uppercase">
              Feedback loop
            </span>
            <span className="font-mono text-[0.625rem] tracking-[0.14em] text-muted-foreground uppercase">
              Observe → Understand → Improve → Deploy
            </span>
          </div>

          {/* Flow legend */}
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.5625rem] tracking-[0.16em] text-muted-foreground uppercase">
            {[
              { label: "Engineering flow", dot: "bg-primary" },
              { label: "AI signal", dot: "bg-chart-4" },
              { label: "Observability", dot: "bg-warn" },
              { label: "Feedback", dot: "bg-success" },
            ].map((entry) => (
              <li key={entry.label} className="flex items-center gap-2">
                <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", entry.dot)} />
                {entry.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Side panel — reflows below the architecture on tablet, hidden on phones */}
        <div className="hidden md:block">
          <SystemSignals reduced={reduced} hovered={hovered} onHover={setHovered} />
        </div>
      </div>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {PRINCIPLES.map(({ title, note, Icon }) => (
          <li
            key={title}
            className="rounded-xl border border-border bg-surface/50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong"
          >
            <Icon className="h-4 w-4 text-primary" aria-hidden />
            <p className="mt-3 text-sm font-medium text-foreground">{title}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{note}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
