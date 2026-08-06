import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  MapPin,
  Phone,
  Star,
  Users,
} from "lucide-react";

const STATS = [
  { icon: Users, value: "10,000+", label: "Happy Travelers" },
  { icon: Star, value: "4.9★", label: "Avg Rating" },
  { icon: MapPin, value: "50+", label: "Scenic Spots" },
  { icon: Clock3, value: "24/7", label: "Support" },
] as const;

const BENEFITS = [
  "Handpicked hotels & stays",
  "Expert local guides",
  "Custom route planning",
  "Reliable transport service",
  "Flexible tour packages",
  "Hassle-free booking",
] as const;

export default function AboutFinalCTA() {
  return (
    <section className="bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
      <div className="mx-auto max-w-7xl rounded-[2.25rem]">
        <div className="px-1 py-1 sm:px-2 sm:py-2 lg:px-3 lg:py-3">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl text-center md:text-start">
              <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] md:tracking-[0.28em] text-sky-600">
                Trusted Kashmir Travel Partner
              </span>

              <h2 className="mt-4 font-heading text-center md:text-start text-[1.3rem] font-bold leading-tight text-slate-900 sm:text-[2rem] lg:text-[3rem] lg:leading-[1.08]">
                Plan your unforgettable journey through Kashmir with comfort,
                calm, and local insight.
              </h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:pt-4">
              <Link
                href="/#packages"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(15,23,42,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 sm:px-7 sm:text-[0.95rem]"
              >
                Book Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full border border-sky-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 shadow-[0_10px_24px_rgba(14,165,233,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50 sm:px-7 sm:text-[0.95rem]"
              >
                <Phone className="mr-2 h-4 w-4 text-sky-500" />
                Call Us Now
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-5">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {STATS.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="group relative rounded-[1.8rem] border border-sky-100/80 bg-white px-4 py-5 text-center shadow-[0_16px_44px_rgba(14,165,233,0.10)] transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-[0_24px_56px_rgba(14,165,233,0.18)]"
                  >
                    <div className="absolute left-1/2 top-0 h-1.5 w-20 -translate-x-1/2 rounded-full bg-transparent transition-all duration-300 group-hover:bg-sky-500 group-hover:shadow-[0_4px_18px_rgba(14,165,233,0.35)]" />
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-50 text-sky-500 transition-all duration-300 group-hover:bg-sky-500 group-hover:text-white">
                      <Icon className="h-5 w-5" strokeWidth={2.2} />
                    </div>
                    <div className="mt-3 text-2xl font-bold text-slate-900">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm font-medium text-slate-500">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-[1.8rem] border border-sky-100/80 bg-white px-5 py-5 shadow-[0_16px_44px_rgba(14,165,233,0.10)] sm:px-6">
              <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {BENEFITS.map((benefit) => (
                  <div key={benefit} className="flex items-start  gap-3">
                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-500">
                      <BadgeCheck className="h-4 w-4" strokeWidth={2.1} />
                    </div>
                    <span className="text-sm font-medium leading-6 text-slate-600 sm:text-[0.98rem]">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
