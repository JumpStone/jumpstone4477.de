"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Search } from "lucide-react";

export type CrewSearchCard = {
  key: string;
  searchText: string;
  node: ReactNode;
};

type CrewOverviewProps = {
  cards: CrewSearchCard[];
};

export default function CrewOverview({ cards }: CrewOverviewProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return cards;
    }
    return cards.filter((card) => card.searchText.includes(q));
  }, [cards, query]);

  return (
    <section id="crew" className="mb-8">
      <h2 className="mb-6 text-2xl font-heading text-foreground sm:text-3xl">
        Crew
      </h2>

      <div className="relative mb-6 max-w-md">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/40"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Mitglied suchen…"
          aria-label="Mitglied suchen"
          className="w-full rounded-base border border-border/30 bg-secondary-background py-2.5 pl-10 pr-4 text-sm text-foreground shadow-sm outline-none placeholder:text-foreground/40 focus:border-border/60"
        />
      </div>

      {filtered.length > 0 ? (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((card) => (
            <li key={card.key}>{card.node}</li>
          ))}
        </ul>
      ) : (
        <div className="rounded-base border border-dashed border-border/40 bg-main px-6 py-10 text-center font-base shadow-sm">
          <p className="mb-1 font-heading text-lg text-main-foreground">
            Keine Mitglieder gefunden
          </p>
          <p className="text-sm text-foreground/60">
            Für &bdquo;{query}&ldquo; wurde kein passendes Crew-Mitglied
            gefunden.
          </p>
        </div>
      )}
    </section>
  );
}
