"use client";

import { useMemo, useState } from "react";
import NavPanel, {
  NavCard,
  PanelMessage,
  PanelRail,
  PanelSkeleton,
} from "@/components/layout/nav/NavPanel";
import { formatPrice, type NavPackage } from "@/components/layout/useNavPackages";

/**
 * Packages mega-dropdown — duration rail on the left, city chips and cards on
 * the right.
 *
 * Both filter sets are derived from what is actually published, so the panel
 * never advertises a duration or a city with nothing behind it.
 */
export default function PackagesDropdown({
  onClose,
  packages,
  isLoading,
  hasError,
}: {
  onClose: () => void;
  packages: NavPackage[];
  isLoading: boolean;
  hasError: boolean;
}) {
  const [activeDuration, setActiveDuration] = useState("all");
  const [activeCity, setActiveCity] = useState("All Cities");

  const durationFilters = useMemo(() => {
    const byDays = new Map<number, number>();
    packages.forEach((p) => {
      if (p.days > 0) byDays.set(p.days, (byDays.get(p.days) ?? 0) + 1);
    });
    return [
      { key: "all", label: "All Days Package", count: packages.length },
      ...[...byDays.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(([days, count]) => ({
          key: String(days),
          label: `${days} Day${days === 1 ? "" : "s"} Package`,
          count,
        })),
    ];
  }, [packages]);

  const destinations = useMemo(
    () => [
      "All Cities",
      ...[...new Set(packages.map((p) => p.destination).filter(Boolean))].sort(),
    ],
    [packages],
  );

  const filtered = packages.filter((p) => {
    const durationOk = activeDuration === "all" || String(p.days) === activeDuration;
    const cityOk = activeCity === "All Cities" || p.destination === activeCity;
    return durationOk && cityOk;
  });

  const stats = useMemo(() => {
    const rated = packages.filter((p) => p.rating > 0);
    const bestRated = rated.length ? Math.max(...rated.map((p) => p.rating)) : 0;
    const totalReviews = packages.reduce((sum, p) => sum + (p.reviews ?? 0), 0);
    return [
      { label: "Best Rated", value: bestRated ? `${bestRated.toFixed(1)} ★` : "—" },
      { label: "Destinations", value: `${destinations.length - 1} +` },
      { label: "Reviews", value: `${totalReviews} +` },
    ];
  }, [packages, destinations.length]);

  return (
    <NavPanel
      eyebrow="Handpicked Kashmir itineraries, built by locals"
      stats={stats}
      minBodyHeight="330px"
      onClose={onClose}
      primary={{ href: "/kashmir-tour-packages/", label: "🔍 Explore All Packages →" }}
      secondary={{ href: "/cab-service", label: "🚕 Book a Cab" }}
      trust={[
        { icon: "✓", label: "Free Cancellation" },
        { icon: "💳", label: "Easy EMI" },
        { icon: "🎧", label: "24 / 7 Support" },
      ]}
    >
      <div className="flex" style={{ minHeight: "330px" }}>
        <PanelRail
          title="Duration"
          options={durationFilters}
          active={activeDuration}
          onSelect={setActiveDuration}
        />

        <div className="flex flex-1 flex-col p-4">
          {/* City chips */}
          <div className="mb-3.5 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[0.6rem] font-semibold tracking-widest text-sky-500/70 uppercase">
              🌍 Destination
            </span>
            {destinations.map((city) => {
              const active = activeCity === city;
              return (
                <button
                  key={city}
                  onClick={() => setActiveCity(city)}
                  className="rounded-full px-3 py-1 text-[0.7rem] font-medium transition-all duration-150"
                  style={{
                    background: active
                      ? "linear-gradient(135deg, #0EA5E9, #38BDF8)"
                      : "rgba(15,23,42,0.04)",
                    color: active ? "white" : "#475569",
                    border: active
                      ? "1px solid rgba(56,189,248,0.50)"
                      : "1px solid rgba(15,23,42,0.10)",
                    boxShadow: active ? "0 4px 12px rgba(14,165,233,0.30)" : "none",
                  }}
                >
                  {city}
                </button>
              );
            })}
          </div>

          {isLoading ? (
            <PanelSkeleton count={2} columns={2} />
          ) : hasError ? (
            <PanelMessage>Couldn&apos;t load packages right now.</PanelMessage>
          ) : filtered.length === 0 ? (
            <PanelMessage>No packages match these filters.</PanelMessage>
          ) : (
            <div className="grid flex-1 gap-3" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              {filtered.slice(0, 2).map((pkg) => (
                <NavCard
                  key={pkg.id}
                  href={`/package/${pkg.slug}`}
                  onClose={onClose}
                  image={pkg.image}
                  alt={pkg.title}
                  title={pkg.title}
                  capitalize
                  badge={pkg.themes[0]}
                  imageHeight={144}
                  overlay={
                    pkg.rating > 0 ? (
                      <>
                        <span className="text-[0.58rem] text-amber-400">★</span>
                        <span className="text-[0.63rem] font-semibold text-white">{pkg.rating}</span>
                        <span className="text-[0.58rem] text-white/50">({pkg.reviews})</span>
                      </>
                    ) : undefined
                  }
                  meta={[pkg.duration && `⏱ ${pkg.duration}`, pkg.destination && `📍 ${pkg.destination}`]}
                  footLabel="Starting from"
                  footValue={formatPrice(pkg.price)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </NavPanel>
  );
}
