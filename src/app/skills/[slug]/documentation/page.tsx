import { notFound } from "next/navigation";
import { getSkillBySlug, getSkillMarkdown, getSkills, toSkillSlug } from "@/lib/skills";
import { SkillDocView } from "@/components/SkillDocView";
import { stripCodeBlocks } from "@/lib/parseSkillMarkdown";

export async function generateStaticParams() {
  const skills = await getSkills();
  return skills.map((s) => ({ slug: toSkillSlug(s.path) }));
}

export default async function SkillDocumentationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skill = await getSkillBySlug(slug);
  if (!skill) notFound();

  const markdown = await getSkillMarkdown(slug, "skill");
  if (markdown === null) {
    return (
      <p className="text-zinc-500 dark:text-zinc-400">
        Documentation could not be loaded.
      </p>
    );
  }

  const markdownNoCode = stripCodeBlocks(markdown);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
          Documentation
        </h2>
        <p className="mt-2 text-sm text-zinc-500">
          Full skill reference without code blocks. For implementation samples and code, see the Playbook and Advanced patterns tabs.
        </p>
      </div>
      <SkillDocView markdown={markdownNoCode} />
    </div>
  );
}
