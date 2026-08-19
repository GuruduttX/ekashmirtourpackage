import { type NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import ExperienceActivity from '@/models/ExperienceActivity';
import { handleWriteError } from '@/lib/apiErrors';

export const dynamic = 'force-dynamic';

/**
 * /api/experiences — the /experiences/[slug] activity pages.
 *
 * GET  — list activities. Filters, all optional:
 *          ?status=draft|published
 *          ?limit=12
 * POST — create.
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = request.nextUrl;
    const status = searchParams.get('status');
    const limit = Number(searchParams.get('limit')) || 0;

    const query: Record<string, unknown> = {};
    if (status) query.status = status;

    let cursor = ExperienceActivity.find(query).sort({ createdAt: -1 });
    if (limit > 0) cursor = cursor.limit(limit);

    const activities = await cursor.lean();
    return Response.json({ activities });
  } catch {
    return Response.json({ error: 'Failed to fetch activities' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const activity = await ExperienceActivity.create(body);
    return Response.json({ activity }, { status: 201 });
  } catch (error: unknown) {
    return handleWriteError(error, 'create activity');
  }
}
