"use client";

import { ArrowUpRight, Download, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { ModrinthProject } from "@/lib/modrinth";

type Tab = "all" | "modpack" | "resourcepack";

const TABS: { key: Tab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "modpack", label: "Modpacks" },
  { key: "resourcepack", label: "Resource Packs" },
];

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

export default function ProjectTabs({
  projects,
}: {
  projects: ModrinthProject[];
}) {
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const filtered = (activeTab === "all"
    ? projects
    : projects.filter((p) => p.project_type === activeTab)
  ).sort((a, b) => b.downloads - a.downloads);

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
                {project.icon_url ? (
                  <img
                    src={project.icon_url}
                    alt={`${project.title} icon`}
                    className="size-12 rounded-base object-cover"
                  />
                ) : (
                  <div className="flex size-12 items-center justify-center rounded-base bg-emerald-600/20 text-lg font-heading text-emerald-400">
                    {project.title.charAt(0)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-lg font-heading">
                    {project.title}
                    <ArrowUpRight className="ml-1.5 inline size-4 opacity-0 transition-opacity group-hover:opacity-50" />
                  </h3>
                  <span className="rounded-full bg-emerald-600/15 px-2 py-0.5 text-xs font-heading text-emerald-400">
                    {project.project_type === "modpack"
                      ? "Modpack"
                      : "Resource Pack"}
                  </span>
                </div>
              </div>

              <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-foreground/70">
                {project.description}
              </p>

              {project.categories.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {project.categories.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-background px-2 py-0.5 text-xs text-foreground/60"
                    >
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 text-xs text-emerald-700 dark:text-emerald-400">
                <span className="inline-flex items-center gap-1">
                  <Download className="size-3.5" />
                  {formatCount(project.downloads)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Users className="size-3.5" />
                  {formatCount(project.followers)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
