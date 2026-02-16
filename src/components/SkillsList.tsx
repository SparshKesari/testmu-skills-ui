"use client";

import { useMemo, useState } from "react";
import { SkillCard } from "./SkillCard";
import type { Skill } from "@/lib/types";

interface SkillsListProps {
  skills: Skill[];
  categories: string[];
  languages: string[];
}

export function SkillsList({ skills, categories, languages }: SkillsListProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("");
  const [language, setLanguage] = useState<string>("");

  const filtered = useMemo(() => {
    return skills.filter((s) => {
      const matchSearch =
        !search ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = !category || s.category === category;
      const matchLang =
        !language || (s.languages && s.languages.includes(language));
      return matchSearch && matchCategory && matchLang;
    });
  }, [skills, search, category, language]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          placeholder="Search skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20"
        />
        <div className="flex flex-wrap gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-300 focus:border-white/20 focus:outline-none"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-300 focus:border-white/20 focus:outline-none"
          >
            <option value="">All languages</option>
            {languages.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-sm text-zinc-500">
        {filtered.length} skill{filtered.length !== 1 ? "s" : ""}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((skill) => (
          <SkillCard key={skill.path} skill={skill} />
        ))}
      </div>
    </div>
  );
}
