"use client";

import { motion } from "framer-motion";
import FeatureList from "./FeatureList";
import { ServiceData } from "@/lib/constants";

export default function ServiceCard({ data }: { data: ServiceData }) {
  const Icon = data.icon;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className="group bg-white cursor-pointer rounded-2xl p-5 sm:p-6 border border-sky-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-cyan-200 hover:-translate-y-1 relative overflow-hidden"
    >
      {/* Very faint background tint on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/0 to-sky-50/0 group-hover:from-cyan-50/30 group-hover:to-sky-50/30 transition-colors duration-500 pointer-events-none z-0" />

      <div className="relative z-10">
        {/* Header (Icon & Image) */}
        <div className="flex justify-between items-start mb-5">
          <div className="w-12 h-12 flex items-center justify-center bg-cyan-50 text-cyan-600 rounded-xl border border-cyan-100/50 group-hover:scale-105 transition-transform duration-300">
            <Icon className="w-6 h-6" />
          </div>
          <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm border border-sky-50 shrink-0 bg-gray-100">
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 leading-tight">
          {data.title}
        </h3>

        {/* Features list */}
        <FeatureList features={data.features} />
      </div>
    </motion.div>
  );
}
