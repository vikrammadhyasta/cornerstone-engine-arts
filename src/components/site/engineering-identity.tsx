import { Boxes, Cloud, FileCode2, GitBranch, type LucideIcon } from "lucide-react";

const PILLARS: {
  id: string;
  index: string;
  title: string;
  icon: LucideIcon;
  body: string;
  tags: string[];
}[] = [
  {
    id: "cloud-infrastructure",
    index: "P01",
    title: "Cloud Infrastructure",
    icon: Cloud,
    body: "Designing cloud foundations on AWS — networking, compute and access boundaries that stay understandable as they grow.",
    tags: ["AWS", "Cloud architecture", "Linux"],
  },
  {
    id: "infrastructure-as-code",
    index: "P02",
    title: "Infrastructure as Code",
    icon: FileCode2,
    body: "Provisioning declaratively so environments are reproducible, reviewable and recoverable instead of hand-built.",
    tags: ["Terraform", "Ansible", "Declarative provisioning"],
  },
  {
    id: "delivery-automation",
    index: "P03",
    title: "Delivery & Automation",
    icon: GitBranch,
    body: "Turning builds and releases into pipelines — containerised, versioned and driven from Git rather than from a console.",
    tags: ["Docker", "Jenkins", "GitHub Actions", "ArgoCD", "GitOps"],
  },
  {
    id: "platform-reliability",
    index: "P04",
    title: "Platform & Reliability",
    icon: Boxes,
    body: "Running workloads on Kubernetes with observability and failure paths considered before they are needed in production.",
    tags: ["Kubernetes", "Observability", "Operational thinking"],
  },
];

const FLOW = [
  { step: "01", title: "Infrastructure", note: "Define the foundation" },
  { step: "02", title: "Automation", note: "Remove manual steps" },
  { step: "03", title: "Delivery", note: "Ship continuously" },
  { step: "04", title: "Reliability", note: "Observe and recover" },
];

const AI_TOOLS = [
  "Claude Code",
  "Codex",
  "ChatGPT",
  "Gemini",
  "OpenRouter",
  "MCP",
  "APIs",
  "Prompt engineering",
];

const PHILOSOPHY = [
  { k: "reproducible", v: "Infrastructure is defined in code, never clicked together." },
  { k: "automated", v: "Anything repeated twice becomes a pipeline." },
  { k: "observable", v: "A system I cannot measure is a system I cannot operate." },
  { k: "resilient", v: "Failure is a design input, not a surprise." },
  { k: "maintainable", v: "The boring solution someone else can read usually wins." },
];

export function EngineeringIdentity() {
  return (
    <section id="identity" className="section-y hairline-top scroll-mt-24">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* Narrative */}
          <header className="animate-reveal flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase backdrop-blur-sm sm:text-[0.6875rem]">
              <span className="text-primary">01</span>
              <span className="h-3 w-px bg-border-strong" />
              Engineering identity
            </span>

            <h2 className="text-gradient-heading font-display text-3xl leading-[1.12] font-semibold text-balance sm:text-4xl lg:text-[2.6rem]">
              Building reliable systems, not just deploying applications.
            </h2>

            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              My work sits below the application layer: the cloud infrastructure it runs on, the code
              that provisions it, the pipelines that deliver it and the signals that prove it is
              healthy.
            </p>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              I treat platforms as products — reproducible by default, automated where it matters and
              designed so the next person can operate them without tribal knowledge.
            </p>
          </header>

          {/* Pillars */}
          <div className="animate-reveal grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {PILLARS.map((pillar) => (
              <article
                key={pillar.id}
                tabIndex={0}
                className="group relative flex flex-col gap-3 bg-surface/50 p-6 backdrop-blur-sm transition-colors duration-300 outline-none hover:bg-surface-elevated/60 focus-visible:bg-surface-elevated/60 md:p-7"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                />
                <div className="flex items-center justify-between gap-3">
                  <pillar.icon className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <span className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground/70 uppercase">
                    {pillar.index}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-foreground sm:text-lg">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
                <ul className="mt-auto flex flex-wrap gap-x-2 gap-y-1.5 pt-2">
                  {pillar.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-border bg-background/40 px-2 py-0.5 font-mono text-[0.625rem] tracking-[0.06em] text-muted-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        {/* Progression */}
        <div className="animate-reveal mt-14 md:mt-20">
          <h3 className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase">
            How the concerns connect
          </h3>
          <ol className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
            {FLOW.map((stage, i) => (
              <li
                key={stage.step}
                className="relative flex items-center gap-4 bg-surface/50 p-5 backdrop-blur-sm md:block md:p-6"
              >
                <span
                  aria-hidden
                  className="absolute top-0 left-0 h-px bg-primary/60 md:h-px"
                  style={{ width: `${(i + 1) * 25}%` }}
                />
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border-strong font-mono text-[0.625rem] text-primary md:mb-4">
                  {stage.step}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground md:text-base">{stage.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground md:mt-1 md:text-sm">
                    {stage.note}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* AI-assisted engineering + philosophy */}
        <div className="animate-reveal mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-sm md:p-7">
            <h3 className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase">
              AI-assisted engineering
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              AI is part of how I work, not what I build. I use assistants and agent tooling to move
              faster through research, scaffolding, refactors and documentation — while the
              architecture decisions and reviews stay mine.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
              {AI_TOOLS.map((tool) => (
                <li
                  key={tool}
                  className="rounded-md border border-border bg-background/40 px-2 py-1 font-mono text-[0.625rem] tracking-[0.06em] text-muted-foreground"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-sm md:p-7">
            <h3 className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase">
              Engineering philosophy
            </h3>
            <dl className="mt-4 divide-y divide-border">
              {PHILOSOPHY.map((item) => (
                <div
                  key={item.k}
                  className="grid gap-1 py-3 sm:grid-cols-[minmax(0,8rem)_minmax(0,1fr)] sm:gap-4"
                >
                  <dt className="font-mono text-[0.625rem] tracking-[0.16em] text-primary uppercase">
                    {item.k}
                  </dt>
                  <dd className="min-w-0 text-sm leading-relaxed text-muted-foreground">{item.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
