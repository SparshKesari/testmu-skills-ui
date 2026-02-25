#!/usr/bin/env node
/**
 * Adds missing advanced-patterns.md (and optionally other files) to skills that don't have them.
 * Run from repo root: node scripts/add-missing-skill-files.mjs
 */

import fs from "fs/promises";
import path from "path";

const SKILLS_DIR = path.join(process.cwd(), "skills");
const INDEX_PATH = path.join(SKILLS_DIR, "index.json");

function pathToDisplayName(pathName) {
  const overrides = {
    "cicd-pipeline-skill": "CI/CD Pipeline",
    "junit-testing-skill": "JUnit 5",
    "pytest-testing-skill": "pytest",
    "webdriverio-automation-skill": "WebdriverIO",
    "nightwatchjs-automation-skill": "Nightwatch.js",
    "xcuitest-automation-skill": "XCUITest",
    "testcafe-automation-skill": "TestCafe",
    "xunit-testing-skill": "xUnit",
    "mstest-testing-skill": "MSTest",
    "phpunit-testing-skill": "PHPUnit",
    "nemojs-automation-skill": "Nemo.js",
    "serenity-bdd-skill": "Serenity BDD",
    "smartui-testing-skill": "SmartUI",
    "specflow-automation-skill": "SpecFlow",
    "testunit-ruby-skill": "Test::Unit",
    "unittest-testing-skill": "unittest",
    "hyperexecute-skill": "HyperExecute",
  };
  if (overrides[pathName]) return overrides[pathName];
  const base = pathName
    .replace(/-automation-skill$/i, "")
    .replace(/-testing-skill$/i, "")
    .replace(/-skill$/i, "");
  return base.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const ADVANCED_PATTERNS_PLACEHOLDER = (displayName) => `# Advanced patterns

This section covers advanced topics and patterns for **${displayName}**. Content is being expanded.

For implementation details and code samples, see the **Playbook** tab. For full skill reference, see the **Documentation** tab.
`;

async function main() {
  const indexRaw = await fs.readFile(INDEX_PATH, "utf-8");
  const index = JSON.parse(indexRaw);
  const skills = index.skills || [];
  let added = 0;

  for (const skill of skills) {
    const skillPath = skill.path;
    const dir = path.join(SKILLS_DIR, skillPath);
    const advancedPath = path.join(dir, "advanced-patterns.md");

    try {
      await fs.access(advancedPath);
    } catch {
      try {
        await fs.access(dir);
      } catch {
        console.warn(`Skip (no dir): ${skillPath}`);
        continue;
      }
      const displayName = pathToDisplayName(skillPath);
      const content = ADVANCED_PATTERNS_PLACEHOLDER(displayName);
      await fs.writeFile(advancedPath, content + "\n", "utf-8");
      console.log(`Added advanced-patterns.md: ${skillPath}`);
      added++;
    }
  }

  console.log(`\nAdded ${added} advanced-patterns.md file(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
