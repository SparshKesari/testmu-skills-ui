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
    <div className="min-w-0 w-full space-y-16">
      {/* Hero - reference layout: logo left / description right; try it now left / agents right */}
      <section className="grid min-w-0 gap-10 lg:grid-cols-[2fr_3fr] lg:gap-x-16 lg:gap-y-12">
        {/* Top row: Logo + tagline (left) */}
        <div className="min-w-0 lg:row-span-2 flex flex-col">
          <h1 className="font-[family-name:var(--font-display)] text-center tracking-tight text-foreground leading-[0.95]">
            <span className="block text-5xl font-normal sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
              Agent Skills
            </span>
            <span className="block text-3xl font-normal text-muted-foreground mt-1 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              for All
            </span>
          </h1>
          <p className="mt-3 text-center text-sm font-mono font-medium uppercase tracking-normal text-muted-foreground">
            by TestMu AI
          </p>
          {/* Try it now (left column, below tagline) */}
          <h2 className="mb-3.5 mt-8 w-full text-sm font-mono font-medium uppercase tracking-normal text-muted-foreground">
            Try it now
          </h2>
          <InstallCommandBlock variant="hero" />
        </div>
        {/* Top row: Description (right) - reference: ds-gray-600, text-balance, leading-tight */}
        <div className="min-w-0 flex flex-col justify-center">
          <p className="w-full text-xl sm:text-2xl lg:text-3xl leading-tight tracking-tight text-center lg:text-left text-balance text-[var(--ds-gray-600)]">
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
        <h2 className="mb-4 text-lg font-semibold">
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
