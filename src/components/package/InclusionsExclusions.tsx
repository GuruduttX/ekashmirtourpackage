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

function InclusionCard({
  title,
  items,
  icon: Icon,
}: {
  title: string;
  items: Item[];
  icon: typeof CheckCircle;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-sky-100 bg-linear-to-b from-white to-sky-50 p-6 pl-10 shadow-[0_4px_40px_-8px_rgba(14,165,233,0.15)] sm:p-8 sm:pl-12">
      {/* Left ribbon */}
      <div
        className="absolute left-0 top-0 h-3/5 w-6 bg-linear-to-b from-sky-400 to-sky-500"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)",
        }}
        aria-hidden="true"
      />

      <h3 className="mb-5 text-xl font-bold text-sky-500">{title}</h3>

      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={item.id ?? index} className="flex items-start gap-3">
            <Icon className="mt-0.5 h-6 w-6 shrink-0 text-sky-400" strokeWidth={2} />
            <span className="text-[1.0625rem] leading-relaxed text-slate-800">
              {item.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function InclusionExclusion({
  inclusions = defaultData.inclusions,
  exclusions = defaultData.exclusions,
}: Props) {
  return (
    <section>
      <h2 className="mb-8 font-heading text-2xl font-extrabold leading-tight bg-linear-to-r from-sky-600 to-cyan-300 bg-clip-text text-transparent sm:text-3xl">
        What&apos;s Included &amp; Excluded
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        <InclusionCard title="Inclusions" items={inclusions} icon={CheckCircle} />
        <InclusionCard title="Exclusions" items={exclusions} icon={XCircle} />
      </div>
    </section>
  );
}
