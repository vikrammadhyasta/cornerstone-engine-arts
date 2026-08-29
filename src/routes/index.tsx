import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "@/components/site/hero";
import { EngineeringIdentity } from "@/components/site/engineering-identity";
import { AcademicFoundation } from "@/components/site/academic-foundation";
import { ProjectsShowcase } from "@/components/site/projects-showcase";
import { ExperienceShowcase } from "@/components/site/experience-showcase";
import { EngineeringControlPlane } from "@/components/site/control-plane";
import { CredentialsRegistry } from "@/components/site/credentials";
import { Contact } from "@/components/site/contact";
import { SiteFooter } from "@/components/site/site-footer";



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




function Index() {
  return (
    <div id="top">
      <Hero />
      <EngineeringIdentity />
      <ExperienceShowcase />
      <EngineeringControlPlane />
      <ProjectsShowcase />
      <CredentialsRegistry />
      <AcademicFoundation />
      <Contact />
      <SiteFooter />
    </div>
  );
}
