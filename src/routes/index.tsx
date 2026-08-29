import { createFileRoute } from "@tanstack/react-router";

import { Section, SectionLabel } from "@/components/site/section";
import { Hero } from "@/components/site/hero";
import { EngineeringIdentity } from "@/components/site/engineering-identity";
import { ProjectsShowcase } from "@/components/site/projects-showcase";
import { ExperienceShowcase } from "@/components/site/experience-showcase";
import { EngineeringControlPlane } from "@/components/site/control-plane";
import { CredentialsRegistry } from "@/components/site/credentials";



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
      <EngineeringControlPlane />
      <ProjectsShowcase />



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
