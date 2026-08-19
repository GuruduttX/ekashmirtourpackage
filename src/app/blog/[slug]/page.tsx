import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import BlogContentRenderer from "@/components/blog/BlogContentRenderer";
import BlogFAQ from "@/components/blog/BlogFAQ";
import CinematicBlogHero from "@/components/blog/BlogHero";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogShareRail from "@/components/blog/BlogShareRail";
import BlogSidebar from "@/components/blog/BlogSidebar";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ReadingProgress from "@/components/blog/ReadingProgress";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import type { RelatedBlog } from "@/components/blog/RelatedBlogs";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function calcReadTime(content: string): string {
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

async function getBlogBySlug(slug: string) {
  await connectDB();
  const blog = await Blog.findOne({ slug, status: "published" }).lean();
  if (!blog) return null;
  return blog;
}

async function getRelatedBlogs(category: string, excludeSlug: string): Promise<RelatedBlog[]> {
  const related = await Blog.find({
    status: "published",
    category,
    slug: { $ne: excludeSlug },
  })
    .select("title slug category image alt subContent content createdAt")
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  if (related.length < 3) {
    const needed = 3 - related.length;
    const extra = await Blog.find({
      status: "published",
      category: { $ne: category },
      slug: { $ne: excludeSlug },
    })
      .select("title slug category image alt subContent content createdAt")
      .sort({ createdAt: -1 })
      .limit(needed)
      .lean();
    related.push(...extra);
  }

  return related.map((b) => ({
    id: b._id.toString(),
    title: b.title,
    slug: b.slug,
    category: b.category,
    image: b.image,
    alt: b.alt,
    subContent: b.subContent,
    createdAt: new Date(b.createdAt).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    }),
    readTime: calcReadTime(b.content ?? ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    await connectDB();
    const blog = await Blog.findOne({ slug, status: "published" })
      .select("meta title image alt subContent category author createdAt updatedAt slug")
      .lean();
    if (!blog) return {};

    const title = blog.meta?.title || blog.title;
    const description = blog.meta?.description || blog.subContent || "";
    const url = `${SITE_URL}/blog/${slug}`;

    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        type: "article",
        title,
        description,
        url,
        siteName: "eKashmir Tour Packages",
        images: blog.image
          ? [{ url: blog.image, alt: blog.alt || title }]
          : [{ url: "/og-image.jpg", width: 1200, height: 630, alt: title }],
        publishedTime: blog.createdAt
          ? new Date(blog.createdAt as Date).toISOString()
          : undefined,
        modifiedTime: (blog as unknown as Record<string, unknown>).updatedAt
          ? new Date((blog as unknown as Record<string, unknown>).updatedAt as Date).toISOString()
          : undefined,
        section: blog.category,
        authors: blog.author ? [blog.author] : [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: blog.image ? [blog.image] : ["/og-image.jpg"],
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  const readTime = calcReadTime(blog.content ?? "");
  const createdAt = formatDate(blog.createdAt);
  const relatedBlogs = await getRelatedBlogs(blog.category, slug);

 const jsonLd = {
   "@context": "https://schema.org",
   "@type": "BlogPosting",
   headline:
     (blog as unknown as { structuredData?: { title?: string } }).structuredData
       ?.title ||
     (blog as unknown as { meta?: { title?: string } }).meta?.title ||
     blog.title,
   description:
     (blog as unknown as { structuredData?: { description?: string } })
       .structuredData?.description ||
     (blog as unknown as { meta?: { description?: string } }).meta
       ?.description ||
     (blog as any).subContent, // assuming subContent is missing from IBlog
   image: blog.image,
   datePublished: new Date(blog.createdAt as Date).toISOString(),
   dateModified: new Date(
     (blog as unknown as { updatedAt?: Date }).updatedAt ||
       (blog.createdAt as Date),
   ).toISOString(),
   author: { "@type": "Person", name: blog.author },
   publisher: {
     "@type": "Organization",
     name: "eKashmir Tour Packages",
     url: SITE_URL,
   },
   url: `${SITE_URL}/blog/${slug}`,
   mainEntityOfPage: {
     "@type": "WebPage",
     "@id": `${SITE_URL}/blog/${slug}`,
   },
 };

  return (
    <div className="min-h-screen overflow-x-clip bg-sky-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 pt-24 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[{ label: "Blog", href: "/blog" }, { label: blog.title }]}
        />
      </div>
      <main>
        <CinematicBlogHero
          title={blog.title}
          category={blog.category}
          author={blog.author}
          image={blog.image}
          alt={blog.alt}
          subContent={blog.subContent}
          createdAt={createdAt}
          readTime={readTime}
        />

        <section className="relative z-10">
          <div className="mx-auto flex w-full max-w-[1600px] gap-6 sm:px-6 lg:px-8 xl:gap-8 2xl:px-12 pt-12">
            {/* Share Rail */}
            <div className="hidden xl:block xl:w-[72px] shrink-0 relative">
              <div className="sticky top-32">
                <BlogShareRail />
              </div>
            </div>

            {/* Main Editorial Layout */}
            <div className="min-w-0 flex-1">
              <BlogLayout sidebar={<BlogSidebar />}>
                <BlogContentRenderer content={blog.content ?? ""} />
              </BlogLayout>
            </div>
          </div>
        </section>

        <ReadingProgress />
        <BlogFAQ faqs={blog.faqs ?? []} />
        <RelatedBlogs blogs={relatedBlogs} />
      </main>
      <Footer />
    </div>
  );
}
