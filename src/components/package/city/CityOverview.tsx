"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Compass } from "lucide-react";

interface CityOverviewProps {
  cityName: string;
  overview: string;
}

const COLLAPSED_HEIGHT = 240; // px

/**
 * City hub "about" section — a sticky left rail (eyebrow + heading) paired
 * with the hub's rich-text overview on the right, with its own read-more
 * collapse and typography. Distinct from the package-level PackageOverview
 * card design. Renders nothing when overview is empty.
 */
export default function CityOverview({ cityName, overview }: CityOverviewProps) {
  const [expanded, setExpanded] = useState(false);

  if (!overview?.trim()) return null;

  return (
    <section className="relative bg-white py-14 lg:py-20">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_2fr] lg:gap-14 lg:px-8">
        {/* ────── Left rail ────── */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center sm:items-start sm:text-left lg:sticky lg:top-28 lg:self-start"
        >
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5">
            <Compass className="h-3 w-3 text-sky-500" />
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-sky-600">
              City Guide
            </span>
          </div>
          <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
            Travelling from{" "}
            <span
              className="italic"
              style={{
                background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {cityName}
            </span>
          </h2>
          <div className="mt-4 h-1 w-14 rounded-full bg-linear-to-r from-sky-500 to-cyan-400" />
        </motion.div>

        {/* ────── Content ────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col items-center text-center sm:items-start sm:text-left"
        >
          <div
            className="w-full overflow-hidden transition-[max-height] duration-500 ease-in-out"
            style={{ maxHeight: expanded ? 20000 : COLLAPSED_HEIGHT }}
          >
            <div className="city-overview-content" dangerouslySetInnerHTML={{ __html: overview }} />
          </div>

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 transition-colors hover:text-sky-700"
          >
            {expanded ? "Show less" : "Continue reading"}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        </motion.div>
      </div>

      <style jsx global>{`
        .city-overview-content {
          color: rgb(51 65 85);
        }
        .city-overview-content > *:first-child {
          margin-top: 0;
        }
        .city-overview-content > *:last-child {
          margin-bottom: 0;
        }
        .city-overview-content p {
          font-size: 0.95rem;
          line-height: 1.85;
          margin: 0 0 1.1rem;
        }
        @media (min-width: 640px) {
          .city-overview-content p {
            font-size: 1.02rem;
            line-height: 1.95;
          }
        }
        .city-overview-content h1,
        .city-overview-content h2,
        .city-overview-content h3,
        .city-overview-content h4 {
          font-weight: 700;
          color: rgb(15 23 42);
        }
        .city-overview-content h2 {
          font-size: 1.3rem;
          margin: 1.75rem 0 0.75rem;
        }
        .city-overview-content h3 {
          font-size: 1.1rem;
          margin: 1.5rem 0 0.5rem;
        }
        .city-overview-content strong,
        .city-overview-content b {
          font-weight: 600;
          color: rgb(15 23 42);
        }
        .city-overview-content a {
          color: rgb(2 132 199);
          text-decoration: underline;
          text-decoration-color: rgba(56, 189, 248, 0.5);
          text-underline-offset: 2px;
        }
        .city-overview-content a:hover {
          color: rgb(3 105 161);
        }
        .city-overview-content ul {
          list-style: none;
          padding-left: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin: 0 0 1.1rem;
        }
        .city-overview-content ul li {
          position: relative;
          padding-left: 1.6rem;
          line-height: 1.7;
        }
        .city-overview-content ul li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.55em;
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: linear-gradient(135deg, #0ea5e9, #06b6d4);
        }
        .city-overview-content ol {
          padding-left: 1.25rem;
          margin: 0 0 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .city-overview-content ol li::marker {
          color: rgb(14 165 233);
          font-weight: 600;
        }
        .city-overview-content blockquote {
          margin: 1.25rem 0;
          padding: 0.9rem 1.25rem;
          border-left: 4px solid rgb(125 211 252);
          background: rgba(240, 249, 255, 0.6);
          border-radius: 0 0.75rem 0.75rem 0;
          color: rgb(51 65 85);
          font-style: italic;
        }
        .city-overview-content blockquote p {
          margin: 0;
        }
        .city-overview-content img {
          width: 100%;
          height: auto;
          border-radius: 1rem;
          margin: 1.25rem 0;
        }
      `}</style>
    </section>
  );
}
