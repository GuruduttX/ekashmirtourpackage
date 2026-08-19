/**
 * FAQs for /review/.
 *
 * SINGLE SOURCE for both the visible accordion and the FAQPage JSON-LD — same
 * rule as src/data/destinationFaqs.ts. Answers are plain strings, not HTML, so
 * what renders is byte-identical to what is emitted.
 *
 * Scope is deliberately about the REVIEWS THEMSELVES — how they are collected,
 * how they are verified, how to leave or amend one. Trip-planning questions
 * belong on the hub and destination pages, so the two don't compete for the
 * same queries.
 */

import type { DestinationFaq } from "@/data/destinationFaqs";

/** Reuses the destination FAQ shape — same accordion, same schema builder. */
export type ReviewFaq = DestinationFaq;

export const REVIEW_FAQS: ReviewFaq[] = [
  {
    id: "how-to-leave-a-review",
    question: "How can I leave a review?",
    answer:
      "After your trip concludes you will receive an email with a secure link to share your experience and photos with us. You do not need an account to use it.",
  },
  {
    id: "are-reviews-verified",
    question: "Are reviews verified?",
    answer:
      "Yes. Every review is cross-referenced against our booking records before it is published, so each one comes from a traveller who actually travelled with eKashmir.",
  },
  {
    id: "how-feedback-is-collected",
    question: "How do you collect customer feedback?",
    answer:
      "Through post-trip surveys, direct email, and a follow-up call a few days after you are home. The call is where the most useful feedback tends to come out, so we keep doing it.",
  },
  {
    id: "can-i-update-my-review",
    question: "Can I update my review?",
    answer:
      "Absolutely. Reach out to our support team with what you would like changed or added — including extra photos — and we will update it for you.",
  },
  {
    id: "do-you-remove-negative-reviews",
    question: "Do you remove negative reviews?",
    answer:
      "No. We only remove a review if it is abusive, names a staff member unfairly, or cannot be matched to a real booking. Critical reviews stay up, because a page of nothing but five stars tells you nothing.",
  },
];
