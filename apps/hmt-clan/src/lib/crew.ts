import crewData from "./crew.json";

export interface CrewMember {
  name: string;
  rolle: string;
  minecraftUser: string;
  useskin?: boolean;
  priority: number;
  slug: string;
  thescape_slug?: string;
}

export const crew = crewData as CrewMember[];

export function getCrewMemberBySlug(slug: string): CrewMember | null {
  return crew.find((member) => member.slug === slug) ?? null;
}
