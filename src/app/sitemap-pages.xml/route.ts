import { NextResponse } from "next/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

const STATIC_PAGES = [
  { path: "",          priority: "1.0", changefreq: "daily"   },
  { path: "/package",  priority: "0.9", changefreq: "daily"   },
  { path: "/blog",     priority: "0.9", changefreq: "daily"   },
  { path: "/about",    priority: "0.8", changefreq: "monthly" },
  { path: "/contact",  priority: "0.8", changefreq: "monthly" },
  { path: "/services", priority: "0.8", changefreq: "monthly" },
  { path: "/stays",    priority: "0.9", changefreq: "weekly"  },
  { path: "/whyKashmir", priority: "0.7", changefreq: "monthly" },
];

export function GET() {
  const lastmod = new Date().toISOString().split("T")[0];

  const entries = STATIC_PAGES.map(
    ({ path, priority, changefreq }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
