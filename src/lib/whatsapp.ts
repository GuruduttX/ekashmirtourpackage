/**
 * The one place the business WhatsApp number is resolved.
 *
 * Reads WHATSAPP_NUMBER from .env, which next.config.ts maps onto
 * NEXT_PUBLIC_WHATSAPP_NUMBER so the client bundles can see it — most of the
 * WhatsApp CTAs live in "use client" components, and a bare (unprefixed) env
 * var is server-only. The number is public information printed in visible
 * links, so putting it in the bundle exposes nothing that the rendered page
 * does not already show.
 *
 * NOTE: next.config's `env` inlines at BUILD time. Changing the number in .env
 * needs a rebuild, not just a server restart.
 */

/** India. The stored number is a bare 10-digit mobile, wa.me needs E.164 digits. */
const DEFAULT_COUNTRY_CODE = "91";

/**
 * Digits only, country code guaranteed.
 *
 * wa.me rejects spaces, "+" and dashes, so anything an editor might type into
 * .env is stripped. A 10-digit value is assumed to be a domestic mobile and
 * gets the country code prefixed; anything longer is assumed to already carry
 * one and is left alone.
 */
function normalize(value: string | undefined): string {
  const digits = (value ?? "").replace(/\D/g, "");
  if (!digits) return "";
  return digits.length === 10 ? `${DEFAULT_COUNTRY_CODE}${digits}` : digits;
}

/** E.164 digits, e.g. "9173xxxxxxxx". Empty string when unset. */
export const WHATSAPP_NUMBER = normalize(
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
);

/** `tel:` form, e.g. "+9173xxxxxxxx". Empty string when unset. */
export const WHATSAPP_TEL = WHATSAPP_NUMBER ? `+${WHATSAPP_NUMBER}` : "";

/**
 * Human-readable form for visible labels, e.g. "+91 73022 65809".
 *
 * Exists so a printed number and the tel: href beside it are the same string —
 * before this, the footer showed "(+91) 6272828" next to an href for a
 * different number, and neither could be dialled. Falls back to the raw digits
 * for any shape that is not a 12-digit +91 number.
 */
export const WHATSAPP_DISPLAY = (() => {
  if (!WHATSAPP_NUMBER) return "";
  const match = WHATSAPP_NUMBER.match(/^91(\d{5})(\d{5})$/);
  return match ? `+91 ${match[1]} ${match[2]}` : `+${WHATSAPP_NUMBER}`;
})();

const DEFAULT_MESSAGE = "Hi! I'd like to plan a Kashmir trip. Can you help?";

/**
 * Deep link to the business WhatsApp, with the message pre-filled.
 *
 * Falls back to /contact/ when WHATSAPP_NUMBER is unset rather than emitting
 * `wa.me/?text=…`, which renders as a live button that dead-ends on WhatsApp's
 * "invalid number" screen. A misconfigured env should cost the WhatsApp
 * channel, not the enquiry.
 */
export function whatsappLink(message: string = DEFAULT_MESSAGE): string {
  if (!WHATSAPP_NUMBER) return "/contact/";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
