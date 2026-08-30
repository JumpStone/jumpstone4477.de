"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import SiteHeader from "@/components/site-header";

function CalendarHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="flex items-center gap-3 p-3">
        <Link href="/" aria-label="Zur Startseite">
          <img src="/logo.png" alt="HMT Clan Logo" className="size-9" />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-heading text-foreground/80 hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Zurück
        </Link>
      </div>
    </header>
  );
}

export default function SiteChrome() {
  const pathname = usePathname();

  if (pathname === "/calendar/full") {
    return null;
  }

  return (
    <>
      {pathname === "/calendar" ? (
        <CalendarHeader />
      ) : (
        <>
          <SiteHeader />
          <div className="h-28 md:h-32" aria-hidden="true" />
        </>
      )}
    </>
  );
}