"use client";

import { ArrowUpRight, Download, Users } from "lucide-react";
import Link from "next/link";
import type { GamingProjectConfig, ProjectStats } from "@/lib/gaming/types";
import {
  getCurseForgeUrl,
  getModrinthUrl,
  formatCount,
  TYPE_LABELS,
  TYPE_BADGE_STYLES,
} from "@/lib/gaming/ui-utils";
import DownloadModal from "./DownloadModal";

export default function ProjectHeader({
  project,
  stats,
  modrinthVersions,
  curseforgeVersions,
}: {
  project: GamingProjectConfig;
  stats: ProjectStats;
  modrinthVersions?: import("@/lib/modrinth").ModrinthVersion[];
  curseforgeVersions?: import("@/lib/modrinth").ModrinthVersion[];
}) {
  const hasModrinth = project.enableModrinth;
  const hasCurseforge = project.enableCurseforge;

  return (
    <section className="mb-8 rounded-base border border-border/30 bg-main p-6 text-main-foreground shadow-sm md:p-8">
      <div className="mb-3 flex items-center gap-2">
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-heading ${TYPE_BADGE_STYLES[project.type]}`}
        >
          {TYPE_LABELS[project.type]}
        </span>
      </div>
      <div className="flex items-start gap-5">
        <img
          src={`/gaming/projects/${project.slug}/icon.png`}
          alt={`${project.name} icon`}
          className="size-16 rounded-base object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div>
          <h1 className="mb-2 text-3xl font-heading leading-tight sm:text-5xl">
            {project.name}
          </h1>
          <p className="max-w-3xl text-base leading-relaxed">
            {project.shortDescription}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/15 px-3 py-1 font-heading text-emerald-700 dark:text-emerald-400">
          <Download className="size-4" />
          {formatCount(stats.downloads)} downloads
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/15 px-3 py-1 font-heading text-emerald-700 dark:text-emerald-400">
          <Users className="size-4" />
          {formatCount(stats.followers)} followers
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {hasModrinth && (
            <a
              href={getModrinthUrl(project.modrinthId!)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-base border border-border/30 bg-secondary-background px-3 py-1.5 text-sm font-heading shadow-sm transition-opacity hover:opacity-80"
            >
              View on Modrinth
              <ArrowUpRight className="size-4" />
            </a>
          )}
          {hasCurseforge && (
            <a
              href={getCurseForgeUrl(project.type, project.slug)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-base border border-border/30 bg-secondary-background px-3 py-1.5 text-sm font-heading shadow-sm transition-opacity hover:opacity-80"
            >
              View on CurseForge
              <ArrowUpRight className="size-4" />
            </a>
          )}
          <Link
            href="/gaming"
            className="inline-flex items-center rounded-base border border-border/30 bg-background px-3 py-1.5 text-sm font-heading text-foreground shadow-sm transition-opacity hover:opacity-80"
          >
            &larr; Back to Projects
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {hasModrinth && modrinthVersions && (
            <DownloadModal
              versions={modrinthVersions}
              projectType={project.type}
              platform="modrinth"
            />
          )}
          {hasCurseforge && curseforgeVersions && (
            <DownloadModal
              versions={curseforgeVersions}
              projectType={project.type}
              platform="curseforge"
            />
          )}
        </div>
      </div>
    </section>
  );
}
