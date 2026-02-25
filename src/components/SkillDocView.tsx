import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PROSE_CONTENT_CLASSES } from "@/lib/proseClasses";

interface SkillDocViewProps {
  markdown: string;
}

export function SkillDocView({ markdown }: SkillDocViewProps) {
  return (
    <article className={PROSE_CONTENT_CLASSES}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </article>
  );
}
