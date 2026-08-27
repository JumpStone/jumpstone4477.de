import SiteFooter from "@/components/site-footer";
import crew from "@/lib/crew.json";

export default function Page() {
  const members = [...crew].sort((a, b) => a.priority - b.priority);

  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 md:px-8">
      <section className="mb-8 mt-8 rounded-base border border-border/30 bg-main p-6 text-main-foreground shadow-sm md:p-8">
        <h1 className="mb-3 text-3xl font-heading leading-tight sm:text-5xl">
          <span className="text-foreground">HMT Clan</span>
        </h1>
        <p className="max-w-2xl text-base leading-relaxed">
          HMT Clan, die Gruppe von Freunden die auf TheScape zusammen Minecraft
          spielt.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-6 text-2xl font-heading text-foreground sm:text-3xl">
          Crew
        </h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {members.map((member) => (
            <li key={member.minecraftUser}>
              <figure className="overflow-hidden rounded-base border border-border/30 bg-main font-base shadow-sm">
                <img
                  className="w-full aspect-3/4"
                  src={
                    member.useskin === false
                      ? "/skins/blank.png"
                      : `/skins/${member.minecraftUser}.png`
                  }
                  alt={`Skin von ${member.minecraftUser}`}
                  width={600}
                  height={800}
                />
                <figcaption className="border-t border-border/30 p-4 text-center">
                  <p className="font-heading text-main-foreground">
                    {member.name}
                  </p>
                  <p className="text-sm text-foreground/60">{member.rolle}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
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
