import { Maximize2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardEyebrow, PanelCard } from "@/components/site/panel-card";
import { categoryLabel, type Credential } from "@/lib/credentials";
import { CertificatePreview } from "./certificate-preview";
import { MicroLabel, VerificationIndicator } from "./credential-meta";

export function FeaturedCredential({
  credential,
  onOpen,
}: {
  credential: Credential;
  onOpen: (credential: Credential) => void;
}) {
  return (
    <PanelCard interactive={false} className="p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center">
        <div>
          <CardEyebrow>Featured credential</CardEyebrow>
          <p className="mt-4 font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase">
            {credential.issuer}
          </p>
          <h3 className="mt-2 text-xl leading-tight font-semibold text-balance text-foreground sm:text-2xl">
            {credential.title}
          </h3>
          {credential.description && (
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {credential.description}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <MicroLabel>{credential.type}</MicroLabel>
            <MicroLabel>{categoryLabel(credential.category)}</MicroLabel>
            <MicroLabel>{credential.date}</MicroLabel>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button size="sm" onClick={() => onOpen(credential)}>
              View credential
              <Maximize2 />
            </Button>
            <VerificationIndicator credential={credential} />
          </div>
        </div>

        <button
          type="button"
          onClick={() => onOpen(credential)}
          aria-label={`Open credential details: ${credential.title}`}
          className="group block w-full rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <CertificatePreview
            credential={credential}
            className="transition-colors duration-300 group-hover:border-primary/50"
            ratio="aspect-[16/10]"
          />
        </button>
      </div>
    </PanelCard>
  );
}
