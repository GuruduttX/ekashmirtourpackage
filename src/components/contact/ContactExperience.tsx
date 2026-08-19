"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  Sparkles,
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ShieldCheck,
  Heart,
  Mountain,
  Users,
  Calendar,
  Wallet,
} from "lucide-react";
import { whatsappLink, WHATSAPP_TEL, WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import { CONTACT_EMAIL, mailtoLink, ADDRESS_LINES } from "@/lib/contact";

export default function ContactExperience() {
  const [selectedTrip, setSelectedTrip] = useState<string | null>("honeymoon");

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // OPTIMIZATION: text-[16px] prevents iOS Safari auto-zoom on focus. py-3.5 increases touch target.
  const inputClasses =
    "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 sm:py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-300 font-light text-[16px] sm:text-sm";

  const tripTypes = [
    { id: "honeymoon", label: "Honeymoon", icon: Heart },
    { id: "family", label: "Family", icon: Users },
    { id: "adventure", label: "Adventure", icon: Mountain },
  ];

  return (
    // OPTIMIZATION: Reduced vertical padding on mobile (py-6)
    <section className="relative w-full min-h-screen flex items-center py-6 sm:py-12 bg-slate-50 overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start lg:items-center">
          
          {/* --- LEFT COLUMN: PREMIUM CONSULTATION FORM --- */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-7"
          >
            {/* OPTIMIZATION: Reduced padding (p-5) and border radius on mobile */}
            <div className="p-5 sm:p-8 lg:p-10 rounded-[1.5rem] sm:rounded-[2rem] bg-white border border-slate-200 shadow-sm relative overflow-hidden">
              <motion.div variants={fadeUpVariant} className="mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-sky-100 bg-sky-50 text-sky-600 uppercase tracking-wider text-[10px] font-bold mb-3">
                  <Sparkles className="w-3 h-3" />
                  Personalized Travel
                </span>
                {/* OPTIMIZATION: Scaled down text size for mobile */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight tracking-tight mb-2">
                  Plan Your <span className="text-sky-500">Kashmir Journey</span>
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed font-light">
                  Share your dream experience with us. Our luxury travel
                  concierges will curate an unforgettable itinerary.
                </p>
              </motion.div>

              {/* OPTIMIZATION: Adjusted spacing in form (space-y-4 instead of 5 for tighter mobile fit) */}
              <form className="space-y-4 sm:space-y-5">
                <motion.div variants={fadeUpVariant} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider pl-1">
                      Full Name
                    </label>
                    <input type="text" placeholder="John Doe" className={inputClasses} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider pl-1">
                      Email Address
                    </label>
                    <input type="email" placeholder="john@example.com" className={inputClasses} />
                  </div>
                </motion.div>

                <motion.div variants={fadeUpVariant} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider pl-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="tel" placeholder="+1 (555) 000-0000" className={`${inputClasses} pl-10`} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider pl-1">
                      Travel Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="text" placeholder="e.g. October 2024" className={`${inputClasses} pl-10`} />
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeUpVariant} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider pl-1">
                      Travelers
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="text" placeholder="2 Adults, 1 Child" className={`${inputClasses} pl-10`} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider pl-1">
                      Estimated Budget
                    </label>
                    <div className="relative">
                      <Wallet className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="text" placeholder="Your comfortable range" className={`${inputClasses} pl-10`} />
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeUpVariant} className="space-y-2 pt-1">
                  <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider pl-1">
                    Style of Journey
                  </label>
                  {/* OPTIMIZATION: Grid layout for trip types on mobile to prevent wrapping issues */}
                  <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-2">
                    {tripTypes.map((trip) => {
                      const isSelected = selectedTrip === trip.id;
                      return (
                        <button
                          key={trip.id}
                          type="button"
                          onClick={() => setSelectedTrip(trip.id)}
                          className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2.5 sm:py-2 rounded-xl sm:rounded-full border transition-all duration-200 text-[11px] sm:text-xs font-medium ${
                            isSelected
                              ? "bg-sky-500 border-sky-500 text-white shadow-sm"
                              : "bg-white border-slate-200 text-slate-600 hover:border-sky-500 hover:text-sky-500"
                          }`}
                        >
                          <trip.icon className={`w-4 h-4 sm:w-3.5 sm:h-3.5 ${isSelected ? "text-white" : "text-slate-400"}`} />
                          {trip.label}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>

                <motion.div variants={fadeUpVariant} className="space-y-1.5 pt-1">
                  <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider pl-1">
                    Your Vision
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Specific places you wish to visit, or any special requirements..."
                    className={`${inputClasses} resize-none leading-relaxed`}
                  />
                </motion.div>

                <motion.div variants={fadeUpVariant} className="pt-3">
                  {/* OPTIMIZATION: Increased py-3.5 to py-4 on mobile for a larger submit button */}
                  <button
                    type="submit"
                    className="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 sm:py-3.5 rounded-full bg-sky-500 text-white text-sm font-semibold shadow-md hover:bg-sky-600 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Start Planning My Journey
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* --- RIGHT COLUMN: CONTACT INFO & TRUST --- */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-5 flex flex-col gap-3 sm:gap-4"
          >
            <motion.div variants={fadeUpVariant} className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-[1.5rem] bg-white border border-slate-200 shadow-sm">
              <div className="p-2.5 sm:p-3 rounded-full bg-sky-50 text-sky-500">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-slate-900 font-bold text-sm">Quick Response Promise</p>
                <p className="text-slate-500 text-xs mt-0.5">We typically respond within 30 minutes.</p>
              </div>
            </motion.div>

            {/* OPTIMIZATION: Ensure grid drops perfectly to 2 columns on small mobile to save space */}
            <motion.div variants={fadeUpVariant} className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
              <div className="group p-4 sm:p-6 rounded-[1.5rem] bg-white border border-slate-200 shadow-sm hover:border-sky-300 transition-colors duration-200 cursor-pointer">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-sky-500 mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="text-slate-900 text-xs sm:text-sm font-bold mb-0.5 sm:mb-1">Call Us</h4>
                <a
                  href={`tel:${WHATSAPP_TEL}`}
                  className="text-sky-600 text-xs sm:text-sm font-medium break-all hover:underline"
                >
                  {WHATSAPP_DISPLAY}
                </a>
              </div>

              <div className="group p-4 sm:p-6 rounded-[1.5rem] bg-white border border-slate-200 shadow-sm hover:border-sky-300 transition-colors duration-200 cursor-pointer overflow-hidden">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-sky-500 mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="text-slate-900 text-xs sm:text-sm font-bold mb-0.5 sm:mb-1">Email</h4>
                <a
                  href={mailtoLink("Kashmir trip enquiry")}
                  className="block text-sky-600 text-xs sm:text-sm font-medium truncate hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="group flex items-start gap-3 sm:gap-4 p-4 sm:p-6 rounded-[1.5rem] bg-white border border-slate-200 shadow-sm hover:border-sky-300 transition-colors duration-200">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-sky-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <div>
                <h4 className="text-slate-900 text-sm font-bold mb-1">Srinagar Office</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {ADDRESS_LINES.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="relative group p-4 sm:p-6 rounded-[1.5rem] bg-sky-50 border border-sky-100 hover:border-sky-200 transition-colors duration-200 cursor-pointer">
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-start xl:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500" />
                    <h4 className="text-slate-900 font-bold text-sm">WhatsApp Support</h4>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed max-w-xs">
                    Prefer a quick chat? Our concierges are ready to assist you instantly.
                  </p>
                </div>
                {/* OPTIMIZATION: Make the button full width on mobile for easy tapping */}
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto shrink-0 px-6 py-3 sm:py-2.5 rounded-xl sm:rounded-full bg-white text-sky-600 border border-sky-200 text-xs font-bold shadow-sm text-center group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500 transition-colors duration-200"
                >
                  Chat Now
                </a>
              </div>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="flex flex-wrap gap-2 mt-1 sm:mt-2">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-500" /> 10k+ Travelers
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-sky-500" /> 4.9/5 Rated
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}