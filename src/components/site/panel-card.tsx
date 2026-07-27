import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * The single reusable premium card. Used for projects, skills,
 * certifications, experience and metrics.
 */
interface PanelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export function PanelCard({ className, interactive = true, children, ...props }: PanelCardProps) {
  return (
    <div
      className={cn(
        "group relative isolate overflow-hidden rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur-sm md:p-8",
        interactive && "hover-lift",
        className,
      )}
      {...props}
    >
      {/* top hairline highlight */}
      <span
        aria-hidden
        className="absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      {children}
    </div>
  );
}

export function CardEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-primary uppercase">{children}</p>
  );
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn("text-lg font-semibold text-foreground", className)}>{children}</h3>;
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-sm leading-relaxed text-muted-foreground", className)}>{children}</p>
  );
}
