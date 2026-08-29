/**
 * Credential data model for the Credential Registry section.
 *
 * Adding a credential = adding one object to CREDENTIALS.
 * No UI change should ever be required.
 */

export type CredentialCategory = "cloud" | "devops" | "ai" | "software" | "other";

export type CredentialType =
  | "Professional Certification"
  | "Training Badge"
  | "Course Certificate"
  | "Learning Program"
  | "Job Simulation"
  | "Other";

export type CredentialStatus = "verified" | "completed" | "in-progress";

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  type: CredentialType;
  category: CredentialCategory;
  /** Human readable completion date, e.g. "June 2025". */
  date: string;
  /** Numeric year used for sorting. */
  year: number;
  description?: string;
  /** Badge / certificate image URL (lazy loaded). */
  image?: string;
  /** Certificate document (PDF) URL. */
  document?: string;
  /** Public verification URL, when the issuer provides one. */
  verificationUrl?: string;
  featured?: boolean;
  status: CredentialStatus;
}

export const CREDENTIAL_CATEGORIES: { id: "all" | CredentialCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "cloud", label: "Cloud" },
  { id: "devops", label: "DevOps" },
  { id: "ai", label: "AI" },
  { id: "software", label: "Software" },
  { id: "other", label: "Other" },
];

/**
 * PHASE 1 — placeholder records only.
 * These are explicitly labelled as placeholders and contain no real
 * organisations, dates or achievements. Replace one at a time.
 */
export const CREDENTIALS: Credential[] = [
  {
    id: "placeholder-featured",
    title: "Placeholder credential — featured slot",
    issuer: "Placeholder issuer",
    type: "Professional Certification",
    category: "cloud",
    date: "Date pending",
    year: 4,
    description:
      "Reserved slot for the primary credential. Title, issuer, date, document and verification link will be supplied later.",
    featured: true,
    status: "completed",
  },
  {
    id: "placeholder-devops",
    title: "Placeholder credential — DevOps track",
    issuer: "Placeholder issuer",
    type: "Training Badge",
    category: "devops",
    date: "Date pending",
    year: 3,
    description: "Reserved registry slot for a delivery / automation credential.",
    status: "completed",
  },
  {
    id: "placeholder-cloud",
    title: "Placeholder credential — Cloud track",
    issuer: "Placeholder issuer",
    type: "Course Certificate",
    category: "cloud",
    date: "Date pending",
    year: 3,
    description: "Reserved registry slot for a cloud infrastructure credential.",
    status: "completed",
  },
  {
    id: "placeholder-ai",
    title: "Placeholder credential — AI track",
    issuer: "Placeholder issuer",
    type: "Learning Program",
    category: "ai",
    date: "Date pending",
    year: 2,
    description: "Reserved registry slot for an AI-assisted engineering credential.",
    status: "in-progress",
  },
  {
    id: "placeholder-software",
    title: "Placeholder credential — Software track",
    issuer: "Placeholder issuer",
    type: "Job Simulation",
    category: "software",
    date: "Date pending",
    year: 2,
    description: "Reserved registry slot for a software engineering credential.",
    status: "completed",
  },
  {
    id: "placeholder-other",
    title: "Placeholder credential — Other",
    issuer: "Placeholder issuer",
    type: "Other",
    category: "other",
    date: "Date pending",
    year: 1,
    description: "Reserved registry slot for any additional professional learning record.",
    status: "completed",
  },
];

export function getFeaturedCredential(list: Credential[] = CREDENTIALS): Credential | undefined {
  return list.find((c) => c.featured) ?? list[0];
}

export function sortByDateDesc(list: Credential[]): Credential[] {
  return [...list].sort((a, b) => b.year - a.year);
}

export function filterByCategory(
  list: Credential[],
  category: "all" | CredentialCategory,
): Credential[] {
  return category === "all" ? list : list.filter((c) => c.category === category);
}

export function categoryLabel(category: CredentialCategory): string {
  return CREDENTIAL_CATEGORIES.find((c) => c.id === category)?.label ?? "Other";
}
