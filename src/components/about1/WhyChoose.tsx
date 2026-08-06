import {
  BadgeCheck,
  Flower2,
  Headphones,
  HeartHandshake,
} from "lucide-react";

const REASONS = [
  {
    title: "1,200+ Happy Travelers",
    description:
      "Trusted by guests from across India for calm, well-organized, and memorable Kashmir journeys.",
    icon: HeartHandshake,
  },
  {
    title: "4.9/5 Guest Rating",
    description:
      "Highly appreciated for comfort, transparency, smooth planning, and authentic local experiences.",
    icon: BadgeCheck,
  },
  {
    title: "Curated with Local Insight",
    description:
      "Every itinerary is shaped around real travel flow, seasonal rhythm, and the best of Kashmir’s landscape and culture.",
    icon: Flower2,
  },
  {
    title: "24/7 Travel Support",
    description:
      "Our team stays available before, during, and after your trip so your Kashmir journey always feels supported.",
    icon: Headphones,
  },
] as const;

export default function WhyChoose() {
  return (
    <section className="overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f0f9ff_52%,#ffffff_100%)] px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-heading text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Why Choose Our Kashmir Tour Experiences
          </h2>

          <div className="mx-auto mt-5 flex max-w-4xl items-center justify-center gap-14 px-4">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-300/90" />
            <span className="h-2 w-2 rounded-full bg-sky-400/80" />
            <div className="h-px flex-1 bg-gradient-to-r from-sky-100 via-sky-300 to-cyan-100 shadow-[0_0_28px_rgba(56,189,248,0.22)]" />
            <span className="h-2 w-2 rounded-full bg-cyan-300/80" />
          </div>
        </div>

        <div className="mt-12 -mx-5 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:overflow-visible lg:px-0">
          <div className="flex min-w-max gap-5 pb-4 lg:grid lg:min-w-0 lg:grid-cols-4 lg:gap-7 lg:pb-0">
            {REASONS.map((reason) => {
              const Icon = reason.icon;

              return (
                <article
                  key={reason.title}
                  className="group relative w-[280px] shrink-0 rounded-[2rem] border border-sky-100/80 bg-white px-6 py-6 text-center shadow-[0_16px_44px_rgba(14,165,233,0.10)] transition-all duration-300 hover:-translate-y-2 hover:border-sky-300 hover:shadow-[0_24px_56px_rgba(14,165,233,0.18)] sm:w-[320px] lg:w-auto"
                >
                  <div
                    className="absolute left-1/2 top-0 h-1.5 w-24 -translate-x-1/2 rounded-full bg-transparent transition-all duration-300 group-hover:bg-sky-500 group-hover:shadow-[0_4px_18px_rgba(14,165,233,0.35)]"
                  />

                  <div
                    className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-sky-50 text-sky-500 transition-all duration-300 group-hover:bg-sky-500 group-hover:text-white group-hover:shadow-[0_12px_28px_rgba(14,165,233,0.28)]"
                  >
                    <Icon className="h-8 w-8" strokeWidth={2.2} />
                  </div>

                  <h3 className="mt-6 text-[1.2rem] font-semibold leading-tight text-slate-900 sm:text-[1.6rem] lg:text-[1.2rem]">
                    {reason.title}
                  </h3>

                  <p className="mt-4 text-[0.90rem] font-light leading-7 text-slate-500">
                    {reason.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
