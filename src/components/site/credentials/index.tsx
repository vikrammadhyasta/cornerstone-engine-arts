import * as React from "react";

import { Section } from "@/components/site/section";
import {
  CREDENTIALS,
  CREDENTIAL_CATEGORIES,
  filterByCategory,
  getFeaturedCredential,
  sortByDateDesc,
  type Credential,
} from "@/lib/credentials";
import { CredentialCard } from "./credential-card";
import { CredentialDialog } from "./credential-dialog";
import { CredentialFilters, type FilterValue } from "./credential-filters";
import { FeaturedCredential } from "./featured-credential";

/**
 * Credential Registry — featured credential + filterable compact registry.
 * All content comes from src/lib/credentials.ts.
 */
export function CredentialsRegistry() {
  const [filter, setFilter] = React.useState<FilterValue>("all");
  const [active, setActive] = React.useState<Credential | null>(null);
  const [open, setOpen] = React.useState(false);

  const featured = React.useMemo(() => getFeaturedCredential(CREDENTIALS), []);
  const rest = React.useMemo(
    () => sortByDateDesc(CREDENTIALS.filter((c) => c.id !== featured?.id)),
    [featured],
  );
  const visible = React.useMemo(() => filterByCategory(rest, filter), [rest, filter]);

  const counts = React.useMemo(() => {
    const map: Record<string, number> = {};
    for (const { id } of CREDENTIAL_CATEGORIES) {
      map[id] = filterByCategory(rest, id).length;
    }
    return map;
  }, [rest]);

  const openCredential = React.useCallback((credential: Credential) => {
    setActive(credential);
    setOpen(true);
  }, []);

  return (
    <Section
      bordered
      id="credentials"
      className="scroll-mt-24"
      label="CREDENTIALS"
      heading="Credentials that support the engineering."
      description="A record of technical training, professional learning, and hands-on programs across cloud, DevOps, AI, and software engineering."
    >
      {featured && <FeaturedCredential credential={featured} onOpen={openCredential} />}

      <div className="mt-10 flex flex-col gap-4 border-t border-border pt-8 md:mt-12 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
          Credential registry · {visible.length} record{visible.length === 1 ? "" : "s"}
        </p>
        <CredentialFilters value={filter} onChange={setFilter} counts={counts} />
      </div>

      {visible.length > 0 ? (
        <ul className="mt-6 grid list-none gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((credential) => (
            <li key={credential.id} className="h-full">
              <CredentialCard credential={credential} onOpen={openCredential} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 rounded-2xl border border-dashed border-border-strong bg-surface/30 p-6 text-sm text-muted-foreground">
          No credentials recorded in this category yet.
        </p>
      )}

      <CredentialDialog credential={active} open={open} onOpenChange={setOpen} />
    </Section>
  );
}
