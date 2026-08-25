import * as React from "react";

/**
 * Minimal, original geometric marks for the pipeline technologies.
 * Purely decorative — every usage pairs them with a visible text label.
 */
type MarkProps = React.SVGProps<SVGSVGElement>;

const base = (props: MarkProps) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
  ...props,
});

export function GitHubMark(props: MarkProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.93.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.86l-.01 2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

export function JenkinsMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M6.5 21c.6-3.5 2.7-5.5 5.5-5.5s4.9 2 5.5 5.5" />
      <path d="M9 4.5c1.8-1.6 4.2-1.6 6 0" />
    </svg>
  );
}

export function DockerMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="12" width="3.5" height="3.5" rx="0.5" />
      <rect x="7.5" y="12" width="3.5" height="3.5" rx="0.5" />
      <rect x="12" y="12" width="3.5" height="3.5" rx="0.5" />
      <rect x="7.5" y="7.75" width="3.5" height="3.5" rx="0.5" />
      <rect x="12" y="7.75" width="3.5" height="3.5" rx="0.5" />
      <path d="M3 17.5c2.8 2.6 8.4 2.9 11.9.6 1.6-1.1 2.5-2.4 3-3.9 1.4.6 2.8.4 3.6-.2-.5-1.3-1.8-1.9-3-1.8" />
    </svg>
  );
}

export function EcrMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3 20 7v10l-8 4-8-4V7l8-4Z" />
      <path d="M4 7l8 4 8-4M12 11v10" />
    </svg>
  );
}

export function ArgoMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 6.5v3M12 14.5v3M6.5 12h3M14.5 12h3" />
      <circle cx="12" cy="12" r="2.25" />
    </svg>
  );
}

export function KubernetesMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 2.6 20 6.6l-2 9.3-6 3.5-6-3.5-2-9.3 8-4Z" />
      <circle cx="12" cy="11.5" r="2.75" />
      <path d="M12 3.6v5.1M14.6 13.2l3.3 3M9.4 13.2l-3.3 3M12 14.25V19" />
    </svg>
  );
}

export function TerraformMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 5.5 9 8v5.5L4 11V5.5Z" />
      <path d="M10 8l5-2.5V11l-5 2.5V8Z" />
      <path d="M10 14.5l5-2.5v5.5l-5 2.5v-5.5Z" />
    </svg>
  );
}

export function AwsMark(props: MarkProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 15a3.5 3.5 0 0 1 .4-7 5 5 0 0 1 9.4 1.3A3.4 3.4 0 0 1 16.5 15H7Z" />
      <path d="M4 18.5c5 2 11 2 16 0" />
    </svg>
  );
}
