"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import {
  useAnimate,
  useReducedMotion,
  type AnimationSequence,
} from "framer-motion";

/**
 * /destinations/ hero — the cloud-reveal cinematic.
 *
 * Sequence, matched to destination-keyframes/ frame by frame:
 *
 *   0.00s  cream veil + four cloud layers fully cover the viewport
 *   0.15s  "EXPLORE" fades up behind the clouds (visible but washed out)
 *   0.00s  clouds drift apart and out; sky + mountains resolve underneath
 *   1.90s  the scene is clear — "EXPLORE" holds over saturated peaks
 *   2.35s  "EXPLORE" fades out
 *   2.60s  the cave mouth pushes in from the top-right and settles to frame
 *   3.25s  the figure in the gate fades up
 *   3.95s  eyebrow → H1 → description → CTAs stagger in on the left
 *
 * One imperative `useAnimate` sequence owns all of it. Every step is placed on
 * an absolute `at` offset rather than chained, because several layers overlap
 * (the cave starts pushing in while EXPLORE is still fading) and absolute time
 * is the only way to keep those relationships stable when a duration changes.
 *
 * Layer order, back to front: sky → mountains → scene scrim → EXPLORE → figure
 * → clouds → cave frame → copy scrim → cream veil → copy. EXPLORE sits under
 * the clouds so the opening frame washes it out the way the reference does, and
 * the cave frame sits over the clouds so a settled cloud bank reads as *outside*
 * the cave mouth.
 */

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

/**
 * Where each cloud starts (covering the viewport) and ends (parted).
 *
 * The settled `to` values matter as much as the motion: the clouds have to end
 * up as small banks pinned to the edges. Left large and central, they keep a
 * milky film over the middle of the frame, EXPLORE reads grey instead of white,
 * and the reveal never resolves.
 */
const CLOUDS = [
  {
    src: "/destinations/hero/cloud4.png",
    // Widest wisp — covers the top band, exits up and right.
    className: "left-[-20%] top-[-25%] w-[110%]",
    from: { x: "6%", y: "10%", scale: 2.5, opacity: 1 },
    to: { x: "34%", y: "-62%", scale: 1.1, opacity: 0 },
    duration: 1.9,
  },
  {
    src: "/destinations/hero/cloud1.png",
    // Left bank — the one that survives into the final frame.
    className: "left-[-30%] top-[10%] w-[70%]",
    from: { x: "42%", y: "-6%", scale: 2.6, opacity: 1 },
    to: { x: "-10%", y: "8%", scale: 0.85, opacity: 0.85 },
    duration: 2.1,
  },
  {
    src: "/destinations/hero/cloud2.png",
    // Bottom-left bank, drifts down and mostly out of frame.
    className: "left-[-18%] bottom-[-22%] w-[65%]",
    from: { x: "38%", y: "-46%", scale: 2.4, opacity: 1 },
    to: { x: "-16%", y: "22%", scale: 0.9, opacity: 0.6 },
    duration: 2.0,
  },
  {
    src: "/destinations/hero/cloud3.png",
    // Right side — clears fully so the cave has a clean edge to land on.
    className: "right-[-24%] top-[18%] w-[75%]",
    from: { x: "-34%", y: "-4%", scale: 2.5, opacity: 1 },
    to: { x: "26%", y: "14%", scale: 1.05, opacity: 0 },
    duration: 1.8,
  },
];

