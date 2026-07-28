import type { PackageCard } from "@/components/home/TourCategories";
import PackagesShowcaseRow from "@/components/packageArchive/PackagesShowcaseRow";

interface DurationPackagesShowcaseProps {
  days: number;
  nights: number;
  packages: PackageCard[];
  /** Duration hub page, e.g. "/kashmir-tour-packages/6-days-5-nights/" */
  hubHref?: string;
}

const highlightStyle: React.CSSProperties = {
  background: "linear-gradient(120deg, #0284C7 0%, #0EA5E9 45%, #38BDF8 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

/**
 * Horizontally-scrolling row of packages matching a given trip length.
 * Fully reusable — pass the already-filtered packages plus the duration;
 * drop multiple instances on a page for different durations.
 */
export default function DurationPackagesShowcase({
  days,
  nights,
  packages,
  hubHref,
}: DurationPackagesShowcaseProps) {
  const label = `${days} Days ${nights} Nights`;

  return (
    <PackagesShowcaseRow
      eyebrow="Browse By Trip Length"
      heading={
        <>
          <span style={highlightStyle}>{label}</span> Kashmir Packages
        </>
      }
      subtitle={`Complete ${days}-day Kashmir itineraries with stays, transfers and sightseeing planned.`}
      packages={packages}
      ctaHref={hubHref}
      ctaLabel={`All ${days}-day packages`}
    />
  );
}
