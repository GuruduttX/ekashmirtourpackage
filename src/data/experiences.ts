/**
 * SOP A6 — EXPERIENCES & ACTIVITIES [HUB → money].
 *
 * Single source of truth for what /experiences/ lists. Same contract as
 * src/data/destinations.ts: only activities that will have a real
 * /experiences/[activity]/ page belong here, so the hub's ItemList never points
 * at a 404. This file becomes the CMS read-through when experiences move to
 * Mongo (see the internal-link-types roadmap).
 *
 * The nine entries below are exactly the SOP A6 cluster: Shikara · Gondola ·
 * skiing · trekking · rafting · paragliding · camping · angling · golf.
 *
 * DATA-HONESTY (SOP, non-negotiable): every rate here is an *example data
 * block* from the 2026 market, not a quoted price. Each one carries
 * `verify: true` so the UI can render the [VERIFY 2026-27] cue, and none of
 * them are emitted as schema.org Offers anywhere — an Offer is a machine-
 * readable price commitment, and these are not verified yet. Offers land on the
 * individual experience pages once Sartaj signs off the season's rates.
 */

import type { DestinationFaq } from "@/data/destinationFaqs";

/**
 * Card / hero photography. PLACEHOLDER stock, using the same helper pattern as
 * src/data/destinations.ts so the two files stay swappable. Replace with local
 * files under public/experiences/ when real on-ground photos land.
 */
