"use client";

import { useMemo } from "react";
import NavPanel, {
  NavCard,
  PanelMessage,
  PanelSkeleton,
} from "@/components/layout/nav/NavPanel";
import type { NavTemple } from "@/components/layout/useNavCollections";

/**
 * Temples mega-dropdown.
 *
 * A short collection, so like Destinations it lists everything published rather
 * than filtering — and the card carries the two things that decide whether a
 * temple fits into a day: the distance from Srinagar and the entry fee.
 *
 * "Free" is the honest answer for most of these and is stored as a display
 * string, which is why the card prints it rather than formatting a number that
 * would read 0 as unknown.
 */
export default function TemplesDropdown({
  onClose,
  temples,
  isLoading,
  hasError,
}: {
  onClose: () => void;
  temples: NavTemple[];
  isLoading: boolean;
  hasError: boolean;
}) {
  const stats = useMemo(
    () => [{ label: "Shrines", value: `${temples.length}` }],
    [temples.length],
  );

  const columns = Math.min(temples.length || 3, 3);

  return (
    <NavPanel
      width={760}
      eyebrow="Temples and shrines, with the practical details you need on the day"
      stats={temples.length ? stats : undefined}
      onClose={onClose}
      primary={{ href: "/temples", label: "🛕 All Temples & Shrines →" }}
      secondary={{ href: "/cab-service", label: "🚕 Book a Cab" }}
    >
      <div className="p-4">
        {isLoading ? (
          <PanelSkeleton count={3} columns={3} />
        ) : hasError ? (
          <PanelMessage>Couldn&apos;t load temples right now.</PanelMessage>
        ) : temples.length === 0 ? (
          <PanelMessage>No temples published yet.</PanelMessage>
        ) : (
          <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {temples.map((temple) => (
              <NavCard
                key={temple.id}
                href={`/temples/${temple.slug}`}
                onClose={onClose}
                image={temple.image}
                alt={temple.imageAlt}
                title={temple.title}
                imageHeight={112}
                badge={temple.entryFee || undefined}
                meta={[temple.deity, temple.location]}
                footLabel="From Srinagar"
                footValue={temple.distance || undefined}
                cta="→"
              />
            ))}
          </div>
        )}
      </div>
    </NavPanel>
  );
}
