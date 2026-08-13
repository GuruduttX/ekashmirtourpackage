import { Check, Minus } from "lucide-react";

/**
 * Inclusions & exclusions — what the nightly rate does and does not cover.
 *
 * Kept as two visually distinct columns rather than one mixed list: the whole
 * point of the section is that a guest can tell at a glance which side a line
 * falls on, and "not included" is the half that prevents an argument at
 * check-out. Server-rendered plain text — no interactivity to hide behind.
 *
 * Renders whichever side has content; only bails when both are empty.
 */
export default function StayInclusionsSection({
  inclusions,
  exclusions,
}: {
  inclusions: string[];
  exclusions: string[];
}) {
  if (!inclusions.length && !exclusions.length) return null;

  return (
    <section id="inclusions" className="scroll-mt-24">
      <div className="text-center md:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
          Inclusions &amp; exclusions
        </p>

        <h2 className="mt-2 font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
          What the rate covers
        </h2>
      </div>

      <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
        {inclusions.length > 0 && (
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
            <h3 className="flex items-center gap-2 font-heading text-base font-bold text-emerald-900">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              Included
            </h3>

            <ul className="mt-3.5 space-y-2.5">
              {inclusions.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-slate-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                  <span className="min-w-0">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {exclusions.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
            <h3 className="flex items-center gap-2 font-heading text-base font-bold text-slate-800">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 text-white">
                <Minus className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              Not included
            </h3>

            <ul className="mt-3.5 space-y-2.5">
              {exclusions.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
                  <Minus className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" strokeWidth={2.5} />
                  <span className="min-w-0">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <p className="mt-3 text-center text-xs text-slate-400 md:text-left">
        Anything not listed above is chargeable — ask us before you book if you are unsure.
      </p>
    </section>
  );
}
