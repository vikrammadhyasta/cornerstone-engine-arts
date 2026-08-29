import { BadgeCheck, CircleDot, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Credential } from "@/lib/credentials";

/** Small technical micro-label used across the registry. */
export function MicroLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded-md border border-border bg-surface/60 px-2 py-1 font-mono text-[0.6875rem] tracking-[0.08em] text-muted-foreground uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Verification / completion state indicator. */
export function VerificationIndicator({ credential }: { credential: Credential }) {
  if (credential.verificationUrl) {
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-[0.08em] text-primary uppercase">
        <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
        Verifiable
      </span>
    );
  }
  if (credential.status === "in-progress") {
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-[0.08em] text-muted-foreground uppercase">
        <CircleDot className="h-3.5 w-3.5" aria-hidden />
        In progress
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-[0.08em] text-muted-foreground uppercase">
      <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
      Completed
    </span>
  );
}
