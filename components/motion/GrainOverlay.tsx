export function GrainOverlay() {
  // SVG noise filter rendered as a fixed overlay. ~3KB cost, instant premium texture.
  // Opacity + blend mode are theme-aware via CSS custom properties from globals.css.
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-60"
      style={{
        opacity: "var(--grain-opacity, 0.05)",
        mixBlendMode: "var(--grain-blend, overlay)" as "overlay",
        backgroundImage:
          'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'240\' height=\'240\' viewBox=\'0 0 240 240\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/><feColorMatrix values=\'0 0 0 0 0.96 0 0 0 0 0.94 0 0 0 0 0.90 0 0 0 1 0\'/></filter><rect width=\'240\' height=\'240\' filter=\'url(%23n)\'/></svg>")',
        backgroundSize: "240px 240px",
      }}
    />
  );
}
