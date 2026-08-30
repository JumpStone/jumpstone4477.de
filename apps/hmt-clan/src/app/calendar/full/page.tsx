import CalendarWidget from "@/components/calendar-widget";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Kalender | HMT Clan" },
  description: "Der Event-Kalender von HMT Clan.",
};

export default function CalendarFullPage() {
  return (
    <main className="flex h-[100dvh] w-full flex-col p-2">
      <CalendarWidget className="flex-1" />
    </main>
  );
}
