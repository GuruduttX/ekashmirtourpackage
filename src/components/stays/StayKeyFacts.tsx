import { BedDouble, Coffee, DoorOpen, ParkingCircle, Users, Wifi } from "lucide-react";
import type { StayDetailPage } from "@/lib/stayDetailPage";

/**
 * First content section in the left column: the answer-first block (AEO) plus
 * the key facts a traveller checks before anything else.
 */
export default function StayKeyFacts({ stay }: { stay: StayDetailPage }) {
  const quickBadges = [
    stay.quickInclusions.breakfast && { icon: Coffee, label: "Breakfast included" },
    stay.quickInclusions.freeWifi && { icon: Wifi, label: "Free Wi-Fi" },
    stay.quickInclusions.parking && { icon: ParkingCircle, label: "Parking" },
  ].filter(Boolean) as Array<{ icon: typeof Coffee; label: string }>;

  return (
    <section>
      <div className="flex flex-wrap justify-center gap-2.5 md:justify-start">
        {stay.sleeps > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3.5 py-2 text-sm text-slate-700">
            <Users className="h-4 w-4 text-sky-500" /> Sleeps {stay.sleeps}
          </span>
        )}
        {stay.bedrooms > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3.5 py-2 text-sm text-slate-700">
            <BedDouble className="h-4 w-4 text-sky-500" />
            {stay.bedrooms} {stay.bedrooms === 1 ? "bedroom" : "bedrooms"}
          </span>
        )}
        {stay.checkIn && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3.5 py-2 text-sm text-slate-700">
            <DoorOpen className="h-4 w-4 text-sky-500" />
            Check-in {stay.checkIn}
          </span>
        )}
        {quickBadges.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 rounded-full border border-sky-100 bg-sky-50 px-3.5 py-2 text-sm font-medium text-sky-700"
          >
            <Icon className="h-4 w-4" /> {label}
          </span>
        ))}
      </div>

      {/* Answer-first block — the text most likely to be lifted into an AI
          Overview or featured snippet, so it stays server-rendered and high on
          the page, directly under the facts it summarises. */}
      <p className="mt-6 text-center text-base leading-7 text-slate-600 md:text-left">
        {stay.quickAnswer}
      </p>
    </section>
  );
}
