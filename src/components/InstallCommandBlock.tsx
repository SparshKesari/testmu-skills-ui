"use client";

import { useState } from "react";
import { AGENT_PATHS, getSingleSkillCommands, getAllSkillsCommands } from "@/lib/install";

const HERO_COMMAND = "git clone https://github.com/SparshKesari/testmu-skills.git";

interface InstallCommandBlockProps {
  skillPath?: string;
  variant?: "single" | "all" | "hero";
}

export function InstallCommandBlock({ skillPath, variant = "single" }: InstallCommandBlockProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const commands =
    variant === "hero"
      ? null
      : variant === "single" && skillPath
        ? getSingleSkillCommands(skillPath)
        : getAllSkillsCommands();

  const copy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (variant === "hero") {
    return (
      <div className="w-full sm:max-w-[348px]">
        <div
          className="flex cursor-pointer items-center justify-between gap-4 rounded-md border-none px-4 py-3 font-mono text-sm text-foreground transition-all duration-300"
          style={{ background: "color-mix(in srgb, var(--ds-gray-100) 80%, transparent)" }}
        >
          <code className="min-w-0 flex-1 truncate text-left text-zinc-300">
            $ {HERO_COMMAND}
          </code>
          <button
            type="button"
            onClick={() => copy("hero", HERO_COMMAND)}
            className="shrink-0 rounded p-1.5 text-foreground/70 hover:bg-white/10 hover:text-foreground transition-colors"
            aria-label="Copy command"
          >
            {copiedId === "hero" ? (
              <span className="text-xs">Copied!</span>
            ) : (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-2 sm:max-w-[420px]">
      {AGENT_PATHS.map((agent) => {
        const cmd = commands![agent.id];
        if (!cmd) return null;
        const firstLine = cmd.split("\n")[0];
        return (
          <div
            key={agent.id}
            className="rounded-md border-none transition-all duration-300"
            style={{ background: "color-mix(in srgb, var(--ds-gray-100) 80%, transparent)" }}
          >
            <div className="px-3 pt-2 pb-1 text-xs font-medium text-zinc-500">
              {agent.name}
            </div>
            <div className="flex cursor-pointer items-center justify-between gap-4 px-4 pb-3 pt-0">
              <code className="min-w-0 flex-1 truncate text-left font-mono text-sm text-foreground">
                {firstLine}
              </code>
              <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                copy(agent.id, cmd);
              }}
              className="shrink-0 rounded p-1.5 text-foreground/70 hover:bg-white/10 hover:text-foreground transition-colors"
              aria-label={`Copy command for ${agent.name}`}
            >
              {copiedId === agent.id ? (
                <span className="text-xs">Copied!</span>
              ) : (
                <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              )}
            </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
