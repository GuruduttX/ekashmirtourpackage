import type { ActivityStep } from "@/data/experienceActivities";

/**
 * SOP §2.9 "what to expect" — the activity walked through in order.
 *
 * An ordered list, because the steps genuinely are sequential; the numbers are
 * drawn from a counter rather than typed into the copy so reordering in the CMS
 * cannot leave "3." sitting above "2.".
 *
 * Returns null with no steps, which is what lets a thin record skip the section
 * entirely instead of printing an empty heading.
 */
export default function ActivityWhatToExpect({
  steps,
  title,
}: {
  steps?: ActivityStep[];
  /** Activity title, used only in the section heading. */
  title: string;
}) {
  if (!steps?.length) return null;

  return (
    <section
      id="what-to-expect"
      aria-labelledby="what-to-expect-heading"
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
    >
      <div>
        <h2
          id="what-to-expect-heading"
          className="text-center font-heading text-xl font-bold text-slate-900 sm:text-2xl md:text-left"
        >
          What to <span className="text-sky-500">expect</span>
          <span className="sr-only"> on {title}</span>
        </h2>

        <ol className="mt-5 space-y-5">
          {steps.map((step, index) => (
            <li key={step.id} className="flex gap-4">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-sky-500 to-cyan-400 font-heading text-sm font-bold text-white shadow-md shadow-sky-500/25"
              >
                {index + 1}
              </span>
              <div className="min-w-0 pt-1">
                <h3 className="font-heading text-base font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
