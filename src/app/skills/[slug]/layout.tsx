import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getSkillBySlug,
  getAvailableDocTypes,
  getGitHubSkillUrl,
  getSkillDisplayName,
  isHotSkill,
} from "@/lib/skills";
import { InstallCommandBlock } from "@/components/InstallCommandBlock";
import { SkillLogo } from "@/components/SkillLogo";
import { SkillDocNav } from "@/components/SkillDocNav";
import { type DocType } from "@/lib/types";

export default async function SkillLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skill = await getSkillBySlug(slug);
  if (!skill) notFound();

  const baseDocTypes = getAvailableDocTypes(skill);
  const docTypes: DocType[] = [
    "skill",
    "documentation",
    ...baseDocTypes.filter((t) => t !== "skill"),
  ];
  const githubUrl = getGitHubSkillUrl(skill.path);
  const title = getSkillDisplayName(skill.path);

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-6">
        <Link
          href="/"
          className="text-sm text-zinc-500 hover:text-white"
        >
          ← All skills
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <SkillLogo skillPath={skill.path} />
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-white">
              {title}
            </h1>
          {isHotSkill(skill.path) && (
            <span className="rounded bg-amber-500/20 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-amber-400 ring-1 ring-amber-500/40">
              Hot
            </span>
          )}
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="rounded bg-white/10 px-2 py-0.5 text-xs font-medium text-zinc-300">
            {skill.category}
          </span>
          {skill.languages?.map((lang) => (
            <span
              key={lang}
              className="rounded bg-white/10 px-2 py-0.5 text-xs text-zinc-500"
            >
              {lang}
            </span>
          ))}
        </div>
        <div className="mt-4">
          <h2 className="mb-2 w-full text-sm font-mono font-medium uppercase tracking-normal text-foreground">
            Install this skill
          </h2>
          <p className="mb-3.5 text-xs text-zinc-500">
            Copy the command for your agent and run it in your project.
          </p>
          <InstallCommandBlock skillPath={skill.path} />
        </div>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm text-zinc-400 hover:text-white"
        >
          View on GitHub →
        </a>
      </div>
      <SkillDocNav slug={slug} docTypes={docTypes} />
      {children}
    </div>
  );
}
