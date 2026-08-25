import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Section, SectionLabel } from "@/components/site/section";
import { PanelCard, CardEyebrow, CardTitle, CardBody } from "@/components/site/panel-card";
import { GitopsPipeline } from "@/components/site/agritech/gitops-pipeline";
import { STAGES } from "@/components/site/agritech/pipeline-data";

import {
  ArgoMark,
  AwsMark,
  DockerMark,
  EcrMark,
  Ec2Mark,
  JenkinsMark,
  KubernetesMark,
  OpenAiMark,
  PythonMark,
} from "@/components/site/tech-marks";

const TITLE = "AgriTech — GitOps CI/CD Platform | Vikram Madhyasta";
const DESCRIPTION =
  "Engineering case study: an automated GitOps delivery pipeline moving code from GitHub through Jenkins, Docker and AWS ECR into Kubernetes via ArgoCD.";

export const Route = createFileRoute("/projects/agritech-gitops")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AgritechGitops,
});

const REPO_URL = "https://github.com/vikrammadhyasta/AgriTech.git";

const BADGES = [
  { label: "Jenkins", icon: JenkinsMark },
  { label: "Docker", icon: DockerMark },
  { label: "Kubernetes", icon: KubernetesMark },
  { label: "ArgoCD", icon: ArgoMark },
  { label: "AWS ECR", icon: EcrMark },
  { label: "AWS EC2", icon: Ec2Mark },
  { label: "Python", icon: PythonMark },
  { label: "OpenAI API", icon: OpenAiMark },
];

const FLOW_SUMMARY = ["Source", "CI", "Container", "Registry", "GitOps", "Kubernetes"];

const METRICS = [
  { value: "6", label: "Automated stages", note: "Commit to running workload" },
  { value: "0", label: "Manual kubectl applies", note: "Git is the only write path" },
  { value: "~4 min", label: "Commit to cluster", note: "Typical end-to-end run" },
  { value: "1 revert", label: "Rollback path", note: "Desired state is versioned" },
];

const DECISIONS = [
  {
    title: "GitOps over push-based deploys",
    body: "A push-based pipeline needs cluster credentials in CI and leaves no record of what is actually running. Pulling desired state from Git keeps credentials inside the cluster, makes drift detectable, and turns rollback into a revert.",
  },
  {
    title: "Jenkins for CI, ArgoCD for CD",
    body: "Splitting the two means a failed build never touches the cluster and a sync failure never blocks builds. Each tool owns one responsibility and can be reasoned about — and restarted — independently.",
  },
  {
    title: "Immutable SHA tags instead of latest",
    body: "Mutable tags make a deployment non-reproducible: the same manifest can yield two different runtimes. Tagging by commit SHA makes every release addressable and every rollback exact.",
  },
  {
    title: "Separate app and manifest repositories",
    body: "Keeping desired state out of the application repo avoids CI committing to the branch that triggers CI, and gives the platform its own review history distinct from feature work.",
  },
  {
    title: "Private ECR with scan-on-push",
    body: "Registry lives in the same account and region as the cluster, so pulls stay on the AWS network and IAM handles authorization instead of long-lived registry passwords.",
  },
  {
    title: "Probes and rolling updates as release gates",
    body: "Readiness probes make the platform, not the engineer, decide when a revision is safe to serve. maxUnavailable 0 keeps capacity flat through the rollout.",
  },
];

const CHALLENGES = [
  {
    problem: "Jenkins builds passed but pushes to ECR failed intermittently with authorization errors.",
    investigation:
      "Compared failing and passing runs; the failures clustered around builds longer than the ECR authorization token lifetime.",
    solution:
      "Moved the ECR login into the push stage itself instead of the pipeline preamble, so the token is minted immediately before use.",
    result: "Registry push failures stopped; long builds now succeed without retries.",
  },
  {
    problem: "Pods entered CrashLoopBackOff after a container image change that built fine locally.",
    investigation:
      "kubectl logs --previous plus describe showed the process exiting immediately — the multi-stage build had dropped a runtime dependency that existed only in the builder layer.",
    solution:
      "Corrected the final stage to copy the built artifact plus its runtime deps, and added a container healthcheck so the failure surfaces at build verification.",
    result: "Image size stayed small while the runtime layer became self-contained.",
  },
  {
    problem: "ArgoCD reported OutOfSync continuously even with no new commits.",
    investigation:
      "Diffed live versus desired manifests; a mutating admission default and a manually patched replica count were being reintroduced every reconcile loop.",
    solution:
      "Removed the manual patch, enabled self-heal, and declared the fields Argo should ignore so server-side defaults are not treated as drift.",
    result: "Applications settled to a stable Synced/Healthy state and drift became meaningful again.",
  },
  {
    problem: "New image tags landed in ECR but the cluster kept serving the old revision.",
    investigation:
      "Traced the pipeline: the manifest repo commit step was writing the tag but the Argo application pointed at a different path than CI updated.",
    solution:
      "Aligned the manifest path in the Argo Application spec with the CI update step and added a pipeline assertion that the committed tag matches the pushed image.",
    result: "Deployments became deterministic — every green build reaches the cluster.",
  },
];

