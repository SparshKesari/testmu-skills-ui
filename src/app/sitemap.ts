import type { MetadataRoute } from "next";
import { getSkills, getAvailableDocTypes, toSkillSlug } from "@/lib/skills";

const BASE_URL = "https://agentskillsforall.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const skills = await getSkills();

  const skillEntries: MetadataRoute.Sitemap = [];

  for (const skill of skills) {
    const slug = toSkillSlug(skill.path);

    // Main skill page
    skillEntries.push({
      url: `${BASE_URL}/skills/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });

    // Documentation page (always exists)
    skillEntries.push({
      url: `${BASE_URL}/skills/${slug}/documentation`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    });

    // Optional doc types (playbook, advanced-patterns, cloud-integration)
    const docTypes = await getAvailableDocTypes(skill);
    for (const docType of docTypes) {
      if (docType === "skill") continue; // already covered by main page
      skillEntries.push({
        url: `${BASE_URL}/skills/${slug}/${docType}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }
  }

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...skillEntries,
  ];
}
