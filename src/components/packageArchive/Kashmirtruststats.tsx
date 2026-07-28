"use client";

import { useState } from "react";
import { Users, CalendarCheck, Star, MapPin, Phone, MessageCircleMore } from "lucide-react";
import CountUp from "@/utils/CountUp";
import EnquiryPopupForm from "@/utils/EnquiryPopupForm";

const stats = [
  {
    icon: Users,
    value: 25,
    suffix: "K+",
    label: "Happy Travellers",
  },
  {
    icon: CalendarCheck,
    value: 8,
    suffix: "+",
    label: "Years of Experience",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "/5",
    label: "Guest Satisfaction",
  },
  {
    icon: MapPin,
    value: 100,
    suffix: "%",
    label: "Kashmir-Focused Tours",
  },
];

export default function KashmirTrustStats() {
  const [isEnquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <section className="py-10 sm:py-14 bg-sky-50">
      <EnquiryPopupForm isOpen={isEnquiryOpen} onClose={() => setEnquiryOpen(false)} />

      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="bg-white rounded-3xl shadow-lg px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-10 lg:px-14 lg:py-12">
          {/* HEADER */}
          <div className="mb-8 sm:mb-10">
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-8 sm:h-10 bg-sky-500 rounded-full mt-1 shrink-0" />
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                  Trusted Kashmir Tour Experience
                </h2>
                <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 max-w-3xl">
                  Thousands of travellers trust us every year for peaceful,
                  well-planned Kashmir tour packages focused on breathtaking
                  landscapes, comfort, and unforgettable memories.
                </p>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="flex items-start gap-3 sm:gap-4">
                  {/* ICON */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-sky-100 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-sky-500" />
                  </div>

                  {/* CONTENT */}
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-sky-500 leading-none">
                      <CountUp
                        prefix=""
                        end={stat.value}
                        suffix={stat.suffix}
                      />
                    </h3>
                    <p className="mt-1 text-sm sm:text-base text-gray-700 font-medium">
                      {stat.label}
                    </p>
                  </div>

                  {/* DIVIDER (desktop only) */}
                  {index !== stats.length - 1 && (
                    <div className="ml-4 sm:ml-6 hidden md:block bg-linear-to-b from-sky-100 via-cyan-400 to-sky-100 h-16 w-0.5 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 border-t border-sky-100 pt-6 sm:pt-8">
            <button
              type="button"
              onClick={() => setEnquiryOpen(true)}
              className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:-translate-y-0.5 hover:shadow-sky-500/40"
            >
              <MessageCircleMore className="h-4 w-4" />
              Enquire Now
            </button>
            <a
              href="tel:+916272828"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-sky-200 bg-white px-6 py-3 text-sm font-semibold text-sky-600 transition-all hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50"
            >
              <Phone className="h-4 w-4" />
              Call Us Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
