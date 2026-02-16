import Link from "next/link";
import type { Skill } from "@/lib/types";
import { getSkillDisplayName, isHotSkill, toSkillSlug } from "@/lib/skills";
import { SkillLogo } from "./SkillLogo";

interface SkillCardProps {
  skill: Skill;
}

function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max).trim() + "…";
}

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <Link
      href={`/skills/${toSkillSlug(skill.path)}`}
      className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/[0.07]"
    >
      <SkillLogo skillPath={skill.path} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold text-white">
            {getSkillDisplayName(skill.path)}
          </h3>
          {isHotSkill(skill.path) && (
            <span className="rounded bg-amber-500/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-amber-400 ring-1 ring-amber-500/40">
              Hot
            </span>
          )}
        </div>
        <p className="mt-2 text-sm text-zinc-400 line-clamp-2">
        {truncate(skill.description, 180)}
      </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded bg-white/10 px-2 py-0.5 text-xs font-medium text-zinc-300">
            {skill.category}
          </span>
          {skill.languages?.slice(0, 4).map((lang) => (
            <span
              key={lang}
              className="rounded bg-white/10 px-2 py-0.5 text-xs text-zinc-500"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
