/**
 * Parses skill description into structured "what it does", "when to use", and "triggers".
 * TestMu skill descriptions often follow:
 * "...what it does. Use when ... or mentions \"X\". Triggers on: \"A\", \"B\"."
 */
export function parseSkillDescription(description: string): {
  whatItDoes: string;
  whenToUse: string[];
  triggers: string[];
} {
  const whenToUse: string[] = [];
  const triggers: string[] = [];

  // Extract "Triggers on: ..." (up to next period at end of sentence or end of string)
  const triggersMatch = description.match(/Triggers on:\s*([^.]+?)(?:\.\s*$|\.\s+[A-Z]|$)/i);
  if (triggersMatch) {
    const block = triggersMatch[1].trim();
    const parts = block.split(/[,;]|\s+and\s+/i).map((s) => s.trim().replace(/^["']|["']$/g, ""));
    for (const p of parts) {
      if (p.length > 0) triggers.push(p);
    }
  }

  // Extract "Use when ..." (until "Triggers on" or end)
  const useWhenStart = description.search(/\bUse when\b/i);
  let whenBlock = "";
  if (useWhenStart >= 0) {
    const afterUseWhen = description.slice(useWhenStart + 9).trim();
    const triggersIdx = afterUseWhen.search(/\bTriggers on\b/i);
    whenBlock = triggersIdx >= 0 ? afterUseWhen.slice(0, triggersIdx).trim() : afterUseWhen;
  }
  if (whenBlock) {
    const sentences = whenBlock.split(/\.\s+/).filter((s) => s.trim().length > 15);
    for (const s of sentences) {
      whenToUse.push(s.trim().replace(/\.$/, ""));
    }
    if (whenToUse.length === 0 && whenBlock.length > 20) {
      whenToUse.push(whenBlock.replace(/\.$/, ""));
    }
  }

  // What it does: text before "Use when"
  const whatItDoes =
    useWhenStart > 0
      ? description.slice(0, useWhenStart).trim().replace(/\s+\.$/, ".")
      : description.trim();

  return {
    whatItDoes: whatItDoes || description,
    whenToUse,
    triggers,
  };
}
