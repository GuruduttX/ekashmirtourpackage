import Link from "next/link";
import { MessageCircle, ShieldCheck } from "lucide-react";
import type { StayDetailPage } from "@/lib/stayDetailPage";
import { whatsappLink } from "@/lib/whatsapp";

/**
 * Sticky enquiry card — the conversion point of the whole page.
 *
 * Stays pinned in the right column on desktop so the price and CTA are
 * reachable from every section. On mobile it renders inline, above the
 * content sections, so it is still the first thing after the title.
 */
export default function StayBookingCard({ stay }: { stay: StayDetailPage }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-sky-100/60">
      <p className="text-xs uppercase tracking-wide text-slate-500">From</p>
      <p className="mt-1 font-heading text-3xl font-bold text-slate-900">
        ₹{stay.priceFrom.toLocaleString("en-IN")}
        <span className="ml-1.5 text-sm font-medium text-slate-500">/ night</span>
      </p>

      {stay.minNights > 1 && (
        <p className="mt-1 text-xs text-slate-500">Minimum {stay.minNights} nights</p>
      )}

      {stay.bestFor && (
        <p className="mt-4 rounded-xl bg-sky-50 px-4 py-3 text-sm leading-relaxed text-sky-900/80">
          <span className="font-semibold">Best for — </span>
          {stay.bestFor}
        </p>
      )}

      {(stay.checkIn || stay.checkOut) && (
        <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 text-sm">
          {stay.checkIn && (
            <div>
              <dt className="text-xs text-slate-500">Check-in</dt>
              <dd className="mt-0.5 font-semibold text-slate-900">{stay.checkIn}</dd>
            </div>
          )}
          {stay.checkOut && (
            <div>
              <dt className="text-xs text-slate-500">Check-out</dt>
              <dd className="mt-0.5 font-semibold text-slate-900">{stay.checkOut}</dd>
            </div>
          )}
        </dl>
      )}

      <div className="mt-5 flex flex-nowrap items-center gap-2.5">
        <Link
          href="/contact/"
          className="inline-flex flex-1 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition-transform hover:-translate-y-0.5"
        >
          Check Availability
        </Link>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ask on WhatsApp"
          className="inline-flex shrink-0 items-center justify-center rounded-full border border-sky-200 px-4 py-3 text-sky-600 transition-colors hover:bg-sky-50"
        >
          <MessageCircle className="h-4 w-4" />
        </a>
      </div>

      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-slate-500">
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-500" />
        No payment now — we confirm the room with the host before you pay anything.
      </p>
    </div>
  );
}