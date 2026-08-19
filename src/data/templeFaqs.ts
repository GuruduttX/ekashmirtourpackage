/**
 * Hub-level FAQs for /temples/.
 *
 * SINGLE SOURCE for both the visible accordion and the FAQPage JSON-LD — same
 * rule as src/data/destinationFaqs.ts. Answers are plain strings, not HTML, so
 * what renders is byte-identical to what is emitted.
 *
 * Scope is deliberately hub-level: "can non-Hindus enter", "what do I wear",
 * "how many days for a pilgrimage circuit", "do I need a permit". Per-shrine
 * questions (Shankaracharya step count, Hazratbal relic display dates, this
 * year's Amarnath registration window) belong on the individual
 * /temples/[slug] pages, so the two don't compete for the same queries.
 *
 * No prices and no dated specifics here on purpose — Amarnath registration
 * dates, helicopter fares and darshan slots change every year, and the SOP
 * wants those stated only where they are verified and dated.
 */

import type { DestinationFaq } from "@/data/destinationFaqs";

/** Reuses the destination FAQ shape — same accordion, same schema builder. */
export type TempleFaq = DestinationFaq;

export const TEMPLE_FAQS: TempleFaq[] = [
  {
    id: "non-hindus-entry",
    question: "Can non-Hindus and foreign tourists visit Kashmir's temples?",
    answer:
      "Yes. Shankaracharya Temple, Kheer Bhawani and the other temples in the valley are open to visitors of every faith, and so are the shrines — Hazratbal, Charar-e-Sharief and Khanqah-e-Moula all receive non-Muslim visitors daily. The one common restriction at Muslim shrines is that the innermost chamber is reserved for men, with a separate women's section alongside; the courtyards and main halls are open to everyone.",
  },
  {
    id: "dress-code",
    question: "What should I wear when visiting temples and shrines in Kashmir?",
    answer:
      "Cover shoulders and knees at every religious site in the valley. For shrines, women should carry a scarf to cover the head before entering — most shrines keep spare scarves at the entrance if you forget. Footwear comes off before the inner sanctum everywhere, so shoes you can slip on and off save a lot of time. Leather items are best left in the car at temples.",
  },
  {
    id: "how-many-days",
    question: "How many days do I need for a Kashmir temple circuit?",
    answer:
      "Two days covers the Srinagar cluster comfortably — Shankaracharya, Hazratbal, Khanqah-e-Moula and Jamia Masjid are all within the city, and Kheer Bhawani at Tullamulla is about an hour out. Add a third day if you want Charar-e-Sharief on the way to or from Yusmarg. Amarnath is not part of this circuit; it is a separate multi-day yatra with its own season and registration.",
  },
  {
    id: "amarnath-season",
    question: "When does the Amarnath Yatra happen and how do I register?",
    answer:
      "The yatra runs for roughly two months in summer, usually from late June or early July to the Shravan Purnima full moon in August, and the exact dates are announced each year by the Shri Amarnathji Shrine Board. Registration is compulsory and opens months in advance through the Board and designated bank branches, and it requires a Compulsory Health Certificate from an authorised doctor. Because the dates and the quota shift every year, confirm them with us before you book flights.",
  },
  {
    id: "amarnath-routes",
    question: "Which Amarnath route should I take — Pahalgam or Baltal?",
    answer:
      "The Pahalgam route is the traditional one at roughly 46 km, walked over three to four days through Chandanwari, Sheshnag and Panchtarni, and it is the gentler climb. The Baltal route is about 14 km and can be done in a single long day, but it is far steeper and harder on the knees. Pony, palki and helicopter services operate on both. Choose Pahalgam if you have the days and want to acclimatise, Baltal if you are short on time and reasonably fit.",
  },
  {
    id: "timings",
    question: "What are the usual temple and shrine timings?",
    answer:
      "Most temples open around sunrise and close by sunset, with Shankaracharya's hill road shutting earlier in winter and in poor light. Shrines follow prayer times, and Hazratbal, Charar-e-Sharief and Jamia Masjid are busiest at Friday afternoon prayers — visit on another day or outside that window if you want a quieter walk-through. Timings shift with the season and with local advisories, so we confirm them the morning of your visit rather than promising a fixed slot.",
  },
  {
    id: "permits-security",
    question: "Do I need a permit, and what are the security checks like?",
    answer:
      "No permit is needed for any temple or shrine in the valley, and no separate permit for Kashmir itself. Shankaracharya Temple sits inside a security zone: phones and cameras are usually deposited at the base checkpoint before the drive up, and bags are screened. Carry a government photo ID everywhere. Amarnath is the exception that does require documentation — the yatra permit and health certificate described above.",
  },
  {
    id: "amarnath-elderly",
    question: "Can elderly parents or children join the Amarnath Yatra?",
    answer:
      "The Shrine Board sets age limits for the yatra each season — historically no one below around 13 or above around 70, and expectant mothers beyond six weeks are not permitted. Within those limits, the helicopter service to Panchtarni followed by a short pony ride makes the darshan realistic for older pilgrims who cannot manage the trek. For families travelling with young children, the Srinagar temple circuit and Kheer Bhawani are the better plan.",
  },
  {
    id: "combine-with-sightseeing",
    question: "Can I combine the temples with regular Kashmir sightseeing?",
    answer:
      "Easily, and most of our travellers do. Shankaracharya overlooks Dal Lake and pairs naturally with a shikara ride and the Mughal gardens on the same day. Hazratbal is on the Dal's northern bank, minutes from the gardens. Kheer Bhawani sits on the road towards Sonamarg, and Charar-e-Sharief is on the Yusmarg road, so both slot into a day you were already spending on that side of the valley.",
  },
  {
    id: "photography",
    question: "Is photography allowed inside temples and shrines?",
    answer:
      "It varies by site and it is the one rule worth asking about at the gate. Exteriors and courtyards are generally fine, inner sanctums usually are not. Shankaracharya normally does not allow cameras or phones past the security check at all. At shrines, avoid photographing people at prayer without asking first — it is the fastest way to cause offence at an otherwise welcoming place.",
  },
];
