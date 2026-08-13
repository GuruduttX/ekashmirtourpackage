import { Lightbulb } from "lucide-react";
import Link from "next/link";

/**
 * Sartaj's tips, sized for the stay page's content column.
 *
 * The place-page component (StaySartajTips) is a full-bleed three-column band
 * with its own background and page gutters — it cannot be dropped into a 2/3
 * column without double padding and cramped cards. Same content and the same
 * E-E-A-T attribution, laid out as a vertical timeline instead.
 *
 * Server-rendered: this is the information-gain block the SOP's positioning
 * rests on (A4/A8), so it must be crawlable text.
 */
export default function StayDetailTips({
  tips,
  heading,
  intro,
}: {
  tips: Array<{ id: string; title: string; tip: string }>;
  heading?: string;
  intro?: string;
}) {
  if (!tips.length) return null;

  return (
    <section id="tips" className="scroll-mt-24">
      <div className="text-center md:text-left">
        <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
          <Lightbulb className="h-3.5 w-3.5" /> On the ground
        </p>

        <h2 className="mt-2 font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
          {heading ?? "Sartaj's tips"}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          {intro ?? "What we tell our own guests before they book this one."}
        </p>
      </div>

      {/* Timeline: the rail is a border on the list, so it grows with content
          and stops exactly at the last item. */}
      <ol className="mt-6 space-y-6 border-l border-dashed border-sky-200 pl-6 text-left sm:pl-7">
        {tips.map((tip, index) => (
          <li key={tip.id || tip.title} className="relative">
            <span className="absolute left-[-2.05rem] flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br from-sky-500 to-cyan-400 text-xs font-bold text-white shadow-sm shadow-sky-500/30 sm:left-[-2.3rem]">
              {index + 1}
            </span>

            <h3 className="font-heading text-base font-bold leading-snug text-slate-900">
              {tip.title}
            </h3>

            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{tip.tip}</p>
          </li>
        ))}
      </ol>

      <p className="mt-5 text-center text-xs text-slate-500 md:text-left">
        Verified on the ground by{" "}
        <Link
          href="/author/sartaj/"
          className="font-semibold text-sky-600 underline-offset-2 hover:underline"
        >
          Sartaj
        </Link>
        , born and raised in Kashmir with 20 years of tour planning.
      </p>
    </section>
  );
}
