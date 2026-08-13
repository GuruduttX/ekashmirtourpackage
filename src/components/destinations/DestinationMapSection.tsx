"use client";

import { motion } from "framer-motion";
import { ExternalLink, MapPin, Navigation } from "lucide-react";
import type { IDestinationMap } from "@/types/destinationTypes";

/**
 * /destinations/[slug] map block — text left, embedded map right.
 *
 * The embed uses the keyless `output=embed` form rather than the Maps Embed
 * API, because no Google key is configured in this project. It renders the
 * same map; if a key is added later, swap the generated URL below for the
 * Embed API form and nothing else here changes. `map.embedUrl` overrides it
 * per destination, for a hand-tuned map.
 *
 * The iframe is lazy-loaded — it is a third-party frame well below the fold,
 * and eager-loading it would cost the page's LCP for something most readers
 * scroll past.
 */

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export default function DestinationMapSection({
  destinationName,
  map,
}: {
  destinationName: string;
  map?: IDestinationMap;
}) {
  // A CMS record always carries a `map` object, defaults and all, so an
  // un-filled one would otherwise render an embed of 0°N 0°E in the Atlantic.
  if (!map || (!map.lat && !map.lng) || !map.blurb) return null;

  const coords = `${map.lat},${map.lng}`;
  // `||`, not `??`: the CMS stores an unset override as "" rather than leaving
  // it undefined, and an empty src is a blank iframe, not a fallback.
  const embedUrl =
    map.embedUrl ||
    `https://maps.google.com/maps?q=${coords}&z=${map.zoom || 12}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coords}`;
  const viewUrl = `https://www.google.com/maps/search/?api=1&query=${coords}`;

  return (
    <section
      aria-label={`Where ${destinationName} is`}
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        {/* ---------- left: orientation copy ---------- */}

        <div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="text-center font-heading text-2xl font-bold text-slate-900 sm:text-left sm:text-3xl"
          >
            {destinationName} On The{" "}
            <span className="bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
              Map
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.06 }}
            className="mt-3 text-center text-sm leading-relaxed text-slate-600 sm:text-left sm:text-base"
          >
            {map.blurb}
          </motion.p>

          {map.landmarks && map.landmarks.length > 0 && (
            <dl className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {map.landmarks.map((landmark, i) => (
                <motion.div
                  key={landmark.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.45,
                    ease: EASE_OUT,
                    delay: i * 0.06,
                  }}
                  className={`group relative flex items-center gap-3 px-4 py-3 transition-colors duration-300 hover:bg-sky-50/60 ${
                    i !== 0 ? "border-t border-slate-100" : ""
                  }`}
                >
                  <span className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-linear-to-b from-sky-400 to-cyan-300 transition-transform duration-300 group-hover:scale-y-100" />

                  <MapPin className="h-4 w-4 shrink-0 text-sky-500" />
                  <dt className="min-w-0 flex-1 text-sm font-semibold text-slate-800">
                    {landmark.name}
                  </dt>
                  <dd className="shrink-0 text-xs text-slate-500">
                    {landmark.detail}
                  </dd>
                </motion.div>
              ))}
            </dl>
          )}

          <div className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-200 transition-transform hover:-translate-y-0.5"
            >
              <Navigation className="h-4 w-4" />
              Get directions
            </a>

            <a
              href={viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-sky-200 hover:text-sky-600"
            >
              Open in Google Maps
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* ---------- right: the map ---------- */}

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
          className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm"
        >
          <iframe
            // Keyed on the URL so switching destinations remounts the frame
            // instead of leaving the previous map in place.
            key={embedUrl}
            src={embedUrl}
            title={`Map showing ${destinationName}, Kashmir`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block h-[320px] w-full border-0 sm:h-[400px] lg:h-[460px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
