import { Alert, AlertDescription, AlertTitle } from "@repo/ui";
import { Badge } from "@repo/ui";
import SectionHeading from "@/components/section-heading";
import { getGitHubData } from "@/lib/github";
import { ArrowUpRight, FolderGit2, Star } from "lucide-react";

type GitHubSectionsProps = {
  username: string;
  visibleRepoLimit?: number;
};

export default async function GitHubStats({ username }: { username: string }) {
  const { profile, commits } = await getGitHubData(username);

  if (!profile) {
    return (
      <Alert
        variant="destructive"
        className="mt-8 bg-background text-foreground"
      >
        <AlertTitle>GitHub stats unavailable</AlertTitle>
        <AlertDescription>
          The GitHub API could not be reached at render time. Please retry
          later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="mt-8 flex w-fit flex-wrap items-center gap-8 rounded-base border border-border/30 px-5 py-3 text-main-foreground">
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-heading">{profile.public_repos}</p>
        <p className="font-mono text-xs opacity-75">Repos</p>
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-heading">{profile.followers}</p>
        <p className="font-mono text-xs opacity-75">Followers</p>
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-heading">
          {commits !== null ? commits : "N/A"}
        </p>
        <p className="font-mono text-xs opacity-75">Commits</p>
      </div>
    </div>
  );
}
