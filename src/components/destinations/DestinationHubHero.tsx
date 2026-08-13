"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MapPin, Phone, User } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import type { Destination } from "@/data/destinations";

/**
 * /destinations/ hero — a rotating slideshow of the places the hub covers.
 *
 * Composition: full-bleed photo behind everything, a black scrim that is
 * heaviest on the left and thins out to the right, copy + CTA over the dark
 * side, and the destination names bottom-right with the active one underlined.
 *
 * What does NOT rotate: the H1 and the description. Only the photo, the small
 * place label and the active name change. A headline that swapped every few
 * seconds would mean the crawler and the reader see different primary headings
 * on the same URL, and the hub's H1 has to stay the hub's H1 (SOP §2.4).
 *
 * The rotation is driven by one `index` state — the photo, the label, the
 * underline and the progress bar are all derived from it, so they can never
 * disagree about which destination is active.
 */

/**
 * Hold time per slide. The brief said "changing per second"; a literal 1000ms
 * is shorter than the crossfade itself, so the scene would never settle and the
 * name list would strobe. 4.5s is the slowest value that still reads as
 * "constantly moving" — this is the one number to change if you want it faster.
 */
const ROTATE_MS = 4500;
const FADE_S = 1.2;

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/**
 * Compact glass enquiry card — name, phone, submit.
 *
 * NOTE: submission is UI-only, matching the existing CabBookingSection pattern.
 * There is no leads API route or Mongo model in this project yet, so there is
 * nowhere to POST to. The success state is real, the delivery is not — wire
 * handleSubmit to a /api/leads route (or WhatsApp deep link) before launch.
 */
