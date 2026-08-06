import Image from "next/image";
import Link from "next/link";
import { Car } from "lucide-react";

interface Destination {
  name: string;
  image: string;
}

const DESTINATIONS: Destination[] = [
  {
    name: "Dal Lake",
    image:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=700&auto=format&fit=crop&q=80",
  },
  {
    name: "Pahalgam",
    image:
      "https://images.unsplash.com/photo-1561287437-c69a30664793?w=700&auto=format&fit=crop&q=80",
  },
  {
    name: "Gulmarg",
    image:
      "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=700&auto=format&fit=crop&q=80",
  },
  {
    name: "Sonmarg",
    image:
      "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?w=700&auto=format&fit=crop&q=80",
  },
];

export default function CabExploreDestinations() {
  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-heading text-3xl font-extrabold sm:text-4xl">
          <span className="bg-linear-to-r from-sky-600 to-cyan-300 bg-clip-text text-transparent">
            Explore Kashmir Destinations
          </span>
        </h2>

        <div className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:mt-10 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
          {DESTINATIONS.map((destination) => (
            <div
              key={destination.name}
              className="relative h-72 w-56 shrink-0 snap-start overflow-hidden rounded-2xl shadow-md shadow-black/10 sm:h-80 sm:w-full"
            >
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute bottom-4 left-4 text-lg font-bold text-white">
                {destination.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/kashmir-tour-packages/"
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-8 py-3.5 font-semibold text-white shadow-lg shadow-sky-200 transition-transform hover:-translate-y-0.5"
          >
            <Car className="h-4 w-4" /> View All Packages
          </Link>
        </div>
      </div>
    </section>
  );
}
