import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/section-heading";
import { getGitHubData } from "@/lib/github";
import { ArrowUpRight, FolderGit2, Star } from "lucide-react";

type GitHubSectionsProps = {
  username: string;
  visibleRepoLimit?: number;
};

export default async function GitHubSections({
  username,
  visibleRepoLimit = 8,
}: GitHubSectionsProps) {
  const { profile, repos, hasError } = await getGitHubData(username);
  const repoProjects = (repos ?? []).slice(0, visibleRepoLimit);

  return (
    <>
      <section
        id="stats"
        className="mb-8 rounded-base border-2 border-border bg-secondary-background p-6 shadow-shadow"
      >
        <SectionHeading index="05" title="GitHub Stats" />

        {profile ? (
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-base border-2 border-border bg-main p-4 text-main-foreground shadow-shadow">
              <p className="font-mono text-xs uppercase tracking-[0.2em]">
                Repos
              </p>
              <p className="text-3xl font-heading">{profile.public_repos}</p>
            </div>
            <div className="rounded-base border-2 border-border bg-chart-2 p-4 text-black shadow-shadow">
              <p className="font-mono text-xs uppercase tracking-[0.2em]">
                Followers
              </p>
              <p className="text-3xl font-heading">{profile.followers}</p>
            </div>
            <div className="rounded-base border-2 border-border bg-chart-3 p-4 text-black shadow-shadow">
              <p className="font-mono text-xs uppercase tracking-[0.2em]">
                Following
              </p>
              <p className="text-3xl font-heading">{profile.following}</p>
            </div>
          </div>
        ) : (
          <Alert variant="destructive">
            <AlertTitle>GitHub stats unavailable</AlertTitle>
            <AlertDescription>
              The GitHub API could not be reached at render time. Please retry
              later.
            </AlertDescription>
          </Alert>
        )}
      </section>

      <section
        id="github-projects"
        className="rounded-base border-2 border-border bg-secondary-background p-6 shadow-shadow"
      >
        <SectionHeading index="06" title="GitHub Repositories" />

        {repoProjects.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {repoProjects.map((repo) => (
              <article
                key={repo.id}
                className="rounded-base border-2 border-border bg-background p-4 shadow-shadow"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="inline-flex items-center gap-2 text-lg font-heading">
                    <FolderGit2 className="size-5" />
                    {repo.name}
                  </h3>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-base border-2 border-border bg-main px-2 py-1 text-xs font-heading uppercase tracking-wide text-main-foreground shadow-shadow"
                  >
                    Open <ArrowUpRight className="size-3" />
                  </a>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-foreground/80">
                  {repo.description ?? "No description provided."}
                </p>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="neutral">{repo.language ?? "Mixed"}</Badge>
                  <Badge variant="neutral">
                    <Star className="size-3" /> {repo.stargazers_count}
                  </Badge>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <Alert variant="destructive">
            <AlertTitle>Repositories unavailable</AlertTitle>
            <AlertDescription>
              GitHub repositories could not be loaded right now.
            </AlertDescription>
          </Alert>
        )}

        {hasError ? (
          <p className="mt-4 text-xs text-foreground/70">
            Tip: set a <span className="font-mono">GITHUB_TOKEN</span> for a
            higher API rate limit.
          </p>
        ) : null}
      </section>
    </>
  );
}
