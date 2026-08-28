import type { ComponentType, SVGProps } from "react";
import {
  siAnsible,
  siArgo,
  siDocker,
  siGithub,
  siGithubactions,
  siGooglegemini,
  siGrafana,
  siJenkins,
  siKubernetes,
  siOpenrouter,
  siOpentelemetry,
  siPrometheus,
  siSonarqubeserver,
  siTerraform,
  siTrivy,
} from "simple-icons";
import {
  Boxes,
  Cloud,
  Globe2,
  HardDrive,
  KeyRound,
  Network,
  ScrollText,
  Server,
} from "lucide-react";

import anthropicMark from "@/assets/brands/anthropic.svg";
import awsMark from "@/assets/brands/aws.svg";
import codexMark from "@/assets/brands/codex.svg";
import openaiMark from "@/assets/brands/openai.svg";
import type { TechLogo } from "@/components/site/tech-logos";

const si = (icon: { title: string; path: string; hex: string }, name?: string): TechLogo => ({
  name: name ?? icon.title,
  path: icon.path,
  hex: `#${icon.hex}`,
});

const glyph = (name: string, Mark: ComponentType<SVGProps<SVGSVGElement>>): TechLogo => ({
  name,
  Mark: Mark as TechLogo["Mark"],
});

/** Signal families — one colour per relationship type. */
export type Tone = "primary" | "ai" | "observe" | "feedback";

export interface CPNode {
  id: string;
  /** Uppercase group label. */
  label: string;
  items: TechLogo[];
  tone: Tone;
  /** Centre + size in the 1000 x 700 visualization coordinate space. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** The Kubernetes platform — rendered as the layered centrepiece. */
  core?: boolean;
}

export const NODES: CPNode[] = [
  {
    id: "ai",
    label: "AI engineering",
    tone: "ai",
    x: 500,
    y: 74,
    w: 540,
    h: 96,
    items: [
      { name: "Claude Code", src: anthropicMark },
      { name: "Codex", src: codexMark },
      { name: "ChatGPT", src: openaiMark },
      si(siGooglegemini, "Gemini"),
      si(siOpenrouter, "OpenRouter"),
    ],
  },
  {
    id: "source",
    label: "Source",
    tone: "primary",
    x: 118,
    y: 236,
    w: 186,
    h: 88,
    items: [{ ...si(siGithub, "GitHub"), hex: "#E6EDF3" }],
  },
  {
    id: "delivery",
    label: "Delivery",
    tone: "primary",
    x: 352,
    y: 236,
    w: 216,
    h: 88,
    items: [si(siGithubactions, "Actions"), si(siJenkins, "Jenkins")],
  },
  {
    id: "build",
    label: "Build & registry",
    tone: "primary",
    x: 600,
    y: 236,
    w: 216,
    h: 88,
    items: [si(siDocker, "Docker"), { name: "AWS ECR", src: awsMark, wide: true }],
  },
  {
    id: "infra",
    label: "Infrastructure",
    tone: "primary",
    x: 874,
    y: 150,
    w: 212,
    h: 88,
    items: [si(siTerraform, "Terraform"), si(siAnsible, "Ansible")],
  },
  {
    id: "cloud",
    label: "Cloud",
    tone: "primary",
    x: 874,
    y: 322,
    w: 212,
    h: 96,
    items: [
      { name: "AWS", src: awsMark, wide: true },
      glyph("VPC", Network),
      glyph("EC2", Server),
      glyph("S3", HardDrive),
      glyph("Route 53", Globe2),
    ],
  },
  {
    id: "platform",
    label: "Platform runtime",
    tone: "primary",
    core: true,
    x: 452,
    y: 438,
    w: 400,
    h: 146,
    items: [si(siKubernetes, "Kubernetes")],
  },
  {
    id: "gitops",
    label: "GitOps",
    tone: "primary",
    x: 132,
    y: 552,
    w: 200,
    h: 88,
    items: [si(siArgo, "Argo CD")],
  },
  {
    id: "observability",
    label: "Observability",
    tone: "observe",
    x: 790,
    y: 552,
    w: 320,
    h: 88,
    items: [
      si(siPrometheus, "Prometheus"),
      si(siGrafana, "Grafana"),
      glyph("Loki", ScrollText),
      si(siOpentelemetry, "OTel"),
    ],
  },
  {
    id: "security",
    label: "Security & quality",
    tone: "feedback",
    x: 452,
    y: 644,
    w: 320,
    h: 84,
    items: [si(siSonarqubeserver, "SonarQube"), si(siTrivy, "Trivy"), glyph("IAM", KeyRound)],
  },
];

