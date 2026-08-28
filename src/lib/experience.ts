import certificateImage from "@/assets/certificates/rooman-certificate.jpg.asset.json";
import certificateFile from "@/assets/certificates/rooman-certificate.pdf.asset.json";

export type ExperienceCertificate = {
  title: string;
  issuer: string;
  period: string;
  date: string;
  /** Rendered preview (image) shown inline and in the lightbox. */
  previewUrl: string;
  /** Original document (PDF) opened in a new tab. */
  fileUrl: string;
  previewAlt: string;
};

export type Experience = {
  slug: string;
  company: string;
  role: string;
  /** Explicitly a training engagement — never labelled as employment. */
  kind: string;
  period: string;
  description: string;
  technologies: string[];
  contributions: string[];
  focus: { title: string; note: string }[];
  certificate?: ExperienceCertificate;
  /** Engineering takeaways — intentionally empty until provided. */
  lessons: { title: string; body: string }[];
};

export const EXPERIENCES: Experience[] = [
  {
    slug: "rooman-cloud-application-developer",
    company: "Rooman Technologies Pvt. Ltd.",
    role: "Cloud Application Developer Trainee",
    kind: "Training",
    period: "September 2024 – February 2025",
    description:
      "Completed hands-on training in cloud application development and DevOps, with practical exposure to cloud infrastructure, containerization, deployment automation, and modern application delivery workflows.",
    technologies: [
      "AWS",
      "Linux",
      "Networking",
      "Docker",
      "Kubernetes",
      "Infrastructure as Code",
      "CI/CD",
      "Cloud Automation",
    ],
    contributions: [
      "Completed hands-on training in AWS cloud services, Linux, networking, Docker, Kubernetes, and Infrastructure as Code fundamentals.",
      "Built and deployed cloud-native applications while working with containerization, CI/CD concepts, and cloud automation.",
      "Gained practical experience with cloud infrastructure provisioning, application deployment, and DevOps workflows through project-based learning.",
      "Collaborated on technical assignments involving troubleshooting, system configuration, and deployment automation.",
    ],
    focus: [
      { title: "Cloud Infrastructure", note: "AWS services · Linux · networking" },
      { title: "Containerization", note: "Docker · Kubernetes fundamentals" },
      { title: "Application Deployment", note: "Cloud-native application delivery" },
      { title: "DevOps Automation", note: "CI/CD concepts · cloud automation" },
      { title: "Troubleshooting", note: "Diagnosing deployment and runtime issues" },
      { title: "System Configuration", note: "Environment and service configuration" },
    ],
    certificate: {
      title: "Cloud Application Developer — Certificate of Achievement",
      issuer: "Rooman Technologies Pvt. Ltd.",
      period: "September 2024 – February 2025",
      date: "10 June 2025",
      previewUrl: certificateImage.url,
      fileUrl: certificateFile.url,
      previewAlt:
        "Certificate of Achievement for Cloud Application Developer training issued by Rooman Technologies Pvt. Ltd.",
    },
    lessons: [],
  },
];

export function getExperience(slug: string): Experience | undefined {
  return EXPERIENCES.find((experience) => experience.slug === slug);
}
