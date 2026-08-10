"use client";

import { motion, Variants } from "framer-motion";
import { Star, ShieldCheck, Users, Quote } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 24 } 
  },
};

const floatVariants: Variants = {
  animate: {
    y: [0, -12, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function ReviewHero() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      // Added overflow-hidden so the background image doesn't spill out
      className="relative w-full bg-sky-50 shadow-sm min-h-[600px] lg:min-h-[750px] flex items-center border-b border-slate-200 overflow-hidden"
    >
      {/* --- NEW: Fading Background Image --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* 1. The actual image (Replace src with your Kashmir landscape image) */}
        <img 
          src="https://images.unsplash.com/photo-1567601169793-64703dc5324a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGthc2htaXJ8ZW58MHx8MHx8fDA%3D" 
          alt="Kashmir landscape background" 
          className="absolute inset-0 w-full h-full object-cover object-[75%_center]"
        />
        
        {/* 2. The Gradient Overlay */}
        {/* On mobile: mostly solid overlay for text readability. On Desktop: Fades left to right! */}
        <div className="absolute inset-0 bg-sky-50/90 lg:bg-transparent lg:bg-gradient-to-r lg:from-sky-50 lg:from-45% lg:via-sky-50/80 lg:to-transparent" />
        
        {/* 3. Decorative Blob (Kept for that extra magical glow on the right) */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 sm:w-[600px] sm:h-[600px] rounded-full bg-sky-200/40 blur-3xl mix-blend-overlay" />
      </div>
      {/* ---------------------------------- */}

      {/* Inner Container: Keeps content centered on huge screens */}
      {/* Inner Container: Keeps content centered on huge screens */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-16 sm:py-16 flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Text Content */}
        <div className="space-y-8 w-full text-center lg:text-left">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 shadow-sm">
            <Quote className="w-4 h-4 text-sky-500 fill-sky-500/20" />
            <span className="text-sky-600 text-xs sm:text-sm font-bold uppercase tracking-wider">
              Traveler Stories
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Real memories <br />
            from <br className="hidden sm:block lg:hidden" />
            <span className="text-sky-500">real travelers.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-slate-700 text-lg sm:text-xl font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
            Don't just take our word for it. Read honest, verified reviews from guests who have experienced the magic of Kashmir with us.
          </motion.p>
        </div>

        {/* Right Column: Responsive Zig-Zag Flexbox */}
        <div className="flex flex-col sm:flex-row lg:flex-col justify-center items-center sm:items-stretch lg:items-center gap-6 sm:gap-8 w-full py-6">
          
          {/* Top Badge */}
          <motion.div variants={itemVariants} className="w-full sm:w-auto lg:self-end lg:mr-10">
            <motion.div variants={floatVariants} animate="animate" className="bg-white/90 backdrop-blur-sm border border-slate-200 p-5 sm:p-6 rounded-2xl shadow-lg shadow-slate-200/50 flex items-center gap-5 w-full sm:w-72">
              <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                <Star className="w-7 h-7 text-amber-400 fill-amber-400" />
              </div>
              <div className="text-left">
                <p className="text-2xl sm:text-3xl font-bold text-slate-900 leading-none mb-1">4.9/5</p>
                <p className="text-sm font-medium text-slate-500">Average Rating</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Middle Badge */}
          <motion.div variants={itemVariants} className="w-full sm:w-auto lg:self-start lg:ml-6">
            <motion.div variants={floatVariants} animate="animate" style={{ animationDelay: "1s" }} className="bg-white/90 backdrop-blur-sm border border-slate-200 p-5 sm:p-6 rounded-2xl shadow-lg shadow-slate-200/50 flex items-center gap-5 w-full sm:w-72">
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-7 h-7 text-green-500" />
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-slate-900 leading-tight mb-0.5">100% Verified</p>
                <p className="text-sm font-medium text-slate-500">Authentic Reviews</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Badge */}
          <motion.div variants={itemVariants} className="w-full sm:w-auto lg:self-end">
            <motion.div variants={floatVariants} animate="animate" style={{ animationDelay: "2s" }} className="bg-white/90 backdrop-blur-sm border border-slate-200 p-5 sm:p-6 rounded-2xl shadow-lg shadow-slate-200/50 flex items-center gap-5 w-full sm:w-80">
              <div className="w-14 h-14 rounded-full bg-sky-50 flex items-center justify-center shrink-0">
                <Users className="w-7 h-7 text-sky-500" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-slate-900 leading-none mb-1">10,000+</p>
                <p className="text-sm font-medium text-slate-500">Happy Travelers Hosted</p>
              </div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </motion.div>
  );
}