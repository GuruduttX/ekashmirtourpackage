import Image from "next/image";
import { CalendarRange, Clock, MapPin, Ticket } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FestivalOrnament from "@/components/festivals/FestivalOrnament";
import type { Festival } from "@/data/festivals";

/**
 * /festivals/[slug] hero — the SOP §2.6 answer-first block on white, with the
 * festival photograph beside it.
 *
 * LIGHT, AND WITH NO BACKGROUND ARTWORK. The section is plain white and the
 * ONLY image in it is the festival's own photograph, in the right-hand column.
 * That is deliberate on two counts. A photo behind text has to be darkened to
 * keep the text legible, which is what made this section a black band before;
 * beside the text it needs no wash and is seen at full colour. And there is no
 * decorative plate underneath competing with it, so the one image on screen is
 * the one the CMS supplies for this festival.
 *
 * Consequences worth knowing before changing it:
 *   • Text is slate on white — no drop-shadows, no white-on-photo contrast to
 *     maintain, and no scrim behind the copy.
 *   • The section already ends on white, so it seams into the body below with
 *     no fade or rule needed.
 *
 * OWNS THE H1 AND THE BREADCRUMBS, and therefore the BreadcrumbList JSON-LD,
 * which the page emits nowhere else. Whatever replaces this has to keep both.
 *
 * A SERVER COMPONENT ON PURPOSE. The festival photo is the page's LCP element,
 * so nothing here drags a client bundle in ahead of it — no state, no lightbox,
 * no share button. The interactive gallery sits further down the page where its
 * JS is off the critical path.
 *
 * THE DATE CHIP IS PROSE, NEVER A DATE. `dates.window` describes the pattern
 * the festival reliably falls in; exact dates exist only once verified on the
 * ground, and the caveat line under the chips reads from the same
 * `datesVerified` flag that gates the Event schema. The two are wired to one
 * boolean so the visible text can never disagree with what Google is told. See
 * the header of src/data/festivals.ts.
 */
export default function FestivalDetailHero({
  festival,
}: {
  festival: Festival;
}) {
  const chips = [
    { id: "when", icon: CalendarRange, value: festival.dates.window },
    { id: "duration", icon: Clock, value: festival.dates.duration },
    { id: "where", icon: MapPin, value: festival.venue },
    { id: "entry", icon: Ticket, value: festival.entry },
  ];

  return (
    // pt clears the fixed navbar. Plain white — the only image in this section
    // is the festival's own photograph in the right-hand column.
    <section className="bg-white pt-24">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Festivals", href: "/festivals/" },
            { label: festival.shortName },
          ]}
          className="justify-center md:justify-start"
        />

        <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1fr_minmax(0,460px)] lg:gap-10">
          {/* ---------- copy column ---------- */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {festival.name}
            </h1>

            <FestivalOrnament
              tone="dark"
              className="mt-4 max-w-xs md:mx-0 md:max-w-sm"
            />

            {/* SOP §2.6 answer-first block — 40–60 words, above everything else,
                so the page answers "what, when, should I plan around it" before
                a reader or an answer engine has to scroll. */}
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
              {festival.quickAnswer}
            </p>

            <ul className="mt-6 flex flex-wrap justify-center gap-2.5 md:justify-start">
              {chips.map((chip) => {
                const Icon = chip.icon;

                return (
                  <li
                    key={chip.id}
                    className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/70 px-4 py-2 text-sm font-medium text-slate-700"
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-sky-500"
                    />
                    {chip.value}
                  </li>
                );
              })}
            </ul>

            {/* The honesty line. Same flag as the Event schema gate. */}
            <p className="mt-4 max-w-2xl text-xs leading-relaxed text-slate-500">
              {festival.datesVerified
                ? "Dates confirmed on the ground for this year."
                : "Typical window — this festival's dates move each year and are confirmed close to the time. We publish them here as soon as they are announced."}
            </p>
          </div>

          {/* ---------- photo card ----------
              The festival's own photograph — `image` / `imageAlt` on the
              record, so it comes from the CMS once festivals move to Mongo and
              nothing here changes.

              Second in the DOM so the H1 and the answer block are read first,
              which is also the order they should be crawled in. On lg it sits
              in the right-hand column beside the copy; below lg it falls under
              the chips, where a full-width photo is the right shape anyway. */}
          <figure className="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-slate-100 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5 lg:aspect-5/4">
            <Image
              src={festival.image}
              alt={festival.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 460px, 100vw"
              className="object-cover object-center"
            />

            {/* Season badge. The only thing overlaid on the photo, and it sits
                on a corner rather than across the frame — no wash needed. */}
            <figcaption className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
              <CalendarRange aria-hidden="true" className="h-3.5 w-3.5 text-sky-500" />
              {festival.dates.short}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
