import Image from "next/image";
import { Car, MapPin } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

const FALLBACK =
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1600&auto=format&fit=crop&q=80";

interface CabDetailHeroProps {
  title: string;
  image?: string;
  alt?: string;
  pickup?: string;
  destination?: string;
}

export default function CabDetailHero({ title, image, alt, pickup, destination }: CabDetailHeroProps) {
  return (
    <div>
      <Breadcrumbs
        items={[{ label: "Cab Service", href: "/cab-service/" }, { label: title }]}
        className="mb-5"
      />

      <div className="relative h-36 w-full overflow-hidden rounded-2xl shadow-md shadow-black/10 sm:h-48">
        <Image
          src={image || FALLBACK}
          alt={alt || title}
          fill
          unoptimized
          priority
          className="object-cover"
        />

        {/* Theme-color wash for legibility — sky/cyan, not black */}
        <div className="absolute inset-0 bg-linear-to-t from-sky-900/80 via-sky-900/15 to-transparent" />

        <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
          <div className="flex items-center gap-2 rounded-2xl border border-white/25 bg-linear-to-r from-sky-500/60 to-cyan-400/60 px-4 py-3.5 text-white shadow-lg backdrop-blur-md sm:gap-3 sm:px-7 sm:py-5">
            <div className="flex min-w-0 items-center gap-1.5 text-sm font-semibold sm:text-base">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="truncate">{pickup || "Pickup"}</span>
            </div>

            <div className="flex flex-1 items-center gap-1.5 px-1">
              <span className="h-2 w-2 shrink-0 rounded-full border-2 border-white" />
              <span className="h-px min-w-4 flex-1 border-t-2 border-dashed border-white/70" />
              <Car className="h-4 w-4 shrink-0" />
              <span className="h-px min-w-4 flex-1 border-t-2 border-dashed border-white/70" />
            </div>

            <div className="flex min-w-0 items-center gap-1.5 text-sm font-semibold sm:text-base">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="truncate">{destination || "Destination"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
