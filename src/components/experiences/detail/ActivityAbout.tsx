import RichText from "@/components/ui/RichText";

/**
 * "About the activity" — the CMS rich-text body of an activity page.
 *
 * This is the page's main prose block and the part an editor will write most
 * of, so it takes raw HTML from the CMS rather than a fixed set of fields. It
 * is sanitised and rendered server-side inside RichText; see that component for
 * why the boundary sits there.
 *
 * Clamped to a fixed height behind a Read more / Read less toggle, so a long
 * body does not push the rest of the page (and the sticky enquiry rail beside
 * it) far down the screen. The clamp is `max-height` only — the full prose is
 * always in the server HTML, so crawlers and answer engines see all of it
 * regardless of the toggle.
 *
 * Returns null on empty input, so an unwritten record simply skips the section.
 */
export default function ActivityAbout({
  html,
  title,
  heading = "About",
}: {
  /** Raw CMS HTML. Passed through untouched — RichText sanitises. */
  html?: string;
  /** Activity title, used to complete the heading. */
  title: string;
  /** Leading word of the heading; the title is the accented half. */
  heading?: string;
}) {
  if (!html?.trim()) return null;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
    >
      <h2
        id="about-heading"
        className="text-center font-heading text-xl font-bold text-slate-900 sm:text-2xl md:text-left"
      >
        {heading} <span className="text-sky-500">{title}</span>
      </h2>

      <RichText html={html} className="mt-5" collapsible />
    </section>
  );
}
