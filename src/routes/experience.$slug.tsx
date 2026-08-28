import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Building2, CalendarRange } from "lucide-react";

import { Section, SectionLabel } from "@/components/site/section";
import { PanelCard, CardEyebrow, CardBody } from "@/components/site/panel-card";
import { CertificateViewer } from "@/components/site/experience/certificate-viewer";
import { Button } from "@/components/ui/button";
import { EXPERIENCES, getExperience } from "@/lib/experience";

export const Route = createFileRoute("/experience/$slug")({
  loader: ({ params }) => {
    const experience = getExperience(params.slug);
    if (!experience) throw notFound();
    return { experience };
  },
  head: ({ params }) => {
    const experience = getExperience(params.slug);
    const title = experience
      ? `${experience.role} · ${experience.company} | Vikram Madhyasta`
      : "Experience unavailable | Vikram Madhyasta";
    const description = experience
      ? experience.description
      : "This experience entry is unavailable.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(experience ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  notFoundComponent: ExperienceNotFound,
  component: ExperienceDetail,
});

function ExperienceNotFound() {
  return (
    <Section
      label="Experience"
      heading="That experience does not exist."
      description="The entry you are looking for is not part of this portfolio."
    >
      <Button asChild size="sm" variant="secondary">
        <Link to="/" hash="experience">
          <ArrowLeft />
          Back to experience
        </Link>
      </Button>
    </Section>
  );
}

function ExperienceDetail() {
  const { experience } = Route.useLoaderData();

  return (
    <div>
      <Section className="pb-0" label={`${experience.kind} experience`}>
        <div className="flex flex-col gap-8">
          <Button asChild size="sm" variant="ghost" className="w-fit">
            <Link to="/" hash="experience">
              <ArrowLeft />
              Back to experience
            </Link>
          </Button>

          <header className="flex max-w-3xl flex-col gap-5">
            <h1 className="text-gradient-heading text-3xl leading-[1.1] font-semibold sm:text-4xl lg:text-5xl">
              {experience.role}
            </h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
              <span className="flex items-center gap-2">
                <Building2 className="h-3.5 w-3.5 text-primary" aria-hidden />
                {experience.company}
              </span>
              <span className="flex items-center gap-2">
                <CalendarRange className="h-3.5 w-3.5 text-primary" aria-hidden />
                {experience.period}
              </span>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {experience.description}
            </p>
          </header>
        </div>
      </Section>

      <Section
        bordered
        label="What I worked on"
        heading="Hands-on training scope"
        description="The practical work completed during the training period."
      >
        <ul className="grid list-none gap-4 md:grid-cols-2">
          {experience.contributions.map((item, i) => (
            <li key={item}>
              <PanelCard interactive={false} className="h-full p-6">
                <CardEyebrow>{String(i + 1).padStart(2, "0")}</CardEyebrow>
                <CardBody className="mt-3">{item}</CardBody>
              </PanelCard>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        bordered
        label="Technology stack"
        heading="Tools and platforms worked with"
      >
        <ul className="grid list-none grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {experience.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-xl border border-border bg-surface/50 px-4 py-3 font-mono text-xs text-foreground backdrop-blur-sm"
            >
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary align-middle" />
              {tech}
            </li>
          ))}
        </ul>
      </Section>

      <Section bordered label="Engineering focus" heading="Where the work concentrated">
        <ul className="grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {experience.focus.map((area) => (
            <li key={area.title}>
              <PanelCard className="h-full p-6">
                <p className="text-sm font-semibold text-foreground">{area.title}</p>
                <p className="mt-2 font-mono text-[0.6875rem] tracking-[0.12em] text-muted-foreground uppercase">
                  {area.note}
                </p>
              </PanelCard>
            </li>
          ))}
        </ul>
      </Section>

      {experience.certificate && (
        <Section bordered label="Certificate" heading="Certificate of achievement">
          <CertificateViewer certificate={experience.certificate} />
        </Section>
      )}

      <Section
        bordered
        label="Engineering lessons"
        heading="Takeaways"
        description="Reserved for engineering takeaways from this training period."
      >
        {experience.lessons.length > 0 ? (
          <ul className="grid list-none gap-4 md:grid-cols-2">
            {experience.lessons.map((lesson) => (
              <li key={lesson.title}>
                <PanelCard className="h-full p-6">
                  <p className="text-sm font-semibold text-foreground">{lesson.title}</p>
                  <CardBody className="mt-2">{lesson.body}</CardBody>
                </PanelCard>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl border border-dashed border-border-strong bg-surface/30 p-6">
            <SectionLabel>Placeholder</SectionLabel>
            <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
              Engineering takeaways for this experience will be added here.
            </p>
          </div>
        )}
      </Section>

      {EXPERIENCES.length > 1 && (
        <Section bordered label="More experience" heading="Other engagements">
          <ul className="grid list-none gap-4 md:grid-cols-2">
            {EXPERIENCES.filter((e) => e.slug !== experience.slug).map((e) => (
              <li key={e.slug}>
                <PanelCard className="h-full p-6">
                  <p className="text-sm font-semibold text-foreground">{e.company}</p>
                  <CardBody className="mt-2">{e.role}</CardBody>
                  <Button asChild size="sm" variant="secondary" className="mt-4">
                    <Link to="/experience/$slug" params={{ slug: e.slug }}>
                      View experience
                    </Link>
                  </Button>
                </PanelCard>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}
