import * as React from "react";
import { Pause, Play } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  AnsibleBrandMark,
  DockerBrandMark,
  Ec2BrandMark,
  JenkinsBrandMark,
  NodeBrandMark,
  OperatorMark,
  SshMark,
} from "./brand-marks";

type NodeId =
  | "ctl"
  | "ctl-ansible"
  | "ctl-inventory"
  | "ctl-play"
  | "ssh"
  | "mgd"
  | "roles"
  | "jenkins"
  | "build"
  | "remove"
  | "deploy"
  | "app"
  | "ip";

interface Phase {
  id: string;
  step: string;
  title: string;
  status: string;
  detail: string;
  nodes: NodeId[];
}

const PHASES: Phase[] = [
  {
    id: "control",
    step: "01",
    title: "Control node ready",
    status: "Ansible installed",
    detail:
      "The first EC2 instance acts as the Ansible control node. Ansible is installed here and nothing is configured on the target by hand.",
    nodes: ["ctl", "ctl-ansible"],
  },
  {
    id: "ssh",
    step: "02",
    title: "SSH connectivity",
    status: "Inventory reachable",
    detail:
      "The managed node is declared in the inventory and reached over SSH with the correct key pair, so playbooks can run against it.",
    nodes: ["ctl", "ctl-inventory", "ssh", "mgd"],
  },
  {
    id: "playbook",
    step: "03",
    title: "Playbook execution",
    status: "Roles applied",
    detail:
      "Playbooks run from the control node and apply the reusable roles — common, docker, jenkins and node-app — against the managed node.",
    nodes: ["ctl", "ctl-play", "ssh", "mgd", "roles"],
  },
  {
    id: "provision",
    step: "04",
    title: "Managed node provisioned",
    status: "Docker · Jenkins · Java · app files",
    detail:
      "Docker, Jenkins, Java and the Node.js application files under /opt/node-app are installed and configured by Ansible rather than manually.",
    nodes: ["mgd", "roles", "jenkins", "app"],
  },
  {
    id: "jenkins",
    step: "05",
    title: "Jenkins job triggered",
    status: "Freestyle job running",
    detail:
      "Jenkins runs on the managed node. A freestyle job owns the build and deployment of the Dockerized application.",
    nodes: ["mgd", "jenkins"],
  },
  {
    id: "build",
    step: "06",
    title: "docker build",
    status: "Image built",
    detail:
      "The job builds the Docker image from the Dockerfile that Ansible placed in /opt/node-app.",
    nodes: ["mgd", "jenkins", "build"],
  },
  {
    id: "remove",
    step: "07",
    title: "Old container removed",
    status: "Previous container stopped",
    detail:
      "The previously running container is stopped and removed so the port is free and no stale build keeps serving traffic.",
    nodes: ["mgd", "jenkins", "remove"],
  },
  {
    id: "deploy",
    step: "08",
    title: "New container deployed",
    status: "Container running",
    detail:
      "A new container is started from the freshly built image and published on port 80 of the managed node.",
    nodes: ["mgd", "jenkins", "deploy", "app"],
  },
  {
    id: "live",
    step: "09",
    title: "Application live",
    status: "Reachable on :80",
    detail:
      "The Node.js application answers on port 80 and is reachable through the public IP of the managed EC2 instance.",
    nodes: ["mgd", "app", "ip"],
  },
];

const PHASE_MS = 2500;

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

/* ── geometry (desktop / tablet canvas) ─────────────────────────────────── */

interface Box {
  id: NodeId;
  cx: number;
  y: number;
  w: number;
  h: number;
  label: string;
  meta?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  mono?: boolean;
}

const BOXES: Box[] = [
  { id: "ctl-ansible", cx: 180, y: 116, w: 224, h: 50, label: "Ansible", meta: "control node install", icon: AnsibleBrandMark },
  { id: "ctl-inventory", cx: 180, y: 182, w: 224, h: 50, label: "Inventory", meta: "managed node host", icon: OperatorMark },
  { id: "ctl-play", cx: 180, y: 248, w: 224, h: 50, label: "Playbooks", meta: "roles/ · playbooks/", icon: AnsibleBrandMark },

  { id: "roles", cx: 675, y: 112, w: 430, h: 56, label: "Ansible roles applied", meta: "common · docker · jenkins · node-app", icon: AnsibleBrandMark },
  { id: "jenkins", cx: 675, y: 200, w: 430, h: 56, label: "Jenkins CI/CD", meta: "freestyle job", icon: JenkinsBrandMark },
  { id: "build", cx: 675, y: 288, w: 430, h: 46, label: "docker build", meta: "/opt/node-app/Dockerfile", icon: DockerBrandMark, mono: true },
  { id: "remove", cx: 675, y: 358, w: 430, h: 46, label: "docker rm -f old container", meta: "port released", icon: DockerBrandMark, mono: true },
  { id: "deploy", cx: 675, y: 428, w: 430, h: 46, label: "docker run -p 80:3000", meta: "new container", icon: DockerBrandMark, mono: true },
  { id: "app", cx: 675, y: 500, w: 430, h: 56, label: "Node.js application", meta: "container · listening on 80", icon: NodeBrandMark },

  { id: "ip", cx: 675, y: 610, w: 300, h: 52, label: "Public EC2 IP", meta: "http://<ec2-public-ip>", icon: Ec2BrandMark },
];

