import { CheckCircle, XCircle } from "lucide-react";

interface Item {
  id?: string;
  description: string;
}

interface Props {
  inclusions?: Item[];
  exclusions?: Item[];
}

const defaultData = {
  inclusions: [
    { description: "Round-trip flights and private airport transfers" },
    { description: "Premium hotel accommodation for 4 nights and 5 days" },
    { description: "Daily complimentary breakfast and dinner buffet" },
    { description: "Guided city tour with an English-speaking professional" },
  ],
  exclusions: [
    { description: "Visa fees, processing charges, and travel insurance" },
    { description: "Personal expenses such as laundry, tips, and phone calls" },
    { description: "Lunch and alcoholic beverages outside of the buffet" },
    { description: "Optional activities, spa treatments, and extra excursions" },
  ],
};

export default function InclusionExclusion({
  inclusions = defaultData.inclusions,
  exclusions = defaultData.exclusions,
}: Props) {
  return (
    <section className="py-0 sm:py-6 md:py-12 px-6 sm:px-0">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          What's Included &amp; Excluded
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* INCLUSIONS */}
          <div className="rounded-2xl border border-cyan-100 bg-green-50/50 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Inclusions</h3>
            <ul className="space-y-3">
              {inclusions.map((item, index) => (
                <li key={item.id ?? index} className="flex items-start gap-3">
                  <span>
                    <CheckCircle className="w-5 h-5 text-cyan-500 mt-0.5" />
                  </span>
                  <p className="text-gray-800 leading-relaxed">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* EXCLUSIONS */}
          <div className="rounded-2xl border border-sky-100 bg-red-50/50 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Exclusions</h3>
            <ul className="space-y-3">
              {exclusions.map((item, index) => (
                <li key={item.id ?? index} className="flex items-start gap-3">
                  <span>
                    <XCircle className="w-5 h-5 text-sky-500 mt-0.5" />
                  </span>
                  <span className="text-gray-800 leading-relaxed">{item.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
