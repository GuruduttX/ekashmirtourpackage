import Image from "next/image";
import Link from "next/link";
import { BedDouble, MessageCircle } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

/**
 * Shared hero for the two listing page types under /stays/[slug]:
 * stay-type pages (/stays/houseboats) and place pages (/stays/srinagar-stays).
 *
 * Static by design — the copy is passed in from the taxonomy today and will
 * come from the CMS later without touching this component.
 */

type Props = {
  /** Small uppercase label above the H1, e.g. "Stay type" or "Srinagar". */
  eyebrow: string;
  /** H1 — exact intent. */
  title: string;
  /** 40–60 word answer-first block, server-rendered (SOP B5). */
  answerBlock: string;
  image: string;
  alt: string;
  /** Trailing breadcrumb label. "Stays" and "Home" are prepended. */
  breadcrumbLabel: string;
  /** Count of listings below, shown as a small stat. */
  stayCount: number;
  /** Lowest nightly rate across the listings, INR. */
  priceFrom: number;
};

export default function StayListingHero({
  eyebrow,
  title,
  answerBlock,
  image,
  alt,
  breadcrumbLabel,
  stayCount,
  priceFrom,
}: Props) {
  return (
    <section className="relative w-full overflow-hidden bg-slate-900 pt-28 pb-10 sm:pt-32">
      {/* Photo */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={alt}
          fill
          unoptimized
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Black backdrop so the copy reads on any photo */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/80 to-slate-950/60 md:bg-linear-to-r md:from-slate-950 md:via-slate-950/85 md:to-slate-950/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[{ label: "Stays", href: "/stays/" }, { label: breadcrumbLabel }]}
          className="[&_a]:text-slate-300 [&_span]:text-slate-300"
        />

        <div className="mt-8 flex flex-col items-center text-center md:max-w-2xl md:items-start md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-200 backdrop-blur-md">
            <BedDouble className="h-3.5 w-3.5" /> {eyebrow}
          </span>

          <h1 className="mt-5 font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            {title}
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200 sm:text-base">
            {answerBlock}
          </p>

          {/* Stats */}
          <div className="mt-7 flex w-fit items-center divide-x divide-white/20">
            <div className="pr-5 text-center">
              <p className="text-xl font-bold text-sky-300 sm:text-2xl">{stayCount}</p>
              <p className="mt-1 text-xs text-slate-300">
                {stayCount === 1 ? "Stay listed" : "Stays listed"}
              </p>
            </div>
            <div className="px-5 text-center">
              <p className="text-xl font-bold text-sky-300 sm:text-2xl">
                ₹{priceFrom.toLocaleString("en-IN")}
              </p>
              <p className="mt-1 text-xs text-slate-300">From / night</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex w-full flex-nowrap items-center justify-center gap-2.5 md:justify-start">
            <Link
              href="/contact/"
              className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-900/40 transition-transform hover:-translate-y-0.5 sm:px-7"
            >
              <BedDouble className="h-4 w-4" /> Get Stay Quote
            </Link>
            <Link
              href="/contact/"
              className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/25 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:px-7"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
