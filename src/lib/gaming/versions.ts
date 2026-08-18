import type {
  GamingProjectConfig,
  ModrinthVersion,
  Platform,
} from "./types";
import { getProject, getProjectVersions } from "../modrinth";
import { getCurseForgeVersions, isCurseForgeAvailable } from "./curseforge";

export type { Platform };

export async function getVersionsForPlatform(
  project: GamingProjectConfig,
  platform: Platform
): Promise<ModrinthVersion[]> {
  if (platform === "modrinth") {
    if (!project.enableModrinth || !project.modrinthId) return [];
    try {
      const modrinthProject = await getProject(project.modrinthId);
      return await getProjectVersions(modrinthProject.id);
    } catch {
      return [];
    }
  }

  if (platform === "curseforge") {
    if (
      !project.enableCurseforge ||
      !project.curseforgeId ||
      !isCurseForgeAvailable()
    )
      return [];
    return await getCurseForgeVersions(project.curseforgeId);
  }

  return [];
}

export async function getAllVersions(
  project: GamingProjectConfig
): Promise<ModrinthVersion[]> {
  const versions: ModrinthVersion[] = [];

  if (project.enableModrinth) {
    const modrinthVersions = await getVersionsForPlatform(project, "modrinth");
    versions.push(...modrinthVersions);
  }

  if (project.enableCurseforge && isCurseForgeAvailable()) {
    const curseforgeVersions = await getVersionsForPlatform(
      project,
      "curseforge"
    );
    versions.push(...curseforgeVersions);
  }

  return versions.sort(
    (a, b) =>
      new Date(b.date_published).getTime() -
      new Date(a.date_published).getTime()
  );
}

export function getAvailablePlatforms(
  project: GamingProjectConfig
): Platform[] {
  const platforms: Platform[] = [];
  if (project.enableModrinth) platforms.push("modrinth");
  if (project.enableCurseforge) platforms.push("curseforge");
  return platforms;
}
