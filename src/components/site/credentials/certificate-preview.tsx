import { FileText, ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Credential } from "@/lib/credentials";

/**
 * Renders a credential's badge/certificate when available, otherwise a
 * restrained technical placeholder. Images are lazy-loaded.
 */
export function CertificatePreview({
  credential,
  className,
  ratio,
}: {
  credential: Credential;
  className?: string;
  ratio?: string;
}) {
  const hasImage = Boolean(credential.image);

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-background/50",
        ratio,
        !ratio && "min-h-[12rem]",
        className,
      )}
    >
      {hasImage ? (
        <img
          src={credential.image}
          alt={`${credential.title} — ${credential.issuer}`}
          loading="lazy"
          decoding="async"
          className="max-h-full max-w-full object-contain p-4"
        />
      ) : (
        <div className="flex h-full min-h-[12rem] w-full flex-col items-center justify-center gap-3 px-4 text-center">
          <span
            aria-hidden
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface/60 text-primary"
          >
            {credential.document ? (
              <FileText className="h-4 w-4" />
            ) : (
              <ImageIcon className="h-4 w-4" />
            )}
          </span>
          <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
            Preview pending
          </p>
        </div>
      )}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-primary/10 ring-inset"
      />
    </div>
  );
}
