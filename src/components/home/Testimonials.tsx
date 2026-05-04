"use client";

import { TESTIMONIALS } from "@/lib/constants";
import { useInView } from "@/hooks/useInView";

export default function Testimonials() {
  const { ref: headRef, inView: headIn } = useInView();

  return (
    <section className="py-24 lg:py-36 relative overflow-hidden bg-[#E6F4F9]">
      {/* Subtle decorative orb */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* ── Header ── */}
        <div ref={headRef} className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-3 mb-4 transition-all duration-700 ${
              headIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="h-px w-7 bg-[#3B82F6]" />
            <span className="text-[#3B82F6] text-[0.72rem] font-medium tracking-[0.28em] uppercase">
              Traveler Stories
            </span>
            <div className="h-px w-7 bg-[#3B82F6]" />
          </div>

          <h2
            className={`font-heading text-[2.6rem] md:text-[3.2rem] font-bold text-[#0F172A] transition-all duration-700 delay-100 ${
              headIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Words from the{" "}
            <em className="not-italic text-gradient font-medium">Mountains</em>
          </h2>
        </div>

        {/* ── Testimonial Cards ── */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-7">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i} />
          ))}
        </div>

        {/* ── Trust indicators ── */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-8">
          {[
            { label: "Google Rating", value: "4.9★" },
            { label: "TripAdvisor", value: "Certificate of Excellence" },
            { label: "Reviews", value: "1,200+ verified" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="font-heading text-[#1E3A5F] font-semibold text-base">
                {item.value}
              </div>
              <div className="text-[#0F172A]/40 text-xs mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type Testimonial = (typeof TESTIMONIALS)[number];

function TestimonialCard({
  t,
  index,
}: {
  t: Testimonial;
  index: number;
}) {
  const { ref, inView } = useInView();

  /* Middle card gets subtle lift for visual interest */
  const isCenter = index === 1;

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl p-8 transition-[opacity,transform,box-shadow] duration-700 hover:shadow-md hover:shadow-[#1E3A5F]/12 hover:-translate-y-1.5 group ${
        isCenter ? "md:-translate-y-3" : ""
      } ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{
        transitionDelay: `${index * 115}ms`,
        boxShadow: isCenter
          ? "0 4px 24px rgba(30,58,95,0.10)"
          : "0 1px 8px rgba(30,58,95,0.06)",
      }}
    >
      {/* Large decorative quote mark */}
      <div
        className="font-heading text-[4.5rem] text-[#3B82F6]/18 leading-none -mt-3 mb-3 group-hover:text-[#3B82F6]/28 transition-colors duration-300"
        aria-hidden
      >
        "
      </div>

      {/* Quote text */}
      <p className="text-[#0F172A]/60 text-sm leading-[1.85] font-light mb-7">
        {t.text}
      </p>

      {/* Star rating */}
      <div className="flex gap-0.5 mb-5">
        {Array.from({ length: t.rating }).map((_, i) => (
          <span key={i} className="text-amber-400 text-sm">
            ★
          </span>
        ))}
      </div>

      {/* Author row */}
      <div className="flex items-center gap-3 pt-5 border-t border-[#E6F4F9]">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#3B82F6] flex items-center justify-center text-white text-xs font-semibold shrink-0">
          {t.initials}
        </div>
        <div>
          <div className="text-[#0F172A] font-semibold text-sm">{t.name}</div>
          <div className="text-[#0F172A]/38 text-xs">{t.location}</div>
        </div>
      </div>
    </div>
  );
}
