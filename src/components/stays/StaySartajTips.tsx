import Link from "next/link";
import { Lightbulb, Quote } from "lucide-react";
import type { StayPlaceTip } from "@/data/stayTaxonomy";

/**
 * "Sartaj's tips" — the on-ground truths for a place.
 *
 * Server-rendered: this is the information-gain block the SOP builds the whole
 * positioning on (A4/A8), so it must be crawlable text, not JS-assembled.
 * Attribution links to the author entity for E-E-A-T (SOP A7).
 */
export default function StaySartajTips({
  tips,
  heading,
  intro,
}: {
  tips: StayPlaceTip[];
  heading?: string;
  intro?: string;
}) {
  if (!tips.length) return null;

  return (
    <section className="bg-sky-50/60 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 shadow-sm">
            <Lightbulb className="h-3.5 w-3.5" /> On the ground
          </span>

          <h2 className="mt-5 font-heading text-3xl font-bold text-slate-900 sm:text-4xl">
            {heading ?? "Sartaj's tips"}
          </h2>

          {intro && <p className="mt-3 max-w-2xl text-slate-600">{intro}</p>}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tips.map((tip, index) => (
            <article
              key={tip.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg"
            >
              {/* Watermark index */}
              <span
                aria-hidden="true"
                className="absolute -right-2 -top-4 font-heading text-7xl font-bold text-sky-50 transition-colors duration-300 group-hover:text-sky-100"
              >
                {index + 1}
              </span>

              <div className="relative">
                <Quote className="h-6 w-6 text-sky-400" />

                <h3 className="mt-4 font-heading text-lg font-bold leading-snug text-slate-900">
                  {tip.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{tip.tip}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Author attribution — E-E-A-T signal, SOP A7 */}
        <p className="mt-6 text-center text-sm text-slate-500 md:text-left">
          Verified on the ground by{" "}
          <Link
            href="/author/sartaj/"
            className="font-semibold text-sky-600 underline-offset-2 hover:underline"
          >
            Sartaj
          </Link>
          , born and raised in Kashmir with 20 years of tour planning.
        </p>
      </div>
    </section>
  );
}
