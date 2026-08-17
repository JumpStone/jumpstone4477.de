"use client";

import { useState } from "react";
import { Download, X, Calendar } from "lucide-react";
import type { ModrinthVersion } from "@/lib/modrinth";

function VersionBadge({ type }: { type: string }) {
  const styles: Record<string, string> = {
    release: "bg-emerald-600/15 text-emerald-700 dark:text-emerald-400",
    beta: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
    alpha: "bg-red-500/15 text-red-700 dark:text-red-400",
  };
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-heading ${styles[type] ?? styles.release}`}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
}

function formatBytes(bytes: number): string {
  if (bytes >= 1_048_576) return `${(bytes / 1_048_576).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function DownloadModal({
  versions,
  projectType,
}: {
  versions: ModrinthVersion[];
  projectType: string;
}) {
  const [open, setOpen] = useState(false);
  const [selectedGameVersion, setSelectedGameVersion] = useState("");
  const [selectedLoader, setSelectedLoader] = useState("");

  const allVersions = versions ?? [];

  const gameVersions = [
    ...new Set(allVersions.flatMap((v) => v.game_versions)),
  ];

  const filteredByGame = selectedGameVersion
    ? allVersions.filter((v) =>
        v.game_versions.includes(selectedGameVersion)
      )
    : allVersions;

  const loaders = [...new Set(filteredByGame.flatMap((v) => v.loaders))];

  const filteredVersions = selectedLoader
    ? filteredByGame.filter((v) => v.loaders.includes(selectedLoader))
    : filteredByGame;

  const latestVersion = filteredVersions[0] ?? null;

  function handleOpen() {
    setOpen(true);
    if (gameVersions.length === 1) {
      setSelectedGameVersion(gameVersions[0]);
    } else {
      setSelectedGameVersion("");
    }
    setSelectedLoader("");
  }

  function handleClose() {
    setOpen(false);
    setSelectedGameVersion("");
    setSelectedLoader("");
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className="inline-flex items-center gap-2 rounded-base border border-border/30 bg-emerald-600 px-3 py-1.5 text-sm font-heading text-white shadow-sm transition-opacity hover:opacity-80"
      >
        <Download className="size-4" />
        Download
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-overlay"
            onClick={handleClose}
          />
          <div className="relative z-10 w-full max-w-lg rounded-base border border-border/30 bg-main p-6 shadow-lg">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-heading">Download</h2>
              <button
                onClick={handleClose}
                className="rounded-base p-1 text-foreground/50 transition-colors hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className={`mb-5 grid gap-3 ${projectType === "resourcepack" ? "grid-cols-1" : "grid-cols-2"}`}>
              <div>
                <label className="mb-1.5 block text-xs font-heading text-foreground/50">
                  Game Version
                </label>
                <select
                  value={selectedGameVersion}
                  onChange={(e) => {
                    setSelectedGameVersion(e.target.value);
                    const newFiltered = allVersions.filter((v) =>
                      v.game_versions.includes(e.target.value)
                    );
                    const newLoaders = [
                      ...new Set(newFiltered.flatMap((v) => v.loaders)),
                    ];
                    if (newLoaders.length === 1) {
                      setSelectedLoader(newLoaders[0]);
                    } else {
                      setSelectedLoader("");
                    }
                  }}
                  className="w-full rounded-base border border-border/30 bg-background px-3 py-2 text-sm font-heading text-foreground shadow-sm focus:border-emerald-500 focus:outline-none"
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  {gameVersions.map((gv) => (
                    <option key={gv} value={gv}>
                      {gv}
                    </option>
                  ))}
                </select>
              </div>
              {projectType !== "resourcepack" && loaders.length > 0 && (
                <div>
                  <label className="mb-1.5 block text-xs font-heading text-foreground/50">
                    Loader
                  </label>
                  <select
                    value={selectedLoader}
                    onChange={(e) => setSelectedLoader(e.target.value)}
                    className="w-full rounded-base border border-border/30 bg-background px-3 py-2 text-sm font-heading text-foreground shadow-sm focus:border-emerald-500 focus:outline-none"
                  >
                    {loaders.length > 1 && (
                      <option value="" disabled>
                        Select...
                      </option>
                    )}
                    {loaders.map((l) => (
                      <option key={l} value={l}>
                        {l.charAt(0).toUpperCase() + l.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="space-y-2">
              {selectedGameVersion && selectedLoader ? (
                latestVersion ? (
                  (() => {
                    const file =
                      latestVersion.files.find((f) => f.primary) ??
                      latestVersion.files[0];
                    return (
                      <div className="flex items-center gap-3 rounded-base border border-border/30 bg-secondary-background p-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="truncate text-sm font-heading">
                              {latestVersion.name}
                            </span>
                            <VersionBadge type={latestVersion.version_type} />
                          </div>
                          <div className="mt-0.5 flex items-center gap-3 text-xs text-foreground/50">
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="size-3" />
                              {formatDate(latestVersion.date_published)}
                            </span>
                            {file && <span>{formatBytes(file.size)}</span>}
                          </div>
                        </div>
                        {file && (
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex shrink-0 items-center gap-1 rounded-base bg-emerald-600 px-3 py-1.5 text-xs font-heading text-white shadow-sm transition-opacity hover:opacity-80"
                          >
                            <Download className="size-3.5" />
                          </a>
                        )}
                      </div>
                    );
                  })()
                ) : (
                  <p className="py-4 text-center text-sm text-foreground/50">
                    No version available for this combination.
                  </p>
                )
              ) : (
                <p className="py-4 text-center text-sm text-foreground/50">
                  Select a game version and loader to see available downloads.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
