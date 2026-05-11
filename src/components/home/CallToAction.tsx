"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import EnquiryPopupForm from "@/utils/EnquiryPopupForm";

export default function CallToAction() {
  const [isOpen, setOpen] = useState(false);
  return (
    <section className="relative py-16 lg:py-20 px-6 lg:px-12 bg-sky-50 overflow-hidden">
      <EnquiryPopupForm isOpen={isOpen} onClose={()=> setOpen(false)} />
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-cyan-300/20 blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden border border-white/20 bg-white/40 backdrop-blur-xl shadow-lg"
        >
          {/* Image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80"
              alt="Kashmir landscape"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/30" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 lg:py-20 max-w-3xl mx-auto">
            {/* Heading */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight mb-4">
              Not Sure Which Kashmir Trip is Right for You?
            </h2>

            {/* Subtext */}
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
              Tell us your preferences and our travel experts will craft a
              personalized itinerary just for you.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={()=> setOpen(true)}
                className="bg-gradient-to-r from-sky-500 to-cyan-400 text-white px-8 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Get Free Travel Plan
              </button>

              <Link
                href="#packages"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/60 hover:-translate-y-1 flex items-center justify-center"
              >
                Explore Packages
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
