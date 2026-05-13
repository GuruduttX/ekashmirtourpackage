import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const MAX_BYTES = 2 * 1024 * 1024; // 2 MB

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const file = form.get('file') as File | null;
    const folder = (form.get('folder') as string | null) ?? 'ekashmir-uploads';

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    if (file.type !== 'image/webp') {
      return NextResponse.json({ success: false, error: 'Only WebP images are allowed' }, { status: 400 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ success: false, error: 'Image must be under 2 MB' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitise folder name so it's safe as a directory segment
    const safeFolder = folder.replace(/[^a-z0-9-_]/gi, '-').toLowerCase();
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', safeFolder);
    await mkdir(uploadDir, { recursive: true });

    // Unique filename: timestamp + original name (sanitised)
    const safeName = file.name.replace(/[^a-z0-9._-]/gi, '-').toLowerCase();
    const filename = `${Date.now()}-${safeName}`;
    await writeFile(path.join(uploadDir, filename), buffer);

    const url = `/uploads/${safeFolder}/${filename}`;
    return NextResponse.json({ success: true, url });
  } catch (err) {
    console.error('[upload]', err);
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
  }
}
