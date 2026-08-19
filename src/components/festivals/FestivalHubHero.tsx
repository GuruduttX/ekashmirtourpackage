import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FestivalOrnament from "@/components/festivals/FestivalOrnament";

/**
 * Hero for /festivals/ — the Figma "Festivals of Kashmir" comp.
 *
 * THE CURVE IS PART OF THE PHOTO, NOT CSS.
 * public/festival/hero/festival-hero-image.webp is a transparent image whose
 * bottom edge is already cut to the scalloped sweep in the design — two long
 * arcs meeting in a point just left of centre. There is no clip-path, no mask
 * and no SVG here on purpose: a hand-rolled curve would never match the comp
 * exactly, and would drift the moment the artwork is re-exported. Swap the PNG
 * and the curve updates itself.
 *
 * What that means structurally: everything below the cut is TRANSPARENT, so
 * whatever this section is rendered on top of shows through it. That is the
 * pink blossom / pale sky that appears under the curve in the second Figma
 * screenshot — it is not part of this component. It belongs to the shared
 * background wrapper in the page, which spans this hero AND the "Explore
 * Kashmir Festivals" section below it so the two never seam. See
 * src/app/festivals/page.tsx.
 *
 * Geometry note for anyone changing the height: the curve occupies the bottom
 * ~23% of the artwork, and `object-cover` on this aspect ratio is always
 * height-driven, so that 23% holds at every viewport. Hence `bottom-[23%]` on
 * the content layer — it is what keeps the CTA clear of the sweep instead of
 * sitting in it. `object-bottom` matters too: it crops sky off the top on very
 * wide screens rather than shaving the curve off the bottom.
 *
 * Server component — nothing here needs state.
 */
export default function FestivalHubHero() {
  return (
    <section
      aria-label="Festivals of Kashmir"
      className="relative w-full h-[600px] sm:h-[680px] md:h-auto md:aspect-[1440/781] md:max-h-[880px]"
    >
      <Image
        src="/festival/hero/festival-hero-image.webp"
        alt="Dal Lake at dusk during a festival — decorated shikaras on the water, dancers in pheran and lit lanterns strung through blossom, with the snow line behind"
        fill
        priority
        sizes="100vw"
        className="object-cover object-bottom"
      />

      {/* Content sits in the region ABOVE the curve — see the geometry note. */}
      <div className="absolute inset-x-0 top-0 bottom-[23%] flex flex-col">
        <div className="mx-auto w-full max-w-7xl px-4 pt-24 sm:px-6 lg:px-8 lg:pt-28">
          {/* Not in the comp, but required by the SOP on every deep page — and
              this is the only place on /festivals that emits BreadcrumbList. */}
          <Breadcrumbs
            items={[{ label: "Festivals" }]}
            className="text-white/70 [&_a]:text-white/80 [&_a:hover]:text-white [&_[aria-current]]:text-sky-300"
          />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-4 pb-4 text-center sm:px-6">
          <h1 className="font-heading text-4xl leading-[1.05] font-bold tracking-wide text-white [font-variant:small-caps] drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-6xl xl:text-7xl">
            Festivals of <span className="text-sky-400">Kashmir</span>
          </h1>

          <FestivalOrnament tone="light" className="mt-5 max-w-2xl sm:mt-6" />

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)] sm:mt-6 sm:text-base md:text-lg md:leading-8">
            From timeless tradition to vibrant celebration, Kashmir&rsquo;s
            festivals reflect its rich heritage, its diverse culture, and the
            warmth of its people.
          </p>

          <Link
            href="/contact/"
            className="group mt-7 inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-sky-500 to-sky-400 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-900/30 transition-transform hover:-translate-y-0.5 sm:mt-8 sm:text-base"
          >
            Plan your Trip
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-5 sm:w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
