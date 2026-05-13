import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import BlogArchiveHero from "@/components/blogArchive/BlogArchiveHero";
import BlogArchiveSection, {
  type Blog as BlogCardType,
} from "@/components/blogArchive/BlogArchiveSection";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

export const metadata: Metadata = {
  title: "Kashmir Travel Blog | Expert Tips, Guides & Stories",
  description:
    "Explore eKashmir's travel blog for expert Kashmir travel tips, destination guides, itinerary ideas, packing tips & real stories from the Valley. Plan your perfect Kashmir trip.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    type: "website",
    title: "Kashmir Travel Blog | Expert Tips, Guides & Stories",
    description:
      "Expert Kashmir travel tips, destination guides, itinerary ideas & real stories from the Valley. Plan your perfect Kashmir trip with eKashmir.",
    url: `${SITE_URL}/blog`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Kashmir Travel Blog by eKashmir" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kashmir Travel Blog | Expert Tips, Guides & Stories",
    description:
      "Expert Kashmir travel tips, destination guides, itinerary ideas & real stories from the Valley.",
    images: ["/og-image.jpg"],
  },
};

function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function calcReadTime(content: string): string {
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

async function getPublishedBlogs(): Promise<BlogCardType[]> {
  try {
    await connectDB();
    const blogs = await Blog.find({ status: "published" })
      .select("title slug category image alt subContent content createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return blogs.map((blog) => ({
      id: blog._id.toString(),
      title: blog.title,
      slug: blog.slug,
      category: blog.category,
      image: blog.image,
      alt: blog.alt,
      subContent: blog.subContent,
      createdAt: formatDate(blog.createdAt),
      readTime: calcReadTime(blog.content ?? ""),
      featured: false,
    }));
  } catch {
    return [];
  }
}

export default async function BlogArchive() {
  const blogs = await getPublishedBlogs();

  return (
    <main className="relative overflow-hidden bg-sky-50">
      {/* Cinematic Ambient Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-0 h-[420px] w-[420px] rounded-full bg-sky-400/15 blur-[140px]" />
        <div className="absolute right-[-10%] top-[20%] h-[460px] w-[460px] rounded-full bg-cyan-400/10 blur-[160px]" />
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-sky-300/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-[0.035] mix-blend-overlay" />
      </div>

      {/* Page Content */}
      <div className="relative z-10">
        <Navbar />

        <section>
          <BlogArchiveHero />
        </section>

        <section className="relative -mt-6 pb-16 sm:pb-20">
          {blogs.length === 0 ? (
            <div className="mx-auto max-w-6xl px-4 py-24 text-center">
              <p className="text-slate-500 text-lg font-light">
                No blogs published yet. Check back soon.
              </p>
            </div>
          ) : (
            <BlogArchiveSection blogs={blogs} />
          )}
        </section>

        <Footer />
      </div>
    </main>
  );
}
