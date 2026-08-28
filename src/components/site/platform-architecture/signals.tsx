import { cn } from "@/lib/utils";
import { SYSTEM_SIGNALS } from "./data";

/**
 * Illustrative architecture states — explicitly not live production telemetry.
 * State is communicated by text as well as colour.
 */
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
    <aside className="surface-panel h-fit rounded-2xl p-4 lg:sticky lg:top-24">
      <p className="font-mono text-[0.625rem] tracking-[0.2em] text-primary uppercase">
        System signals
      </p>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        Illustrative architecture states, not live production telemetry.
      </p>

      <ul className="mt-4 space-y-2">
        {SYSTEM_SIGNALS.map((signal) => {
          const lit = hovered === null || hovered === signal.layer;
          return (
            <li
              key={signal.id}
              onMouseEnter={() => onHover(signal.layer)}
              onMouseLeave={() => onHover(null)}
              className={cn(
                "flex items-center justify-between gap-3 rounded-xl border border-border bg-background/40 px-3 py-2 transition-all duration-300",
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

      <p className="mt-4 border-t border-border pt-3 font-mono text-[0.5625rem] tracking-[0.16em] text-muted-foreground uppercase">
        Observe → Understand → Improve → Deploy
      </p>
    </aside>
  );
}
