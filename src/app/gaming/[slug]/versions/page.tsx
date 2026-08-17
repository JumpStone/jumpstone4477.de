import SiteFooter from "@/components/site-footer";
import { getProject, getProjectVersions } from "@/lib/modrinth";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectHeader from "../ProjectHeader";
import TabNav from "../TabNav";
import { Download, Calendar, Tag } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const project = await getProject(slug);
    return {
      title: { absolute: `${project.title} - Versions | HenryMM` },
      description: project.description,
    };
  } catch {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }
}

export default async function VersionsPage({ params }: Props) {
  const { slug } = await params;

  let project;
  try {
    project = await getProject(slug);
  } catch {
    notFound();
  }

  const versions = await getProjectVersions(project.id);

  const tabs = [
    { key: "description", label: "Description" },
    { key: "gallery", label: "Gallery", hide: !project.gallery?.length },
    { key: "versions", label: "Versions" },
  ];

  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 pb-0 md:px-8 md:pb-0">
      <ProjectHeader project={project} versions={versions} />
      <section className="mb-8 rounded-base border border-border/30 bg-main p-6 text-main-foreground shadow-sm md:p-8">
        <TabNav tabs={tabs} slug={project.slug} />

        <div className="flex flex-col gap-4">
          {versions.map((v) => {
            const primaryFile = v.files.find((f) => f.primary) ?? v.files[0];
            return (
              <div
                key={v.id}
                className="rounded-base border border-border/30 bg-secondary-background p-4"
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
                </div>
                <div className="mb-3 flex flex-wrap gap-2">
                  {v.game_versions.map((gv) => (
                    <span
                      key={gv}
                      className="inline-flex items-center gap-1 rounded-full bg-emerald-600/15 px-2 py-0.5 text-xs font-heading text-emerald-700 dark:text-emerald-400"
                    >
                      <Tag className="size-3" />
                      {gv}
                    </span>
                  ))}
                  {v.loaders.map((loader) => (
                    <span
                      key={loader}
                      className="rounded-full bg-foreground/10 px-2 py-0.5 text-xs font-heading text-foreground/70"
                    >
                      {loader}
                    </span>
                  ))}
                </div>
                {primaryFile && (
                  <div className="flex justify-center">
                    <a
                      href={primaryFile.url}
                      download
                      className="flex size-8 items-center justify-center rounded-base border border-border/30 bg-emerald-600 text-white shadow-sm transition-opacity hover:opacity-80"
                    >
                      <Download className="size-4" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <p className="mb-8 text-center text-sm text-foreground/40">
        NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH
        MOJANG OR MICROSOFT.
      </p>

      <SiteFooter />
    </main>
  );
}
