import { connectDB } from '@/lib/db';
import Festival from '@/models/Festival';
import { FESTIVALS } from '@/data/festivals';
import { staticFestivalToPage } from '@/lib/festivalPage';

export const dynamic = 'force-dynamic';

/**
 * Dev-only seeder — upserts src/data/festivals.ts joined to
 * src/data/festivalDetails.ts into the Festival collection, so both public
 * pages render from the CMS.
 *
 * Blocked in production: this endpoint writes content, and an unauthenticated
 * write endpoint on a live site is not something to leave lying around. Delete
 * it once the real records are in.
 *
 * Upsert, not insert, so re-running it is safe — but note it OVERWRITES an
 * existing record with the static copy, so run it before editing in the admin,
 * not after.
 *
 * EVERY RECORD SEEDS AS A DRAFT, and `datesVerified` seeds false with it. The
 * static copy is honest but unverified: not one of the eight festivals has
 * dates confirmed for the current year, and the photography is placeholder
 * stock. Publishing is a deliberate act in the admin, one festival at a time,
 * after the copy has been checked — until then the public pages keep rendering
 * the same static copy through the fallback, which is exactly what they show
 * today.
 *
 *   curl -X POST http://localhost:3000/api/festivals/seed
 */
export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return Response.json({ error: 'Seeding is disabled in production' }, { status: 403 });
  }

  try {
    await connectDB();

    const results: Array<{ slug: string; action: 'created' | 'updated' }> = [];

    for (const festival of FESTIVALS) {
      // `id` is Mongo's to own — the read-through fills it back from `_id`.
      const { id: _id, ...page } = staticFestivalToPage(festival);
      void _id;

      const existing = await Festival.findOne({ slug: page.slug })
        .select('_id')
        .lean();

      await Festival.findOneAndUpdate(
        { slug: page.slug },
        { ...page, status: 'draft', datesVerified: false },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );

      results.push({ slug: page.slug, action: existing ? 'updated' : 'created' });
    }

    return Response.json({ seeded: results.length, results });
  } catch (error: unknown) {
    console.log(error);
    return Response.json({ error: 'Failed to seed festivals' }, { status: 500 });
  }
}