export const NODE_BY_ID = Object.fromEntries(NODES.map((n) => [n.id, n])) as Record<string, CPNode>;

export type Side = "top" | "bottom" | "left" | "right";

export interface CPEdge {
  from: string;
  fromSide: Side;
  to: string;
  toSide: Side;
  tone: Tone;
  /** Curve strength; higher bows the path further out. */
  bow?: number;
  dashed?: boolean;
  /** Render a travelling particle along this path. */
  signal?: boolean;
  /** Explicit path, used for the long feedback return. */
  d?: string;
}

export const EDGES: CPEdge[] = [
  { from: "ai", fromSide: "bottom", to: "source", toSide: "top", tone: "ai", bow: 90, signal: true },
  { from: "source", fromSide: "right", to: "delivery", toSide: "left", tone: "primary", signal: true },
  { from: "delivery", fromSide: "right", to: "build", toSide: "left", tone: "primary", signal: true },
  { from: "build", fromSide: "right", to: "infra", toSide: "left", tone: "primary", bow: 70 },
  { from: "infra", fromSide: "bottom", to: "cloud", toSide: "top", tone: "primary", signal: true },
  { from: "cloud", fromSide: "bottom", to: "platform", toSide: "right", tone: "primary", bow: 90, signal: true },
  { from: "build", fromSide: "bottom", to: "platform", toSide: "top", tone: "primary", bow: 70, signal: true },
  { from: "platform", fromSide: "left", to: "gitops", toSide: "top", tone: "primary", bow: 80 },
  { from: "gitops", fromSide: "right", to: "platform", toSide: "bottom", tone: "primary", bow: 60, dashed: true, signal: true },
  { from: "platform", fromSide: "bottom", to: "observability", toSide: "left", tone: "observe", bow: 80, signal: true },
  { from: "observability", fromSide: "bottom", to: "security", toSide: "right", tone: "feedback", bow: 60 },
  { from: "gitops", fromSide: "bottom", to: "security", toSide: "left", tone: "feedback", bow: 60 },
  {
    from: "security",
    fromSide: "left",
    to: "ai",
    toSide: "left",
    tone: "feedback",
    dashed: true,
    signal: true,
    d: "M292 644 C 40 640 12 400 14 240 C 16 120 90 74 230 74",
  },
];

/** Illustrative architecture states — deliberately not production telemetry. */
export const SIGNALS = [
  { id: "build", label: "Build", state: "Ready", node: "delivery" },
  { id: "registry", label: "Registry", state: "Ready", node: "build" },
  { id: "gitops", label: "GitOps", state: "Synced", node: "gitops" },
  { id: "runtime", label: "Runtime", state: "Healthy", node: "platform" },
  { id: "observability", label: "Observability", state: "Active", node: "observability" },
  { id: "security", label: "Security", state: "Enforced", node: "security" },
] as const;

/** Mobile composition — a deliberately reduced reading of the same system. */
export const MOBILE_STEPS: { id: string; label: string; items: TechLogo[] }[] = [
  { id: "ai", label: "AI engineering", items: NODE_BY_ID["ai"]!.items },
  {
    id: "delivery",
    label: "Source → delivery",
    items: [...NODE_BY_ID["source"]!.items, ...NODE_BY_ID["delivery"]!.items],
  },
  {
    id: "build",
    label: "Build & registry",
    items: NODE_BY_ID["build"]!.items,
  },
  {
    id: "cloud",
    label: "Cloud & infrastructure",
    items: [...NODE_BY_ID["infra"]!.items, ...NODE_BY_ID["cloud"]!.items],
  },
  { id: "platform", label: "Kubernetes runtime", items: NODE_BY_ID["platform"]!.items },
  {
    id: "feedback",
    label: "GitOps + observability",
    items: [...NODE_BY_ID["gitops"]!.items, ...NODE_BY_ID["observability"]!.items],
  },
  { id: "security", label: "Security & quality", items: NODE_BY_ID["security"]!.items },
];

export const TONE_VAR: Record<Tone, string> = {
  primary: "var(--color-primary)",
  ai: "var(--color-chart-4)",
  observe: "var(--color-warn)",
  feedback: "var(--color-success)",
};
