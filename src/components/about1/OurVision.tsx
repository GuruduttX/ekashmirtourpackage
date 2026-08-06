export default function OurVision() {
  return (
    <section className="bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
        <div className="order-2 lg:order-1 rounded-[2rem] border border-sky-100 bg-gradient-to-br from-white via-sky-50/70 to-cyan-50/80 p-6 shadow-[0_18px_50px_rgba(14,165,233,0.08)] sm:p-8 lg:p-10 text-center md:text-start">
          <p className="text-base font-light leading-8 text-slate-600 sm:text-[1.05rem] sm:leading-9">
            Our mission is to unveil the raw beauty and rich heritage of
            Kashmir through thoughtfully curated, unforgettable travel
            experiences. We are dedicated to providing seamless, secure, and
            deeply personal journeys that connect travelers with the true heart
            of the Himalayas. By prioritizing exceptional hospitality and
            authentic local connections, we aim to craft lifelong memories
            while celebrating the communities that make this highland paradise
            so spectacular.
          </p>
        </div>

        <div className="order-1 max-w-xl lg:order-2 lg:justify-self-end">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-10 bg-sky-500" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-sky-500">
              Our Vision
            </span>
          </div>

          <h2 className="font-heading text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl text-center md:text-start">
            A future where every Kashmir journey feels personal and timeless.
          </h2>
        </div>
      </div>
    </section>
  );
}
