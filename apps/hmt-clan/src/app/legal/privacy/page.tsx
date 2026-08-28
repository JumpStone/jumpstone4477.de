import SiteFooter from "@/components/site-footer";
import LegalBody from "@/components/legal-body";
import { readFile } from "fs/promises";
import { join } from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Datenschutzerklärung | HMT Clan" },
  description: "Datenschutzerklärung für die HMT Clan Website.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Datenschutzerklärung",
    description: "Datenschutzerklärung für die HMT Clan Website.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_URL || "https://hmt-clan.vercel.app"}/legal/privacy`,
  },
};

export default async function PrivacyPage() {
  const content = await readFile(
    join(process.cwd(), "src/content/legal/privacy.md"),
    "utf-8"
  );

  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 pb-0 md:px-8 md:pb-0">
      <section className="mb-8 rounded-base border border-border/30 bg-main p-6 text-main-foreground shadow-sm md:p-8">
        <h1 className="mb-2 text-3xl font-heading md:text-4xl">
          Datenschutzerklärung
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed md:text-base">
          Informationen zur Verarbeitung personenbezogener Daten und zu Ihren
          Datenschutzrechten.
        </p>
      </section>

      <article className="mb-8 rounded-base border border-border/30 bg-secondary-background p-6 shadow-sm md:p-8">
        <section className="rounded-base border border-border/30 bg-background p-5 shadow-sm">
          <LegalBody content={content} />
        </section>
      </article>

      <p className="mb-8 text-center text-sm text-foreground/40">
        NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH
        MOJANG OR MICROSOFT.
        <br />
        NICHT MIT THESCAPE VERBUNDEN.
      </p>

      <SiteFooter />
    </main>
  );
}
