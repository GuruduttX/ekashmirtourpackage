import FestivalRail from "@/components/festivals/FestivalRail";
import FestivalOrnament from "@/components/festivals/FestivalOrnament";
import type { Festival } from "@/data/festivals";

/**
 * "Explore Kashmir Festivals" — the card grid under the hero.
 *
 * NO BACKGROUND OF ITS OWN, on purpose. It sits on the shared blossom plate
 * that the page wraps around this and the hero together, which is what lets the
 * hero's transparent curve reveal the top of the same image with no seam. Give
 * this section its own background and you break that join — see the wrapper
 * comment in src/app/festivals/page.tsx.
 *
 * Four across on desktop, matching the comp — with eight festivals that lands
 * as two clean rows. Below lg it is a horizontal snap rail instead of a stack.
 *
 * The list arrives as a prop rather than being imported here, so this component
 * does not care whether the records came from the static file or from Mongo
 * once festivals move to the CMS.
 */
export default function FestivalExplore({
  festivals,
}: {
  festivals: Festival[];
}) {
  return (
    <section
      aria-labelledby="explore-festivals"
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col items-center text-center">
        <p className="text-sm text-slate-600 sm:text-base">
          The colours of Kashmir
        </p>

        <h2
          id="explore-festivals"
          className="mt-2 font-heading text-2xl font-bold tracking-wide text-slate-900 [font-variant:small-caps] sm:text-3xl lg:text-4xl"
        >
          Explore <span className="text-sky-500">Kashmir Festivals</span>
        </h2>

        <FestivalOrnament tone="dark" className="mt-3 max-w-md sm:mt-4" />
      </div>

      {/* The rail and its dot indicator live in a client component — the dots
          read a scroll position, which does not exist on the server. This
          section stays server-rendered around it. */}
      <FestivalRail festivals={festivals} />
    </section>
  );
}
