import profilePhotoAsset from "@/assets/profile-photo.jpg.asset.json";
const profilePhoto = profilePhotoAsset.url;
import {
  AI_TECH,
  CORE_TECH,
  SUPPORTING_TECH,
  TechGlyph,
  type TechLogo,
} from "@/components/site/tech-logos";

/**
 * Platform Core — a calm, four-ring orbital visualization of the technology
 * ecosystem around the operator portrait.
 *
 * Rings carry a clear hierarchy (core platform → delivery → engineering →
 * AI-native workflow), with graduated opacity, glow and speed for depth.
 * Every node sits well outside a protected central zone around the portrait,
 * so nothing ever crosses the photo while orbiting.
 *
 * Ring membership is only a visual arrangement — the technology registry in
 * tech-logos.tsx remains the single source of truth for names and icons.
 */

const REGISTRY: TechLogo[] = [...CORE_TECH, ...SUPPORTING_TECH, ...AI_TECH];

const byName = (name: string): TechLogo => {
  const found = REGISTRY.find((t) => t.name === name);
  if (!found) throw new Error(`Unknown technology: ${name}`);
  return found;
};

const pick = (...names: string[]) => names.map(byName);

/** Ring 1 (innermost) — core cloud & platform technologies. */
const RING_CORE = pick("AWS", "Kubernetes", "Terraform", "Docker", "Linux");

/** Ring 2 — delivery & automation. */
const RING_DELIVERY = pick("Jenkins", "GitHub Actions", "GitHub", "ArgoCD", "Ansible");

/** Ring 3 — software engineering. */
const RING_ENGINEERING = pick("Python", "Java", "SQL");

/** Ring 4 (outermost) — AI-native workflow, deliberately quieter. */
const RING_AI = pick(
  "Claude Code",
  "Claude",
  "Gemini",
  "Codex",
  "Hermes Agent",
  "OpenRouter",
  "ChatGPT",
  "Lovable",
);

/** Accessible names for marks whose label is an abbreviation. */
const ARIA_NAMES: Record<string, string> = {
  AWS: "Amazon Web Services",
  SQL: "SQL databases",
};

