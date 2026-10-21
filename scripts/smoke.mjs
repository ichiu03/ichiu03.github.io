#!/usr/bin/env node
// Smoke checks for the static export in out/. Plain Node, no dependencies.
// Usage: npm run build && npm test
// Checks are derived from the acceptance criteria in docs/vision.md.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
// SMOKE_OUT lets you point the checks at another export dir (used to sanity-check the checks).
const OUT = process.env.SMOKE_OUT ? process.env.SMOKE_OUT : join(ROOT, "out");
const INDEX = join(OUT, "index.html");

const results = [];
function check(name, fn) {
  try {
    const problems = fn() || [];
    results.push({ name, ok: problems.length === 0, problems });
  } catch (err) {
    results.push({ name, ok: false, problems: [`threw: ${err.message}`] });
  }
}

// ---------- helpers ----------
function walk(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) files.push(...walk(p));
    else files.push(p);
  }
  return files;
}

function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

// Visible-ish text: drop scripts, styles, comments, tags; decode; collapse whitespace.
function toText(html) {
  return decodeEntities(
    html
      .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

// All opening tags with their attributes.
function tags(html, tagName) {
  const re = new RegExp(`<${tagName}\\b([^>]*)>`, "gi");
  const list = [];
  let m;
  while ((m = re.exec(html))) list.push({ raw: m[0], attrs: parseAttrs(m[1]) });
  return list;
}

function parseAttrs(s) {
  const attrs = {};
  const re = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let m;
  while ((m = re.exec(s))) {
    attrs[m[1].toLowerCase()] = decodeEntities(m[2] ?? m[3] ?? m[4] ?? "");
  }
  return attrs;
}

function mask(s) {
  // Never print a full phone number: keep the shape, hide the digits after the first one.
  return s.replace(/\d/g, (d, i) => (i === 0 ? d : "#"));
}

// ---------- 1. build output exists ----------
check("1. out/index.html exists", () =>
  existsSync(INDEX) ? [] : [`missing ${INDEX} (run npm run build first)`],
);

if (!existsSync(INDEX)) {
  report();
  process.exit(1);
}

const html = readFileSync(INDEX, "utf8");
const text = toText(html);
const anchors = tags(html, "a");
const allIds = new Set(
  [...html.matchAll(/\sid\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)].map((m) => m[1] ?? m[2]),
);
const outFiles = walk(OUT);
const TEXT_EXT = new Set([".html", ".txt", ".js", ".css", ".json", ".svg", ".xml", ".map", ".webmanifest", ".md"]);

// ---------- 2. sections ----------
check("2. sections about/experience/projects/skills/contact + <footer>", () => {
  const problems = [];
  for (const id of ["about", "experience", "projects", "skills", "contact"]) {
    if (!allIds.has(id)) problems.push(`no element with id="${id}"`);
  }
  if (!/<footer\b/i.test(html)) problems.push("no <footer> element");
  return problems;
});

// ---------- 3. in-page links ----------
check("3. every href=\"#x\" targets an existing id", () => {
  const problems = [];
  const hrefs = [...html.matchAll(/\shref\s*=\s*"#([^"]*)"/gi)].map((m) => decodeEntities(m[1]));
  if (hrefs.length === 0) problems.push("no in-page links found (expected nav links)");
  for (const h of new Set(hrefs)) {
    if (h === "") problems.push('bare href="#" (points nowhere)');
    else if (!allIds.has(decodeURIComponent(h))) problems.push(`href="#${h}" has no matching id`);
  }
  return problems;
});

// ---------- 4. contact links ----------
check("4. contact: mailto, GitHub, LinkedIn; external <a> have rel noopener", () => {
  const problems = [];
  const hrefs = anchors.map((a) => a.attrs.href ?? "");
  const want = [
    "mailto:ivanchiu03@gmail.com",
    "https://github.com/ichiu03",
    "https://www.linkedin.com/in/ivan-chiu-32b87527b",
  ];
  for (const w of want) {
    if (!hrefs.some((h) => h.replace(/\/$/, "") === w)) problems.push(`no <a href="${w}">`);
  }
  for (const a of anchors) {
    const href = a.attrs.href ?? "";
    if (/^(https?:)?\/\//i.test(href)) {
      const rel = (a.attrs.rel ?? "").toLowerCase().split(/\s+/);
      if (!rel.includes("noopener")) problems.push(`external link ${href} lacks rel="noopener"`);
    }
  }
  return problems;
});

// ---------- 5. no phone numbers ----------
check("5. no phone number anywhere in out/", () => {
  const problems = [];
  // The user's number, in common formats.
  const own = /(?:\+?1[-. ]?)?\(?617\)?[-. ]?388[-. ]?7772/;
  // Generic US pattern, not embedded in a longer digit run.
  const generic = /(?<![\d.])\(?\d{3}[-. )]\s?\d{3}[-. ]\d{4}(?![\d])/g;
  for (const f of outFiles) {
    const rel = relative(OUT, f);
    const raw = readFileSync(f);
    const asText = raw.toString("latin1");
    if (own.test(asText)) problems.push(`${rel}: contains the user's phone number`);
    if (!TEXT_EXT.has(extname(f).toLowerCase())) continue;
    const content = raw.toString("utf8");
    for (const m of content.matchAll(generic)) {
      problems.push(`${rel}: phone-like pattern "${mask(m[0])}" at offset ${m.index}`);
    }
  }
  return problems;
});

// ---------- 6. no resume PDF ----------
check("6. no .pdf files in out/ and no .pdf links", () => {
  const problems = [];
  for (const f of outFiles) if (extname(f).toLowerCase() === ".pdf") problems.push(`file ${relative(OUT, f)}`);
  for (const f of outFiles.filter((f) => [".html", ".txt"].includes(extname(f)))) {
    const c = readFileSync(f, "utf8");
    for (const m of c.matchAll(/(?:href|src)\s*=\s*["']([^"']*\.pdf(?:[?#][^"']*)?)["']/gi)) {
      problems.push(`${relative(OUT, f)}: link to ${m[1]}`);
    }
  }
  return problems;
});

// ---------- 7. experience order ----------
check("7. experience: Claritas, Fidelity Investments, Decodables, Exsilio Solutions (in order)", () => {
  const start = html.search(/\sid\s*=\s*"experience"/i);
  if (start < 0) return ['no id="experience"'];
  const after = html.slice(start + 1);
  const next = after.search(/\sid\s*=\s*"(about|projects|skills|contact)"/i);
  const section = toText(next < 0 ? after : after.slice(0, next));
  const order = ["Claritas", "Fidelity Investments", "Decodables", "Exsilio Solutions"];
  const pos = order.map((n) => section.indexOf(n));
  const problems = order.filter((n, i) => pos[i] < 0).map((n) => `"${n}" not found in experience section`);
  if (problems.length) return problems;
  for (let i = 1; i < order.length; i++) {
    if (pos[i] < pos[i - 1]) problems.push(`"${order[i]}" appears before "${order[i - 1]}"`);
  }
  return problems;
});

// ---------- 8. key facts ----------
check("8. key facts: 10M+, 92%, $20K, Boston College, GPA 3.65", () =>
  ["10M+", "92%", "$20K", "Boston College", "GPA 3.65"]
    .filter((f) => !text.includes(f))
    .map((f) => `"${f}" not in page text`),
);

// ---------- 9. title + icon ----------
check('9. <title> is "Ivan Chiu · Software Engineer"; icon link present', () => {
  const problems = [];
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = m ? decodeEntities(m[1]).trim() : null;
  if (title !== "Ivan Chiu · Software Engineer") problems.push(`title is ${JSON.stringify(title)}`);
  const icons = tags(html, "link").filter((l) => /(^|\s)icon(\s|$)/i.test(l.attrs.rel ?? ""));
  if (icons.length === 0) problems.push('no <link rel="icon">');
  return problems;
});

// ---------- 10. no boilerplate ----------
check("10. no Next.js boilerplate leftovers", () => {
  const problems = [];
  for (const f of outFiles.filter((f) => [".html", ".txt"].includes(extname(f)))) {
    const c = readFileSync(f, "utf8");
    for (const s of ["Create Next App", "vercel.svg", "next.svg"]) {
      if (c.includes(s)) problems.push(`${relative(OUT, f)}: contains "${s}"`);
    }
  }
  for (const s of ["vercel.svg", "next.svg"]) if (existsSync(join(OUT, s))) problems.push(`file out/${s} exists`);
  return problems;
});

// ---------- 11. local assets resolve ----------
check("11. local src/href assets resolve to files in out/", () => {
  const problems = [];
  const refs = new Set();
  for (const m of html.matchAll(/\s(?:src|href)\s*=\s*"([^"]*)"/gi)) refs.add(decodeEntities(m[1]));
  for (const m of html.matchAll(/\ssrcset\s*=\s*"([^"]*)"/gi)) {
    for (const part of decodeEntities(m[1]).split(",")) refs.add(part.trim().split(/\s+/)[0]);
  }
  for (const ref of refs) {
    if (!ref.startsWith("/") || ref.startsWith("/#") || ref.startsWith("//")) continue;
    const path = decodeURIComponent(ref.split(/[?#]/)[0]);
    let target = join(OUT, path);
    if (path.endsWith("/")) target = join(target, "index.html");
    else if (!existsSync(target) && existsSync(target + ".html")) target += ".html";
    if (!existsSync(target) || statSync(target).isDirectory()) problems.push(`${ref} -> missing`);
  }
  return problems;
});

report();
process.exit(results.every((r) => r.ok) ? 0 : 1);

function report() {
  for (const r of results) {
    console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}`);
    for (const p of r.problems) console.log(`        - ${p}`);
  }
  const failed = results.filter((r) => !r.ok).length;
  console.log(`\n${results.length - failed} passed, ${failed} failed`);
}
