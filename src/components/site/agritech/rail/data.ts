import type { ComponentType } from "react";
import {
  ArgoIcon,
  AwsIcon,
  DockerIcon,
  GitHubIcon,
  JenkinsIcon,
  KubernetesIcon,
} from "./icons";

/**
 * Static station metadata only — order, naming and brand marks. All runtime
 * state (status, progress, meta lines) is derived per frame in demo.ts.
 */
export type Stage = {
  id: string;
  index: string;
  name: string;
  sub: string;
  Icon: ComponentType<{ className?: string }>;
  tone: string;
};

export const stages: Stage[] = [
  {
    id: "github",
    index: "01",
    name: "GitHub",
    sub: "source · main",
    Icon: GitHubIcon,
    tone: "text-brand-github",
  },
  {
    id: "jenkins",
    index: "02",
    name: "Jenkins CI",
    sub: "build & test",
    Icon: JenkinsIcon,
    tone: "text-brand-jenkins",
  },
  {
    id: "docker",
    index: "03",
    name: "Docker Build",
    sub: "image :a41c9e2",
    Icon: DockerIcon,
    tone: "text-brand-docker",
  },
  {
    id: "ecr",
    index: "04",
    name: "AWS ECR",
    sub: "private registry",
    Icon: AwsIcon,
    tone: "text-brand-aws",
  },
  {
    id: "argocd",
    index: "05",
    name: "ArgoCD",
    sub: "gitops sync",
    Icon: ArgoIcon,
    tone: "text-brand-argo",
  },
  {
    id: "k8s",
    index: "06",
    name: "Kubernetes",
    sub: "k3s cluster",
    Icon: KubernetesIcon,
    tone: "text-brand-kubernetes",
  },
];

export type LogTone = "dim" | "normal" | "ok" | "fail";

export const logLines: { t: string; text: string; tone: LogTone }[] = [
  { t: "12:04:03", text: "Started by GitHub push · pipeline #248", tone: "dim" },
  { t: "12:04:04", text: "Checking out main @ a41c9e2", tone: "dim" },
  { t: "12:04:22", text: "docker build -t agritech:a41c9e2 . — 12 layers", tone: "dim" },
  { t: "12:06:10", text: "Successfully built agritech:a41c9e2", tone: "ok" },
  { t: "12:06:12", text: "Stage: push-image → AWS ECR", tone: "normal" },
  { t: "12:07:48", text: "The push refers to repository [ecr/agritech]", tone: "dim" },
  { t: "12:08:09", text: "denied: Your authorization token has expired", tone: "fail" },
  { t: "12:08:09", text: "Reauthenticate to the AWS ECR registry and try again", tone: "fail" },
  { t: "12:08:10", text: "ERROR: script returned exit code 1", tone: "fail" },
  { t: "12:08:10", text: "Finished: FAILURE", tone: "fail" },
];
