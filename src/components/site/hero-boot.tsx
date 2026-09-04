import { useEffect, useState } from "react";

const BOOT_MS = 1500;

/**
 * One-shot "system coming online" overlay for the hero.
 * Purely decorative: aria-hidden, pointer-events-none, unmounts when finished.
 * Skipped entirely under prefers-reduced-motion.
 */
export function HeroBoot() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(false);
      return;
    }
    const t = window.setTimeout(() => setVisible(false), BOOT_MS);
    return () => window.clearTimeout(t);
  }, []);

  if (!visible) return null;

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

  return (
    <div
      aria-hidden
      className="hero-boot pointer-events-none absolute inset-0 z-0 overflow-hidden hidden lg:block"
    >
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
    </div>
  );
}
