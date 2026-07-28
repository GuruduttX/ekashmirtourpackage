"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const defaultOverview = `
  <p>Experience the breathtaking beauty of Kashmir with our carefully curated 7-day package. From the serene Dal Lake to the snow-capped peaks of Gulmarg, every moment is crafted for lasting memories. Our expert team ensures a seamless journey through India's most stunning highland paradise.</p>

  <p>Each day is thoughtfully planned to give you the perfect balance of adventure and relaxation. Whether you're gliding across Dal Lake on a shikara at sunrise, ascending the Gulmarg Gondola for panoramic Himalayan views, or wandering through the lush meadows of Pahalgam, this package delivers experiences that stay with you long after you return home.</p>

  <p>Your comfort is our priority throughout the journey. We have hand-selected heritage houseboats and boutique mountain resorts that blend authentic Kashmiri warmth with modern amenities. All transfers are handled in private, climate-controlled premium SUVs so you travel in style at every step.</p>

  <p>This package is ideal for couples, families, and small groups looking to explore Kashmir without the hassle of planning. From airport arrival to final departure, everything is taken care of — all you need to do is show up and soak it all in.</p>
`;

const COLLAPSED_HEIGHT = 230; // px — roughly two paragraphs, matching the reference

export default function PackageOverview({ overview = defaultOverview }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="relative">
      <div className="relative overflow-hidden rounded-3xl border border-sky-100 bg-linear-to-b from-white to-sky-50 px-6 py-8 shadow-[0_4px_40px_-8px_rgba(14,165,233,0.15)] sm:px-10 sm:py-10">
        {/* Left accent bar */}
        <div className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-sky-500 to-cyan-300" />

        {/* Bookmark ribbon */}
        <div
          className="absolute right-6 top-0 h-16 w-8 bg-linear-to-b from-sky-500 to-sky-400 sm:right-8"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%)",
          }}
          aria-hidden="true"
        />

        <h2 className="font-heading text-2xl font-extrabold leading-tight sm:text-3xl">
          <span className="text-slate-900">Package </span>
          <span className="bg-linear-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
            Overview
          </span>
        </h2>

        <div className="relative mt-6">
          <div
            className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
            style={{ maxHeight: expanded ? 20000 : COLLAPSED_HEIGHT }}
          >
            <div
              className="overview-content"
              dangerouslySetInnerHTML={{ __html: overview ?? "" }}
            />
          </div>

          {!expanded && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-sky-50 to-transparent" />
          )}
        </div>

        <button
          onClick={() => setExpanded((v) => !v)}
          className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-sky-500 to-cyan-400 px-6 py-3 font-semibold text-white shadow-md shadow-sky-200 transition-transform hover:-translate-y-0.5"
        >
          {expanded ? "Read Less" : "Read More"}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <style jsx global>{`
        .overview-content {
          color: rgb(30 41 59);
        }

        .overview-content > *:first-child {
          margin-top: 0;
        }
        .overview-content > *:last-child {
          margin-bottom: 0;
        }

        .overview-content p {
          font-size: 0.95rem;
          line-height: 1.85;
          color: rgb(30 41 59);
          margin: 0 0 1rem;
        }

        @media (min-width: 640px) {
          .overview-content p {
            font-size: 1.0625rem;
            line-height: 2;
          }
        }

        .overview-content h1,
        .overview-content h2,
        .overview-content h3,
        .overview-content h4 {
          font-family: var(--font-heading);
          font-weight: 700;
          color: rgb(15 23 42);
        }

        .overview-content h1 {
          font-size: 1.625rem;
          line-height: 1.25;
          margin: 0 0 1rem;
          position: relative;
          padding-bottom: 0.6rem;
        }
        .overview-content h1::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 3.5rem;
          height: 3px;
          border-radius: 2px;
          background: linear-gradient(to right, #0ea5e9, #22d3ee);
        }

        .overview-content h2 {
          font-size: 1.375rem;
          line-height: 1.3;
          margin: 2rem 0 0.75rem;
          position: relative;
          padding-bottom: 0.5rem;
        }
        .overview-content h2::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 3rem;
          height: 3px;
          border-radius: 2px;
          background: linear-gradient(to right, #0ea5e9, #22d3ee);
        }

        .overview-content h3 {
          font-size: 1.15rem;
          margin: 1.75rem 0 0.5rem;
        }

        .overview-content h4 {
          font-size: 1rem;
          margin: 1.5rem 0 0.5rem;
        }

        .overview-content strong,
        .overview-content b {
          font-weight: 600;
          color: rgb(15 23 42);
        }

        .overview-content em,
        .overview-content i {
          font-style: italic;
        }

        .overview-content a {
          color: rgb(2 132 199);
          text-decoration: underline;
          text-decoration-color: rgba(56, 189, 248, 0.5);
          text-underline-offset: 2px;
        }
        .overview-content a:hover {
          color: rgb(3 105 161);
        }

        .overview-content ul,
        .overview-content ol {
          margin: 0 0 1rem;
          padding-left: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .overview-content li {
          line-height: 1.75;
          color: rgb(30 41 59);
        }

        .overview-content ul {
          list-style: none;
          padding-left: 0.25rem;
        }
        .overview-content ul li {
          position: relative;
          padding-left: 1.4rem;
        }
        .overview-content ul li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.6em;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0ea5e9, #22d3ee);
        }

        .overview-content ol {
          list-style: decimal;
          padding-left: 1.25rem;
        }
        .overview-content ol li::marker {
          color: rgb(14 165 233);
          font-weight: 600;
        }

        .overview-content blockquote {
          margin: 1.25rem 0;
          padding: 0.9rem 1.25rem;
          border-left: 4px solid rgb(125 211 252);
          background: rgba(240, 249, 255, 0.7);
          border-radius: 0 0.75rem 0.75rem 0;
          color: rgb(51 65 85);
          font-style: italic;
        }
        .overview-content blockquote p {
          margin: 0;
        }

        .overview-content hr {
          border: none;
          height: 1px;
          margin: 1.75rem 0;
          background: linear-gradient(
            to right,
            transparent,
            rgba(14, 165, 233, 0.25),
            transparent
          );
        }

        .overview-content code {
          background: rgb(240 249 255);
          color: rgb(3 105 161);
          padding: 0.15rem 0.4rem;
          border-radius: 0.35rem;
          font-size: 0.9em;
        }

        .overview-content img {
          width: 100%;
          height: auto;
          border-radius: 1rem;
          margin: 1.25rem 0;
        }

        .overview-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          border-radius: 0.75rem;
          overflow: hidden;
          border: 1px solid rgb(224 242 254);
        }

        .overview-content thead {
          background: linear-gradient(120deg, #0284c7 0%, #0ea5e9 45%, #38bdf8 100%);
        }

        .overview-content th {
          padding: 0.75rem 1rem;
          text-align: left;
          font-size: 0.85rem;
          font-weight: 600;
          color: white;
        }

        .overview-content td {
          padding: 0.75rem 1rem;
          border-top: 1px solid rgb(224 242 254);
          color: rgb(51 65 85);
        }

        .overview-content tr:nth-child(even) td {
          background: rgba(240, 249, 255, 0.5);
        }

        @media (max-width: 640px) {
          .overview-content table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
          }
        }
      `}</style>
    </section>
  );
}
