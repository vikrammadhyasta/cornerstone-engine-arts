import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Cloud,
  Github,
  Layers,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/section";
import { PanelCard, CardTitle, CardBody } from "@/components/site/panel-card";

type Project = {
  id: string;
  category: string;
  icon: LucideIcon;
  title: string;
  description: string;
  tech: string[];
  extra: number;
  href?: string;
  repo?: string;
  /** subtle domain-specific cue rendered behind the card header */
  cue: "pipeline" | "cloud" | "grid" | "steps";
};

const PROJECTS: Project[] = [
  {
    id: "agritech-gitops",
    category: "Platform",
    icon: Workflow,
    title: "AgriTech GitOps CI/CD Platform",
    description:
      "End-to-end GitOps delivery platform from GitHub through Jenkins, Docker, AWS ECR, ArgoCD and Kubernetes, with AI-assisted failure diagnostics.",
    tech: ["Jenkins", "Docker", "Kubernetes", "ArgoCD", "AWS ECR", "AWS EC2", "Python", "OpenAI API"],
    extra: 0,
    href: "/projects/agritech-gitops",
    repo: "https://github.com/vikrammadhyasta/AgriTech.git",
    cue: "pipeline",
  },
  {
    id: "cloud-ml",
    category: "Cloud infrastructure",
    icon: Cloud,
    title: "Cloud ML Agriculture Predictor",
    description:
      "Serverless crop-yield prediction API using AWS Lambda, API Gateway, S3, CloudWatch and IAM.",
    tech: ["AWS S3", "AWS Lambda", "API Gateway", "CloudWatch", "IAM"],
    extra: 2,
    href: "/projects/cloud-ml-predictor",
    repo: "https://github.com/vikrammadhyasta/cloud-ml-agriculture-predictor",
    cue: "cloud",
  },
  {
    id: "terraform-aws",
    category: "Cloud infrastructure",
    icon: Layers,
    title: "AWS Infrastructure Automation with Terraform",
    description:
      "Modular AWS infrastructure provisioned with Terraform across networking, load balancing, security and compute.",
    tech: ["Terraform", "AWS VPC", "AWS ALB", "AWS ASG", "AWS EC2"],
    extra: 3,
    href: "/projects/terraform-aws-infrastructure",
    repo: "https://github.com/vikrammadhyasta/terraform-aws-infra",
    cue: "grid",
  },
  {
    id: "ansible-jenkins",
    category: "Delivery automation",
    icon: Workflow,
    title: "Ansible Jenkins CI/CD",
    description:
      "Automated infrastructure provisioning and CI/CD workflow using Ansible, Jenkins, Docker and GitHub.",
    tech: ["Ansible", "Jenkins", "Docker", "GitHub", "CI/CD"],
    extra: 0,
    href: "/projects/ansible-jenkins-cicd",
    repo: "https://github.com/vikrammadhyasta/ansible-jenkins-docker-ci-cd",
    cue: "steps",
  },
];

function DomainCue({ cue }: { cue: Project["cue"] }) {
  const common = "pointer-events-none absolute right-5 top-5 h-14 w-24 opacity-40 transition-opacity duration-500 group-hover:opacity-70";
  if (cue === "pipeline") {
    return (
      <svg aria-hidden className={common} viewBox="0 0 96 56" fill="none">
        <path d="M6 40h20l10-16h20l10 16h24" stroke="currentColor" strokeWidth="1" className="text-primary/50" />
        <circle cx="6" cy="40" r="2.5" className="fill-primary/70" />
        <circle cx="46" cy="24" r="2.5" className="fill-primary/70" />
        <circle cx="90" cy="40" r="2.5" className="fill-primary/70" />
      </svg>
    );
  }
  if (cue === "cloud") {
    return (
      <svg aria-hidden className={common} viewBox="0 0 96 56" fill="none">
        <path d="M28 38a9 9 0 0 1 1.6-17.8A13 13 0 0 1 54 22a8 8 0 0 1 1.5 16H28Z" stroke="currentColor" strokeWidth="1" className="text-primary/45" />
        <path d="M12 48h72" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" className="text-primary/30" />
      </svg>
    );
  }
  if (cue === "grid") {
    return (
      <svg aria-hidden className={common} viewBox="0 0 96 56" fill="none">
        {[0, 1, 2].map((r) =>
          [0, 1, 2, 3].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={12 + c * 20}
              y={8 + r * 16}
              width="14"
              height="10"
              rx="2"
              stroke="currentColor"
              strokeWidth="1"
              className="text-primary/35"
            />
          )),
        )}
      </svg>
    );
  }
  return (
    <svg aria-hidden className={common} viewBox="0 0 96 56" fill="none">
      <path d="M8 46h20V32h20V18h20V8h20" stroke="currentColor" strokeWidth="1" className="text-primary/45" />
      <circle cx="88" cy="8" r="2.5" className="fill-primary/70" />
    </svg>
  );
}

export function ProjectsShowcase() {
  return (
    <Section
      bordered
      id="projects"
      label="PROJECTS"
      heading="Engineering Registry"
      description="A curated collection of cloud, DevOps, infrastructure, automation, and platform engineering systems I've built."
    >
      <ul className="grid list-none gap-6 md:grid-cols-2 xl:grid-cols-3">
        {PROJECTS.map((project) => {
          const Icon = project.icon;
          return (
            <li key={project.id} className="h-full">
              <PanelCard className="flex h-full flex-col p-6">
                <DomainCue cue={project.cue} />
                <p className="flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.16em] text-primary uppercase">
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  {project.category}
                </p>
                <CardTitle className="mt-4 text-balance">{project.title}</CardTitle>
                <CardBody className="mt-3">{project.description}</CardBody>

                <ul className="mt-5 flex list-none flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-md border border-border bg-surface/60 px-2 py-1 font-mono text-[0.6875rem] text-muted-foreground"
                    >
                      {t}
                    </li>
                  ))}
                  {project.extra > 0 && (
                    <li className="rounded-md border border-border bg-surface/60 px-2 py-1 font-mono text-[0.6875rem] text-muted-foreground">
                      +{project.extra}
                    </li>
                  )}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-2 pt-2 sm:mt-auto">
                  {project.href ? (
                    <Button asChild size="sm">
                      <Link to={project.href}>
                        View case study
                        <ArrowUpRight />
                      </Link>
                    </Button>
                  ) : (
                    <Button size="sm" disabled title="Case study in progress">
                      Case study soon
                    </Button>
                  )}
                  {project.repo && (
                    <Button asChild size="sm" variant="secondary">
                      <a href={project.repo} target="_blank" rel="noreferrer noopener">
                        <Github />
                        GitHub
                        <span className="sr-only"> repository for {project.title}</span>
                      </a>
                    </Button>
                  )}
                </div>
              </PanelCard>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
