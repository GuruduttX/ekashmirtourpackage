import BlogArchiveHero from "@/components/blogArchive/BlogArchiveHero";
import BlogArchiveSection, {
  type Blog,
} from "@/components/blogArchive/BlogArchiveSection";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const DUMMY_BLOGS: Blog[] = Array.from({ length: 15 }, (_, i) => ({
  id: `blog-${i + 1}`,
  title: `Cinematic Kashmir: Exploring the ${
    i % 2 === 0 ? "Valleys" : "Peaks"
  } ${i + 1}`,
  slug: `cinematic-kashmir-${i + 1}`,
  category:
    i % 3 === 0 ? "Culture" : i % 2 === 0 ? "Adventure" : "Luxury",
  image:
    i % 2 === 0
      ? "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
      : "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=1200&q=80",
  alt: `Kashmir travel story ${i + 1}`,
  subContent:
    "Discover the hidden gems of the paradise on earth with our curated premium travel guides.",
  createdAt: "May 2026",
  readTime: "8 min read",
  featured: i % 5 === 0,
}));

const BlogArchive = () => {
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

        {/* Hero Section */}
        <section>
          <BlogArchiveHero />
        </section>

        {/* Archive Grid Section */}
        <section className="relative -mt-6 pb-16 sm:pb-20">
          <BlogArchiveSection blogs={DUMMY_BLOGS} />
        </section>

        <Footer />
      </div>
    </main>
  );
};

export default BlogArchive;
