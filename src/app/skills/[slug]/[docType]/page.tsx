import { notFound } from "next/navigation";
import {
  getSkillBySlug,
  getSkillMarkdown,
  getAvailableDocTypes,
  getSkills,
  toSkillSlug,
} from "@/lib/skills";
import { SkillDocView } from "@/components/SkillDocView";
import { DOC_TYPE_LABELS, type DocType } from "@/lib/types";

const VALID_DOC_TYPES: DocType[] = [
  "playbook",
  "advanced-patterns",
  "cloud-integration",
];

const DOC_DESCRIPTIONS: Record<DocType, string> = {
  skill: "",
  playbook: "Complete implementation guide with code samples, patterns, and best practices.",
  "advanced-patterns": "Advanced topics and patterns for experienced users.",
  "cloud-integration": "Cloud execution and TestMu AI integration.",
};

export async function generateStaticParams() {
  const skills = await getSkills();
  const params: { slug: string; docType: string }[] = [];
  for (const skill of skills) {
    const slug = toSkillSlug(skill.path);
    const types = getAvailableDocTypes(skill);
    for (const docType of types) {
      if (VALID_DOC_TYPES.includes(docType as DocType)) {
        params.push({ slug, docType });
      }
    }
  }
  return params;
}

export default async function SkillDocPage({
  params,
}: {
  params: Promise<{ slug: string; docType: string }>;
}) {
  const { slug, docType } = await params;
  const typedDoc = docType as DocType;
  if (!VALID_DOC_TYPES.includes(typedDoc)) notFound();

  const skill = await getSkillBySlug(slug);
  if (!skill) notFound();

  const availableTypes = getAvailableDocTypes(skill);
  if (!availableTypes.includes(typedDoc)) notFound();

  const markdown = await getSkillMarkdown(slug, typedDoc);
  if (markdown === null) {
    return (
      <p className="text-zinc-500 dark:text-zinc-400">
        This document could not be loaded.
      </p>
    );
  }

  const title = DOC_TYPE_LABELS[typedDoc];
  const description = DOC_DESCRIPTIONS[typedDoc];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm text-zinc-500">
            {description}
          </p>
        )}
      </div>
      <SkillDocView markdown={markdown} />
    </div>
  );
}
