/**
 * Hub-level FAQs for /cab-service/.
 *
 * SINGLE SOURCE for both the visible accordion (CabFaqSection) and the FAQPage
 * JSON-LD emitted by the page — same rule as src/data/destinationFaqs.ts.
 *
 * THIS LIVES IN ITS OWN FILE FOR A REASON. It used to be a plain `export const`
 * inside CabFaqSection.tsx, which carries "use client". Every export of a
 * client module reaches a server component as a client reference, not as the
 * value — so the page read `FAQS.length` off a proxy and silently emitted no
 * FAQPage at all. Shared data a server component needs must sit in a module
 * with no "use client".
 *
 * No fares here on purpose: the per-route pages own the fare tables, and a
 * number repeated in two places is a number that will disagree with itself.
 */

export type CabFaq = {
  question: string;
  answer: string;
};

export const CAB_FAQS: CabFaq[] = [
  {
    question: "How long does a booking take?",
    answer:
      "Most bookings are confirmed within a few minutes. Once you submit your trip details, our team assigns a verified cab and shares the driver details before pickup.",
  },
  {
    question: "What are the starting booking prices?",
    answer:
      "Fares start from budget-friendly sedans and go up based on cab type, distance and duration. You'll always see the base fare upfront — extra km charges apply only beyond the included distance.",
  },
  {
    question: "What facilities are you providing?",
    answer:
      "All our cabs come with experienced drivers, clean and sanitized interiors, and the option to choose AC or non-AC vehicles. Tempo travellers and luxury cabs are also available for larger groups.",
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer:
      "Yes, bookings can be cancelled free of charge up to 1 hour before the scheduled pickup time. Rescheduling is easy — just reach out to our support team with your new pickup details.",
  },
];
