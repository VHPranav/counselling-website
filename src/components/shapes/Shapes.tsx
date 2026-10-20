import type { ComponentProps } from "react";

/**
 * Organic decorative shapes. All use currentColor, so set colour with a text-* class.
 * They are decorative: aria-hidden and not focusable.
 */
type SvgProps = Omit<ComponentProps<"svg">, "viewBox">;
const deco = { "aria-hidden": true, focusable: false } as const;

/** Soft irregular blob. `variant` picks one of three hand-tuned outlines. */
export function Blob({ variant = 0, ...props }: SvgProps & { variant?: 0 | 1 | 2 }) {
  const paths = [
    "M421 79c58 44 87 125 70 198-17 74-79 140-156 168-77 27-170 16-232-34C41 361 9 272 31 196 53 120 128 57 208 33c80-25 155 2 213 46Z",
    "M445 138c38 68 38 160-10 220-48 61-145 90-228 75-84-15-154-75-176-150-22-76 3-167 63-219 60-53 154-66 226-36 50 21 87 56 125 110Z",
    "M392 61c66 31 112 102 105 172-7 69-67 137-142 175-75 39-165 48-226 7C68 374 36 283 46 205c10-79 62-145 129-168 67-24 151-7 217 24Z",
  ];
  return (
    <svg viewBox="0 0 520 480" fill="currentColor" {...deco} {...props}>
      <path d={paths[variant]} />
    </svg>
  );
}

/** Rounded pebble. */
export function Pebble(props: SvgProps) {
  return (
    <svg viewBox="0 0 200 140" fill="currentColor" {...deco} {...props}>
      <path d="M100 6c52 0 94 18 96 56 2 40-38 72-96 72S2 108 4 66C6 26 48 6 100 6Z" />
    </svg>
  );
}

/** Banana-leaf silhouette with a midrib and a few torn edges. */
export function BananaLeaf(props: SvgProps) {
  return (
    <svg viewBox="0 0 240 520" fill="none" {...deco} {...props}>
      <path
        fill="currentColor"
        d="M122 8c-6 60-44 96-70 160-28 70-36 150-20 214 12 48 40 92 86 130 4-40 10-70 26-100l-18-6 22-8c10-26 22-56 30-90l-22-4 26-12c6-30 8-62 6-96l-18 2 18-14c-4-34-14-66-28-96L148 92l10-14C148 50 136 28 122 8Z"
      />
      <path d="M122 14c4 140 2 300-4 498" stroke="var(--color-cream, #f6f0e6)" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** Areca palm frond: a curved stem with tapering leaflets. */
export function PalmFrond(props: SvgProps) {
  const leaflets = Array.from({ length: 11 }, (_, i) => i);
  return (
    <svg viewBox="0 0 400 300" fill="none" stroke="currentColor" strokeLinecap="round" {...deco} {...props}>
      <path d="M20 280C110 200 220 120 380 40" strokeWidth="4" />
      {leaflets.map((i) => {
        const t = (i + 1) / 12;
        const x = 20 + t * 360;
        const y = 280 - t * 240 - Math.sin(t * Math.PI) * 18;
        const len = 70 - i * 3.5;
        return (
          <g key={i} strokeWidth={3 - i * 0.15}>
            <path d={`M${x} ${y}q${-len * 0.25} ${-len * 0.6} ${-len * 0.1} ${-len}`} />
            <path d={`M${x} ${y}q${len * 0.55} ${len * 0.2} ${len * 0.95} ${len * 0.15}`} />
          </g>
        );
      })}
    </svg>
  );
}

/** Concentric backwater ripples. */
export function Ripple(props: SvgProps) {
  return (
    <svg viewBox="0 0 400 160" fill="none" stroke="currentColor" {...deco} {...props}>
      {[0, 1, 2, 3].map((i) => (
        <ellipse key={i} cx="200" cy="80" rx={60 + i * 46} ry={18 + i * 15} strokeWidth={1.6 - i * 0.3} strokeOpacity={1 - i * 0.2} />
      ))}
    </svg>
  );
}

/** Arch window shape, for framing illustrations or photos. */
export function Arch(props: SvgProps) {
  return (
    <svg viewBox="0 0 200 260" fill="currentColor" {...deco} {...props}>
      <path d="M0 100C0 45 45 0 100 0s100 45 100 100v136c0 13-11 24-24 24H24c-13 0-24-11-24-24V100Z" />
    </svg>
  );
}

/** Small brand mark: a leaf resting on a ripple. Placeholder until a logo is supplied. */
export function BrandMark(props: SvgProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...deco} {...props}>
      <path d="M20 4c8 6 11 14 8 22-2 5-5 7-8 8-3-1-6-3-8-8-3-8 0-16 8-22Z" fill="var(--color-moss)" />
      <path d="M20 9v24" stroke="var(--color-cream)" strokeWidth="1.2" strokeLinecap="round" opacity=".7" />
      <path d="M6 33c4 2.5 9 3.5 14 3.5S30 35.5 34 33" stroke="var(--color-clay)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
