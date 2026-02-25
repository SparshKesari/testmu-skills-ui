import type { Skill, SkillsIndex } from "./types";
import { parseSkillDescription } from "./parseDescription";
import {
  parseMarkdownSections,
  takeSections,
} from "./parseSkillMarkdown";
import { sortSkillsWithHotFirst, toSkillSlug } from "./skillsHelpers";
import { getSkillsIndexFromFs, getSkillMarkdownFromFs, getOverviewMarkdownFromFs, getExistingOptionalDocTypes } from "./skillsFs";

export { getSkillDisplayName, isHotSkill, toSkillSlug } from "./skillsHelpers";

export async function getSkillsIndex(): Promise<SkillsIndex> {
  return getSkillsIndexFromFs();
}

export async function getSkills(): Promise<Skill[]> {
  const index = await getSkillsIndex();
  return sortSkillsWithHotFirst(index.skills);
}

export async function getSkillByPath(path: string): Promise<Skill | null> {
  const skills = await getSkills();
  return skills.find((s) => s.path === path) ?? null;
}

/** Resolve URL slug (short or full path) to skill. Use for [slug] routes. */
export async function getSkillBySlug(slug: string): Promise<Skill | null> {
  const byPath = await getSkillByPath(slug);
  if (byPath) return byPath;
  const skills = await getSkills();
  return skills.find((s) => toSkillSlug(s.path) === slug) ?? null;
}

export async function getCategories(): Promise<string[]> {
  const index = await getSkillsIndex();
  return index.categories ?? [];
}

export async function getLanguages(): Promise<string[]> {
  const skills = await getSkills();
  const set = new Set<string>();
  for (const s of skills) {
    for (const lang of s.languages ?? []) set.add(lang);
  }
  return Array.from(set).sort();
}

export async function getSkillMarkdown(
  slug: string,
  docType: "skill" | "playbook" | "advanced-patterns" | "cloud-integration"
): Promise<string | null> {
  const skill = await getSkillBySlug(slug);
  if (!skill) return null;
  return getSkillMarkdownFromFs(skill.path, docType);
}

/** Returns overview markdown from overview.md when present (catalog-derived content). */
export async function getSkillOverviewMarkdown(
  slug: string
): Promise<string | null> {
  const skill = await getSkillBySlug(slug);
  if (!skill) return null;
  return getOverviewMarkdownFromFs(skill.path);
}

/** Returns doc types for which a file exists in the skill directory. Overview (skill) always included; other tabs only if the file exists. */
export async function getAvailableDocTypes(
  skill: Skill
): Promise<("skill" | "playbook" | "advanced-patterns" | "cloud-integration")[]> {
  const optional = await getExistingOptionalDocTypes(skill.path);
  return ["skill", ...optional];
}

const GITHUB_REPO = "https://github.com/LambdaTest/agent-skills.git";
const GITHUB_REPO_BROWSE = "https://github.com/LambdaTest/agent-skills";

/** Map our skill path (index) to LambdaTest/agent-skills folder name for npx and GitHub links. */
const OUR_PATH_TO_LAMBDATEST_SKILL: Record<string, string> = {
  "appium-automation-skill": "appium-skill",
  "behat-automation-skill": "behat-skill",
  "behave-automation-skill": "behave-skill",
  "capybara-automation-skill": "capybara-skill",
  "cicd-pipeline-skill": "cicd-pipeline-skill",
  "codeception-testing-skill": "codeception-skill",
  "cucumber-automation-skill": "cucumber-skill",
  "cypress-automation-skill": "cypress-skill",
  "detox-automation-skill": "detox-skill",
  "espresso-automation-skill": "espresso-skill",
  "flutter-testing-skill": "flutter-testing-skill",
  "gauge-automation-skill": "gauge-skill",
  "geb-automation-skill": "geb-skill",
  "hyperexecute-skill": "hyperexecute-skill",
  "jasmine-testing-skill": "jasmine-skill",
  "jest-testing-skill": "jest-skill",
  "junit-testing-skill": "junit-5-skill",
  "karma-testing-skill": "karma-skill",
  "laravel-dusk-skill": "laravel-dusk-skill",
  "lettuce-testing-skill": "lettuce-skill",
  "mocha-testing-skill": "mocha-skill",
  "mstest-testing-skill": "mstest-skill",
  "nemojs-automation-skill": "nemojs-skill",
  "nightwatchjs-automation-skill": "nightwatchjs-skill",
  "nunit-testing-skill": "nunit-skill",
  "phpunit-testing-skill": "phpunit-skill",
  "playwright-automation-skill": "playwright-skill",
  "protractor-automation-skill": "protractor-skill",
  "puppeteer-automation-skill": "puppeteer-skill",
  "pytest-testing-skill": "pytest-skill",
  "robot-framework-skill": "robot-framework-skill",
  "rspec-testing-skill": "rspec-skill",
  "selenide-automation-skill": "selenide-skill",
  "selenium-automation-skill": "selenium-skill",
  "serenity-bdd-skill": "serenity-bdd-skill",
  "smartui-testing-skill": "smartui-skill",
  "specflow-automation-skill": "specflow-skill",
  "testcafe-automation-skill": "testcafe-skill",
  "testng-testing-skill": "testng-skill",
  "testunit-ruby-skill": "testunit-skill",
  "unittest-testing-skill": "unittest-skill",
  "vitest-testing-skill": "vitest-skill",
  "webdriverio-automation-skill": "webdriverio-skill",
  "xcuitest-automation-skill": "xcuitest-skill",
  "xunit-testing-skill": "xunit-skill",
};

