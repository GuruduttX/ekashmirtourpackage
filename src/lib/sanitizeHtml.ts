import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitises rich text that came out of the CMS before it is handed to
 * `dangerouslySetInnerHTML`.
 *
 * `isomorphic-dompurify` (not plain `dompurify`) so this runs during server
 * rendering too — CMS prose on MONEY pages has to be in the initial HTML for
 * crawlers, which rules out sanitising in a client component.
 *
 * The allowlist matches what the Tiptap editor can actually produce. Anything
 * else — script/style/iframe, event handlers, `javascript:` URLs — is dropped.
 */
const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "h2",
  "h3",
  "h4",
  "ul",
  "ol",
  "li",
  "a",
  "blockquote",
  "hr",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "figure",
  "figcaption",
  "img",
  "span",
];

const ALLOWED_ATTR = ["href", "target", "rel", "src", "alt", "title", "colspan", "rowspan"];

export function sanitizeHtml(html: string): string {
  if (!html) return "";

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    // Only web-safe link schemes; blocks javascript:/data: payloads.
    ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|tel:|\/|#)/i,
    ADD_ATTR: ["target"],
  });
}
