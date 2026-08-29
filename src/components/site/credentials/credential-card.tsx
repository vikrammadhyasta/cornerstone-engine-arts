import { ArrowUpRight } from "lucide-react";

import { PanelCard } from "@/components/site/panel-card";
import { categoryLabel, type Credential } from "@/lib/credentials";
import { MicroLabel, VerificationIndicator } from "./credential-meta";

export function CredentialCard({
  credential,
  onOpen,
}: {
  credential: Credential;
  onOpen: (credential: Credential) => void;
}) {
  return (
    <PanelCard className="flex h-full flex-col p-5 md:p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-primary uppercase">
          {credential.issuer}
        </p>
        <MicroLabel>{categoryLabel(credential.category)}</MicroLabel>
      </div>

      <h3 className="mt-3 text-base leading-snug font-semibold text-balance text-foreground">
        {credential.title}
      </h3>

      <dl className="mt-4 space-y-2 font-mono text-[0.6875rem] text-muted-foreground">
        <div className="flex flex-wrap justify-between gap-2">
          <dt>Type</dt>
          <dd className="text-foreground">{credential.type}</dd>
        </div>
        <div className="flex flex-wrap justify-between gap-2">
          <dt>Completed</dt>
          <dd className="text-foreground">{credential.date}</dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-2 sm:mt-auto">
        <VerificationIndicator credential={credential} />
        <button
          type="button"
          onClick={() => onOpen(credential)}
          className="inline-flex items-center gap-1 rounded-md font-mono text-[0.6875rem] tracking-[0.12em] text-foreground uppercase transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          View credential
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          <span className="sr-only">: {credential.title}</span>
        </button>
      </div>
    </PanelCard>
  );
}
