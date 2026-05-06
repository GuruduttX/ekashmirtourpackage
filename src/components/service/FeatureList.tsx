import { CheckCircle2 } from "lucide-react";

export default function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="mt-4 space-y-2">
      {features.map((feature, idx) => (
        <li
          key={idx}
          className="flex items-center gap-2.5 text-sm text-gray-600"
        >
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}
