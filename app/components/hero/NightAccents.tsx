// Night-scene accents borrowed from mockup A: a small pixel moon (drawn inside
// the branch SVG so it shares the branch's pixel size) and a small vermilion
// torii that stands on the hero's bottom hairline.

// 8x8 pixel moon as [x, y, width] runs, one row tall each.
const MOON_ROWS: [number, number, number][] = [
  [2, 0, 4],
  [1, 1, 6],
  [0, 2, 8],
  [0, 3, 8],
  [0, 4, 8],
  [0, 5, 8],
  [1, 6, 6],
  [2, 7, 4],
];

// Craters as [x, y, width, height].
const MOON_CRATERS: [number, number, number, number][] = [
  [2, 2, 2, 1],
  [5, 4, 1, 2],
  [2, 5, 1, 1],
];

const runsToPath = (rows: [number, number, number][], ox: number, oy: number) =>
  rows.map(([x, y, w]) => `M${ox + x} ${oy + y}h${w}v1h-${w}z`).join("");

// Pixel moon in the parent SVG's grid units, top-left corner at (x, y).
// Renders an SVG <g>, so it must sit inside an <svg>.
export function MoonPixels({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <defs>
        <radialGradient id="hero-moon-glow">
          <stop offset="0%" className="[stop-color:var(--color-moon)] [stop-opacity:0.22]" />
          <stop offset="100%" className="[stop-color:var(--color-moon)] [stop-opacity:0]" />
        </radialGradient>
      </defs>
      <circle cx={x + 4} cy={y + 4} r={9} fill="url(#hero-moon-glow)" shapeRendering="auto" />
      <path className="fill-moon" d={runsToPath(MOON_ROWS, x, y)} />
      <g className="fill-ink" opacity={0.12}>
        {MOON_CRATERS.map(([cx, cy, w, h]) => (
          <rect key={`${cx},${cy}`} x={x + cx} y={y + cy} width={w} height={h} />
        ))}
      </g>
    </g>
  );
}

// 21x16 pixel torii, scaled down from mockup A's 64x48 gate.
function ToriiShape() {
  return (
    <>
      <g className="fill-vermilion">
        <rect x="0" y="0" width="21" height="1" />
        <rect x="1" y="1" width="19" height="1" />
        <rect x="9" y="2" width="3" height="2" />
        <rect x="2" y="4" width="17" height="1" />
        <rect x="4" y="2" width="2" height="14" />
        <rect x="15" y="2" width="2" height="14" />
      </g>
      {/* shadow side of the pillars and the dark cap on the top beam */}
      <g className="fill-ink" opacity={0.3}>
        <rect x="5" y="2" width="1" height="14" />
        <rect x="16" y="2" width="1" height="14" />
        <rect x="0" y="0" width="21" height="1" />
      </g>
    </>
  );
}

// Small torii whose base sits on the bottom of its positioned parent, with a
// faint reflection below it. 3px per pixel: 63x48 CSS px.
export function Torii({ className = "" }: { className?: string }) {
  return (
    <span className={`pointer-events-none absolute bottom-0 block w-[63px] ${className}`}>
      <svg
        viewBox="0 0 21 16"
        className="block h-auto w-full [shape-rendering:crispEdges]"
        focusable="false"
      >
        <ToriiShape />
      </svg>
      <span className="absolute top-full left-0 block h-[15px] w-full overflow-hidden opacity-15">
        <svg
          viewBox="0 0 21 16"
          className="block h-auto w-full -scale-y-100 [shape-rendering:crispEdges]"
          focusable="false"
        >
          <ToriiShape />
        </svg>
      </span>
    </span>
  );
}
