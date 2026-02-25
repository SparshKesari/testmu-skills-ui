import { SkillDocView } from "./SkillDocView";

interface SkillReadmeMarkdownProps {
  title: string;
  markdown: string;
}

export function SkillReadmeMarkdown({ title, markdown }: SkillReadmeMarkdownProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold border-b border-border pb-2">
        {title}
      </h2>
      <SkillDocView markdown={markdown} />
    </section>
  );
}
