/**
 * Hub-level FAQs for /experiences/.
 *
 * SINGLE SOURCE for both the visible accordion and the FAQPage JSON-LD — same
 * rule as src/data/destinationFaqs.ts. Answers are plain strings, not HTML, so
 * what renders is byte-identical to what is emitted.
 *
 * Scope is deliberately hub-level: "which activities are worth it", "what can
 * kids/elders do", "when does what run", "do I book ahead". Activity-specific
 * questions (Gondola Phase 2 closures, Lidder rafting grades, angling permits)
 * belong on the individual /experiences/[activity]/ pages, so the two don't
 * compete for the same queries.
 *
 * No prices here on purpose — rates drift, and the SOP wants them stated only
 * where they are verified and dated.
 */

import type { DestinationFaq } from "@/data/destinationFaqs";

/** Reuses the destination FAQ shape — same accordion, same schema builder. */
export type ExperienceFaq = DestinationFaq;

export const EXPERIENCE_FAQS: ExperienceFaq[] = [
  {
    id: "which-experiences-worth-it",
    question: "Which Kashmir experiences are actually worth doing?",
    answer:
      "If you only do three, make them a sunset shikara ride on Dal Lake, the Gulmarg Gondola, and a walk or pony ride in the Pahalgam valleys. Those three are what most people picture when they picture Kashmir, they need no fitness, and they run in almost every season. Everything else — skiing, rafting, trekking, paragliding — is worth adding when the season and your appetite line up.",
  },
  {
    id: "what-runs-when",
    question: "Which activities run in which season?",
    answer:
      "Shikara rides and Gondola Phase 1 run year round. Skiing is December to March, with the deepest snow in January and February. Rafting, trekking, camping, angling and golf are broadly April to September, with the high trek routes open only from June to September. Gondola Phase 2 and paragliding are called on the day, because both depend on weather rather than the calendar.",
  },
  {
    id: "families-and-elders",
    question: "What can families with young kids or elderly parents do?",
    answer:
      "Shikara rides, Gondola Phase 1, the Mughal gardens, Betaab and Aru valley drives, and golf are all low-exertion and involve no climbing. The short rafting stretch on the Lidder takes children with a guide. What to think twice about is Gondola Phase 2, which puts you at around 3,980 m where breathlessness is common, and any trek longer than a couple of hours.",
  },
  {
    id: "book-in-advance",
    question: "Do I need to book Kashmir activities in advance?",
    answer:
      "The Gondola is the one to book ahead — tickets are sold online and the on-site counter queue in peak season can cost you a morning. Angling permits are also limited and worth arranging before you travel. Shikara rides, pony rides and ski rental are all arranged on the spot, and rafting is usually walk-up outside the busiest weeks.",
  },
  {
    id: "included-in-package",
    question: "Are these experiences included in a Kashmir tour package?",
    answer:
      "Sightseeing, transfers and entry to the gardens are normally included. Ticketed activities are usually not — the Gondola, shikara hours beyond the first, pony rides, ski rental, rafting and paragliding are typically paid on the ground. Any honest quote will name these as exclusions rather than hide them, and we list them line by line before you pay anything.",
  },
  {
    id: "how-many-days",
    question: "How many days do I need to fit the main experiences in?",
    answer:
      "Six days and five nights is enough for the shikara, the Gondola, a Pahalgam valley day and a Srinagar sightseeing day without rushing. Add a day if you want to ski or raft, because both eat a full morning. Eight days lets you add Sonamarg and still keep a spare day for the weather to turn, which in Kashmir it will.",
  },
  {
    id: "safety",
    question: "Are adventure activities in Kashmir safe?",
    answer:
      "The organised ones are run to a standard: rafting operators supply helmets and life jackets with a guide in every raft, paragliding is tandem-only with certified pilots, and ski instruction on the Kongdoori slopes is taught from zero. The real risks are altitude on Apharwat, cold snowmelt water, and weather that changes fast on the high trek routes — all of which are managed by going with a guide rather than alone.",
  },
];
