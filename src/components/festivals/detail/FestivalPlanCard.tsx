import Link from "next/link";
import { CalendarRange, MessageCircle, Phone, Ticket } from "lucide-react";
import type { Festival } from "@/data/festivals";
import { whatsappLink, WHATSAPP_TEL } from "@/lib/whatsapp";

/**
 * The sticky rail card — this page's conversion point.
 *
 * A CARD, NOT A FORM. On /experiences/[slug] the rail holds a real enquiry
 * form, because an activity has a price and a date and the enquiry is
 * specific. A festival enquiry is not: what the reader actually needs is a trip
 * built around a window whose dates are not fixed yet, which is a conversation,
 * not four fields. So this hands them WhatsApp, a call and the quote page and
 * stops there.
 *
 * The window is repeated here on purpose. The rail is what stays on screen
 * while the reader scrolls the history and the tips, so it has to carry the
 * one fact they are trying to plan around — with the same `datesVerified`
 * caveat as everywhere else, so a sticky card can never be the surface that
 * quietly promises a date.
 *
 * Server component: three links and no state.
 */


export default function FestivalPlanCard({ festival }: { festival: Festival }) {
  const message = `Hi Sartaj, I'd like to plan a Kashmir trip around ${festival.name} (${festival.dates.window}). Can you help?`;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="font-heading text-lg font-bold text-slate-900">
        Plan a trip around{" "}
        <span className="text-sky-500">{festival.shortName}</span>
      </h2>

      <dl className="mt-4 space-y-3">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
            <CalendarRange aria-hidden="true" className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
              Window
            </dt>
            <dd className="mt-0.5 text-sm font-medium text-slate-900">
              {festival.dates.window}
            </dd>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
            <Ticket aria-hidden="true" className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
              Entry
            </dt>
            <dd className="mt-0.5 text-sm font-medium text-slate-900">
              {festival.entry}
            </dd>
          </div>
        </div>
      </dl>

      {!festival.datesVerified && (
        <p className="mt-3 text-xs leading-relaxed text-slate-500">
          Dates move each year. Message us and we&apos;ll tell you where this
          year&apos;s window is landing.
        </p>
      )}

      <div className="mt-5 space-y-2.5">
        <Link
          href="/contact/"
          className="flex w-full items-center justify-center rounded-xl bg-linear-to-r from-sky-500 to-cyan-400 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-transform hover:-translate-y-0.5"
        >
          Get a quote
        </Link>

        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
        >
          <MessageCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
          WhatsApp Sartaj
        </a>

        <a
          href={`tel:${WHATSAPP_TEL}`}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-sky-300 hover:text-sky-700"
        >
          <Phone aria-hidden="true" className="h-4 w-4 shrink-0" />
          Call us
        </a>
      </div>

      <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">
        Planned by Sartaj — born and raised in Kashmir, 20 years of these trips.
      </p>
    </div>
  );
}
