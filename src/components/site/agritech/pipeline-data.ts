import type * as React from "react";
import {
  ArgoMark,
  DockerMark,
  EcrMark,
  GitHubMark,
  JenkinsMark,
  KubernetesMark,
} from "@/components/site/tech-marks";

export interface PipelineStage {
  id: string;
  phase: string;
  name: string;
  short: string;
  role: string;
  status: string;
  statusTone: "success" | "primary";
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  detail: {
    trigger: string;
    work: string[];
    output: string;
  };
}

export const STAGES: PipelineStage[] = [
  {
    id: "source",
    role: "Source control · Pipeline trigger",
    phase: "Source",
    name: "GitHub",
    short: "Commit to main triggers the delivery pipeline via webhook.",
    status: "Webhook active",
    statusTone: "success",
    icon: GitHubMark,
    detail: {
      trigger: "Push or merged pull request on a tracked branch.",
      work: [
        "Branch protection and required checks gate what can reach main.",
        "Application source and Kubernetes manifests live in separate repositories so image builds never race with desired-state commits.",
        "A webhook notifies Jenkins with the commit SHA, which becomes the identity of the whole release.",
      ],
      output: "Immutable commit SHA handed to CI.",
    },
  },
  {
    id: "build",
    role: "CI orchestration · Build & test",
    phase: "Build",
    name: "Jenkins",
    short: "Declarative pipeline runs checks, then builds the artifact.",
    status: "Pipeline green",
    statusTone: "success",
    icon: JenkinsMark,
    detail: {
      trigger: "Webhook payload from GitHub.",
      work: [
        "Declarative Jenkinsfile stored in the repo — the pipeline is versioned with the code it builds.",
        "Stages: checkout, dependency install, lint, unit tests, image build, image push, manifest update.",
        "Credentials for the registry are injected from the Jenkins credential store, never baked into the job.",
      ],
      output: "Tested workspace ready for containerization.",
    },
  },
  {
    id: "container",
    role: "Image creation · Reproducible runtime",
    phase: "Container",
    name: "Docker",
    short: "Multi-stage build produces a small, reproducible image.",
    status: "Image built",
    statusTone: "primary",
    icon: DockerMark,
    detail: {
      trigger: "Successful test stage in Jenkins.",
      work: [
        "Multi-stage Dockerfile separates build tooling from the runtime layer, cutting image size and attack surface.",
        "Non-root user, pinned base image digest and an explicit healthcheck.",
        "Layer ordering places dependency installation before source copy so cached layers survive most commits.",
      ],
      output: "Image tagged with the commit SHA, not latest.",
    },
  },
  {
    id: "registry",
    role: "Image registry · AWS integration",
    phase: "Registry",
    name: "AWS ECR",
    short: "Private registry stores every immutable, scanned image.",
    status: "Scan clean",
    statusTone: "success",
    icon: EcrMark,
    detail: {
      trigger: "Docker push from the Jenkins agent.",
      work: [
        "Private ECR repository with IAM-scoped push access for CI and pull access for the cluster node role.",
        "Scan-on-push surfaces CVEs before anything can be promoted.",
        "Lifecycle policy expires untagged and superseded images to keep storage predictable.",
      ],
      output: "Addressable image reference for the GitOps commit.",
    },
  },
  {
    id: "gitops",
    role: "GitOps reconciliation · Desired vs actual state",
    phase: "GitOps",
    name: "ArgoCD",
    short: "Git is the source of truth; Argo reconciles the cluster to it.",
    status: "Synced",
    statusTone: "success",
    icon: ArgoMark,
    detail: {
      trigger: "Jenkins commits the new image tag to the manifest repository.",
      work: [
        "ArgoCD watches the manifest repo and continuously diffs desired state against live cluster state.",
        "Automated sync with prune and self-heal, so manual cluster edits are reverted rather than silently kept.",
        "Rollback is a git revert — no imperative kubectl required.",
      ],
      output: "Cluster converged to the committed desired state.",
    },
  },
  {
    id: "runtime",
    role: "Deployment runtime · Orchestration",
    phase: "Runtime",
    name: "Kubernetes",
    short: "Rolling update with probes gates traffic on readiness.",
    status: "Healthy",
    statusTone: "success",
    icon: KubernetesMark,
    detail: {
      trigger: "ArgoCD applying the reconciled manifests.",
      work: [
        "Deployment rolling update with maxUnavailable 0 so capacity never dips during a release.",
        "Readiness and liveness probes decide when a pod receives traffic and when it is restarted.",
        "Resource requests and limits set per workload; failed rollouts stop automatically instead of cascading.",
      ],
      output: "New revision serving traffic, previous revision retained.",
    },
  },
];
