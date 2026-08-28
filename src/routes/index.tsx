import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Download, Github, Layers, Terminal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Section, SectionLabel } from "@/components/site/section";
import { PanelCard, CardEyebrow, CardTitle, CardBody } from "@/components/site/panel-card";
import { Hero } from "@/components/site/hero";
import { EngineeringIdentity } from "@/components/site/engineering-identity";
import { ProjectsShowcase } from "@/components/site/projects-showcase";
import { ExperienceShowcase } from "@/components/site/experience-showcase";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vikram Madhyasta — Cloud, DevOps & Platform Engineer" },
      {
        name: "description",
        content:
          "Cloud & DevOps engineering portfolio featuring Kubernetes, Infrastructure as Code, automation, and platform engineering.",
      },
      { property: "og:title", content: "Vikram Madhyasta — Cloud, DevOps & Platform Engineer" },
      {
        property: "og:description",
        content:
          "Cloud & DevOps engineering portfolio featuring Kubernetes, Infrastructure as Code, automation, and platform engineering.",
      },
    ],
  }),
  component: Index,
});

const TOKENS = [
  { name: "background", swatch: "bg-background" },
  { name: "surface", swatch: "bg-surface" },
  { name: "surface-elevated", swatch: "bg-surface-elevated" },
  { name: "primary", swatch: "bg-primary" },
  { name: "primary-glow", swatch: "bg-primary-glow" },
  { name: "muted", swatch: "bg-muted" },
  { name: "success", swatch: "bg-success" },
  { name: "destructive", swatch: "bg-destructive" },
];

const RESERVED = [
  { id: "engineering", label: "Engineering", note: "Capabilities, tooling and practices." },
  { id: "contact", label: "Contact", note: "Direct channels and availability." },
];



function Index() {
  return (
    <div id="top">
      <Hero />
      <EngineeringIdentity />
      <ExperienceShowcase />
      <ProjectsShowcase />


      <Section


        id="platform"
        label="Design foundation"
        heading="The system every section will inherit"
        description="A restrained, dark-first design language: one container rhythm, one card, four button roles and a single ambient background. Built so future sections only add content, never new styling."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg">
            Primary action
            <ArrowUpRight />
          </Button>
          <Button size="lg" variant="secondary">
            Secondary
          </Button>
          <Button size="lg" variant="ghost">
            Ghost
          </Button>
          <Button size="icon" variant="secondary" aria-label="View source">
            <Github />
          </Button>
          <Button size="icon" variant="ghost" aria-label="Download resume">
            <Download />
          </Button>
        </div>
      </Section>

      <Section
        bordered
        label="Type scale"
        heading="Typography & rhythm"
        description="Sora for display, Manrope for body, JetBrains Mono for labels and metrics. Generous line height and measured widths keep long-form technical writing readable."
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-6">
            <p className="text-gradient-heading font-display text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
              Infrastructure that explains itself
            </p>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Body copy sits at a comfortable measure with relaxed leading, so architecture
              narratives, trade-off notes and incident write-ups stay effortless to scan.
            </p>
            <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
              Label / meta / metric
            </p>
          </div>
          <PanelCard interactive={false} className="h-fit">
            <CardEyebrow>Scale</CardEyebrow>
            <ul className="mt-4 space-y-3 font-mono text-xs text-muted-foreground">
              <li className="flex justify-between">
                <span>display</span>
                <span className="text-foreground">60 / 1.05</span>
              </li>
              <li className="flex justify-between">
                <span>heading</span>
                <span className="text-foreground">48 / 1.1</span>
              </li>
              <li className="flex justify-between">
                <span>title</span>
                <span className="text-foreground">18 / 1.4</span>
              </li>
              <li className="flex justify-between">
                <span>body</span>
                <span className="text-foreground">16 / 1.7</span>
              </li>
              <li className="flex justify-between">
                <span>label</span>
                <span className="text-foreground">11 / 0.16em</span>
              </li>
            </ul>
          </PanelCard>
        </div>
      </Section>

      <Section
        bordered
        label="Surfaces"
        heading="One card, every context"
        description="A single elevated surface handles projects, skills, certifications, experience and metrics. Hover adds a four-pixel lift and a hairline accent — nothing more."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <PanelCard>
            <CardEyebrow>Metric</CardEyebrow>
            <p className="mt-4 font-display text-4xl font-semibold text-foreground">99.98%</p>
            <CardBody className="mt-2">Rolling availability across managed services.</CardBody>
          </PanelCard>
          <PanelCard>
            <Layers className="h-5 w-5 text-primary" aria-hidden />
            <CardTitle className="mt-4">Composable content</CardTitle>
            <CardBody className="mt-2">
              The same shell holds a case study, a capability summary or a role in a timeline.
            </CardBody>
          </PanelCard>
          <PanelCard>
            <Terminal className="h-5 w-5 text-primary" aria-hidden />
            <CardTitle className="mt-4">Predictable states</CardTitle>
            <CardBody className="mt-2">
              Hover, focus and reduced-motion behaviour are defined once at the system level.
            </CardBody>
          </PanelCard>
        </div>
      </Section>

      <Section
        bordered
        label="Palette"
        heading="Color system"
        description="Deep navy base, a single cool signal accent and semantic states. No neon, no decorative gradients beyond the ambient background."
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {TOKENS.map((token) => (
            <div key={token.name} className="rounded-xl border border-border bg-surface/40 p-3">
              <div className={`h-16 w-full rounded-lg border border-border ${token.swatch}`} />
              <p className="mt-3 font-mono text-[0.6875rem] text-muted-foreground">{token.name}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        bordered
        label="Reserved"
        heading="Slots awaiting content"
        description="Section anchors are wired into the navigation and scroll spy. Each will be filled in a later pass using this exact template."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {RESERVED.map((slot) => (
            <div
              key={slot.id}
              id={slot.id}
              className="scroll-mt-24 rounded-2xl border border-dashed border-border-strong bg-surface/30 p-6"
            >
              <SectionLabel>{slot.label}</SectionLabel>
              <p className="mt-4 text-sm text-muted-foreground">{slot.note}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
