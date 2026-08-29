"use client";

import Link from "next/link";
import { useConsent } from "@/components/consent-provider";

export default function CookieBanner() {
  const { snapshot, isDialogOpen, grant, deny } = useConsent();

  if (!snapshot.hydrated || snapshot.status !== null || isDialogOpen) {
    return null;
  }

  return (
    <aside
      role="region"
      aria-label="Cookie-Einwilligung"
      className="fixed bottom-4 right-4 z-50 w-80 max-w-[calc(100vw-2rem)] rounded-base border border-border/30 bg-secondary-background p-4 shadow-sm"
    >
      <p className="mb-3 text-sm leading-relaxed text-foreground/80">
        Für externe Dienste wie das Discord-Widget benötigen wir deine
        Einwilligung. Du kannst diese jederzeit widerrufen. Details findest du
        in der{" "}
        <Link
          href="/legal/privacy"
          className="text-foreground underline underline-offset-2 hover:opacity-80"
        >
          Datenschutzerklärung
        </Link>
        .
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={grant}
          className="flex-1 rounded-base border border-border/30 bg-main px-4 py-2 text-sm font-heading text-main-foreground shadow-sm transition-all duration-300 hover:opacity-80"
        >
          Akzeptieren
        </button>
        <button
          type="button"
          onClick={deny}
          className="flex-1 rounded-base border border-border/30 bg-background px-4 py-2 text-sm font-heading text-foreground shadow-sm transition-all duration-300 hover:opacity-80"
        >
          Ablehnen
        </button>
      </div>
    </aside>
  );
}
