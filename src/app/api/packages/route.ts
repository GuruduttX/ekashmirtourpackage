import { type NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Package from '@/models/Package';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const status = request.nextUrl.searchParams.get('status') as 'draft' | 'published' | null;
    const query = status ? { status } : {};
    const packages = await Package.find(query).sort({ createdAt: -1 }).lean();
    return Response.json({ packages });
  } catch (error) {
    // Log before swallowing: a bare `catch {}` here made a 500 impossible to
    // diagnose from the server output.
    console.error('[api/packages] GET failed:', error);
    return Response.json({ error: 'Failed to fetch packages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const pkg = await Package.create(body);
    return Response.json({ package: pkg }, { status: 201 });
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: number }).code === 11000) {
      return Response.json({ error: 'Slug already exists' }, { status: 409 });
    }
    console.log(error)
    return Response.json({ error: 'Failed to create package' }, { status: 500 });
  }
}
