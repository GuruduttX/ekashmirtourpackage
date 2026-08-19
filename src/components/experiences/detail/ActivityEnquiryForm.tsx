"use client";

import { useState, type FormEvent } from "react";
import { Calendar, Check, MessageCircle, Phone, User, Users } from "lucide-react";
import type { ExperienceActivity } from "@/data/experienceActivities";
import { whatsappLink, WHATSAPP_TEL } from "@/lib/whatsapp";

/**
 * Sticky enquiry card for /experiences/[slug].
 *
 * Compact on purpose — it has to survive in a 340px rail without scrolling off
 * on a laptop, so it asks for the four things a quote actually needs (who, how
 * to reach them, when, how many) and nothing else. Every extra field here costs
 * conversions on the page's only CTA.
 *
 * PRICE HONESTY: the figure is always labelled "from", and until
 * `priceVerified` is set on the record it carries a visible caveat. That is the
 * same flag that gates the schema.org Offer on the page, so what a reader sees
 * and what a crawler is told cannot disagree.
 *
 * ⚠️ SUBMISSION IS UI-ONLY. There is no leads API route or model in this
 * project yet, so nothing is persisted — matching the existing pattern in
 * DestinationHubHero and TempleBookingSection. The success state is real, the
 * delivery is not. Wire handleSubmit to a /api/leads route before launch.
 */

const inputWrap =
  "flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 transition-colors focus-within:border-sky-400 focus-within:bg-white";
const inputEl =
  "w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none";

export default function ActivityEnquiryForm({
  activity,
}: {
  activity: ExperienceActivity;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [travellers, setTravellers] = useState("2");
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // TODO: POST to a leads endpoint. Logged rather than silently dropped so it
    // stays obvious in dev that nothing is persisted yet.
    console.log("Activity enquiry:", {
      activity: activity.slug,
      name,
      phone,
      date,
      travellers,
    });
    setSent(true);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5">
      {/* ---------- price header ---------- */}
      <div className="border-b border-slate-200 bg-linear-to-br from-sky-500 to-cyan-500 px-5 py-4">
        <p className="font-heading text-2xl font-bold text-white">
          <span className="text-sm font-medium text-sky-50/90">from </span>₹
          {activity.pricePerPerson.toLocaleString("en-IN")}
          <span className="text-sm font-medium text-sky-50/90"> / person</span>
        </p>

        {activity.priceNote && (
          <p className="mt-1 text-xs text-sky-50/90">{activity.priceNote}</p>
        )}

        {!activity.priceVerified && (
          // Pairs with the Offer being withheld from the page's JSON-LD.
          <p className="mt-1.5 text-xs text-sky-50/80">
            Indicative rate — we confirm the current figure when you enquire.
          </p>
        )}
      </div>

      <div className="p-5">
        {sent ? (
          <div className="py-4 text-center">
            <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Check className="h-5 w-5" />
            </span>
            <p className="mt-3 font-heading text-base font-bold text-slate-900">
              Thanks{name ? `, ${name.split(" ")[0]}` : ""}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Sartaj will call you back about {activity.title}, usually within a
              few hours.
            </p>
          </div>
        ) : (
          <>
            <h2 className="font-heading text-base font-bold text-slate-900">
              Enquire about this activity
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              No deposit to get a quote.
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-2.5">
              {/* Icons are decorative; each field carries its own label via
                  aria-label, since a compact card has no room for real ones. */}
              <div className={inputWrap}>
                <User aria-hidden="true" className="h-4 w-4 shrink-0 text-sky-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  autoComplete="name"
                  aria-label="Your name"
                  placeholder="Your name"
                  className={inputEl}
                />
              </div>

              <div className={inputWrap}>
                <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-sky-500" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  aria-label="Phone number"
                  placeholder="Phone number"
                  className={inputEl}
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className={inputWrap}>
                  <Calendar
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-sky-500"
                  />
                  <input
                    type="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    aria-label="Travel date"
                    className={inputEl}
                  />
                </div>

                <div className={inputWrap}>
                  <Users aria-hidden="true" className="h-4 w-4 shrink-0 text-sky-500" />
                  <input
                    type="number"
                    min={1}
                    max={40}
                    value={travellers}
                    onChange={(event) => setTravellers(event.target.value)}
                    aria-label="Number of travellers"
                    className={inputEl}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer rounded-xl bg-linear-to-r from-sky-500 to-cyan-400 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-transform hover:-translate-y-0.5"
              >
                Get my quote
              </button>
            </form>
          </>
        )}

        {/* Always available, including after submitting — someone who has just
            enquired is the most likely person to want to talk now. */}
        <div className="mt-4 grid grid-cols-2 gap-2.5 border-t border-slate-200 pt-4">
          <a
            href={`tel:${WHATSAPP_TEL}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 px-3 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:border-sky-300 hover:text-sky-600"
          >
            <Phone aria-hidden="true" className="h-3.5 w-3.5" />
            Call
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2.5 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
          >
            <MessageCircle aria-hidden="true" className="h-3.5 w-3.5" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
