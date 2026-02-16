import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface SkillDocViewProps {
  markdown: string;
}

export function SkillDocView({ markdown }: SkillDocViewProps) {
  return (
    <article className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-zinc-400 prose-li:text-zinc-400 prose-pre:bg-white/10 prose-pre:text-zinc-200 prose-code:before:content-none prose-code:after:content-none prose-code:bg-white/10 prose-code:text-zinc-300 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </article>
  );
}
