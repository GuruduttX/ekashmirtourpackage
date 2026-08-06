import Link from "next/link";
import { Clock, Landmark, MapPin, Navigation } from "lucide-react";
import SectionCard from "./SectionCard";

export default function TempleInformation({
  timings,
  address,
  templeName,
}: {
  /** Compact opening-hours summary derived from the temple's seasonal timings. */
  timings?: string;
  address?: string;
  templeName: string;
}) {
  const rows = [
    { icon: Clock, label: "Opening Hours", value: timings },
    { icon: MapPin, label: "Address", value: address },
  ].filter((r) => r.value?.trim());

  if (rows.length === 0) return null;

  const directionsQuery = encodeURIComponent(address?.trim() || templeName);

  return (
    <SectionCard icon={Landmark} title="Temple Information">
      <dl className="space-y-4">
        {rows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-3">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
            <div className="min-w-0">
              <dt className="text-sm font-bold text-slate-900">{label}</dt>
              <dd className="mt-0.5 text-xs text-slate-500">{value}</dd>
            </div>
          </div>
        ))}
      </dl>

      <Link
        href={`https://www.google.com/maps/dir/?api=1&destination=${directionsQuery}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-500 to-cyan-400 py-3 text-sm font-semibold text-white shadow-md shadow-sky-200 transition-transform hover:-translate-y-0.5"
      >
        <Navigation className="h-4 w-4" /> Get Directions
      </Link>
    </SectionCard>
  );
}
