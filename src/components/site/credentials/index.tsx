import * as React from "react";

import { Section } from "@/components/site/section";
import {
  CREDENTIALS,
  CREDENTIAL_CATEGORIES,
  filterByCategory,
  sortByDateDesc,
  type Credential,
} from "@/lib/credentials";
import { CredentialCard } from "./credential-card";
import { CredentialDialog } from "./credential-dialog";
import { CredentialFilters, type FilterValue } from "./credential-filters";

/**
 * Credential Registry — filterable compact registry.
 * All content comes from src/lib/credentials.ts.
 */
export function CredentialsRegistry() {
  const [filter, setFilter] = React.useState<FilterValue>("all");
  const [active, setActive] = React.useState<Credential | null>(null);
  const [open, setOpen] = React.useState(false);

  const all = React.useMemo(() => sortByDateDesc(CREDENTIALS), []);
  const visible = React.useMemo(() => filterByCategory(all, filter), [all, filter]);

  const counts = React.useMemo(() => {
    const map: Record<string, number> = {};
    for (const { id } of CREDENTIAL_CATEGORIES) {
      map[id] = filterByCategory(all, id).length;
    }
    return map;
  }, [all]);

  const openCredential = React.useCallback((credential: Credential) => {
    setActive(credential);
    setOpen(true);
  }, []);

  return (
    <Section
      bordered
      id="credentials"
      label="CREDENTIALS"
      heading="Credentials that support the engineering."
      description="A record of cloud, AI, and software engineering credentials earned through structured training and hands-on learning."
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
