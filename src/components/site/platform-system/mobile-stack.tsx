import { cn } from "@/lib/utils";
import { TechGlyph } from "@/components/site/tech-logos";
import { SYSTEM_NODES } from "./data";

/**
 * Deliberately simplified mobile composition: the same system read as a
 * vertical layer stack, with the core stated once at the top.
 */
export function MobileStack({ reduced }: { reduced: boolean }) {
  const layers = SYSTEM_NODES.filter((n) => n.primary);
  const support = SYSTEM_NODES.filter((n) => !n.primary);

  return (
    <div>
      <div className="surface-panel flex items-center gap-3 p-4">
        <span
          className={cn(
            "h-2 w-2 rounded-full bg-primary",
            !reduced && "animate-[node-pulse_3.2s_ease-in-out_infinite]",
          )}
          aria-hidden
        />
        <div>
          <p className="font-mono text-[0.625rem] tracking-[0.18em] text-primary uppercase">
            Platform core
          </p>
          <p className="text-sm text-foreground">State, policy and delivery in one system</p>
        </div>
      </div>

      <ol className="mt-4 space-y-2">
        {layers.map((node, i) => (
          <li key={node.id}>
            <div className="rounded-xl border border-border bg-surface/60 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
                  {String(i + 1).padStart(2, "0")} · {node.label}
                </span>
                {node.tech.length > 0 && (
                  <span className="flex items-center gap-2">
                    {node.tech.map((tech) => (
                      <TechGlyph
                        key={tech.name}
                        tech={tech}
                        className={cn("h-4 w-4 shrink-0", tech.wide && "w-6")}
                      />
                    ))}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{node.note}</p>
            </div>
            {i < layers.length - 1 && (
              <span aria-hidden className="mx-auto block h-4 w-px bg-border-strong" />
            )}
          </li>
        ))}
      </ol>

      <div className="mt-4 rounded-xl border border-dashed border-border-strong bg-surface/30 p-4">
        <p className="font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase">
          Supporting layers
        </p>
        <ul className="mt-3 space-y-2">
          {support.map((node) => (
            <li key={node.id} className="text-sm text-muted-foreground">
              <span className="text-foreground">{node.label}</span> — {node.note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
