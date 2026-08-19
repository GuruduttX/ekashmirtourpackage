import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarRange } from "lucide-react";
import type { Festival } from "@/data/festivals";

/**
 * "Other festivals" — the sideways links out of this page.
 *
 * SOP B3 wants every supporting page linking across to its siblings, not only
 * up to its hub. Three cards is the whole of it: enough to give a reader whose
 * dates do not match this festival somewhere to go, few enough that it does not
 * turn into a second hub at the foot of every detail page.
 *
 * Selection happens in the page, not here — this renders whatever it is handed,
 * which keeps it usable when festivals move to the CMS and "related" becomes a
 * query rather than a filter.
 */
export default function FestivalRelated({
  festivals,
}: {
  festivals: Festival[];
}) {
  if (!festivals.length) return null;

  return (
    <section
      aria-labelledby="related-festivals-heading"
      className="w-full bg-slate-50 py-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="related-festivals-heading"
          className="text-center font-heading text-2xl font-bold text-slate-900 sm:text-3xl md:text-left"
        >
          Other Kashmir <span className="text-sky-500">festivals</span>
        </h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {festivals.map((festival) => (
            <Link
              key={festival.slug}
              href={`/festivals/${festival.slug}/`}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <Image
                  src={festival.image}
                  alt={festival.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-slate-950/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  <CalendarRange aria-hidden="true" className="h-3 w-3 shrink-0" />
                  {festival.dates.short}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-heading text-base font-bold text-slate-900 group-hover:text-sky-600">
                  {festival.name}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                  {festival.summary}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600">
                  Read more
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
