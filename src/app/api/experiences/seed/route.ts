import { connectDB } from '@/lib/db';
import ExperienceActivity from '@/models/ExperienceActivity';
import { EXPERIENCE_ACTIVITIES } from '@/data/experienceActivities';
import { staticActivityToPage } from '@/lib/experienceActivityPage';

export const dynamic = 'force-dynamic';

/**
 * Dev-only seeder — upserts src/data/experienceActivities.ts into the
 * ExperienceActivity collection so the public pages render from the CMS.
 *
 * Blocked in production: this endpoint writes content, and an unauthenticated
 * write endpoint on a live site is not something to leave lying around. Delete
 * it once the real records are in.
 *
 * Upsert, not insert, so re-running it is safe — but note it OVERWRITES an
 * existing record with the static copy, so run it before editing in the admin,
 * not after.
 *
 * The static records are placeholder content: prices are unverified and
 * ratings are fabricated, so every one seeds as a DRAFT. Publishing is a
 * deliberate act in the admin, one activity at a time, after the copy has been
 * checked — until then the public pages keep rendering the same static copy
 * through the fallback, which is exactly what they show today.
 *
 *   curl -X POST http://localhost:3000/api/experiences/seed
 */
export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return Response.json({ error: 'Seeding is disabled in production' }, { status: 403 });
  }

  try {
    await connectDB();

    const results: Array<{ slug: string; action: 'created' | 'updated' }> = [];

    for (const activity of EXPERIENCE_ACTIVITIES) {
      // `id` is Mongo's to own — the read-through fills it back from `_id`.
      const { id: _id, ...page } = staticActivityToPage(activity);
      void _id;

      const existing = await ExperienceActivity.findOne({ slug: page.slug })
        .select('_id')
        .lean();

      await ExperienceActivity.findOneAndUpdate(
        { slug: page.slug },
        { ...page, status: 'draft' },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );

      results.push({ slug: page.slug, action: existing ? 'updated' : 'created' });
    }

    return Response.json({ seeded: results.length, results });
  } catch (error: unknown) {
    console.log(error);
    return Response.json({ error: 'Failed to seed activities' }, { status: 500 });
  }
}
