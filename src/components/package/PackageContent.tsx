import { Package } from "@/lib/constants";
import BookingCard from "./BookingForm";
import PackageOverview from "@/components/package/PackageOverview";
import PackageItinerary from "@/components/package/PackageItinerary";
import ItineraryStrip from "./Itinerarystrip";
import InclusionsExclusions from "./Inclusionsexclusions";
import PackageCTA from "./packageCTA";

export default function PackageContent({ pkg }: { pkg: any }) {
  return (
    <section className="flex-grow w-full max-w-7xl mx-auto px-3 lg:px-12 py-10 md:py-16 lg:py-10 overflow-x-clip">
      <div className="grid min-w-0 lg:grid-cols-3 gap-12 lg:gap-16">
        <div
          className="order-2 min-w-0 lg:order-1 lg:col-span-2 space-y-16 anim-fade-in-up"
          style={{ animationDelay: "100ms" }}
        >
          <ItineraryStrip />
          <PackageOverview />
          <PackageItinerary />
          <InclusionsExclusions />
        </div>
        <div
          className="order-1 min-w-0 lg:order-2 relative anim-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          <BookingCard pkg={pkg} />
        </div>
      </div>
          <PackageCTA />
    </section>
  );
}
