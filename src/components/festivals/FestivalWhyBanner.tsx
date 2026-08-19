import Image from "next/image";

/**
 * "Why explore Kashmir festivals" — the four-point banner under the card rail.
 *
 * ONE ROUNDED PANEL with the valley photograph inside it, not a full-bleed
 * band: the comp insets it from the page gutters and clips it to a large
 * radius, and that inset is what stops it from reading as a second hero.
 *
 * The four points are a <ul>, not four divs — it is a list of reasons, and a
 * screen reader announcing "list, 4 items" is the whole point of the section.
 *
 * ICONS ARE THE SUPPLIED ASSETS, unmodified: public/festival/hero/sub-icon-N.svg.
 * They are already white in the file, so there is no colour to set here — a
 * `text-white` on the wrapper would do nothing. They are also decorative, hence
 * empty alt: the heading under each one says the same thing in words.
 *
 * Server component — static content, no state.
 */

type Point = {
  icon: string;
  title: string;
  body: string;
};

// Copy sits here rather than in src/data because it describes the section, not
// the festivals — nothing else on the site needs it and it will never come
// from the CMS.
const POINTS: Point[] = [
  {
    icon: "/festival/hero/sub-icon-1.svg",
    title: "Authentic experiences",
    body: "Village fairs and shrine gatherings that run for the valley, not for visitors.",
  },
  {
    icon: "/festival/hero/sub-icon-2.svg",
    title: "Memorable moments",
    body: "A tulip garden in full bloom, a lantern-lit shikara parade, a saffron harvest at dawn.",
  },
  {
    icon: "/festival/hero/sub-icon-3.svg",
    title: "Photographic beauty",
    body: "Colour against snow — the one time of year the valley gives you both at once.",
  },
  {
    icon: "/festival/hero/sub-icon-4.svg",
    title: "Warm hospitality",
    body: "Kahwa pressed into your hands by people who are genuinely glad you came.",
  },
];

export default function FestivalWhyBanner() {
  return (
    <section
      aria-labelledby="why-festivals"
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-3xl">
        <Image
          src="/festival/hero/explore-banner-bg.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="object-cover object-center"
        />

        {/* The photo is bright through the middle where the copy sits. This is
            the difference between white text that reads and white text that
            disappears into the snow line — do not remove it. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-slate-900/25"
        />

        <div className="relative px-5 py-10 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center text-center">
            <h2
              id="why-festivals"
              className="font-heading text-xl font-bold tracking-wide text-white [font-variant:small-caps] drop-shadow-[0_1px_12px_rgba(15,23,42,0.5)] sm:text-2xl lg:text-3xl"
            >
              Why explore Kashmir festivals
            </h2>

            {/* The supplied flourish, between two hairlines — same construction
                as <FestivalOrnament /> but with the comp's own artwork in the
                middle instead of the drawn rosette. */}
            <div
              aria-hidden="true"
              className="mt-3 flex w-full max-w-md items-center justify-center gap-3 sm:gap-4"
            >
              <span className="h-px flex-1 bg-linear-to-r from-transparent to-white/70" />
              <Image
                src="/festival/hero/explore-banner-icon.svg"
                alt=""
                width={47}
                height={32}
                className="h-6 w-auto shrink-0 sm:h-8"
              />
              <span className="h-px flex-1 bg-linear-to-l from-transparent to-white/70" />
            </div>
          </div>

          {/* Two up on phones, four across from sm — the comp's single row is
              far too narrow for four columns of prose on a small screen. */}
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 lg:mt-10">
            {POINTS.map((point) => (
              <li
                key={point.title}
                className="flex flex-col items-center text-center"
              >
                {/* The frosted disc. backdrop-blur over a photo is what makes
                    it read as glass rather than a flat grey circle. */}
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-sm sm:h-20 sm:w-20">
                  <Image
                    src={point.icon}
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 sm:h-7 sm:w-7"
                  />
                </span>

                <h3 className="mt-4 text-base font-medium text-white drop-shadow-[0_1px_10px_rgba(15,23,42,0.6)] sm:text-lg">
                  {point.title}
                </h3>

                <p className="mt-1.5 max-w-[22ch] text-sm leading-relaxed text-white/85 drop-shadow-[0_1px_10px_rgba(15,23,42,0.6)]">
                  {point.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
