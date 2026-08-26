import * as React from "react";
import { Pause, Play } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  DeveloperMark,
  DynamoDbBrandMark,
  Ec2BrandMark,
  GitHubActionsBrandMark,
  GitHubBrandMark,
  IamBrandMark,
  S3BrandMark,
  SecurityGroupBrandMark,
  TerraformBrandMark,
  VpcBrandMark,
} from "./brand-marks";

type NodeId =
  | "dev"
  | "github"
  | "actions"
  | "terraform"
  | "aws"
  | "state"
  | "vpc"
  | "ec2"
  | "s3"
  | "ddb"
  | "subnet"
  | "compute"
  | "statefile"
  | "lock"
  | "sg";

interface Phase {
  id: string;
  step: string;
  title: string;
  detail: string;
  nodes: NodeId[];
  /** Terraform command lines highlighted inside the Terraform block. */
  cmd?: number;
}

const PHASES: Phase[] = [
  {
    id: "commit",
    step: "01",
    title: "git push",
    detail:
      "The engineer commits Terraform configuration and pushes to the main branch of the repository.",
    nodes: ["dev", "github"],
  },
  {
    id: "trigger",
    step: "02",
    title: "Workflow triggered",
    detail:
      "The push starts the GitHub Actions workflow, which checks out the repository, installs Terraform and configures AWS credentials from repository secrets.",
    nodes: ["github", "actions", "terraform"],
  },
  {
    id: "init",
    step: "03",
    title: "terraform init",
    detail:
      "Terraform initialises the remote backend: state is read from the S3 bucket and a lock item is acquired in the DynamoDB table.",
    nodes: ["terraform", "state", "s3", "ddb", "statefile", "lock"],
    cmd: 0,
  },
  {
    id: "validate",
    step: "04",
    title: "fmt & validate",
    detail:
      "Formatting and configuration validation run before anything is planned, so syntax and schema errors fail the workflow early.",
    nodes: ["terraform"],
    cmd: 1,
  },
  {
    id: "plan",
    step: "05",
    title: "terraform plan",
    detail:
      "Terraform compares the configuration against the remote state and produces the exact set of AWS changes it intends to make.",
    nodes: ["terraform", "state", "s3", "statefile"],
    cmd: 2,
  },
  {
    id: "apply",
    step: "06",
    title: "terraform apply",
    detail:
      "The plan is applied. The VPC, public subnet, security group and EC2 instance are created from the modules.",
    nodes: ["terraform", "aws", "vpc", "ec2", "subnet", "compute", "sg"],
    cmd: 3,
  },
  {
    id: "state",
    step: "07",
    title: "State written, lock released",
    detail:
      "The updated state file is written back to S3 and the DynamoDB lock is released, leaving the backend ready for the next run.",
    nodes: ["state", "s3", "ddb", "statefile", "lock"],
  },
];

const PHASE_MS = 2400;

const CMDS = ["init", "validate", "plan", "apply"];

function useReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/* ── geometry ───────────────────────────────────────────────────────────── */

interface Box {
  id: NodeId;
  cx: number;
  y: number;
  w: number;
  h: number;
  label: string;
  meta?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  small?: boolean;
}

const BOXES: Box[] = [
  { id: "dev", cx: 120, y: 24, w: 180, h: 54, label: "Developer", meta: "Terraform IaC", icon: DeveloperMark },
  { id: "github", cx: 450, y: 24, w: 180, h: 54, label: "GitHub", meta: "terraform-aws-infra", icon: GitHubBrandMark },
  { id: "actions", cx: 780, y: 24, w: 180, h: 54, label: "GitHub Actions", meta: "terraform.yml", icon: GitHubActionsBrandMark },

  { id: "aws", cx: 240, y: 372, w: 210, h: 54, label: "AWS Infrastructure", meta: "eu-north-1", icon: IamBrandMark },
  { id: "state", cx: 680, y: 372, w: 210, h: 54, label: "Remote State", meta: "backend \"s3\"", icon: TerraformBrandMark },

  { id: "vpc", cx: 150, y: 460, w: 160, h: 52, label: "VPC", meta: "10.0.0.0/16", icon: VpcBrandMark },
  { id: "ec2", cx: 336, y: 460, w: 160, h: 52, label: "EC2", meta: "t3.micro", icon: Ec2BrandMark },
  { id: "s3", cx: 584, y: 460, w: 160, h: 52, label: "S3", meta: "tfstate", icon: S3BrandMark },
  { id: "ddb", cx: 770, y: 460, w: 160, h: 52, label: "DynamoDB", meta: "lock table", icon: DynamoDbBrandMark },

  { id: "subnet", cx: 150, y: 544, w: 130, h: 32, label: "subnet", small: true },
  { id: "compute", cx: 336, y: 544, w: 130, h: 32, label: "compute", small: true },
  { id: "statefile", cx: 584, y: 544, w: 130, h: 32, label: "state", small: true },
  { id: "lock", cx: 770, y: 544, w: 130, h: 32, label: "lock", small: true },

  { id: "sg", cx: 150, y: 612, w: 176, h: 46, label: "Security group", meta: "22 · 80", icon: SecurityGroupBrandMark },
];

