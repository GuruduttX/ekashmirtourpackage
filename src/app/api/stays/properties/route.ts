import { type NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Stay from '@/models/Stay';
import { handleWriteError } from '@/lib/apiErrors';

export const dynamic = 'force-dynamic';

/**
 * /api/stays/properties
 *
 * GET  — list stays. Supported filters, all optional and combinable:
 *          ?status=draft|published
 *          ?category=Houseboat|Hotel|Resort|Homestay   (type pages)
 *          ?placeTag=dal-lake                          (place pages)
 *          ?limit=12
 * POST — create.
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = request.nextUrl;
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const placeTag = searchParams.get('placeTag');
    const limit = Number(searchParams.get('limit')) || 0;

    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    if (category) query.category = category;
    // placeTags is an array — an equality match finds documents containing it.
    if (placeTag) query.placeTags = placeTag;

    let cursor = Stay.find(query).sort({ createdAt: -1 });
    if (limit > 0) cursor = cursor.limit(limit);

    const stays = await cursor.lean();
    return Response.json({ stays });
  } catch {
    return Response.json({ error: 'Failed to fetch stays' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const stay = await Stay.create(body);
    return Response.json({ stay }, { status: 201 });
  } catch (error: unknown) {
    return handleWriteError(error, 'create stay');
  }
}
