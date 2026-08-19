import { NextResponse } from "next/server";
import { getFestivalPageSlugs } from "@/lib/festivalPage";
import { getDestinationPageSlugs } from "@/lib/destinationPage";
import { getActivityPageSlugs } from "@/lib/experienceActivityPage";
import { STAY_TYPES, STAY_PLACES } from "@/data/stayTaxonomy";
import { getAllStays } from "@/data/stays";
import { connectDB } from "@/lib/db";
import Temple from "@/models/Temple";
import Taxi from "@/models/Taxi";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

/**
 * Every hub and trust page the site actually serves.
 *
 * NOTHING REDIRECTING BELONGS HERE. /package and /services used to be listed
 * even though next.config 301s both — submitting redirects wastes crawl budget
 * and tells Google the sitemap is unmaintained. /kashmir-tour-packages and
 * /cab-service are their live replacements.
 *
 * Detail URLs are not listed here by hand; each section below enumerates them
 * from the same source its route prerenders from, so this file can never
 * advertise a URL that does not render.
 */
const STATIC_PAGES = [
  { path: "",                       priority: "1.0", changefreq: "daily"   },
  { path: "/kashmir-tour-packages", priority: "0.9", changefreq: "daily"   },
  { path: "/cab-service",           priority: "0.9", changefreq: "weekly"  },
  { path: "/stays",                 priority: "0.9", changefreq: "weekly"  },
  { path: "/destinations",          priority: "0.9", changefreq: "weekly"  },
  { path: "/experiences",           priority: "0.9", changefreq: "weekly"  },
  { path: "/festivals",             priority: "0.9", changefreq: "weekly"  },
  { path: "/temples",               priority: "0.9", changefreq: "weekly"  },
  { path: "/blog",                  priority: "0.9", changefreq: "daily"   },
  { path: "/about",                 priority: "0.8", changefreq: "monthly" },
  { path: "/contact",               priority: "0.8", changefreq: "monthly" },
  { path: "/author/sartaj",         priority: "0.8", changefreq: "monthly" },
  { path: "/review",                priority: "0.7", changefreq: "weekly"  },
  { path: "/whyKashmir",            priority: "0.7", changefreq: "monthly" },
];

type Entry = { path: string; priority: string; changefreq: string };

/**
 * Each of these resolves per request rather than at module load, so publishing
 * a record in the admin puts it in the sitemap without a redeploy.
 *
 * They are also individually fault-tolerant: one section failing (a Mongo
 * hiccup, a bad record) must not take down the whole sitemap and blank every
 * other URL on it, so a failure logs and yields nothing.
 */
async function safely(label: string, load: () => Promise<Entry[]>) {
  try {
    return await load();
  } catch (error) {
    console.error(`sitemap-pages: could not list ${label}`, error);
    return [];
  }
}

async function festivalPages() {
  const slugs = await getFestivalPageSlugs();
  return slugs.map((slug) => ({
    path: `/festivals/${slug}`,
    priority: "0.8",
    changefreq: "monthly",
  }));
}

async function destinationPages() {
  const slugs = await getDestinationPageSlugs();
  return slugs.map((slug) => ({
    path: `/destinations/${slug}`,
    priority: "0.8",
    changefreq: "weekly",
  }));
}

async function experiencePages() {
  const slugs = await getActivityPageSlugs();
  return slugs.map((slug) => ({
    path: `/experiences/${slug}`,
    priority: "0.8",
    changefreq: "weekly",
  }));
}

/** Mirrors generateStaticParams in /stays/[slug]: types, places and stays. */
async function stayPages() {
  const slugs = [
    ...STAY_TYPES.map((type) => type.slug),
    ...STAY_PLACES.map((place) => `${place.slug}-stays`),
    ...getAllStays().map((stay) => stay.slug),
  ];
  return slugs.map((slug) => ({
    path: `/stays/${slug}`,
    priority: "0.8",
    changefreq: "weekly",
  }));
}

async function templePages() {
  await connectDB();
  const temples = await Temple.find({ status: "published" }, { slug: 1 }).lean<
    { slug: string }[]
  >();
  return temples.map((temple) => ({
    path: `/temples/${temple.slug}`,
    priority: "0.8",
    changefreq: "monthly",
  }));
}

async function cabRoutePages() {
  await connectDB();
  const routes = await Taxi.find({ status: "published" }, { slug: 1 }).lean<
    { slug: string }[]
  >();
  return routes.map((route) => ({
    path: `/cab-service/${route.slug}`,
    priority: "0.8",
    changefreq: "monthly",
  }));
}

export async function GET() {
  const lastmod = new Date().toISOString().split("T")[0];

  const dynamicPages = (
    await Promise.all([
      safely("festivals", festivalPages),
      safely("destinations", destinationPages),
      safely("experiences", experiencePages),
      safely("stays", stayPages),
      safely("temples", templePages),
      safely("cab routes", cabRoutePages),
    ])
  ).flat();

  const entries = [...STATIC_PAGES, ...dynamicPages]
    .map(
      ({ path, priority, changefreq }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join("\n");

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
