import { MoonPixels } from "./NightAccents";
import { seededRandom } from "./rng";

// Pixel sakura branch from mockup C, rasterized onto a 96x58 grid at build
// time. This is a server component: the grid is computed once and shipped as
// static SVG paths, so there is nothing to hydrate.

const W = 96;
const H = 58;

type Tone = "bark" | "barkLt" | "sakura" | "sakuraLt" | "sakuraDk" | "vermilion";

const TONE_CLASS: Record<Tone, string> = {
  bark: "fill-bark",
  barkLt: "fill-bark-lt",
  sakura: "fill-sakura",
  sakuraLt: "fill-sakura-lt",
  sakuraDk: "fill-sakura-dk",
  vermilion: "fill-vermilion",
};

// Branch segments [x1, y1, x2, y2, r1, r2]; the trunk enters from the right edge.
const SEGMENTS: [number, number, number, number, number, number][] = [
  [98, 4, 80, 9, 2.6, 2.1],
  [80, 9, 64, 13, 2.1, 1.6],
  [64, 13, 50, 20, 1.6, 1.2],
  [50, 20, 38, 23, 1.2, 0.8],
  [38, 23, 28, 22, 0.8, 0.5],
  [80, 9, 74, 2, 1.2, 0.6],
  [64, 13, 58, 29, 1.1, 0.6],
  [58, 29, 54, 37, 0.6, 0.4],
  [50, 20, 44, 13, 0.8, 0.5],
  [72, 11, 70, 22, 0.9, 0.5],
  [88, 7, 86, 16, 0.8, 0.4],
];

// 5x5 blossom: p petal, L highlight, c vermilion center, d shadow.
const FLOWER = ["..p..", ".pLp.", "pLcLp", ".pdp.", "..d.."];
const FLOWER_TONE: Record<string, Tone> = { p: "sakura", L: "sakuraLt", c: "vermilion", d: "sakuraDk" };

const SPOTS: [number, number][] = [
  [76, 4], [82, 13], [71, 16], [66, 9], [60, 18], [57, 24], [53, 34], [47, 15], [44, 22],
  [36, 20], [30, 25], [27, 19], [69, 24], [86, 18], [90, 10], [73, 0], [62, 28], [41, 26],
];

// Where the moon sits: the empty sky above the branch's left arm.
const MOON_AT = { x: 33, y: 1 };

function rasterize(): Map<string, Tone> {
  const rnd = seededRandom(7);
  const grid = new Map<string, Tone>();
  const set = (x: number, y: number, tone: Tone) => {
    if (x >= 0 && y >= 0 && x < W && y < H) grid.set(`${x},${y}`, tone);
  };

  const bark = new Set<string>();
  for (const [x1, y1, x2, y2, r1, r2] of SEGMENTS) {
    const steps = Math.ceil(Math.hypot(x2 - x1, y2 - y1) * 3);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = x1 + (x2 - x1) * t;
      const y = y1 + (y2 - y1) * t + Math.sin(t * 6 + x1) * 0.5; // slight organic wobble
      const r = r1 + (r2 - r1) * t;
      for (let dx = -3; dx <= 3; dx++)
        for (let dy = -3; dy <= 3; dy++)
          if (dx * dx + dy * dy <= r * r) bark.add(`${Math.round(x + dx)},${Math.round(y + dy)}`);
    }
  }
  // Light bark on the top edge, dark bark below it.
  for (const key of bark) {
    const [x, y] = key.split(",").map(Number);
    set(x, y, bark.has(`${x},${y - 1}`) ? "bark" : "barkLt");
  }

  const bloom = (cx: number, cy: number) => {
    for (let y = 0; y < 5; y++)
      for (let x = 0; x < 5; x++) {
        const ch = FLOWER[y][x];
        if (ch !== ".") set(cx + x - 2, cy + y - 2, FLOWER_TONE[ch]);
      }
  };
  for (const [x, y] of SPOTS) bloom(x + Math.round(rnd() * 2 - 1), y + Math.round(rnd() * 2 - 1));

  // Buds and stray pixels.
  for (let i = 0; i < 26; i++) {
    const [x, y] = SPOTS[Math.floor(rnd() * SPOTS.length)];
    set(x + Math.round(rnd() * 8 - 4), y + Math.round(rnd() * 8 - 4), rnd() > 0.5 ? "sakura" : "sakuraDk");
  }
  return grid;
}

// One <path> per tone, merging each row's consecutive cells into a single run.
function toPaths(grid: Map<string, Tone>): [Tone, string][] {
  const byTone = new Map<Tone, [number, number][]>();
  for (const [key, tone] of grid) {
    const [x, y] = key.split(",").map(Number);
    if (!byTone.has(tone)) byTone.set(tone, []);
    byTone.get(tone)!.push([x, y]);
  }
  const out: [Tone, string][] = [];
  for (const [tone, cells] of byTone) {
    cells.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
    let d = "";
    for (let i = 0; i < cells.length; ) {
      const [x, y] = cells[i];
      let w = 1;
      while (i + w < cells.length && cells[i + w][1] === y && cells[i + w][0] === x + w) w++;
      d += `M${x} ${y}h${w}v1h-${w}z`;
      i += w;
    }
    out.push([tone, d]);
  }
  return out;
}

const PATHS = toPaths(rasterize());

export default function Branch() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute top-0 -right-[22vw] z-[1] h-auto w-[118vw] opacity-70 [shape-rendering:crispEdges] min-[760px]:right-0 min-[760px]:w-[min(760px,68vw)] min-[760px]:opacity-100"
    >
      <MoonPixels x={MOON_AT.x} y={MOON_AT.y} />
      {PATHS.map(([tone, d]) => (
        <path key={tone} className={TONE_CLASS[tone]} d={d} />
      ))}
    </svg>
  );
}
