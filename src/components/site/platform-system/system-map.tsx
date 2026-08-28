import * as React from "react";

import { cn } from "@/lib/utils";
import { TechGlyph } from "@/components/site/tech-logos";
import {
  CORE,
  MAP_H,
  MAP_W,
  SYSTEM_EDGES,
  SYSTEM_NODES,
  edgePath,
  type SystemNode,
  type SystemNodeId,
} from "./data";

interface SystemMapProps {
  /** Tablet composition: primary domains and the core flow only. */
  simplified?: boolean;
  reduced?: boolean;
  selected: SystemNodeId | null;
  onSelect: (id: SystemNodeId | null) => void;
}

export function SystemMap({ simplified = false, reduced = false, selected, onSelect }: SystemMapProps) {
  const nodes = React.useMemo(
    () => (simplified ? SYSTEM_NODES.filter((n) => n.primary) : SYSTEM_NODES),
    [simplified],
  );
  const visible = React.useMemo(() => new Set(nodes.map((n) => n.id)), [nodes]);
  const edges = React.useMemo(
    () =>
      SYSTEM_EDGES.filter(
        (e) => visible.has(e.from) && (e.to === "core" || visible.has(e.to)),
      ),
    [visible],
  );

  const isLit = (id: SystemNodeId) => selected === null || selected === id;
  const edgeLit = (from: SystemNodeId, to: SystemNodeId | "core") =>
    selected === null || selected === from || selected === to;

  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }}
      onMouseLeave={() => onSelect(null)}
    >
      <svg
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        className="absolute inset-0 h-full w-full"
        aria-hidden
        focusable="false"
      >
        <defs>
          <radialGradient id="ps-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={CORE.x} cy={CORE.y} r={230} className="text-primary" fill="url(#ps-core-glow)" />

        {edges.map((edge) => {
          const d = edgePath(edge);
          const lit = edgeLit(edge.from, edge.to);
          return (
            <g key={edge.id} className="transition-opacity duration-500" opacity={lit ? 1 : 0.18}>
              <path
                d={d}
                fill="none"
                stroke="currentColor"
                strokeWidth={1}
                className={edge.kind === "flow" ? "text-primary/35" : "text-border-strong"}
                strokeDasharray={edge.kind === "support" ? "4 8" : undefined}
              />
              {!reduced && edge.kind === "flow" && (
                <circle r={2.6} className="fill-primary">
                  <animateMotion dur="5.5s" repeatCount="indefinite" path={d} />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    dur="5.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* core rings */}
        <circle
          cx={CORE.x}
          cy={CORE.y}
          r={118}
          fill="none"
          strokeWidth={1}
          className="stroke-primary/25"
          strokeDasharray="2 10"
        />
        <circle cx={CORE.x} cy={CORE.y} r={86} fill="none" strokeWidth={1} className="stroke-primary/30" />
      </svg>

      {/* Core */}
      <div
        className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-primary/40 bg-surface/70 text-center backdrop-blur-sm"
        style={{
          left: `${(CORE.x / MAP_W) * 100}%`,
          top: `${(CORE.y / MAP_H) * 100}%`,
          width: "23%",
          aspectRatio: "1 / 1",
          boxShadow: "0 0 60px -18px var(--color-primary)",
        }}
      >
        <span className="font-mono text-[0.5rem] tracking-[0.2em] text-primary uppercase sm:text-[0.625rem]">
          Platform
        </span>
        <span className="mt-1 font-display text-sm font-semibold text-foreground sm:text-lg">
          System core
        </span>
        <span className="mt-1 hidden font-mono text-[0.625rem] text-muted-foreground lg:block">
          state · policy · delivery
        </span>
      </div>

      {/* Domain nodes */}
      {nodes.map((node) => (
        <NodeCard
          key={node.id}
          node={node}
          lit={isLit(node.id)}
          active={selected === node.id}
          onSelect={onSelect}
          reduced={reduced}
        />
      ))}
    </div>
  );
}

function NodeCard({
  node,
  lit,
  active,
  reduced,
  onSelect,
}: {
  node: SystemNode;
  lit: boolean;
  active: boolean;
  reduced: boolean;
  onSelect: (id: SystemNodeId | null) => void;
}) {
  return (
    <button
      type="button"
      onMouseEnter={() => onSelect(node.id)}
      onFocus={() => onSelect(node.id)}
      onBlur={() => onSelect(null)}
      onClick={() => onSelect(active ? null : node.id)}
      aria-pressed={active}
      className={cn(
        "absolute w-[19%] min-w-[7rem] -translate-x-1/2 -translate-y-1/2 rounded-xl border p-2.5 text-left backdrop-blur-sm transition-all duration-300 lg:p-3",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
        active
          ? "border-primary/70 bg-primary/10"
          : "border-border bg-surface/70 hover:border-border-strong",
        lit ? "opacity-100" : "opacity-35",
      )}
      style={{ left: `${(node.x / MAP_W) * 100}%`, top: `${(node.y / MAP_H) * 100}%` }}
    >
      <span className="flex items-center gap-1.5">
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full bg-primary",
            !reduced && "animate-[node-pulse_3.2s_ease-in-out_infinite]",
          )}
          aria-hidden
        />
        <span className="font-mono text-[0.5625rem] tracking-[0.14em] text-muted-foreground uppercase lg:text-[0.625rem]">
          {node.label}
        </span>
      </span>
      {node.tech.length > 0 && (
        <span className="mt-2 flex items-center gap-2">
          {node.tech.map((tech) => (
            <TechGlyph
              key={tech.name}
              tech={tech}
              className={cn("h-4 w-4 shrink-0 lg:h-[1.125rem] lg:w-[1.125rem]", tech.wide && "w-6 lg:w-7")}
            />
          ))}
        </span>
      )}
    </button>
  );
}
