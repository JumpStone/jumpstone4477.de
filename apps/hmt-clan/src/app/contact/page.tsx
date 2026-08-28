import SiteFooter from "@/components/site-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Contact | HMT Clan" },
  description:
    "Get in touch with HMT Clan. Contact information for the crew and inquiries.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Contact HMT Clan",
    description: "Get in touch with the HMT Clan crew and inquiries.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_URL || "https://hmt-clan.vercel.app"}/contact`,
  },
};

const discordUsername = "henrymmey";
const discordId = "1008346032230387752";
const discordServerInvite = "8aWmBuYURK";
const contactEmail = "hmt-clan@henrymeyer.de";

export default function ContactPage() {
  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 pb-0 md:px-8 md:pb-0">
      <section className="mb-8 rounded-base border border-border/30 bg-main p-6 text-main-foreground shadow-sm md:p-8">
        <h1 className="mb-2 text-3xl font-heading md:text-4xl">Contact</h1>
      </section>

      <section className="mb-8 rounded-base border border-border/30 bg-secondary-background p-6 shadow-sm md:p-8">
        <div className="rounded-base border border-border/30 bg-background p-5 shadow-sm">
          <h2 className="mb-3 text-xl font-heading">Discord</h2>
          <p className="text-sm leading-relaxed md:text-base">
            <span className="font-heading">User: </span>
            <a
              href={`https://discord.com/users/${discordId}`}
              className="underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              @{discordUsername}
            </a>

            <br />
            <span className="font-heading">Server: </span>
            <a
              href={`https://discord.gg/${discordServerInvite}`}
              className="underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              HMT Clan Discord-Server
            </a>
          </p>
        </div>
      </section>

      <article className="mb-8 rounded-base border border-border/30 bg-secondary-background p-6 shadow-sm md:p-8">
        <section className="rounded-base border border-border/30 bg-background p-5 shadow-sm">
          <h2 className="mb-3 text-xl font-heading">Email</h2>
          <p className="text-sm leading-relaxed md:text-base">
            <a
              href={`mailto:${contactEmail}`}
              className="underline underline-offset-2"
            >
              {contactEmail}
            </a>
          </p>
        </section>
      </article>

      <SiteFooter />
    </main>
  );
}
