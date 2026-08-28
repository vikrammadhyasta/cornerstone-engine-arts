import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Building2, CalendarRange } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/section";
import { PanelCard, CardBody, CardTitle } from "@/components/site/panel-card";
import { EXPERIENCES } from "@/lib/experience";

export function ExperienceShowcase() {
  return (
    <Section
      bordered
      id="experience"
      className="scroll-mt-24"
      label="03 · Experience"
      heading="Engineering experience beyond personal projects."
      description="Hands-on experience building, deploying, troubleshooting, and automating cloud-native systems."
    >
      <ul
        className={
          EXPERIENCES.length > 1 ? "grid list-none gap-6 lg:grid-cols-2" : "grid list-none gap-6"
        }
      >
        {EXPERIENCES.map((experience) => (
          <li key={experience.slug} className="h-full">
            <PanelCard className="h-full p-6 md:p-8">
              <span
                aria-hidden
                className="pointer-events-none absolute top-6 right-6 h-16 w-16 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-primary)_28%,transparent),transparent_70%)] opacity-50 transition-opacity duration-500 group-hover:opacity-90"
              />
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
                <div>
                  <p className="flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.16em] text-primary uppercase">
                    <Building2 className="h-3.5 w-3.5" aria-hidden />
                    {experience.kind}
                  </p>

                  <CardTitle className="mt-4 text-balance">{experience.company}</CardTitle>
                  <p className="mt-1 text-sm font-medium text-foreground/90">{experience.role}</p>

                  <p className="mt-3 flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.12em] text-muted-foreground uppercase">
                    <CalendarRange className="h-3.5 w-3.5" aria-hidden />
                    {experience.period}
                  </p>

                  <CardBody className="mt-4 max-w-prose">{experience.description}</CardBody>

                  <div className="mt-6">
                    <Button asChild size="sm">
                      <Link to="/experience/$slug" params={{ slug: experience.slug }}>
                        View experience
                        <ArrowUpRight />
                        <span className="sr-only"> at {experience.company}</span>
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="lg:border-l lg:border-border lg:pl-10">
                  <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
                    Technologies
                  </p>
                  <ul className="mt-4 flex list-none flex-wrap gap-1.5">
                    {experience.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md border border-border bg-surface/60 px-2 py-1 font-mono text-[0.6875rem] text-muted-foreground"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </PanelCard>

          </li>
        ))}
      </ul>
    </Section>
  );
}
