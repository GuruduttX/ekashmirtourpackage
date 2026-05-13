import { connectDB } from '@/lib/db';
import Package from '@/models/Package';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const pkg = await Package.findById(id).lean();
    if (!pkg) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ package: pkg });
  } catch {
    return Response.json({ error: 'Failed to fetch package' }, { status: 500 });
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
    const pkg = await Package.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!pkg) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ package: pkg });
  } catch {
    return Response.json({ error: 'Failed to update package' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    await Package.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Failed to delete package' }, { status: 500 });
  }
}