function HeroEnquiryForm({ activeName }: { activeName: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // TODO: POST to a leads endpoint. Deliberately not silently dropped —
    // logging keeps it obvious in dev that nothing is persisted yet.
    console.log("Destination enquiry:", { name, phone, interestedIn: activeName });
    setSent(true);
  };

  return (
    // Glass: translucent fill + blur + a hairline top-light border. It needs its
    // own subtle shadow because it sits on photography, not on a flat surface.
    <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="flex items-center gap-3 py-2"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
              <Check className="h-4.5 w-4.5" />
            </span>
            <p className="text-sm font-semibold text-white">
              Thanks{name ? `, ${name.split(" ")[0]}` : ""} — Sartaj will call you
              back.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="space-y-3"
          >
            <p className="font-heading text-base font-bold text-white">
              Plan my Kashmir trip
            </p>

            {/* Icons are decorative; each field carries its own visible-to-AT
                label via aria-label since there is no room for real labels. */}
            <div className="flex items-center gap-2.5 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 transition-colors focus-within:border-sky-300/70 focus-within:bg-white/15">
              <User aria-hidden="true" className="h-4 w-4 shrink-0 text-sky-200" />
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                autoComplete="name"
                aria-label="Your name"
                placeholder="Your name"
                className="w-full bg-transparent text-sm text-white placeholder-white/60 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 transition-colors focus-within:border-sky-300/70 focus-within:bg-white/15">
              <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-sky-200" />
              <input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
                inputMode="tel"
                autoComplete="tel"
                aria-label="Phone number"
                placeholder="Phone number"
                className="w-full bg-transparent text-sm text-white placeholder-white/60 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer rounded-xl bg-linear-to-r from-sky-500 to-cyan-400 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-900/30 transition-transform hover:-translate-y-0.5"
            >
              Get my quote
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DestinationHubHero({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const count = destinations.length;
  const active = destinations[index];

  const goTo = useCallback((next: number) => {
    setIndex(((next % count) + count) % count);
  }, [count]);

  useEffect(() => {
    // No auto-rotation under reduced-motion or while the reader is interacting
    // with the name list — an animation that moves the thing you are aiming at
    // is worse than no animation.
    if (reduceMotion || paused || count < 2) return;

    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % count),
      ROTATE_MS,
    );

    return () => window.clearInterval(timer);
  }, [reduceMotion, paused, count]);

  return (
    // h-dvh (not vh) so mobile browser chrome can't crop the scene, and pt-17.5
    // clears the fixed 70px navbar — navbar + hero fill exactly one screen.
    <section
      aria-label="Kashmir destinations"
      className="relative h-dvh min-h-136 w-full overflow-hidden bg-slate-950"
    >
      {/* ---------- rotating photo ---------- */}

      {/* mode="sync": the outgoing photo has to stay mounted and fade out
          underneath the incoming one. mode="wait" would unmount it first and
          flash the bare background between slides. */}
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={active.slug}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: FADE_S, ease: "easeInOut" },
            // The slow settle outlasts the hold, so the photo is still drifting
            // when the next one arrives — no dead frames.
            scale: { duration: ROTATE_MS / 1000 + FADE_S, ease: "linear" },
          }}
        >
          <Image
            src={active.image}
            alt={active.imageAlt}
            fill
            // Only the first slide blocks render; the rest arrive as they rotate.
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Landscape: heaviest left → lightest right, so the copy sits on the dark
          end and the photo stays open on the right.
          Portrait: dark at BOTH ends and lighter through the middle — the copy
          and form are at the top and the name list is at the bottom, so a
          single-direction wash would always leave one of them on bright
          photography. The mid-tone gap is where the image gets to show. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/88 via-black/45 to-black/80 [@media(min-aspect-ratio:1/1)]:bg-linear-to-r [@media(min-aspect-ratio:1/1)]:from-black/88 [@media(min-aspect-ratio:1/1)]:via-black/55 [@media(min-aspect-ratio:1/1)]:to-black/10"
      />

      {/* Breadcrumbs, pinned just under the navbar.
          Absolutely positioned rather than placed in the content flow: in
          landscape that flow is vertically centred, so an in-flow crumb trail
          would ride up next to the headline in the middle of the screen instead
          of sitting at the top.
          The shared component hardcodes slate link colours for light
          backgrounds, so its palette is overridden here via child selectors
          (higher specificity than the utility classes on the elements) rather
          than by forking the component. */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.15 }}
        className="absolute inset-x-0 top-24 z-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ label: "Destinations" }]}
            className="**:aria-[current]:text-sky-300 **:aria-[hidden]:text-white/40 [&_a]:text-white/70 [&_a:hover]:text-white"
          />
        </div>
      </motion.div>

      {/* ---------- copy ---------- */}

      {/* Portrait: a single column starting at the TOP, so the copy clears the
          navbar and the form sits under the CTA, with pb-24 reserving room for
          the name list pinned at the bottom.
          Landscape: two columns, both vertically centred — copy left over the
          heavy end of the scrim, form right. The extra bottom padding there
          keeps the form clear of the bottom-right name list on short screens. */}
      {/* pt-32 in portrait clears the navbar *and* the breadcrumb row above it;
          landscape centres its content vertically, so it only needs the navbar
          offset. */}
      <div className="relative z-10 flex h-full flex-col pt-32 pb-24 [@media(min-aspect-ratio:1/1)]:justify-center [@media(min-aspect-ratio:1/1)]:pt-17.5 [@media(min-aspect-ratio:1/1)]:pb-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 [@media(min-aspect-ratio:1/1)]:grid [@media(min-aspect-ratio:1/1)]:grid-cols-[minmax(0,1fr)_auto] [@media(min-aspect-ratio:1/1)]:items-center [@media(min-aspect-ratio:1/1)]:gap-10">
          {/* Centred while portrait, left-aligned once the scrim runs sideways. */}
          <div className="max-w-xl text-center [@media(min-aspect-ratio:1/1)]:max-w-2xl [@media(min-aspect-ratio:1/1)]:text-left">
            {/* The one piece of copy tied to the active slide. */}
            <div className="flex h-7 items-center justify-center [@media(min-aspect-ratio:1/1)]:justify-start">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active.slug}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  {active.name}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
              className="mt-3 font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
            >
              Every Kashmir destination, and how they fit together
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.22 }}
              className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-200 md:text-base md:leading-7 [@media(min-aspect-ratio:1/1)]:mx-0"
            >
              Srinagar, Gulmarg, Pahalgam and Sonamarg — with the real distance
              from Srinagar, the season each one is worth visiting, and the cab
              fare and package that go with it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.34 }}
              className="mt-7 flex justify-center [@media(min-aspect-ratio:1/1)]:justify-start"
            >
              <Link
                href="/contact/"
                className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-900/40 transition-transform hover:-translate-y-0.5"
              >
                Plan my trip
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>

          {/* Enquiry card. Portrait: centred under the CTA. Landscape: the
              right-hand grid column, vertically centred with the copy. */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.46 }}
            className="mx-auto mt-7 flex w-full justify-center [@media(min-aspect-ratio:1/1)]:mx-0 [@media(min-aspect-ratio:1/1)]:mt-0 [@media(min-aspect-ratio:1/1)]:w-auto [@media(min-aspect-ratio:1/1)]:justify-end"
          >
            {/* activeName rides along so the lead records which destination was
                on screen when the reader decided to enquire. */}
            <HeroEnquiryForm activeName={active.name} />
          </motion.div>
        </div>
      </div>

      {/* ---------- destination switcher, bottom-right ---------- */}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.5 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        className="absolute inset-x-0 bottom-4 z-20 [@media(min-aspect-ratio:1/1)]:inset-x-auto [@media(min-aspect-ratio:1/1)]:right-8 [@media(min-aspect-ratio:1/1)]:bottom-10 lg:right-12"
      >
        {/* Buttons, not decoration: the names are the fastest way to reach a
            specific destination's photo, and they give keyboard users a way to
            drive the slideshow at all. */}
        <ul className="no-scrollbar flex items-center justify-center gap-5 overflow-x-auto px-4 [@media(min-aspect-ratio:1/1)]:flex-col [@media(min-aspect-ratio:1/1)]:items-end [@media(min-aspect-ratio:1/1)]:gap-3 [@media(min-aspect-ratio:1/1)]:overflow-visible [@media(min-aspect-ratio:1/1)]:px-0">
          {destinations.map((destination, position) => {
            const isActive = position === index;

            return (
              <li key={destination.slug} className="shrink-0">
                <button
                  type="button"
                  onClick={() => goTo(position)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative block cursor-pointer pb-1.5 font-heading text-sm font-semibold whitespace-nowrap transition-colors sm:text-base [@media(min-aspect-ratio:1/1)]:text-lg ${
                    isActive
                      ? "text-white"
                      : "text-white/55 hover:text-white/85"
                  }`}
                >
                  {destination.name}

                  {/* One underline element that slides between names, rather
                      than four that fade — layoutId is what makes the highlight
                      feel like a single moving marker. */}
                  {isActive && (
                    <motion.span
                      layoutId="destination-underline"
                      transition={{ duration: 0.45, ease: EASE_OUT }}
                      className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-linear-to-r from-sky-400 to-cyan-300"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Progress bar for the current slide — the only cue that tells a reader
            the photo is about to change rather than that it just did. Keyed on
            index so it restarts from zero on every slide, including manual
            jumps. Hidden when nothing is auto-advancing. */}
        {!reduceMotion && !paused && count > 1 && (
          <div className="mt-2 hidden h-0.5 w-28 overflow-hidden rounded-full bg-white/20 [@media(min-aspect-ratio:1/1)]:ml-auto [@media(min-aspect-ratio:1/1)]:block">
            <motion.span
              key={index}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: ROTATE_MS / 1000, ease: "linear" }}
              className="block h-full bg-white/70"
            />
          </div>
        )}
      </motion.div>
    </section>
  );
}
