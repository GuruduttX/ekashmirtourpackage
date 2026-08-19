"use client";

import { useMemo } from "react";
import NavPanel, {
  NavCard,
  PanelMessage,
  PanelSkeleton,
} from "@/components/layout/nav/NavPanel";
import type { NavDestination } from "@/components/layout/useNavCollections";

/**
 * Destinations mega-dropdown.
 *
 * No filter rail: there are four places in the valley worth a page, and a
 * filter over four items is furniture. They all fit in one row, so the panel
 * shows every published destination rather than a selection — which also means
 * it can never quietly hide one.
 *
 * The card leads with the drive from Srinagar, because that is the question
 * this menu is actually being opened to answer.
 */
export default function DestinationsDropdown({
  onClose,
  destinations,
  isLoading,
  hasError,
}: {
  onClose: () => void;
  destinations: NavDestination[];
  isLoading: boolean;
  hasError: boolean;
}) {
  const stats = useMemo(
    () => [{ label: "Places", value: `${destinations.length}` }],
    [destinations.length],
  );

  // Four across is the design; more than that and each card is too narrow to
  // carry its meta line, so it wraps to a second row instead.
  const columns = Math.min(destinations.length || 4, 4);

  return (
    <NavPanel
      width={860}
      eyebrow="Every corner of the valley, and how long it takes to get there"
      stats={destinations.length ? stats : undefined}
      onClose={onClose}
      primary={{ href: "/destinations", label: "🗺 Explore All Destinations →" }}
      secondary={{ href: "/stays", label: "🛏 Where to Stay" }}
    >
      <div className="p-4">
        {isLoading ? (
          <PanelSkeleton count={4} columns={4} />
        ) : hasError ? (
          <PanelMessage>Couldn&apos;t load destinations right now.</PanelMessage>
        ) : destinations.length === 0 ? (
          <PanelMessage>No destinations published yet.</PanelMessage>
        ) : (
          <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {destinations.map((place) => (
              <NavCard
                key={place.id}
                href={`/destinations/${place.slug}`}
                onClose={onClose}
                image={place.image}
                alt={place.imageAlt}
                title={place.name}
                imageHeight={104}
                badge={place.idealDays || undefined}
                meta={[place.summary]}
                footLabel="From Srinagar"
                // Srinagar itself has no drive time, and "0 km" would be a lie
                // dressed as data — the card says what it actually is instead.
                footValue={place.fromSrinagar || "Base city"}
                cta="→"
              />
            ))}
          </div>
        )}
      </div>
    </NavPanel>
  );
}
