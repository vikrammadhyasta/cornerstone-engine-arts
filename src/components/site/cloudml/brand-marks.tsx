import * as React from "react";

/**
 * Recognizable, brand-coloured marks for the AWS services and languages used by
 * the Cloud ML Agriculture Predictor. Decorative only — every usage is paired
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

/** AWS Lambda — networking/compute orange, stylised lambda stroke. */
export function LambdaBrandMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 4h4.2l8 16H12L4 4Z" fill="#FF9900" />
      <path d="M11.2 12.4 7.4 20H3.5l5.8-11.4 1.9 3.8Z" fill="#FF9900" opacity="0.55" />
    </svg>
  );
}

/** Amazon API Gateway — networking purple, gateway/router glyph. */
export function ApiGatewayBrandMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 2.4 20.4 7v10L12 21.6 3.6 17V7L12 2.4Z" fill="#8C4FFF" opacity="0.28" />
      <path d="M12 2.4 20.4 7v10L12 21.6 3.6 17V7L12 2.4Z" stroke="#8C4FFF" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M8 12h8M13 9l3 3-3 3" stroke="#8C4FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Amazon S3 — storage green, bucket glyph. */
export function S3BrandMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <path d="M4.6 4h14.8l-1.6 15.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L4.6 4Z" fill="#569A31" opacity="0.3" />
      <path d="M4.6 4h14.8l-1.6 15.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L4.6 4Z" stroke="#569A31" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M9.6 8.6 14.4 12l-4.8 3.4" stroke="#7DBF4F" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Amazon CloudWatch — management magenta, cloud with monitoring pulse. */
export function CloudWatchBrandMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M7.6 18.5a4.1 4.1 0 0 1-.7-8.1 5.6 5.6 0 0 1 10.7 1 3.8 3.8 0 0 1-.6 7.1H7.6Z"
        fill="#E7157B"
        opacity="0.25"
      />
      <path
        d="M7.6 18.5a4.1 4.1 0 0 1-.7-8.1 5.6 5.6 0 0 1 10.7 1 3.8 3.8 0 0 1-.6 7.1H7.6Z"
        stroke="#E7157B"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M6.8 15.2h2.1l1.5-3 1.8 5 1.4-2h2.6" stroke="#FF4FA3" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** AWS IAM — security red, shield with key. */
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
      <circle cx="12" cy="10.4" r="1.9" stroke="#FF6A7C" strokeWidth="1.4" />
      <path d="M12 12.3v3.6M11 14.6h2" stroke="#FF6A7C" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/** Python — the two interlocking blue/yellow bodies. */
export function PythonBrandMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M11.9 2.2c-2.6 0-4.4.9-4.4 3v2.3h4.6v.8H5.7c-2 0-3.5 1.5-3.5 4.2s1.2 4.3 3.2 4.3h1.5v-2.6c0-2.2 1.7-3.7 3.9-3.7h3.9c1.8 0 3-1.4 3-3.1V5.2c0-1.8-1.4-3-3.4-3h-2.4Zm-2.5 1.7a.95.95 0 1 1 0 1.9.95.95 0 0 1 0-1.9Z"
        fill="#3776AB"
      />
      <path
        d="M12.1 21.8c2.6 0 4.4-.9 4.4-3v-2.3h-4.6v-.8h6.4c2 0 3.5-1.5 3.5-4.2s-1.2-4.3-3.2-4.3h-1.5v2.6c0 2.2-1.7 3.7-3.9 3.7H9.3c-1.8 0-3 1.4-3 3.1v2.2c0 1.8 1.4 3 3.4 3h2.4Zm2.5-1.7a.95.95 0 1 1 0-1.9.95.95 0 0 1 0 1.9Z"
        fill="#FFD43B"
      />
    </svg>
  );
}

/** scikit-learn — the orange/blue paired-node mark. */
export function ScikitLearnBrandMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <path d="M6.4 15.6 15.2 6.8" stroke="#F89939" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M8.8 17.2 17.6 8.4" stroke="#3499CD" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="6" cy="16" r="2.6" fill="#F89939" />
      <circle cx="18" cy="8" r="2.6" fill="#3499CD" />
    </svg>
  );
}

/** Generic caller/client — neutral, not a brand. */
export function ClientMark(props: MarkProps) {
  return (
    <svg {...base(props)} stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4.5" width="18" height="12" rx="2" />
      <path d="M8.5 20h7M12 16.5V20" strokeLinecap="round" />
    </svg>
  );
}

export const CLOUD_ML_MARKS: Record<string, (props: MarkProps) => React.JSX.Element> = {
  "API Gateway": ApiGatewayBrandMark,
  "AWS Lambda": LambdaBrandMark,
  "AWS S3": S3BrandMark,
  CloudWatch: CloudWatchBrandMark,
  IAM: IamBrandMark,
  Python: PythonBrandMark,
  "Scikit-learn": ScikitLearnBrandMark,
};
