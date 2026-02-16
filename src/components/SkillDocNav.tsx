"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOC_TYPE_LABELS, type DocType } from "@/lib/types";

interface SkillDocNavProps {
  slug: string;
  docTypes: DocType[];
}

export function SkillDocNav({ slug, docTypes }: SkillDocNavProps) {
  const pathname = usePathname();
  const base = `/skills/${slug}`;

  return (
    <nav className="flex gap-2 border-b border-white/10">
      {docTypes.map((t) => {
        const href = t === "skill" ? base : `${base}/${t}`;
        const isActive =
          href === pathname ||
          (t !== "skill" && pathname === href) ||
          (t !== "skill" && pathname.startsWith(href + "/"));
        return (
          <Link
            key={t}
            href={href}
            className={`border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "border-white text-white"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            {DOC_TYPE_LABELS[t]}
          </Link>
        );
      })}
    </nav>
  );
}
