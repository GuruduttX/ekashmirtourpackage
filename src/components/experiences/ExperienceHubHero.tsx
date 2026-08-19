import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import type { Experience } from "@/data/experiences";

/**
 * Hub hero for /experiences/ — centred copy over an infinitely scrolling photo
 * grid.
 *
 * Two things it must keep, whatever the design does next:
 *   1. Exactly one <h1>, and it stays the hub's H1 (SOP §2.9). The H1 and the
 *      description are the parts that must NOT rotate or animate away.
 *   2. <Breadcrumbs items={[{ label: "Experiences" }]} /> — the only place the
 *      BreadcrumbList JSON-LD is emitted on this URL.
 *
 * Still a server component. The 3D plane and the marquee on it are both pure
 * CSS — framer-motion is in the project, but this animation has no state, no
 * gestures and no scroll coupling, so reaching for it would only mean marking
 * the hero "use client" and shipping a runtime to move a decorative backdrop.
 *
 * HEIGHT: the navbar is `fixed` and 70px tall, so the hero is offset by exactly
 * that (`mt-[70px]`) and sized to the rest of the viewport
 * (`h-[calc(100svh-70px)]`). Navbar + hero therefore total one screen, never
 * more, and the photo grid starts below the bar instead of sliding under it.
 * `svh` rather than `vh` so mobile browser chrome cannot push the bottom of the
 * hero off-screen.
 *
 * PHOTOGRAPHY: remote stock URLs, deliberately kept in this file rather than in
 * src/data — they are decorative wallpaper, not content anyone will query,
 * caption or link. They render with empty alt for the same reason. Swap the
 * array when real photography lands; nothing else changes.
 */

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=70`;

/** 32 photos = 8 columns × 4 rows, all unique before the loop repeats. */
const HERO_IMAGES: string[] = [
  img("photo-1551698618-1dfe5d97d256"),
  img("photo-1629248564797-8c5ba85da9d3"),
  img("photo-1685550903259-96799741df9e"),
  img("photo-1566837497312-7be7830ae9b1"),
  img("photo-1566837500831-838ff7486b28"),
  img("photo-1568889753852-196c487a536e"),
  img("photo-1684516021757-af78dad0fbaa"),
  img("photo-1707381076957-ec19b90e9cbe"),
  img("photo-1685716271205-83a5ac2ba63b"),
  img("photo-1595815771614-ade9d652a65d"),
  img("photo-1780036782018-2d49f377d8b2"),
  img("photo-1630879937467-4afa290b1a6b"),
  img("photo-1625457672610-929a21cc2eef"),
  img("photo-1774454773999-0e29ce7eb28b"),
  img("photo-1629221816532-0bb00532c66"),
  img("photo-1676441019594-07142b925bc2"),
  img("photo-1698521660341-2392b5639034"),
  img("photo-1669996052026-28f56994eb9e"),
  img("photo-1623567341691-1f47b5cf949e"),
  img("photo-1443706340763-4b60757a36ce"),
  img("photo-1578662996442-48f60103fc96"),
  img("photo-1600845747913-e33543f94892"),
  img("photo-1584732200355-486a95263014"),
  img("photo-1593181629936-11c609b8db9b"),
  img("photo-1595815771614-ade9d652a65d"),
  img("photo-1598091383021-15ddea10925d"),
  img("photo-1615478649193-db68b2836697"),
  img("photo-1593417376544-4c4201061e22"),
  img("photo-1593693411515-c20261bcad6e"),
  img("photo-1601979031925-424e53b6caaa"),
  img("photo-1602216056096-3b40cc0c9944"),
  img("photo-1603565816030-6b389eeb23cb"),
];

const ROWS = 4;
const COLUMNS = Math.floor(HERO_IMAGES.length / ROWS);

/**
 * Per-column depth, in px along the plane's z axis. The array length must stay
 * equal to COLUMNS: the track is the column list twice over, so a depth pattern
 * that does not repeat exactly every COLUMNS entries would make the seam at the
 * -50% loop point jump forward or back in space.
 *
 * Kept under ±30px on purpose. At the wrapper's 1500px perspective that is
 * roughly a 2% size difference — enough to read as depth, small enough that the
 * nearer columns do not swell over the gutters and close the gaps.
 */
const COLUMN_DEPTHS = [0, 28, -22, 12, -30, 20, -12, 24];

/** Column-major, so each column is a vertical strip of 4 photos. */
const IMAGE_COLUMNS: string[][] = Array.from({ length: COLUMNS }, (_, column) =>
  Array.from(
    { length: ROWS },
    (_, row) => HERO_IMAGES[(column * ROWS + row) % HERO_IMAGES.length],
  ),
);

/**
 * The marquee translates the track by -50%, so the track is the column list
 * twice over. The gap between columns is a right MARGIN, not flex `gap`:
 * `gap` puts n-1 gaps in a track of 2n columns, which leaves the halves
 * unequal and makes the loop stutter once per pass. A margin gives every
 * column the same width + gap, so -50% lands exactly one set along.
 */
const MARQUEE_TRACK = [...IMAGE_COLUMNS, ...IMAGE_COLUMNS];

/** Seconds for one full pass of the doubled track. Slow on purpose. */
const MARQUEE_DURATION = 110;

export default function ExperienceHubHero({
  experiences,
}: {
  experiences: Experience[];
}) {
  const chips = experiences.slice(0, 6);

  return (
    <section
      aria-label="Kashmir experiences and activities"
      className="relative isolate mt-[70px] h-[calc(100svh-70px)] overflow-hidden bg-slate-200"
    >
      {/* ── Background: photo grid on a tilted 3D plane ────────────────────
          Three nested jobs, deliberately not collapsed into one element:
            wrapper  — owns `perspective`, which only ever applies to a node's
                       direct children, so it cannot live on the plane itself.
            .hero-plane-3d — the tilt and the slow sway (see globals.css).
                       Oversized via inset-[-28%] because a rotated rectangle no
                       longer covers the box it started in; the overhang is what
                       keeps photos, not slate, at the edges of the screen.
            .animate-marquee — the travel. Being a child of the tilted plane is
                       the whole trick: it slides along the plane, toward the
                       vanishing point, instead of across the front of it.
          The section's own overflow-hidden does the clipping. It sits OUTSIDE
          the perspective wrapper on purpose — an overflow clip on a preserve-3d
          ancestor flattens everything inside it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ perspective: "1500px" }}
      >
        <div className="hero-plane-3d absolute inset-[-28%]">
          <div
            // transform-3d so the per-column translateZ below is honoured
            // rather than flattened into the plane.
            className="animate-marquee transform-3d flex h-full w-max"
            style={
              { "--marquee-duration": `${MARQUEE_DURATION}s` } as CSSProperties
            }
          >
            {MARQUEE_TRACK.map((column, columnIndex) => (
              <div
                key={columnIndex}
                className="mr-3 flex h-full w-[68vw] shrink-0 flex-col gap-3 sm:w-[46vw] md:w-[36vw] lg:w-[30vw]"
                style={{
                  transform: `translateZ(${
                    COLUMN_DEPTHS[columnIndex % COLUMN_DEPTHS.length]
                  }px)`,
                }}
              >
                {column.map((src, rowIndex) => (
                  <div
                    key={`${columnIndex}-${rowIndex}`}
                    className="relative flex-1 overflow-hidden rounded-2xl bg-slate-300 sm:rounded-3xl"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 68vw, (max-width: 1024px) 40vw, 30vw"
                      // A flat black scrim over photos this size reads as mud;
                      // nudging saturation and contrast up first means the
                      // backdrop can darken them without draining them.
                      className="object-cover saturate-[1.15] contrast-[1.05]"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Legibility scrim ──────────────────────────────────────────────
          Radial rather than flat: heaviest behind the centred copy, lightest at
          the corners, so the photos stay photos out at the edges. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_105%_at_50%_45%,rgba(2,6,23,0.80)_0%,rgba(2,6,23,0.64)_38%,rgba(2,6,23,0.36)_70%,rgba(2,6,23,0.16)_100%)]"
      />

      {/* ── Bottom fade into the white page below. Short by design — it hands
             off to <ExperienceIntro /> without climbing up into the grid. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-white via-white/80 to-transparent sm:h-28"
      />

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-4 pt-5 pb-10 sm:px-6 lg:px-8">
        {/* Left-aligned, unlike everything below it. Breadcrumbs are wayfinding,
            not part of the headline block. The arbitrary variants re-tint the
            shared component for a dark background — its own slate greys are
            invisible here. */}
        <Breadcrumbs
          items={[{ label: "Experiences" }]}
          className="shrink-0 text-white/60 [&_a:hover]:text-white [&_a]:text-white/80 [&_[aria-current]]:text-sky-300"
        />

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-white/90 uppercase backdrop-blur-sm sm:text-xs">
            <MapPin className="h-3.5 w-3.5" />
            Kashmir valley
          </p>

          <h1 className="mt-5 max-w-4xl font-heading text-3xl leading-tight font-bold text-white drop-shadow-[0_2px_18px_rgba(2,6,23,0.55)] sm:text-4xl lg:text-5xl">
            Things to do in Kashmir, and when each one is worth doing
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base sm:leading-7">
            Shikara rides, the Gulmarg Gondola, skiing, trekking, rafting,
            paragliding, camping, angling and golf — with the season each one
            actually runs in, how long it takes, and who it suits.
          </p>

          {/* Stacked and full-width on mobile: two pill buttons side by side at
              that width squeeze their labels onto two lines each. */}
          <div className="mt-7 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
            <Link
              href="/contact/"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-900/30 transition-transform hover:-translate-y-0.5"
            >
              Plan my trip
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="#all-experiences"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-white/20"
            >
              Browse all activities
            </Link>
          </div>

          {/* Uses the list the page already loads, so the hero says what is
              actually below it rather than a hardcoded boast. */}
          <ul className="mt-7 hidden flex-wrap justify-center gap-2 sm:flex">
            {chips.map((experience) => (
              <li
                key={experience.slug}
                className="rounded-full border border-white/15 bg-slate-900/30 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm"
              >
                {experience.shortName}
              </li>
            ))}
            {experiences.length > chips.length && (
              <li className="rounded-full border border-white/15 bg-slate-900/30 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
                +{experiences.length - chips.length} more
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
