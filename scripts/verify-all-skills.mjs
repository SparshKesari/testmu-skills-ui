#!/usr/bin/env node
/**
 * Verifies all skills have expected tab content. Run from repo root: node scripts/verify-all-skills.mjs
 */

import fs from "fs/promises";
import path from "path";

const SKILLS_DIR = path.join(process.cwd(), "skills");
const INDEX_PATH = path.join(SKILLS_DIR, "index.json");

const FILES = [
  { key: "Overview", file: "overview.md" },
  { key: "Documentation", file: "SKILL.md" },
  { key: "Playbook", file: "playbook.md" },
  { key: "Advanced patterns", file: "advanced-patterns.md" },
  { key: "Cloud integration", file: "cloud-integration.md" },
];

async function main() {
  const indexRaw = await fs.readFile(INDEX_PATH, "utf-8");
  const index = JSON.parse(indexRaw);
  const skills = index.skills || [];
  const report = { ok: [], missing: [], short: [], empty: [] };

  for (const skill of skills) {
    const skillPath = skill.path;
    const dir = path.join(SKILLS_DIR, skillPath);
    const row = { path: skillPath, tabs: {} };

    try {
      await fs.access(dir);
    } catch {
      report.missing.push({ path: skillPath, error: "directory missing" });
      continue;
    }

    for (const { key, file } of FILES) {
      const filePath = path.join(dir, file);
      let size = 0;
      try {
        const content = await fs.readFile(filePath, "utf-8");
        size = content.trim().length;
      } catch {
        row.tabs[key] = "MISSING";
        continue;
      }
      if (size === 0) row.tabs[key] = "EMPTY";
      else if (size < 100) row.tabs[key] = `SHORT (${size} chars)`;
      else row.tabs[key] = `ok (${size} chars)`;
    }

    const coreTabs = ["Overview", "Documentation", "Playbook", "Advanced patterns"];
    const coreMissing = coreTabs.some((t) => row.tabs[t] === "MISSING");
    const cloudMissing = row.tabs["Cloud integration"] === "MISSING";
    const hasEmpty = Object.values(row.tabs).some((v) => v === "EMPTY");
    const hasShort = Object.values(row.tabs).some((v) => typeof v === "string" && v.startsWith("SHORT"));
    if (coreMissing) report.missing.push(row);
    else if (hasEmpty || hasShort) report.short.push(row);
    else report.ok.push(row);
    if (cloudMissing) row.cloudMissing = true;
  }

  console.log("=== Skills with missing CORE tab content (Overview, Documentation, Playbook, Advanced patterns) ===\n");
  if (report.missing.length === 0) {
    console.log("None. All 45 skills have Overview, Documentation, Playbook, and Advanced patterns.\n");
  } else {
    for (const r of report.missing) {
      console.log(r.path);
      if (r.tabs) for (const [tab, status] of Object.entries(r.tabs)) console.log(`  ${tab}: ${status}`);
      else console.log("  ", r.error);
      console.log();
    }
  }

  console.log("=== Skills with empty or very short content (< 100 chars) ===\n");
  if (report.short.length === 0) {
    console.log("None.\n");
  } else {
    for (const r of report.short) {
      console.log(r.path);
      for (const [tab, status] of Object.entries(r.tabs)) console.log(`  ${tab}: ${status}`);
      console.log();
    }
  }

  console.log("=== All 45 skills — tab content status (for manual check) ===");
  const all = [...report.ok, ...report.short, ...report.missing.filter((r) => r.tabs)];
  all.sort((a, b) => a.path.localeCompare(b.path));
  for (const r of all) {
    const parts = [r.path];
    for (const { key } of FILES) parts.push(r.tabs[key] || "?");
    console.log(parts.join(" | "));
  }

  console.log("\n=== Summary ===");
  console.log(`Core tabs OK (Overview, Documentation, Playbook, Advanced patterns): ${report.ok.length + report.short.length}`);
  console.log(`Missing core tab file(s): ${report.missing.length}`);
  console.log(`Empty/short content (< 100 chars): ${report.short.length}`);
  console.log(`Total skills: ${skills.length}`);
  console.log("\nNote: Cloud integration is intentionally missing for unit-testing, BDD, and some other skills; only E2E/browser/mobile skills have it.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
