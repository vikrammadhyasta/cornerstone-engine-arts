/**
 * Cinematic hero backdrop.
 * A deep "core" of light — dark centre, luminous corona, filament strands —
 * that zooms out and settles on load, then breathes and drifts very slowly.
 * Purely decorative: aria-hidden, pointer-events-none, no layout impact.
 */
export function HeroAura() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
      {/* The dark core + radial sun-ray system lives inside HeroBoot, anchored
          to the orbit/profile-photo container so it follows the orbit center
          exactly and exists on desktop only (no tablet/mobile artifacts). */}

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
