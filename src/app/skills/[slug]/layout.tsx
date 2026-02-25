import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getSkillBySlug,
  getAvailableDocTypes,
  getGitHubSkillUrl,
  getSkillDisplayName,
  getSkillInstallCommand,
  isHotSkill,
} from "@/lib/skills";
import { SkillLogo } from "@/components/SkillLogo";
import { SkillDocNav } from "@/components/SkillDocNav";
import { CopyableUrlBlock } from "@/components/CopyableUrlBlock";
import { type DocType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

  const baseDocTypes = await getAvailableDocTypes(skill);
  const docTypes: DocType[] = [
    "skill",
    "documentation",
    ...baseDocTypes.filter((t) => t !== "skill"),
  ];
  const githubUrl = getGitHubSkillUrl(skill.path);
  const installCommand = getSkillInstallCommand(skill.path);
  const title = getSkillDisplayName(skill.path);

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-6">
        <Button variant="link" size="sm" className="text-muted-foreground p-0 h-auto" asChild>
          <Link href="/">← All skills</Link>
        </Button>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <SkillLogo skillPath={skill.path} />
          <div className="min-w-0 flex-1 flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            {isHotSkill(skill.path) && (
              <Badge variant="secondary" className="bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/40">
                Hot
              </Badge>
            )}
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge variant="secondary">{skill.category}</Badge>
          {skill.languages?.map((lang) => (
            <Badge key={lang} variant="outline">
              {lang}
            </Badge>
          ))}
        </div>
        <Button variant="link" size="sm" className="text-muted-foreground p-0 h-auto mt-4" asChild>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            View on GitHub →
          </a>
        </Button>
      </div>
      <div className="pb-4">
        <CopyableUrlBlock
          url={installCommand}
          label="Copy and Paste in your Terminal"
        />
      </div>
      <SkillDocNav slug={slug} docTypes={docTypes} />
      {children}
    </div>
  );
}
