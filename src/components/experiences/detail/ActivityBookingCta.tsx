import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import type { ExperienceActivity } from "@/data/experienceActivities";
import { whatsappLink, WHATSAPP_TEL } from "@/lib/whatsapp";

/**
 * Price + enquiry CTA (SOP §2.9 closes on a CTA; B2 wants a Get-Quote at every
 * decision point).
 *
 * PRICE HONESTY: the figure is always labelled "from" and, until
 * `priceVerified` is set on the record, it carries a visible caveat saying the
 * current rate is confirmed on enquiry. That caveat is not decoration — it is
 * the same flag that gates the schema.org Offer on the page, so what a reader
 * sees and what a crawler is told agree. Setting `priceVerified` removes the
 * caveat and adds the Offer together, in one edit.
 */
export default function ActivityBookingCta({
  activity,
}: {
  activity: ExperienceActivity;
}) {
  return (
    <section aria-labelledby="booking-heading" className="bg-white py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <h2
                id="booking-heading"
                className="font-heading text-2xl font-bold text-slate-900 sm:text-3xl"
              >
                Ready to book{" "}
                <span className="text-sky-500">{activity.title}</span>?
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                Tell us your dates and group size. We come back with a plan and a
                price — no deposit to get a quote.
              </p>

              <div className="mt-4">
                <p className="font-heading text-2xl font-bold text-slate-900">
                  <span className="text-sm font-medium text-slate-500">from </span>
                  ₹{activity.pricePerPerson.toLocaleString("en-IN")}
                  <span className="text-sm font-medium text-slate-500">
                    {" "}
                    / person
                  </span>
                </p>

                {activity.priceNote && (
                  <p className="mt-1 text-xs text-slate-500">
                    {activity.priceNote}
                  </p>
                )}

                {!activity.priceVerified && (
                  // Shown until the rate is verified for the season. Pairs with
                  // the Offer being withheld from the page's JSON-LD.
                  <p className="mt-2 text-xs text-amber-700">
                    Indicative rate — seasonal pricing changes, so we confirm the
                    current figure when you enquire rather than quoting an old
                    one.
                  </p>
                )}
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
              <Link
                href="/contact/"
                className="rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-7 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-transform hover:-translate-y-0.5"
              >
                Get a quote
              </Link>

              <a
                href={`tel:${WHATSAPP_TEL}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-sky-300 hover:text-sky-600"
              >
                <Phone aria-hidden="true" className="h-4 w-4" />
                Call Sartaj
              </a>

              <a
                href={whatsappLink()}
                target="_blank"
                // noreferrer alongside noopener: the tab-napping protection and
                // not leaking the referrer are separate concerns.
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-7 py-3 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
