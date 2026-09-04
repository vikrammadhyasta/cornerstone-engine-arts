import type { CSSProperties } from "react";
import { ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CloudOpsCenter } from "@/components/site/cloud-ops-center";
import { HeroAura } from "@/components/site/hero-aura";

const SOCIAL_LINKS = [
  { href: "https://github.com/vikrammadhyasta", label: "GitHub", icon: Github, external: true },
  { href: "https://www.linkedin.com/in/vikram-madhyasta", label: "LinkedIn", icon: Linkedin, external: true },
  { href: "mailto:vikrammadyasta@gmail.com", label: "Email", icon: Mail, external: false },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 lg:min-h-[780px] lg:pt-32 lg:pb-24"
    >
      <HeroAura />
      <div className="container-page relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <div className="flex flex-col gap-6">
            <span style={{ "--boot-delay": "620ms" } as CSSProperties} className="boot-item inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase backdrop-blur-sm sm:text-[0.6875rem] sm:tracking-[0.18em]">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-70 animate-node-pulse motion-reduce:animate-none" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              <span className="min-w-0">Open to Cloud • DevOps • Platform roles</span>
            </span>

            <h1 style={{ "--boot-delay": "760ms" } as CSSProperties} className="boot-item text-gradient-heading font-display text-[2rem] leading-[1.1] font-semibold text-balance sm:text-[2.5rem] lg:text-5xl xl:text-[3.25rem] xl:leading-[1.08]">
              I build software and systems{" "}
              <span className="bg-linear-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                that work reliably.
              </span>
            </h1>

            <p style={{ "--boot-delay": "880ms" } as CSSProperties} className="boot-item max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Hi, I’m Vikram Madhyasta, a Cloud & DevOps Engineer pursuing a Master of Engineering in Cloud Computing. I’m focused on building reliable cloud systems, automating software delivery, and turning infrastructure into reproducible, maintainable engineering workflows.
            </p>

            <div style={{ "--boot-delay": "1000ms" } as CSSProperties} className="boot-item flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <Button size="lg" asChild className="h-12 w-full px-7 text-base sm:w-auto">
                <a href="#projects">
                  Explore Projects
                  <ArrowUpRight />
                </a>
              </Button>
              <Button size="lg" variant="ghost" asChild className="h-11 w-full px-5 sm:h-12 sm:w-auto">
                <a href="/resume.pdf" download>
                  <Download />
                  Download Resume
                </a>
              </Button>
            </div>

            <div style={{ "--boot-delay": "1080ms" } as CSSProperties} className="boot-item flex items-center gap-1">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex rounded-full p-2.5 text-muted-foreground transition-colors hover:bg-surface/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Icon size={20} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div style={{ "--boot-delay": "900ms" } as CSSProperties} className="boot-item order-last">
            <CloudOpsCenter />
          </div>
        </div>
      </div>

      <div aria-hidden className="container-page mt-12 md:mt-16">
        <div className="h-px w-full bg-linear-to-r from-transparent via-border-strong to-transparent" />
      </div>
    </section>
  );
}
