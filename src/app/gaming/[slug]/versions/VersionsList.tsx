"use client";

import { useState } from "react";
import type { GamingProjectConfig } from "@/lib/gaming/types";
import type { ModrinthVersion } from "@/lib/modrinth";
import type { Platform } from "@/lib/gaming/versions";
import VersionCard from "./VersionCard";

const PLATFORM_COLORS: Record<Platform, string> = {
  modrinth: "bg-[#00af5c]",
  curseforge: "bg-[#f16436]",
};

const PLATFORM_LABELS: Record<Platform, string> = {
  modrinth: "Modrinth",
  curseforge: "CurseForge",
};

export default function VersionsList({
  project,
  modrinthVersions,
  curseforgeVersions,
  availablePlatforms,
}: {
  project: GamingProjectConfig;
  modrinthVersions: ModrinthVersion[];
  curseforgeVersions: ModrinthVersion[];
  availablePlatforms: Platform[];
}) {
  const [activePlatform, setActivePlatform] = useState<Platform>(
    availablePlatforms[0] ?? "modrinth"
  );

  const versions =
    activePlatform === "modrinth" ? modrinthVersions : curseforgeVersions;

  return (
    <div>
      {availablePlatforms.length > 1 && (
        <div className="mb-4 flex items-center justify-end gap-2">
          {availablePlatforms.map((platform) => (
            <button
              key={platform}
              onClick={() => setActivePlatform(platform)}
              className={`inline-flex items-center rounded-base border px-3 py-1.5 text-sm font-heading shadow-sm transition-opacity hover:opacity-80 ${
                activePlatform === platform
                  ? `${PLATFORM_COLORS[platform]} border-transparent text-white`
                  : "border-border/30 bg-secondary-background text-foreground"
              }`}
            >
              {PLATFORM_LABELS[platform]}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-4">
        {versions.map((v) => (
          <VersionCard
            key={v.id}
            version={v}
            projectType={project.type}
            projectSlug={project.slug}
            platform={activePlatform}
          />
        ))}
        {versions.length === 0 && (
          <p className="py-4 text-center text-sm text-foreground/50">
            No versions available for this platform.
          </p>
        )}
      </div>
    </div>
  );
}
