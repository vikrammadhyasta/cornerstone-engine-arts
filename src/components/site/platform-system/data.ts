import {
  siAnsible,
  siArgo,
  siDocker,
  siGithubactions,
  siGrafana,
  siJenkins,
  siKubernetes,
  siLinux,
  siPrometheus,
  siTerraform,
} from "simple-icons";

import awsMark from "@/assets/brands/aws.svg";
import type { TechLogo } from "@/components/site/tech-logos";

const si = (icon: { title: string; path: string; hex: string }, name?: string): TechLogo => ({
  name: name ?? icon.title,
  path: icon.path,
  hex: `#${icon.hex}`,
});

/** Design-space of the visualization; nodes are positioned in these units. */
export const MAP_W = 1000;
export const MAP_H = 620;
export const CORE = { x: 500, y: 310 };

export type SystemNodeId =
  | "cloud"
  | "infrastructure"
  | "containers"
  | "orchestration"
  | "application"
  | "observability"
  | "security"
  | "delivery";

export interface SystemNode {
  id: SystemNodeId;
  /** Short uppercase domain label. */
  label: string;
  /** One-line explanation, also read by assistive tech. */
  note: string;
  x: number;
  y: number;
  tech: TechLogo[];
  /** Anchor side used to draw the connector into the core. */
  side: "top" | "bottom" | "left" | "right";
  /** Hidden on the tablet-simplified map when false. */
  primary: boolean;
}

export const SYSTEM_NODES: SystemNode[] = [
  {
    id: "cloud",
    label: "Cloud",
    note: "Accounts, regions, networking and managed services as the substrate.",
    x: 500,
    y: 62,
    side: "bottom",
    primary: true,
    tech: [{ name: "AWS", src: awsMark, wide: true }],
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    note: "Declarative provisioning and configuration, versioned in Git.",
    x: 168,
    y: 128,
    side: "right",
    primary: true,
    tech: [si(siTerraform), si(siAnsible), si(siLinux)],
  },
  {
    id: "containers",
    label: "Containers",
    note: "Reproducible images built once and promoted through environments.",
    x: 108,
    y: 320,
    side: "right",
    primary: true,
    tech: [si(siDocker)],
  },
  {
    id: "orchestration",
    label: "Orchestration",
    note: "Scheduling, scaling and self-healing of workloads.",
    x: 196,
    y: 520,
    side: "top",
    primary: true,
    tech: [si(siKubernetes)],
  },
  {
    id: "application",
    label: "Workloads",
    note: "The services users actually touch — deployed, versioned, rolled back.",
    x: 500,
    y: 566,
    side: "top",
    primary: true,
    tech: [],
  },
  {
    id: "observability",
    label: "Observability",
    note: "Metrics, dashboards and alerting that make behaviour explainable.",
    x: 806,
    y: 520,
    side: "top",
    primary: true,
    tech: [si(siPrometheus), si(siGrafana)],
  },
  {
    id: "security",
    label: "Security",
    note: "Least-privilege access, isolated networks and scanned artefacts.",
    x: 894,
    y: 320,
    side: "left",
    primary: false,
    tech: [],
  },
  {
    id: "delivery",
    label: "Delivery & GitOps",
    note: "Pipelines build and test; Git state converges onto the cluster.",
    x: 834,
    y: 128,
    side: "left",
    primary: false,
    tech: [si(siGithubactions, "GitHub Actions"), si(siJenkins), si(siArgo, "Argo CD")],
  },
];

export interface SystemEdge {
  id: string;
  from: SystemNodeId;
  to: SystemNodeId | "core";
  /** Curvature offset for the quadratic control point. */
  bow?: number;
  /** Supporting layers render quieter than the primary flow. */
  kind: "flow" | "support";
}

/** Conceptual flow plus the supporting layers that wrap around it. */
export const SYSTEM_EDGES: SystemEdge[] = [
  { id: "cloud-infra", from: "cloud", to: "infrastructure", bow: 60, kind: "flow" },
  { id: "infra-containers", from: "infrastructure", to: "containers", bow: 40, kind: "flow" },
  { id: "containers-orch", from: "containers", to: "orchestration", bow: 40, kind: "flow" },
  { id: "orch-app", from: "orchestration", to: "application", bow: 40, kind: "flow" },
  { id: "app-obs", from: "application", to: "observability", bow: 40, kind: "flow" },
  { id: "obs-cloud", from: "observability", to: "security", bow: 40, kind: "support" },
  { id: "sec-delivery", from: "security", to: "delivery", bow: 40, kind: "support" },
  { id: "delivery-cloud", from: "delivery", to: "cloud", bow: 60, kind: "support" },

  { id: "core-cloud", from: "cloud", to: "core", kind: "support" },
  { id: "core-infra", from: "infrastructure", to: "core", kind: "support" },
  { id: "core-containers", from: "containers", to: "core", kind: "support" },
  { id: "core-orch", from: "orchestration", to: "core", kind: "flow" },
  { id: "core-app", from: "application", to: "core", kind: "flow" },
  { id: "core-obs", from: "observability", to: "core", kind: "flow" },
  { id: "core-sec", from: "security", to: "core", kind: "support" },
  { id: "core-delivery", from: "delivery", to: "core", kind: "support" },
];

const byId = (id: SystemNodeId) => SYSTEM_NODES.find((n) => n.id === id)!;

/** Quadratic path between two nodes (or a node and the core), bowed outward. */
export function edgePath(edge: SystemEdge): string {
  const a = byId(edge.from);
  const b = edge.to === "core" ? CORE : byId(edge.to);
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  if (!edge.bow) return `M${a.x} ${a.y} L${b.x} ${b.y}`;
  // bow away from the core
  const dx = mx - CORE.x;
  const dy = my - CORE.y;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx + (dx / len) * edge.bow;
  const cy = my + (dy / len) * edge.bow;
  return `M${a.x} ${a.y} Q${cx} ${cy} ${b.x} ${b.y}`;
}

/** Conceptual indicators — illustrative only, never presented as live data. */
export interface Indicator {
  label: string;
  unit?: string;
  /** Cycled values, so the panel breathes without pretending to be real. */
  values: number[];
  max: number;
  tone?: "ok" | "accent";
}

export const INDICATORS: Indicator[] = [
  { label: "CPU", unit: "%", values: [38, 44, 41, 47], max: 100 },
  { label: "Memory", unit: "%", values: [56, 61, 58, 63], max: 100 },
  { label: "Latency", unit: "ms", values: [82, 91, 86, 78], max: 200 },
  { label: "Requests", unit: "k/s", values: [11, 12, 13, 12], max: 20 },
  { label: "Availability", unit: "%", values: [99.9, 99.9, 99.9, 99.9], max: 100, tone: "ok" },
];

export const DEPLOY_STAGES = [
  { label: "Build", state: "done" as const },
  { label: "Scan", state: "done" as const },
  { label: "Sync", state: "done" as const },
  { label: "Rollout", state: "active" as const },
  { label: "Verify", state: "idle" as const },
];
