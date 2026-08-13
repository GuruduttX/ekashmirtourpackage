"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarX2, ChevronDown, CreditCard, ScrollText } from "lucide-react";

type Panel = {
  key: string;
  title: string;
  hint: string;
  icon: typeof CalendarX2;
  /** Prose panel. */
  text?: string;
  /** List panel. */
  items?: string[];
};

/**
 * Policies — cancellation, payment terms and house rules.
 *
 * An accordion, all panels closed initially: this is the longest, least
 * scannable copy on the page and dumping three walls of text here would push
 * the enquiry CTA far below the fold. A guest reads the one line that applies
 * to them, so let them pick it.
 *
 * Panel bodies stay mounted and are collapsed with `height: 0` rather than
 * unmounted, so the full policy text ships in the server HTML — these are
 * exactly the sentences an AI Overview quotes when asked "can I cancel?".
 */
export default function StayPoliciesSection({
  cancellationPolicy,
  paymentTerms,
  houseRules,
}: {
  cancellationPolicy: string;
  paymentTerms: string;
  houseRules: string[];
}) {
  const panels: Panel[] = [
    {
      key: "cancellation",
      title: "Cancellation policy",
      hint: "Refund windows and charges",
      icon: CalendarX2,
      text: cancellationPolicy,
    },
    {
      key: "payment",
      title: "Payment terms",
      hint: "Deposit, balance and modes",
      icon: CreditCard,
      text: paymentTerms,
    },
    {
      key: "rules",
      title: "House rules",
      hint: houseRules.length ? `${houseRules.length} things to know` : "",
      icon: ScrollText,
      items: houseRules,
    },
  ].filter((panel) => (panel.items ? panel.items.length > 0 : Boolean(panel.text?.trim())));

  const [open, setOpen] = useState<string | null>(null);

  if (!panels.length) return null;

  return (
    <section id="policies" className="scroll-mt-24">
      <div className="text-center md:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">Policies</p>

        <h2 className="mt-2 font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
          Before you confirm
        </h2>
      </div>

      <div className="mt-5 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {panels.map(({ key, title, hint, icon: Icon, text, items }) => {
          const isOpen = open === key;

          return (
            <div key={key}>
              {/* One panel at a time — clicking the open one closes it. */}
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : key)}
                aria-expanded={isOpen}
                aria-controls={`policy-${key}`}
                className="flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-sky-50/60 sm:px-5"
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                    isOpen ? "bg-sky-500 text-white" : "bg-sky-50 text-sky-600"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-[0.95rem] font-bold text-slate-900">
                    {title}
                  </span>
                  {hint && (
                    <span className="mt-0.5 block text-xs text-slate-500">{hint}</span>
                  )}
                </span>

                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0 text-slate-400"
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.span>
              </button>

              <motion.div
                id={`policy-${key}`}
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-5 sm:px-5 sm:pl-17">
                  {items ? (
                    <ul className="space-y-2.5">
                      {items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2.5 text-sm leading-relaxed text-slate-600"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400"
                          />
                          <span className="min-w-0">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    // whitespace-pre-line: the CMS field is a plain textarea, so
                    // the host's line breaks are the only structure it has.
                    <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
                      {text}
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
