import { type NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import DurationHub from '@/models/DurationHub';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const status = request.nextUrl.searchParams.get('status') as 'draft' | 'published' | null;
    const query = status ? { status } : {};
    const durationHubs = await DurationHub.find(query).sort({ createdAt: -1 }).lean();
    return Response.json({ durationHubs });
  } catch {
    return Response.json({ error: 'Failed to fetch duration hubs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const durationHub = await DurationHub.create(body);
    return Response.json({ durationHub }, { status: 201 });
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: number }).code === 11000) {
      return Response.json({ error: 'Slug already exists' }, { status: 409 });
    }
    console.log(error);
    return Response.json({ error: 'Failed to create duration hub' }, { status: 500 });
  }
}
