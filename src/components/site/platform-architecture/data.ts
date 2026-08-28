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
  siTerraform,
} from "simple-icons";
import {
  Activity,
  BellRing,
  Boxes,
  Cloud,
  Container,
  Eye,
  FileKey,
  GitBranch,
  HeartPulse,
  KeyRound,
  Lock,
  Network,
  RefreshCw,
  ScanSearch,
  ScrollText,
  ServerCog,
  ShieldCheck,
  Share2,
  Sparkles,
  Workflow,
} from "lucide-react";

import anthropicMark from "@/assets/brands/anthropic.svg";
import awsMark from "@/assets/brands/aws.svg";
import codexMark from "@/assets/brands/codex.svg";
import lovableMark from "@/assets/brands/lovable.svg";
import openaiMark from "@/assets/brands/openai.svg";
import { HermesAgentMark, type TechLogo } from "@/components/site/tech-logos";

const si = (icon: { title: string; path: string; hex: string }, name?: string): TechLogo => ({
  name: name ?? icon.title,
  path: icon.path,
  hex: `#${icon.hex}`,
});

/** Flow families used by connectors and layer accents. */
export type Tone = "primary" | "ai" | "observe" | "feedback";

export interface ArchItem {
  /** Displayed name (also the accessible label of its icon). */
  name: string;
  /** Optional one-word qualifier under the name. */
  note?: string;
  logo: TechLogo;
}

export interface ArchGroup {
  title: string;
  items: ArchItem[];
  /** Emphasised group (Kubernetes runtime). */
  feature?: boolean;
}

export interface ArchLayerDef {
  id: string;
  /** Uppercase layer label. */
  label: string;
  /** Short sentence describing the layer's role. */
  note: string;
  tone: Tone;
  groups: ArchGroup[];
  /** Hidden on the tablet-simplified composition when false. */
  essential: boolean;
}

const icon = (
  name: string,
  Mark: ComponentType<SVGProps<SVGSVGElement>>,
): TechLogo => ({ name, Mark: Mark as TechLogo["Mark"] });

