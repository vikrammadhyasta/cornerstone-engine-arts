import * as React from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { DockerBrandMark, JenkinsBrandMark, NodeBrandMark } from "./brand-marks";

const STEPS = [
  {
    id: "trigger",
    label: "Jenkins",
    cmd: "freestyle job",
    body: "The job runs on the managed node, where Ansible already installed Jenkins, Java and Docker.",
    icon: JenkinsBrandMark,
  },
  {
    id: "build",
    label: "Build Docker image",
    cmd: "docker build -t node-app .",
    body: "The image is built from the Dockerfile in /opt/node-app that Ansible created.",
    icon: DockerBrandMark,
  },
  {
    id: "remove",
    label: "Remove old container",
    cmd: "docker rm -f node-app",
    body: "The previous container is stopped and removed so port 80 is free before the new one starts.",
    icon: DockerBrandMark,
  },
  {
    id: "deploy",
    label: "Deploy new container",
    cmd: "docker run -d -p 80:3000 node-app",
    body: "A container from the new image is started and published on port 80 of the instance.",
    icon: DockerBrandMark,
  },
  {
    id: "live",
    label: "Available on :80",
    cmd: "http://<ec2-public-ip>",
    body: "The application answers on the public IP of the managed EC2 instance.",
    icon: NodeBrandMark,
  },
];

export function JenkinsJobFlow() {
  const [active, setActive] = React.useState<string>(STEPS[0].id);

  return (
    <div className="surface-panel p-4 sm:p-6 lg:p-8">
      <ol className="grid gap-3 lg:grid-cols-5" aria-label="Jenkins job steps">
        {STEPS.map((s, i) => {
          const on = active === s.id;
          const Icon = s.icon;
          return (
            <li key={s.id} className="relative">
              <button
                type="button"
                onMouseEnter={() => setActive(s.id)}
                onFocus={() => setActive(s.id)}
                onClick={() => setActive(s.id)}
                aria-current={on ? "step" : undefined}
                className={cn(
                  "h-full w-full rounded-xl border p-4 text-left transition-colors",
                  "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
                  on ? "border-primary/60 bg-primary/10" : "border-border bg-surface/50 hover:border-border-strong",
                )}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon className="h-4 w-4" />
                </span>
                <span className="mt-3 block text-sm font-medium text-foreground">{s.label}</span>
                <span className="mt-1.5 block font-mono text-[0.6875rem] break-words text-primary">
                  {s.cmd}
                </span>
                <span className="mt-2 block text-[0.8125rem] leading-relaxed text-muted-foreground">
                  {s.body}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <ArrowRight
                  aria-hidden
                  className="absolute top-1/2 -right-3 hidden h-4 w-4 -translate-y-1/2 text-border-strong lg:block"
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
