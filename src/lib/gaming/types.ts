export type ProjectType =
  | "mod"
  | "modpack"
  | "resourcepack"
  | "shader"
  | "plugin"
  | "datapack";

export type DownloadsMode = "sum" | "modrinth" | "curseforge";

export type Platform = "modrinth" | "curseforge";

export interface GamingProjectConfig {
  name: string;
  slug: string;
  type: ProjectType;
  shortDescription: string;
  modrinthId: string | null;
  curseforgeId: string | null;
  enableModrinth: boolean;
  enableCurseforge: boolean;
  downloadsMode: DownloadsMode;
  sourceUrl?: string;
}

export interface GalleryImage {
  filename: string;
  title: string;
  description: string;
}

export interface ProjectStats {
  downloads: number;
  followers: number;
}

export interface GamingProjectWithStats extends GamingProjectConfig {
  stats: ProjectStats;
}

export interface ModrinthVersion {
  id: string;
  project_id: string;
  name: string;
  version_number: string;
  changelog: string;
  date_published: string;
  downloads: number;
  version_type: "release" | "beta" | "alpha";
  game_versions: string[];
  loaders: string[];
  files: {
    id: string;
    url: string;
    filename: string;
    primary: boolean;
    size: number;
  }[];
}

export interface CurseForgeFile {
  id: number;
  displayName: string;
  fileName: string;
  releaseType: number;
  fileDate: string;
  fileLength: number;
  downloadCount: number;
  fileUrl: string;
  gameVersions: string[];
  sortableGameVersions: string[];
  dependencies: unknown[];
  exGameVersions: string[];
  fileSize: number;
  fileFingerprint: number;
  modules: unknown[];
}

export interface CurseForgeMod {
  id: number;
  name: string;
  slug: string;
  downloadCount: number;
  summary: string;
  logo: {
    thumbnailUrl: string;
    url: string;
  } | null;
}

export interface CurseForgeModResponse {
  data: CurseForgeMod;
}

export interface CurseForgeFilesResponse {
  data: CurseForgeFile[];
}
