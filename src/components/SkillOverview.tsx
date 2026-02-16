import { parseSkillDescription } from "@/lib/parseDescription";
import { getSkillDisplayName } from "@/lib/skills";
import type { Skill } from "@/lib/types";

interface SkillOverviewProps {
  skill: Skill;
}

export function SkillOverview({ skill }: SkillOverviewProps) {
  const { whatItDoes, whenToUse, triggers } = parseSkillDescription(skill.description);
  const title = getSkillDisplayName(skill.path);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold text-white">
          {title}
        </h2>
        <p className="mt-2 leading-relaxed text-zinc-400">
          {whatItDoes}
        </p>
      </section>

      {whenToUse.length > 0 && (
        <section>
          <h3 className="text-base font-semibold text-white">
            When to use this skill
          </h3>
          <p className="mt-1 mb-2 text-sm text-zinc-500">
            Use this skill when the user:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-zinc-400">
            {whenToUse.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {triggers.length > 0 && (
        <section>
          <h3 className="text-base font-semibold text-white">
            Triggers on
          </h3>
          <p className="mt-1 mb-2 text-sm text-zinc-500">
            The skill activates when the user mentions:
          </p>
          <div className="flex flex-wrap gap-2">
            {triggers.map((t) => (
              <span
                key={t}
                className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium text-zinc-300"
              >
                {t}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
