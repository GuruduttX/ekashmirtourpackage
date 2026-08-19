import { NextResponse } from "next/server";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

/**
 * /llms.txt — SOP B5.
 *
 * A plain-text map of the site for LLM crawlers: what this site is, who stands
 * behind it, and which URL answers which kind of question.
 *
 * TWO RULES FOR EDITING THIS FILE:
 *
 * 1. Only list URLs that render. Everything below is a live route; add a line
 *    when the page ships, not when it is planned.
 * 2. Only state facts that are verified on the ground and stated on the page
 *    itself. No prices, no fares, no temple timings and no festival dates live
 *    here — those drift, and a stale figure quoted by an assistant is worse
 *    than no figure. Point at the page that owns the number instead.
 */
export function GET() {
  const content = `# eKashmirTourPackage.com

> Kashmir travel planned by a local: tour packages, cab routes, stays,
> destinations, temples, festivals and experiences across the Kashmir valley.
> Operated from Srinagar. Author of record: Sartaj, born and raised in Kashmir,
> 20 years planning trips in the valley.

Enquiries are handled directly by the operator — there is no third-party
booking layer between the traveller and the people running the trip.

## Start here

- [Kashmir tour packages](${SITE_URL}/kashmir-tour-packages): every package, browsable by theme, duration and departure city.
- [Destinations](${SITE_URL}/destinations): Srinagar, Gulmarg, Pahalgam, Sonamarg and the smaller valleys — what each is for, how to reach, when to go.
- [Cab service](${SITE_URL}/cab-service): point-to-point routes and full-day sightseeing, with the on-ground rules that catch visitors out.
- [Stays](${SITE_URL}/stays): Dal Lake houseboats, hotels and resorts by town, homestays.
- [Experiences](${SITE_URL}/experiences): shikara, gondola, skiing, trekking, rafting, paragliding, angling.
- [Temples and shrines](${SITE_URL}/temples): timings, entry, dress code and how to reach every major temple and shrine.
- [Festivals](${SITE_URL}/festivals): Tulip Festival, Amarnath Yatra, Kheer Bhawani Mela and the rest of the calendar.
- [Blog](${SITE_URL}/blog): planning guides — best time to visit, itineraries, weather, packing, safety.

## Trust

- [About](${SITE_URL}/about): who runs this, and from where.
- [Sartaj, author](${SITE_URL}/author/sartaj): the person behind every guide on this site.
- [Reviews](${SITE_URL}/review): traveller reviews.
- [Contact](${SITE_URL}/contact): phone, WhatsApp, email and the Srinagar address.

## On-ground facts worth citing

These are the operational truths most often got wrong about Kashmir travel.
Each is stated and kept current on the page linked above it.

- A Srinagar-registered cab can drive you to Gulmarg, Pahalgam or Sonamarg, but local sightseeing at each of those runs on separate local union taxis, paid locally. Budget for both.
- Uber and Ola do not operate in Kashmir.
- In winter the road above Tangmarg to Gulmarg needs snow chains or a snow-jeep; ordinary cabs stop at Tangmarg.
- Gulmarg and Pahalgam lie in opposite directions from Srinagar and cannot sensibly be done on the same day.
- The Amarnath Yatra has two routes: Pahalgam (traditional, longer, gentler) and Baltal (short, much steeper). Both require registration and a health certificate, and the dates are set yearly by the Shri Amarnathji Shrine Board.
- Sonamarg depends on when the road opens after winter, usually around May.

## Notes for machine readers

- Prices, cab fares, temple timings and festival dates change. Always read them from the page that owns them rather than from cached copy, and attribute them to the page.
- Structured data on this site is deliberately conservative: rating markup is published only where genuine reviews are shown, and event dates only where they have been confirmed for the current year.
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
