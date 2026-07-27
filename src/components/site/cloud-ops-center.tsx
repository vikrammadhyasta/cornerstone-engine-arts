import profilePhoto from "@/assets/profile-photo.jpg";

/**
 * Cloud Operations Center — an original, restrained visualization of a
 * distributed platform: layered orbital rings, infrastructure nodes and
 * slow-travelling connection pulses composed around a profile portrait.
 */

const NODES = [
  { label: "eu-west", x: 12, y: 22, delay: "0s" },
  { label: "us-east", x: 84, y: 16, delay: "1.4s" },
  { label: "edge", x: 92, y: 62, delay: "2.6s" },
  { label: "ap-south", x: 8, y: 70, delay: "3.4s" },
  { label: "control", x: 50, y: 4, delay: "0.8s" },
  { label: "storage", x: 66, y: 92, delay: "2.1s" },
];

export function CloudOpsCenter() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
      {/* ambient halo */}
      <div
        aria-hidden
        className="absolute inset-[8%] rounded-full blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--primary) 30%, transparent), transparent 68%)",
        }}
      />

      {/* orbital rings */}
      <div
        aria-hidden
        className="absolute inset-[4%] rounded-full border border-border animate-orbit-slow motion-reduce:animate-none"
      />
      <div
        aria-hidden
        className="absolute inset-[18%] rounded-full border border-dashed border-border-strong animate-orbit-reverse motion-reduce:animate-none"
      />
      <div aria-hidden className="absolute inset-[32%] rounded-full border border-border" />

      {/* connection lines */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id="ops-link" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--primary-glow)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {NODES.map((node) => (
          <g key={node.label}>
            <line
              x1="50"
              y1="50"
              x2={node.x}
              y2={node.y}
              stroke="url(#ops-link)"
              strokeWidth="0.4"
            />
            <circle r="0.9" fill="var(--primary-glow)" className="motion-reduce:hidden">
              <animateMotion
                dur="5.5s"
                begin={node.delay}
                repeatCount="indefinite"
                path={`M ${node.x} ${node.y} L 50 50`}
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="spline"
                keySplines="0.4 0 0.2 1"
              />
            </circle>
          </g>
        ))}
      </svg>

      {/* nodes */}
      {NODES.map((node) => (
        <div
          key={node.label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <div className="flex items-center gap-2 rounded-full border border-border bg-surface/80 px-2.5 py-1 backdrop-blur-sm">
            <span
              className="h-1.5 w-1.5 rounded-full bg-primary animate-node-pulse motion-reduce:animate-none"
              style={{ animationDelay: node.delay }}
            />
            <span className="font-mono text-[0.625rem] tracking-[0.12em] text-muted-foreground uppercase">
              {node.label}
            </span>
          </div>
        </div>
      ))}

      {/* portrait core */}
      <div className="absolute inset-[32%] overflow-hidden rounded-full border border-border-strong bg-surface shadow-[var(--shadow-glow)]">
        <img
          src={profilePhoto}
          alt="Portrait of the cloud and platform engineer behind this platform"
          width={816}
          height={816}
          className="h-full w-full object-cover"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent"
        />
      </div>
    </div>
  );
}
