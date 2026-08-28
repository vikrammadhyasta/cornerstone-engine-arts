import * as React from "react";

import { cn } from "@/lib/utils";
import { DEPLOY_STAGES, INDICATORS } from "./data";

/** Cycles indicator values on a slow clock; illustrative, never live data. */
function useSlowTick(enabled: boolean, ms = 3200) {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    if (!enabled) return;
    const id = window.setInterval(() => setTick((t) => t + 1), ms);
    return () => window.clearInterval(id);
  }, [enabled, ms]);
  return tick;
}

export function TelemetryPanel({
  reduced,
  compact = false,
}: {
  reduced: boolean;
  compact?: boolean;
}) {
  const tick = useSlowTick(!reduced);
  const rows = compact ? INDICATORS.slice(0, 3) : INDICATORS;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
      <div className="surface-panel p-4">
        <PanelLabel>System status</PanelLabel>
        <ul className="mt-4 space-y-3">
          {rows.map((row) => {
            const value = row.values[tick % row.values.length];
            const pct = Math.min(100, (value / row.max) * 100);
            return (
              <li key={row.label}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[0.625rem] tracking-[0.14em] text-muted-foreground uppercase">
                    {row.label}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-xs tabular-nums",
                      row.tone === "ok" ? "text-success" : "text-foreground",
                    )}
                  >
                    {value}
                    {row.unit}
                  </span>
                </div>
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className={cn(
                      "h-full rounded-full transition-[width] duration-1000 ease-out",
                      row.tone === "ok" ? "bg-success" : "bg-primary",
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="surface-panel p-4">
        <PanelLabel>Deployment</PanelLabel>
        <ol className="mt-4 space-y-2.5">
          {DEPLOY_STAGES.map((stage) => (
            <li key={stage.label} className="flex items-center gap-2.5">
              <span
                className={cn(
                  "h-1.5 w-1.5 shrink-0 rounded-full",
                  stage.state === "done" && "bg-success",
                  stage.state === "active" && cn("bg-primary", !reduced && "animate-[node-pulse_2.4s_ease-in-out_infinite]"),
                  stage.state === "idle" && "bg-border-strong",
                )}
                aria-hidden
              />
              <span
                className={cn(
                  "font-mono text-xs",
                  stage.state === "idle" ? "text-muted-foreground" : "text-foreground",
                )}
              >
                {stage.label}
              </span>
              <span className="ml-auto font-mono text-[0.625rem] tracking-[0.14em] text-muted-foreground uppercase">
                {stage.state === "active" ? "running" : stage.state === "done" ? "passed" : "queued"}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-4 font-mono text-[0.625rem] leading-relaxed text-muted-foreground">
          Illustrative indicators — a representation of how the platform reports itself, not live
          production telemetry.
        </p>
      </div>
    </div>
  );
}

function PanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[0.625rem] tracking-[0.18em] text-primary uppercase">{children}</p>
  );
}
