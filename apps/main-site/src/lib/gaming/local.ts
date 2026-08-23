import { readFile } from "fs/promises";
import { join } from "path";
import type { GamingProjectConfig, GalleryImage } from "./types";
import projectsData from "./projects.json";

const PROJECTS = projectsData as unknown as GamingProjectConfig[];

export function getAllProjects(): GamingProjectConfig[] {
  return PROJECTS;
}

export function getProjectBySlug(
  slug: string
): GamingProjectConfig | null {
  return PROJECTS.find((p) => p.slug === slug) ?? null;
}

export async function getProjectGallery(
  slug: string
): Promise<GalleryImage[]> {
  try {
    const filePath = join(
      process.cwd(),
      "src/lib/gaming/projects/fotos",
      `${slug}.json`
    );
    const content = await readFile(filePath, "utf-8");
    return JSON.parse(content) as GalleryImage[];
  } catch {
    return [];
  }
}

export async function getProjectDescription(
  slug: string
): Promise<string | null> {
  try {
    const filePath = join(
      process.cwd(),
      "src/content/gaming/projects",
      `${slug}.md`
    );
    return await readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}
