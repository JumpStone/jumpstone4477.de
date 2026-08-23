import type {
  GamingProjectConfig,
  ProjectStats,
  ProjectType,
  Platform,
} from "./types";

const TYPE_LABELS: Record<ProjectType, string> = {
  modpack: "Modpack",
  resourcepack: "Resource Pack",
  mod: "Mod",
  shader: "Shader",
  plugin: "Plugin",
  datapack: "Datapack",
};

const TYPE_BADGE_STYLES: Record<ProjectType, string> = {
  modpack: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  resourcepack: "bg-purple-500/15 text-purple-700 dark:text-purple-400",
  mod: "bg-emerald-600/15 text-emerald-700 dark:text-emerald-400",
  shader: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  plugin: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-400",
  datapack: "bg-rose-500/15 text-rose-700 dark:text-rose-400",
};

const CURSEFORGE_PATHS: Record<ProjectType, string> = {
  modpack: "modpacks",
  resourcepack: "texture-packs",
  mod: "mc-mods",
  shader: "shaders",
  plugin: "bukkit-plugins",
  datapack: "mc-mods",
};

export function getCurseForgeUrl(
  projectType: ProjectType,
  projectSlug: string
): string {
  const path = CURSEFORGE_PATHS[projectType] ?? "mc-mods";
  return `https://www.curseforge.com/minecraft/${path}/${projectSlug}`;
}

export function getModrinthUrl(modrinthId: string): string {
  return `https://modrinth.com/project/${modrinthId}`;
}

export function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

export { TYPE_LABELS, TYPE_BADGE_STYLES };
export type { GamingProjectConfig, ProjectStats, ProjectType, Platform };
