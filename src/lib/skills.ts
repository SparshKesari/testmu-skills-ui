import matter from "gray-matter";
import type { Skill, SkillsIndex } from "./types";
import { parseSkillDescription } from "./parseDescription";
import {
  parseMarkdownSections,
  takeSections,
} from "./parseSkillMarkdown";

/**
 * Display names per testmu-skills README Full Skill Registry.
 * Overrides for acronyms, casing (pytest, unittest), and special names (Test::Unit, CI/CD, etc.)
 */
const SKILL_DISPLAY_NAME_OVERRIDES: Record<string, string> = {
  "cicd-pipeline-skill": "CI/CD Pipeline Skill",
  "junit-testing-skill": "JUnit 5 Skill",
  "pytest-testing-skill": "pytest Skill",
  "webdriverio-automation-skill": "WebdriverIO Skill",
  "nightwatchjs-automation-skill": "Nightwatch.js Skill",
  "xcuitest-automation-skill": "XCUITest Skill",
  "testcafe-automation-skill": "TestCafe Skill",
  "xunit-testing-skill": "xUnit Skill",
  "mstest-testing-skill": "MSTest Skill",
  "phpunit-testing-skill": "PHPUnit Skill",
  "nemojs-automation-skill": "Nemo.js Skill",
  "serenity-bdd-skill": "Serenity BDD Skill",
  "smartui-testing-skill": "SmartUI Skill",
  "specflow-automation-skill": "SpecFlow Skill",
  "testunit-ruby-skill": "Test::Unit Skill",
  "unittest-testing-skill": "unittest Skill",
  "hyperexecute-skill": "HyperExecute Skill",
};

/**
 * Display name for a skill per testmu-skills README: "{Framework} Skill"
 * e.g. cucumber-automation-skill → "Cucumber Skill", jest-testing-skill → "Jest Skill"
 */
export function getSkillDisplayName(pathOrName: string): string {
  const override = SKILL_DISPLAY_NAME_OVERRIDES[pathOrName];
  if (override) return override;
  const base = pathOrName
    .replace(/-automation-skill$/i, "")
    .replace(/-testing-skill$/i, "")
    .replace(/-skill$/i, "");
  const title = base.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return title ? `${title} Skill` : pathOrName;
}

/** Most popular / important skills — shown first and marked as Hot */
const HOT_SKILL_PATHS = [
  "selenium-automation-skill",
  "playwright-automation-skill",
  "appium-automation-skill",
  "test-framework-migration-skill",
] as const;

export function isHotSkill(skillPath: string): boolean {
  return HOT_SKILL_PATHS.includes(skillPath as (typeof HOT_SKILL_PATHS)[number]);
}

/** Sort skills: hot ones first (in HOT_SKILL_PATHS order), then rest by display name */
export function sortSkillsWithHotFirst(skills: Skill[]): Skill[] {
  const order = new Map(HOT_SKILL_PATHS.map((p, i) => [p, i]));
  return [...skills].sort((a, b) => {
    const aHot = order.get(a.path);
    const bHot = order.get(b.path);
    if (aHot !== undefined && bHot !== undefined) return aHot - bHot;
    if (aHot !== undefined) return -1;
    if (bHot !== undefined) return 1;
    return getSkillDisplayName(a.path).localeCompare(getSkillDisplayName(b.path));
  });
}

const SKILLS_INDEX_URL =
  "https://raw.githubusercontent.com/SparshKesari/testmu-skills/main/skills_index.json";
const RAW_BASE =
  "https://raw.githubusercontent.com/SparshKesari/testmu-skills/main";

let cachedIndex: SkillsIndex | null = null;

export async function getSkillsIndex(): Promise<SkillsIndex> {
  if (cachedIndex) return cachedIndex;
  const res = await fetch(SKILLS_INDEX_URL, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch skills index");
  cachedIndex = (await res.json()) as SkillsIndex;
  return cachedIndex;
}

export async function getSkills(): Promise<Skill[]> {
  const index = await getSkillsIndex();
  return sortSkillsWithHotFirst(index.skills);
}

/** URL slug for routes: e.g. selenium-automation-skill → selenium-skill */
export function toSkillSlug(path: string): string {
  return path
    .replace(/-automation-skill$/i, "-skill")
    .replace(/-testing-skill$/i, "-skill");
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

function getReferenceDocType(refPath: string): string | null {
  if (refPath.includes("playbook.md")) return "playbook";
  if (refPath.includes("advanced-patterns.md")) return "advanced-patterns";
  if (refPath.includes("cloud-integration.md")) return "cloud-integration";
  return null;
}

export async function getSkillMarkdown(
  slug: string,
  docType: "skill" | "playbook" | "advanced-patterns" | "cloud-integration"
): Promise<string | null> {
  const skill = await getSkillBySlug(slug);
  if (!skill) return null;

  let url: string;
  if (docType === "skill") {
    url = `${RAW_BASE}/${skill.path}/SKILL.md`;
  } else {
    const refs = skill.files?.reference ?? [];
    const refPath = refs.find((r) => {
      const t = getReferenceDocType(r);
      return t === docType;
    });
    if (!refPath) return null;
    url = `${RAW_BASE}/${refPath}`;
  }

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return null;
  let raw = await res.text();

  if (docType === "skill") {
    const parsed = matter(raw);
    raw = parsed.content;
  }
  return raw;
}

export function getAvailableDocTypes(skill: Skill): ("skill" | "playbook" | "advanced-patterns" | "cloud-integration")[] {
  const types: ("skill" | "playbook" | "advanced-patterns" | "cloud-integration")[] = ["skill"];
  const refs = skill.files?.reference ?? [];
  for (const r of refs) {
    const t = getReferenceDocType(r);
    if (t === "playbook") types.push("playbook");
    else if (t === "advanced-patterns") types.push("advanced-patterns");
    else if (t === "cloud-integration") types.push("cloud-integration");
  }
  return types;
}

export function getGitHubSkillUrl(path: string): string {
  return `https://github.com/SparshKesari/testmu-skills/tree/main/${path}`;
}

/** README-style sections for a skill: overview, how to use, samples, advanced */
export interface SkillReadmeSections {
  overview: { whatItDoes: string; whenToUse: string[]; triggers: string[] };
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

  const [skillMd, playbookMd, advancedMd] = await Promise.all([
    getSkillMarkdown(slug, "skill"),
    getSkillMarkdown(slug, "playbook").catch(() => null),
    getSkillMarkdown(slug, "advanced-patterns").catch(() => null),
  ]);

  const overview = parseSkillDescription(skill.description);
  const docTypes = getAvailableDocTypes(skill);
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

  return {
    overview,
    howToUse,
    samples,
    advancedSamples: advancedMd ?? null,
    fullSkillMd: skillMd ?? "",
    hasPlaybook,
    hasAdvanced,
    hasCloud,
  };
}