interface Edge {
  d: string;
  phases: string[];
}

const EDGES: Edge[] = [
  { d: "M210 51 H360", phases: ["commit"] },
  { d: "M540 51 H690", phases: ["trigger"] },
  { d: "M780 78 V106 H450 V140", phases: ["trigger"] },

  { d: "M450 322 V346 H240 V372", phases: ["apply"] },
  { d: "M450 322 V346 H680 V372", phases: ["init", "plan", "state"] },

  { d: "M240 426 V442 H150 V460", phases: ["apply"] },
  { d: "M240 426 V442 H336 V460", phases: ["apply"] },
  { d: "M680 426 V442 H584 V460", phases: ["init", "plan", "state"] },
  { d: "M680 426 V442 H770 V460", phases: ["init", "state"] },

  { d: "M150 512 V544", phases: ["apply"] },
  { d: "M336 512 V544", phases: ["apply"] },
  { d: "M584 512 V544", phases: ["init", "plan", "state"] },
  { d: "M770 512 V544", phases: ["init", "state"] },

  { d: "M150 576 V612", phases: ["apply"] },
];

function NodeShape({ box, active }: { box: Box; active: boolean }) {
  const x = box.cx - box.w / 2;
  const textX = box.icon ? x + 46 : box.cx;
  return (
    <g className={cn("transition-opacity duration-500", active ? "opacity-100" : "opacity-80")}>
      {/* 2.5D depth plate */}
      <rect
        x={x + 5}
        y={box.y + 6}
        width={box.w}
        height={box.h}
        rx={box.small ? 8 : 12}
        className={cn("transition-colors duration-500", active ? "fill-primary/15" : "fill-black/25")}
      />
      <rect
        x={x}
        y={box.y}
        width={box.w}
        height={box.h}
        rx={box.small ? 8 : 12}
        className={cn(
          "transition-all duration-500",
          active ? "fill-primary/10 stroke-primary/70" : "fill-surface/70 stroke-border",
        )}
        strokeWidth={1.2}
      />
      {box.icon && (
        <box.icon x={x + 16} y={box.y + box.h / 2 - 10} width={20} height={20} />
      )}
      <text
        x={textX}
        y={box.meta ? box.y + box.h / 2 - 2 : box.y + box.h / 2 + 5}
        textAnchor={box.icon ? "start" : "middle"}
        fill="currentColor"
        className={cn(
          "transition-colors duration-500",
          box.small ? "font-mono text-[11px]" : "text-[13px] font-medium",
          active ? "text-foreground" : box.small ? "text-muted-foreground" : "text-foreground/85",
        )}
      >
        {box.label}
      </text>
      {box.meta && (
        <text
          x={textX}
          y={box.y + box.h / 2 + 13}
          textAnchor={box.icon ? "start" : "middle"}
          fill="currentColor"
          className={cn(
            "font-mono text-[10px] transition-colors duration-500",
            active ? "text-primary" : "text-muted-foreground",
          )}
        >
          {box.meta}
        </text>
      )}
    </g>
  );
}