const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1920&q=80`;

/**
 * How hard the activity actually is. Four levels, not a number — the honest
 * resolution is "anyone / most people / needs some fitness / needs training",
 * and a 1–10 score invites precision that does not exist.
 */
export type ExperienceDifficulty = "easy" | "moderate" | "challenging" | "expert";

/** Which persona (SOP A3) an activity is genuinely for. Drives the hub filter. */
export type ExperienceAudience =
  | "honeymoon"
  | "family"
  | "adventure"
  | "senior-friendly"
  | "photography";

export type Experience = {
  /** URL slug → /experiences/[slug]/ */
  slug: string;
  /** H1-grade name, e.g. "Gulmarg Gondola Ride". */
  name: string;
  /** Short label for chips and table cells, e.g. "Gondola". */
  shortName: string;
  /** Card copy — what the activity is, in one line. */
  summary: string;
  /**
   * SOP §2.9 answer-first block, 40–60 words. Answers "what is this and is it
   * for me" before the facts table.
   */
  quickAnswer: string;

  /* ---- SOP §2.9 facts table: location · duration · price-from · season · difficulty ---- */

  /** Where it happens, in reader terms — "Gulmarg", "Dal Lake, Srinagar". */
  location: string;
  /**
   * Destination slug this activity belongs to, for the SOP B3 "INTO
   * destination" link. Must resolve in src/data/destinations.ts.
   */
  destinationSlug: string;
  /** Time on the ground, e.g. "45–60 min", "2 days / 1 night". */
  duration: string;
  /**
   * Indicative rate, display string. [VERIFY 2026-27] — see the file header.
   * Ranges rather than single figures because these genuinely are ranges
   * (phase, season, vehicle, group size).
   */
  priceFrom: string;
  /** True while `priceFrom` is an unverified example figure. */
  verify: boolean;
  /** When it is actually runnable, e.g. "Dec–Mar (Phase 2 snow-dependent)". */
  season: string;
  difficulty: ExperienceDifficulty;
  /** One line on who this suits — the difficulty rating in plain words. */
  suitedFor: string;
  audiences: ExperienceAudience[];

  /* ---- media ---- */

  image: string;
  /** Must describe THIS photo, not the activity. Shipped verbatim. */
  imageAlt: string;

  /* ---- body blocks, filled as each detail page gets built ---- */

  /** SOP §2.9 "what to expect" — the walk-through, one paragraph per beat. */
  whatToExpect?: string[];
  /** SOP §2.9 booking / timing tips, e.g. "pre-book Gondola Phase 1 online". */
  bookingTips?: string[];
  /**
   * Sartaj's on-ground truths (SOP A4/A8 information gain). Each entry should
   * be specific and checkable — "carry warm clothes" is not a tip.
   */
  sartajTips?: string[];
  /**
   * Page-level FAQs. Scope to THIS activity — hub-level questions live in
   * src/data/experienceFaqs.ts and the two must not compete for the same
   * queries. Plain strings, because the page emits them verbatim as FAQPage.
   */
  faqs?: DestinationFaq[];
};

export const EXPERIENCES: Experience[] = [
  {
    slug: "shikara-ride",
    name: "Shikara Ride on Dal Lake",
    shortName: "Shikara",
    summary:
      "The hand-rowed lake ride every Kashmir trip opens with — floating gardens, houseboat rows and the Char Chinar island.",
    quickAnswer:
      "A shikara is a hand-rowed wooden boat, and an hour on Dal Lake is the single easiest thing to do in Srinagar. You pass houseboat rows, the floating vegetable gardens and Char Chinar island. It needs no fitness, no booking and no season — it runs year round, and sunset is the hour worth paying for.",
    location: "Dal Lake, Srinagar",
    destinationSlug: "srinagar",
    duration: "1–3 hours",
    priceFrom: "₹300–500 per hour, per boat",
    verify: true,
    season: "Year round; best at sunset, Apr–Oct",
    difficulty: "easy",
    suitedFor: "Anyone — no fitness needed, and the boat is boarded from a step",
    audiences: ["honeymoon", "family", "senior-friendly", "photography"],
    image: img("1566837945700-30057527ade0"),
    imageAlt:
      "Wooden shikara boats with canopied seats moored along the edge of Dal Lake",
  },
  {
    slug: "gondola-ride",
    name: "Gulmarg Gondola Ride",
    shortName: "Gondola",
    summary:
      "Asia's highest cable car, in two phases — Kongdoori meadow first, then Apharwat Peak at 3,980 m.",
    quickAnswer:
      "The Gulmarg Gondola climbs in two phases: Phase 1 to Kongdoori at about 3,080 m, Phase 2 on to Apharwat Peak at about 3,980 m. Phase 1 runs almost all year; Phase 2 is the snow and weather-dependent leg and closes without notice. Book online — the counter queue in season is the longest wait in Kashmir.",
    location: "Gulmarg",
    destinationSlug: "gulmarg",
    duration: "3–4 hours for both phases",
    priceFrom: "₹900–1,400 Phase 1; Phase 2 charged separately",
    verify: true,
    season: "Phase 1 year round; Phase 2 Dec–Apr, snow-dependent",
    difficulty: "easy",
    suitedFor:
      "Anyone, but Phase 2 is at altitude — skip it if breathlessness is a concern",
    audiences: ["family", "honeymoon", "senior-friendly", "photography"],
    image: img("1626621341517-bbf3d9990a23"),
    imageAlt: "Cable car cabin suspended over a snow-covered slope in Gulmarg",
  },
  {
    slug: "skiing",
    name: "Skiing in Gulmarg",
    shortName: "Skiing",
    summary:
      "Lift-served powder off Apharwat, plus beginner slopes at Kongdoori with instructors and rented kit.",
    quickAnswer:
      "Gulmarg is India's only serious ski mountain. Beginners learn on the gentle Kongdoori slopes with an instructor and rented kit; experienced skiers ride Gondola Phase 2 for the long Apharwat descents. Season runs roughly December to March, and January–February is when the snow is deepest and most reliable.",
    location: "Gulmarg — Kongdoori & Apharwat",
    destinationSlug: "gulmarg",
    duration: "Half day to a multi-day course",
    priceFrom: "Ski + boots rental from ₹500–1,000 a day; instructor extra",
    verify: true,
    season: "Dec–Mar; deepest snow Jan–Feb",
    difficulty: "moderate",
    suitedFor:
      "Complete beginners upwards — the Kongdoori slopes are taught from zero",
    audiences: ["adventure", "family"],
    image: img("1551524559-8af4e6624178"),
    imageAlt: "Skier carving down an open snow slope under a clear sky",
  },
  {
    slug: "trekking",
    name: "Trekking in Kashmir",
    shortName: "Trekking",
    summary:
      "From a two-hour meadow walk to the Kashmir Great Lakes — the valley's whole range of walking.",
    quickAnswer:
      "Kashmir's trekking runs from short meadow walks anyone can do — Baisaran above Pahalgam, the Yusmarg ridges — up to the multi-day Kashmir Great Lakes and Tarsar Marsar routes. The long routes are summer only, need a registered guide and permits, and are graded on sustained altitude rather than technical difficulty.",
    location: "Pahalgam, Sonamarg, Yusmarg & the high routes",
    destinationSlug: "pahalgam",
    duration: "2 hours to 7 days",
    priceFrom: "Day walks from ₹1,500; multi-day routes quoted per group",
    verify: true,
    season: "Jun–Sep for high routes; Apr–Oct for day walks",
    difficulty: "challenging",
    suitedFor:
      "Day walks suit most people; multi-day routes need real fitness and a guide",
    audiences: ["adventure", "photography"],
    image: img("1551632811-561732d1e306"),
    imageAlt: "Trekkers crossing an alpine meadow below bare rock ridges",
  },
  {
    slug: "river-rafting",
    name: "River Rafting on the Lidder",
    shortName: "Rafting",
    summary:
      "Grade II–III whitewater on the Lidder at Pahalgam, in stretches from 2 km to 8 km.",
    quickAnswer:
      "Rafting in Kashmir means the Lidder river at Pahalgam, run in graded stretches from a short 2 km family float to an 8 km Grade III section. Operators supply helmet, life jacket and a guide per raft. The water is snowmelt and genuinely cold — the run is short for a reason.",
    location: "Lidder river, Pahalgam",
    destinationSlug: "pahalgam",
    duration: "20 minutes to 1 hour on the water",
    priceFrom: "₹600–1,500 per person by stretch",
    verify: true,
    season: "Apr–Sep; highest water May–Jul",
    difficulty: "moderate",
    suitedFor:
      "Non-swimmers can raft the short stretch; the long run needs confidence in water",
    audiences: ["adventure", "family"],
    image: img("1530866495561-507c9faab2ed"),
    imageAlt: "Inflatable raft with paddlers running a stretch of white water",
  },
  {
    slug: "paragliding",
    name: "Paragliding in Kashmir",
    shortName: "Paragliding",
    summary:
      "Tandem flights over the Sanasar bowl and the Gulmarg meadows, with a certified pilot.",
    quickAnswer:
      "Paragliding here is tandem only — you are strapped to a certified pilot and the launch is a short downhill run, nothing more. Flights go from Sanasar and, in season, the Gulmarg meadows. Every flight is weather-called on the morning, so build it into a flexible day rather than a fixed one.",
    location: "Sanasar & Gulmarg",
    destinationSlug: "gulmarg",
    duration: "10–25 minutes airborne",
    priceFrom: "₹2,000–3,500 per tandem flight",
    verify: true,
    season: "Apr–Jun and Sep–Oct, weather permitting",
    difficulty: "moderate",
    suitedFor: "Anyone without vertigo or a heart condition; no experience needed",
    audiences: ["adventure", "photography"],
    image: img("1622163642998-1ea32b0bbc67"),
    imageAlt: "Paraglider canopy in flight above green hill slopes",
  },
  {
    slug: "camping",
    name: "Camping in Kashmir",
    shortName: "Camping",
    summary:
      "Riverside tents at Pahalgam and Sonamarg, from serviced glamping to high-meadow trek camps.",
    quickAnswer:
      "Camping splits into two things. Serviced camps at Pahalgam, Aru and Sonamarg give you a furnished tent, attached bath and meals — closer to a hotel than to camping. Trek camps on the Great Lakes routes are carried in and pitched on high meadows. Nights are cold even in July.",
    location: "Pahalgam, Aru, Sonamarg & the trek routes",
    destinationSlug: "sonamarg",
    duration: "1 night upwards",
    priceFrom: "Serviced camps from ₹2,500 per night; trek camps in the route price",
    verify: true,
    season: "May–Sep",
    difficulty: "moderate",
    suitedFor:
      "Serviced camps suit families; trek camps need the fitness of the route",
    audiences: ["adventure", "family", "honeymoon"],
    image: img("1504280390367-361c6d9f38f4"),
    imageAlt: "Dome tents pitched on grass beside a river with pine slopes behind",
  },
  {
    slug: "angling",
    name: "Trout Angling in Kashmir",
    shortName: "Angling",
    summary:
      "Permit-controlled brown and rainbow trout beats on the Lidder, Sind and Bringi rivers.",
    quickAnswer:
      "Kashmir's trout streams are run as numbered beats under the Fisheries Department — you buy a day permit for a specific beat and a daily catch limit, not open access. The Lidder at Pahalgam and the Sind at Sonamarg are the classic waters. Permits are limited and worth arranging before you travel.",
    location: "Lidder, Sind & Bringi rivers",
    destinationSlug: "pahalgam",
    duration: "Half day to full day per beat",
    priceFrom: "Day permit from ₹1,000–2,000 per rod; tackle hire extra",
    verify: true,
    season: "Apr–Sep (official angling season)",
    difficulty: "easy",
    suitedFor: "Anyone patient; a ghillie can be hired if you have never cast",
    audiences: ["senior-friendly", "adventure"],
    image: img("1445307806294-bff7f67ff225"),
    imageAlt: "Angler casting a fly line into a shallow, fast-running mountain river",
  },
  {
    slug: "golf",
    name: "Golf in Kashmir",
    shortName: "Golf",
    summary:
      "Gulmarg's high-altitude 18 holes plus the Royal Springs course on the edge of Dal Lake.",
    quickAnswer:
      "Kashmir has two courses worth the trip: Gulmarg Golf Course, one of the highest 18-hole greens in the world at about 2,650 m, and Royal Springs in Srinagar, laid out along Dal Lake. Both take visitor green fees, hire out clubs, and are playable only once the snow clears.",
    location: "Gulmarg & Royal Springs, Srinagar",
    destinationSlug: "gulmarg",
    duration: "4–5 hours for 18 holes",
    priceFrom: "Visitor green fee from ₹1,500–3,000; club hire extra",
    verify: true,
    season: "Apr–Oct",
    difficulty: "easy",
    suitedFor: "Golfers of any handicap; caddies available at both courses",
    audiences: ["senior-friendly", "photography"],
    image: img("1587174486073-ae5e5cff23aa"),
    imageAlt: "Mown golf fairway running towards tall conifers and a hill ridge",
  },
];

/** Hub listing order = authored order. Kept as a function to mirror getAllDestinations(). */
export function getAllExperiences(): Experience[] {
  return EXPERIENCES;
}

export function getExperienceBySlug(slug: string): Experience | undefined {
  return EXPERIENCES.find((experience) => experience.slug === slug);
}

/** Every experience attached to a destination — powers the destination-page cross-links. */
export function getExperiencesByDestination(destinationSlug: string): Experience[] {
  return EXPERIENCES.filter(
    (experience) => experience.destinationSlug === destinationSlug,
  );
}
