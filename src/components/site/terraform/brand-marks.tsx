import * as React from "react";

/**
 * Recognizable, brand-coloured marks for the tools and AWS services used by the
 * Terraform AWS infrastructure project. Decorative only — every usage is paired
 * with a visible text label, so each mark is aria-hidden.
 */
type MarkProps = React.SVGProps<SVGSVGElement>;

const base = (props: MarkProps) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  "aria-hidden": true,
  focusable: false,
  ...props,
});

/** HashiCorp Terraform — purple stacked blocks. */
export function TerraformBrandMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <path d="M9.1 6.2 14 9v5.6l-4.9-2.8V6.2Z" fill="#7B42BC" />
      <path d="M14.6 9.3 19.5 6.5v5.6l-4.9 2.8V9.3Z" fill="#7B42BC" opacity="0.6" />
      <path d="M3.6 2.6 8.5 5.4V11L3.6 8.2V2.6Z" fill="#7B42BC" opacity="0.8" />
      <path d="M9.1 15.1 14 17.9v5.5l-4.9-2.8v-5.5Z" fill="#7B42BC" opacity="0.45" />
    </svg>
  );
}

/** Amazon Web Services — orange smile wordmark abstraction. */
export function AwsBrandMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M5.4 10.6c0-1 .7-1.6 1.9-1.6.5 0 1 .1 1.5.3M10.6 8.9l1.3 4 1.2-4 1.2 4 1.3-4"
        stroke="#FF9900"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5.4 10.6c0 1.7 3.4.7 3.4 2.3 0 .8-.7 1.2-1.7 1.2-.7 0-1.3-.2-1.7-.4" stroke="#FF9900" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M3 17.4c4.4 2.6 13.6 2.6 18-.6" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18.4 15.8c1.6-.5 3 .1 2.4 1.4" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** GitHub — octocat silhouette abstraction in neutral white. */
export function GitHubBrandMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M12 2.6a9.4 9.4 0 0 0-3 18.3c.5.1.6-.2.6-.5v-1.7c-2.5.5-3.1-1.1-3.1-1.1-.4-1.1-1-1.4-1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .8 1.5 2.2 1.1 2.8.8.1-.6.3-1.1.6-1.3-2-.2-4.1-1-4.1-4.4 0-1 .3-1.8.9-2.4-.1-.3-.4-1.2.1-2.4 0 0 .8-.3 2.5.9a8.7 8.7 0 0 1 4.6 0c1.7-1.2 2.5-.9 2.5-.9.5 1.2.2 2.1.1 2.4.6.6.9 1.4.9 2.4 0 3.4-2.1 4.2-4.1 4.4.3.3.6.9.6 1.8v2.6c0 .3.2.6.7.5A9.4 9.4 0 0 0 12 2.6Z"
        fill="#E6EDF3"
      />
    </svg>
  );
}

/** GitHub Actions — blue automation rings. */
export function GitHubActionsBrandMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.6" stroke="#2088FF" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="3.4" fill="#2088FF" opacity="0.35" />
      <circle cx="12" cy="12" r="3.4" stroke="#2088FF" strokeWidth="1.4" />
      <path d="M12 3.4v2.2M20.6 12h-2.2" stroke="#2088FF" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/** Amazon VPC — networking purple boundary. */
export function VpcBrandMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.2" y="4.4" width="17.6" height="15.2" rx="2.6" fill="#8C4FFF" opacity="0.22" />
      <rect x="3.2" y="4.4" width="17.6" height="15.2" rx="2.6" stroke="#8C4FFF" strokeWidth="1.3" />
      <path d="M7.6 12h8.8M12 7.6v8.8" stroke="#8C4FFF" strokeWidth="1.3" strokeLinecap="round" strokeDasharray="2 2.4" />
    </svg>
  );
}

