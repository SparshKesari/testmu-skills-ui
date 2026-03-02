#!/usr/bin/env node
/**
 * Normalize SVGs from public/skill-icons/updated/ to single color (currentColor)
 * so they match the existing [filter:brightness(0)_invert(1)] used in SkillLogo.
 * Output: public/skill-icons/{slug}.svg
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const updatedDir = path.join(root, "public/skill-icons/updated");
const outDir = path.join(root, "public/skill-icons");

const FILE_MAP = [
  ["Behat.svg", "behat"],
  ["behave.svg", "behave"],
  ["hyperexecute.svg", "hyperexecute"],
  ["Jasmine.svg", "jasmine"],
  ["Xunit.svg", "xunit"],
  ["XCUITest.svg", "xcuitest"],
  ["Selenide.svg", "selenide"],
  ["Nigthwatch JS.svg", "nightwatch"],
  ["karma.svg", "karma"],
  ["Junit 5.svg", "junit"],
  ["Geb.svg", "geb"],
  ["gauge.svg", "gauge"],
  ["Codeception.svg", "codeception"],
  ["Capybara.svg", "capybara"],
];

/** Heuristic: is this hex/rgb a "light" color that should become transparent (cutout)? */
function isLightColor(value) {
  if (!value) return false;
  const v = value.trim();
  const hex6 = /^#([0-9a-fA-F]{6})$/.exec(v);
  if (hex6) {
    const r = parseInt(hex6[1].slice(0, 2), 16) / 255;
    const g = parseInt(hex6[1].slice(2, 4), 16) / 255;
    const b = parseInt(hex6[1].slice(4, 6), 16) / 255;
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance >= 0.72;
  }
  const hex3 = /^#([0-9a-fA-F]{3})$/.exec(v);
  if (hex3) {
    const r = (parseInt(hex3[1][0], 16) * 17) / 255;
    const g = (parseInt(hex3[1][1], 16) * 17) / 255;
    const b = (parseInt(hex3[1][2], 16) * 17) / 255;
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance >= 0.72;
  }
  return false;
}

function normalizeSvg(content) {
  // Remove style attributes first so we only consider fill="" and stroke="" on elements
  let out = content.replace(/\s+style="[^"]*"/g, "");
  // Replace fill="url(#...)" with fill="currentColor" (gradients → solid)
  out = out.replace(/\bfill="url\([^)]+\)"/g, 'fill="currentColor"');
  out = out.replace(/\bstop-color="[^"]*"/g, 'stop-color="currentColor"');

  // Per-fill: light colors → transparent (cutout), others → black (so <img> + invert filter = white)
  out = out.replace(/\bfill="([^"]*)"/g, (_, val) => {
    if (isLightColor(val)) return 'fill="none"';
    return 'fill="#000000"';
  });
  // Strokes: same logic
  out = out.replace(/\bstroke="([^"]*)"/g, (_, val) => {
    if (isLightColor(val)) return 'stroke="none"';
    return 'stroke="#000000"';
  });
  // Remove <defs>...</defs>
  out = out.replace(/<defs>[\s\S]*?<\/defs>/g, "");
  return out;
}

for (const [filename, slug] of FILE_MAP) {
  const srcPath = path.join(updatedDir, filename);
  if (!fs.existsSync(srcPath)) {
    console.warn("Skip (not found):", filename);
    continue;
  }
  const content = fs.readFileSync(srcPath, "utf8");
  const normalized = normalizeSvg(content);
  const outPath = path.join(outDir, `${slug}.svg`);
  fs.writeFileSync(outPath, normalized, "utf8");
  console.log("OK", slug);
}

console.log("Done.");
