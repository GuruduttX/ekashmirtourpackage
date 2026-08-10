"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
        className="
          mx-auto max-w-5xl
          relative overflow-hidden rounded-3xl
          border border-white/10
          bg-white/[0.06]
          shadow-2xl shadow-black/20
          backdrop-blur-xl
          hover:-translate-y-1.5
          hover:border-sky-400/20
          hover:shadow-sky-500/10
          transition-all duration-500 ease-out
          group
        "
      >
        <div
          className="
            absolute inset-0
            scale-110
            bg-cover bg-center
            opacity-25
            blur-3xl
            transition-all duration-700
            group-hover:scale-105
            group-hover:opacity-35
          "
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TW91bnRhaW5zfGVufDB8fDB8fHw"
          alt="Kashmir landscape background" 
          className="absolute inset-0 w-full h-full object-cover object-[75%_center]"
        />

        <div className="absolute inset-0 bg-sky-950/70 backdrop-blur-xl" />

        <div className="absolute top-0 right-0 -mr-16 -mt-16 sm:-mr-20 sm:-mt-20 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-white-500/20 blur-2xl sm:blur-3xl transition-all duration-700 group-hover:bg-sky-500/30" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 sm:-ml-20 sm:-mb-20 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-white-500/10 blur-2xl sm:blur-3xl transition-all duration-700 group-hover:bg-sky-500/20" />

        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.10] via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-[1px] rounded-[calc(1.5rem-1px)] border border-white/[0.05] pointer-events-none" />

        <div className="relative z-10 px-6 py-12 sm:px-12 sm:py-20 text-center">
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
          >
            Ready to experience it yourself?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sky-100/80 text-base sm:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Join thousands of happy customers who have already
            discovered the magic of eKashmir.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3.5 sm:py-4 text-base font-semibold text-white bg-sky-500/90 rounded-full border border-sky-300/20 shadow-lg shadow-sky-500/30 hover:bg-sky-400 hover:shadow-sky-500/50 hover:-translate-y-0.5 hover:scale-105 active:scale-95 active:translate-y-0 transition-all duration-300"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}