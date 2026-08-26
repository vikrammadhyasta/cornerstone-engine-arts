import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Github } from "lucide-react";

import { Section, SectionLabel } from "@/components/site/section";
import { PanelCard, CardEyebrow, CardTitle, CardBody } from "@/components/site/panel-card";
import { IacArchitecture } from "@/components/site/terraform/iac-architecture";
import { TERRAFORM_MARKS, TerraformBrandMark } from "@/components/site/terraform/brand-marks";
import { Button } from "@/components/ui/button";

const TITLE = "AWS Infrastructure Automation with Terraform | Vikram Madhyasta";
const DESCRIPTION =
  "Engineering case study: end-to-end AWS infrastructure provisioned with modular Terraform, an S3 + DynamoDB remote state backend, and GitHub Actions CI/CD.";

const REPO = "https://github.com/vikrammadhyasta/terraform-aws-infra";

export const Route = createFileRoute("/projects/terraform-aws-infrastructure")({
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
  component: TerraformAwsInfrastructure,
});

const BADGES = [
  "Terraform",
  "AWS",
  "GitHub Actions",
  "AWS VPC",
  "AWS EC2",
  "AWS S3",
  "DynamoDB",
  "Security Groups",
  "IAM",
];

const METRICS = [
  { value: "3", label: "Terraform modules", note: "vpc · security-group · ec2" },
  { value: "1", label: "Source of truth", note: "Remote state in S3" },
  { value: "0", label: "Console clicks", note: "Every resource is declared in code" },
  { value: "push", label: "Deployment trigger", note: "main branch → GitHub Actions" },
];

const MODULES = [
  {
    name: "modules/vpc",
    title: "Networking",
    body: "Declares the VPC (10.0.0.0/16), the public subnet (10.0.1.0/24), the internet gateway and the route association. Network layout changes stay in one place instead of being spread across resources.",
  },
  {
    name: "modules/security-group",
    title: "Access control",
    body: "Owns the instance security group and its ingress rules for SSH (22) and HTTP (80). Keeping it separate makes the exposed surface reviewable in a diff rather than buried in compute code.",
  },
  {
    name: "modules/ec2",
    title: "Compute",
    body: "Provisions the t3.micro instance into the public subnet and attaches the security group. The module takes subnet and security-group IDs as inputs, so compute never hardcodes network identifiers.",
  },
  {
    name: "backend/",
    title: "Backend bootstrap",
    body: "Holds the provider configuration and the DynamoDB lock table definition that the remote state depends on. It is bootstrapped separately so destroying the workload never destroys the state backend.",
  },
];

const AWS_SERVICES = [
  { name: "AWS VPC", role: "Isolated network at 10.0.0.0/16 with a public subnet and internet gateway" },
  { name: "AWS EC2", role: "A single t3.micro instance as the workload compute" },
  { name: "Security Groups", role: "Instance-level ingress for SSH (22) and HTTP (80)" },
  { name: "AWS S3", role: "Remote Terraform state storage" },
  { name: "DynamoDB", role: "State lock table preventing concurrent applies" },
  { name: "IAM", role: "Credentials the workflow assumes to provision infrastructure" },
];

const STATE_POINTS = [
  {
    title: "S3 — remote state storage",
    body: "The state file lives in an S3 bucket rather than on a laptop, so the CI runner and the engineer read the same state. Because the bucket is versioned storage, a bad apply can be traced back rather than guessed at.",
    mark: "AWS S3",
  },
  {
    title: "DynamoDB — state locking",
    body: "Terraform writes a lock item before mutating state and removes it afterwards. A second run — a colleague locally, or an overlapping workflow — waits instead of writing over the first, which is what prevents state corruption during parallel runs.",
    mark: "DynamoDB",
  },
  {
    title: "Bootstrapped independently",
    body: "The bucket and lock table are created by the backend configuration and deliberately kept outside the workload lifecycle, so terraform destroy tears down the infrastructure while the backend survives.",
    mark: "Terraform",
  },
];

const WORKFLOW = [
  { cmd: "checkout", body: "The workflow checks out the repository on every push to main." },
  { cmd: "setup terraform", body: "A pinned Terraform version is installed on the runner so local and CI behaviour match." },
  { cmd: "aws credentials", body: "AWS credentials are supplied from repository secrets — never committed to the configuration." },
  { cmd: "terraform init", body: "Initialises providers, modules and the S3 remote backend, acquiring the DynamoDB lock." },
  { cmd: "terraform fmt -check", body: "Fails the run on unformatted configuration, keeping diffs about intent rather than whitespace." },
  { cmd: "terraform validate", body: "Catches schema and reference errors before AWS is contacted." },
  { cmd: "terraform plan", body: "Produces the exact diff between configuration and remote state." },
  { cmd: "terraform apply", body: "Applies the plan (auto-approved on main) and writes the updated state back to S3." },
];

