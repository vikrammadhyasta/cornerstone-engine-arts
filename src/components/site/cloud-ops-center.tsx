import profilePhoto from "@/assets/profile-photo.jpg";

/**
 * Platform Core — an abstract, layered visualization of a cloud platform.
 *
 * Four concentric capability planes (CLOUD → PLATFORM → DELIVERY → OBSERVABILITY)
 * built from arcs and surfaces rather than spokes, with slow illumination sweeping
 * along the arcs, a gentle platform heartbeat and calm status transitions.
 * Entirely decorative: hidden from assistive tech except the portrait.
 */

type Layer = {
  id: string;
  label: string;
  /** short state word — never rely on color alone */
  state: string;
  inset: string;
  duration: string;
  reverse?: boolean;
  /** marker anchor, in % of the square */
  x: number;
  y: number;
  delay: string;
  /** hidden on small screens to simplify ring detail */
  compact?: boolean;
};

const LAYERS: Layer[] = [
  {
    id: "cloud",
    label: "Cloud",
    state: "AWS",
    inset: "1%",
    duration: "88s",
    x: 12,
    y: 20,
    delay: "0s",
  },
  {
    id: "platform",
    label: "Platform",
    state: "K8s",
    inset: "13%",
    duration: "70s",
    reverse: true,
    x: 88,
    y: 26,
    delay: "1.1s",
    compact: true,
  },
  {
    id: "delivery",
    label: "Delivery",
    state: "IaC",
    inset: "25%",
    duration: "58s",
    x: 88,
    y: 74,
    delay: "2.2s",
  },
  {
    id: "observability",
    label: "Observability",
    state: "SLO",
    inset: "34%",
    duration: "48s",
    reverse: true,
    x: 12,
    y: 80,
    delay: "3.3s",
    compact: true,
  },
];

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

        {/* capability planes — layered depth with soft parallax */}
        {LAYERS.map((layer, i) => (
          <div
            key={layer.id}
            aria-hidden
            className={`absolute rounded-full border border-border animate-core-drift motion-reduce:animate-none ${
              layer.compact ? "hidden sm:block" : ""
            }`}
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

        {/* capability markers — desktop / tablet only, kept inside the frame */}
        {LAYERS.map((layer) => (
          <div
            key={layer.id}
            aria-hidden
            className="absolute hidden -translate-x-1/2 -translate-y-1/2 sm:block"
            style={{ left: `${layer.x}%`, top: `${layer.y}%` }}
          >
            <div className="flex items-center gap-2 rounded-full border border-border bg-surface/85 px-2.5 py-1 backdrop-blur-sm">
              <span
                className="h-1.5 w-1.5 rounded-full bg-primary animate-status-shift motion-reduce:animate-none"
                style={{ animationDelay: layer.delay }}
              />
              <span className="font-mono text-[0.625rem] tracking-[0.14em] text-muted-foreground uppercase">
                {layer.label}
              </span>
              <span className="font-mono text-[0.625rem] text-foreground/70">{layer.state}</span>
            </div>
          </div>
        ))}

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

      {/* compact mobile legend — keeps every label inside the viewport */}
      <ul aria-hidden className="grid w-full max-w-[19rem] grid-cols-2 gap-2 sm:hidden">
        {LAYERS.map((layer) => (
          <li
            key={layer.id}
            className="flex min-w-0 items-center gap-1.5 rounded-full border border-border bg-surface/60 px-2 py-1"
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary animate-status-shift motion-reduce:animate-none"
              style={{ animationDelay: layer.delay }}
            />
            <span className="truncate font-mono text-[0.5625rem] tracking-[0.12em] text-muted-foreground uppercase">
              {layer.label}
            </span>
            <span className="ml-auto shrink-0 font-mono text-[0.5625rem] text-foreground/70">
              {layer.state}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
