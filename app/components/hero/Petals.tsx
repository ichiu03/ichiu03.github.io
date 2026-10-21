"use client";

import type { CSSProperties } from "react";
import { useSyncExternalStore } from "react";
import { seededRandom } from "./rng";

// Falling pixel petals near the branch (mockup C). Positions come from a fixed
// seed, so server and client render the same markup. The server (and anyone
// with reduced motion) gets petals scattered and still; once hydrated with
// motion allowed, they fall from the top on a loop.

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const getReduced = () => window.matchMedia(REDUCED_MOTION).matches;
const getServerReduced = () => true;

const round = (n: number, places = 2) => Number(n.toFixed(places));

type Petal = {
  size: number;
  left: number; // % of hero width, biased toward the branch side
  top: number; // % of hero height, used only when still
  drift: number; // px of sideways drift mid-fall
  duration: number; // s
  delay: number; // s, negative so the loop starts mid-fall
};

const PETALS: Petal[] = (() => {
  const rnd = seededRandom(11);
  return Array.from({ length: 11 }, () => ({
    size: 6 + Math.round(rnd() * 6),
    left: round(38 + rnd() * 60),
    top: round(rnd() * 70),
    drift: round(-60 - rnd() * 120),
    duration: round(11 + rnd() * 9),
    delay: round(-rnd() * 18),
  }));
})();

const KEYFRAMES = `@keyframes hero-petal-fall {
  0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
  8% { opacity: .9; }
  50% { transform: translate(var(--drift), 46vh) rotate(180deg); }
  92% { opacity: .8; }
  100% { transform: translate(calc(var(--drift) * -0.4), 92vh) rotate(360deg); opacity: 0; }
}`;

export default function Petals() {
  const reduced = useSyncExternalStore(subscribe, getReduced, getServerReduced);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2]">
      {!reduced && <style>{KEYFRAMES}</style>}
      {PETALS.map((p, i) => {
        const style: CSSProperties & { "--drift": string } = {
          "--drift": `${p.drift}px`,
          left: `${p.left}%`,
          width: p.size,
          height: Math.round(p.size * 0.75),
          ...(reduced
            ? { top: `${p.top}%`, opacity: 0.75 }
            : {
                top: -12,
                opacity: 0.9,
                animation: `hero-petal-fall ${p.duration}s linear ${p.delay}s infinite`,
              }),
        };
        return (
          <svg
            key={i}
            viewBox="0 0 4 3"
            focusable="false"
            className="absolute block [shape-rendering:crispEdges]"
            style={style}
          >
            <rect x="1" y="0" width="2" height="1" className="fill-sakura-lt" />
            <rect x="0" y="1" width="4" height="1" className="fill-sakura" />
            <rect x="1" y="2" width="2" height="1" className="fill-sakura-dk" />
          </svg>
        );
      })}
    </div>
  );
}
