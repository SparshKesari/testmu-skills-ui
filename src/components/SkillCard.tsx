import Link from "next/link";
import type { Skill } from "@/lib/types";
import { getSkillDisplayName, isHotSkill, toSkillSlug } from "@/lib/skillsHelpers";
import { SkillLogo } from "./SkillLogo";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SkillCardProps {
  skill: Skill;
}

function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max).trim() + "…";
}

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <Link href={`/skills/${toSkillSlug(skill.path)}`} className="block h-full">
      <Card className="h-full transition-colors hover:bg-accent/50 hover:border-border">
        <CardContent className="flex h-full gap-4 p-5">
          <SkillLogo skillPath={skill.path} />
          <div className="min-w-0 flex-1 flex flex-col min-h-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <h3 className="font-semibold leading-none">
                {getSkillDisplayName(skill.path)}
              </h3>
              {isHotSkill(skill.path) && (
                <Badge variant="secondary" className="bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/40">
                  Hot
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 shrink-0">
              {truncate(skill.description, 180)}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              <Badge variant="secondary">{skill.category}</Badge>
              {skill.languages?.slice(0, 4).map((lang) => (
                <Badge key={lang} variant="outline">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
