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

import { AwsBrandMark } from "@/components/site/terraform/brand-marks";

/**
 * Technology ecosystem registry for the homepage hero.
 *
 * Icons come from the official `simple-icons` brand asset set (real logos,
 * official brand hexes). Where no official mark exists in that set, the entry
 * intentionally carries no icon and is rendered as a text label instead —
 * never a fabricated logo.
 */
export type TechLogo = {
  name: string;
  /** official brand SVG path data, when an official mark is available */
  path?: string;
  /** official brand hex */
  hex?: string;
  /** rendered as a bespoke component (project-local brand mark) */
  Mark?: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
};

const si = (icon: { title: string; path: string; hex: string }, name?: string): TechLogo => ({
  name: name ?? icon.title,
  path: icon.path,
  hex: `#${icon.hex}`,
});

/** Core cloud + DevOps technologies — the visual priority of the composition. */
export const CORE_TECH: TechLogo[] = [
  { name: "AWS", Mark: AwsBrandMark },
  si(siKubernetes),
  si(siTerraform),
  si(siDocker),
  si(siJenkins),
  si(siArgo, "ArgoCD"),
  { ...si(siGithub, "GitHub"), hex: "#E6EDF3" },
];

/** Supporting engineering technologies. */
export const SUPPORTING_TECH: TechLogo[] = [
  si(siGithubactions, "GitHub Actions"),
  si(siPython),
  si(siLinux),
  si(siAnsible),
  { ...si(siOpenjdk, "Java"), hex: "#E76F00" },
];

/** Secondary AI / development ecosystem — deliberately quieter. */
export const AI_TECH: TechLogo[] = [
  si(siClaude, "Claude"),
  { name: "ChatGPT" },
  si(siGooglegemini, "Gemini"),
  { name: "Codex" },
  { name: "Claude Code" },
  si(siOpenrouter, "OpenRouter"),
  { name: "Lovable" },
  { name: "Hermes Agent" },
];

export function TechGlyph({ tech, className }: { tech: TechLogo; className?: string }) {
  if (tech.Mark) return <tech.Mark className={className} aria-hidden focusable="false" />;
  if (tech.path) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false" fill={tech.hex}>
        <path d={tech.path} />
      </svg>
    );
  }
  return null;
}
