import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Package from "@/models/Package";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

interface ImageEntry {
  url: string;
  title: string;
  caption?: string;
}

export async function GET() {
  try {
    await connectDB();

    const packages = await Package.find({ status: "published" })
      .select("slug title heroImage childImages createdAt updatedAt")
      .sort({ createdAt: -1 })
      .lean();

    const entries = packages
      .map((pkg) => {
        const lastmod = new Date(
          (pkg as Record<string, unknown>).updatedAt as Date ?? pkg.createdAt as Date
        )
          .toISOString()
          .split("T")[0];

        // Collect hero image + all child images
        const images: ImageEntry[] = [];
        if (pkg.heroImage?.image) {
          images.push({
            url: pkg.heroImage.image,
            title: pkg.heroImage.alt || pkg.title,
            caption: pkg.title,
          });
        }
        if (Array.isArray(pkg.childImages)) {
          for (const img of pkg.childImages as Array<{ image: string; alt?: string }>) {
            if (img.image) {
              images.push({ url: img.image, title: img.alt || pkg.title });
            }
          }
        }

        const imageBlocks = images
          .map(
            (img) =>
              `\n    <image:image>\n      <image:loc>${escapeXml(img.url)}</image:loc>\n      <image:title>${escapeXml(img.title)}</image:title>${img.caption ? `\n      <image:caption>${escapeXml(img.caption)}</image:caption>` : ""}\n    </image:image>`
          )
          .join("");

        return `  <url>
    <loc>${SITE_URL}/package/${pkg.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>${imageBlocks}
  </url>`;
      })
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new NextResponse("Error generating packages sitemap", { status: 500 });
  }
}
