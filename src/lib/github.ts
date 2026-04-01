export type GitHubProfile = {
  public_repos: number;
  followers: number;
  following: number;
};

export type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  updated_at: string;
};

type GitHubData = {
  profile: GitHubProfile | null;
  repos: GitHubRepo[] | null;
  hasError: boolean;
};

function createGitHubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };
  const token = process.env.GITHUB_TOKEN;

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

export async function getGitHubData(
  username: string,
  repoLimit = 12,
): Promise<GitHubData> {
  const headers = createGitHubHeaders();

  const [profileResponse, reposResponse] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 60 * 30 },
    }),
    fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=${repoLimit}`,
      {
        headers,
        next: { revalidate: 60 * 30 },
      },
    ),
  ]);

  const profile = profileResponse.ok
    ? ((await profileResponse.json()) as GitHubProfile)
    : null;

  const repos = reposResponse.ok
    ? ((await reposResponse.json()) as GitHubRepo[])
        .filter((repo) => !repo.fork)
        .sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
        )
    : null;

  return {
    profile,
    repos,
    hasError: !profileResponse.ok || !reposResponse.ok,
  };
}
