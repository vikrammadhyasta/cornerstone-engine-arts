import * as React from "react";
import { Pause, Play } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  AwsBrandMark,
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
  | "s3"
  | "ddb"
  | "vpc"
  | "igw"
  | "subnet"
  | "sg"
  | "ec2"
  | "iam";

interface Phase {
  id: string;
  step: string;
  title: string;
  detail: string;
  active: NodeId[];
}

const PHASES: Phase[] = [
  {
    id: "commit",
    step: "01",
    title: "git push",
    detail: "The engineer commits Terraform configuration and pushes to the main branch of the repository.",
    active: ["dev", "github"],
  },
  {
    id: "trigger",
    step: "02",
    title: "Workflow triggered",
    detail: "The push starts the GitHub Actions workflow, which checks out the repository, installs Terraform and configures AWS credentials from repository secrets.",
    active: ["github", "actions", "iam"],
  },
  {
    id: "init",
    step: "03",
    title: "terraform init",
    detail: "Terraform initialises the remote backend: state is read from the S3 bucket and a lock item is acquired in the DynamoDB table.",
    active: ["actions", "s3", "ddb"],
  },
  {
    id: "validate",
    step: "04",
    title: "fmt & validate",
    detail: "Formatting and configuration validation run before anything is planned, so syntax and schema errors fail the workflow early.",
    active: ["actions"],
  },
  {
    id: "plan",
    step: "05",
    title: "terraform plan",
    detail: "Terraform compares the configuration against the remote state and produces the exact set of AWS changes it intends to make.",
    active: ["actions", "s3"],
  },
  {
    id: "apply",
    step: "06",
    title: "terraform apply",
    detail: "The plan is applied. The VPC, internet gateway, public subnet, security group and EC2 instance are provisioned from the modules.",
    active: ["actions", "vpc", "igw", "subnet", "sg", "ec2", "iam"],
  },
  {
    id: "state",
    step: "07",
    title: "State written, lock released",
    detail: "The updated state file is written back to S3 and the DynamoDB lock is released, leaving the backend ready for the next run.",
    active: ["s3", "ddb"],
  },
];

const PHASE_MS = 2200;

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

interface NodeProps {
  id: NodeId;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  meta?: string;
  activeIds: NodeId[];
  className?: string;
}

function Node({ id, icon: Icon, label, meta, activeIds, className }: NodeProps) {
  const active = activeIds.includes(id);
  return (
    <div
      data-active={active || undefined}
      className={cn(
        "flex items-center gap-3 rounded-xl border bg-surface/50 px-3 py-2.5 transition-all duration-500",
        active
          ? "border-primary/60 bg-primary/8 shadow-[0_0_0_1px_var(--color-primary)/20]"
          : "border-border",
        className,
      )}
    >
      <span
        className={cn(
          "grid h-8 w-8 shrink-0 place-items-center rounded-lg border transition-colors duration-500",
          active ? "border-primary/50 bg-background/70" : "border-border bg-background/40",
        )}
      >
        <Icon className="h-4 w-4 text-muted-foreground" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[0.8125rem] font-medium text-foreground">{label}</span>
        {meta && (
          <span className="block truncate font-mono text-[0.625rem] tracking-[0.08em] text-muted-foreground">
            {meta}
          </span>
        )}
      </span>
    </div>
  );
}

