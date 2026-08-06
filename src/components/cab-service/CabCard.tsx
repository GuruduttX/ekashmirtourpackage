import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Armchair, Fuel } from "lucide-react";

export interface CabItem {
  _id: string;
  title: string;
  slug: string;
  cabType?: string;
  fuelType?: string;
  basePrice?: number;
  seats?: number;
  isAC?: boolean;
  image?: string;
  alt?: string;
}

const FALLBACK =
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&auto=format&fit=crop&q=80";

export default function CabCard({ cab }: { cab: CabItem }) {
  return (
    <>
      {/* Mobile — compact horizontal list card */}
      <div className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] sm:hidden">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
          <Image
            src={cab.image || FALLBACK}
            alt={cab.alt || cab.title}
            fill
            unoptimized
            className="object-cover"
          />
          {cab.cabType && (
            <span className="absolute bottom-1 left-1 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
              {cab.cabType}
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
          <div>
            <h3 className="truncate font-heading text-base font-bold text-slate-900">
              {cab.title}
            </h3>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-sky-500">
              {!!cab.seats && (
                <span className="flex items-center gap-1">
                  <Armchair className="h-3.5 w-3.5" /> {cab.seats} Seats
                </span>
              )}
              {cab.fuelType && (
                <span className="flex items-center gap-1">
                  <Fuel className="h-3.5 w-3.5" /> {cab.fuelType}
                </span>
              )}
            </div>
          </div>

          <div className="mt-2 flex items-end justify-between gap-2">
            {!!cab.basePrice && (
              <p>
                <span className="text-lg font-bold text-sky-600">
                  ₹{cab.basePrice.toLocaleString("en-IN")}
                </span>
                <span className="ml-1 text-[11px] text-slate-400">per trip</span>
              </p>
            )}
            <Link
              href={`/cab-service/${cab.slug}`}
              className="inline-flex shrink-0 items-center gap-1 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-sky-200"
            >
              Book <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Tablet / desktop — original vertical card */}
      <div className="group relative hidden overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.16)] sm:block">
        {/* Image */}
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={cab.image || FALLBACK}
            alt={cab.alt || cab.title}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Price badge — flush to the top-left edge; corner radii match the card */}
          {!!cab.basePrice && (
            <span className="absolute left-0 top-0 inline-flex items-baseline gap-1 rounded-tl-2xl rounded-br-2xl bg-linear-to-r from-sky-500 to-cyan-400 px-4 py-2 text-white shadow-md shadow-sky-500/30">
              <span className="text-base font-bold">₹ {cab.basePrice.toLocaleString("en-IN")}/</span>
              <span className="text-sm font-medium text-white/90">Trip</span>
            </span>
          )}
        </div>

        {/* Info panel — overlaps the bottom of the image */}
        <div className="relative -mt-12 mx-3 mb-3 rounded-xl bg-white p-4 shadow-[0_6px_20px_rgba(0,0,0,0.08)]">
          <h3 className="font-heading text-lg font-bold text-sky-600">
            {cab.title}
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-sky-500">
            {!!cab.seats && (
              <span className="flex items-center gap-1.5">
                <Armchair className="h-4 w-4" /> {cab.seats} seats
              </span>
            )}
            {cab.fuelType && (
              <span className="flex items-center gap-1.5">
                <Fuel className="h-4 w-4" /> {cab.fuelType}
              </span>
            )}
          </div>

          <Link
            href={`/cab-service/${cab.slug}`}
            className="mt-4 block w-full rounded-lg bg-linear-to-r from-sky-500 to-cyan-400 py-2.5 text-center text-sm font-semibold text-white shadow-md shadow-sky-200 transition-transform hover:-translate-y-0.5"
          >
            Book Cab
          </Link>
        </div>
      </div>
    </>
  );
}
