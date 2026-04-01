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
          className="rounded-base border-2 border-border bg-secondary-background p-5 shadow-shadow"
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
                className="inline-flex items-center gap-2 rounded-base border-2 border-border bg-main px-3 py-1.5 text-sm font-heading text-main-foreground shadow-shadow transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
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
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[36px_36px] opacity-10" />

      <section className="mb-8 rounded-base border-2 border-border bg-main p-6 text-main-foreground shadow-shadow md:p-8">
        <h1 className="mb-3 text-3xl font-heading leading-tight sm:text-5xl">
          Hi, I&apos;m{" "}
          <span className="glitch-name" data-text="Henry">
            Henry
          </span>
          .
        </h1>
        <p className="max-w-2xl text-base leading-relaxed">
          Software developer and hardware enthusiast from Germany
        </p>
      </section>

      <section
        id="about"
        className="mb-8 rounded-base border-2 border-border bg-secondary-background p-6 shadow-shadow"
      >
        <SectionHeading index="02" title="About" />
        <p className="mb-4 max-w-4xl text-sm leading-relaxed md:text-base">
          I am a self-taught developer and sysadmin currently in secondary
          school. While others are just consuming content, I prefer building the
          infrastructure behind it. My focus lies in automating processes and
          maintaining secure, scalable HomeLab systems.
        </p>
        <h2 className="mb-3 text-xl font-heading">The Story:</h2>
        <ul className="list-disc pl-6">
          <li className="mb-2 text-sm leading-relaxed md:text-base">
            The Spark: It all started with a fascination for hardware and the
            question of how to not just use PC systems, but to configure and
            optimize them from the ground up.
          </li>
          <li className="mb-2 text-sm leading-relaxed md:text-base">
            From Gaming to Admin: Building and technically leading a Minecraft
            network was my "baptism by fire" in terms of community management
            and server stability.
          </li>
          <li className="mb-2 text-sm leading-relaxed md:text-base">
            Deep Dive: Standard software soon wasn't enough. I dove into the
            world of Linux (Debian, Fedora), Docker virtualization, and
            professional monitoring with Grafana & Prometheus.
          </li>
          <li className="mb-2 text-sm leading-relaxed md:text-base">
            Current Mission: My biggest achievement so far has been winning 1st
            place in the "Jugend forscht" regional round (2026). Currently, I am
            tinkering with custom hardware like my Python-based travel router
            and preparing for the state-level competition.
          </li>
        </ul>
        <h2 className="mb-3 text-xl font-heading">Why I Do What I Do:</h2>
        <p className="mb-4 max-w-4xl text-sm leading-relaxed md:text-base">
          I love solving complex problems that others don't even see. My goal is
          to understand, bend, and improve technology.
        </p>
      </section>

      <section
        id="projects"
        className="mb-8 rounded-base border-2 border-border bg-secondary-background p-6 shadow-shadow"
      >
        <SectionHeading index="03" title="Featured Projects" />
        <ProjectGrid projects={featuredProjects} />
      </section>

      <section
        id="other-projects"
        className="mb-8 rounded-base border-2 border-border bg-secondary-background p-6 shadow-shadow"
      >
        <SectionHeading index="04" title="Other Projects" />
        <ProjectGrid projects={otherProjects} />
      </section>

      <GitHubSections username="Jumpstone" />

      <SiteFooter />
    </main>
  );
}
