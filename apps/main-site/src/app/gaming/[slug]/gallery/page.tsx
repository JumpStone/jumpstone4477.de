import SiteFooter from "@/components/site-footer";
import {
  getProjectBySlug,
  getProjectGallery,
} from "@/lib/gaming/local";
import { getProjectStats } from "@/lib/gaming/downloads";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectHeader from "../ProjectHeader";
import TabNav from "../TabNav";

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
    title: { absolute: `${project.name} - Gallery | HenryMM` },
    description: project.shortDescription,
  };
}

export default async function GalleryPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const [gallery, stats] = await Promise.all([
    getProjectGallery(slug),
    getProjectStats(project),
  ]);

  const hasGallery = gallery.length > 0;

  const tabs = [
    { key: "description", label: "Description" },
    { key: "gallery", label: "Gallery", hide: !hasGallery },
    { key: "versions", label: "Versions" },
  ];

  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 pb-0 md:px-8 md:pb-0">
      <ProjectHeader project={project} stats={stats} />
      <section className="mb-8 rounded-base border border-border/30 bg-main p-6 text-main-foreground shadow-sm md:p-8">
        <TabNav tabs={tabs} slug={project.slug} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((img) => (
            <a
              key={img.filename}
              href={`/gaming/projects/${slug}/${img.filename}`}
              target="_blank"
              rel="noreferrer"
              className="group block overflow-hidden rounded-base border border-border/30 bg-secondary-background"
            >
              <img
                src={`/gaming/projects/${slug}/${img.filename}`}
                alt={img.title || "Gallery image"}
                className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
              />
              {img.title && (
                <p className="p-3 text-sm font-heading text-foreground/80">
                  {img.title}
                </p>
              )}
            </a>
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
