import { connectDB } from '@/lib/db';
import CityHub from '@/models/CityHub';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const cityHub = await CityHub.findById(id).lean();
    if (!cityHub) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ cityHub });
  } catch {
    return Response.json({ error: 'Failed to fetch city hub' }, { status: 500 });
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
    const cityHub = await CityHub.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!cityHub) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ cityHub });
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: number }).code === 11000) {
      return Response.json({ error: 'Slug already exists' }, { status: 409 });
    }
    return Response.json({ error: 'Failed to update city hub' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    await CityHub.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Failed to delete city hub' }, { status: 500 });
  }
}
