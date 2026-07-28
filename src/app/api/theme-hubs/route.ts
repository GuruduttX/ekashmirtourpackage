import { type NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import ThemeHub from '@/models/ThemeHub';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const status = request.nextUrl.searchParams.get('status') as 'draft' | 'published' | null;
    const query = status ? { status } : {};
    const themeHubs = await ThemeHub.find(query).sort({ createdAt: -1 }).lean();
    return Response.json({ themeHubs });
  } catch {
    return Response.json({ error: 'Failed to fetch theme hubs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const themeHub = await ThemeHub.create(body);
    return Response.json({ themeHub }, { status: 201 });
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: number }).code === 11000) {
      return Response.json({ error: 'Slug already exists' }, { status: 409 });
    }
    console.log(error);
    return Response.json({ error: 'Failed to create theme hub' }, { status: 500 });
  }
}
