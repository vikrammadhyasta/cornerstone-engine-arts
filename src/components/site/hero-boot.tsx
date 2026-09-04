import { useEffect, useState } from "react";

const BOOT_MS = 1500;

const nodes = [
  { x: 12, y: 30, d: 0 },
  { x: 30, y: 62, d: 90 },
  { x: 50, y: 22, d: 170 },
  { x: 68, y: 55, d: 250 },
  { x: 86, y: 34, d: 330 },
  { x: 42, y: 82, d: 400, sm: true },
  { x: 76, y: 78, d: 470, sm: true },
];

const links = [
  { x1: 12, y1: 30, x2: 30, y2: 62, d: 120 },
  { x1: 30, y1: 62, x2: 50, y2: 22, d: 200 },
  { x1: 50, y1: 22, x2: 68, y2: 55, d: 280 },
  { x1: 68, y1: 55, x2: 86, y2: 34, d: 360, sm: true },
  { x1: 30, y1: 62, x2: 42, y2: 82, d: 430, sm: true },
];

/**
 * One-shot "system coming online" overlay for the hero.
 * Purely decorative: aria-hidden, pointer-events-none.
 * A persistent dark circular core remains behind the orbit/profile photo;
 * the animated sweep/link/node sequence only plays once and then unmounts.
 * Skipped entirely under prefers-reduced-motion and on non-desktop breakpoints.
 */
export function HeroBoot() {
  const [reduced, setReduced] = useState(false);
  const [sequenceDone, setSequenceDone] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const t = window.setTimeout(() => setSequenceDone(true), BOOT_MS);
    return () => window.clearTimeout(t);
  }, []);

  if (reduced) return null;

  return (
    <div
      aria-hidden
      className="hero-boot pointer-events-none absolute inset-0 z-0 hidden lg:block"
    >
      {/* Persistent dark circular core + radial sun-ray system, anchored to the
          orbit/profile-photo container as ONE unit. They share the same center,
          stay stable after the entrance sequence completes (no rotation, no
          drift), and exist on desktop only. Every layer is radially masked to
          fully transparent well before its own edges, so the light dissolves
          into the page background with no rectangular boundary. */}
      <div className="absolute top-1/2 left-1/2 aspect-square w-full max-w-[19rem] sm:max-w-[27rem] xl:max-w-[34rem] -translate-x-1/2 -translate-y-1/2">
        <div className="aura-reveal absolute inset-0 opacity-25">
          <div
            className="absolute top-1/2 left-1/2 grid [grid-template:0px/0px] place-items-center"
            style={{ transform: "translate(calc(-50% - 0.75rem), -50%)" }}
          >
            {/* filament strands radiating from the core — the radial rays,
                static so they remain attached to the dark core; masked to zero
                far inside the element so no edge is ever visible */}
            <div
              className="[grid-area:1/1] h-[240%] w-[240%] rounded-full mix-blend-screen"
              style={{
                background:
                  "repeating-conic-gradient(from 0deg at 50% 50%, color-mix(in oklab, var(--primary-glow) 38%, transparent) 0deg 0.6deg, transparent 0.6deg 2.4deg)",
                maskImage:
                  "radial-gradient(circle at 50% 50%, transparent 12%, black 22%, transparent 56%)",
                WebkitMaskImage:
                  "radial-gradient(circle at 50% 50%, transparent 12%, black 22%, transparent 56%)",
                filter: "blur(3px)",
              }}
            />

            {/* turbulent outer nebula */}
            <div
              className="[grid-area:1/1] h-[220%] w-[220%] rounded-full mix-blend-screen"
              style={{
                background:
                  "conic-gradient(from 210deg at 50% 50%, color-mix(in oklab, var(--primary) 34%, transparent), transparent 28%, color-mix(in oklab, var(--primary-glow) 30%, transparent) 52%, transparent 74%, color-mix(in oklab, var(--primary) 32%, transparent))",
                maskImage:
                  "radial-gradient(circle at 50% 50%, transparent 16%, black 34%, transparent 58%)",
                WebkitMaskImage:
                  "radial-gradient(circle at 50% 50%, transparent 16%, black 34%, transparent 58%)",
                filter: "blur(46px)",
              }}
            />

            {/* corona ring */}
            <div
              className="[grid-area:1/1] h-[130%] w-[130%] rounded-full mix-blend-screen"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, transparent 30%, color-mix(in oklab, var(--primary-glow) 85%, transparent) 41%, color-mix(in oklab, var(--primary) 55%, transparent) 52%, transparent 68%)",
                filter: "blur(22px)",
              }}
            />
          </div>
        </div>

        <div
          className="boot-core absolute top-1/2 left-1/2 aspect-square w-[52%] rounded-full"
          style={{
            transform: "translate(calc(-50% - 0.75rem), -50%)",
            background:
              "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--surface) 92%, transparent) 0%, color-mix(in oklab, var(--background) 72%, transparent) 70%)",
          }}
        />
      </div>

      {/* Animated entrance sequence — unmounts after BOOT_MS. */}
      {!sequenceDone && (
        <>
          {/* dark technical veil that dissolves into the page */}
          <div className="boot-veil absolute inset-0 bg-background/85 backdrop-blur-[2px]" />

          {/* scanning depth sweep */}
          <div
            className="boot-sweep absolute inset-x-0 top-0 h-40"
            style={{
              background:
                "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--primary) 16%, transparent), transparent)",
            }}
          />

          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {links.map((l, i) => (
              <line
                key={i}
                x1={l.x1}
                y1={l.y1}
                x2={l.x2}
                y2={l.y2}
                className={`boot-link ${l.sm ? "hidden sm:block" : ""}`}
                style={{ animationDelay: `${l.d}ms` }}
                stroke="color-mix(in oklab, var(--primary) 65%, transparent)"
                strokeWidth={0.18}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>

          {nodes.map((n, i) => (
            <span
              key={i}
              className={`boot-node absolute h-1.5 w-1.5 rounded-full bg-primary ${n.sm ? "hidden sm:block" : ""}`}
              style={{
                left: `${n.x}%`,
                top: `${n.y}%`,
                animationDelay: `${n.d}ms`,
                boxShadow: "0 0 12px color-mix(in oklab, var(--primary) 60%, transparent)",
              }}
            />
          ))}

          {/* restrained system-status readout */}
          <div className="boot-status absolute bottom-6 left-1/2 hidden -translate-x-1/2 font-mono text-[0.625rem] tracking-[0.22em] text-muted-foreground uppercase sm:block">
            initializing platform
          </div>
        </>
      )}
    </div>
  );
}
