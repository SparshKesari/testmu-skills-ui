/**
 * In-memory store for telemetry events and skills search index.
 * Used by /api/search, /api/t, and /api/audit.
 * Replace with Vercel Postgres (or similar) for production.
 */

export interface TelemetryEvent {
  id: string;
  timestamp: string;
  event: string;
  source?: string;
  skills?: string;
  agents?: string;
  global?: string;
  v?: string;
  ci?: string;
  [key: string]: string | undefined;
}

export interface SkillRecord {
  id: string;
  name: string;
  source: string;
  installCount: number;
}

const events: TelemetryEvent[] = [];
const skillsMap = new Map<string, SkillRecord>(); // key: `${source}:${skillName}`

function skillKey(source: string, skillName: string): string {
  return `${source}:${skillName}`.toLowerCase();
}

export function addEvent(params: Record<string, string | undefined>): void {
  const event: TelemetryEvent = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    event: params.event ?? "unknown",
    source: params.source,
    skills: params.skills,
    agents: params.agents,
    global: params.global,
    v: params.v,
    ci: params.ci,
    ...params,
  };
  events.push(event);

  // Update skills index from install events
  if (event.event === "install" && event.source && event.skills) {
    const skillNames = event.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    for (const name of skillNames) {
      const key = skillKey(event.source, name);
      const existing = skillsMap.get(key);
      if (existing) {
        existing.installCount += 1;
      } else {
        skillsMap.set(key, {
          id: key,
          name,
          source: event.source,
          installCount: 1,
        });
      }
    }
  }
}

export function searchSkills(q: string, limit: number): SkillRecord[] {
  const query = q.trim().toLowerCase();
  let list = Array.from(skillsMap.values());
  if (query) {
    list = list.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.source.toLowerCase().includes(query)
    );
  }
  list.sort((a, b) => b.installCount - a.installCount);
  return list.slice(0, limit);
}

export function getEvents(): TelemetryEvent[] {
  return [...events];
}

export function getSkillsMap(): Map<string, SkillRecord> {
  return new Map(skillsMap);
}
