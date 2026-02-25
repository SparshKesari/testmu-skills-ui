#!/usr/bin/env node
/**
 * Migrates all skills from the GitHub repo into the local skills/ folder.
 * Fetches skills_index.json and each skill's SKILL.md + reference files (playbook, advanced-patterns, cloud-integration).
 * Run from project root: node scripts/seed-skills-from-github.mjs
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const SKILLS_DIR = path.join(PROJECT_ROOT, "skills");

const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/SparshKesari/testmu-skills/main";
const INDEX_URL = `${GITHUB_RAW_BASE}/skills_index.json`;

function getRefDocType(refPath) {
  if (refPath.includes("playbook.md")) return "playbook.md";
  if (refPath.includes("advanced-patterns.md")) return "advanced-patterns.md";
  if (refPath.includes("cloud-integration.md")) return "cloud-integration.md";
  return null;
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.text();
}

async function main() {
  console.log("Fetching skills index from GitHub...");
  const indexRaw = await fetchText(INDEX_URL);
  if (!indexRaw) {
    console.error("Failed to fetch skills_index.json from", INDEX_URL);
    process.exit(1);
  }

  const index = JSON.parse(indexRaw);
  const skills = index.skills || [];
  console.log(`Found ${skills.length} skills. Writing index.json and skill files...`);

  await fs.mkdir(SKILLS_DIR, { recursive: true });
  await fs.writeFile(path.join(SKILLS_DIR, "index.json"), JSON.stringify(index, null, 2), "utf-8");
  console.log("Wrote skills/index.json");

  for (const skill of skills) {
    const skillPath = path.join(SKILLS_DIR, skill.path);
    await fs.mkdir(skillPath, { recursive: true });

    const skillMdUrl = `${GITHUB_RAW_BASE}/${skill.path}/SKILL.md`;
    const skillMd = await fetchText(skillMdUrl);
    if (skillMd) {
      await fs.writeFile(path.join(skillPath, "SKILL.md"), skillMd, "utf-8");
      console.log(`  ${skill.path}: SKILL.md`);
    } else {
      console.warn(`  ${skill.path}: SKILL.md not found (${skillMdUrl})`);
    }

    const refs = skill.files?.reference || [];
    for (const ref of refs) {
      const filename = getRefDocType(ref);
      if (!filename) continue;
      const refUrl = `${GITHUB_RAW_BASE}/${ref}`;
      const content = await fetchText(refUrl);
      if (content) {
        await fs.writeFile(path.join(skillPath, filename), content, "utf-8");
        console.log(`  ${skill.path}: ${filename}`);
      }
    }
  }

  console.log("Done. skills/ is populated from GitHub.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
