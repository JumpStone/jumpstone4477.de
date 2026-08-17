import { ArrowUpRight, Download, Users } from "lucide-react";
import Link from "next/link";
import type { ModrinthProject, ModrinthVersion } from "@/lib/modrinth";
import DownloadModal from "./DownloadModal";

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

export default function ProjectHeader({
  project,
  versions,
}: {
  project: ModrinthProject;
  versions: ModrinthVersion[];
}) {
  return (
    <section className="mb-8 rounded-base border border-border/30 bg-main p-6 text-main-foreground shadow-sm md:p-8">
      <p className="mb-3 text-sm font-heading uppercase tracking-wide text-main-foreground/80">
        {project.project_type === "modpack" ? "Modpack" : "Resource Pack"}
      </p>
      <div className="flex items-start gap-5">
        {project.icon_url && (
          <img
            src={project.icon_url}
            alt={`${project.title} icon`}
            className="size-16 rounded-base object-cover"
          />
        )}
        <div>
          <h1 className="mb-2 text-3xl font-heading leading-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="max-w-3xl text-base leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/15 px-3 py-1 font-heading text-emerald-700 dark:text-emerald-400">
          <Download className="size-4" />
          {formatCount(project.downloads)} downloads
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/15 px-3 py-1 font-heading text-emerald-700 dark:text-emerald-400">
          <Users className="size-4" />
          {formatCount(project.followers)} followers
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <a
            href={`https://modrinth.com/project/${project.slug}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-base border border-border/30 bg-secondary-background px-3 py-1.5 text-sm font-heading shadow-sm transition-opacity hover:opacity-80"
          >
            View on Modrinth
            <ArrowUpRight className="size-4" />
          </a>
          <Link
            href="/gaming"
            className="inline-flex items-center rounded-base border border-border/30 bg-background px-3 py-1.5 text-sm font-heading text-foreground shadow-sm transition-opacity hover:opacity-80"
          >
            &larr; Back to Projects
          </Link>
          {project.source_url && (
            <a
              href={project.source_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-base border border-border/30 bg-secondary-background px-3 py-1.5 text-sm font-heading shadow-sm transition-opacity hover:opacity-80"
            >
              Source
              <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>
        <DownloadModal
          versions={versions}
          projectType={project.project_type}
        />
      </div>
    </section>
  );
}
