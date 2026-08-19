import { type NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Festival from '@/models/Festival';
import { handleWriteError } from '@/lib/apiErrors';

export const dynamic = 'force-dynamic';

/**
 * /api/festivals — the /festivals hub cards and the /festivals/[slug] pages.
 *
 * GET  — list festivals. Filters, all optional:
 *          ?status=draft|published
 *          ?kind=bloom|pilgrimage|cultural|sport|religious
 *          ?season=winter|spring|summer|autumn|moves
 *          ?limit=12
 * POST — create.
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = request.nextUrl;
    const status = searchParams.get('status');
    const kind = searchParams.get('kind');
    const season = searchParams.get('season');
    const limit = Number(searchParams.get('limit')) || 0;

    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    if (kind) query.kind = kind;
    if (season) query.season = season;

    let cursor = Festival.find(query).sort({ createdAt: -1 });
    if (limit > 0) cursor = cursor.limit(limit);

    const festivals = await cursor.lean();
    return Response.json({ festivals });
  } catch {
    return Response.json({ error: 'Failed to fetch festivals' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const festival = await Festival.create(body);
    return Response.json({ festival }, { status: 201 });
  } catch (error: unknown) {
    return handleWriteError(error, 'create festival');
  }
}
