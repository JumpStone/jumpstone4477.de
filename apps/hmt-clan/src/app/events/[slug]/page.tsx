import SiteFooter from "@/components/site-footer";
import EventBody from "@/components/event-body";
import {
  getEventBySlug,
  getEventDescription,
  getAllEventSlugs,
} from "@/lib/events";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllEventSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {
      title: "Event Not Found",
      description: "The requested event could not be found.",
    };
  }

  return {
    title: { absolute: `${event.name} | HMT Clan` },
    description: event.description,
  };
}

function formatDate(date: string): string {
  return new Date(date + "T00:00:00").toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const description = await getEventDescription(slug);

  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 pb-0 md:px-8 md:pb-0">
      <section className="mb-8 rounded-base border border-border/30 bg-main p-6 text-main-foreground shadow-sm md:p-8">
        <p className="mb-2 text-sm text-foreground/60">
          {formatDate(event.date)}
          {event.showTime && event.time ? ` · ${event.time} Uhr` : ""}
        </p>
        <h1 className="mb-3 text-3xl font-heading leading-tight sm:text-4xl">
          <span className="text-foreground">{event.name}</span>
        </h1>
        <EventBody body={description} />
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
