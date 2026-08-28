import * as React from "react";

import { cn } from "@/lib/utils";
import { TechGlyph, type TechLogo } from "@/components/site/tech-logos";
import { EDGES, NODES, NODE_BY_ID, TONE_VAR, type CPEdge, type CPNode, type Side } from "./data";

const W = 1000;
const H = 700;

function anchor(n: CPNode, side: Side): [number, number] {
  switch (side) {
    case "top":
      return [n.x, n.y - n.h / 2];
    case "bottom":
      return [n.x, n.y + n.h / 2];
    case "left":
      return [n.x - n.w / 2, n.y];
    default:
      return [n.x + n.w / 2, n.y];
  }
}

function offset(side: Side, bow: number): [number, number] {
  switch (side) {
    case "top":
      return [0, -bow];
    case "bottom":
      return [0, bow];
    case "left":
      return [-bow, 0];
    default:
      return [bow, 0];
  }
}

function pathFor(edge: CPEdge): string {
  if (edge.d) return edge.d;
  const a = NODE_BY_ID[edge.from]!;
  const b = NODE_BY_ID[edge.to]!;
  const [ax, ay] = anchor(a, edge.fromSide);
  const [bx, by] = anchor(b, edge.toSide);
  const bow = edge.bow ?? 40;
  const [o1x, o1y] = offset(edge.fromSide, bow);
  const [o2x, o2y] = offset(edge.toSide, bow);
  return `M${ax} ${ay} C ${ax + o1x} ${ay + o1y}, ${bx + o2x} ${by + o2y}, ${bx} ${by}`;
}

const PATHS = EDGES.map(pathFor);

/** Nodes directly connected to `id`, including itself. */
const NEIGHBOURS: Record<string, Set<string>> = Object.fromEntries(
  NODES.map((n) => {
    const set = new Set<string>([n.id]);
    for (const e of EDGES) {
      if (e.from === n.id) set.add(e.to);
      if (e.to === n.id) set.add(e.from);
    }
    return [n.id, set];
  }),
);

function NodeItem({ item, dense }: { item: TechLogo; dense?: boolean }) {
  return (
    <span className="flex min-w-0 flex-col items-center gap-1">
      <span className="relative flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        <TechGlyph tech={item} className={item.wide ? "h-3.5 w-5" : "h-4 w-4"} />
      </span>
      <span
        className={cn(
          "max-w-[5.5rem] truncate font-mono text-[0.5rem] tracking-[0.08em] text-muted-foreground uppercase",
          dense && "max-w-[4.5rem]",
        )}
      >
        {item.name}
      </span>
    </span>
  );
}

function Node({
  node,
  state,
  reduced,
  onHover,
}: {
  node: CPNode;
  state: "lit" | "dim" | "base";
  reduced: boolean;
  onHover: (id: string | null) => void;
}) {
  const tone = TONE_VAR[node.tone];
  return (
    <div
      role="group"
      aria-label={`${node.label}: ${node.items.map((i) => i.name).join(", ")}`}
      tabIndex={0}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(node.id)}
      onBlur={() => onHover(null)}
      className={cn(
        "absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-surface/70 px-3 py-2 backdrop-blur-md",
        "transition-[opacity,transform,border-color,box-shadow] duration-500 ease-out outline-none",
        "focus-visible:ring-2 focus-visible:ring-primary",
        state === "dim" && "opacity-35",
        state === "lit" && "-translate-y-[calc(50%+3px)] border-border-strong",
        node.core && "px-4 py-3",
      )}
      style={{
        left: `${(node.x / W) * 100}%`,
        top: `${(node.y / H) * 100}%`,
        width: `${(node.w / W) * 100}%`,
        boxShadow:
          state === "lit"
            ? `0 0 46px -16px ${tone}, inset 0 1px 0 rgba(255,255,255,0.06)`
            : `0 18px 40px -32px #000, inset 0 1px 0 rgba(255,255,255,0.05)`,
      }}
    >
      <span
        aria-hidden
        className="absolute inset-x-6 -top-px h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${tone}, transparent)`, opacity: state === "dim" ? 0.2 : 0.7 }}
      />
      <p
        className="text-center font-mono text-[0.5rem] tracking-[0.2em] uppercase"
        style={{ color: tone }}
      >
        {node.label}
      </p>

      {node.core ? (
        <div className="mt-2 flex items-center justify-center gap-3">
          <span
            className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-primary/40 bg-background/70"
            style={{ boxShadow: `0 0 40px -12px ${tone}` }}
          >
            <TechGlyph tech={node.items[0]!} className="h-7 w-7" />
          </span>
          <span className="flex flex-col gap-1">
            <span className="font-display text-sm font-semibold text-foreground">Kubernetes</span>
            <span className="flex gap-1.5">
              {["Deployments", "Services", "Pods", "Config", "Secrets"].map((p, i) => (
                <span
                  key={p}
                  title={p}
                  className={cn(
                    "h-4 w-6 rounded-[0.25rem] border border-primary/30 bg-primary/10",
                    !reduced && "animate-[node-pulse_3.6s_ease-in-out_infinite]",
                  )}
                  style={{ animationDelay: `${i * 0.35}s` }}
                />
              ))}
            </span>
            <span className="font-mono text-[0.5rem] tracking-[0.16em] text-muted-foreground uppercase">
              Scheduled · scaled · self-healed
            </span>
          </span>
        </div>
      ) : (
        <div className="mt-2 flex flex-wrap items-start justify-center gap-x-3 gap-y-2">
          {node.items.map((item) => (
            <NodeItem key={item.name} item={item} dense={node.items.length > 3} />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * The control plane map: an SVG signal layer with glass technology nodes
 * positioned in the same 1000 x 700 coordinate space, so the whole system
 * scales as one composition.
 */
export function ControlPlaneMap({
  reduced,
  hovered,
  onHover,
}: {
  reduced: boolean;
  hovered: string | null;
  onHover: (id: string | null) => void;
}) {
  const active = hovered ? NEIGHBOURS[hovered] : null;

  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: `${W} / ${H}`, perspective: "1400px" }}
      onMouseLeave={() => onHover(null)}
    >
      {/* atmospheric floor under the platform */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 42% at 45% 63%, color-mix(in oklab, var(--color-primary) 14%, transparent), transparent 70%)",
        }}
      />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 h-full w-full"
        aria-hidden
        focusable="false"
      >
        {EDGES.map((edge, i) => {
          const d = PATHS[i]!;
          const lit = !active || (active.has(edge.from) && active.has(edge.to));
          const tone = TONE_VAR[edge.tone];
          return (
            <g key={`${edge.from}-${edge.to}-${i}`} opacity={lit ? 1 : 0.15} className="transition-opacity duration-500">
              <path
                d={d}
                fill="none"
                stroke={tone}
                strokeWidth={hovered && lit ? 1.6 : 1}
                strokeOpacity={hovered && lit ? 0.75 : 0.38}
                strokeDasharray={edge.dashed ? "5 7" : "3 9"}
                className={reduced ? undefined : "cp-dash"}
                style={{ animationDelay: `${i * -0.7}s` }}
              />
              {!reduced && edge.signal && (
                <circle r="2.6" fill={tone} opacity="0.9">
                  <animateMotion dur={`${7 + (i % 3)}s`} repeatCount="indefinite" path={d} />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {NODES.map((node) => (
        <Node
          key={node.id}
          node={node}
          reduced={reduced}
          state={!active ? "base" : active.has(node.id) ? "lit" : "dim"}
          onHover={onHover}
        />
      ))}
    </div>
  );
}
