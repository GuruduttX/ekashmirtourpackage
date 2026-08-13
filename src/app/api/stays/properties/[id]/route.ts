import { connectDB } from '@/lib/db';
import Stay from '@/models/Stay';
import { handleWriteError } from '@/lib/apiErrors';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const stay = await Stay.findById(id).lean();
    if (!stay) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ stay });
  } catch {
    return Response.json({ error: 'Failed to fetch stay' }, { status: 500 });
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
    const stay = await Stay.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!stay) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ stay });
  } catch (error: unknown) {
    return handleWriteError(error, 'update stay');
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    await Stay.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Failed to delete stay' }, { status: 500 });
  }
}
