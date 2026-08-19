"use client";

import { useMemo, useState } from "react";
import NavPanel, {
  NavCard,
  PanelMessage,
  PanelRail,
  PanelSkeleton,
} from "@/components/layout/nav/NavPanel";
import type { NavExperience } from "@/components/layout/useNavCollections";

/**
 * Experiences mega-dropdown — location rail on the left, activity cards right.
 *
 * Filtered by WHERE rather than by difficulty or season: someone opening this
 * menu has usually already decided which town they are basing themselves in,
 * and "what can I do in Gulmarg" is the question the rail answers. Difficulty
 * rides on the card as a badge instead, where it informs the choice without
 * becoming a filter with two items behind it.
 *
 * Rail options are derived from what is published, so it can never offer a
 * location with nothing to do in it.
 */

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: "Easy",
  moderate: "Moderate",
  challenging: "Challenging",
  expert: "Expert",
};

export default function ExperiencesDropdown({
  onClose,
  experiences,
  isLoading,
  hasError,
}: {
  onClose: () => void;
  experiences: NavExperience[];
  isLoading: boolean;
  hasError: boolean;
}) {
  const [activeLocation, setActiveLocation] = useState("all");

  const locationFilters = useMemo(() => {
    const byLocation = new Map<string, number>();
    experiences.forEach((e) => {
      if (e.location) byLocation.set(e.location, (byLocation.get(e.location) ?? 0) + 1);
    });
    return [
      { key: "all", label: "All Experiences", count: experiences.length },
      ...[...byLocation.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([location, count]) => ({ key: location, label: location, count })),
    ];
  }, [experiences]);

  const filtered = experiences.filter(
    (e) => activeLocation === "all" || e.location === activeLocation,
  );

  const stats = useMemo(() => {
    const cheapest = experiences.filter((e) => e.price > 0).map((e) => e.price);
    return [
      { label: "Activities", value: `${experiences.length}` },
      {
        label: "From",
        value: cheapest.length ? `₹${Math.min(...cheapest).toLocaleString("en-IN")}` : "—",
      },
    ];
  }, [experiences]);

  return (
    <NavPanel
      eyebrow="Things worth doing, with the season each one actually runs in"
      stats={experiences.length ? stats : undefined}
      minBodyHeight="300px"
      onClose={onClose}
      primary={{ href: "/experiences", label: "🎿 Browse All Experiences →" }}
      secondary={{ href: "/destinations", label: "🗺 By Destination" }}
    >
      <div className="flex" style={{ minHeight: "300px" }}>
        <PanelRail
          title="Where"
          options={locationFilters}
          active={activeLocation}
          onSelect={setActiveLocation}
        />

        <div className="flex flex-1 flex-col p-4">
          {isLoading ? (
            <PanelSkeleton count={3} columns={3} />
          ) : hasError ? (
            <PanelMessage>Couldn&apos;t load experiences right now.</PanelMessage>
          ) : filtered.length === 0 ? (
            <PanelMessage>Nothing published here yet.</PanelMessage>
          ) : (
            <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {filtered.slice(0, 3).map((activity) => (
                <NavCard
                  key={activity.id}
                  href={`/experiences/${activity.slug}`}
                  onClose={onClose}
                  image={activity.image}
                  alt={activity.imageAlt}
                  title={activity.title}
                  imageHeight={104}
                  badge={DIFFICULTY_LABEL[activity.difficulty] || undefined}
                  overlay={
                    activity.featured ? (
                      <span className="text-[0.58rem] font-semibold text-amber-300">
                        ★ Featured
                      </span>
                    ) : undefined
                  }
                  meta={[activity.duration && `⏱ ${activity.duration}`, activity.season]}
                  footLabel="From"
                  footValue={
                    activity.price > 0
                      ? `₹${activity.price.toLocaleString("en-IN")}`
                      : undefined
                  }
                  cta="→"
                />
              ))}
            </div>
          )}

          {/* Says so out loud when the grid is showing a subset, rather than
              letting the menu imply these three are all there is. */}
          {!isLoading && !hasError && filtered.length > 3 && (
            <p className="mt-3 text-[0.68rem] text-slate-400">
              Showing 3 of {filtered.length}
              {activeLocation !== "all" && ` in ${activeLocation}`} — the full list is on
              the experiences page.
            </p>
          )}
        </div>
      </div>
    </NavPanel>
  );
}
