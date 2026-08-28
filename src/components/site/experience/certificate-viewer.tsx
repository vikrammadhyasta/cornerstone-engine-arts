import * as React from "react";
import { ExternalLink, Maximize2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CardEyebrow, PanelCard } from "@/components/site/panel-card";
import type { ExperienceCertificate } from "@/lib/experience";

/**
 * Certificate preview with a keyboard-accessible lightbox.
 * The preview image is lazy-loaded; the original document opens in a new tab.
 */
export function CertificateViewer({ certificate }: { certificate: ExperienceCertificate }) {
  const [open, setOpen] = React.useState(false);

  return (
    <PanelCard interactive={false} className="p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center">
        <div>
          <CardEyebrow>Certificate</CardEyebrow>
          <h3 className="mt-4 text-lg font-semibold text-balance text-foreground">
            {certificate.title}
          </h3>
          <dl className="mt-5 space-y-3 font-mono text-xs text-muted-foreground">
            <div className="flex flex-wrap justify-between gap-2">
              <dt>Issuer</dt>
              <dd className="text-foreground">{certificate.issuer}</dd>
            </div>
            <div className="flex flex-wrap justify-between gap-2">
              <dt>Training period</dt>
              <dd className="text-foreground">{certificate.period}</dd>
            </div>
            <div className="flex flex-wrap justify-between gap-2">
              <dt>Certificate date</dt>
              <dd className="text-foreground">{certificate.date}</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  View certificate
                  <Maximize2 />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[min(64rem,95vw)] border-border bg-surface/95 backdrop-blur-md">
                <DialogHeader>
                  <DialogTitle className="text-base">{certificate.title}</DialogTitle>
                  <DialogDescription>
                    {certificate.issuer} · {certificate.date}
                  </DialogDescription>
                </DialogHeader>
                <div className="max-h-[70vh] overflow-auto rounded-xl border border-border bg-background/60 p-2">
                  <img
                    src={certificate.previewUrl}
                    alt={certificate.previewAlt}
                    className="h-auto w-full rounded-lg"
                  />
                </div>
                <div className="flex justify-end">
                  <Button asChild size="sm" variant="secondary">
                    <a href={certificate.fileUrl} target="_blank" rel="noreferrer noopener">
                      Open original
                      <ExternalLink />
                    </a>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button asChild size="sm" variant="secondary">
              <a href={certificate.fileUrl} target="_blank" rel="noreferrer noopener">
                Open PDF
                <ExternalLink />
              </a>
            </Button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Open full certificate: ${certificate.title}`}
          className="group relative block w-full overflow-hidden rounded-xl border border-border bg-background/50 p-2 transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <img
            src={certificate.previewUrl}
            alt={certificate.previewAlt}
            loading="lazy"
            decoding="async"
            width={1210}
            height={935}
            className="h-auto w-full rounded-lg opacity-90 transition-opacity duration-500 group-hover:opacity-100"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-primary/10 ring-inset"
          />
        </button>
      </div>
    </PanelCard>
  );
}
