/**
 * Moved to src/lib/whatsapp.ts once the WhatsApp number became app-wide rather
 * than a home-CTA concern. Re-exported here so the existing import path keeps
 * working; prefer importing from "@/lib/whatsapp" in new code.
 */
export { whatsappLink, WHATSAPP_NUMBER, WHATSAPP_TEL } from "@/lib/whatsapp";
