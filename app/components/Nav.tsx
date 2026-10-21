"use client";

import { useEffect, useState } from "react";

// Site navigation, ported from mockup C: hanko seal + name on the left, pixel
// links on the right. It overlays the top of the hero (absolute, not sticky),
// so the sakura branch reaches the top of the page behind it. Below 760px the
// links collapse into a Menu toggle.

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-sakura";

// Pixel-chipped corners, like a worn stamp.
const SEAL_CLIP =
  "polygon(3px 0, calc(100% - 3px) 0, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0 calc(100% - 3px), 0 3px)";

function Seal() {
  return (
    <span
      aria-hidden="true"
      className="inline-grid size-[30px] flex-none place-items-center bg-vermilion text-center font-pixel text-[17px] leading-[.8] text-ink"
      style={{ clipPath: SEAL_CLIP }}
    >
      <span className="block">
        I<br />C
      </span>
    </span>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <nav
        aria-label="Primary"
        className="relative mx-auto flex max-w-[1080px] items-center justify-between gap-4 px-4 py-7 sm:px-8"
      >
        <a
          href="#about"
          className={`flex items-center gap-3 font-pixel text-[26px] leading-none tracking-[.04em] text-washi ${FOCUS}`}
        >
          <Seal />
          Ivan Chiu
        </a>

        <ul className="hidden list-none gap-[clamp(14px,3vw,32px)] font-pixel text-[22px] leading-none min-[760px]:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`bg-ink/75 px-1.5 py-1 text-mist transition-colors hover:text-washi ${FOCUS}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen((o) => !o)}
          className={`cursor-pointer border border-line bg-ink/80 px-3 pt-1.5 pb-1 font-pixel text-[22px] leading-none text-washi min-[760px]:hidden ${FOCUS}`}
        >
          {open ? "Close" : "Menu"}
        </button>

        <ul
          id="nav-menu"
          hidden={!open}
          className="absolute inset-x-4 top-full list-none border border-line bg-ink-raised py-2 font-pixel text-2xl leading-none sm:inset-x-8 min-[760px]:hidden"
        >
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 text-mist transition-colors hover:text-washi ${FOCUS}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
