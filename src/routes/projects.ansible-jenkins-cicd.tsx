import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Github } from "lucide-react";

import { Section, SectionLabel } from "@/components/site/section";
import { PanelCard, CardEyebrow, CardTitle, CardBody } from "@/components/site/panel-card";
import { AnsibleDeploymentArchitecture } from "@/components/site/ansible/deployment-architecture";
import { JenkinsJobFlow } from "@/components/site/ansible/jenkins-job";
import { ANSIBLE_MARKS, AnsibleBrandMark } from "@/components/site/ansible/brand-marks";
import { Button } from "@/components/ui/button";

const TITLE = "Ansible Jenkins CI/CD | Vikram Madhyasta";
const DESCRIPTION =
  "Engineering case study: automated infrastructure configuration and container deployment with Ansible roles, Jenkins and Docker across two AWS EC2 instances.";

const REPO = "https://github.com/vikrammadhyasta/ansible-jenkins-docker-ci-cd";

export const Route = createFileRoute("/projects/ansible-jenkins-cicd")({
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
  component: AnsibleJenkinsCicd,
});

const BADGES = ["AWS EC2", "Ansible", "Jenkins", "Docker", "Linux / Ubuntu", "Node.js"];

const FACTS = [
  { value: "2", label: "EC2 instances", note: "control node · managed node" },
  { value: "4", label: "Ansible roles", note: "common · docker · jenkins · node-app" },
  { value: "1", label: "Jenkins job", note: "build · remove · deploy" },
  { value: ":80", label: "Exposed port", note: "container published on the host" },
];

const NODES = [
  {
    role: "Control node",
    purpose: "Ansible automation and control",
    items: [
      "Ansible installed and configured here",
      "Inventory declaring the managed node",
      "SSH connectivity with the correct key pair",
      "Playbook execution against the target",
    ],
  },
  {
    role: "Managed node",
    purpose: "Application deployment target",
    items: [
      "Docker engine installed by Ansible",
      "Jenkins and Java installed by Ansible",
      "Node.js application files in /opt/node-app",
      "Container deployment published on port 80",
    ],
  },
];

const ROLES = [
  {
    name: "roles/common",
    body: "Baseline server configuration applied before anything else, so both runs start from the same known state.",
  },
  {
    name: "roles/docker",
    body: "Installs and enables the Docker engine on the managed node and prepares it to build and run containers.",
  },
  {
    name: "roles/jenkins",
    body: "Installs Jenkins together with Java on the managed node so the CI/CD tool is part of the provisioned environment.",
  },
  {
    name: "roles/node-app",
    body: "Creates the Node.js application files and the Dockerfile under /opt/node-app, so the build context exists before Jenkins runs.",
  },
];

const CHALLENGES = [
  {
    problem: "SSH connectivity between the control node and the managed node failed.",
    resolution:
      "Corrected the inventory host entry, the remote user and the SSH configuration until the control node could reach the managed node non-interactively, which is what playbook execution depends on.",
  },
  {
    problem: "The wrong key pair was configured for the managed node.",
    resolution:
      "Aligned the private key referenced by Ansible with the key pair actually attached to the target EC2 instance, and set its permissions so SSH would accept it.",
  },
  {
    problem: "Jenkins could not run Docker commands.",
    resolution:
      "The Jenkins user had no access to the Docker socket. Adding Jenkins to the docker group and restarting the service let the job build images and manage containers.",
  },
  {
    problem: "Port 80 was already taken by Nginx.",
    resolution:
      "The default web server was occupying the port the container needed. Freeing port 80 on the host let the deployment publish the application there instead of a container start failure.",
  },
  {
    problem: "File permission conflicts between the Jenkins and Ubuntu users.",
    resolution:
      "Application files created under one user were not writable by the other. Correcting ownership on /opt/node-app made the build context usable by the Jenkins job.",
  },
  {
    problem: "The EC2 public IP changed after an instance restart.",
    resolution:
      "The old address stopped resolving to the application. Re-checking the current public IP after restart — and keeping the address out of any fixed configuration — kept the deployment reachable.",
  },
];

const STACK = [
  { name: "AWS EC2", role: "Two Ubuntu instances: the Ansible control node and the managed deployment target" },
  { name: "Ansible", role: "Reusable roles and playbooks that configure the managed node over SSH" },
  { name: "Jenkins", role: "Freestyle job that builds the image and redeploys the container" },
  { name: "Docker", role: "Image build and container runtime for the application" },
  { name: "Linux / Ubuntu", role: "Host operating system, services, users and permissions" },
  { name: "Node.js", role: "The Dockerized application served on port 80" },
];

const OUTCOMES = [
  {
    title: "Repeatable configuration",
    body: "The managed node is configured by roles and playbooks, so the same environment can be produced again rather than reassembled by hand.",
  },
  {
    title: "Automated deployment",
    body: "Building the image, removing the old container and starting the new one happen inside one Jenkins job instead of a manual sequence.",
  },
  {
    title: "Rebuild and redeploy on demand",
    body: "Running the job again rebuilds the Dockerized application and replaces the running container with the new build.",
  },
  {
    title: "Reproducible environment",
    body: "Docker, Jenkins, Java and the application files all come from Ansible, so the setup is described in the repository rather than in someone's memory.",
  },
];

