import type { PackageCard } from "@/components/home/TourCategories";
import PackagesShowcaseRow from "@/components/packageArchive/PackagesShowcaseRow";

interface CityPackagesShowcaseProps {
  cityName: string;
  packages: PackageCard[];
  /** City hub page, e.g. "/kashmir-tour-packages/from-delhi/" */
  hubHref?: string;
}

const highlightStyle: React.CSSProperties = {
  background: "linear-gradient(120deg, #0284C7 0%, #0EA5E9 45%, #38BDF8 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

/**
 * Horizontally-scrolling row of packages departing from a given city.
 * Fully reusable — pass the already-filtered packages for that city and its
 * name; drop multiple instances on a page for different cities.
 */
export default function CityPackagesShowcase({
  cityName,
  packages,
  hubHref,
}: CityPackagesShowcaseProps) {
  return (
    <PackagesShowcaseRow
      eyebrow="Popular Departure City"
      heading={
        <>
          Kashmir Packages from <span style={highlightStyle}>{cityName}</span>
        </>
      }
      subtitle={`Handpicked Kashmir journeys with convenient departure from ${cityName}.`}
      packages={packages}
      ctaHref={hubHref}
      ctaLabel={`All packages from ${cityName}`}
    />
  );
}
