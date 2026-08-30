import { Clock, Coins, Gamepad2 } from "lucide-react";
import { getThescapeStats } from "@/lib/thescape";

interface StatsDisplayProps {
  slug?: string;
}

export default async function StatsDisplay({ slug }: StatsDisplayProps) {
  if (!slug || slug.trim().length === 0) {
    return null;
  }

  const stats = await getThescapeStats(slug);

  const showLevel = Boolean(stats.level);
  const showPlayTime = Boolean(stats.playTime);
  const showCoins = Boolean(stats.coins);

  if (!showLevel && !showPlayTime && !showCoins) {
    return null;
  }

  return (
    <div className="mt-2 flex items-center justify-center gap-4 text-sm text-gray-300">
      {showLevel && stats.level && (
        <span className="flex items-center gap-1.5">
          <Gamepad2 className="h-4 w-4 text-gray-400" aria-hidden="true" />
          Level {stats.level}
        </span>
      )}
      {showPlayTime && stats.playTime && (
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" aria-hidden="true" />
          {stats.playTime}
        </span>
      )}
      {showCoins && stats.coins && (
        <span className="flex items-center gap-1.5">
          <Coins className="h-4 w-4" aria-hidden="true" />
          {stats.coins}
        </span>
      )}
    </div>
  );
}
