import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, Coins, Eye, TrendingUp, Info, Gamepad2 } from "lucide-react";
import SiteFooter from "@/components/site-footer";
import { getCrewMemberBySlug } from "@/lib/crew";
import { getFullThescapeProfile } from "@/lib/thescape";
import type { StatCategory, StatCard } from "@/lib/thescape";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = getCrewMemberBySlug(slug);

  if (!member) {
    return {
      title: "Mitglied nicht gefunden | HMT Clan",
      description: "Das gesuchte Crew-Mitglied konnte nicht gefunden werden.",
    };
  }

  return {
    title: { absolute: `${member.name} | HMT Clan` },
    description: `Crew-Mitglied ${member.name} (${member.rolle}) beim HMT Clan.`,
  };
}

function HeaderStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-foreground/50">{icon}</span>
      <span className="text-main-foreground">{value}</span>
      <span className="hidden sm:inline text-foreground/50">{label}</span>
    </div>
  );
}

function StatCardTile({ stat }: { stat: StatCard }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl text-center">
      <p className="text-3xl font-bold text-white">{stat.value}</p>
      <p className="mt-1 text-sm text-zinc-400">{stat.label}</p>
    </div>
  );
}

function CategorySection({ category }: { category: StatCategory }) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-heading text-foreground flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-green-500" aria-hidden="true" />
        {category.title}
      </h2>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {category.stats.map((stat) => (
          <li key={`${category.title}-${stat.label}`}>
            <StatCardTile stat={stat} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function CrewMemberPage({ params }: Props) {
  const { slug } = await params;
  const member = getCrewMemberBySlug(slug);

  if (!member) {
    notFound();
  }

  const profile = await getFullThescapeProfile(member.thescape_slug);

  const hasHeaderStats = Boolean(
    profile.playTime || profile.lastSeen || profile.coins,
  );

  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 pb-0 md:px-8 md:pb-0">
      <section className="mb-8 rounded-base border border-border/30 bg-main p-6 text-main-foreground shadow-sm md:p-8">
        {member.useskin === false && (
          <img
            src="/skins/blank.png"
            alt={`Skin von ${member.minecraftUser}`}
            width={600}
            height={800}
            className="mx-auto mb-6 w-32 rounded-base border border-border/30 shadow-sm sm:w-40"
          />
        )}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
          {member.useskin !== false && (
            <img
              src={`/skins/${member.minecraftUser}.png`}
              alt={`Skin von ${member.minecraftUser}`}
              width={600}
              height={800}
              className="w-32 shrink-0 rounded-base border border-border/30 shadow-sm sm:w-40"
            />
          )}
          <div className="w-full text-center sm:text-left">
            <p className="mb-2 text-sm text-foreground/60">{member.rolle}</p>
            <h1 className="mb-4 text-3xl font-heading leading-tight sm:text-4xl">
              <span className="text-foreground">{member.name}</span>
            </h1>

            {profile.level && (
              <p className="mb-4 flex items-center justify-center gap-2 border-b border-border/30 pb-4 text-sm sm:justify-start">
                <Gamepad2
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span className="text-foreground/70">InGame-Level:</span>
                <span className="text-emerald-400 font-bold">
                  {profile.level}
                </span>
              </p>
            )}

            {hasHeaderStats && (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-border/30 pt-4 sm:justify-start">
                {profile.playTime && (
                  <HeaderStat
                    icon={<Clock className="h-4 w-4" aria-hidden="true" />}
                    value={profile.playTime}
                    label="Spielzeit"
                  />
                )}
                {profile.lastSeen && (
                  <HeaderStat
                    icon={<Eye className="h-4 w-4" aria-hidden="true" />}
                    value={profile.lastSeen}
                    label="Zuletzt gesehen"
                  />
                )}
                {profile.coins && (
                  <HeaderStat
                    icon={<Coins className="h-4 w-4" aria-hidden="true" />}
                    value={profile.coins}
                    label="Münzen"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mb-8 space-y-8">
        {profile.categories.length > 0 ? (
          profile.categories.map((category) => (
            <CategorySection key={category.title} category={category} />
          ))
        ) : (
          <div className="rounded-base border border-dashed border-border/40 bg-main px-6 py-10 text-center font-base shadow-sm">
            <Info
              className="mx-auto mb-3 h-8 w-8 text-foreground/40"
              aria-hidden="true"
            />
            <p className="mb-1 font-heading text-lg text-main-foreground">
              Keine erweiterten Statistiken verfügbar
            </p>
            <p className="text-sm text-foreground/60">
              Für dieses Mitglied konnten aktuell keine Statistiken gefunden
              werden. Schau später noch einmal vorbei.
            </p>
          </div>
        )}
      </section>

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
