"use client";

import { Download, Calendar } from "lucide-react";
import type { ModrinthVersion } from "@/lib/modrinth";

export default function VersionCard({
  version,
  projectType,
  projectSlug,
}: {
  version: ModrinthVersion;
  projectType: string;
  projectSlug: string;
}) {
  const v = version;
  const primaryFile = v.files.find((f) => f.primary) ?? v.files[0];

  return (
    <a
      href={`https://modrinth.com/${projectType}/${projectSlug}/version/${v.version_number}`}
      target="_blank"
      rel="noreferrer"
      className="block rounded-base border border-border/30 bg-secondary-background p-4 transition-opacity hover:opacity-80"
    >
      <div className="mb-2 flex flex-wrap items-center gap-3">
        <h3 className="font-heading">{v.version_number}</h3>
        <span className="inline-flex items-center gap-1 text-sm text-foreground/60">
          <Calendar className="size-4" />
          {new Date(v.date_published).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
        <span className="inline-flex items-center gap-1 text-sm text-foreground/60">
          <Download className="size-4" />
          {v.downloads}
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-heading ${
            v.version_type === "release"
              ? "bg-emerald-600/15 text-emerald-700 dark:text-emerald-400"
              : v.version_type === "beta"
                ? "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400"
                : "bg-red-500/15 text-red-700 dark:text-red-400"
          }`}
        >
          {v.version_type.charAt(0).toUpperCase() + v.version_type.slice(1)}
        </span>
        {primaryFile && (
          <span
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(primaryFile.url, "_blank");
            }}
            className="ml-auto inline-flex cursor-pointer items-center gap-1.5 rounded-base border border-border/30 bg-emerald-600 px-3 py-1 text-xs font-heading text-white shadow-sm transition-opacity hover:opacity-80"
          >
            <Download className="size-3" />
            Download
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {v.game_versions.map((gv) => (
          <span
            key={gv}
            className="rounded-full bg-foreground/10 px-2 py-0.5 text-xs font-heading text-foreground/70"
          >
            {gv}
          </span>
        ))}
        {v.loaders.map((loader) => (
          <span
            key={loader}
            className="rounded-full bg-foreground/10 px-2 py-0.5 text-xs font-heading text-foreground/70"
          >
            {loader.charAt(0).toUpperCase() + loader.slice(1)}
          </span>
        ))}
      </div>
    </a>
  );
}
