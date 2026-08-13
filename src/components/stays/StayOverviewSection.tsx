import StayOverviewBody from "@/components/stays/StayOverviewBody";
import { sanitizeHtml } from "@/lib/sanitizeHtml";

/**
 * Overview — the CMS rich-text body of a stay page.
 *
 * The HTML comes from the Tiptap editor, so it is rendered with
 * `dangerouslySetInnerHTML` and must be sanitised first (see sanitizeHtml).
 * Sanitising happens here, on the server, so the prose ships in the initial
 * HTML — this is the page's main body copy and has to be crawlable.
 *
 * Element styling uses Tailwind child selectors rather than a global
 * stylesheet, which keeps the component a server component (no styled-jsx).
 */
export default function StayOverviewSection({
  overview,
  title,
}: {
  overview: string;
  title: string;
}) {
  const html = sanitizeHtml(overview);
  if (!html.trim()) return null;

  return (
    <section id="overview" className="scroll-mt-24">
      <div className="text-center md:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
          Overview
        </p>

        <h2 className="mt-2 font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
          About {title}
        </h2>
      </div>

      <StayOverviewBody
        html={html}
        className={[
          "mt-5 text-[0.98rem] leading-7 text-slate-600",
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
          // Tables scroll inside their own box on small screens
          "[&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_table]:border-collapse",
          "[&_th]:border-b [&_th]:border-slate-200 [&_th]:bg-sky-50/60 [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-semibold [&_th]:text-slate-900",
          "[&_td]:border-b [&_td]:border-slate-100 [&_td]:px-4 [&_td]:py-2.5",
        ].join(" ")}
      />
    </section>
  );
}
