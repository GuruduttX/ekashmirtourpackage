"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, ArrowRight } from "lucide-react";

// Types
interface TourPackage {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: string;
  image: string;
}

const dummyPackages: TourPackage[] = [
  {
    id: "1",
    title: "Gulmarg Adventure",
    location: "Gulmarg & Srinagar",
    duration: "5 Days",
    price: "₹24,999",
    image:
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    title: "Pahalgam Romance",
    location: "Pahalgam Valley",
    duration: "4 Days",
    price: "₹19,999",
    image:
      "https://images.unsplash.com/photo-1646204892016-711ed35535ec?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "3",
    title: "Srinagar Lakes",
    location: "Dal & Nigeen Lake",
    duration: "3 Days",
    price: "₹14,999",
    image:
      "https://images.unsplash.com/photo-1564329494258-3f72215ba175?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "4",
    title: "Sonamarg Escape",
    location: "Sonamarg & Beyond",
    duration: "6 Days",
    price: "₹29,999",
    image:
      "https://images.unsplash.com/photo-1666698591954-440987ef6ba6?q=80&w=3089&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "5",
    title: "Kashmir Complete",
    location: "All Major Spots",
    duration: "7 Days",
    price: "₹39,999",
    image:
      "https://images.unsplash.com/photo-1616190419596-e2839e7380d7?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// Reusable PackageCard Component
const PackageCard = ({ pkg }: { pkg: TourPackage }) => (
  <motion.div
    className="flex-none snap-center w-[300px] md:w-[280px] lg:w-[320px] group"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <div className="relative h-[420px] rounded-3xl overflow-hidden">
      
      {/* Background Image */}
      <img
        src={pkg.image}
        alt={pkg.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Top Badge */}
      <div className="absolute top-4 left-4">
        <div className="bg-white/70 backdrop-blur-md text-gray-900 px-3 py-1 rounded-full text-xs font-medium">
          {pkg.duration}
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        
        {/* Location */}
        <div className="flex items-center space-x-1 text-sm text-white/80 mb-1">
          <MapPin className="w-4 h-4" />
          <span>{pkg.location}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg lg:text-xl font-semibold leading-tight mb-2">
          {pkg.title}
        </h3>

        {/* Bottom Row */}
        <div className="flex items-center justify-between">
          
          {/* Price */}
          <div>
            <div className="text-lg font-semibold">{pkg.price}</div>
            <div className="text-xs text-white/70">starting from</div>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
            <ArrowRight className="w-4 h-4" />
          </div>

        </div>
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 group-hover:ring-white/30 transition-all duration-500" />

    </div>
  </motion.div>
);

export default function PopularPackagesCarousel() {
  return (
    <section className="bg-sky-50 py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-cyan-300/20 blur-3xl rounded-full" />
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-sky-500 text-xs font-medium uppercase tracking-[0.3em] mb-4">
            Popular Packages
          </div>
          <h2 className="bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent text-3xl lg:text-4xl font-bold mb-4">
            Quick Picks for Your Kashmir Trip
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Handpicked packages designed for every kind of traveler.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <motion.div
            className="flex overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory gap-6 px-6 -mx-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {dummyPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <PackageCard pkg={pkg} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
