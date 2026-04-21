import { Badge } from "@/components/ui/badge";
import GitHubStats from "@/components/github-section";
import SectionHeading from "@/components/section-heading";
import SiteFooter from "@/components/site-footer";
import {
  getSubsiteProjects,
  type SubsiteProject,
} from "@/lib/subsite-projects";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

function ProjectGrid({ projects }: { projects: SubsiteProject[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {projects.map((project) => (
        <article
          key={project.slug}
          className="rounded-base border border-border/30 bg-secondary-background p-5 shadow-sm"
        >
          <h3 className="mb-3 text-xl font-heading">{project.title}</h3>
          <p className="mb-4 text-sm leading-relaxed text-foreground/80">
            {project.description}
          </p>

          <div className="mb-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="neutral">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 rounded-base border border-border/30 bg-background px-3 py-1.5 text-sm font-heading text-foreground shadow-sm transition-opacity hover:opacity-80"
            >
              Details
              <ArrowUpRight className="size-4" />
            </Link>

            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-base border border-border/30 bg-main px-3 py-1.5 text-sm font-heading text-main-foreground shadow-sm transition-opacity hover:opacity-80"
              >
                {link.label}
                <ArrowUpRight className="size-4" />
              </a>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export default function SubSite() {
  const projects = getSubsiteProjects({
    sortBy: "priority",
    direction: "asc",
  }).slice(0, 4);

  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 pb-0 md:px-8 md:pb-0">
      <section className="mb-8 rounded-base border border-border/30 bg-main p-6 text-main-foreground shadow-sm md:p-8">
        <h1 className="mb-3 text-3xl font-heading leading-tight sm:text-5xl">
          Hi, I&apos;m <span className="text-foreground">Henry</span>.
        </h1>
        <p className="max-w-2xl text-base leading-relaxed">
          Young self taught software developer from Germany
        </p>
        <GitHubStats username="Jumpstone" />
      </section>

      <section
        id="about"
        className="mb-8 rounded-base border border-border/30 bg-secondary-background p-6 shadow-sm"
      >
        <SectionHeading index="02" title="Hardware & Software" />
        <div className="mt-6 space-y-8 text-foreground">
          <div>
            <p className="text-sm leading-relaxed md:text-base">
              <b>PC Specs:</b> AMD Ryzen 5 3600, 32GB RAM, NVIDIA RTX 3060.
              <br />
              <b>OS:</b> Windows 11 Pro, Nobara Linux
              <br />
              <b>IDE:</b> Visual Studio Code with GitHub Desktop, JetBrains
              IntelliJ IDEA
            </p>
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="mb-8 rounded-base border border-border/30 bg-secondary-background p-6 shadow-sm"
      >
        <SectionHeading index="03" title="Projects" />
        <ProjectGrid projects={projects} />

        <div className="mt-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2.5 rounded-base border border-border/30 bg-main px-5 py-2.5 text-base font-heading text-main-foreground shadow-sm transition-opacity hover:opacity-80"
          >
            All projects
            <ArrowUpRight className="size-5" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