/** Amazon EC2 — compute orange chip. */
export function Ec2BrandMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <rect x="6" y="6" width="12" height="12" rx="1.8" fill="#FF9900" opacity="0.28" />
      <rect x="6" y="6" width="12" height="12" rx="1.8" stroke="#FF9900" strokeWidth="1.3" />
      <path
        d="M9.4 3.4v2.2M14.6 3.4v2.2M9.4 18.4v2.2M14.6 18.4v2.2M3.4 9.4h2.2M3.4 14.6h2.2M18.4 9.4h2.2M18.4 14.6h2.2"
        stroke="#FF9900"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Amazon S3 — storage green bucket. */
export function S3BrandMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <path d="M4.6 4h14.8l-1.6 15.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L4.6 4Z" fill="#569A31" opacity="0.3" />
      <path d="M4.6 4h14.8l-1.6 15.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L4.6 4Z" stroke="#569A31" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M9.6 8.6 14.4 12l-4.8 3.4" stroke="#7DBF4F" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Amazon DynamoDB — database blue. */
export function DynamoDbBrandMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 6.4c0-1.7 3.1-3 7-3s7 1.3 7 3v11.2c0 1.7-3.1 3-7 3s-7-1.3-7-3V6.4Z" fill="#4053D6" opacity="0.25" />
      <path d="M5 6.4c0-1.7 3.1-3 7-3s7 1.3 7 3v11.2c0 1.7-3.1 3-7 3s-7-1.3-7-3V6.4Z" stroke="#4053D6" strokeWidth="1.3" />
      <path d="M5 6.4c0 1.7 3.1 3 7 3s7-1.3 7-3M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" stroke="#5B6FEF" strokeWidth="1.2" />
    </svg>
  );
}

/** AWS IAM — security red shield. */
export function IamBrandMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 2.6 19.4 5v6.6c0 4.3-3 7.7-7.4 9.8-4.4-2.1-7.4-5.5-7.4-9.8V5L12 2.6Z" fill="#DD344C" opacity="0.25" />
      <path
        d="M12 2.6 19.4 5v6.6c0 4.3-3 7.7-7.4 9.8-4.4-2.1-7.4-5.5-7.4-9.8V5L12 2.6Z"
        stroke="#DD344C"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10.6" r="1.9" stroke="#FF6B7E" strokeWidth="1.3" />
      <path d="M12 12.5v3.2" stroke="#FF6B7E" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

/** Security Group — AWS security red firewall grid. */
export function SecurityGroupBrandMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.4" y="5" width="17.2" height="14" rx="2.2" fill="#DD344C" opacity="0.2" />
      <rect x="3.4" y="5" width="17.2" height="14" rx="2.2" stroke="#DD344C" strokeWidth="1.3" />
      <path d="M3.4 9.7h17.2M3.4 14.3h17.2M9 5v4.7M15 9.7v4.6M9 14.3V19" stroke="#DD344C" strokeWidth="1.2" />
    </svg>
  );
}

/** Developer / workstation — neutral. */
export function DeveloperMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="4.6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 20h8M12 16.6V20" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M9 8.8 7 11l2 2.2M15 8.8 17 11l-2 2.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const TERRAFORM_MARKS: Record<string, (props: MarkProps) => React.JSX.Element> = {
  Terraform: TerraformBrandMark,
  AWS: AwsBrandMark,
  GitHub: GitHubBrandMark,
  "GitHub Actions": GitHubActionsBrandMark,
  "AWS VPC": VpcBrandMark,
  VPC: VpcBrandMark,
  "AWS EC2": Ec2BrandMark,
  EC2: Ec2BrandMark,
  "AWS S3": S3BrandMark,
  S3: S3BrandMark,
  DynamoDB: DynamoDbBrandMark,
  "AWS DynamoDB": DynamoDbBrandMark,
  IAM: IamBrandMark,
  "Security Groups": SecurityGroupBrandMark,
  "Security Group": SecurityGroupBrandMark,
};
