import { readFile } from "fs/promises";
import { join } from "path";
import eventsData from "./events.json";
import type { EventConfig } from "./events/types";

const EVENTS = eventsData as unknown as EventConfig[];

function byDateAsc(a: EventConfig, b: EventConfig): number {
  return a.date.localeCompare(b.date);
}

export function getVisibleEvents(): EventConfig[] {
  return EVENTS.filter((e) => e.show).sort(byDateAsc);
}

export function getHomepageEvents(): EventConfig[] {
  const visible = EVENTS.filter((e) => e.show);

  const upcoming = visible
    .filter((e) => !e.done)
    .sort(byDateAsc);

  const past = visible
    .filter((e) => e.done)
    .sort(byDateAsc)
    .pop();

  const result: EventConfig[] = [];

  if (past) {
    result.push(past);
  }

  for (const event of upcoming) {
    if (result.length === 3) break;
    result.push(event);
  }

  return result;
}

export function getAllEventSlugs(): string[] {
  return EVENTS.filter((e) => e.show).map((e) => e.slug);
}

export function getEventBySlug(slug: string): EventConfig | null {
  return EVENTS.find((e) => e.slug === slug) ?? null;
}

export async function getEventDescription(slug: string): Promise<string | null> {
  try {
    const filePath = join(
      process.cwd(),
      "src/content/events",
      `${slug}.md`
    );
    return await readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}
