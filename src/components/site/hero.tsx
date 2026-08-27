import type { CSSProperties } from "react";
import { ArrowUpRight, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CloudOpsCenter } from "@/components/site/cloud-ops-center";
import { HeroBoot } from "@/components/site/hero-boot";

const FACTS = [
  { label: "Currently", value: "M.Tech Cloud Computing", short: "M.Tech Cloud Computing" },
  {
    label: "Seeking",
    value: "Cloud / DevOps / Platform Engineering Roles",
    short: "Cloud / DevOps / Platform",
  },
  { label: "Focus", value: "AWS • Kubernetes • Terraform", short: "AWS • Kubernetes • Terraform" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 lg:min-h-[780px] lg:pt-32 lg:pb-24"
    >
      <HeroBoot />
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <div className="flex flex-col gap-6">
            <span style={{ "--boot-delay": "620ms" } as CSSProperties} className="boot-item inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase backdrop-blur-sm sm:text-[0.6875rem] sm:tracking-[0.18em]">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-70 animate-node-pulse motion-reduce:animate-none" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              <span className="min-w-0">Open to Cloud • DevOps • Platform roles</span>
            </span>

            <h1 style={{ "--boot-delay": "760ms" } as CSSProperties} className="boot-item text-gradient-heading font-display text-[1.875rem] leading-[1.12] font-semibold text-balance sm:text-4xl xl:text-[2.9rem] xl:leading-[1.1]">
              Engineering cloud platforms with Kubernetes, Infrastructure as Code, and automation.
            </h1>

            <p style={{ "--boot-delay": "880ms" } as CSSProperties} className="boot-item max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              I build and automate cloud infrastructure across AWS, Kubernetes, Terraform, CI/CD and
              GitOps — with reliability, observability, security and maintainability built into the
              workflow.
            </p>

            <div style={{ "--boot-delay": "1000ms" } as CSSProperties} className="boot-item flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <Button size="lg" asChild className="h-12 w-full px-7 text-base sm:w-auto">
                <a href="#projects">
                  Explore Projects
                  <ArrowUpRight />
                </a>
              </Button>
              <Button size="lg" variant="ghost" asChild className="h-11 w-full px-5 sm:h-12 sm:w-auto">
                <a href="/resume.pdf" download>
                  <Download />
                  Download Resume
                </a>
              </Button>
            </div>

            {/* Quick facts — compact rows on mobile, light grid on larger screens */}
            <dl style={{ "--boot-delay": "1120ms" } as CSSProperties} className="boot-item mt-1 divide-y divide-border border-y border-border sm:mt-2 sm:grid sm:grid-cols-3 sm:gap-px sm:divide-y-0 sm:overflow-hidden sm:rounded-xl sm:border sm:bg-border">
              {FACTS.map((fact) => (
                <div
                  key={fact.label}
                  className="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] items-baseline gap-3 py-2 sm:block sm:bg-surface/30 sm:px-4 sm:py-3.5 sm:backdrop-blur-sm"
                >
                  <dt className="font-mono text-[0.5625rem] tracking-[0.16em] text-muted-foreground uppercase sm:text-[0.625rem]">
                    {fact.label}
                  </dt>
                  <dd className="min-w-0 text-[0.8125rem] leading-snug font-medium text-foreground sm:mt-1.5 sm:text-sm">
                    <span className="sm:hidden">{fact.short}</span>
                    <span className="hidden sm:inline">{fact.value}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div style={{ "--boot-delay": "900ms" } as CSSProperties} className="boot-item order-last">
            <CloudOpsCenter />
          </div>
        </div>
      </div>

      <div aria-hidden className="container-page mt-12 md:mt-16">
        <div className="h-px w-full bg-linear-to-r from-transparent via-border-strong to-transparent" />
      </div>
    </section>
  );
}
