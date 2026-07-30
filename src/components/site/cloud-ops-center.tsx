import profilePhoto from "@/assets/profile-photo.jpg";

/**
 * Platform Core — an abstract, layered visualization of a cloud platform.
 *
 * Three concentric capability planes (CLOUD → PLATFORM → DELIVERY) built from
 * arcs and surfaces rather than spokes, with slow illumination sweeping along
 * the arcs, a gentle platform heartbeat and calm status transitions.
 * Entirely decorative: hidden from assistive tech except the portrait.
 */

type Layer = {
  id: string;
  label: string;
  inset: string;
  /** arc dash geometry, in % of circumference */
  dash: string;
  duration: string;
  reverse?: boolean;
};

const LAYERS: Layer[] = [
  { id: "cloud", label: "Cloud", inset: "2%", dash: "34 8 12 46", duration: "88s" },
  { id: "platform", label: "Platform", inset: "16%", dash: "22 10 30 38", duration: "64s", reverse: true },
  { id: "delivery", label: "Delivery", inset: "30%", dash: "16 6 44 34", duration: "52s" },
];

/** Restrained capability chips anchored to the outer planes. */
const MARKERS = [
  { label: "Cloud", detail: "AWS", x: 8, y: 26, delay: "0s" },
  { label: "Platform", detail: "K8s", x: 90, y: 22, delay: "1.1s" },
  { label: "Delivery", detail: "IaC", x: 92, y: 72, delay: "2.2s" },
  { label: "Observability", detail: "SLO", x: 10, y: 78, delay: "3.3s" },
];

export function CloudOpsCenter() {
  return (
    <div className="platform-core relative mx-auto aspect-square w-full max-w-[24rem] sm:max-w-[28rem] xl:max-w-[34rem]">
      {/* ambient glow */}
      <div
        aria-hidden
        className="absolute inset-[10%] rounded-full blur-3xl opacity-55 animate-core-breathe motion-reduce:animate-none"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--primary) 26%, transparent), transparent 70%)",
        }}
      />

      {/* architectural planes — layered depth with soft parallax */}
      {LAYERS.map((layer, i) => (
        <div
          key={layer.id}
          aria-hidden
          className="absolute rounded-full border border-border animate-core-drift motion-reduce:animate-none"
          style={{
            inset: layer.inset,
            background:
              i === 0
                ? "radial-gradient(circle at 30% 20%, color-mix(in oklab, var(--surface) 70%, transparent), transparent 72%)"
                : "color-mix(in oklab, var(--surface) 28%, transparent)",
            animationDelay: `${i * 2.4}s`,
            animationDuration: `${16 + i * 5}s`,
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
          const r = 48 - i * 7;
          const circumference = 2 * Math.PI * r;
          return (
            <g key={layer.id}>
              {/* static structural arc */}
              <circle
                cx="50"
                cy="50"
                r={r}
                fill="none"
                stroke="var(--border-strong)"
                strokeWidth="0.35"
                strokeDasharray={`${circumference * 0.62} ${circumference}`}
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
        <path
          d="M 20 62 A 34 34 0 0 0 78 66"
          fill="none"
          stroke="var(--border)"
          strokeWidth="0.3"
        />
        <path
          d="M 26 32 A 30 30 0 0 1 74 34"
          fill="none"
          stroke="var(--border)"
          strokeWidth="0.3"
        />
      </svg>

      {/* capability markers */}
      {MARKERS.map((marker) => (
        <div
          key={marker.label}
          aria-hidden
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
        >
          <div className="flex items-center gap-2 rounded-full border border-border bg-surface/85 px-2 py-1 backdrop-blur-sm sm:px-2.5">
            <span
              className="h-1.5 w-1.5 rounded-full bg-primary animate-status-shift motion-reduce:animate-none"
              style={{ animationDelay: marker.delay }}
            />
            <span className="font-mono text-[0.5625rem] tracking-[0.14em] text-muted-foreground uppercase sm:text-[0.625rem]">
              {marker.label}
            </span>
            <span className="hidden font-mono text-[0.625rem] text-foreground/70 sm:inline">
              {marker.detail}
            </span>
          </div>
        </div>
      ))}

      {/* operator portrait — present, not dominant */}
      <div className="absolute inset-[38%] overflow-hidden rounded-full border border-border-strong bg-surface shadow-[var(--shadow-glow)]">
        <img
          src={profilePhoto}
          alt="Portrait of the cloud and platform engineer behind this platform"
          width={816}
          height={816}
          loading="eager"
          className="h-full w-full object-cover opacity-95"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-background/70 via-transparent to-transparent"
        />
      </div>
    </div>
  );
}