export const ARCH_LAYERS: ArchLayerDef[] = [
  {
    id: "ai",
    label: "AI-assisted engineering",
    note: "Tools that accelerate design, review and automation work — not the system itself.",
    tone: "ai",
    essential: true,
    groups: [
      {
        title: "Engineering copilots",
        items: [
          { name: "Claude Code", note: "Implementation", logo: { name: "Claude Code", src: anthropicMark } },
          { name: "Codex", note: "Refactoring", logo: { name: "Codex", src: codexMark } },
          { name: "ChatGPT", note: "Problem solving", logo: { name: "ChatGPT", src: openaiMark } },
          { name: "Gemini", note: "Research", logo: si(siGooglegemini, "Gemini") },
          { name: "OpenRouter", note: "Multi-model", logo: si(siOpenrouter, "OpenRouter") },
          { name: "Lovable", note: "Interface", logo: { name: "Lovable", src: lovableMark } },
          { name: "Hermes Agent", note: "Automation", logo: { name: "Hermes Agent", Mark: HermesAgentMark } },
        ],
      },
    ],
  },
  {
    id: "source",
    label: "Source & delivery",
    note: "Every change starts as a reviewed commit and is built by a pipeline.",
    tone: "primary",
    essential: true,
    groups: [
      {
        title: "Source control",
        items: [{ name: "GitHub", note: "Single source of truth", logo: { ...si(siGithub, "GitHub"), hex: "#E6EDF3" } }],
      },
      {
        title: "Continuous delivery",
        items: [
          { name: "GitHub Actions", note: "Build · test", logo: si(siGithubactions, "GitHub Actions") },
          { name: "Jenkins", note: "Pipelines", logo: si(siJenkins) },
        ],
      },
    ],
  },
  {
    id: "build",
    label: "Build & registry",
    note: "Images are built once, tagged, and promoted through environments.",
    tone: "primary",
    essential: true,
    groups: [
      {
        title: "Containerization",
        items: [{ name: "Docker", note: "Reproducible images", logo: si(siDocker) }],
      },
      {
        title: "Container registry",
        items: [{ name: "AWS ECR", note: "Versioned artefacts", logo: { name: "AWS ECR", src: awsMark, wide: true } }],
      },
    ],
  },
  {
    id: "infrastructure",
    label: "Infrastructure & cloud",
    note: "Environments are declared in code, reviewed, and applied — never clicked.",
    tone: "primary",
    essential: true,
    groups: [
      {
        title: "Infrastructure as Code",
        items: [
          { name: "Terraform", note: "Provisioning", logo: si(siTerraform) },
          { name: "Ansible", note: "Configuration", logo: si(siAnsible) },
        ],
      },
      {
        title: "Cloud infrastructure",
        items: [
          { name: "AWS", note: "Platform", logo: { name: "AWS", src: awsMark, wide: true } },
          { name: "VPC", note: "Isolation", logo: icon("VPC", Cloud) },
          { name: "Networking", note: "Routing", logo: icon("Networking", Network) },
          { name: "IAM", note: "Least privilege", logo: icon("IAM", KeyRound) },
        ],
      },
    ],
  },
  {
    id: "gitops",
    label: "GitOps delivery",
    note: "Cluster state converges on Git — drift is detected, not discovered.",
    tone: "primary",
    essential: true,
    groups: [
      {
        title: "Continuous deployment",
        items: [
          { name: "Argo CD", note: "Sync · rollback", logo: si(siArgo, "Argo CD") },
          { name: "Drift detection", note: "Declarative", logo: icon("Drift detection", RefreshCw) },
        ],
      },
    ],
  },
  {
    id: "runtime",
    label: "Kubernetes runtime",
    note: "Workloads are scheduled, scaled and self-healed by the cluster.",
    tone: "primary",
    essential: true,
    groups: [
      {
        title: "Cluster",
        feature: true,
        items: [
          { name: "Deployments", logo: icon("Deployments", Boxes) },
          { name: "Services", logo: icon("Services", Share2) },
          { name: "ConfigMaps", logo: icon("ConfigMaps", ScrollText) },
          { name: "Secrets", logo: icon("Secrets", FileKey) },
          { name: "Workloads", logo: icon("Workloads", Container) },
        ],
      },
    ],
  },
  {
    id: "observability",
    label: "Observability",
    note: "Observe · Analyze · Alert · Improve — the feedback signal of the platform.",
    tone: "observe",
    essential: true,
    groups: [
      {
        title: "Signals",
        items: [
          { name: "Prometheus", note: "Metrics", logo: si(siPrometheus) },
          { name: "Grafana", note: "Dashboards", logo: si(siGrafana) },
          { name: "Loki", note: "Logs", logo: icon("Loki", ScrollText) },
          { name: "Alertmanager", note: "Alerts", logo: icon("Alertmanager", BellRing) },
          { name: "OpenTelemetry", note: "Traces", logo: si(siOpentelemetry, "OpenTelemetry") },
        ],
      },
    ],
  },
  {
    id: "assurance",
    label: "Security & reliability",
    note: "Engineering concerns the architecture is designed around.",
    tone: "feedback",
    essential: false,
    groups: [
      {
        title: "Security",
        items: [
          { name: "IAM", logo: icon("IAM", KeyRound) },
          { name: "Network policies", logo: icon("Network policies", Lock) },
          { name: "Secrets", logo: icon("Secrets", FileKey) },
          { name: "Image scanning", logo: icon("Image scanning", ScanSearch) },
        ],
      },
      {
        title: "Reliability",
        items: [
          { name: "Health checks", logo: icon("Health checks", HeartPulse) },
          { name: "Auto healing", logo: icon("Auto healing", RefreshCw) },
          { name: "Scaling", logo: icon("Scaling", ServerCog) },
          { name: "Monitoring", logo: icon("Monitoring", Activity) },
        ],
      },
    ],
  },
];

export const KUBERNETES_LOGO: TechLogo = si(siKubernetes);

/** Illustrative architecture states — deliberately not production telemetry. */
export const SYSTEM_SIGNALS = [
  { id: "build", label: "Build", state: "Passed", layer: "source" },
  { id: "security", label: "Security", state: "Enforced", layer: "assurance" },
  { id: "registry", label: "Registry", state: "Ready", layer: "build" },
  { id: "gitops", label: "GitOps", state: "Synced", layer: "gitops" },
  { id: "runtime", label: "Runtime", state: "Healthy", layer: "runtime" },
  { id: "observability", label: "Observability", state: "Active", layer: "observability" },
] as const;

export const PRINCIPLES = [
  {
    title: "Cloud native",
    note: "Systems designed for managed services, elasticity and failure as a normal event.",
    Icon: Cloud,
  },
  {
    title: "Infrastructure as Code",
    note: "Environments are declared, reviewed and reproducible from a repository.",
    Icon: Workflow,
  },
  {
    title: "Continuous delivery",
    note: "Small changes ship often through automated build, test and promotion.",
    Icon: GitBranch,
  },
  {
    title: "Security by design",
    note: "Least privilege, isolated networks and scanned artefacts from the start.",
    Icon: ShieldCheck,
  },
  {
    title: "Observability",
    note: "Metrics, logs and traces make behaviour explainable before it becomes an incident.",
    Icon: Eye,
  },
  {
    title: "Reliability",
    note: "Health checks, self-healing and scaling keep services predictable under load.",
    Icon: Sparkles,
  },
];
