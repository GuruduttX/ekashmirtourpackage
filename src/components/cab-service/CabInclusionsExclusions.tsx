import { CheckCircle2, XCircle } from "lucide-react";

interface Item {
  id?: string;
  description: string;
}

interface Props {
  inclusions?: Item[];
  exclusions?: Item[];
}

function ListCard({
  title,
  items,
  icon: Icon,
  iconColor,
}: {
  title: string;
  items: Item[];
  icon: typeof CheckCircle2;
  iconColor: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-sky-100 bg-linear-to-b from-white to-sky-50 p-5 pl-10 shadow-[0_4px_40px_-8px_rgba(14,165,233,0.15)] sm:p-6 sm:pl-12">
      {/* Left ribbon */}
      <div
        className="absolute left-0 top-0 h-3/5 w-6 bg-linear-to-b from-sky-400 to-sky-500"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)",
        }}
        aria-hidden="true"
      />

      <h3 className="mb-3 text-lg font-bold text-sky-500">{title}</h3>

      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {items.map((item, index) => (
          <span
            key={item.id ?? index}
            className="flex items-center gap-2 text-base font-medium text-slate-700"
          >
            <Icon className={`h-5 w-5 shrink-0 ${iconColor}`} strokeWidth={2} />
            {item.description}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function CabInclusionsExclusions({ inclusions = [], exclusions = [] }: Props) {
  if (inclusions.length === 0 && exclusions.length === 0) return null;

  return (
    <section className="space-y-5">
      {inclusions.length > 0 && (
        <ListCard title="Inclusions" items={inclusions} icon={CheckCircle2} iconColor="text-emerald-500" />
      )}
      {exclusions.length > 0 && (
        <ListCard title="Exclusions" items={exclusions} icon={XCircle} iconColor="text-red-500" />
      )}
    </section>
  );
}
