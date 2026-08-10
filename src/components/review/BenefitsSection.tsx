"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function BenefitsSection() {
  const benefits = [
    "Trusted by thousands",
    "Quality you can count on",
    "Dedicated support",
    "Hassle-free experience"
  ];

  return (
    <section className="bg-white py-12 sm:py-16 mt-16 sm:mt-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 tracking-tight">
            Why Customers Choose Us
          </h2>
          <div className="h-1 w-16 bg-sky-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="group flex items-center space-x-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-sky-200 hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-default"
            >
              <div className="flex-shrink-0 bg-sky-50 group-hover:bg-sky-100 p-3 rounded-full transition-colors duration-300">
                <svg 
                  className="w-5 h-5 sm:w-6 sm:h-6 text-sky-500 group-hover:scale-105 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-base sm:text-lg font-medium text-slate-800 group-hover:text-sky-900 transition-colors duration-300">
                {benefit}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}