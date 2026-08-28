import { cn } from "@/lib/utils";
import { TechGlyph } from "@/components/site/tech-logos";
import { MOBILE_STEPS } from "./data";

/** Deliberately redesigned mobile reading of the control plane. */
export function ControlPlaneMobile({ reduced }: { reduced: boolean }) {
  return (
    <ol className="space-y-0">
      {MOBILE_STEPS.map((step, i) => (
        <li key={step.id}>
          <div
            className={cn(
              "rounded-2xl border border-border bg-surface/60 p-3 backdrop-blur-md",
              step.id === "platform" && "border-primary/40",
            )}
            style={
              step.id === "platform"
                ? { boxShadow: "0 0 50px -26px var(--color-primary)" }
                : undefined
            }
          >
            <p className="font-mono text-[0.5625rem] tracking-[0.2em] text-primary uppercase">
              {step.label}
            </p>
            <div className="-mx-1 mt-3 flex gap-4 overflow-x-auto px-1 pb-1">
              {step.items.map((item) => (
                <span key={item.name} className="flex shrink-0 flex-col items-center gap-1">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background/70">
                    <TechGlyph tech={item} className={item.wide ? "h-4 w-6" : "h-4.5 w-4.5"} />
                  </span>
                  <span className="font-mono text-[0.5rem] tracking-[0.08em] text-muted-foreground uppercase">
                    {item.name}
                  </span>
                </span>
              ))}
            </div>
          </div>
          {i < MOBILE_STEPS.length - 1 && (
            <div className="flex h-6 justify-center" aria-hidden>
              <span
                className={cn(
                  "w-px bg-linear-to-b from-primary/60 to-primary/10",
                  !reduced && "animate-[node-pulse_3.4s_ease-in-out_infinite]",
                )}
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
