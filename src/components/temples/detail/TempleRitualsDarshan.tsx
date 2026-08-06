import { Flame, Info } from "lucide-react";
import SectionCard from "./SectionCard";
import type { ITempleRitual } from "@/types/templeTypes";

function formatWindow(startTime: string, endTime: string) {
  const start = startTime?.trim();
  const end = endTime?.trim();
  if (start && end) return `${start} – ${end}`;
  return start || end || "";
}

export default function TempleRitualsDarshan({ rituals = [] }: { rituals?: ITempleRitual[] }) {
  const visible = rituals.filter((r) => r.name?.trim());
  if (visible.length === 0) return null;

  return (
    <SectionCard icon={Info} title="Rituals & Darshan" accent>
      <div className="grid gap-3 sm:grid-cols-2">
        {visible.map((ritual) => (
          <div
            key={ritual.id}
            className="flex items-start gap-3 rounded-xl border border-sky-100 bg-sky-50/40 p-4"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-sky-500 shadow-sm">
              <Flame className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="font-heading text-sm font-bold text-slate-900">{ritual.name}</p>
              {formatWindow(ritual.startTime, ritual.endTime) && (
                <p className="mt-0.5 text-xs text-slate-500">
                  {formatWindow(ritual.startTime, ritual.endTime)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
