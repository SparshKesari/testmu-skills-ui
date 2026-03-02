"use client";

import { useEffect, useState } from "react";
import { Github, Star, GitFork } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GitHubRepoStats } from "@/lib/github";

const DURATION_MS = 1200;
const TICK_MS = 40;

function useAnimatedValue(target: number, enabled: boolean): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!enabled || target <= 0) {
      setValue(target);
      return;
    }
    setValue(0);
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const t = Math.min(1, elapsed / DURATION_MS);
      const easeOut = 1 - (1 - t) * (1 - t);
      setValue(Math.round(easeOut * target));
      if (t >= 1) clearInterval(timer);
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [target, enabled]);
  return value;
}

interface GitHubStatsProps {
  stats: GitHubRepoStats;
  className?: string;
  /** Match hero flush styling (white text) */
  variant?: "default" | "hero";
}

export function GitHubStats({ stats, className, variant = "default" }: GitHubStatsProps) {
  const [mounted, setMounted] = useState(false);
  const stars = useAnimatedValue(stats.stars, mounted);
  const forks = useAnimatedValue(stats.forks, mounted);

  useEffect(() => setMounted(true), []);

  const isHero = variant === "hero";
  const linkClass = cn(
    "inline-flex items-center gap-0 rounded-lg border border-border bg-card/80 px-3 py-2 text-sm font-medium transition-all duration-300 hover:border-primary/30 hover:bg-card",
    isHero && "border-white/20 bg-white/10 text-white hover:bg-white/15 hover:border-white/30",
    !isHero && "text-foreground",
    className
  );

  const format = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n > 0 ? `${n}+` : "0");

  return (
    <a
      href={stats.repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClass}
      aria-label={`GitHub repo: ${stats.stars} stars, ${stats.forks} forks`}
    >
      <Github className="size-4 shrink-0" aria-hidden />
      <span className="h-4 w-px shrink-0 bg-border mx-1.5" aria-hidden />
      <span className="flex items-center gap-1">
        <span className="tabular-nums">{format(stars)}</span>
        <Star className="size-3.5 shrink-0" aria-hidden />
      </span>
      <span className="h-4 w-px shrink-0 bg-border mx-1.5" aria-hidden />
      <span className="flex items-center gap-1">
        <span className="tabular-nums">{format(forks)}</span>
        <GitFork className="size-3.5 shrink-0" aria-hidden />
      </span>
    </a>
  );
}
