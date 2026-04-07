import { Badge } from "@/components/ui/badge";
import GitHubSections from "@/components/github-sections";
import SectionHeading from "@/components/section-heading";
import SiteFooter from "@/components/site-footer";
import { ArrowUpRight } from "lucide-react";

type ProjectCard = {
  title: string;
  description: string;
  tags: string[];
  links: Array<{ label: string; href: string }>;
};

const featuredProjects: ProjectCard[] = [
  {
    title: "JS Gaming",
    description:
      "Modpacks, resource packs, and technical tooling for Minecraft ecosystems.",
    tags: ["Java", "Game Tooling", "Design"],
    links: [
      {
        label: "Modrinth",
        href: "https://modrinth.com/organization/jumpstone-gaming",
      },
      { label: "GitHub", href: "https://github.com/jumpstone-gaming" },
    ],
  },
  {
    title: "Akku-Craft",
    description:
      "A modular power-bank platform focused on hardware reliability and expandability.",
    tags: ["Arduino", "BMS", "Hardware"],
    links: [
      { label: "GitHub", href: "https://github.com/akku-craft" },
      { label: "Wiki", href: "https://github.com/akku-craft/wiki/wiki" },
    ],
  },
];

const otherProjects: ProjectCard[] = [
  {
    title: "Link Shortener",
    description:
      "A private URL shortener built with JavaScript and deployed on Cloudflare Workers.",
    tags: ["JavaScript", "Cloudflare Workers"],
    links: [
      {
        label: "Repository",
        href: "https://github.com/JumpStone/link-shortener",
      },
    ],
  },
];

function ProjectGrid({ projects }: { projects: ProjectCard[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {projects.map((project) => (
        <article
          key={project.title}
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

export default function Page() {
  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 pb-0 md:px-8 md:pb-0">
      <section className="mb-8 rounded-base border border-border/30 bg-main p-6 text-main-foreground shadow-sm md:p-8">
        <h1 className="mb-3 text-3xl font-heading leading-tight sm:text-5xl">
          Hi, I&apos;m <span className="text-foreground">Henry</span>.
        </h1>
        <p className="max-w-2xl text-base leading-relaxed">
          Software developer and hardware enthusiast from Germany
        </p>
      </section>

      <section
        id="about"
        className="mb-8 rounded-base border border-border/30 bg-secondary-background p-6 shadow-sm"
      >
        <SectionHeading index="02" title="About" />

        <div className="mt-6 space-y-8 text-foreground">
          <div>
            <h3 className="mb-4 text-xl font-bold">Currently learning</h3>
            <img
              src="https://skillicons.dev/icons?i=js,ts,githubactions"
              alt="Currently learning"
            />
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold">Tools</h3>
            <img
              src="https://skillicons.dev/icons?i=git,github,githubactions,cloudflare,docker,firebase,mysql,redis,npm,nginx,vscode,idea,arduino,bash,powershell&perline=10"
              alt="Tools"
              className="max-w-full"
            />
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold">Libraries</h3>
            <img src="https://skillicons.dev/icons?i=nextjs" alt="Libraries" />
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold">Programming Languages</h3>
            <img
              src="https://skillicons.dev/icons?i=html,css,js,ts"
              alt="Programming Languages"
            />
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="mb-8 rounded-base border border-border/30 bg-secondary-background p-6 shadow-sm"
      >
        <SectionHeading index="03" title="Featured Projects" />
        <ProjectGrid projects={featuredProjects} />
      </section>

      <section
        id="other-projects"
        className="mb-8 rounded-base border border-border/30 bg-secondary-background p-6 shadow-sm"
      >
        <SectionHeading index="04" title="Other Projects" />
        <ProjectGrid projects={otherProjects} />
      </section>

      <GitHubSections username="Jumpstone" />

      <SiteFooter />
    </main>
  );
}
