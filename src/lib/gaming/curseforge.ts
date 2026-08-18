import type {
  CurseForgeMod,
  CurseForgeModResponse,
  CurseForgeFile,
  CurseForgeFilesResponse,
  ModrinthVersion,
} from "./types";

const CURSEFORGE_API_KEY = process.env.CURSEFORGE_API_KEY;
const CURSEFORGE_BASE_URL = "https://api.curseforge.com/v1";

const HEADERS: HeadersInit = CURSEFORGE_API_KEY
  ? { "x-api-key": CURSEFORGE_API_KEY }
  : {};

const REVALIDATE = 3600;

export function isCurseForgeAvailable(): boolean {
  return !!CURSEFORGE_API_KEY;
}

export async function getCurseForgeProject(
  curseforgeId: string
): Promise<CurseForgeMod | null> {
  if (!isCurseForgeAvailable()) return null;

  try {
    const res = await fetch(
      `${CURSEFORGE_BASE_URL}/mods/${curseforgeId}`,
      {
        headers: HEADERS,
        next: { revalidate: REVALIDATE },
      }
    );

    if (!res.ok) return null;

    const data = (await res.json()) as CurseForgeModResponse;
    return data.data;
  } catch {
    return null;
  }
}

export async function getCurseForgeVersions(
  curseforgeId: string
): Promise<ModrinthVersion[]> {
  if (!isCurseForgeAvailable()) return [];

  try {
    const res = await fetch(
      `${CURSEFORGE_BASE_URL}/mods/${curseforgeId}/files`,
      {
        headers: HEADERS,
        next: { revalidate: REVALIDATE },
      }
    );

    if (!res.ok) return [];

    const data = (await res.json()) as CurseForgeFilesResponse;

    return data.data.map((file) =>
      convertCurseForgeFileToModrinthVersion(file, curseforgeId)
    );
  } catch {
    return [];
  }
}

function convertCurseForgeFileToModrinthVersion(
  file: CurseForgeFile,
  projectId: string
): ModrinthVersion {
  const gameVersions = file.gameVersions.filter((gv) =>
    /^\d+\.\d+/.test(gv)
  );
  const loaders = file.gameVersions.filter(
    (gv) => !/^\d+\.\d+/.test(gv)
  );

  return {
    id: String(file.id),
    project_id: projectId,
    name: file.displayName,
    version_number: file.fileName,
    changelog: "",
    date_published: file.fileDate,
    downloads: file.downloadCount,
    version_type:
      file.releaseType === 1
        ? "release"
        : file.releaseType === 2
          ? "beta"
          : "alpha",
    game_versions: gameVersions,
    loaders: loaders.map((l) => l.toLowerCase()),
    files: [
      {
        id: String(file.id),
        url: file.fileUrl,
        filename: file.fileName,
        primary: true,
        size: file.fileLength,
      },
    ],
  };
}
