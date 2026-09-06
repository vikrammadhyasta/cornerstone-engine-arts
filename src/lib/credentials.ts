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
  { id: "ai", label: "AI" },
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
    image: "/credentials/aws-cloud-architecting.png",
    document: "/credentials/aws-cloud-architecting.pdf",
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
    image: "/credentials/aws-cloud-operations.png",
    document: "/credentials/aws-cloud-operations.pdf",
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
    image: "/credentials/aws-cloud-foundations.png",
    document: "/credentials/aws-cloud-foundations.pdf",
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
    image: "/credentials/aws-cloud-security-foundations.png",
    document: "/credentials/aws-cloud-security-foundations.pdf",
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
    image: "/credentials/aws-cloud-practitioner-essentials.png",
    document: "/credentials/aws-cloud-practitioner-essentials.pdf",
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
    image: "/credentials/azure-cloud-services.png",
    document: "/credentials/azure-cloud-services.pdf",
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
    image: "/credentials/aws-ai-ml-solutions.png",
    document: "/credentials/aws-ai-ml-solutions.pdf",
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
    image: "/credentials/ai-fluency.png",
    document: "/credentials/ai-fluency.pdf",
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
    image: "/credentials/genai-data-analytics.png",
    document: "/credentials/genai-data-analytics.pdf",
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