const STACK = [
  { name: "Jenkins", role: "Declarative CI pipeline", icon: JenkinsMark },
  { name: "Docker", role: "Multi-stage containerization", icon: DockerMark },
  { name: "Kubernetes", role: "Orchestration & runtime", icon: KubernetesMark },
  { name: "ArgoCD", role: "GitOps reconciliation", icon: ArgoMark },
  { name: "AWS ECR", role: "Private image registry", icon: EcrMark },
  { name: "AWS EC2", role: "Application compute hosts", icon: Ec2Mark },
  { name: "Python", role: "Application runtime & inference", icon: PythonMark },
  { name: "OpenAI API", role: "AI-assisted failure diagnostics", icon: OpenAiMark },
];

const OUTCOMES = [
  {
    title: "Automated delivery",
    body: "A commit reaches a running workload without a human running a deploy command.",
  },
  {
    title: "Containerized deployment",
    body: "Reproducible, scanned images tagged by commit — the artifact is identical everywhere.",
  },
  {
    title: "GitOps workflow",
    body: "Desired state is reviewed, versioned and continuously reconciled; drift self-heals.",
  },
  {
    title: "Kubernetes orchestration",
    body: "Rolling updates gated by probes, with resource limits and an exact rollback path.",
  },
  {
    title: "AWS integration",
    body: "IAM-scoped registry access and in-region pulls instead of static registry credentials.",
  },
];

