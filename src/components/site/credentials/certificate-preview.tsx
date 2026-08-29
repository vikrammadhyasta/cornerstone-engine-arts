import { FileText, ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Credential } from "@/lib/credentials";

/**
 * Scrollable document/certificate viewer. Renders the credential image at a
 * readable width (aspect ratio preserved) inside a fixed-height viewport that
 * scrolls vertically, rather than shrinking the whole document to fit.
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
        "relative w-full overflow-hidden rounded-xl border border-border bg-background/50",
        className,
      )}
    >
      {hasImage ? (
        <div
          className={cn(
            "certificate-viewer max-h-[42vh] overflow-y-auto overscroll-contain p-4 sm:max-h-[60vh]",
            ratio,
          )}
        >
          <img
            src={credential.image}
            alt={`${credential.title} — ${credential.issuer}`}
            loading="lazy"
            decoding="async"
            className="mx-auto h-auto w-full max-w-2xl"
          />
        </div>
      ) : (
        <div className="flex min-h-[12rem] w-full flex-col items-center justify-center gap-3 px-4 text-center">
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
