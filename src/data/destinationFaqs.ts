/**
 * Hub-level FAQs for /destinations/.
 *
 * SINGLE SOURCE for both the visible accordion and the FAQPage JSON-LD. Keep it
 * that way: markup whose answers differ from the text on the page is a
 * structured-data violation, and the easiest way to cause that is to maintain
 * two copies. Answers are therefore plain strings, not HTML — whatever renders
 * is exactly what is emitted.
 *
 * Scope is deliberately hub-level: "which place first", "how many days", "can I
 * combine these". Per-place questions (Gulmarg gondola pricing, Pahalgam pony
 * rates) belong on the individual destination pages, so the two don't compete
 * for the same queries.
 *
 * No prices here on purpose — fares and package rates drift, and the SOP wants
 * them stated only where they are verified and dated.
 */

export type DestinationFaq = {
  id: string;
  question: string;
  answer: string;
};

export const DESTINATION_FAQS: DestinationFaq[] = [
  {
    id: "which-first",
    question: "Which Kashmir destination should I visit first?",
    answer:
      "Srinagar. It has the airport, the widest choice of stays, and Gulmarg, Pahalgam and Sonamarg are all day-trip or overnight distance from it. Almost every workable Kashmir itinerary starts there and radiates outwards rather than moving base every night.",
  },
  {
    id: "how-many-days",
    question: "How many days do I need to see all four destinations?",
    answer:
      "Eight days and seven nights covers all four without rushing. Six days and five nights comfortably covers Srinagar, Gulmarg and Pahalgam. Four days is enough for Srinagar plus one snow day in Gulmarg. Sonamarg is the one most often dropped when time is short, because it is the longest day out.",
  },
  {
    id: "gulmarg-pahalgam-same-day",
    question: "Can I visit Gulmarg and Pahalgam on the same day?",
    answer:
      "No. They lie in opposite directions from Srinagar — Gulmarg is roughly 50 to 65 km west and Pahalgam roughly 90 km south-east. Doing both in one day would mean around six hours of driving and almost no time on the ground. Give each its own day.",
  },
  {
    id: "one-cab",
    question: "Can one cab cover the whole trip?",
    answer:
      "For the drives between towns, yes. But a Srinagar-registered cab can only drop you at Gulmarg, Pahalgam and Sonamarg — the local sightseeing at each of those runs on separate union taxis that you pay for locally. Budget for both. In winter you will also need a snow-jeep beyond Tangmarg to reach Gulmarg itself.",
  },
  {
    id: "best-time",
    question: "What is the best time to visit Kashmir?",
    answer:
      "April to June is the peak season, with the gardens and meadows at their best. December to February is the snow season, and the only reliable window for skiing in Gulmarg. September to November brings the autumn chinar colour and thinner crowds. Sonamarg is the exception — it depends on when the road opens after winter, usually around May.",
  },
  {
    id: "snow-in-summer",
    question: "Will I see snow in Gulmarg in summer?",
    answer:
      "Not on the meadows. From roughly April the valley floor at Gulmarg is green, and the snow retreats to the higher slopes reached by the second phase of the gondola towards Apharwat. If seeing snow underfoot matters to you, travel between December and March.",
  },
  {
    id: "permits",
    question: "Do I need a permit for these destinations?",
    answer:
      "Srinagar, Gulmarg, Pahalgam and Sonamarg need no special permit. Some border areas further out, such as Gurez, do require clearance and the rules change from season to season, so we confirm what is current before any trip that includes them.",
  },
  {
    id: "which-for-honeymoon",
    question: "Which destination suits honeymooners and which suits families?",
    answer:
      "Honeymoons usually favour a Dal Lake houseboat in Srinagar plus Pahalgam, which is quieter and greener. Families tend to prefer Srinagar and Gulmarg, because the gondola and the snow give children something to do and neither involves long climbs. Sonamarg suits travellers who do not mind a long drive for high-altitude scenery.",
  },
];