function AgritechGitops() {
  return (
    <div id="top">
      {/* 1. Project hero */}
      <section className="pt-24 pb-20 md:pt-28 md:pb-24 xl:pt-32 xl:pb-28">
        <div className="container-page">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to projects
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
            <div className="flex max-w-3xl flex-col gap-5 animate-reveal">
              <SectionLabel>Case study 01 — GitOps delivery</SectionLabel>
              <h1 className="text-gradient-heading font-display text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
                AgriTech — GitOps CI/CD Platform
              </h1>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                An end-to-end delivery platform for an agriculture application: every commit is
                built and tested by Jenkins, packaged as an immutable container, published to a
                private AWS ECR registry, and reconciled onto Kubernetes by ArgoCD. Git is the only
                write path to the cluster.
              </p>

              <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
                {BADGES.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <li
                      key={badge.label}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-muted-foreground"
                    >
                      <Icon className="h-3.5 w-3.5 text-primary" />
                      {badge.label}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <a href={REPO_URL} target="_blank" rel="noreferrer noopener">
                    <Github aria-hidden />
                    View GitHub repository
                    <ArrowUpRight aria-hidden />
                  </a>
                </Button>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
                  Status — operational
                </span>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-3 animate-reveal">
              {METRICS.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-border bg-surface/40 p-4"
                >
                  <dt className="sr-only">{metric.label}</dt>
                  <dd>
                    <span className="block font-display text-2xl font-semibold text-foreground">
                      {metric.value}
                    </span>
                    <span className="mt-1 block text-xs font-medium text-foreground/80">
                      {metric.label}
                    </span>
                    <span className="mt-0.5 block text-[0.6875rem] text-muted-foreground">
                      {metric.note}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 2 + 3. Architecture visualization and lifecycle */}
      <Section
        bordered
        id="architecture"
        label="Architecture"
        heading="From commit to running workload"
        description="A deterministic walkthrough of one deployment: the artifact travels the rail from GitHub to Kubernetes, and a failed build routes itself into the diagnostics branch. Switch between the successful and failed run to see both paths."
      >
        <ol
          aria-label="Architecture summary"
          className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-2"
        >
          {FLOW_SUMMARY.map((step, index) => (
            <li key={step} className="flex items-center gap-2">
              {index > 0 && (
                <span aria-hidden className="font-mono text-xs text-border-strong">
                  &rarr;
                </span>
              )}
              <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
                {step}
              </span>
            </li>
          ))}
        </ol>

        <GitopsPipeline />
      </Section>

      {/* 3. Pipeline / workflow explanation */}
      <Section
        bordered
        label="Workflow"
        heading="What each stage is responsible for"
        description="Trigger, work and hand-off for every stage of the delivery path."
      >
        <ol className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {STAGES.map((stage, index) => (
            <li key={stage.id}>
              <PanelCard interactive={false} className="h-full">
                <CardEyebrow>
                  Stage {String(index + 1).padStart(2, "0")} — {stage.phase}
                </CardEyebrow>
                <CardTitle className="mt-3">{stage.name}</CardTitle>
                <p className="mt-1 font-mono text-[0.625rem] tracking-[0.16em] text-primary/90 uppercase">
                  {stage.role}
                </p>
                <CardBody className="mt-3">{stage.short}</CardBody>
                <ul className="mt-4 space-y-2">
                  {stage.detail.work.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <dl className="mt-5 space-y-3 border-t border-border pt-4">
                  {(
                    [
                      ["Trigger", stage.detail.trigger],
                      ["Output", stage.detail.output],
                    ] as const
                  ).map(([term, value]) => (
                    <div key={term} className="grid gap-1 sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-4">
                      <dt className="font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase sm:pt-0.5">
                        {term}
                      </dt>
                      <dd className="text-sm leading-relaxed text-foreground/85">{value}</dd>
                    </div>
                  ))}
                </dl>
              </PanelCard>
            </li>
          ))}
        </ol>
      </Section>



      {/* 4. Engineering decisions */}
      <Section
        bordered
        label="Engineering decisions"
        heading="Why the platform is built this way"
        description="Each choice trades something away. These are the trade-offs and the reasoning behind them."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {DECISIONS.map((decision) => (
            <PanelCard key={decision.title}>
              <CardTitle>{decision.title}</CardTitle>
              <CardBody className="mt-3">{decision.body}</CardBody>
            </PanelCard>
          ))}
        </div>
      </Section>

      {/* 5. Challenges & solutions */}
      <Section
        bordered
        label="Engineering challenges"
        heading="Failures, investigation and resolution"
        description="Problem → Investigation → Solution → Result for the issues that actually shaped the pipeline."
      >
        <ol className="grid gap-6 lg:grid-cols-2">
          {CHALLENGES.map((item, index) => (
            <li key={item.problem}>
              <PanelCard interactive={false} className="h-full">
                <CardEyebrow>Incident {String(index + 1).padStart(2, "0")}</CardEyebrow>
                <h3 className="mt-3 text-base leading-snug font-semibold text-foreground">
                  {item.problem}
                </h3>
                <dl className="mt-5 space-y-4">
                  {(
                    [
                      ["Investigation", item.investigation],
                      ["Solution", item.solution],
                      ["Result", item.result],
                    ] as const
                  ).map(([term, value]) => (
                    <div key={term} className="grid gap-1 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-4">
                      <dt className="font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase sm:pt-0.5">
                        {term}
                      </dt>
                      <dd className="text-sm leading-relaxed text-muted-foreground">{value}</dd>
                    </div>
                  ))}
                </dl>
              </PanelCard>
            </li>
          ))}
        </ol>
      </Section>

      {/* 6. Technology stack */}
      <Section
        bordered
        label="Stack"
        heading="Technology stack"
        description="Tooling kept deliberately small — every component earns its place in the delivery path."
      >
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {STACK.map((tech) => {
            const Icon = tech.icon;
            return (
              <li
                key={tech.name}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface/40 p-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-surface text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-foreground">
                    {tech.name}
                  </span>
                  <span className="block text-[0.6875rem] leading-snug text-muted-foreground">
                    {tech.role}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* 7. Outcome */}
      <Section
        bordered
        label="Outcome"
        heading="What the system demonstrates"
        description="The platform is the deliverable: a repeatable path from source change to verified runtime."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {OUTCOMES.map((outcome) => (
            <PanelCard key={outcome.title}>
              <CardTitle>{outcome.title}</CardTitle>
              <CardBody className="mt-3">{outcome.body}</CardBody>
            </PanelCard>
          ))}
        </div>
      </Section>

      {/* 8. Repository / CTA */}
      <Section bordered>
        <div className="surface-panel flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
              Read the pipeline definitions
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Jenkinsfile, Dockerfile, Kubernetes manifests and the ArgoCD application spec are all
              in the repository.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <a href={REPO_URL} target="_blank" rel="noreferrer noopener">
                <Github aria-hidden />
                View GitHub repository
                <ArrowUpRight aria-hidden />
              </a>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/">
                <ArrowLeft aria-hidden />
                Back to projects
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
