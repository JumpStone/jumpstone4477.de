import { Suspense } from "react";
import Link from "next/link";
import StatsDisplay from "@/components/stats-display";
import type { CrewMember } from "@/lib/crew";

export default function CrewCard({ member }: { member: CrewMember }) {
  return (
    <Link
      href={`/crew/${member.slug}`}
      className="group block overflow-hidden rounded-base border border-border/30 bg-main font-base shadow-sm transition-colors hover:border-border/60"
    >
      <img
        className="w-full aspect-3/4"
        src={
          member.useskin === false
            ? "/skins/blank.png"
            : `/skins/${member.minecraftUser}.png`
        }
        alt={`Skin von ${member.minecraftUser}`}
        width={600}
        height={800}
      />
      <div className="border-t border-border/30 p-4 text-center">
        <p className="font-heading text-main-foreground group-hover:underline">
          {member.name}
        </p>
        <p className="text-sm text-foreground/60">{member.rolle}</p>
        <Suspense fallback={null}>
          <StatsDisplay slug={member.thescape_slug} />
        </Suspense>
      </div>
    </Link>
  );
}
