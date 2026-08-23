import SiteFooter from "@/components/site-footer";
import { getProjectBySlug, getProjectDescription, getProjectGallery } from "@/lib/gaming/local";
import { getProjectStats } from "@/lib/gaming/downloads";
import { getVersionsForPlatform } from "@/lib/gaming/versions";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectHeader from "./ProjectHeader";
import TabNav from "./TabNav";
import ProjectBody from "./ProjectBody";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: { absolute: `${project.name} | HenryMM` },
    description: project.shortDescription,
  };
}

export default async function GamingProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const [description, stats, modrinthVersions, curseforgeVersions, gallery] =
    await Promise.all([
      getProjectDescription(slug),
      getProjectStats(project),
      project.enableModrinth
        ? getVersionsForPlatform(project, "modrinth")
        : Promise.resolve([]),
      project.enableCurseforge
        ? getVersionsForPlatform(project, "curseforge")
        : Promise.resolve([]),
      getProjectGallery(slug),
    ]);

  const hasGallery = gallery.length > 0;

  const tabs = [
    { key: "description", label: "Description" },
    { key: "gallery", label: "Gallery", hide: !hasGallery },
    { key: "versions", label: "Versions" },
  ];

  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 pb-0 md:px-8 md:pb-0">
      <ProjectHeader
        project={project}
        stats={stats}
        modrinthVersions={modrinthVersions}
        curseforgeVersions={curseforgeVersions}
      />
      <section className="mb-8 rounded-base border border-border/30 bg-main p-6 text-main-foreground shadow-sm md:p-8">
        <TabNav tabs={tabs} slug={project.slug} />
        <ProjectBody body={description} />
      </section>

      <p className="mb-8 text-center text-sm text-foreground/40">
        NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH
        MOJANG OR MICROSOFT.
      </p>

      <SiteFooter />
    </main>
  );
}
