import { getActivityPages } from "@/lib/experienceActivityPage";
import type { Activity } from "@/components/home/Activitycarousel";

/**
 * Feeds the home page's <ActivityCarousel />.
 *
 * Reads getActivityPages() — the same CMS-first, static-backfilled source that
 * /experiences and /experiences/[slug] use. That is the point of this file:
 * src/data/experiences.ts looks like the obvious source, but its slugs are the
 * hub's own taxonomy and two of them ("shikara-ride", "angling") have no
 * activity page — the real routes are "dal-lake-shikara" and "trout-angling".
 * Building the cards from the route source instead means a card can never link
 * at a 404, whatever the CMS adds or renames later.
 */
export async function buildHomeActivities(limit = 6): Promise<Activity[]> {
  const pages = await getActivityPages();

  return pages
    // A card is a photo — an activity with no gallery has nothing to show.
    .filter((activity) => activity.gallery.length > 0)
    // Featured first, so an editor pinning an activity in the CMS controls
    // what the home page leads with; original order breaks the tie.
    .sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false))
    .slice(0, limit)
    .map((activity) => ({
      slug: activity.slug,
      title: activity.title,
      description: activity.quickAnswer ?? activity.location,
      image: activity.gallery[0].image,
      imageAlt: activity.gallery[0].alt,
    }));
}
