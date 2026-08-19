import Image from "next/image";
import Link from "next/link";
import { MountainSnow } from "lucide-react";

/**
 * /experiences/ intro — SOP §2.9 answer-first block.
 *
 * Two-up on desktop: the illustration runs off the left edge of the viewport,
 * copy sits on the right. On mobile the order flips to copy-then-image, and the
 * heading, paragraph and button all centre — a left-aligned block under a
 * full-width illustration reads as an orphaned caption on a narrow screen.
 *
 * <h2>, not <h1>: the hub's H1 belongs to the hero above (SOP §2.9), and this
 * page must have exactly one. If this block ever replaces the hero, the heading
 * has to be promoted and the hero's Breadcrumbs brought along with it — they
 * are what emits the BreadcrumbList JSON-LD.
 *
 * Server component: nothing here needs state, and the SOP requires critical
 * content to be server-rendered.
 */
export default function ExperienceIntro() {
  return (
    <section
      aria-labelledby="experiences-intro-heading"
      className="overflow-x-clip bg-white py-10"
    >
      {/* flex-col-reverse is what puts the copy above the image on mobile while
          keeping the image first in the DOM — so the desktop grid needs no
          order juggling, and the reading order stays copy-first for AT on the
          narrow layout where it visually leads. */}
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-8 px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8">
        <div className="relative aspect-1325/784 w-full">
          <Image
            src="/experiences/exp-comp-2.webp"
            alt="Illustrated Kashmir scene — a carved wooden houseboat on a river below snow-capped peaks, framed by pines and spring wildflowers"
            fill
            // Half the viewport from lg up, full width below it.
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            className="object-contain object-left"
          />
        </div>

        {/* Centred on mobile, left-aligned once the illustration moves beside it. */}
        <div className="w-full text-center lg:text-left">
          <h2
            id="experiences-intro-heading"
            className="font-heading text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-4xl"
          >
            {/* Inline-flex keeps the icon locked to the first word so it can
                never wrap onto a line of its own. */}
            <span className="inline-flex items-center gap-3">
              <MountainSnow
                aria-hidden="true"
                className="h-6 w-6 shrink-0 text-sky-500 sm:h-7 sm:w-7 lg:h-9 lg:w-9"
              />
              Kashmir
            </span>{" "}
            <span className="text-sky-500">experiences &amp; Adventures</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base md:leading-7 lg:mx-0 lg:max-w-2xl">
            Kashmir offers an incredible blend of tranquil leisure and
            high-octane adventure across its world-famous valleys, lakes, and
            snow-capped peaks. Whether you are visiting during the vibrant
            summer bloom or the powdery winter season, the region caters
            perfectly to luxury vacationers, cultural explorers, and adrenaline
            seekers alike.
          </p>

          <div className="mt-7 flex justify-center lg:justify-start">
            {/* Anchors to the activity grid rather than leaving the page — the
                reader has just been told what is here, so "Explore Now" should
                show them, not send them to a form. */}
            <Link
              href="#all-experiences"
              className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-sky-400 to-sky-500 px-9 py-3.5 text-base font-semibold text-white shadow-lg shadow-sky-500/25 transition-transform hover:-translate-y-0.5"
            >
              Explore Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
