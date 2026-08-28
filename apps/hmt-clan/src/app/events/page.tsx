import SiteFooter from "@/components/site-footer";
import EventCard from "@/components/event-card";
import { getVisibleEvents } from "@/lib/events";
import type { EventConfig } from "@/lib/events/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Events | HMT Clan" },
  description: "Alle Events des HMT Clans.",
};

function EventGrid({ events }: { events: EventConfig[] }) {
  if (events.length === 0) return null;

  return (
    <ul className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <li key={event.slug}>
          <EventCard event={event} />
        </li>
      ))}
    </ul>
  );
}

export default function EventsPage() {
  const events = getVisibleEvents();

  const upcoming = events.filter((e) => !e.done);
  const past = events.filter((e) => e.done);

  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 pb-0 md:px-8 md:pb-0">
      <section className="mb-8 rounded-base border border-border/30 bg-main p-6 text-main-foreground shadow-sm md:p-8">
        <h1 className="mb-3 text-3xl font-heading leading-tight sm:text-5xl">
          <span className="text-foreground">Events</span>
        </h1>
        <p className="max-w-2xl text-base leading-relaxed">
          Alle Events des HMT Clans auf einen Blick.
        </p>
      </section>

      {upcoming.length === 0 && past.length === 0 ? (
        <div className="mb-8 rounded-base border border-dashed border-border/40 bg-main px-6 py-10 text-center font-base shadow-sm">
          <p className="mb-1 font-heading text-lg text-main-foreground">
            Keine Events in Planung
          </p>
          <p className="text-sm text-foreground/60">
            Aktuell sind keine Events veröffentlicht. Es sind aber bestimmt
            bereits welche in Planung – schau später noch einmal vorbei.
          </p>
        </div>
      ) : (
        <>
          {upcoming.length > 0 && <EventGrid events={upcoming} />}

          {past.length > 0 && (
            <section className="mb-8">
              <h2 className="mb-6 text-2xl font-heading text-foreground sm:text-3xl">
                Vergangene Events
              </h2>
              <EventGrid events={past} />
            </section>
          )}
        </>
      )}

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
