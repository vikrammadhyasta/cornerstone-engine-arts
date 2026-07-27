import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Section template used by every page section:
 * small label -> large heading -> supporting description -> content.
 */
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  label?: string;
  heading?: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  bordered?: boolean;
}

export function Section({
  label,
  heading,
  description,
  align = "left",
  bordered = false,
  className,
  children,
  ...props
}: SectionProps) {
  const centered = align === "center";
  return (
    <section className={cn("section-y", bordered && "hairline-top", className)} {...props}>
      <div className="container-page">
        {(label || heading || description) && (
          <header
            className={cn(
              "flex max-w-3xl flex-col gap-5 animate-reveal",
              centered && "mx-auto items-center text-center",
            )}
          >
            {label && <SectionLabel>{label}</SectionLabel>}
            {heading && (
              <h2 className="text-gradient-heading text-3xl leading-[1.1] font-semibold sm:text-4xl lg:text-5xl">
                {heading}
              </h2>
            )}
            {description && (
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {description}
              </p>
            )}
          </header>
        )}
        {children && (
          <div className={cn("animate-reveal", (label || heading || description) && "mt-12 md:mt-16")}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase backdrop-blur-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </span>
  );
}