const CHALLENGES = [
  {
    problem: "Local state made the infrastructure unshareable and fragile.",
    investigation:
      "With state on a single machine, CI had no idea what already existed. Any run from a different context would have planned to recreate resources that were already provisioned.",
    solution:
      "Moved state to an S3 backend and bootstrapped it from a separate backend configuration, so both the runner and the workstation resolve the same state.",
    result: "One authoritative state, and the pipeline can plan and apply without prior local context.",
  },
  {
    problem: "Concurrent runs could corrupt the state file.",
    investigation:
      "Two applies overlapping — a manual run alongside a pipeline run — can interleave writes to the same state object, leaving it inconsistent with reality.",
    solution: "Enabled DynamoDB state locking on the backend so Terraform takes an exclusive lock for the duration of a run.",
    result: "The second run blocks rather than writing, and state stays consistent through parallel activity.",
  },
  {
    problem: "A flat configuration made networking and compute changes risky to review.",
    investigation:
      "With everything in one root configuration, a small compute change touched the same file as subnet and security-group definitions, making the blast radius of a diff hard to judge.",
    solution:
      "Split the configuration into vpc, security-group and ec2 modules with explicit inputs and outputs, wired together in the root main.tf.",
    result: "Each change is scoped to one module, and identifiers flow through outputs instead of being hardcoded.",
  },
  {
    problem: "Broken configuration only surfaced at apply time.",
    investigation:
      "Syntax and reference mistakes were being discovered against a live AWS account, which is the most expensive place to find them.",
    solution: "Added format checking, validation and a plan stage ahead of apply in the GitHub Actions workflow.",
    result: "Invalid configuration fails on the runner in seconds, and every apply is preceded by a reviewable plan.",
  },
];

const OUTCOMES = [
  { title: "Reproducible infrastructure", body: "The VPC, subnet, gateway, security group and instance are fully declared in Terraform — the environment can be rebuilt from the repository alone." },
  { title: "Modular composition", body: "Networking, access control and compute are separate modules with explicit inputs and outputs rather than one flat file." },
  { title: "Safe shared state", body: "Remote state in S3 with DynamoDB locking gives one source of truth and protects against concurrent writes." },
  { title: "Push-to-provision delivery", body: "A push to main runs init, format check, validate, plan and apply with no manual console work." },
  { title: "No hardcoded credentials", body: "AWS access is injected from repository secrets at run time and stays out of the configuration." },
  { title: "Cost-aware footprint", body: "A single t3.micro instance and a Free-Tier-oriented backend, with terraform destroy available to tear the workload down while the backend remains." },
];

