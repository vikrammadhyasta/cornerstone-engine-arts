/**
 * Credential data model for the Credential Registry section.
 *
 * Adding a credential = adding one object to CREDENTIALS.
 * No UI change should ever be required.
 */

import awsAcademyBadgePdf from "@/assets/certificates/aws-academy-cloud-architecting-badge.pdf.asset.json";
import awsAcademyBadgePng from "@/assets/certificates/aws-academy-cloud-architecting-badge.png.asset.json";
import awsCloudPractitionerEssentialsPdf from "@/assets/certificates/aws-cloud-practitioner-essentials.pdf.asset.json";
import awsCloudPractitionerEssentialsPng from "@/assets/certificates/aws-cloud-practitioner-essentials.png.asset.json";
import awsCloudFoundationsBadgePdf from "@/assets/certificates/aws-academy-cloud-foundations-badge.pdf.asset.json";
import awsCloudFoundationsBadgePng from "@/assets/certificates/aws-academy-cloud-foundations-badge.png.asset.json";
import awsCloudOperationsBadgePdf from "@/assets/certificates/aws-academy-cloud-operations-badge.pdf.asset.json";
import awsCloudOperationsBadgePng from "@/assets/certificates/aws-academy-cloud-operations-badge.png.asset.json";
import awsCloudSecurityFoundationsBadgePdf from "@/assets/certificates/aws-academy-cloud-security-foundations-badge.pdf.asset.json";
import awsCloudSecurityFoundationsBadgePng from "@/assets/certificates/aws-academy-cloud-security-foundations-badge.png.asset.json";
import courseraAwsAiMlPdf from "@/assets/certificates/coursera-aws-ai-ml.pdf.asset.json";
import courseraAwsAiMlPng from "@/assets/certificates/coursera-aws-ai-ml.png.asset.json";
import courseraAzurePdf from "@/assets/certificates/coursera-azure.pdf.asset.json";
import courseraAzurePng from "@/assets/certificates/coursera-azure.png.asset.json";

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
    id: "aws-academy-cloud-architecting",
    title: "AWS Academy Cloud Architecting",
    issuer: "AWS Academy",
    type: "Training Badge",
    category: "cloud",
    date: "January 2026",
    year: 2026,
    description:
      "AWS Academy Graduate — Cloud Architecting training badge covering the design of scalable, highly available, and fault-tolerant systems on AWS. 60 course hours completed.",
    image: awsAcademyBadgePng.url,
    document: awsAcademyBadgePdf.url,
    verificationUrl: "https://www.credly.com/go/LvxkKTch",
    status: "verified",
  },
  {
    id: "aws-academy-cloud-operations",
    title: "AWS Academy Graduate – Cloud Operations – Training Badge",
    issuer: "AWS Academy",
    type: "Training Badge",
    category: "cloud",
    date: "April 2026",
    year: 2026,
    description:
      "AWS Academy Graduate – Cloud Operations training badge covering AWS cloud operations and foundational operational practices. 40 course hours completed.",
    image: awsCloudOperationsBadgePng.url,
    document: awsCloudOperationsBadgePdf.url,
    verificationUrl: "https://www.credly.com/go/guhRkzqy",
    status: "completed",
  },
  {
    id: "aws-academy-cloud-foundations",
    title: "AWS Academy Graduate – Cloud Foundations – Training Badge",
    issuer: "AWS Academy",
    type: "Training Badge",
    category: "cloud",
    date: "January 2026",
    year: 2026,
    description:
      "AWS Academy Graduate – Cloud Foundations training badge covering foundational cloud concepts and AWS cloud fundamentals. 20 course hours completed.",
    image: awsCloudFoundationsBadgePng.url,
    document: awsCloudFoundationsBadgePdf.url,
    verificationUrl: "https://www.credly.com/go/oD60W14P",
    status: "completed",
  },
  {
    id: "aws-academy-cloud-security-foundations",
    title: "AWS Academy Graduate – Cloud Security Foundations – Training Badge",
    issuer: "AWS Academy",
    type: "Training Badge",
    category: "cloud",
    date: "May 2026",
    year: 2026,
    description:
      "AWS Academy Graduate – Cloud Security Foundations training badge covering foundational cloud security concepts. 20 course hours completed.",
    image: awsCloudSecurityFoundationsBadgePng.url,
    document: awsCloudSecurityFoundationsBadgePdf.url,
    verificationUrl: "https://www.credly.com/go/nq5DrYHU",
    status: "completed",
  },
  {
    id: "aws-cloud-practitioner-essentials",
    title: "AWS Cloud Practitioner Essentials",
    issuer: "AWS Training and Certification",
    type: "Course Certificate",
    category: "cloud",
    date: "January 2024",
    year: 2024,
    description:
      "Completed AWS Cloud Practitioner Essentials, covering foundational AWS cloud concepts, core services, security, architecture, pricing, and cloud fundamentals.",
    image: awsCloudPractitionerEssentialsPng.url,
    document: awsCloudPractitionerEssentialsPdf.url,
    status: "completed",
  },
  {
    id: "coursera-azure-cloud-services",
    title: "Introduction to Microsoft Azure Cloud Services",
    issuer: "Microsoft · Coursera",
    type: "Course Certificate",
    category: "cloud",
    date: "October 2025",
    year: 2025,
    description:
      "An online course authorized by Microsoft and delivered through Coursera covering foundational Microsoft Azure cloud services.",
    image: courseraAzurePng.url,
    document: courseraAzurePdf.url,
    verificationUrl: "https://coursera.org/verify/ULFLM8H71L2A",
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
