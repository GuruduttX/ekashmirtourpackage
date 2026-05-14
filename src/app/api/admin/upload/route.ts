import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

const MAX_BYTES = 2 * 1024 * 1024; // 2 MB

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const file = form.get("file") as File | null;
    const folder = (form.get("folder") as string | null) ?? "ekashmir-uploads";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 },
      );
    }

    if (file.type !== "image/webp") {
      return NextResponse.json(
        { success: false, error: "Only WebP images are allowed" },
        { status: 400 },
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { success: false, error: "Image must be under 2 MB" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize folder name
    const safeFolder = folder.replace(/[^a-z0-9-_]/gi, "-").toLowerCase();

    // Upload to Cloudinary using a Promise stream
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: safeFolder, // Cloudinary will automatically create this folder if it doesn't exist
          format: "webp", // Force webp format just to be safe
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      // Write the buffer to the stream
      uploadStream.end(buffer);
    });

    // Cast the result to access Cloudinary properties
    const result = uploadResult as any;

    // Return the secure HTTPS URL provided by Cloudinary
    return NextResponse.json({ success: true, url: result.secure_url });
  } catch (err) {
    console.error("[cloudinary upload]", err);
    return NextResponse.json(
      { success: false, error: "Upload failed" },
      { status: 500 },
    );
  }
}
