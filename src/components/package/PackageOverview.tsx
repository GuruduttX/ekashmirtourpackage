 "use client";
import { useEffect, useRef, useState } from "react";

const defaultOverview = `
  <p>Experience the breathtaking beauty of Kashmir with our carefully curated 7-day package. From the serene Dal Lake to the snow-capped peaks of Gulmarg, every moment is crafted for lasting memories. Our expert team ensures a seamless journey through India's most stunning highland paradise.</p>
 
  <p>Each day is thoughtfully planned to give you the perfect balance of adventure and relaxation. Whether you're gliding across Dal Lake on a shikara at sunrise, ascending the Gulmarg Gondola for panoramic Himalayan views, or wandering through the lush meadows of Pahalgam, this package delivers experiences that stay with you long after you return home.</p>
 
  <p>Your comfort is our priority throughout the journey. We have hand-selected heritage houseboats and boutique mountain resorts that blend authentic Kashmiri warmth with modern amenities. All transfers are handled in private, climate-controlled premium SUVs so you travel in style at every step.</p>
 
  <p>This package is ideal for couples, families, and small groups looking to explore Kashmir without the hassle of planning. From airport arrival to final departure, everything is taken care of — all you need to do is show up and soak it all in.</p>
`;

export default function PackageOverview({ overview = defaultOverview }) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-0 sm:py-6 overflow-hidden"
    >
      {/* ── Decorative background blobs ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, #0ea5e9 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 w-[360px] h-[360px] rounded-full opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)",
        }}
      />

      {/* ── Subtle dot-grid texture ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.45,
        }}
      />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
        {/* ── HEADER ── */}
        <div
          className="mb-9 sm:mb-14 flex flex-col sm:flex-row sm:items-end sm:gap-8"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          {/* Vertical accent bar */}
          <div className="hidden sm:block w-1 self-stretch rounded-full bg-gradient-to-b from-sky-500 to-cyan-300" />

          <div>
            {/* Eyebrow label */}
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-sky-500">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              </svg>
              What's Included
            </span>

            <h2
              className="text-3xl font-extrabold text-gray-900 leading-tight"
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                letterSpacing: "-0.02em",
              }}
            >
              Package Overview
            </h2>
          </div>
        </div>

        {/* ── CONTENT CARD ── */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
        >
          <div className="relative rounded-2xl border border-gray-100 bg-white shadow-[0_4px_40px_-8px_rgba(0,0,0,0.1)] overflow-hidden">
            {/* Top colour bar */}
            <div className="h-1 w-full bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-300" />

            <div className="px-8 sm:px-12 py-2 sm:py-6 md:py-10">
              <div
                className="
                  ItineraryContent
                  prose prose-slate max-w-none
                  prose-headings:font-bold prose-headings:text-gray-900
                  prose-h2:text-2xl prose-h3:text-xl
                  prose-p:text-gray-600 prose-p:leading-8 prose-p:text-[1.0625rem]
                  prose-ul:list-none prose-ul:pl-0
                  prose-ol:pl-6 prose-ol:list-decimal
                  prose-li:my-2 prose-li:text-gray-600
                  prose-strong:text-gray-800 prose-strong:font-semibold
                  prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline
                  [&_.ItineraryContent_ul>li]:pl-6
                  [&_.ItineraryContent_ul>li]:relative
                "
                style={
                  { "--tw-prose-bullets": "#0ea5e9" } as React.CSSProperties
                }
                dangerouslySetInnerHTML={{ __html: overview ?? "" }}
              />
            </div>

            {/* Bottom footer strip */}
            <div className="px-8 sm:px-12 py-4 bg-gray-50 border-t border-gray-100 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <p className="text-xs text-gray-400 font-medium tracking-wide">
                Details are subject to availability & seasonal adjustments
              </p>
            </div>
          </div>
        </div>

        {/* ── DECORATIVE BOTTOM ACCENT ── */}
        <div
          className="mt-6 sm:mt-8 md:mt-10 flex justify-center"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.6s",
          }}
        >
          <div className="flex gap-1.5 items-center">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-full bg-cyan-300"
                style={{
                  width: i === 2 ? "24px" : "8px",
                  height: "4px",
                  opacity: i === 2 ? 1 : 0.45,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Custom prose bullet override ── */}
      <style>{`
        .ItineraryContent ul > li {
          position: relative;
          padding-left: 1.6rem;
          list-style: none;
        }
        .ItineraryContent ul > li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.55em;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0ea5e9, #22d3ee);
        }
        .ItineraryContent ol > li::marker {
          color: #0ea5e9;
          font-weight: 600;
        }
        .ItineraryContent h2,
        .ItineraryContent h3 {
          position: relative;
          padding-left: 1rem;
        }
        .ItineraryContent h2::before,
        .ItineraryContent h3::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.2em;
          bottom: 0.2em;
          width: 3px;
          border-radius: 2px;
          background: linear-gradient(to bottom, #0ea5e9, #22d3ee);
        }
      `}</style>
    </section>
  );
}
