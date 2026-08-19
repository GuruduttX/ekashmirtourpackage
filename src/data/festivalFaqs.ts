/**
 * Hub-level FAQs for /festivals/.
 *
 * SINGLE SOURCE for both the visible accordion and the FAQPage JSON-LD — same
 * rule as src/data/experienceFaqs.ts. Answers are plain strings, not HTML, so
 * what renders is byte-identical to what is emitted.
 *
 * Scope is deliberately hub-level: "what's on when I visit", "which one is
 * worth planning around", "do I need to book ahead", "can non-locals attend".
 * Festival-specific questions (Amarnath registration steps, the tulip garden's
 * ticket price, urs dates for a given shrine) belong on the individual
 * /festivals/[slug]/ pages, so the two don't compete for the same queries.
 *
 * NO EXACT DATES HERE. Six of the eight festivals move every year — see the
 * header of src/data/festivals.ts. Answers state windows, never a date that
 * will be wrong by next season.
 */

import type { FestivalFaq } from "@/data/festivals";

export const FESTIVAL_FAQS: FestivalFaq[] = [
  {
    id: "which-festival-worth-planning-around",
    question: "Which Kashmir festival is actually worth planning a trip around?",
    answer:
      "The Tulip Festival, without much competition. It is the one occasion that changes what you see rather than adding an event to it — a million bulbs in bloom below the Zabarwan hills, for about three weeks in late March and early April. After that, the Amarnath Yatra if you are going for the pilgrimage itself, and the Saffron Festival if you want the Pampore fields in purple. The rest are worth catching if your dates happen to line up, not worth moving your dates for.",
  },
  {
    id: "why-no-exact-dates",
    question: "Why don't you list exact festival dates?",
    answer:
      "Because most of them genuinely do not have one until close to the day. The tulip garden announces its opening only once the bloom starts, the Amarnath Yatra dates are set by the Shrine Board each year, and every Islamic observance follows the lunar calendar and moves about eleven days earlier annually. We publish the window each festival reliably falls in, and add confirmed dates on the individual pages once they are announced — rather than print a date that will quietly be wrong.",
  },
  {
    id: "whats-on-when-i-visit",
    question: "What is on in Kashmir in the month I'm visiting?",
    answer:
      "Roughly: December to February brings the Gulmarg Winter Festival at the peak of the ski season. Late March into mid April is the Tulip Festival, with Navroz around 20–21 March. May or June brings the Kheer Bhawani Mela. July and August carry the Amarnath Yatra and the Shikara Festival on Dal Lake. Late October into November is the saffron harvest at Pampore. Eid and the Sufi urs gatherings move through the calendar and can fall in any of those months.",
  },
  {
    id: "can-visitors-attend",
    question: "Can non-locals and non-Muslims attend Kashmiri festivals?",
    answer:
      "Yes, at all of them. The shrine urs gatherings, the Kheer Bhawani Mela, the Shikara Festival and the tulip garden are all open to any visitor. The etiquette is simple: cover your head at shrines and mosques, dress modestly, take your shoes off where others do, and ask before photographing people at prayer. Kashmiris are, in our experience, more likely to hand you tea than to mind you being there.",
  },
  {
    id: "book-ahead",
    question: "How far ahead should I book for a festival window?",
    answer:
      "For the Tulip Festival, six to eight weeks. It is the sharpest demand spike of the Kashmir year and Srinagar hotels, houseboats and cabs all price up and sell out. For the Amarnath Yatra, register as soon as the Shrine Board opens registration — the daily quota fills. For everything else, normal lead time is fine; the Shikara Festival, the mela and the urs gatherings draw local crowds rather than out-of-state ones and do not move the room rate.",
  },
  {
    id: "festival-crowds",
    question: "Do the festivals make Kashmir too crowded to enjoy?",
    answer:
      "Only two of them do. The tulip garden in peak bloom is genuinely busy — go at opening, around 9 AM, and you get the beds nearly to yourself for an hour. The Amarnath routes are crowded by design, with a daily quota and queues on the trail. The Shikara Festival, the mela and the urs gatherings are busy for a day in one specific place, and the rest of the valley carries on as normal — you can attend in the morning and be in Gulmarg by afternoon.",
  },
];
