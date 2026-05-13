import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find({ status: "published" })
      .select("slug title image alt createdAt updatedAt")
      .sort({ createdAt: -1 })
      .lean();

    const entries = blogs
      .map((blog) => {
        const lastmod = new Date(
          (blog as Record<string, unknown>).updatedAt as Date ?? blog.createdAt as Date
        )
          .toISOString()
          .split("T")[0];

        const imageBlock = blog.image
          ? `\n    <image:image>\n      <image:loc>${escapeXml(blog.image)}</image:loc>\n      <image:title>${escapeXml(blog.title)}</image:title>${blog.alt ? `\n      <image:caption>${escapeXml(blog.alt)}</image:caption>` : ""}\n    </image:image>`
          : "";

        return `  <url>
    <loc>${SITE_URL}/blog/${blog.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>${imageBlock}
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
    return new NextResponse("Error generating blog sitemap", { status: 500 });
  }
}
