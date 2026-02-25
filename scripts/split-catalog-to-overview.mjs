#!/usr/bin/env node
/**
 * Splits agent-skills-full-catalog.md into one overview.md per skill folder.
 * Run from repo root: node scripts/split-catalog-to-overview.mjs
 */

import fs from "fs/promises";
import path from "path";

const REPO_ROOT = path.resolve(process.cwd());
const CATALOG_PATH = path.join(REPO_ROOT, "agent-skills-full-catalog.md");
const SKILLS_DIR = path.join(REPO_ROOT, "skills");

/** Catalog section title (normalized) -> skill folder path in this repo */
const CATALOG_TITLE_TO_PATH = {
  "Selenium Skill": "selenium-automation-skill",
  "Playwright Skill": "playwright-automation-skill",
  "Cypress Skill": "cypress-automation-skill",
  "WebdriverIO Skill": "webdriverio-automation-skill",
  "Puppeteer Skill": "puppeteer-automation-skill",
  "TestCafe Skill": "testcafe-automation-skill",
  "Nightwatch.js Skill": "nightwatchjs-automation-skill",
  "Capybara Skill": "capybara-automation-skill",
  "Geb Skill": "geb-automation-skill",
  "Selenide Skill": "selenide-automation-skill",
  "Nemo.js Skill": "nemojs-automation-skill",
  "Protractor Skill": "protractor-automation-skill",
  "Codeception Skill": "codeception-testing-skill",
  "Laravel Dusk Skill": "laravel-dusk-skill",
  "Robot Framework Skill": "robot-framework-skill",
  "Jest Skill": "jest-testing-skill",
  "JUnit 5 Skill": "junit-testing-skill",
  "pytest Skill": "pytest-testing-skill",
  "TestNG Skill": "testng-testing-skill",
  "Vitest Skill": "vitest-testing-skill",
  "Mocha Skill": "mocha-testing-skill",
  "Jasmine Skill": "jasmine-testing-skill",
  "Karma Skill": "karma-testing-skill",
  "xUnit Skill": "xunit-testing-skill",
  "NUnit Skill": "nunit-testing-skill",
  "MSTest Skill": "mstest-testing-skill",
  "RSpec Skill": "rspec-testing-skill",
  "PHPUnit Skill": "phpunit-testing-skill",
  "Test::Unit Skill": "testunit-ruby-skill",
  "unittest Skill": "unittest-testing-skill",
  "Appium Skill": "appium-automation-skill",
  "Espresso Skill": "espresso-automation-skill",
  "XCUITest Skill": "xcuitest-automation-skill",
  "Flutter Testing Skill": "flutter-testing-skill",
  "Detox Skill": "detox-automation-skill",
  "Cucumber Skill": "cucumber-automation-skill",
  "SpecFlow Skill": "specflow-automation-skill",
  "Serenity BDD Skill": "serenity-bdd-skill",
  "Behave Skill": "behave-automation-skill",
  "Behat Skill": "behat-automation-skill",
  "Gauge Skill": "gauge-automation-skill",
  "Lettuce Skill": "lettuce-testing-skill",
  "SmartUI Skill": "smartui-testing-skill",
  "HyperExecute Skill": "hyperexecute-skill",
  "CI/CD Pipeline Skill": "cicd-pipeline-skill",
  // Test Framework Migration Skill has no folder in this repo — skipped
};

function normalizeCatalogTitle(firstLine) {
  const match = firstLine.match(/^###\s+\d+\.\s+(.+)$/);
  if (!match) return null;
  let title = match[1].trim();
  const warn = title.indexOf(" ⚠️");
  if (warn >= 0) title = title.slice(0, warn).trim();
  return title;
}

async function main() {
  const raw = await fs.readFile(CATALOG_PATH, "utf-8");

  // Split by skill headings (### N. Skill Name) so each block is one skill.
  // Some sections are separated by ---, others only by blank lines.
  const blocks = raw
    .split(/\n(?=### \d+\. )/m)
    .map((b) => b.trim())
    .filter((b) => b.length > 0 && b.startsWith("### "));

  let written = 0;
  let skipped = 0;

  for (const block of blocks) {
    const lines = block.split("\n");
    const firstLine = lines[0];
    if (!firstLine.startsWith("### ")) continue;

    const title = normalizeCatalogTitle(firstLine);
    if (!title) continue;

    const skillPath = CATALOG_TITLE_TO_PATH[title];
    if (!skillPath) {
      console.warn(`No path for catalog section: "${title}" — skipped`);
      skipped++;
      continue;
    }

    const bodyLines = lines.slice(1);
    const body = bodyLines.join("\n").trim();

    const outDir = path.join(SKILLS_DIR, skillPath);
    try {
      await fs.access(outDir);
    } catch {
      console.warn(`Skill folder not found: ${skillPath} — skipped`);
      skipped++;
      continue;
    }

    const outPath = path.join(outDir, "overview.md");
    await fs.writeFile(outPath, body + "\n", "utf-8");
    written++;
  }

  console.log(`Wrote ${written} overview.md files. Skipped ${skipped} sections.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
