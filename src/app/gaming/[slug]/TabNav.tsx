"use client";

import { usePathname, useRouter } from "next/navigation";

export default function TabNav({
  tabs,
  slug,
}: {
  tabs: { key: string; label: string; hide?: boolean }[];
  slug: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const pathParts = pathname.split("/");
  const lastSegment = pathParts[pathParts.length - 1];
  const activeTab =
    lastSegment === "gallery" || lastSegment === "versions"
      ? lastSegment
      : "description";

  const visibleTabs = tabs.filter((t) => !t.hide);

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {visibleTabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() =>
            router.push(
              tab.key === "description"
                ? `/gaming/${slug}`
                : `/gaming/${slug}/${tab.key}`,
            )
          }
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
  );
}
