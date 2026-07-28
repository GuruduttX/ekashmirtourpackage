import { connectDB } from '@/lib/db';
import ThemeHub from '@/models/ThemeHub';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const themeHub = await ThemeHub.findById(id).lean();
    if (!themeHub) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ themeHub });
  } catch {
    return Response.json({ error: 'Failed to fetch theme hub' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const themeHub = await ThemeHub.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!themeHub) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ themeHub });
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: number }).code === 11000) {
      return Response.json({ error: 'Slug already exists' }, { status: 409 });
    }
    return Response.json({ error: 'Failed to update theme hub' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    await ThemeHub.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Failed to delete theme hub' }, { status: 500 });
  }
}
