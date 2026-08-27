/**
 * Cinematic hero backdrop.
 * A deep "core" of light — dark centre, luminous corona, filament strands —
 * that zooms out and settles on load, then breathes and drifts very slowly.
 * Purely decorative: aria-hidden, pointer-events-none, no layout impact.
 */
export function HeroAura() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
      <div className="aura-reveal absolute inset-0 opacity-45 sm:opacity-70 lg:opacity-100">
        <div className="aura-anchor">
          <div className="absolute top-1/2 left-1/2 grid [grid-template:0px/0px] place-items-center lg:left-[64%]">
            {/* filament strands radiating from the core */}
            <div
              className="aura-strands [grid-area:1/1] h-[min(150vh,86rem)] w-[min(150vh,86rem)] rounded-full mix-blend-screen"
              style={{
                background:
                  "repeating-conic-gradient(from 0deg at 50% 50%, color-mix(in oklab, var(--primary-glow) 38%, transparent) 0deg 0.6deg, transparent 0.6deg 2.4deg)",
                maskImage:
                  "radial-gradient(circle at 50% 50%, transparent 15%, black 26%, transparent 58%)",
                WebkitMaskImage:
                  "radial-gradient(circle at 50% 50%, transparent 15%, black 26%, transparent 58%)",
                filter: "blur(3px)",
              }}
            />

            {/* turbulent outer nebula */}
            <div
              className="aura-nebula [grid-area:1/1] h-[min(140vh,80rem)] w-[min(140vh,80rem)] rounded-full mix-blend-screen"
              style={{
                background:
                  "conic-gradient(from 210deg at 50% 50%, color-mix(in oklab, var(--primary) 34%, transparent), transparent 28%, color-mix(in oklab, var(--primary-glow) 30%, transparent) 52%, transparent 74%, color-mix(in oklab, var(--primary) 32%, transparent))",
                maskImage:
                  "radial-gradient(circle at 50% 50%, transparent 20%, black 40%, transparent 70%)",
                WebkitMaskImage:
                  "radial-gradient(circle at 50% 50%, transparent 20%, black 40%, transparent 70%)",
                filter: "blur(46px)",
              }}
            />

            {/* corona ring */}
            <div
              className="aura-corona [grid-area:1/1] h-[min(80vh,44rem)] w-[min(80vh,44rem)] rounded-full mix-blend-screen"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, transparent 30%, color-mix(in oklab, var(--primary-glow) 85%, transparent) 41%, color-mix(in oklab, var(--primary) 55%, transparent) 52%, transparent 68%)",
                filter: "blur(22px)",
              }}
            />

            {/* dark core now lives inside CloudOpsCenter, structurally
                anchored to the operator portrait so they move as one unit */}
          </div>
        </div>
      </div>

      {/* legibility scrim + edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 45%, color-mix(in oklab, var(--background) 25%, transparent) 20%, color-mix(in oklab, var(--background) 60%, transparent) 66%, var(--background) 100%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />
      <div className="absolute inset-y-0 left-0 w-[46%] bg-linear-to-r from-background/85 to-transparent lg:w-[40%]" />
    </div>
  );
}