interface Edge {
  d: string;
  phases: string[];
}

const EDGES: Edge[] = [
  { d: "M180 166 V182", phases: ["ssh"] },
  { d: "M180 232 V248", phases: ["playbook"] },
  { d: "M320 207 H430", phases: ["ssh", "playbook"] },

  { d: "M675 168 V200", phases: ["provision"] },
  { d: "M675 256 V288", phases: ["build"] },
  { d: "M675 334 V358", phases: ["remove"] },
  { d: "M675 404 V428", phases: ["deploy"] },
  { d: "M675 474 V500", phases: ["deploy"] },
  { d: "M675 556 V610", phases: ["live"] },
];

function NodeShape({ box, active }: { box: Box; active: boolean }) {
  const x = box.cx - box.w / 2;
  const textX = box.icon ? x + 46 : box.cx;
  return (
    <g className={cn("transition-opacity duration-500", active ? "opacity-100" : "opacity-80")}>
      <rect
        x={x + 5}
        y={box.y + 6}
        width={box.w}
        height={box.h}
        rx={12}
        className={cn("transition-colors duration-500", active ? "fill-primary/15" : "fill-black/25")}
      />
      <rect
        x={x}
        y={box.y}
        width={box.w}
        height={box.h}
        rx={12}
        strokeWidth={1.2}
        className={cn(
          "transition-all duration-500",
          active ? "fill-primary/10 stroke-primary/70" : "fill-surface/70 stroke-border",
        )}
      />
      {box.icon && <box.icon x={x + 16} y={box.y + box.h / 2 - 10} width={20} height={20} />}
      <text
        x={textX}
        y={box.meta ? box.y + box.h / 2 - 2 : box.y + box.h / 2 + 5}
        textAnchor={box.icon ? "start" : "middle"}
        fill="currentColor"
        className={cn(
          "transition-colors duration-500",
          box.mono ? "font-mono text-[12px]" : "text-[13px] font-medium",
          active ? "text-foreground" : "text-foreground/85",
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
      {active && (
        <circle
          cx={x + box.w - 16}
          cy={box.y + box.h / 2}
          r={3.5}
          className="fill-success"
        />
      )}
    </g>
  );
}

/* ── mobile vertical flow ───────────────────────────────────────────────── */

interface FlowStep {
  id: string;
  host: "Control node" | "Managed node";
  label: string;
  meta: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const MOBILE_FLOW: FlowStep[] = [
  { id: "control", host: "Control node", label: "Ansible control node", meta: "EC2 · ansible installed", icon: AnsibleBrandMark },
  { id: "ssh", host: "Control node", label: "SSH to managed node", meta: "inventory · key pair", icon: SshMark },
  { id: "playbook", host: "Control node", label: "Playbook execution", meta: "roles applied over SSH", icon: AnsibleBrandMark },
  { id: "provision", host: "Managed node", label: "Docker · Jenkins · Java · app", meta: "/opt/node-app prepared", icon: Ec2BrandMark },
  { id: "jenkins", host: "Managed node", label: "Jenkins freestyle job", meta: "CI/CD on the managed node", icon: JenkinsBrandMark },
  { id: "build", host: "Managed node", label: "docker build", meta: "image from Dockerfile", icon: DockerBrandMark },
  { id: "remove", host: "Managed node", label: "remove old container", meta: "port 80 released", icon: DockerBrandMark },
  { id: "deploy", host: "Managed node", label: "deploy new container", meta: "docker run -p 80:3000", icon: DockerBrandMark },
  { id: "live", host: "Managed node", label: "Application live", meta: "public EC2 IP on :80", icon: NodeBrandMark },
];

export function AnsibleDeploymentArchitecture() {
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
      {/* Controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <ol className="flex flex-wrap gap-1.5" aria-label="Deployment stages">
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
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            aria-label={playing ? "Pause deployment animation" : "Resume deployment animation"}
          >
            {playing ? <Pause className="h-3.5 w-3.5" aria-hidden /> : <Play className="h-3.5 w-3.5" aria-hidden />}
            {playing ? "Pause" : "Resume"}
          </button>
        )}
      </div>

      {/* Canvas — tablet and desktop */}
      <div className="mt-6 hidden md:block">
        <svg
          viewBox="0 0 960 690"
          className="h-auto w-full"
          role="img"
          aria-label="Deployment architecture: an Ansible control node on EC2 reaches a managed EC2 node over SSH, applies roles that install Docker, Jenkins, Java and the Node.js application, after which a Jenkins freestyle job builds the Docker image, removes the old container, deploys a new container and serves the application on port 80 through the public EC2 IP."
        >
          {/* host boundaries */}
          <g>
            <rect x={40} y={56} width={280} height={266} rx={18} className="fill-black/20 stroke-border-strong" strokeWidth={1} strokeDasharray="4 6" />
            <text x={60} y={82} fill="currentColor" className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
              EC2 — Control node
            </text>

            <rect x={430} y={56} width={490} height={498} rx={18} className="fill-black/20 stroke-border-strong" strokeWidth={1} strokeDasharray="4 6" />
            <text x={452} y={82} fill="currentColor" className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
              EC2 — Managed node
            </text>
          </g>

          {/* edges */}
          {EDGES.map((e) => {
            const on = e.phases.includes(phase.id);
            return (
              <g key={e.d}>
                <path d={e.d} fill="none" strokeWidth={1.2} stroke="currentColor" className="text-border-strong" />
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

          {/* SSH channel label */}
          <g>
            <SshMark x={362} y={168} width={18} height={18} />
            <text
              x={375}
              y={228}
              textAnchor="middle"
              fill="currentColor"
              className={cn(
                "font-mono text-[10px] transition-colors duration-500",
                isActive("ssh") ? "text-primary" : "text-muted-foreground",
              )}
            >
              SSH :22
            </text>
          </g>

          {BOXES.map((b) => (
            <NodeShape key={b.id} box={b} active={isActive(b.id)} />
          ))}
        </svg>
      </div>

      {/* Vertical infrastructure flow — mobile */}
      <ol className="mt-6 md:hidden" aria-label="Deployment flow">
        {MOBILE_FLOW.map((s, i) => {
          const on = PHASES[index].id === s.id;
          const Icon = s.icon;
          return (
            <li key={s.id} className="relative pl-6">
              {i < MOBILE_FLOW.length - 1 && (
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-6 bottom-0 left-[7px] w-px",
                    on ? "bg-primary/70" : "bg-border-strong",
                  )}
                />
              )}
              <span
                aria-hidden
                className={cn(
                  "absolute top-4 left-0 h-3.5 w-3.5 rounded-full border-2",
                  on ? "border-primary bg-primary/40" : "border-border-strong bg-surface",
                )}
              />
              <div
                className={cn(
                  "mb-2 rounded-xl border p-3 transition-colors",
                  on ? "border-primary/60 bg-primary/10" : "border-border bg-surface/50",
                )}
              >
                <p className="font-mono text-[0.5625rem] tracking-[0.16em] text-muted-foreground uppercase">
                  {s.host}
                </p>
                <p className="mt-1.5 flex items-center gap-2 text-[0.8125rem] font-medium text-foreground">
                  <Icon className="h-4 w-4 shrink-0" />
                  {s.label}
                </p>
                <p className="mt-1 font-mono text-[0.6875rem] break-words text-muted-foreground">
                  {s.meta}
                </p>
                {on && (
                  <p className="mt-2 font-mono text-[0.625rem] tracking-[0.14em] text-primary uppercase">
                    ▶ executing
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {/* Legend */}
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {["Execution path", "Node state change", "Container deployment", "Live endpoint"].map((l) => (
          <li
            key={l}
            className="flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.12em] text-muted-foreground uppercase"
          >
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary/70" />
            {l}
          </li>
        ))}
      </ul>

      {/* Narration */}
      <div className="mt-4 rounded-xl border border-border bg-surface/50 p-4" aria-live="polite">
        <p className="font-mono text-[0.625rem] tracking-[0.18em] text-primary uppercase">
          Stage {phase.step} — {phase.title}
        </p>
        <p className="mt-1 font-mono text-[0.625rem] tracking-[0.14em] text-success uppercase">
          Status: {phase.status}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{phase.detail}</p>
      </div>

      <ol className="sr-only">
        {PHASES.map((p) => (
          <li key={p.id}>
            {p.step} {p.title} — {p.status}: {p.detail}
          </li>
        ))}
      </ol>
    </div>
  );
}
