"use client";

/**
 * Seeded pseudo-random for deterministic "chaos" across layers.
 */
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

function range(seed: number, min: number, max: number) {
  return min + seededRandom(seed) * (max - min);
}

const WORD = "Agent Skills";
const LAYER_COUNT = 36;

interface LayerConfig {
  translateY: number;
  scale: number;
  rotate: number;
  skewX: number;
  skewY: number;
  opacity: number;
  useOutline: boolean;
}

function getLayerConfig(i: number): LayerConfig {
  const seed = i * 1.617;
  return {
    translateY: range(seed, -60, 140),
    scale: range(seed + 1, 0.2, 1.25),
    rotate: range(seed + 2, -22, 22),
    skewX: range(seed + 3, -14, 14),
    skewY: range(seed + 4, -10, 10),
    opacity: range(seed + 5, 0.04, 0.22),
    useOutline: seededRandom(seed + 6) > 0.45,
  };
}

const layers: LayerConfig[] = Array.from({ length: LAYER_COUNT }, (_, i) =>
  getLayerConfig(i)
);

/** Scroll-driven 3D chaos: each layer responds to scroll progress (0–1) with different scale, rotate, and opacity. */
export function ChaoticWordLayers({ scrollProgress = 0 }: { scrollProgress?: number }) {
  return (
    <div className="post-footer-fold-word-wrapper relative flex h-full min-h-[200px] w-full items-center justify-center overflow-visible">
      {/* Chaos layers: transform and opacity change with scroll */}
      {layers.map((cfg, i) => {
        const p = scrollProgress;
        const seed = i * 1.617;
        const scaleMult = 0.6 + 0.6 * p + seededRandom(seed + 10) * 0.3;
        const rotateDelta = (p - 0.5) * 2 * (seededRandom(seed + 11) - 0.5) * 25;
        const translateYDelta = (p - 0.5) * seededRandom(seed + 12) * 80;
        const opacityMult = 0.4 + 0.8 * p + seededRandom(seed + 13) * 0.4;

        const scale = cfg.scale * scaleMult;
        const rotate = cfg.rotate + rotateDelta;
        const translateY = cfg.translateY + translateYDelta;
        const opacity = Math.max(0, Math.min(1, cfg.opacity * opacityMult));

        return (
          <div
            key={i}
            className="post-footer-fold-word-chaos absolute inset-0 flex items-center justify-center transition-transform duration-150 ease-out"
            style={{
              transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg) skew(${cfg.skewX}deg, ${cfg.skewY}deg)`,
              opacity,
              WebkitTextStroke: cfg.useOutline
                ? "1px rgba(255,255,255,0.45)"
                : undefined,
              color: cfg.useOutline ? "transparent" : undefined,
            }}
            aria-hidden
          >
            <span className="font-[family-name:var(--font-display)] text-center text-6xl font-normal uppercase tracking-tighter text-foreground/90 sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]">
              {WORD}
            </span>
          </div>
        );
      })}
      {/* Main word on top: slight scale with scroll */}
      <h2
        className="post-footer-fold-word relative z-10 font-[family-name:var(--font-display)] text-center text-6xl font-normal uppercase tracking-tighter text-foreground/90 transition-transform duration-150 ease-out sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]"
        style={{
          transform: `scale(${0.88 + scrollProgress * 0.2})`,
        }}
      >
        {WORD}
      </h2>
    </div>
  );
}
