"use client";

import Link from "next/link";
import { useConsent } from "@/components/consent-provider";

const CALENDAR_WIDGET_URL =
  "https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FBerlin&showPrint=0&showTz=0&mode=WEEK&src=MWUxNDA2MjRiMDQ2NTgyNzM2NDA4NjA2ODYyZmRmYTBlZDUwZjliODcyODFkYzY0ZDFmNzM3MWE3MzMxNWQ1ZEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%237986cb";

export default function CalendarWidget({ className = "" }: { className?: string }) {
  const { snapshot, grant } = useConsent();

  return (
    <div
      className={`flex h-[600px] w-full overflow-hidden rounded-base border border-border/30 bg-main shadow-sm ${className}`}
    >
      {snapshot.status === "granted" ? (
        <iframe
          src={CALENDAR_WIDGET_URL}
          title="Google-Kalender"
          style={{ borderWidth: 0 }}
          width={800}
          height={600}
          allowTransparency
          loading="lazy"
          className="h-full w-full border-0 invert-[0.9] hue-rotate-180"
        />
      ) : (
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
          <p className="font-heading text-main-foreground">Google-Kalender</p>
          <p className="max-w-60 text-sm text-foreground/70">
            Für dieses Widget ist Ihre Einwilligung erforderlich: Beim Laden
            werden Daten, z.&nbsp;B. Ihre IP-Adresse, an Google als
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