"use client";

import { useState } from "react";
import { ShieldCheck, X } from "lucide-react";

const POLICY_SECTIONS = [
  {
    title: "Free Cancellation Window",
    body: "You can cancel your booking free of charge up to 1 hour before the scheduled pickup time. No cancellation fee will be charged during this window.",
  },
  {
    title: "Late Cancellations",
    body: "Cancellations made within 1 hour of the pickup time may be subject to a cancellation charge, as the cab may already be en route to the pickup location.",
  },
  {
    title: "No-Shows",
    body: "If the cab arrives at the pickup location and the passenger is not available within a reasonable waiting time, this will be treated as a no-show and full charges may apply.",
  },
  {
    title: "Refunds",
    body: "Eligible refunds for free cancellations are processed back to the original payment method within 5-7 business days.",
  },
];

export default function CabCancellationPolicy() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl border border-sky-100 bg-linear-to-b from-white to-sky-50 p-5 pl-10 shadow-[0_4px_40px_-8px_rgba(14,165,233,0.15)] sm:p-6 sm:pl-12">
        <h3 className="mb-3 text-lg font-bold text-sky-500">Cancellation Policy</h3>

        <p className="flex items-start gap-2 text-sm font-medium leading-relaxed text-emerald-600 sm:text-base">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={2} />
          <span>
            Free cancellation up to <span className="font-bold">1 hour</span> before pickup time
          </span>
        </p>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-4 flex w-full items-center justify-center rounded-xl bg-linear-to-r from-sky-500 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-200 transition-transform hover:-translate-y-0.5 sm:w-auto sm:inline-flex"
        >
          View Cancellation Policy
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-modal="true"
            className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition-colors hover:text-slate-700"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <h2 className="pr-10 font-heading text-xl font-bold text-slate-900 sm:text-2xl">
              Cancellation Policy
            </h2>

            <div className="mt-5 space-y-5">
              {POLICY_SECTIONS.map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-bold text-sky-600">{section.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{section.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
