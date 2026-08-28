import * as React from "react";

import { cn } from "@/lib/utils";
import { TechGlyph } from "@/components/site/tech-logos";
import { KUBERNETES_LOGO, type ArchItem, type ArchLayerDef, type Tone } from "./data";

const TONE_RING: Record<Tone, string> = {
  primary: "border-primary/30",
  ai: "border-chart-4/40",
  observe: "border-warn/40",
  feedback: "border-success/40",
};

const TONE_TEXT: Record<Tone, string> = {
  primary: "text-primary",
  ai: "text-chart-4",
  observe: "text-warn",
  feedback: "text-success",
};

const TONE_LINE: Record<Tone, string> = {
  primary: "bg-primary/45",
  ai: "bg-chart-4/45",
  observe: "bg-warn/45",
  feedback: "bg-success/45",
};

const TONE_DOT: Record<Tone, string> = {
  primary: "bg-primary",
  ai: "bg-chart-4",
  observe: "bg-warn",
  feedback: "bg-success",
};

/** Vertical connector between two layers, with a single travelling particle. */
export function Connector({
  tone = "primary",
  lit = true,
  reduced = false,
  label,
  dashed = false,
}: {
  tone?: Tone;
  lit?: boolean;
  reduced?: boolean;
  label?: string;
  dashed?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto h-8 w-px transition-opacity duration-300 sm:h-10",
        lit ? "opacity-100" : "opacity-25",
      )}
      aria-hidden
    >
      <span
        className={cn(
          "absolute inset-0",
          dashed
            ? "bg-[length:1px_8px] bg-repeat-y opacity-70"
            : TONE_LINE[tone],
        )}
        style={
          dashed
            ? {
                backgroundImage:
                  "linear-gradient(to bottom, currentColor 0 4px, transparent 4px 8px)",
              }
            : undefined
        }
      />
      {!reduced && (
        <span
          className={cn(
            "absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full animate-flow-down",
            TONE_DOT[tone],
          )}
        />
      )}
      {label && (
        <span className="absolute top-1/2 left-3 -translate-y-1/2 font-mono text-[0.5625rem] tracking-[0.16em] text-muted-foreground uppercase whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
}

function ItemTile({ item, tone, feature }: { item: ArchItem; tone: Tone; feature?: boolean }) {
  return (
    <li
      className={cn(
        "group/tile flex min-w-0 items-center gap-2.5 rounded-xl border border-border bg-surface/60 px-2.5 py-2 transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-elevated/70",
        feature && "border-primary/25 bg-primary/5",
      )}
    >
      <span
        className={cn(
          "relative grid h-8 w-8 shrink-0 place-items-center rounded-lg border bg-background/60",
          TONE_RING[tone],
        )}
      >
        <TechGlyph
          tech={item.logo}
          className={cn("h-4 w-4 transition-transform duration-300 group-hover/tile:scale-110", item.logo.wide && "w-6")}
        />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[0.8125rem] leading-tight font-medium text-foreground">
          {item.name}
        </span>
        {item.note && (
          <span className="block truncate font-mono text-[0.5625rem] tracking-[0.12em] text-muted-foreground uppercase">
            {item.note}
          </span>
        )}
      </span>
    </li>
  );
}

/** One architecture layer: label, description and its technology groups. */
export function ArchLayer({
  layer,
  lit,
  reduced,
  onHover,
}: {
  layer: ArchLayerDef;
  lit: boolean;
  reduced: boolean;
  onHover: (id: string | null) => void;
}) {
  const isRuntime = layer.id === "runtime";
  return (
    <section
      aria-labelledby={`arch-${layer.id}`}
      onMouseEnter={() => onHover(layer.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(layer.id)}
      onBlur={() => onHover(null)}
      tabIndex={0}
      className={cn(
        "surface-panel relative rounded-2xl p-4 transition-all duration-300 sm:p-5",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
        lit ? "opacity-100" : "opacity-40",
        isRuntime && "border-primary/35",
      )}
      style={isRuntime ? { boxShadow: "0 0 70px -34px var(--color-primary)" } : undefined}
    >
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3
          id={`arch-${layer.id}`}
          className={cn(
            "font-mono text-[0.625rem] tracking-[0.2em] uppercase sm:text-[0.6875rem]",
            TONE_TEXT[layer.tone],
          )}
        >
          {layer.label}
        </h3>
        <p className="text-xs leading-relaxed text-muted-foreground">{layer.note}</p>
      </header>

      <div
        className={cn(
          "mt-4 grid gap-3",
          layer.groups.length > 1 && "md:grid-cols-2",
        )}
      >
        {layer.groups.map((group) => (
          <div
            key={group.title}
            className={cn(
              "rounded-xl border border-border/70 bg-background/30 p-3",
              group.feature && "border-primary/25 bg-primary/[0.04]",
            )}
          >
            <div className="flex items-center gap-2">
              {group.feature && (
                <TechGlyph
                  tech={KUBERNETES_LOGO}
                  className={cn("h-4 w-4 shrink-0", !reduced && "animate-[node-pulse_3.4s_ease-in-out_infinite]")}
                />
              )}
              <p className="font-mono text-[0.5625rem] tracking-[0.16em] text-muted-foreground uppercase">
                {group.feature ? "Kubernetes cluster · self-healing · scaling" : group.title}
              </p>
            </div>
            <ul
              className={cn(
                "mt-3 grid gap-2",
                group.items.length > 4
                  ? "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4"
                  : group.items.length > 1
                    ? "grid-cols-2"
                    : "grid-cols-1",
              )}
            >
              {group.items.map((item) => (
                <ItemTile key={item.name} item={item} tone={layer.tone} feature={group.feature} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
