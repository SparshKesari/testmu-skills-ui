import { getSkills, getCategories, getLanguages } from "@/lib/skills";
import { InstallCommandBlock } from "@/components/InstallCommandBlock";
import { AgentsMarquee } from "@/components/AgentsMarquee";
import { SkillsList } from "@/components/SkillsList";

export default async function HomePage() {
  const [skills, categories, languages] = await Promise.all([
    getSkills(),
    getCategories(),
    getLanguages(),
  ]);

  return (
    <div className="space-y-16">
      {/* Hero - reference layout: logo left / description right; try it now left / agents right */}
      <section className="grid gap-10 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-12">
        {/* Top row: Logo + tagline (left) */}
        <div className="lg:row-span-2 flex flex-col">
          <h1
            className="font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ textShadow: "0.06em 0.06em 0 #27272a, 0.1em 0.1em 0 rgba(82,82,91,0.5)" }}
          >
            TESTMU AI SKILLS
          </h1>
          <p className="mt-2 text-sm font-mono font-medium uppercase tracking-normal text-foreground">
            Production-grade agent skills for test automation
          </p>
          {/* Try it now (left column, below tagline) */}
          <h2 className="mb-3.5 mt-8 w-full text-sm font-mono font-medium uppercase tracking-normal text-foreground">
            Try it now
          </h2>
          <InstallCommandBlock variant="hero" />
        </div>
        {/* Top row: Description (right) */}
        <div className="flex flex-col justify-center">
          <p className="max-w-md text-base leading-relaxed text-zinc-400">
            Reusable test automation capabilities for AI coding agents. Install
            with one command and enhance your agent with Selenium, Playwright,
            Jest, pytest, and 40+ frameworks.
          </p>
          {/* Available for these agents (right column) */}
          <div className="mt-8">
            <AgentsMarquee />
          </div>
        </div>
      </section>

      {/* Skills list - leaderboard style */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-white">
          Test automation skills
        </h2>
        <SkillsList
          skills={skills}
          categories={categories}
          languages={languages}
        />
      </section>
    </div>
  );
}
