export type ModrinthProject = {
  id: string;
  slug: string;
  title: string;
  description: string;
  body: string | null;
  project_type: "modpack" | "resourcepack" | "mod" | "shader" | "datapack";
  downloads: number;
  followers: number;
  icon_url: string | null;
  status: string;
  categories: string[];
  versions: string[];
  client_side: string;
  server_side: string;
  source_url: string | null;
  wiki_url: string | null;
  issues_url: string | null;
  discord_url: string | null;
  gallery_urls: string[];
  gallery: {
    url: string;
    raw_url: string;
    title: string | null;
    description: string | null;
    featured: boolean;
    ordering: number;
  }[];
  date_created: string;
  date_modified: string;
  latest_version: string;
  license: string;
  colors: { background: string; text: string } | null;
};

export type ModrinthVersion = {
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
};

const HEADERS: HeadersInit = {
  "User-Agent": "henrymeyer-website/1.0",
};

const REVALIDATE = 3600;

export async function getProject(
  slugOrId: string
): Promise<ModrinthProject> {
  const res = await fetch(
    `https://api.modrinth.com/v2/project/${slugOrId}`,
    {
      headers: HEADERS,
      next: { revalidate: REVALIDATE },
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch Modrinth project "${slugOrId}": ${res.status} ${res.statusText}`
    );
  }

  return res.json();
}

export async function getProjectVersions(
  projectId: string
): Promise<ModrinthVersion[]> {
  const res = await fetch(
    `https://api.modrinth.com/v2/project/${projectId}/version`,
    {
      headers: HEADERS,
      next: { revalidate: REVALIDATE },
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch versions for project "${projectId}": ${res.status} ${res.statusText}`
    );
  }

  return res.json();
}
