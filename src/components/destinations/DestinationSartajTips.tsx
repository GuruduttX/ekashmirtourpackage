import Link from "next/link";
import { Lightbulb, Quote } from "lucide-react";
import type { IDestinationTip } from "@/types/destinationTypes";

/**
 * "Sartaj's tips" for /destinations/[slug].
 *
 * Server-rendered with no entrance animation, matching StaySartajTips: this is
 * the SOP A4/A8 information-gain block, so it has to be crawlable text rather
 * than content a client component reveals. Hover states are plain CSS for the
 * same reason.
 *
 * Same {title, tip} shape as the stays silo, so both are edited with the one
 * tips editor. `title` is optional in practice — the tips carried over from
 * the static file are single paragraphs with no headline, and a card without
 * one simply drops the heading rather than showing an empty line.
 */
export default function DestinationSartajTips({
  destinationName,
  tips,
  intro,
}: {
  destinationName: string;
  tips?: IDestinationTip[];
  intro?: string;
}) {
  const usable = (tips ?? []).filter((tip) => Boolean(tip.tip));
  if (usable.length === 0) return null;

  return (
    <section
      aria-label={`Sartaj's tips for ${destinationName}`}
      className="bg-sky-50/60 py-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-white px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-sky-600 uppercase shadow-sm">
            <Lightbulb className="h-3.5 w-3.5" /> On the ground
          </span>

          <h2 className="mt-5 font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
            Sartaj&rsquo;s{" "}
            <span className="bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
              {destinationName} tips
            </span>
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {intro ||
              "The things worth knowing before you go — the sort that only come from having been there in every season."}
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {usable.map((tip, index) => (
            <article
              key={tip.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg"
            >
              {/* Watermark index — decorative, so it stays out of the a11y tree. */}
              <span
                aria-hidden="true"
                className="absolute -top-4 -right-2 font-heading text-7xl font-bold text-sky-50 transition-colors duration-300 group-hover:text-sky-100"
              >
                {index + 1}
              </span>

              <div className="relative">
                <Quote className="h-6 w-6 text-sky-400" />

                {tip.title && (
                  <h3 className="mt-4 font-heading text-lg leading-snug font-bold text-slate-900">
                    {tip.title}
                  </h3>
                )}

                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {tip.tip}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Author attribution — E-E-A-T signal, SOP A7. */}
        <p className="mt-6 text-center text-sm text-slate-500 sm:text-left">
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