function Arrow({ label, vertical = true }: { label?: string; vertical?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex items-center justify-center gap-2 text-border-strong",
        vertical ? "py-1.5" : "px-1.5",
      )}
    >
      {vertical ? (
        <span className="flex flex-col items-center">
          <span className="h-4 w-px bg-border-strong" />
          <span className="-mt-1 font-mono text-[0.625rem] leading-none">&darr;</span>
        </span>
      ) : (
        <span className="flex items-center">
          <span className="h-px w-4 bg-border-strong" />
          <span className="-ml-1 font-mono text-[0.625rem] leading-none">&rarr;</span>
        </span>
      )}
      {label && (
        <span className="font-mono text-[0.625rem] tracking-[0.14em] text-muted-foreground uppercase">
          {label}
        </span>
      )}
    </div>
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
  const activeIds = phase.active;

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
      <div
        className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] xl:gap-6"
        role="img"
        aria-label="Infrastructure as Code architecture: a developer pushes Terraform code to GitHub, GitHub Actions runs terraform init, validate, plan and apply using an S3 remote state backend with DynamoDB state locking, provisioning a VPC with an internet gateway, public subnet, security group and EC2 instance in AWS."
      >
        {/* Source & automation column */}
        <div className="rounded-2xl border border-border bg-background/30 p-4">
          <p className="font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase">
            Source &amp; automation
          </p>
          <div className="mt-4">
            <Node id="dev" icon={DeveloperMark} label="Developer" meta="Terraform IaC" activeIds={activeIds} />
            <Arrow label="git push" />
            <Node id="github" icon={GitHubBrandMark} label="GitHub" meta="terraform-aws-infra" activeIds={activeIds} />
            <Arrow label="trigger" />
            <Node id="actions" icon={GitHubActionsBrandMark} label="GitHub Actions" meta="terraform.yml" activeIds={activeIds} />
          </div>

          <ul className="mt-3 space-y-1.5 rounded-xl border border-border bg-surface/40 p-3">
            {["terraform init", "terraform fmt -check", "terraform validate", "terraform plan", "terraform apply"].map(
              (cmd, i) => {
                const stepActive =
                  (i === 0 && phase.id === "init") ||
                  ((i === 1 || i === 2) && phase.id === "validate") ||
                  (i === 3 && phase.id === "plan") ||
                  (i === 4 && phase.id === "apply");
                return (
                  <li
                    key={cmd}
                    className={cn(
                      "flex items-center gap-2 font-mono text-[0.6875rem] transition-colors duration-500",
                      stepActive ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "h-1.5 w-1.5 rounded-full transition-colors duration-500",
                        stepActive ? "bg-primary" : "bg-border-strong",
                      )}
                    />
                    {cmd}
                  </li>
                );
              },
            )}
          </ul>

          <div className="mt-3">
            <Node id="iam" icon={IamBrandMark} label="AWS credentials" meta="IAM · repository secrets" activeIds={activeIds} />
          </div>
        </div>

        {/* AWS account column */}
        <div className="rounded-2xl border border-border bg-background/30 p-4">
          <div className="flex items-center gap-2">
            <AwsBrandMark className="h-4 w-4" />
            <p className="font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase">
              AWS account
            </p>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {/* VPC */}
            <div
              className={cn(
                "rounded-xl border p-3 transition-colors duration-500",
                activeIds.includes("vpc") ? "border-primary/50 bg-primary/6" : "border-border bg-surface/30",
              )}
            >
              <Node id="vpc" icon={VpcBrandMark} label="VPC" meta="10.0.0.0/16" activeIds={activeIds} />
              <div className="mt-3 space-y-2 border-l border-dashed border-border pl-3">
                <Node id="igw" icon={VpcBrandMark} label="Internet gateway" activeIds={activeIds} />
                <Node id="subnet" icon={VpcBrandMark} label="Public subnet" meta="10.0.1.0/24" activeIds={activeIds} />
                <Node id="sg" icon={SecurityGroupBrandMark} label="Security group" meta="ingress 22, 80" activeIds={activeIds} />
                <Node id="ec2" icon={Ec2BrandMark} label="EC2 instance" meta="t3.micro" activeIds={activeIds} />
              </div>
            </div>

            {/* Remote state */}
            <div
              className={cn(
                "rounded-xl border p-3 transition-colors duration-500",
                activeIds.includes("s3") || activeIds.includes("ddb")
                  ? "border-primary/50 bg-primary/6"
                  : "border-border bg-surface/30",
              )}
            >
              <div className="flex items-center gap-2 px-1 pb-2">
                <TerraformBrandMark className="h-3.5 w-3.5" />
                <p className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
                  Remote backend
                </p>
              </div>
              <div className="space-y-2">
                <Node id="s3" icon={S3BrandMark} label="S3 bucket" meta="terraform.tfstate" activeIds={activeIds} />
                <Node id="ddb" icon={DynamoDbBrandMark} label="DynamoDB table" meta="state lock" activeIds={activeIds} />
              </div>
              <p className="mt-3 text-[0.6875rem] leading-relaxed text-muted-foreground">
                State is read on init and written on apply; the lock item prevents two runs mutating
                the same state.
              </p>
            </div>
          </div>

          {/* Current phase narration */}
          <div className="mt-4 rounded-xl border border-border bg-surface/50 p-4" aria-live="polite">
            <p className="font-mono text-[0.625rem] tracking-[0.18em] text-primary uppercase">
              Stage {phase.step} — {phase.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{phase.detail}</p>
          </div>
        </div>
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
