import type { Metadata } from "next";
import SiteFooter from "@/components/site-footer";
import CrewOverview, {
  type CrewSearchCard,
} from "@/components/crew-overview";
import CrewCard from "@/components/crew-card";
import { crew } from "@/lib/crew";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Crew | HMT Clan" },
  description:
    "Alle Mitglieder des HMT Clans auf einen Blick – mit Suche nach Spielernamen, Rolle und Minecraft-Namen.",
};

export default function CrewPage() {
  const members = [...crew].sort((a, b) => a.priority - b.priority);

  const cards: CrewSearchCard[] = members.map((member) => ({
    key: member.minecraftUser,
    searchText: `${member.name} ${member.rolle} ${member.minecraftUser}`.toLowerCase(),
    node: <CrewCard member={member} />,
  }));

  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 md:px-8">
      <section className="mb-8 mt-8 rounded-base border border-border/30 bg-main p-6 text-main-foreground shadow-sm md:p-8">
        <h1 className="mb-3 text-3xl font-heading leading-tight sm:text-5xl">
          <span className="text-foreground">Crew</span>
        </h1>
        <p className="max-w-2xl text-base leading-relaxed">
          Alle Mitglieder des HMT Clans auf einen Blick. Suche nach Name, Rolle
          oder Minecraft-Namen und klicke auf ein Mitglied für die
          Detailansicht.
        </p>
      </section>

      <CrewOverview cards={cards} />

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
