import { ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { categoryLabel, type Credential } from "@/lib/credentials";
import { CertificatePreview } from "./certificate-preview";
import { VerificationIndicator } from "./credential-meta";

export function CredentialDialog({
  credential,
  open,
  onOpenChange,
}: {
  credential: Credential | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-[min(48rem,95vw)] overflow-y-auto border-border bg-surface/95 backdrop-blur-md">
        {credential && (
          <>
            <DialogHeader>
              <DialogTitle className="text-base text-balance">{credential.title}</DialogTitle>
              <DialogDescription>
                {credential.issuer} · {credential.date}
              </DialogDescription>
            </DialogHeader>

            <CertificatePreview credential={credential} className="bg-surface/60" />

            <dl className="grid gap-3 font-mono text-xs text-muted-foreground sm:grid-cols-2">
              <div className="flex justify-between gap-2 sm:block">
                <dt className="uppercase">Type</dt>
                <dd className="text-foreground sm:mt-1">{credential.type}</dd>
              </div>
              <div className="flex justify-between gap-2 sm:block">
                <dt className="uppercase">Category</dt>
                <dd className="text-foreground sm:mt-1">{categoryLabel(credential.category)}</dd>
              </div>
              <div className="flex justify-between gap-2 sm:block">
                <dt className="uppercase">Date</dt>
                <dd className="text-foreground sm:mt-1">{credential.date}</dd>
              </div>
              <div className="flex justify-between gap-2 sm:block">
                <dt className="uppercase">Status</dt>
                <dd className="sm:mt-1">
                  <VerificationIndicator credential={credential} />
                </dd>
              </div>
            </dl>

            {credential.description && (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {credential.description}
              </p>
            )}

            {credential.verificationUrl && (
              <div className="flex flex-wrap justify-end gap-2">
                <Button asChild size="sm">
                  <a href={credential.verificationUrl} target="_blank" rel="noreferrer noopener">
                    Verify credential
                    <ShieldCheck />
                  </a>
                </Button>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
