import type { PackageCard } from "@/components/home/TourCategories";
import PackagesShowcaseRow from "@/components/packageArchive/PackagesShowcaseRow";

interface ThemePackagesShowcaseProps {
  themeName: string;
  packages: PackageCard[];
  /** Theme hub page, e.g. "/kashmir-tour-packages/honeymoon-packages/" */
  hubHref?: string;
}

const highlightStyle: React.CSSProperties = {
  background: "linear-gradient(120deg, #0284C7 0%, #0EA5E9 45%, #38BDF8 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

/**
 * Horizontally-scrolling row of packages for a given theme (Honeymoon,
 * Adventure, Family, ...). Fully reusable — pass the already-filtered
 * packages for that theme and its name; drop multiple instances on a page
 * for different themes.
 */
export default function ThemePackagesShowcase({
  themeName,
  packages,
  hubHref,
}: ThemePackagesShowcaseProps) {
  return (
    <PackagesShowcaseRow
      eyebrow="Curated By Theme"
      heading={
        <>
          Best <span style={highlightStyle}>{themeName}</span> Packages
        </>
      }
      subtitle={`Kashmir tours crafted especially for ${themeName.toLowerCase()} travellers.`}
      packages={packages}
      ctaHref={hubHref}
      ctaLabel={`All ${themeName} packages`}
    />
  );
}