export function IacArchitecture() {
  const reduced = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);

  React.useEffect(() => {
    if (reduced || !playing) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % PHASES.length), PHASE_MS);
    return () => window.clearInterval(t);
  }, [reduced, playing]);

  const phase = PHASES[index];
  const isActive = (id: NodeId) => phase.nodes.includes(id);

  return (
    <div className="surface-panel p-4 sm:p-6 lg:p-8">
      {/* Stepper */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <ol className="flex flex-wrap gap-1.5" aria-label="Provisioning stages">
          {PHASES.map((p, i) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => {
                  setIndex(i);
                  setPlaying(false);
                }}
                aria-current={i === index ? "step" : undefined}
                className={cn(
                  "rounded-full border px-3 py-1.5 font-mono text-[0.625rem] tracking-[0.14em] uppercase transition-colors",
                  "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
                  i === index
                    ? "border-primary/60 bg-primary/12 text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {p.step} · {p.title}
              </button>
            </li>
          ))}
        </ol>

        {!reduced && (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            aria-label={playing ? "Pause architecture animation" : "Play architecture animation"}
          >
            {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {playing ? "Pause" : "Play"}
          </button>
        )}
      </div>

      {/* Diagram */}
      <div className="mt-6 overflow-x-auto">
        <svg
          viewBox="0 0 900 680"
          className="h-auto w-full min-w-[680px]"
          role="img"
          aria-label="Infrastructure as Code architecture: a developer pushes Terraform code to GitHub, GitHub Actions runs terraform init, validate, plan and apply, which provisions AWS infrastructure (VPC with a subnet and security group, and an EC2 instance) while remote state is stored in S3 with a DynamoDB lock table."
        >
          {/* edges */}
          {EDGES.map((e) => {
            const on = e.phases.includes(phase.id);
            return (
              <g key={e.d}>
                <path
                  d={e.d}
                  fill="none"
                  strokeWidth={1.2}
                  stroke="currentColor"
                  className="text-border-strong"
                />
                {on && (
                  <path
                    d={e.d}
                    fill="none"
                    strokeWidth={2}
                    strokeLinecap="round"
                    stroke="currentColor"
                    className={cn("text-primary", !reduced && "iac-flow")}
                  />
                )}
              </g>
            );
          })}

          {/* Terraform execution block */}
          <g>
            <rect x={325} y={146} width={260} height={176} rx={16} className="fill-black/25" />
            <rect
              x={320}
              y={140}
              width={260}
              height={176}
              rx={16}
              strokeWidth={1.2}
              className={cn(
                "transition-all duration-500",
                isActive("terraform")
                  ? "fill-primary/8 stroke-primary/60"
                  : "fill-surface/70 stroke-border",
              )}
            />
            <TerraformBrandMark x={342} y={160} width={20} height={20} />
            <text x={372} y={175} fill="currentColor" className="text-[13px] font-medium text-foreground">
              Terraform
            </text>
            {CMDS.map((c, i) => {
              const on = phase.cmd === i;
              return (
                <g key={c}>
                  <circle
                    cx={352}
                    cy={207 + i * 28}
                    r={3.5}
                    className={cn("transition-colors duration-500", on ? "fill-primary" : "fill-border-strong")}
                  />
                  <text
                    x={368}
                    y={211 + i * 28}
                    fill="currentColor"
                    className={cn(
                      "font-mono text-[12px] transition-colors duration-500",
                      on ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    terraform {c}
                  </text>
                </g>
              );
            })}
          </g>

          {/* nodes */}
          {BOXES.map((b) => (
            <NodeShape key={b.id} box={b} active={isActive(b.id)} />
          ))}
        </svg>
      </div>

      {/* Legend */}
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {["Execution path", "Resource creation", "State read / write", "Lock acquire / release"].map((l) => (
          <li key={l} className="flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.12em] text-muted-foreground uppercase">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary/70" />
            {l}
          </li>
        ))}
      </ul>

      {/* Current phase narration */}
      <div className="mt-4 rounded-xl border border-border bg-surface/50 p-4" aria-live="polite">
        <p className="font-mono text-[0.625rem] tracking-[0.18em] text-primary uppercase">
          Stage {phase.step} — {phase.title}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{phase.detail}</p>
      </div>

      {/* Text fallback for assistive tech / reduced motion */}
      <ol className="sr-only">
        {PHASES.map((p) => (
          <li key={p.id}>
            {p.step} {p.title}: {p.detail}
          </li>
        ))}
      </ol>
    </div>
  );
}
