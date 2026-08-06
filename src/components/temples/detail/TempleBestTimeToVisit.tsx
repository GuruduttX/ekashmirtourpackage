import { Sun } from "lucide-react";
import SectionCard from "./SectionCard";
import type { ITempleBestTime, TempleSeasonLabel } from "@/types/templeTypes";

const BADGE_STYLES: Record<TempleSeasonLabel, string> = {
  Best: "bg-emerald-500",
  Hot: "bg-orange-500",
  Monsoon: "bg-sky-400",
};

export default function TempleBestTimeToVisit({
  bestTimes = [],
}: {
  bestTimes?: ITempleBestTime[];
}) {
  const visible = bestTimes.filter((b) => b.period?.trim());
  if (visible.length === 0) return null;

  return (
    <SectionCard icon={Sun} title="Best Time to visit">
      <ul className="space-y-2.5">
        {visible.map((entry) => (
          <li
            key={entry.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3"
          >
            <span className="text-sm font-medium text-slate-700">{entry.period}</span>
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold text-white ${
                BADGE_STYLES[entry.type] ?? BADGE_STYLES.Best
              }`}
            >
              {entry.type}
            </span>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
