"use client";

import { useState } from "react";
import { ChevronDown, RotateCcw, Ban, BadgeCheck, CreditCard } from "lucide-react";

interface PolicyItem {
  title: string;
  description: string;
}

interface Props {
  policies?: PolicyItem[];
}

const getIcon = {
  "Refund Policy": <RotateCcw className="w-6 h-6 text-cyan-500" />,
  "Cancellation Policy": <Ban className="w-6 h-6 text-cyan-500" />,
  "Confirmation Policy": <BadgeCheck className="w-6 h-6 text-cyan-500" />,
  "Payment Policy": <CreditCard className="w-6 h-6 text-cyan-500" />,
};

const defaultPolicies: PolicyItem[] = [
  { title: "Refund Policy", description: "100% refund if cancelled 48 hours before trip starting time." },
  { title: "Cancellation Policy", description: "To cancel your trip, simply text or call at our official booking contact or mail us at info@ekashmirtours.com" },
  { title: "Confirmation Policy", description: "You will have to pay an advance to confirm your trip. Make payment at verified channels only." },
  { title: "Payment Policy", description: "50% to be paid as advance and remaining at the start of the tour." },
];

export default function Policies({ policies = defaultPolicies }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const list = policies.length > 0 ? policies : defaultPolicies;

  return (
    <section className="w-full max-w-7xl mx-auto py-8 sm:py-12 px-6">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Policies &amp; Important Information
      </h2>

      <div className="space-y-4">
        {list.map((item, index) => {
          const isOpen = active === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 ${
                isOpen
                  ? "border-cyan-300 bg-sky-50/50 shadow-md shadow-sky-100/50"
                  : "border-gray-100 bg-white hover:border-cyan-200"
              }`}
            >
              <button
                onClick={() => setActive(isOpen ? null : index)}
                className="flex w-full items-center justify-between px-6 py-5 text-left cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm border border-sky-50 shrink-0">
                    {getIcon[item.title as keyof typeof getIcon] ?? (
                      <BadgeCheck className="w-6 h-6 text-cyan-500" />
                    )}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                </div>
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 shrink-0 ${
                    isOpen ? "bg-cyan-100" : "bg-sky-50"
                  }`}
                >
                  <ChevronDown
                    className={`h-5 w-5 text-cyan-600 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 sm:pl-[80px] text-gray-700 leading-relaxed">
                  <p>{item.description}</p>
                  <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
