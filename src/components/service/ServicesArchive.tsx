"use client";

import { motion } from "framer-motion";
import { servicesData } from "@/lib/constants";
import ServiceCard from "./ServiceCard";
import TreeConnector from "./TreeConnector";

export default function ServicesArchive() {
  // Splitting data into two rows to map to our 4-column grid layout
  const row1 = servicesData.slice(0, 4);
  const row2 = servicesData.slice(4, 8);

  return (
    <section className="py-12 md:py-20 bg-[#fafdfc] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge / Title */}
        <div className="flex justify-center mb-0 lg:mb-0">
          <div className="bg-sky-400 text-white font-semibold tracking-wide text-sm px-8 py-2.5 rounded-full shadow-md shadow-sky-200/50 uppercase z-10 relative">
            Our Services
          </div>
        </div>

        {/* Motion Container to stagger children animations */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="relative"
        >
          {/* ROW 1 */}
          <TreeConnector isFirst={true} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-6 lg:mt-0">
            {row1.map((service) => (
              <ServiceCard key={service.id} data={service} />
            ))}
          </div>

          {/* Spacer for Mobile (where the tree connector is hidden) */}
          <div className="h-6 lg:hidden" />

          {/* ROW 2 */}
          <TreeConnector />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-6 lg:mt-0">
            {row2.map((service) => (
              <ServiceCard key={service.id} data={service} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
