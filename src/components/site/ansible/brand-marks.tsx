import * as React from "react";

/**
 * Recognizable, brand-coloured marks for the Ansible / Jenkins / Docker
 * CI-CD case study. Decorative only — every usage is paired with a visible
 * text label, so each mark is aria-hidden.
 */
type MarkProps = React.SVGProps<SVGSVGElement>;

const base = (props: MarkProps) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  "aria-hidden": true,
  focusable: false,
  ...props,
});

/** Ansible — red circle with the angular "A". */
export function AnsibleBrandMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9.4" fill="#EE0000" />
      <path
        d="M11.4 6.4 8 17.2l1.9.6 1-3.3 4.4 3.4 1.3-1.6-6.2-4.8 1.3-4.1Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/** Jenkins — butler bust in the familiar red/white palette. */
export function JenkinsBrandMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <path d="M4.6 21c.6-4.1 3.4-6.4 7.4-6.4S18.8 16.9 19.4 21H4.6Z" fill="#D33833" />
      <ellipse cx="12" cy="8.4" rx="4.4" ry="5.2" fill="#F0D6B7" />
      <path d="M7.6 7.6c0-3 2-4.8 4.4-4.8s4.4 1.6 4.4 4.4c-1.4-1.2-2.8-1.7-4.4-1.7-1.7 0-3.1.6-4.4 2.1Z" fill="#335061" />
      <circle cx="10.2" cy="8.6" r="0.9" fill="#FFFFFF" />
      <circle cx="13.9" cy="8.6" r="0.9" fill="#FFFFFF" />
      <path d="M10.4 14.8h3.2l-1.6 3.1-1.6-3.1Z" fill="#FFFFFF" />
    </svg>
  );
}

/** Docker — blue whale carrying containers. */
export function DockerBrandMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <g fill="#2496ED">
        <rect x="3.2" y="11.4" width="3" height="2.8" rx="0.3" />
        <rect x="6.6" y="11.4" width="3" height="2.8" rx="0.3" />
        <rect x="10" y="11.4" width="3" height="2.8" rx="0.3" />
        <rect x="6.6" y="8.3" width="3" height="2.8" rx="0.3" />
        <rect x="10" y="8.3" width="3" height="2.8" rx="0.3" />
        <rect x="10" y="5.2" width="3" height="2.8" rx="0.3" />
      </g>
      <path
        d="M2.6 15.2c1 3.1 3.7 4.6 7.4 4.6 4.4 0 7.8-2 9.3-6 1.3.6 2.5.3 3.1-.5-1-1.2-2.4-1.4-3.6-1.2-.2-1.1-.8-2-1.7-2.7-.8.9-1 2.3-.5 3.4-.4.2-1 .4-1.7.4H2.6Z"
        fill="#2496ED"
      />
    </svg>
  );
}

/** AWS EC2 — orange compute tile. */
export function Ec2BrandMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="4" width="16" height="16" rx="2.5" fill="#ED7100" />
      <rect x="7.5" y="7.5" width="9" height="9" rx="1" fill="#FFFFFF" opacity="0.92" />
      <path d="M9.5 2.8v2M14.5 2.8v2M9.5 19.2v2M14.5 19.2v2M2.8 9.5h2M2.8 14.5h2M19.2 9.5h2M19.2 14.5h2" stroke="#ED7100" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

/** Amazon Web Services — orange smile. */
export function AwsBrandMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <path d="M5.4 10.6c0-1 .7-1.6 1.9-1.6.5 0 1 .1 1.5.3M10.6 8.9l1.3 4 1.2-4 1.2 4 1.3-4" stroke="#FF9900" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 17.4c4.4 2.6 13.6 2.6 18-.6" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18.4 15.8c1.6-.5 3 .1 2.4 1.4" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Ubuntu / Linux — orange circle-of-friends. */
export function UbuntuBrandMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9.4" fill="#E95420" />
      <g fill="#FFFFFF">
        <circle cx="6.9" cy="12" r="1.9" />
        <circle cx="14.6" cy="7.4" r="1.9" />
        <circle cx="14.6" cy="16.6" r="1.9" />
      </g>
      <g stroke="#FFFFFF" strokeWidth="1.4" fill="none">
        <path d="M9 11.1a4.4 4.4 0 0 1 3.4-2.6" />
        <path d="M12.4 15.5A4.4 4.4 0 0 1 9 12.9" />
      </g>
    </svg>
  );
}

/** Node.js — green hexagon. */
export function NodeBrandMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 2.4 20.4 7.2v9.6L12 21.6 3.6 16.8V7.2L12 2.4Z" fill="#5FA04E" />
      <path
        d="M12.4 15.9c-1.9 0-2.9-.9-3-2.3h1.3c.1.7.5 1.1 1.7 1.1 1 0 1.5-.3 1.5-.9 0-.5-.3-.7-1.7-.9-1.8-.2-2.7-.7-2.7-2 0-1.2 1-2 2.7-2 1.8 0 2.7.7 2.9 2.1h-1.3c-.1-.6-.5-1-1.6-1-1 0-1.4.4-1.4.8 0 .5.3.7 1.7.9 1.8.2 2.7.6 2.7 2s-1.1 2.2-2.8 2.2Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/** SSH / secure channel — neutral key-lock glyph. */
export function SshMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <rect x="4.5" y="10.2" width="15" height="9.3" rx="2" stroke="#9FB3C8" strokeWidth="1.4" />
      <path d="M8 10.2V7.6a4 4 0 0 1 8 0v2.6" stroke="#9FB3C8" strokeWidth="1.4" />
      <circle cx="12" cy="14.6" r="1.4" fill="#9FB3C8" />
    </svg>
  );
}

/** Engineer / operator glyph. */
export function OperatorMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="8" r="3.4" stroke="#9FB3C8" strokeWidth="1.4" />
      <path d="M5.5 20c.6-3.5 3.2-5.4 6.5-5.4S17.9 16.5 18.5 20" stroke="#9FB3C8" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export const ANSIBLE_MARKS: Record<string, (props: MarkProps) => React.JSX.Element> = {
  Ansible: AnsibleBrandMark,
  Jenkins: JenkinsBrandMark,
  Docker: DockerBrandMark,
  "AWS EC2": Ec2BrandMark,
  AWS: AwsBrandMark,
  "Linux / Ubuntu": UbuntuBrandMark,
  Ubuntu: UbuntuBrandMark,
  "Node.js": NodeBrandMark,
  SSH: SshMark,
};
