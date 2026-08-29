"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useConsent } from "@/components/consent-provider";

const statusText: Record<string, string> = {
  granted: "Einwilligung erteilt – das Discord-Widget wird geladen.",
  denied: "Abgelehnt – das Discord-Widget bleibt deaktiviert.",
};

function StatusLine({ status }: { status: "granted" | "denied" | null }) {
  if (status === null) {
    return (
      <span className="text-foreground/50">Noch keine Auswahl getroffen.</span>
    );
  }
  return <span className="text-foreground/70">{statusText[status]}</span>;
}

export default function ConsentDialog() {
  const { snapshot, isDialogOpen, grant, deny, closeDialog } = useConsent();

  useEffect(() => {
    if (!isDialogOpen) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDialog();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isDialogOpen, closeDialog]);

  if (!isDialogOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie-Einstellungen"
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label="Dialog schließen"
        onClick={closeDialog}
        className="absolute inset-0 h-full w-full cursor-default bg-overlay"
      />
      <div className="relative w-full max-w-md rounded-base border border-border/30 bg-secondary-background p-6 shadow-sm">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="font-heading text-xl text-foreground">
            Cookie-Einstellungen
          </h2>
          <button
            type="button"
            aria-label="Schließen"
            onClick={closeDialog}
            className="inline-flex size-8 items-center justify-center rounded-base border border-border/30 bg-background text-foreground shadow-sm transition-all duration-300 hover:opacity-80"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-foreground/80">
          Für externe Dienste wie das Discord-Widget benötigen wir deine
          Einwilligung. Du kannst deine Wahl hier jederzeit ändern.
        </p>
        <p className="mb-4 text-xs leading-relaxed">
          <StatusLine status={snapshot.status} /> Mehr dazu in der{" "}
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
      </div>
    </div>
  );
}
