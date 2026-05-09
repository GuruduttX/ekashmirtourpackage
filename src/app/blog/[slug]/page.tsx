// page.tsx
import BlogContentRenderer from "@/components/blog/BlogContentRenderer";
import BlogFAQ from "@/components/blog/BlogFAQ";
import CinematicBlogHero from "@/components/blog/BlogHero";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogShareRail from "@/components/blog/BlogShareRail";
import BlogSidebar from "@/components/blog/BlogSidebar";
import ReadingProgress from "@/components/blog/ReadingProgress";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const dummyBlogContent = `

  <p>

    Kashmir unfolds like a cinematic dream across the northern valleys of India,

    where alpine landscapes, shimmering lakes, pine forests, and centuries-old

    traditions create one of the most immersive travel experiences in the world.

  </p>
  <p>

    From the quiet reflections of Dal Lake to the snow-covered peaks of Gulmarg,

    every region offers a unique atmosphere shaped by culture, nature, and timeless beauty.

  </p>



  <img

    src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=1600&auto=format&fit=crop"

    alt="Dal Lake Kashmir"

  />



  <h2>Why Kashmir Feels Unlike Anywhere Else</h2>



  <p>

    Kashmir is not simply a destination. It is an emotional landscape where every

    season transforms the valleys into a different visual story.

  </p>



  <blockquote>

    <p>

      The beauty of Kashmir lies not only in its mountains, but in the silence,

      the mist, the lakes, and the stories woven into every landscape.

    </p>

  </blockquote>



  <p>

    Spring arrives with blooming tulip gardens, summer opens vast green meadows,

    autumn paints the valleys in golden chinar leaves, and winter transforms the

    region into a snow-covered alpine wonderland.

  </p>



  <h3>Experiences That Define Kashmir</h3>



  <ul>

    <li>Shikara rides through Dal Lake at sunrise</li>

    <li>Snow adventures in Gulmarg</li>

    <li>Exploring pine valleys in Pahalgam</li>

    <li>Immersive local Kashmiri cuisine experiences</li>

    <li>Luxury houseboat stays with mountain views</li>

  </ul>



  <img

    src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1600&auto=format&fit=crop"

    alt="Kashmir mountain landscape"

  />



  <h2>Planning The Perfect Kashmir Journey</h2>



  <p>

    The best Kashmir itineraries combine luxury, slow travel, immersive nature,

    and local cultural experiences.

  </p>



  <p>

    Whether you are planning a romantic escape, family vacation, photography expedition,

    or winter adventure, Kashmir offers extraordinary experiences throughout the year.

  </p>



  <hr />



  <h3>Best Time To Visit Kashmir</h3>



  <table>

    <thead>

      <tr>

        <th>Season</th>

        <th>Experience</th>

      </tr>

    </thead>



    <tbody>

      <tr>

        <td>Spring</td>

        <td>Tulip gardens and blooming valleys</td>

      </tr>



      <tr>

        <td>Summer</td>

        <td>Green meadows and pleasant weather</td>

      </tr>



      <tr>

        <td>Autumn</td>

        <td>Golden chinar landscapes</td>

      </tr>



      <tr>

        <td>Winter</td>

        <td>Snowfall and alpine adventure</td>

      </tr>

    </tbody>

  </table>

`;

export default function BlogPage() {
  // FIX 1: Removed overflow-hidden, used overflow-x-clip if needed
  return (
    <div className="min-h-screen overflow-x-clip bg-sky-50">
      <>
        <Navbar />
        <main>
          <CinematicBlogHero />

          <section className="relative z-10">
            <div className="mx-auto flex w-full max-w-[1600px] gap-6  sm:px-6 lg:px-8 xl:gap-8 2xl:px-12 pt-12">
              {/* FIX 2: Added the sticky track right here in the layout */}
              <div className="hidden xl:block xl:w-[72px] shrink-0 relative">
                <div className="sticky top-32">
                  <BlogShareRail />
                </div>
              </div>

              {/* Main Editorial Layout */}
              <div className="min-w-0 flex-1">
                <BlogLayout sidebar={<BlogSidebar />}>
                  <BlogContentRenderer content={dummyBlogContent} />
                </BlogLayout>
              </div>
            </div>
          </section>

          <ReadingProgress />
          <BlogFAQ />
          <RelatedBlogs />
        </main>
        <Footer />
      </>
    </div>
  );
}
