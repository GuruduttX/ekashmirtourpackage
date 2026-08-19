import { connectDB } from '@/lib/db';
import Festival from '@/models/Festival';
import { handleWriteError } from '@/lib/apiErrors';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const festival = await Festival.findById(id).lean();
    if (!festival) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ festival });
  } catch {
    return Response.json({ error: 'Failed to fetch festival' }, { status: 500 });
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
    const festival = await Festival.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!festival) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ festival });
  } catch (error: unknown) {
    return handleWriteError(error, 'update festival');
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    await Festival.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Failed to delete festival' }, { status: 500 });
  }
}