function AnsibleJenkinsCicd() {
  return (
    <div id="top">
      {/* 1. Hero */}
      <section className="pt-24 pb-20 md:pt-28 md:pb-24 xl:pt-32 xl:pb-28">
        <div className="container-page">
          <Link
            to="/"
            hash="projects"
            className="inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to projects
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
            <div className="flex max-w-3xl flex-col gap-5 animate-reveal">
              <SectionLabel>Case study 04 — Delivery automation</SectionLabel>
              <h1 className="text-gradient-heading font-display text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
                Ansible Jenkins CI/CD
              </h1>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                Automated infrastructure configuration and application deployment using Ansible,
                Jenkins, Docker and AWS EC2. An Ansible control node provisions a separate managed
                EC2 instance over SSH with reusable roles, and a Jenkins job on that node builds the
                Docker image, removes the old container and deploys the new one on port 80.
              </p>

              <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
                {BADGES.map((label) => {
                  const Icon = ANSIBLE_MARKS[label] ?? AnsibleBrandMark;
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
                  Two-node infrastructure model
                </span>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-3 animate-reveal">
              {FACTS.map((fact) => (
                <div key={fact.label} className="rounded-xl border border-border bg-surface/40 p-4">
                  <dt className="sr-only">{fact.label}</dt>
                  <dd>
                    <span className="block font-display text-2xl font-semibold text-foreground">
                      {fact.value}
                    </span>
                    <span className="mt-1 block text-xs font-medium text-foreground/80">
                      {fact.label}
                    </span>
                    <span className="mt-0.5 block text-[0.6875rem] text-muted-foreground">
                      {fact.note}
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
        heading="From control node to a running container"
        description="One deterministic execution path: the control node reaches the managed EC2 instance over SSH, Ansible roles install Docker, Jenkins, Java and the application, and the Jenkins job builds, replaces and publishes the container on port 80."
      >
        <AnsibleDeploymentArchitecture />
      </Section>

      {/* 3. Two-node model */}
      <Section
        bordered
        label="Infrastructure model"
        heading="Two EC2 instances with separate responsibilities"
        description="Automation and the deployment target are deliberately kept apart: nothing is configured by hand on the node that runs the application."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {NODES.map((n) => (
            <PanelCard key={n.role}>
              <CardEyebrow>{n.role}</CardEyebrow>
              <CardTitle className="mt-3">{n.purpose}</CardTitle>
              <ul className="mt-4 space-y-2">
                {n.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                    {item}
                  </li>
                ))}
              </ul>
            </PanelCard>
          ))}
        </div>

        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          The relationship is one-directional: the control node holds the automation and the SSH
          credentials, and the managed node only receives configuration. Rebuilding the target does
          not mean rebuilding the automation.
        </p>
      </Section>

      {/* 4. Ansible automation */}
      <Section
        bordered
        label="Ansible automation"
        heading="Reusable roles instead of manual server setup"
        description="Every piece of configuration lives in a role, so the same automation can be re-run against a fresh instance rather than being repeated by hand."
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-start">
          <div className="surface-panel p-5 sm:p-7">
            <p className="font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase">
              Automation layout
            </p>
            <pre className="mt-4 overflow-x-auto font-mono text-[0.75rem] leading-relaxed text-muted-foreground">
{`ansible/
├── roles/
│   ├── common/
│   ├── docker/
│   ├── jenkins/
│   └── node-app/
├── playbooks/
└── inventory`}
            </pre>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {ROLES.map((r) => (
              <div key={r.name} className="rounded-xl border border-border bg-surface/40 p-4">
                <p className="font-mono text-[0.8125rem] text-primary">{r.name}</p>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 5. Jenkins pipeline */}
      <Section
        bordered
        label="Jenkins job"
        heading="Build, replace, deploy"
        description="A freestyle job on the managed node owns the deployment sequence. Select a step to read what it does."
      >
        <JenkinsJobFlow />
      </Section>

      {/* 6. Engineering challenges */}
      <Section
        bordered
        label="Engineering challenges"
        heading="Real problems solved along the way"
        description="Each of these blocked the pipeline until the underlying configuration was corrected."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {CHALLENGES.map((c) => (
            <PanelCard key={c.problem} interactive={false}>
              <CardEyebrow>Incident</CardEyebrow>
              <CardTitle className="mt-3">{c.problem}</CardTitle>
              <dl className="mt-4">
                <dt className="font-mono text-[0.625rem] tracking-[0.16em] text-success uppercase">
                  Resolution
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.resolution}</dd>
              </dl>
            </PanelCard>
          ))}
        </div>
      </Section>

      {/* 7. Technology breakdown */}
      <Section
        bordered
        label="Technology"
        heading="What each tool is responsible for"
        description="A small stack with clear ownership — configuration, delivery, runtime and host."
      >
        <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {STACK.map((s) => {
            const Icon = ANSIBLE_MARKS[s.name] ?? AnsibleBrandMark;
            return (
              <li key={s.name} className="flex gap-3 rounded-xl border border-border bg-surface/40 p-4">
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

      {/* 8. Outcome */}
      <Section
        bordered
        label="Outcome"
        heading="What the project demonstrates"
        description="Configuration and deployment described in code, applied the same way each time."
      >
        <div className="grid gap-6 md:grid-cols-2">
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
            <Link to="/" hash="projects">Back to all projects</Link>
          </Button>
        </div>
      </Section>
    </div>
  );
}
