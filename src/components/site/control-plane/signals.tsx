import { cn } from "@/lib/utils";
import { SIGNALS } from "./data";

/** Architectural states — explicitly not live telemetry. Text carries the state, not colour alone. */
export function SystemSignals({
  reduced,
  hovered,
  onHover,
}: {
  reduced: boolean;
  hovered: string | null;
  onHover: (id: string | null) => void;
}) {
  return (
    <aside className="surface-panel h-fit rounded-2xl p-4">
      <p className="font-mono text-[0.625rem] tracking-[0.2em] text-primary uppercase">System signals</p>
      <ul className="mt-4 space-y-2">
        {SIGNALS.map((signal) => {
          const lit = hovered === null || hovered === signal.node;
          return (
            <li
              key={signal.id}
              onMouseEnter={() => onHover(signal.node)}
              onMouseLeave={() => onHover(null)}
              className={cn(
                "flex items-center justify-between gap-3 rounded-xl border border-border bg-background/40 px-3 py-2 transition-opacity duration-300",
                lit ? "opacity-100" : "opacity-40",
              )}
            >
              <span className="flex min-w-0 items-center gap-2">
                <span
                  aria-hidden
                  className={cn(
                    "h-1.5 w-1.5 shrink-0 rounded-full bg-success",
                    !reduced && "animate-[node-pulse_3.2s_ease-in-out_infinite]",
                  )}
                />
                <span className="truncate font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
                  {signal.label}
                </span>
              </span>
              <span className="font-mono text-[0.625rem] tracking-[0.14em] text-success uppercase">
                {signal.state}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 border-t border-border pt-3 text-[0.6875rem] leading-relaxed text-muted-foreground">
        Illustrative architecture states — not live production telemetry.
      </p>
    </aside>
  );
}
