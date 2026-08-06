import { CalendarDays, Clock, MapPin, Sparkles } from "lucide-react";

const chip =
  "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm";

export default function TempleInfoChips({
  location,
  timings,
  bestTime,
  deity,
}: {
  location?: string;
  /** Compact opening-hours summary, e.g. "3:00 AM – 11:00 PM". */
  timings?: string;
  /** The "Best" rated period, e.g. "Oct-Mar". */
  bestTime?: string;
  deity?: string;
}) {
  const chips = [
    { icon: MapPin, text: location },
    { icon: Clock, text: timings },
    { icon: CalendarDays, label: "Best Time", text: bestTime },
    { icon: Sparkles, label: "Diety", text: deity },
  ].filter((c) => c.text?.trim());

  if (chips.length === 0) return null;

  return (
    <div className="no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0">
      <div className="flex w-max items-center gap-3 sm:w-auto sm:flex-wrap">
        {chips.map(({ icon: Icon, label, text }) => (
          <span key={label ?? text} className={chip}>
            <Icon className="h-4 w-4 shrink-0 text-sky-500" />
            {label && <span className="text-slate-400">{label}</span>}
            <span>{text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
