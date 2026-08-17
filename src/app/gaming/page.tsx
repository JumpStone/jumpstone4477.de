import SiteFooter from "@/components/site-footer";
import { getProjects } from "@/lib/modrinth";
import type { Metadata } from "next";
import ProjectTabs from "./ProjectTabs";

export const metadata: Metadata = {
  title: {
    absolute: "Gaming | HenryMM",
  },
  description:
    "Minecraft modpacks, resource packs, and other gaming projects available on Modrinth.",
};

export default async function GamingPage() {
  const projects = await getProjects();

  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 pb-0 md:px-8 md:pb-0">
      <section className="mb-8 rounded-base border border-border/30 bg-main p-6 text-main-foreground shadow-sm md:p-8">
        <h1 className="mb-3 text-3xl font-heading leading-tight sm:text-5xl">
          Minecraft Content / Projects
        </h1>
        <p className="max-w-3xl text-base leading-relaxed">
          Browse my modpacks, resource packs, and other Minecraft projects
          published on Modrinth.
        </p>
      </section>

      <section className="mb-8 rounded-base border border-border/30 bg-secondary-background p-6 shadow-sm md:p-8">
        <h2 className="mb-4 text-xl font-heading">Projects</h2>
        <ProjectTabs projects={projects} />
      </section>

      <p className="mb-8 text-center text-sm text-foreground/40">
        NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH
        MOJANG OR MICROSOFT.
      </p>

      <SiteFooter />
    </main>
  );
}
