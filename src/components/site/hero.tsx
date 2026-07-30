import { ArrowUpRight, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CloudOpsCenter } from "@/components/site/cloud-ops-center";

const FACTS = [
  { label: "Currently", value: "M.Tech Cloud Computing" },
  { label: "Seeking", value: "Cloud / DevOps / Platform Engineering Roles" },
  { label: "Focus", value: "AWS • Kubernetes • Terraform" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-28 pb-28 md:pt-36 md:pb-40 xl:pt-44 xl:pb-52"
    >
      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <div className="animate-reveal flex flex-col gap-7">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-70 animate-node-pulse motion-reduce:animate-none" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              Available for 2026 opportunities
            </span>

            <h1 className="text-gradient-heading font-display text-[1.875rem] leading-[1.12] font-semibold text-balance sm:text-4xl xl:text-[2.9rem] xl:leading-[1.1]">
              Engineering cloud platforms with Kubernetes, Infrastructure as Code, and automation.
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              I build and automate cloud infrastructure across AWS, Kubernetes, Terraform, CI/CD and
              GitOps — with reliability, observability, security and maintainability built into the
              workflow.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button size="lg" asChild className="h-12 w-full px-7 text-base sm:w-auto">
                <a href="#projects">
                  Explore Projects
                  <ArrowUpRight />
                </a>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                asChild
                className="h-12 w-full px-5 sm:w-auto"
              >
                <a href="/resume.pdf" download>
                  <Download />
                  Download Resume
                </a>
              </Button>
            </div>

            <dl className="mt-2 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
              {FACTS.map((fact) => (
                <div key={fact.label} className="bg-surface/40 p-4 backdrop-blur-sm">
                  <dt className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 text-sm leading-snug font-medium text-foreground">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="animate-reveal order-last">
            <CloudOpsCenter />
          </div>
        </div>
      </div>

      <div aria-hidden className="container-page mt-20 md:mt-28">
        <div className="h-px w-full bg-linear-to-r from-transparent via-border-strong to-transparent" />
      </div>
    </section>
  );
}
