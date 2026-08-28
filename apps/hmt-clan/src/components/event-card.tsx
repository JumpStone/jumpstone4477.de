import Link from "next/link";
import type { EventConfig } from "@/lib/events/types";

export default function EventCard({ event }: { event: EventConfig }) {
  return (
    <article className="flex h-full flex-col rounded-base border border-border/30 bg-main font-base shadow-sm">
      <div className="flex-1 p-5">
        <p className="mb-2 text-sm text-foreground/60">
          {new Date(event.date + "T00:00:00").toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
          {event.showTime && event.time ? ` · ${event.time} Uhr` : ""}
          {event.done && (
            <span className="ml-2 inline-block rounded-full border border-red-900/60 bg-red-900/80 px-2 py-0.5 text-xs font-heading text-white">
              Vorbei
            </span>
          )}
        </p>
        <h3 className="mb-2 font-heading text-lg text-main-foreground">
          {event.name}
        </h3>
        <p className="text-sm text-foreground/70">{event.description}</p>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-border/30 p-5 pt-4">
        {event.showDetailsButton && (
          <Link
            href={`/events/${event.slug}`}
            className="rounded-base border border-border/30 bg-secondary-background px-4 py-2 text-sm font-heading text-foreground shadow-sm transition-all duration-300 hover:opacity-80"
          >
            Details
          </Link>
        )}
        {event.links?.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-base border border-border/30 bg-secondary-background px-4 py-2 text-sm font-heading text-foreground shadow-sm transition-all duration-300 hover:opacity-80"
          >
            {link.displayName}
          </a>
        ))}
      </div>
    </article>
  );
}
