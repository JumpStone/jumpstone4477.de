"use client";

import Link from "next/link";
import { useConsent } from "@/components/consent-provider";

const DISCORD_WIDGET_URL =
  "https://discord.com/widget?id=1008744945718415391&theme=dark";

export default function DiscordWidget() {
  const { snapshot, grant } = useConsent();

  return (
    <div className="flex h-[500px] w-full overflow-hidden rounded-base border border-border/30 bg-main shadow-sm">
      {snapshot.status === "granted" ? (
        <iframe
          src={DISCORD_WIDGET_URL}
          title="Discord-Widget"
          allowTransparency
          loading="lazy"
          className="h-full w-full border-0"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-6 text-center">
          <p className="font-heading text-main-foreground">Discord-Widget</p>
          <p className="max-w-60 text-sm text-foreground/70">
            Für dieses Widget ist Ihre Einwilligung erforderlich: Beim Laden
            werden Daten, z.&nbsp;B. Ihre IP-Adresse, an Discord als
            Drittanbieter übertragen.
          </p>
          <button
            type="button"
            onClick={grant}
            className="rounded-base border border-border/30 bg-secondary-background px-4 py-2 text-sm font-heading text-foreground shadow-sm transition-all duration-300 hover:opacity-80"
          >
            Einwilligen
          </button>
          <Link
            href="/legal/privacy"
            className="text-xs text-foreground/50 underline underline-offset-2 hover:text-foreground"
          >
            Datenschutzerklärung
          </Link>
        </div>
      )}
    </div>
  );
}
