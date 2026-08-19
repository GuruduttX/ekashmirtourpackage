import { ScrollText } from "lucide-react";
import type { FestivalHistoryBlock } from "@/types/festivalTypes";

/**
 * SOP §2.6 "history / significance" — the depth section.
 *
 * Deliberately placed AFTER the practical blocks. A reader arriving from
 * "amarnath registration" needs the logistics first; the history is what keeps
 * them on the page once they have what they came for, and it is the part that
 * makes this a topical-authority page rather than a listings entry.
 *
 * Kept as titled prose blocks rather than one long body: each `heading` becomes
 * an H3 a passage-ranking system can lift on its own, and a reader skimming for
 * "why does saffron cost that much" finds it without reading four paragraphs.
 */
export default function FestivalHistory({
  name,
  blocks = [],
}: {
  name: string;
  blocks?: FestivalHistoryBlock[];
}) {
  if (!blocks.length) return null;

  return (
    <section
      aria-labelledby="festival-history-heading"
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
      id="history"
    >
      <h2
        id="festival-history-heading"
        className="flex flex-col items-center gap-2 text-center font-heading text-xl font-bold text-slate-900 sm:text-2xl md:flex-row md:items-center md:text-left"
      >
        <ScrollText aria-hidden="true" className="h-5 w-5 shrink-0 text-sky-500" />
        <span>
          The story behind{" "}
          <span className="text-sky-500">{name}</span>
        </span>
      </h2>

      <div className="mt-5 space-y-5">
        {blocks.map((block) => (
          <div key={block.id} className="border-l-2 border-sky-200 pl-4">
            <h3 className="font-heading text-base font-bold text-slate-900">
              {block.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              {block.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
