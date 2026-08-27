/**
 * Cinematic hero backdrop.
 * A deep "core" of light — dark centre, luminous corona, filament strands —
 * that zooms out and settles on load, then breathes and drifts very slowly.
 * Purely decorative: aria-hidden, pointer-events-none, no layout impact.
 */
export function HeroAura() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
      <div className="aura-reveal absolute inset-0">
        {/* filament strands radiating from the core */}
        <div className="aura-anchor">
          <div
            className="aura-strands absolute top-1/2 left-1/2 h-[min(150vh,86rem)] w-[min(150vh,86rem)] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "repeating-conic-gradient(from 0deg at 50% 50%, color-mix(in oklab, var(--primary-glow) 26%, transparent) 0deg 0.6deg, transparent 0.6deg 2.4deg)",
              maskImage:
                "radial-gradient(circle at 50% 50%, transparent 17%, black 30%, transparent 62%)",
              WebkitMaskImage:
                "radial-gradient(circle at 50% 50%, transparent 17%, black 30%, transparent 62%)",
              filter: "blur(3px)",
            }}
          />

          {/* turbulent outer nebula */}
          <div
            className="aura-nebula absolute top-1/2 left-1/2 h-[min(140vh,80rem)] w-[min(140vh,80rem)] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "conic-gradient(from 210deg at 50% 50%, color-mix(in oklab, var(--primary) 34%, transparent), transparent 28%, color-mix(in oklab, var(--primary-glow) 26%, transparent) 52%, transparent 74%, color-mix(in oklab, var(--primary) 30%, transparent))",
              maskImage:
                "radial-gradient(circle at 50% 50%, transparent 22%, black 44%, transparent 72%)",
              WebkitMaskImage:
                "radial-gradient(circle at 50% 50%, transparent 22%, black 44%, transparent 72%)",
              filter: "blur(42px)",
            }}
          />

          {/* corona ring */}
          <div
            className="aura-corona absolute top-1/2 left-1/2 h-[min(76vh,42rem)] w-[min(76vh,42rem)] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, transparent 34%, color-mix(in oklab, var(--primary-glow) 55%, transparent) 46%, color-mix(in oklab, var(--primary) 26%, transparent) 58%, transparent 70%)",
              filter: "blur(18px)",
            }}
          />

          {/* dark core */}
          <div
            className="aura-core absolute top-1/2 left-1/2 h-[min(34vh,18rem)] w-[min(34vh,18rem)] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--background) 92%, black) 40%, color-mix(in oklab, var(--primary) 22%, transparent) 78%, transparent 100%)",
              boxShadow: "0 0 120px 20px color-mix(in oklab, var(--primary) 24%, transparent)",
            }}
          />
        </div>
      </div>

      {/* legibility scrim + edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 45%, transparent 20%, color-mix(in oklab, var(--background) 72%, transparent) 62%, var(--background) 100%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />
      <div className="absolute inset-y-0 left-0 w-[45%] bg-linear-to-r from-background/80 to-transparent lg:w-[38%]" />
    </div>
  );
}