function toLambdaTestSkillName(ourPath: string): string {
  return OUR_PATH_TO_LAMBDATEST_SKILL[ourPath] ?? ourPath;
}

export function getGitHubSkillUrl(path: string): string {
  const skillName = toLambdaTestSkillName(path);
  return `${GITHUB_REPO_BROWSE}/tree/main/${skillName}`;
}

/** npx install command for a skill (Copy and Paste in your Terminal). Uses LambdaTest/agent-skills naming. */
export function getSkillInstallCommand(skillPath: string): string {
  const skillName = toLambdaTestSkillName(skillPath);
  return `npx skills add ${GITHUB_REPO} --skill ${skillName}`;
}

/** Extract first http(s) URL from text (e.g. overview markdown). */
function extractFirstUrl(text: string): string | null {
  const match = text.match(/https?:\/\/[^\s)\]">]+/);
  return match ? match[0] : null;
}

/** Remove the **One-liner:** line from overview markdown (hidden from Overview tab). */
export function stripOverviewOneLiner(markdown: string): string {
  return markdown
    .replace(/\*\*One-liner:\*\*[^\n]*\n?/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Remove the **URL:** line (and the URL line if on next line) from overview markdown; collapse extra newlines. */
export function stripOverviewUrlBlock(markdown: string, url: string): string {
  const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Same line: **URL:** optional space and rest of line including url
  const sameLine = new RegExp(`\\*\\*URL:\\*\\*[^\\n]*${escaped}[^\\n]*\\n?`, "g");
  let out = markdown.replace(sameLine, "");
  // Next line: **URL:** then newline then line containing url
  const nextLine = new RegExp(`\\*\\*URL:\\*\\*\\s*\\n\\s*[^\\n]*${escaped}[^\\n]*\\n?`, "g");
  out = out.replace(nextLine, "");
  // Also remove any standalone line that only contains the url (e.g. raw URL on its own line)
  const urlOnlyLine = new RegExp(`^\\s*[^\\n]*${escaped}[^\\n]*\\s*\\n?`, "gm");
  out = out.replace(urlOnlyLine, "");
  // Collapse 3+ newlines to 2 so we don't leave a big gap
  return out.replace(/\n{3,}/g, "\n\n").trim();
}

/** README-style sections for a skill: overview, how to use, samples, advanced */
export interface SkillReadmeSections {
  overview: { whatItDoes: string; whenToUse: string[]; triggers: string[] };
  /** Catalog-derived overview markdown when overview.md exists; null otherwise */
  overviewMarkdown: string | null;
  /** First URL from overview (for copy block above tabs); fallback from getGitHubSkillUrl when no overview */
  overviewUrl: string;
  howToUse: string | null; // markdown
  samples: { title: string; content: string }[]; // from playbook, first sections
  advancedSamples: string | null; // markdown from advanced-patterns or later playbook
  fullSkillMd: string;
  hasPlaybook: boolean;
  hasAdvanced: boolean;
  hasCloud: boolean;
}

const SAMPLE_SECTIONS_COUNT = 4; // first N playbook sections as "Samples"

export async function getSkillReadmeSections(
  slug: string
): Promise<SkillReadmeSections | null> {
  const skill = await getSkillBySlug(slug);
  if (!skill) return null;

  const [skillMd, playbookMd, advancedMd, overviewMd] = await Promise.all([
    getSkillMarkdown(slug, "skill"),
    getSkillMarkdown(slug, "playbook").catch(() => null),
    getSkillMarkdown(slug, "advanced-patterns").catch(() => null),
    getOverviewMarkdownFromFs(skill.path).catch(() => null),
  ]);

  const overview = parseSkillDescription(skill.description);
  const docTypes = await getAvailableDocTypes(skill);
  const hasPlaybook = docTypes.includes("playbook");
  const hasAdvanced = docTypes.includes("advanced-patterns");
  const hasCloud = docTypes.includes("cloud-integration");

  let howToUse: string | null = null;
  if (skillMd) {
    const skillSections = parseMarkdownSections(skillMd);
    const intro = skillSections.find((s) => s.title === "Introduction");
    const first = skillSections[0];
    howToUse = intro?.content ?? (first ? `${first.content.slice(0, 2000)}${first.content.length > 2000 ? "…" : ""}` : null);
  }

  let samples: { title: string; content: string }[] = [];
  if (playbookMd) {
    const playbookSections = parseMarkdownSections(playbookMd);
    const firstSections = takeSections(playbookSections, SAMPLE_SECTIONS_COUNT, 200);
    samples = firstSections.map((s) => ({ title: s.title, content: s.content }));
  }

  const overviewUrl =
    (overviewMd ? extractFirstUrl(overviewMd) : null) ??
    getGitHubSkillUrl(skill.path);

  return {
    overview,
    overviewMarkdown: overviewMd ?? null,
    overviewUrl,
    howToUse,
    samples,
    advancedSamples: advancedMd ?? null,
    fullSkillMd: skillMd ?? "",
    hasPlaybook,
    hasAdvanced,
    hasCloud,
  };
}

/** URL to show in "Copy and Paste in your Terminal" block (first link from overview or GitHub skill URL). */
export async function getSkillOverviewUrl(slug: string): Promise<string> {
  const skill = await getSkillBySlug(slug);
  if (!skill) return getGitHubSkillUrl(slug);
  const overviewMd = await getOverviewMarkdownFromFs(skill.path).catch(() => null);
  return (overviewMd ? extractFirstUrl(overviewMd) : null) ?? getGitHubSkillUrl(skill.path);
}
