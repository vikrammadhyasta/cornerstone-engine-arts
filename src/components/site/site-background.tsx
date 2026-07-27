/**
 * Ambient background system.
 * Layers: deep navy base -> radial gradients -> aurora lighting -> grid texture.
 * Purely decorative, fixed behind all content.
 */
export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base wash */}
      <div className="absolute inset-0 bg-background" />

      {/* soft radial gradients */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 60%)",
        }}
      />

      {/* aurora lighting */}
      <div
        className="absolute -top-40 left-[-10%] h-[36rem] w-[36rem] rounded-full blur-[140px] animate-aurora-slow motion-reduce:animate-none"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--primary) 45%, transparent), transparent 70%)",
        }}
      />
      <div
        className="absolute top-[20%] right-[-15%] h-[32rem] w-[32rem] rounded-full blur-[150px] animate-aurora-slower motion-reduce:animate-none"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--primary-glow) 32%, transparent), transparent 70%)",
        }}
      />

      {/* grid texture, faded out toward the edges */}
      <div
        className="absolute inset-0 grid-texture"
        style={{
          maskImage: "radial-gradient(85% 60% at 50% 0%, black, transparent 85%)",
          WebkitMaskImage: "radial-gradient(85% 60% at 50% 0%, black, transparent 85%)",
        }}
      />

      {/* bottom settle */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-background to-transparent" />
    </div>
  );
}