export function CloudOpsCenter() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="platform-core relative mx-auto aspect-square w-full max-w-[19rem] sm:max-w-[27rem] xl:max-w-[34rem]">
        {/* technology ecosystem — four orbital rings, hierarchy from the core
            platform outwards to the AI-native workflow. Inner rings read
            slightly brighter; outer rings stay quieter for depth. */}
        <div className="absolute inset-0 hidden sm:block">
          <OrbitRing
            tech={RING_CORE}
            radius={28}
            duration={190}
            size="lg"
            delay={0}
            dots={10}
            ringClassName="border-primary/45 shadow-[0_0_14px_-6px_color-mix(in_oklab,var(--primary)_70%,transparent)]"
          />
          <OrbitRing
            tech={RING_DELIVERY}
            radius={35}
            duration={240}
            reverse
            delay={0.4}
            offset={36}
            dots={12}
            dotOpacity={0.75}
            ringClassName="border-primary/32"
          />
          <OrbitRing
            tech={RING_ENGINEERING}
            radius={41.5}
            duration={285}
            delay={0.8}
            offset={60}
            dots={14}
            dotOpacity={0.6}
            ringClassName="border-primary/22"
          />
          <OrbitRing
            tech={RING_AI}
            radius={47.5}
            duration={330}
            reverse
            size="sm"
            muted
            delay={1.2}
            offset={22}
            dots={16}
            dotOpacity={0.45}
            ringClassName="border-primary/14"
          />
        </div>

        {/* mobile: dedicated compact composition — one ring, 5 core technologies */}
        <div className="absolute inset-0 sm:hidden">
          <OrbitRing
            tech={RING_CORE}
            radius={42}
            duration={190}
            size="lg"
            delay={0}
            dots={10}
            ringClassName="border-primary/40"
          />
        </div>

        {/* operator portrait — the primary focal point, protected zone at the
            centre that no orbiting node can reach (innermost radius 28%). */}
        <div className="absolute inset-[33%] overflow-hidden rounded-full border border-primary/40 bg-surface shadow-[0_0_24px_-10px_color-mix(in_oklab,var(--primary)_70%,transparent)]">
          <img
            src={profilePhoto}
            alt="Portrait of Vikram Madhyasta, cloud and platform engineer"
            width={816}
            height={816}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* compact secondary technology list — mobile only, keeps the orbit clean
          while still representing every technology. */}
      <ul className="flex w-full max-w-[19rem] flex-wrap justify-center gap-1.5 sm:hidden">
        {[...RING_DELIVERY, ...RING_ENGINEERING, ...RING_AI].map((tech) => (
          <li
            key={tech.name}
            className="flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-2 py-1"
          >
            <TechGlyph tech={tech} className="h-3 w-3 shrink-0" />
            <span className="font-mono text-[0.5625rem] tracking-[0.1em] text-muted-foreground uppercase">
              {tech.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}


/**
 * A single orbital ring of technology marks. The ring rotates slowly while each
 * mark counter-rotates at the same rate, so logos stay upright and readable.
 */
function OrbitRing({
  tech,
  radius,
  duration,
  reverse,
  size = "md",
  muted,
  delay = 0,
  offset = 0,
  dots = 0,
  dotOpacity = 0.9,
  ringClassName = "border-primary/20",
}: {
  tech: TechLogo[];
  /** distance from centre, in % of the square */
  radius: number;
  duration: number;
  reverse?: boolean;
  size?: "sm" | "md" | "lg";
  muted?: boolean;
  delay?: number;
  /** phase offset in degrees, keeps rings from colliding when frozen */
  offset?: number;
  /** number of static luminous markers sitting on the ring path */
  dots?: number;
  dotOpacity?: number;
  /** ring line styling — varies opacity/thickness/glow per ring for depth */
  ringClassName?: string;
}) {
  const spin = `orbit-spin ${duration}s linear infinite${reverse ? " reverse" : ""}`;
  const counterSpin = `orbit-spin ${duration}s linear infinite${reverse ? "" : " reverse"}`;
  const box =
    size === "lg" ? "h-9 w-9 sm:h-10 sm:w-10" : size === "md" ? "h-8 w-8" : "h-7 w-7";
  const glyph = size === "lg" ? "h-5 w-5" : size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  const wideGlyph = size === "lg" ? "h-4 w-7" : size === "md" ? "h-3.5 w-6" : "h-3 w-5";
  const dotMarks = Array.from({ length: dots }, (_, i) => {
    const a = ((360 / Math.max(dots, 1)) * i + offset / 2) * (Math.PI / 180);
    return {
      left: (50 + radius * Math.sin(a)).toFixed(3),
      top: (50 - radius * Math.cos(a)).toFixed(3),
    };
  });


  return (
    <>
      <div
        aria-hidden
        className={`absolute rounded-full border ${ringClassName}`}
        style={{ inset: `${50 - radius}%` }}
      />
      <ul
        className="absolute inset-0 list-none motion-reduce:animate-none"
        style={{ animation: spin, transformOrigin: "50% 50%" }}
      >
        {tech.map((item, i) => {
          const angle = (360 / tech.length) * i + offset;
          const rad = (angle * Math.PI) / 180;
          const left = (50 + radius * Math.sin(rad)).toFixed(3);
          const top = (50 - radius * Math.cos(rad)).toFixed(3);
          return (
            <li
              key={item.name}
              className="absolute"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <div
                className="motion-reduce:animate-none"
                style={{ animation: counterSpin, transformOrigin: "50% 50%" }}
              >
                <div
                  className="animate-reveal motion-reduce:animate-none"
                  style={{ animationDelay: `${delay + i * 0.09}s` }}
                >
                  <div
                    role="img"
                    tabIndex={0}
                    aria-label={ARIA_NAMES[item.name] ?? item.name}
                    className="group -translate-x-1/2 -translate-y-1/2 flex flex-col items-center rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {/* ambient halo */}
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md transition-opacity duration-300 ${
                        size === "lg" ? "h-12 w-12" : size === "md" ? "h-10 w-10" : "h-8 w-8"
                      } ${muted ? "opacity-25 group-hover:opacity-45 group-focus-visible:opacity-45" : "opacity-45 group-hover:opacity-80 group-focus-visible:opacity-80"}`}
                      style={{
                        background:
                          "radial-gradient(circle, color-mix(in oklab, var(--primary) 26%, transparent), transparent 70%)",
                      }}
                    />
                    <div
                      className={`relative flex ${box} items-center justify-center rounded-full border bg-surface/85 backdrop-blur-sm transition-[transform,box-shadow,border-color,opacity] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:scale-110 group-focus-visible:-translate-y-0.5 group-focus-visible:scale-110 ${
                        muted
                          ? "border-border/80 opacity-70 shadow-[0_0_12px_-8px_color-mix(in_oklab,var(--primary)_60%,transparent)] group-hover:opacity-100 group-focus-visible:opacity-100"
                          : "border-border-strong/70 shadow-[0_0_18px_-6px_color-mix(in_oklab,var(--primary)_60%,transparent)] animate-node-pulse motion-reduce:animate-none"
                      } group-hover:border-primary/60 group-focus-visible:border-primary/60 group-hover:shadow-[0_0_26px_-4px_color-mix(in_oklab,var(--primary)_75%,transparent)] group-focus-visible:shadow-[0_0_26px_-4px_color-mix(in_oklab,var(--primary)_75%,transparent)]`}
                      style={muted ? undefined : { animationDelay: `${i * 0.4}s` }}
                    >
                      <TechGlyph tech={item} className={item.wide ? wideGlyph : glyph} />
                    </div>
                    <span
                      aria-hidden
                      className={`mt-1 max-w-[5.5rem] text-center font-mono text-[0.4375rem] leading-tight tracking-[0.1em] whitespace-nowrap uppercase transition-colors duration-200 group-hover:text-foreground group-focus-visible:text-foreground ${
                        muted ? "text-muted-foreground/60" : "text-muted-foreground"
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
