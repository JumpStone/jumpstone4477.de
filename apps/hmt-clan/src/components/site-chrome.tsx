"use client";

import SiteHeader from "@/components/site-header";

export default function SiteChrome() {
  return (
    <>
      <SiteHeader />

      <div className="h-28 md:h-32" aria-hidden="true" />
    </>
  );
}