function TerraformAwsInfrastructure() {
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
              <SectionLabel>Case study 03 — Cloud Infrastructure / IaC</SectionLabel>
              <h1 className="text-gradient-heading font-display text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
                AWS Infrastructure Automation with Terraform
              </h1>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                End-to-end AWS infrastructure provisioned as code: a modular Terraform configuration
                for networking, access control and compute, backed by remote state in S3 with
                DynamoDB locking, and applied automatically by a GitHub Actions workflow on every
                push to main.
              </p>

              <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
                {BADGES.map((label) => {
                  const Icon = TERRAFORM_MARKS[label] ?? TerraformBrandMark;
                  return (
                    <li
                      key={label}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-muted-foreground"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {label}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <Button asChild>
                  <a href={REPO} target="_blank" rel="noreferrer noopener">
                    <Github className="h-4 w-4" aria-hidden />
                    View on GitHub
                  </a>
                </Button>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
                  Trigger — push to main
                </span>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-3 animate-reveal">
              {METRICS.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-border bg-surface/40 p-4">
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

      {/* 2. Architecture visualization */}
      <Section
        bordered
        id="architecture"
        label="Architecture"
        heading="From commit to provisioned infrastructure"
        description="One push travelling the whole path: GitHub Actions runs init, validate, plan and apply against the S3 remote backend with a DynamoDB lock, and provisions the VPC, subnet, security group and EC2 instance in AWS."
      >
        <IacArchitecture />
      </Section>

      {/* 3. Terraform module architecture */}
      <Section
        bordered
        label="Terraform modules"
        heading="Composition over one large configuration"
        description="The root configuration wires three focused modules together and passes identifiers through outputs, so each concern can change independently."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {MODULES.map((m) => (
            <PanelCard key={m.name}>
              <CardEyebrow>{m.name}</CardEyebrow>
              <CardTitle className="mt-3">{m.title}</CardTitle>
              <CardBody className="mt-3">{m.body}</CardBody>
            </PanelCard>
          ))}
        </div>

        <div className="mt-8 surface-panel p-5 sm:p-7">
          <p className="font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase">
            Repository layout
          </p>
          <pre className="mt-4 overflow-x-auto font-mono text-[0.75rem] leading-relaxed text-muted-foreground">
{`terraform-aws-infra/
├── backend/
│   ├── provider.tf
│   └── dynamodb.tf
├── modules/
│   ├── vpc/
│   ├── security-group/
│   └── ec2/
├── provider.tf
├── terraform.tf
├── main.tf
└── .github/workflows/terraform.yml`}
          </pre>
        </div>
      </Section>

      {/* 4. AWS services breakdown */}
      <Section
        bordered
        label="AWS services"
        heading="What actually gets provisioned"
        description="A deliberately small surface: one network, one instance, one security group, and the two services that make the state safe to share."
      >
        <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {AWS_SERVICES.map((s) => {
            const Icon = TERRAFORM_MARKS[s.name] ?? TerraformBrandMark;
            return (
              <li
                key={s.name}
                className="flex gap-3 rounded-xl border border-border bg-surface/40 p-4"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-background/40">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-foreground">{s.name}</span>
                  <span className="mt-1 block text-[0.8125rem] leading-relaxed text-muted-foreground">
                    {s.role}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* 5. Remote state architecture */}
      <Section
        bordered
        label="Remote state"
        heading="State is the part that must not break"
        description="Terraform state is the mapping between configuration and real resources. Storing it remotely and locking it is what makes automated applies safe."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {STATE_POINTS.map((p) => {
            const Icon = TERRAFORM_MARKS[p.mark] ?? TerraformBrandMark;
            return (
              <PanelCard key={p.title}>
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background/40">
                  <Icon className="h-4 w-4" />
                </span>
                <CardTitle className="mt-4">{p.title}</CardTitle>
                <CardBody className="mt-3">{p.body}</CardBody>
              </PanelCard>
            );
          })}
        </div>
      </Section>

      {/* 6. GitHub Actions workflow */}
      <Section
        bordered
        label="CI/CD"
        heading="The workflow that owns every change"
        description="Nothing is applied by hand. .github/workflows/terraform.yml runs on every push to main and moves the account towards the committed configuration."
      >
        <ol className="grid gap-3 md:grid-cols-2">
          {WORKFLOW.map((step, i) => (
            <li
              key={step.cmd}
              className="flex gap-4 rounded-xl border border-border bg-surface/40 p-4"
            >
              <span className="font-mono text-[0.6875rem] text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="block font-mono text-[0.8125rem] text-foreground">{step.cmd}</span>
                <span className="mt-1 block text-[0.8125rem] leading-relaxed text-muted-foreground">
                  {step.body}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </Section>

      {/* 7. Engineering challenges */}
      <Section
        bordered
        label="Engineering challenges"
        heading="What went wrong, and what changed because of it"
        description="Each of these changed the architecture rather than being patched around."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {CHALLENGES.map((c) => (
            <PanelCard key={c.problem} interactive={false}>
              <CardEyebrow>Problem</CardEyebrow>
              <CardTitle className="mt-3">{c.problem}</CardTitle>
              <dl className="mt-4 space-y-3">
                <div>
                  <dt className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
                    Investigation
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {c.investigation}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
                    Solution
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.solution}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.625rem] tracking-[0.16em] text-success uppercase">
                    Result
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.result}</dd>
                </div>
              </dl>
            </PanelCard>
          ))}
        </div>
      </Section>

      {/* 8. Outcomes */}
      <Section
        bordered
        label="Outcome"
        heading="What the project demonstrates"
        description="Infrastructure that is declared, reviewed, versioned and applied the same way application code is."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {OUTCOMES.map((o) => (
            <PanelCard key={o.title}>
              <CardTitle>{o.title}</CardTitle>
              <CardBody className="mt-3">{o.body}</CardBody>
            </PanelCard>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button asChild>
            <a href={REPO} target="_blank" rel="noreferrer noopener">
              <Github className="h-4 w-4" aria-hidden />
              View the repository
            </a>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/">Back to all projects</Link>
          </Button>
        </div>
      </Section>
    </div>
  );
}
