import { Boxes, Cloud, FileCode2, GitBranch, type LucideIcon } from "lucide-react";

const PILLARS: {
  id: string;
  index: string;
  stage: string;
  title: string;
  icon: LucideIcon;
  body: string;
  meta: string;
}[] = [
  {
    id: "cloud-infrastructure",
    index: "01",
    stage: "Infrastructure",
    title: "Cloud Infrastructure",
    icon: Cloud,
    body: "Cloud foundations that stay understandable as they grow.",
    meta: "AWS · Linux · Networking",
  },
  {
    id: "infrastructure-as-code",
    index: "02",
    stage: "Automation",
    title: "Infrastructure as Code",
    icon: FileCode2,
    body: "Infrastructure defined once and reproduced consistently.",
    meta: "Terraform · Ansible",
  },
  {
    id: "delivery-automation",
    index: "03",
    stage: "Delivery",
    title: "CI/CD & GitOps",
    icon: GitBranch,
    body: "Delivery workflows that move changes from code to deployment.",
    meta: "Jenkins · GitHub Actions · Docker · Argo CD",
  },
  {
    id: "platform-reliability",
    index: "04",
    stage: "Reliability",
    title: "Containers & Kubernetes",
    icon: Boxes,
    body: "Containerized workloads built to remain observable and reliable.",
    meta: "Kubernetes · k3s · Docker · Observability",
  },
];

const PRINCIPLES = [
  "Reproducibility over manual configuration",
  "Automation over repetition",
  "Design for failure",
  "Observability before assumptions",
  "Maintainability over cleverness",
];

export function EngineeringIdentity() {
  return (
    <section id="identity" className="section-y hairline-top scroll-mt-24">
      <div className="container-page">
        {/* Narrative — the hero of this section */}
        <header className="animate-reveal flex max-w-3xl flex-col gap-5">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase backdrop-blur-sm sm:text-[0.6875rem]">
            Engineering identity
          </span>

          <h2 className="text-gradient-heading font-display text-3xl leading-[1.1] font-semibold text-balance sm:text-4xl lg:text-5xl">
            Engineering cloud systems from infrastructure to reliable delivery.
          </h2>

          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            I design, automate, and operate cloud-native systems with a focus on reproducible infrastructure, automated delivery, containerization, and operational reliability.
          </p>
        </header>

        {/* Connected model: Infrastructure → Automation → Delivery → Reliability */}
        <div className="animate-reveal relative mt-12 md:mt-16">
          {/* connecting spine */}
          <span
            aria-hidden
            className="absolute top-6 left-[0.9375rem] hidden h-[calc(100%-3rem)] w-px bg-linear-to-b from-transparent via-border-strong to-transparent sm:block lg:hidden"
          />
          <span
            aria-hidden
            className="absolute top-[1.4rem] left-0 hidden h-px w-full bg-linear-to-r from-transparent via-border-strong to-transparent lg:block"
          />

          <ol className="grid gap-x-6 gap-y-8 sm:gap-y-9 lg:grid-cols-4">
            {PILLARS.map((pillar) => (
              <li
                key={pillar.id}
                className="group relative flex gap-4 lg:block"
              >
                {/* node */}
                <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border-strong bg-background font-mono text-[0.625rem] text-primary transition-colors duration-300 group-hover:border-primary/60">
                  {pillar.index}
                </span>

                <div className="min-w-0 lg:mt-5">
                  <p className="font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground/70 uppercase">
                    {pillar.stage}
                  </p>
                  <h3 className="mt-1.5 flex items-center gap-2 text-base font-semibold text-foreground sm:text-lg">
                    <pillar.icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                    {pillar.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    {pillar.body}
                  </p>
                  <p className="mt-3 font-mono text-[0.625rem] tracking-[0.06em] text-muted-foreground/70">
                    {pillar.meta}
                  </p>
                </div>

              </li>
            ))}
          </ol>
        </div>

        {/* Philosophy + AI workflow */}
        <div className="animate-reveal mt-14 grid gap-8 border-t border-border pt-8 md:mt-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            <h3 className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase">
              Engineering principles
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6">
              {PRINCIPLES.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-foreground/90">
                  <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:border-l lg:border-border lg:pl-14">
            <h3 className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase">
              AI-assisted workflow
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              I use AI to accelerate research, implementation, debugging, and iteration — while architecture, technical decisions, validation, and final review remain engineering responsibilities.
            </p>
            <p className="mt-3 font-mono text-[0.625rem] tracking-[0.06em] text-muted-foreground/70">
              Claude Code · Codex · MCP · APIs · OpenRouter
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
