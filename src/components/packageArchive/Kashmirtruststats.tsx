import { Users, CalendarCheck, Star, MapPin } from "lucide-react";
import CountUp from "@/utils/CountUp";

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
  return (
    <section className="py-16 sm:py-20 bg-sky-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 md:p-10 lg:p-14">
          {/* HEADER */}
          <div className="mb-10 sm:mb-12">
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-8 sm:h-10 bg-sky-500 rounded-full mt-1 flex-shrink-0" />
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
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-sky-100 flex items-center justify-center flex-shrink-0">
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
                    <div className="ml-4 sm:ml-6 hidden md:block bg-gradient-to-b from-sky-100 via-cyan-400 to-sky-100 h-16 w-0.5 flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
