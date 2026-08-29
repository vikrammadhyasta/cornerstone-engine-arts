/**
 * Credential data model for the Credential Registry section.
 *
 * Adding a credential = adding one object to CREDENTIALS.
 * No UI change should ever be required.
 */

import anthropicAiFluencyPdf from "@/assets/certificates/anthropic-ai-fluency.pdf.asset.json";
import anthropicAiFluencyPng from "@/assets/certificates/anthropic-ai-fluency.png.asset.json";
import forageGenaiDataAnalyticsPdf from "@/assets/certificates/forage-genai-data-analytics.pdf.asset.json";
import forageGenaiDataAnalyticsPng from "@/assets/certificates/forage-genai-data-analytics.png.asset.json";
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
  | "Certificate of Completion"
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

export const CREDENTIALS: Credential[] = [
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
    id: "coursera-aws-ai-ml-solutions",
    title: "Fundamentals of AWS AI and ML Solutions",
    issuer: "Whizlabs · Coursera",
    type: "Course Certificate",
    category: "ai",
    date: "March 2026",
    year: 2026,
    description:
      "An online course authorized by Whizlabs and offered through Coursera, covering fundamentals of AWS AI and machine learning solutions.",
    image: courseraAwsAiMlPng.url,
    document: courseraAwsAiMlPdf.url,
    verificationUrl: "https://coursera.org/verify/DDV1GHRJQMHA",
    status: "completed",
  },
  {
    id: "anthropic-ai-fluency",
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    type: "Certificate of Completion",
    category: "ai",
    date: "",
    year: 2026,
    description: "Certificate of completion for AI Fluency: Framework & Foundations by Anthropic.",
    image: anthropicAiFluencyPng.url,
    document: anthropicAiFluencyPdf.url,
    status: "completed",
  },
  {
    id: "forage-genai-data-analytics",
    title: "GenAI Powered Data Analytics Job Simulation",
    issuer: "Forage · Tata",
    type: "Job Simulation",
    category: "ai",
    date: "June 2025",
    year: 2025,
    description:
      "Completed practical tasks covering exploratory data analysis and risk profiling, predicting delinquency with AI, business reporting and data storytelling for collections strategy, and implementing an AI-driven collections strategy.",
    image: forageGenaiDataAnalyticsPng.url,
    document: forageGenaiDataAnalyticsPdf.url,
    status: "completed",
  },
];
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
