import type { GamingProjectConfig, ProjectStats } from "./types";
import { getProject } from "../modrinth";
import {
  getCurseForgeProject,
  isCurseForgeAvailable,
} from "./curseforge";

export async function getProjectStats(
  project: GamingProjectConfig
): Promise<ProjectStats> {
  let modrinthDownloads = 0;
  let modrinthFollowers = 0;
  let curseforgeDownloads = 0;

  if (project.enableModrinth && project.modrinthId) {
    try {
      const modrinthProject = await getProject(project.modrinthId);
      modrinthDownloads = modrinthProject.downloads;
      modrinthFollowers = modrinthProject.followers;
    } catch {
      // Fallback to 0
    }
  }

  if (
    project.enableCurseforge &&
    project.curseforgeId &&
    isCurseForgeAvailable()
  ) {
    try {
      const cfProject = await getCurseForgeProject(project.curseforgeId);
      if (cfProject) {
        curseforgeDownloads = cfProject.downloadCount;
      }
    } catch {
      // Fallback to 0
    }
  }

  let downloads: number;
  switch (project.downloadsMode) {
    case "modrinth":
      downloads = project.enableModrinth ? modrinthDownloads : 0;
      break;
    case "curseforge":
      downloads =
        project.enableCurseforge && isCurseForgeAvailable()
          ? curseforgeDownloads
          : 0;
      break;
    case "sum":
    default:
      downloads = 0;
      if (project.enableModrinth) downloads += modrinthDownloads;
      if (project.enableCurseforge && isCurseForgeAvailable())
        downloads += curseforgeDownloads;
      break;
  }

  const followers = project.enableModrinth ? modrinthFollowers : 0;

  return { downloads, followers };
}

export async function getAllProjectStats(): Promise<
  Map<string, ProjectStats>
> {
  const { getAllProjects } = await import("./local");
  const projects = getAllProjects();

  const results = await Promise.all(
    projects.map(async (project) => {
      const stats = await getProjectStats(project);
      return { slug: project.slug, stats };
    })
  );

  const map = new Map<string, ProjectStats>();
  for (const { slug, stats } of results) {
    map.set(slug, stats);
  }
  return map;
}
