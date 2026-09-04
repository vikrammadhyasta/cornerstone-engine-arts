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
 * Rings carry a clear hierarchy (core → delivery → engineering → AI tooling),
 * with subtle differences in opacity, thickness, glow and speed for depth.
 * Entirely decorative: hidden from assistive tech except the portrait.
 *
 * Ring membership is only a visual arrangement — the technology registry in
 * tech-logos.tsx remains the single source of truth for names and icons.
 */

/** Ring 1 (innermost) — core cloud & platform technologies. */
const RING_CORE: TechLogo[] = [CORE_TECH[0], CORE_TECH[1], CORE_TECH[2], CORE_TECH[3]];

/** Ring 2 — CI/CD & delivery technologies. */
const RING_DELIVERY: TechLogo[] = [CORE_TECH[4], CORE_TECH[5], SUPPORTING_TECH[0], SUPPORTING_TECH[3]];

/** Ring 3 — engineering & development technologies. */
const RING_ENGINEERING: TechLogo[] = [CORE_TECH[6], SUPPORTING_TECH[1], SUPPORTING_TECH[2], SUPPORTING_TECH[4]];

/** Ring 4 (outermost) — AI & development tooling, deliberately quieter. */
const RING_AI: TechLogo[] = AI_TECH;

export function CloudOpsCenter() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="platform-core relative mx-auto aspect-square w-full max-w-[19rem] sm:max-w-[26rem] xl:max-w-[32rem]">
        {/* ambient glow */}
        <div
          aria-hidden
          className="absolute inset-[12%] rounded-full blur-3xl opacity-50 animate-core-breathe motion-reduce:animate-none"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--primary) 24%, transparent), transparent 70%)",
          }}
        />

        {/* dark core — anchored to the portrait: both are centered children of
            the same platform-core wrapper, so the core disc and the photo move,
            scale and reposition together as one unit on every viewport.
            Keeps its original appearance, pulse and entrance settle. */}
        <div aria-hidden className="aura-reveal absolute inset-[18.75%] opacity-45 sm:opacity-70 lg:opacity-100">
          <div
            className="aura-core h-full w-full rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--background) 88%, black) 42%, color-mix(in oklab, var(--primary) 26%, transparent) 80%, transparent 100%)",
              boxShadow: "0 0 120px 24px color-mix(in oklab, var(--primary) 32%, transparent)",
            }}
          />
        </div>

        {/* capability planes — layered depth with soft parallax.
            The innermost (observability) plane is kept static and anchored to
            the portrait so it does not drift independently from the photo. */}
        {LAYERS.map((layer, i) => (
          <div
            key={layer.id}
            aria-hidden
            className={`absolute rounded-full border border-border ${
              layer.id === "observability" ? "" : "animate-core-drift motion-reduce:animate-none"
            } ${layer.compact ? "hidden sm:block" : ""}`}
            style={{
              inset: layer.inset,
              background:
                i === 0
                  ? "radial-gradient(circle at 30% 20%, color-mix(in oklab, var(--surface) 70%, transparent), transparent 72%)"
                  : `color-mix(in oklab, var(--surface) ${30 - i * 5}%, transparent)`,
              animationDelay: `${i * 2.2}s`,
              animationDuration: `${16 + i * 4}s`,
            }}
          />
        ))}

        {/* arc system with travelling illumination */}
        <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="core-arc" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
              <stop offset="45%" stopColor="var(--primary)" stopOpacity="0.75" />
              <stop offset="100%" stopColor="var(--primary-glow)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {LAYERS.map((layer, i) => {
            const r = 49 - i * 6;
            const circumference = 2 * Math.PI * r;
            return (
              <g key={layer.id} className={layer.compact ? "hidden sm:inline" : undefined}>
                {/* static structural arc */}
                <circle
                  cx="50"
                  cy="50"
                  r={r}
                  fill="none"
                  stroke="var(--border-strong)"
                  strokeWidth="0.35"
                  strokeDasharray={`${circumference * (0.66 - i * 0.06)} ${circumference}`}
                  strokeLinecap="round"
                  transform={`rotate(${i * 42} 50 50)`}
                />
                {/* illumination sweeping along the arc */}
                <circle
                  cx="50"
                  cy="50"
                  r={r}
                  fill="none"
                  stroke="url(#core-arc)"
                  strokeWidth="0.9"
                  strokeLinecap="round"
                  strokeDasharray={`${circumference * 0.14} ${circumference}`}
                  className={
                    layer.reverse
                      ? "animate-arc-sweep-reverse motion-reduce:hidden"
                      : "animate-arc-sweep motion-reduce:hidden"
                  }
                  style={{ animationDuration: layer.duration, transformOrigin: "50% 50%" }}
                />
              </g>
            );
          })}

          {/* connecting planes between layers — architectural, not spokes */}
          <path d="M 20 62 A 34 34 0 0 0 78 66" fill="none" stroke="var(--border)" strokeWidth="0.3" />
          <path d="M 26 32 A 30 30 0 0 1 74 34" fill="none" stroke="var(--border)" strokeWidth="0.3" />
        </svg>

        {/* technology ecosystem — core cloud/devops rings dominate, the AI /
            development ring sits further out and is deliberately quieter. */}
        <div aria-hidden className="absolute inset-0 hidden sm:block">
          <OrbitRing tech={CORE_TECH} radius={32} duration={128} size="lg" delay={0} />
          <OrbitRing tech={SUPPORTING_TECH} radius={41.5} duration={168} reverse delay={0.5} offset={26} />
          <OrbitRing tech={AI_TECH} radius={45.5} duration={210} size="sm" muted delay={1} offset={13} />
        </div>

        {/* mobile: dedicated compact composition — one ring, 7 core technologies */}
        <div aria-hidden className="absolute inset-0 sm:hidden">
          <OrbitRing tech={CORE_TECH} radius={41} duration={140} size="lg" delay={0} />
        </div>

        {/* operator portrait — present, not dominant */}
        <div className="absolute inset-[40%] overflow-hidden rounded-full border border-border-strong bg-surface shadow-[var(--shadow-glow)]">
          <img
            src={profilePhoto}
            alt="Portrait of Vikram Madhyasta, cloud and platform engineer"
            width={816}
            height={816}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover opacity-95"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-background/70 via-transparent to-transparent"
          />
        </div>
      </div>

      {/* compact secondary technology list — mobile only, keeps the orbit clean */}
      <ul aria-hidden className="flex w-full max-w-[19rem] flex-wrap justify-center gap-1.5 sm:hidden">
        {[...SUPPORTING_TECH, ...AI_TECH].map((tech) => (
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
}) {
  const spin = `orbit-spin ${duration}s linear infinite${reverse ? " reverse" : ""}`;
  const counterSpin = `orbit-spin ${duration}s linear infinite${reverse ? "" : " reverse"}`;
  const box =
    size === "lg" ? "h-9 w-9 sm:h-10 sm:w-10" : size === "md" ? "h-8 w-8" : "h-7 w-7";
  const glyph = size === "lg" ? "h-5 w-5" : size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  const wideGlyph = size === "lg" ? "h-4 w-7" : size === "md" ? "h-3.5 w-6" : "h-3 w-5";

  return (
    <>
      <div
        className="absolute rounded-full border border-border/70"
        style={{ inset: `${50 - radius}%` }}
      />
      <div
        className="absolute inset-0 motion-reduce:animate-none"
        style={{ animation: spin, transformOrigin: "50% 50%" }}
      >
        {tech.map((item, i) => {
          const angle = (360 / tech.length) * i + offset;
          const rad = (angle * Math.PI) / 180;
          const left = (50 + radius * Math.sin(rad)).toFixed(3);
          const top = (50 - radius * Math.cos(rad)).toFixed(3);
          return (
            <div
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
                    className="group -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                    title={item.name}
                  >
                    {/* ambient halo */}
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md transition-opacity duration-300 ${
                        size === "lg" ? "h-12 w-12" : size === "md" ? "h-10 w-10" : "h-8 w-8"
                      } ${muted ? "opacity-25 group-hover:opacity-45" : "opacity-45 group-hover:opacity-80"}`}
                      style={{
                        background:
                          "radial-gradient(circle, color-mix(in oklab, var(--primary) 26%, transparent), transparent 70%)",
                      }}
                    />
                    <div
                      className={`relative flex ${box} items-center justify-center rounded-full border bg-surface/85 backdrop-blur-sm transition-[transform,box-shadow,border-color,opacity] duration-300 group-hover:scale-110 ${
                        muted
                          ? "border-border/80 opacity-70 shadow-[0_0_12px_-8px_color-mix(in_oklab,var(--primary)_60%,transparent)] group-hover:opacity-100"
                          : "border-border-strong/70 shadow-[0_0_18px_-6px_color-mix(in_oklab,var(--primary)_60%,transparent)] animate-node-pulse motion-reduce:animate-none"
                      } group-hover:border-primary/60 group-hover:shadow-[0_0_26px_-4px_color-mix(in_oklab,var(--primary)_75%,transparent)]`}
                      style={muted ? undefined : { animationDelay: `${i * 0.4}s` }}
                    >
                      <TechGlyph tech={item} className={item.wide ? wideGlyph : glyph} />
                    </div>
                    <span
                      className={`mt-1 max-w-[5.5rem] text-center font-mono text-[0.4375rem] leading-tight tracking-[0.1em] whitespace-nowrap uppercase transition-colors duration-300 group-hover:text-foreground ${
                        muted ? "text-muted-foreground/60" : "text-muted-foreground"
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}


