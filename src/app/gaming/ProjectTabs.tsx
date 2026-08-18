"use client";

import { ArrowUpRight, Download, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type {
  GamingProjectConfig,
  ProjectStats,
  ProjectType,
} from "@/lib/gaming/types";

type Tab = "all" | ProjectType;

const TABS: { key: Tab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "modpack", label: "Modpacks" },
  { key: "resourcepack", label: "Resource Packs" },
  { key: "mod", label: "Mods" },
  { key: "shader", label: "Shaders" },
  { key: "plugin", label: "Plugins" },
  { key: "datapack", label: "Datapacks" },
];

const TYPE_BADGE_STYLES: Record<ProjectType, string> = {
  modpack: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  resourcepack: "bg-purple-500/15 text-purple-700 dark:text-purple-400",
  mod: "bg-emerald-600/15 text-emerald-700 dark:text-emerald-400",
  shader: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  plugin: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-400",
  datapack: "bg-rose-500/15 text-rose-700 dark:text-rose-400",
};

const TYPE_LABELS: Record<ProjectType, string> = {
  modpack: "Modpack",
  resourcepack: "Resource Pack",
  mod: "Mod",
  shader: "Shader",
  plugin: "Plugin",
  datapack: "Datapack",
};

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

export default function ProjectTabs({
  projects,
}: {
  projects: (GamingProjectConfig & { stats: ProjectStats })[];
}) {
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const filtered = (activeTab === "all"
    ? projects
    : projects.filter((p) => p.type === activeTab)
  ).sort((a, b) => b.stats.downloads - a.stats.downloads);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`inline-flex items-center rounded-base border px-3 py-1.5 text-sm font-heading shadow-sm transition-opacity hover:opacity-80 ${
              activeTab === tab.key
                ? "border-border/30 bg-emerald-600 text-white"
                : "border-border/30 bg-secondary-background text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-foreground/60">
          No projects found in this category.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((project) => (
            <Link
              key={project.slug}
              href={`/gaming/${project.slug}`}
              className="group rounded-base border border-border/30 bg-secondary-background p-5 shadow-sm transition-colors"
            >
              <div className="mb-3 flex items-start gap-4">
                <img
                  src={`/gaming/projects/${project.slug}/icon.png`}
                  alt={`${project.name} icon`}
                  className="size-12 rounded-base object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-lg font-heading">
                    {project.name}
                    <ArrowUpRight className="ml-1.5 inline size-4 opacity-0 transition-opacity group-hover:opacity-50" />
                  </h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-heading ${TYPE_BADGE_STYLES[project.type]}`}
                  >
                    {TYPE_LABELS[project.type]}
                  </span>
                </div>
              </div>

              <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-foreground/70">
                {project.shortDescription}
              </p>

              <div className="flex items-center gap-4 text-xs text-emerald-700 dark:text-emerald-400">
                <span className="inline-flex items-center gap-1">
                  <Download className="size-3.5" />
                  {formatCount(project.stats.downloads)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Users className="size-3.5" />
                  {formatCount(project.stats.followers)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
