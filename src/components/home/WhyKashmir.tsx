"use client";

import Image from "next/image";
import { WHY_FEATURES } from "@/lib/constants";
import { useInView } from "@/hooks/useInView";

export default function WhyKashmir() {
  const { ref: leftRef,  inView: leftIn  } = useInView();
  const { ref: rightRef, inView: rightIn } = useInView();

  return (
    <section
      id="why-kashmir"
      className="py-16 lg:py-24 relative overflow-hidden bg-white"
    >
      {/* Decorative glows — inside own overflow-hidden so they don't widen the layout */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-60 top-1/2 -translate-y-1/2 w-150 h-150 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 68%)" }}
        />
        <div
          className="absolute -right-40 bottom-0 w-100 h-100 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* ── Left: Image composition ── */}
          <div
            ref={leftRef}
            className={`relative min-w-0 transition-all duration-1000 ${
              leftIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Main image — shorter on mobile, full on desktop */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-72 sm:h-110">
              <Image
                src="https://plus.unsplash.com/premium_photo-1697730277839-440df1a4415f?q=85&w=1200&auto=format&fit=crop"
                alt="Kashmir snow-capped mountains"
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/55 via-slate-900/10 to-transparent" />

              <div className="absolute bottom-0 inset-x-0 p-5">
                <p className="text-white font-bold text-base leading-tight">The Valley of Heaven</p>
                <p className="text-white/55 text-xs mt-0.5 tracking-wide">Jammu & Kashmir, India</p>
              </div>
            </div>

            {/* Floating images — desktop only */}
            <div
              className="hidden sm:block absolute -top-5 -left-5 rounded-2xl overflow-hidden border-4 border-white shadow-xl"
              style={{ width: "140px", height: "140px" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1584732200355-486a95263014?q=85&w=400&auto=format&fit=crop"
                alt="Pahalgam valley meadow"
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            <div
              className="hidden sm:block absolute -bottom-5 -right-5 rounded-2xl overflow-hidden border-4 border-white shadow-xl"
              style={{ width: "155px", height: "155px" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1627894485200-b92fb4353967?q=85&w=400&auto=format&fit=crop"
                alt="Sonamarg glacier"
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/30 to-transparent" />
            </div>

            {/* Experience badge */}
            <div
              className="absolute top-4 right-4 rounded-2xl px-4 py-3 shadow-lg"
              style={{
                background: "rgba(255,255,255,0.94)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.85)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              }}
            >
              <div
                className="font-heading text-2xl font-black leading-none"
                style={{
                  background: "linear-gradient(120deg,#0284C7,#38BDF8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                15+
              </div>
              <div className="text-slate-400 text-[0.6rem] font-medium leading-tight mt-1">
                Years crafting<br />Kashmir journeys
              </div>
            </div>

            {/* Dot grid — desktop only (mobile: causes left-overflow shift) */}
            <div
              className="hidden sm:block pointer-events-none absolute -bottom-8 -left-8 w-24 h-24 opacity-30"
              style={{
                backgroundImage: "radial-gradient(circle, #38BDF8 1px, transparent 1px)",
                backgroundSize: "8px 8px",
              }}
            />
          </div>

          {/* ── Right: Text content ── */}
          <div
            ref={rightRef}
            className={`min-w-0 transition-all duration-1000 delay-200 ${
              rightIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Overline */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-px w-8 bg-sky-500" />
              <span className="text-sky-500 text-[0.68rem] font-semibold tracking-[0.28em] uppercase">
                Why Kashmir
              </span>
              <div className="h-px w-8 bg-sky-500" />
            </div>

            {/* Heading */}
            <h2
              className="font-heading font-bold text-slate-900 leading-[1.12] mb-5"
              style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.7rem)" }}
            >
              A landscape that{" "}
              <span
                style={{
                  background: "linear-gradient(120deg, #0284C7 0%, #0EA5E9 50%, #38BDF8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                stays with you
              </span>{" "}
              long after you leave
            </h2>

            {/* Description */}
            <p className="text-slate-400 leading-[1.85] mb-8 text-[0.9rem] font-light">
              Kashmir is not a destination. It is a feeling — one that lodges
              itself beneath your skin on the first morning frost and refuses to
              leave quietly. Every visit reveals a new layer.
            </p>

            {/* Feature list — scrolls horizontally on mobile */}
            <ul className="flex overflow-x-auto scroll-hide gap-4 pb-2 -mx-6 px-6 sm:mx-0 sm:px-0 lg:flex-col mb-8">
              {WHY_FEATURES.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 p-3.5 rounded-2xl transition-all duration-200 hover:shadow-sm shrink-0 min-w-57.5 lg:min-w-0"
                  style={{
                    background: "linear-gradient(135deg, #F8FBFF 0%, #EFF6FF 100%)",
                    border: "1px solid rgba(186,230,253,0.55)",
                  }}
                >
                  <div
                    className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-base"
                    style={{
                      background: "linear-gradient(135deg,#E0F2FE,#BAE6FD)",
                      border: "1px solid rgba(125,211,252,0.5)",
                    }}
                  >
                    {f.icon}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-slate-900 font-semibold text-[0.88rem] leading-none mb-1">
                      {f.title}
                    </h3>
                    <p className="text-slate-400 text-[0.78rem] leading-[1.7] font-light">
                      {f.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              className="rounded-full px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(120deg, #0284C7 0%, #38BDF8 100%)",
                boxShadow: "0 4px 20px rgba(14,165,233,0.38)",
              }}
            >
              Discover Kashmir →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