export default function DestinationHero() {
  const [scope, animate] = useAnimate();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // Honour prefers-reduced-motion by snapping to the settled frame: same
    // composition, no cloud reveal, no cave push, no EXPLORE beat.
    if (reduceMotion) {
      animate([
        [".veil", { opacity: 0 }, { duration: 0 }],
        // Same settled values as the animated path, so the two can't drift.
        ...CLOUDS.map(
          (cloud, index) =>
            [`.cloud-${index}`, cloud.to, { duration: 0, at: 0 }] as AnimationSequence[number],
        ),
        [".explore", { opacity: 0 }, { duration: 0, at: 0 }],
        [".cave", { opacity: 1, scale: 1, x: "0%", y: "0%" }, { duration: 0, at: 0 }],
        [".figure", { opacity: 1, y: 0 }, { duration: 0, at: 0 }],
        [".copy-scrim", { opacity: 1 }, { duration: 0, at: 0 }],
        [".mountains", { scale: 1 }, { duration: 0, at: 0 }],
        [".copy", { opacity: 1, y: 0 }, { duration: 0.4, at: 0 }],
      ] as AnimationSequence);
      return;
    }

    const sequence: AnimationSequence = [
      // Slow push on the landscape for the whole run — this is what makes the
      // parting clouds feel like the camera is moving, not just the clouds.
      [
        ".mountains",
        { scale: 1 },
        { duration: 4.6, ease: "linear", at: 0 },
      ],

      // The clouds part. Each keeps its own duration so they don't move as a
      // single rigid sheet.
      ...CLOUDS.map(
        (cloud, index) =>
          [
            `.cloud-${index}`,
            cloud.to,
            { duration: cloud.duration, ease: EASE_OUT, at: 0 },
          ] as AnimationSequence[number],
      ),

      // The cream wash burns off slightly ahead of the clouds themselves.
      [".veil", { opacity: 0 }, { duration: 1.4, ease: EASE_IN_OUT, at: 0.1 }],

      // EXPLORE: up through the wash, hold, then out as the cave arrives.
      [".explore", { opacity: 1, scale: 1 }, { duration: 1.1, ease: EASE_OUT, at: 0.15 }],
      [".explore", { opacity: 0, scale: 1.04 }, { duration: 0.85, ease: EASE_IN_OUT, at: 2.35 }],

      // The cave mouth pushes in from the top-right and settles to frame.
      [".cave", { opacity: 1 }, { duration: 0.5, ease: "easeOut", at: 2.6 }],
      [
        ".cave",
        { scale: 1, x: "0%", y: "0%" },
        { duration: 1.5, ease: EASE_OUT, at: 2.6 },
      ],

      // The figure standing in the gate.
      [".figure", { opacity: 1, y: 0 }, { duration: 0.9, ease: EASE_OUT, at: 3.25 }],

      // Copy scrim arrives just ahead of the copy it exists to serve.
      [".copy-scrim", { opacity: 1 }, { duration: 1, ease: EASE_IN_OUT, at: 3.55 }],

      // Copy last, staggered.
      [
        ".copy",
        { opacity: 1, y: 0 },
        { duration: 0.75, ease: EASE_OUT, delay: 0.12, at: 3.95 },
      ],
    ];

    animate(sequence);
  }, [animate, reduceMotion]);

  return (
    // h-dvh (not vh) so mobile browser chrome can't push the scene off-screen,
    // and pt-17.5 clears the fixed 70px navbar — navbar + hero = one 100dvh
    // screen exactly, which is the whole point of the reveal.
    <section
      ref={scope}
      aria-label="Kashmir destinations"
      className="relative h-dvh min-h-136 w-full overflow-hidden bg-[#0d1b24]"
    >
      {/* ---------- scene ---------- */}

      <div className="absolute inset-0">
        <Image
          src="/destinations/hero/bg-sky.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      {/* The mountain plate carries the slow push. The asset is near-square with
          the sunlit peaks in its upper third and dead black below, so it is
          anchored high — object-bottom lands on the black. */}
      <div className="mountains absolute inset-0 origin-center scale-[1.12] transform-gpu will-change-transform">
        <Image
          src="/destinations/hero/bg-mountains.png"
          alt="Snow-covered Himalayan peaks in the Kashmir valley at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      {/* Readability scrim, left-biased. It sits here — above the landscape but
          below the clouds, EXPLORE and the cave — so it darkens the backdrop
          behind the copy without draining the colour out of the cloud layers or
          the cave rock, which is what a full-bleed overlay on top would do. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-slate-950/70 via-slate-950/15 to-transparent"
      />

      {/* EXPLORE — decorative, and deliberately not an <h1>: the real heading
          comes in below. aria-hidden so screen readers get one clean title. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span className="explore block scale-[0.96] transform-gpu text-center text-[13vw] font-bold leading-none tracking-[0.22em] text-white/95 opacity-0 will-change-[opacity,transform] sm:text-[11vw]">
          EXPLORE
        </span>
      </div>

      {/* The figure in the gate. The asset is a ridge + silhouette, so it pins
          to the bottom edge full-width. */}
      <div className="figure pointer-events-none absolute inset-x-0 bottom-0 translate-y-6 transform-gpu opacity-0 will-change-[opacity,transform]">
        <div className="relative h-[38dvh] w-full sm:h-[42dvh]">
          <Image
            src="/destinations/hero/cave-man.png"
            alt="A lone traveller standing at the mouth of a cave looking out over the peaks"
            fill
            priority
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>
      </div>

      {/* Clouds. Above the landscape and EXPLORE, below the cave frame. */}
      {CLOUDS.map((cloud, index) => (
        <div
          key={cloud.src}
          aria-hidden="true"
          className={`cloud cloud-${index} pointer-events-none absolute transform-gpu will-change-[opacity,transform] ${cloud.className}`}
          style={{
            transform: `translate(${cloud.from.x}, ${cloud.from.y}) scale(${cloud.from.scale})`,
            opacity: cloud.from.opacity,
          }}
        >
          <Image
            src={cloud.src}
            alt=""
            width={1471}
            height={897}
            priority
            sizes="100vw"
            className="h-auto w-full select-none"
          />
        </div>
      ))}

      {/* The cave mouth. Starts oversized and pushed down-left, which puts its
          top-right slab of rock over the viewport's top-right corner — the
          direction the rock enters from in the reference — then settles to full
          bleed. Offsetting the other way shows the left wall instead. */}
      <div
        aria-hidden="true"
        className="cave pointer-events-none absolute inset-0 transform-gpu opacity-0 will-change-[opacity,transform]"
        style={{ transform: "translate(-22%, 16%) scale(1.8)" }}
      >
        {/* The asset is portrait (2400×2540), so which way `cover` crops depends
            on the viewport's ASPECT RATIO, not its width — which is why the
            variant here is a min-aspect-ratio query and not `md:`. An 820×1180
            tablet is past `md` but still portrait, and a width-keyed rule gives
            it the landscape framing, which shears off both walls and leaves the
            gate unreadable.

            Landscape: cover crops vertically, so only the y anchor does
            anything. High keeps the overhang across the top and the wide part of
            the mouth on screen; centred lands mid-wall — a solid slab of rock.

            Portrait: cover crops horizontally instead, so the walls can't both
            fit. object-top keeps the overhang spanning the full width, which is
            the honest small-screen version of the same shot. */}
        <Image
          src="/destinations/hero/cave.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top [@media(min-aspect-ratio:1/1)]:object-[center_14%]"
        />
      </div>

      {/* Second scrim, above the cave and clouds but under the copy, capped at
          ~62% width. The scene-level scrim can't do this job alone: a settled
          cloud bank or sunlit snowfield behind the headline still washes it out,
          and darkening the whole frame to fix that would flatten the gate.
          It fades in with the copy rather than sitting there from the start,
          because during the reveal it would put a dark wedge across EXPLORE —
          which the reference holds as an even, full-width white. */}
      <div
        aria-hidden="true"
        className="copy-scrim pointer-events-none absolute inset-y-0 left-0 w-full bg-linear-to-t from-slate-950/92 via-slate-950/55 to-transparent opacity-0 [@media(min-aspect-ratio:1/1)]:w-[62%] [@media(min-aspect-ratio:1/1)]:bg-linear-to-r [@media(min-aspect-ratio:1/1)]:from-slate-950/85 [@media(min-aspect-ratio:1/1)]:via-slate-950/45"
      />

      {/* Opening cream wash. Last in the stack so frame 1 is a single flat
          cover — under the scrims it would read as a gradient instead. */}
      <div
        aria-hidden="true"
        className="veil pointer-events-none absolute inset-0 bg-[#f7f3ec]"
      />

      {/* ---------- copy ---------- */}

      <div className="relative z-10 flex h-full flex-col justify-end pt-17.5 pb-10 [@media(min-aspect-ratio:1/1)]:justify-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Centred while the viewport is portrait (phones *and* portrait
              tablets, where the scrim runs bottom-up), left-aligned once it is
              landscape and the scrim runs left-to-right. */}
          <div className="max-w-xl text-center [@media(min-aspect-ratio:1/1)]:max-w-2xl [@media(min-aspect-ratio:1/1)]:text-left">
            <p className="copy inline-flex translate-y-4 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-sky-100 opacity-0 backdrop-blur-md">
              <Compass className="h-3.5 w-3.5" />
              Kashmir destination hub
            </p>

            <h1 className="copy mt-4 translate-y-4 font-heading text-3xl font-bold leading-tight text-white opacity-0 sm:text-4xl lg:text-5xl">
              Every Kashmir destination, and how they fit together
            </h1>

            <p className="copy mx-auto mt-4 max-w-lg translate-y-4 text-sm leading-relaxed text-slate-200 opacity-0 md:text-base md:leading-7 [@media(min-aspect-ratio:1/1)]:mx-0">
              Srinagar, Gulmarg, Pahalgam and Sonamarg — with the real distance
              from Srinagar, the season each one is worth visiting, and the cab
              fare and package that go with it.
            </p>

            <div className="copy mt-7 flex translate-y-4 flex-wrap justify-center gap-3 opacity-0 [@media(min-aspect-ratio:1/1)]:justify-start">
              <Link
                href="/contact/"
                className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-900/40 transition-transform hover:-translate-y-0.5"
              >
                Plan my trip
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/kashmir-tour-packages/"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                Browse Kashmir packages
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
