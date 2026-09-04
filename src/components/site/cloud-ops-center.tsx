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

        {/* soft ambient plane behind the portrait for depth */}
        <div
          aria-hidden
          className="absolute inset-[6%] rounded-full animate-core-drift motion-reduce:animate-none"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, color-mix(in oklab, var(--surface) 55%, transparent), transparent 72%)",
          }}
        />

        {/* technology ecosystem — four clean orbital rings with a clear
            hierarchy: core → delivery → engineering → AI tooling. Rings differ
            subtly in opacity, thickness, glow and speed for visual depth. */}
        <div aria-hidden className="absolute inset-0 hidden sm:block">
          <OrbitRing
            tech={RING_CORE}
            radius={23.5}
            duration={150}
            size="lg"
            delay={0}
            ringClassName="border-primary/25 shadow-[0_0_18px_-6px_color-mix(in_oklab,var(--primary)_45%,transparent)]"
          />
          <OrbitRing
            tech={RING_DELIVERY}
            radius={31.5}
            duration={195}
            reverse
            delay={0.4}
            offset={45}
            ringClassName="border-border-strong/60"
          />
          <OrbitRing
            tech={RING_ENGINEERING}
            radius={39}
            duration={240}
            delay={0.8}
            offset={22}
            ringClassName="border-border/70"
          />
          <OrbitRing
            tech={RING_AI}
            radius={45.5}
            duration={285}
            reverse
            size="sm"
            muted
            delay={1.2}
            offset={11}
            ringClassName="border-border/40"
          />
        </div>

        {/* mobile: dedicated compact composition — one ring, 7 core technologies */}
        <div aria-hidden className="absolute inset-0 sm:hidden">
          <OrbitRing tech={CORE_TECH} radius={41} duration={150} size="lg" delay={0} />
        </div>

        {/* operator portrait — the primary focal point */}
        <div className="absolute inset-[36%] overflow-hidden rounded-full border border-border-strong bg-surface shadow-[var(--shadow-glow)]">
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
  ringClassName = "border-border/70",
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
  /** ring line styling — varies opacity/thickness/glow per ring for depth */
  ringClassName?: string;
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
        className={`absolute rounded-full border ${ringClassName}`}
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


