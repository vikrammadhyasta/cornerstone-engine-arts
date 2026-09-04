import {
  siAnsible,
  siArgo,
  siClaude,
  siDocker,
  siGithub,
  siGithubactions,
  siGooglegemini,
  siJenkins,
  siKubernetes,
  siLinux,
  siOpenjdk,
  siOpenrouter,
  siPython,
  siTerraform,
} from "simple-icons";

import anthropicMark from "@/assets/brands/anthropic.svg";
import awsMark from "@/assets/brands/aws.svg";
import codexMark from "@/assets/brands/codex.svg";
import lovableMark from "@/assets/brands/lovable.svg";
import openaiMark from "@/assets/brands/openai.svg";

/**
 * Technology ecosystem registry for the homepage hero.
 *
 * Icons are official brand assets: `simple-icons` for the marks it ships, and
 * locally vendored official SVGs (AWS, OpenAI, Codex, Anthropic, Lovable) for
 * the brands it does not. No fabricated or approximated logos.
 */
export type TechLogo = {
  name: string;
  /** official brand SVG path data, when an official mark is available */
  path?: string;
  /** official brand hex */
  hex?: string;
  /** vendored official brand SVG asset URL */
  src?: string;
  /** rendered as a bespoke component (project-local brand mark) */
  Mark?: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  /** wordmark-style asset — rendered slightly wider inside the node */
  wide?: boolean;
};

const si = (icon: { title: string; path: string; hex: string }, name?: string): TechLogo => ({
  name: name ?? icon.title,
  path: icon.path,
  hex: `#${icon.hex}`,
});

/**
 * Hermes Agent has no published brand asset; this is the project's own mark for
 * it (a winged messenger glyph), drawn in the ecosystem's own visual language.
 */
export function HermesAgentMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="7.2" r="2.6" stroke="#7DD3FC" strokeWidth="1.4" />
      <path
        d="M12 9.8v9M12 12.4 7.4 15M12 12.4l4.6 2.6"
        stroke="#7DD3FC"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M4.2 9.6c2.2-.6 4 .1 5.2 2M19.8 9.6c-2.2-.6-4 .1-5.2 2"
        stroke="#38BDF8"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Core cloud + DevOps technologies — the visual priority of the composition. */
export const CORE_TECH: TechLogo[] = [
  { name: "AWS", src: awsMark, wide: true },
  si(siKubernetes),
  si(siTerraform),
  si(siDocker),
  si(siJenkins),
  si(siArgo, "ArgoCD"),
  { ...si(siGithub, "GitHub"), hex: "#E6EDF3" },
];

/**
 * SQL has no single official brand mark; this is a neutral, semantically
 * appropriate database glyph rather than an invented brand logo.
 */
export function SqlMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <ellipse cx="12" cy="5.8" rx="7" ry="2.8" stroke="#7DD3FC" strokeWidth="1.5" />
      <path d="M5 5.8v12.4c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8V5.8" stroke="#7DD3FC" strokeWidth="1.5" />
      <path d="M5 12c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8" stroke="#38BDF8" strokeWidth="1.3" />
    </svg>
  );
}

/** Supporting engineering technologies. */
export const SUPPORTING_TECH: TechLogo[] = [
  si(siGithubactions, "GitHub Actions"),
  si(siPython),
  si(siLinux),
  si(siAnsible),
  { ...si(siOpenjdk, "Java"), hex: "#E76F00" },
  { name: "SQL", Mark: SqlMark },
];


/** Secondary AI / development ecosystem — deliberately quieter. */
export const AI_TECH: TechLogo[] = [
  si(siClaude, "Claude"),
  { name: "ChatGPT", src: openaiMark },
  si(siGooglegemini, "Gemini"),
  { name: "Codex", src: codexMark },
  { name: "Claude Code", src: anthropicMark },
  si(siOpenrouter, "OpenRouter"),
  { name: "Lovable", src: lovableMark },
  { name: "Hermes Agent", Mark: HermesAgentMark },
];

export function TechGlyph({ tech, className }: { tech: TechLogo; className?: string }) {
  if (tech.Mark) return <tech.Mark className={className} aria-hidden focusable="false" />;
  if (tech.src) {
    return (
      <img
        src={tech.src}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className={`${className ?? ""} object-contain`}
      />
    );
  }
  if (tech.path) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false" fill={tech.hex}>
        <path d={tech.path} />
      </svg>
    );
  }
  return null;
}
