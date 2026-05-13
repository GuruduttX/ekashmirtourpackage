import { type NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const status = request.nextUrl.searchParams.get('status') as 'draft' | 'published' | null;
    const query = status ? { status } : {};
    const blogs = await Blog.find(query).sort({ createdAt: -1 }).lean();
    return Response.json({ blogs });
  } catch {
    return Response.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const blog = await Blog.create(body);
    return Response.json({ blog }, { status: 201 });
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: number }).code === 11000) {
      return Response.json({ error: 'Slug already exists' }, { status: 409 });
    }
    return Response.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}
