import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getSkillBySlug,
  getSkillReadmeSections,
  toSkillSlug,
} from "@/lib/skills";
import { SkillOverview } from "@/components/SkillOverview";
import { SkillDocView } from "@/components/SkillDocView";
import { SkillReadmeMarkdown } from "@/components/SkillReadmeView";

export async function generateStaticParams() {
  const { getSkills } = await import("@/lib/skills");
  const skills = await getSkills();
  return skills.map((s) => ({ slug: toSkillSlug(s.path) }));
}

export default async function SkillPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skill = await getSkillBySlug(slug);
  if (!skill) notFound();

  const readme = await getSkillReadmeSections(slug);
  if (!readme) notFound();

  return (
    <div className="space-y-10">
      {/* Overview — what it does, when to use, triggers */}
      <section className="rounded-lg border border-white/10 bg-white/5 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white border-b border-white/10 pb-2">
          Overview
        </h2>
        <SkillOverview skill={skill} />
      </section>

      {/* How to use — intro/first part of SKILL.md */}
      {readme.howToUse && (
        <SkillReadmeMarkdown title="How to use" markdown={readme.howToUse} />
      )}

      {/* Samples — first sections from playbook */}
      {readme.samples.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
            Samples
          </h2>
          <p className="text-sm text-zinc-500">
            Quick implementation samples from the playbook. See the full Playbook tab for the complete guide.
          </p>
          <div className="space-y-8">
            {readme.samples.map((s) => (
              <div key={s.title} className="space-y-2">
                <h3 className="text-base font-medium text-white">
                  {s.title}
                </h3>
                <SkillDocView markdown={s.content} />
              </div>
            ))}
          </div>
          {readme.hasPlaybook && (
            <Link
              href={`/skills/${slug}/playbook`}
              className="inline-block text-sm font-medium text-amber-400 hover:text-amber-300"
            >
              View full Playbook →
            </Link>
          )}
        </section>
      )}

      {/* Advanced samples — from advanced-patterns.md */}
      {readme.advancedSamples && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
            Advanced samples
          </h2>
          <SkillDocView markdown={readme.advancedSamples} />
          {readme.hasAdvanced && (
            <Link
              href={`/skills/${slug}/advanced-patterns`}
              className="inline-block text-sm font-medium text-amber-400 hover:text-amber-300"
            >
              View full Advanced patterns →
            </Link>
          )}
        </section>
      )}

      <p className="text-sm text-zinc-500">
        For full reference without code, see the{" "}
        <Link href={`/skills/${slug}/documentation`} className="text-amber-400 hover:text-amber-300">
          Documentation
        </Link>{" "}
        tab.
      </p>
    </div>
  );
}
