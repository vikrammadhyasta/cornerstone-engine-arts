import * as React from "react";

import { Section } from "@/components/site/section";
import { PanelCard } from "@/components/site/panel-card";

interface EducationRecord {
  degree: string;
  specialization: string;
  cgpa: string;
  institution: string;
  university: string;
  duration: string;
}

const EDUCATION: EducationRecord[] = [
  {
    degree: "Master of Engineering (M.Eng)",
    specialization: "Specialization in Cloud Computing",
    cgpa: "8.28 / 10.0",
    institution: "Manipal School of Information Sciences (MSIS)",
    university: "Manipal Academy of Higher Education (MAHE), Manipal",
    duration: "07/2025 – Present",
  },
  {
    degree: "Bachelor of Engineering (B.Eng)",
    specialization: "Computer and Design Engineering",
    cgpa: "7.13 / 10.0",
    institution: "Dayananda Sagar Academy of Technology and Management",
    university: "Visvesvaraya Technological University, Belagavi",
    duration: "01/2021 – 06/2025",
  },
];

/**
 * Academic Foundation — compact education registry.
 * Two premium cards using the existing dark elevated card system.
 */
export function AcademicFoundation() {
  return (
    <Section
      bordered
      id="education"
      className="scroll-mt-24"
      heading="Academic Foundation"
    >
      <ul className="grid list-none gap-6 md:grid-cols-2">
        {EDUCATION.map((record) => (
          <li key={record.degree} className="h-full">
            <PanelCard className="relative h-full p-6 md:p-8">
              {/* subtle ambient glow on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at 50% 0%, color-mix(in oklab, var(--color-primary) 10%, transparent), transparent 55%)",
                }}
              />

              <div className="relative flex h-full flex-col gap-6">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                      {record.degree}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-primary">
                      {record.specialization}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-md border border-border-strong bg-surface/80 px-2.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.08em] text-primary">
                    CGPA: {record.cgpa}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-base font-medium text-foreground/90">
                    {record.institution}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {record.university}
                  </p>
                </div>

                <p className="mt-auto font-mono text-[0.6875rem] tracking-[0.12em] text-muted-foreground uppercase">
                  {record.duration}
                </p>
              </div>
            </PanelCard>
          </li>
        ))}
      </ul>
    </Section>
  );
}
