import { SkillDocView } from "./SkillDocView";

interface SkillReadmeSectionProps {
  title: string;
  children: React.ReactNode;
}

export function SkillReadmeSection({ title, children }: SkillReadmeSectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
        {title}
      </h2>
      <div className="text-zinc-400">{children}</div>
    </section>
  );
}

interface SkillReadmeMarkdownProps {
  title: string;
  markdown: string;
}

export function SkillReadmeMarkdown({ title, markdown }: SkillReadmeMarkdownProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
        {title}
      </h2>
      <SkillDocView markdown={markdown} />
    </section>
  );
}
