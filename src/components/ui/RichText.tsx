import CollapsibleRichTextBody from "@/components/ui/CollapsibleRichTextBody";
import { sanitizeHtml } from "@/lib/sanitizeHtml";

/**
 * Renders a rich-text HTML string from the CMS.
 *
 * The HTML comes out of the Tiptap editor, so it goes through
 * `dangerouslySetInnerHTML` and MUST be sanitised first. That happens here, in
 * a server component, for two reasons: nothing unsafe ever crosses into the
 * client bundle, and the prose ships in the initial server HTML, which is
 * required for anything crawlable (SOP: no JS-only critical content).
 *
 * Callers pass the RAW string. Do not sanitise before calling — double
 * sanitising is harmless but it hides where the boundary actually is, and the
 * one thing that must never happen is a caller assuming someone else did it.
 *
 * Element styling uses Tailwind child selectors rather than a global stylesheet
 * or the typography plugin, matching StayOverviewSection. The list lives in
 * RICH_TEXT_CLASSES so every CMS body on the site renders identically.
 */

/**
 * Shared prose styling for CMS bodies.
 *
 * Covers exactly the tags sanitizeHtml allows through — if a tag is added to
 * that allowlist, it needs a rule here too, or it will render unstyled.
 */
export const RICH_TEXT_CLASSES = [
  "text-[0.98rem] leading-7 text-slate-600",
  // Block spacing
  "[&>*+*]:mt-4",
  // Headings
  "[&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 sm:[&_h2]:text-2xl [&_h2]:mt-8",
  "[&_h3]:font-heading [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:mt-6",
  "[&_h4]:font-semibold [&_h4]:text-slate-900 [&_h4]:mt-5",
  // Inline
  "[&_strong]:font-semibold [&_strong]:text-slate-900",
  "[&_a]:font-medium [&_a]:text-sky-600 [&_a]:underline [&_a]:decoration-sky-300 [&_a]:underline-offset-2 hover:[&_a]:text-sky-700",
  // Lists
  "[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5 [&_li]:mt-2 [&_li::marker]:text-sky-500",
  // Quote
  "[&_blockquote]:rounded-2xl [&_blockquote]:border [&_blockquote]:border-sky-100 [&_blockquote]:bg-sky-50/70 [&_blockquote]:p-5 [&_blockquote]:text-slate-700",
  // Media + rules
  "[&_img]:w-full [&_img]:rounded-2xl [&_img]:border [&_img]:border-slate-200",
  "[&_figcaption]:mt-2 [&_figcaption]:text-center [&_figcaption]:text-xs [&_figcaption]:text-slate-400",
  "[&_hr]:my-8 [&_hr]:border-slate-200",
  // Tables scroll inside their own box rather than widening the page.
  "[&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_table]:border-collapse",
  "[&_th]:border-b [&_th]:border-slate-200 [&_th]:bg-sky-50/60 [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-semibold [&_th]:text-slate-900",
  "[&_td]:border-b [&_td]:border-slate-100 [&_td]:px-4 [&_td]:py-2.5",
].join(" ");

export default function RichText({
  html,
  className = "",
  collapsible = false,
  clampClasses,
}: {
  /** Raw CMS HTML. Sanitised here — see above. */
  html: string;
  /** Extra classes, appended after the shared prose styling. */
  className?: string;
  /**
   * Clamps the body to a fixed height behind a Read more / Read less toggle.
   *
   * Sanitising still happens HERE, on the server; only the already-safe string
   * is handed to the client component that owns the toggle. The prose is
   * clamped with max-height, never unmounted, so the full text stays in the
   * server HTML either way.
   */
  collapsible?: boolean;
  /** Clamp height while collapsed. Ignored unless `collapsible`. */
  clampClasses?: string;
}) {
  const safe = sanitizeHtml(html);

  // Empty or all-markup input renders nothing rather than an empty styled box.
  if (!safe.trim()) return null;

  const classes = `${RICH_TEXT_CLASSES} ${className}`.trim();

  if (collapsible) {
    return (
      <CollapsibleRichTextBody
        html={safe}
        className={classes}
        clampClasses={clampClasses}
      />
    );
  }

  return <div className={classes} dangerouslySetInnerHTML={{ __html: safe }} />;
}
