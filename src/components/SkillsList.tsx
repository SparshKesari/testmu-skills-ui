"use client";

import { useMemo, useState } from "react";
import { SkillCard } from "./SkillCard";
import type { Skill } from "@/lib/types";
import { categoryToSentenceCase } from "@/lib/skillsHelpers";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ALL_OPTION_VALUE = "__all__";

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
      <div className="hidden flex-col gap-4 sm:flex sm:flex-row sm:items-center sm:justify-between">
        <Input
          type="search"
          placeholder="Search skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm"
        />
        <div className="flex min-w-0 flex-wrap gap-2">
          <Select
            value={category || ALL_OPTION_VALUE}
            onValueChange={(v) => setCategory(v === ALL_OPTION_VALUE ? "" : v)}
          >
            <SelectTrigger className="w-full min-w-0 sm:w-[180px]">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_OPTION_VALUE}>All categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {categoryToSentenceCase(c)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={language || ALL_OPTION_VALUE}
            onValueChange={(v) => setLanguage(v === ALL_OPTION_VALUE ? "" : v)}
          >
            <SelectTrigger className="w-full min-w-0 sm:w-[180px]">
              <SelectValue placeholder="All languages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_OPTION_VALUE}>All languages</SelectItem>
              {languages.map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        {filtered.length} skill{filtered.length !== 1 ? "s" : ""}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((skill) => (
          <SkillCard key={skill.path} skill={skill} />
        ))}
      </div>
    </div>
  );
}
