/**
 * PLACEHOLDER REVIEWS for the /experiences/ testimonial strip.
 *
 * ⚠️ NOT REAL. Every quote and name below is invented to build and size the
 * component. They must be replaced with genuine, attributable reviews before
 * this page goes live.
 *
 * SOP data-honesty rule, verbatim: "Never publish Review / AggregateRating
 * schema unless genuine, on-page reviews exist — fake rating markup is a
 * domain-wide manual-action risk." Accordingly:
 *
 *   • NO Review, AggregateRating or rating JSON-LD is emitted for these
 *     anywhere on the page, and none may be added while this file is the
 *     source. The hub page's schema block does not reference them at all.
 *   • There are no star ratings in the UI either — the strip shows quote,
 *     name and trip only, so nothing here reads as a scored review.
 *   • Avatars are initials, not photographs. Attaching a stock portrait of a
 *     real person to an invented quote is a different and worse problem than
 *     placeholder text.
 *
 * The site already has a real reviews surface (the Review model and /review/),
 * so the likely replacement is a read from there rather than hand-written
 * entries here. The component takes its list as a prop for exactly that reason.
 */

export type ExperienceReview = {
  id: string;
  /** Reviewer's display name. */
  name: string;
  /** Which trip or activity they are talking about — the attribution line. */
  trip: string;
  /** The quote itself, plain text. */
  quote: string;
};

export const EXPERIENCE_REVIEWS: ExperienceReview[] = [
  {
    id: "rev-1",
    name: "Arjun Mehta",
    trip: "6-day Kashmir trip, March",
    quote:
      "We booked the gondola tickets through Sartaj the night before and walked straight past a queue that must have been an hour long. Small thing, but it saved us most of a morning in Gulmarg.",
  },
  {
    id: "rev-2",
    name: "Priya Nair",
    trip: "Honeymoon, May",
    quote:
      "The shikara at sunset was the part we still talk about. We were told to go out at five rather than four, and the light on the way back was worth every bit of the wait.",
  },
  {
    id: "rev-3",
    name: "Rahul Deshpande",
    trip: "Family trip with parents, June",
    quote:
      "My parents are in their seventies. We were told plainly which bits they should skip — Phase 2 of the gondola in particular — instead of being sold the full package. That honesty is why I would book again.",
  },
  {
    id: "rev-4",
    name: "Sneha Iyer",
    trip: "Ski week, February",
    quote:
      "First time on snow for both of us. The instructor started us on the Kongdoori slopes and by day three we were getting down without falling. Kit was decent and it all turned up on time.",
  },
  {
    id: "rev-5",
    name: "Imran Qureshi",
    trip: "8-day valley circuit, September",
    quote:
      "Every fare was written down before we left Srinagar, and nothing changed on the ground. After the stories I had heard about add-ons in Pahalgam, that alone made the trip.",
  },
  {
    id: "rev-6",
    name: "Meera Krishnan",
    trip: "Photography trip, October",
    quote:
      "I wanted golden hour at the chinars and got taken to a spot I would never have found. The driver knew exactly how long the light would hold and had us there twenty minutes early.",
  },
  {
    id: "rev-7",
    name: "Vikram Sethi",
    trip: "Trek to the Great Lakes, July",
    quote:
      "Weather turned on day three and the guide called it before we committed to the pass. We lost half a day and gained a much better one. Good judgement, not a sales pitch.",
  },
  {
    id: "rev-8",
    name: "Ananya Bose",
    trip: "Tulip Festival weekend, April",
    quote:
      "We were warned the tulips might be past their best that late and offered a different week. They were right, we moved, and the garden was full when we got there.",
  },
];

export function getExperienceReviews(): ExperienceReview[] {
  return EXPERIENCE_REVIEWS;
}

/** "Arjun Mehta" → "AM". Drives the initials avatar. */
export function reviewerInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
