import SiteFooter from "@/components/site-footer";
import { getProject, getProjectVersions } from "@/lib/modrinth";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectHeader from "../ProjectHeader";
import TabNav from "../TabNav";
import VersionCard from "./VersionCard";

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
          {versions.map((v) => (
            <VersionCard
              key={v.id}
              version={v}
              projectType={project.project_type}
              projectSlug={project.slug}
            />
          ))}
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
