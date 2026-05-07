"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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

export default function ContactExperience() {
  const [selectedTrip, setSelectedTrip] = useState<string | null>("honeymoon");

  // Framer Motion Variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] },
    },
  };

  const inputClasses =
    "w-full bg-white/75 backdrop-blur-xl border border-sky-100 rounded-xl px-4 py-3.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300 focus:shadow-[0_0_25px_rgba(14,165,233,0.14)] transition-all duration-300 font-light";

  const tripTypes = [
    { id: "honeymoon", label: "Honeymoon", icon: Heart },
    { id: "family", label: "Family", icon: Users },
    { id: "adventure", label: "Adventure", icon: Mountain },
  ];

  return (
    <section className="relative w-full py-24 lg:py-32 bg-gradient-to-b from-sky-50 via-white to-cyan-50 overflow-hidden">
      {/* --- CINEMATIC BACKGROUND ATMOSPHERE --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft Ambient Orbs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-400/20 rounded-full blur-[150px] -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-400/20 rounded-full blur-[120px] translate-y-1/4 -translate-x-1/4" />
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.05] mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* --- LEFT COLUMN: PREMIUM CONSULTATION FORM --- */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7"
          >
            <div className="p-8 sm:p-10 lg:p-12 rounded-[2.5rem] bg-white/65 backdrop-blur-2xl border border-sky-100 shadow-[0_20px_60px_rgba(14,165,233,0.14)] relative overflow-hidden before:absolute before:inset-0 before:rounded-[2.5rem] before:bg-gradient-to-br before:from-white/20 before:to-transparent before:pointer-events-none">
              {/* Form Ambient Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />

              {/* Form Header */}
              <motion.div variants={fadeUpVariant} className="mb-10">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-100 bg-sky-100/50 text-sky-600 uppercase tracking-[0.2em] text-[10px] sm:text-xs font-bold mb-5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Personalized Travel Consultation
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 leading-tight tracking-tight mb-4 drop-shadow-sm drop-shadow-[0_0_25px_rgba(255,255,255,0.08)]">
                  Plan Your{" "}
                  <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-400">
                    Kashmir Journey
                  </span>
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                  Share your dream experience with us. Our luxury travel
                  concierges will curate an unforgettable itinerary tailored
                  precisely to your pace and preferences.
                </p>
              </motion.div>

              {/* Form Fields */}
              <form className="space-y-6">
                {/* 2-Column Row */}
                <motion.div
                  variants={fadeUpVariant}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                  <div className="space-y-2">
                    <label className="text-xs text-slate-600 uppercase tracking-widest pl-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className={inputClasses}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-slate-600 uppercase tracking-widest pl-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className={inputClasses}
                    />
                  </div>
                </motion.div>

                {/* 2-Column Row */}
                <motion.div
                  variants={fadeUpVariant}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                  <div className="space-y-2">
                    <label className="text-xs text-slate-600 uppercase tracking-widest pl-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className={`${inputClasses} pl-11`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-slate-600 uppercase tracking-widest pl-1">
                      Travel Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="e.g. October 2024"
                        className={`${inputClasses} pl-11`}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* 2-Column Row */}
                <motion.div
                  variants={fadeUpVariant}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                  <div className="space-y-2">
                    <label className="text-xs text-slate-600 uppercase tracking-widest pl-1">
                      Travelers
                    </label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="2 Adults, 1 Child"
                        className={`${inputClasses} pl-11`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-slate-600 uppercase tracking-widest pl-1">
                      Estimated Budget
                    </label>
                    <div className="relative">
                      <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Your comfortable range"
                        className={`${inputClasses} pl-11`}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Trip Type Selector */}
                <motion.div variants={fadeUpVariant} className="space-y-3 pt-2">
                  <label className="text-xs text-slate-600 uppercase tracking-widest pl-1">
                    Style of Journey
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {tripTypes.map((trip) => {
                      const isSelected = selectedTrip === trip.id;
                      return (
                        <button
                          key={trip.id}
                          type="button"
                          onClick={() => setSelectedTrip(trip.id)}
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 text-sm font-medium hover:-translate-y-1 ${
                            isSelected
                              ? "bg-sky-500/10 border-sky-100 text-sky-700 shadow-[0_0_20px_rgba(14,165,233,0.12)]"
                              : "bg-white/70 border-sky-100 text-slate-600 hover:bg-white/80 hover:text-slate-700 hover:border-sky-200"
                          }`}
                        >
                          <trip.icon
                            className={`w-4 h-4 ${isSelected ? "text-sky-500" : "text-slate-500"}`}
                          />
                          {trip.label}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Textarea */}
                <motion.div variants={fadeUpVariant} className="space-y-2 pt-2">
                  <label className="text-xs text-slate-600 uppercase tracking-widest pl-1">
                    Your Vision
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your dream Kashmir experience, specific places you wish to visit, or any special requirements..."
                    className={`${inputClasses} resize-none leading-relaxed`}
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={fadeUpVariant} className="pt-4">
                  <button
                    type="submit"
                    className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-400 text-white font-semibold shadow-[0_20px_50px_rgba(14,165,233,0.20)] hover:shadow-[0_25px_60px_rgba(14,165,233,0.26)] hover:-translate-y-1 transition-all duration-300"
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
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Quick Response Promise */}
            <motion.div
              variants={fadeUpVariant}
            className="flex items-center gap-4 p-5 rounded-2xl bg-white/65 border border-sky-100 backdrop-blur-2xl shadow-[0_10px_30px_rgba(14,165,233,0.08)]"
          >
              <div className="p-3 rounded-full bg-sky-400/20 text-sky-500">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-slate-900 font-medium text-sm">
                  Quick Response Promise
                </p>
                <p className="text-slate-600 text-xs mt-0.5">
                  We typically respond within 30 minutes.
                </p>
              </div>
            </motion.div>

            {/* Standard Contact Cards */}
            <motion.div
              variants={fadeUpVariant}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4"
            >
              <div className="group p-6 rounded-2xl bg-white/65 border border-sky-100 backdrop-blur-2xl shadow-[0_10px_30px_rgba(14,165,233,0.08)] hover:bg-white/80 hover:border-sky-200 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <Phone className="w-6 h-6 text-sky-500 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-slate-800 font-semibold mb-1">Call Us</h4>
                <p className="text-sky-500 text-sm font-medium">
                  +91 98765 43210
                </p>
                <p className="text-slate-500 text-xs mt-2">
                  Mon-Sat, 9AM to 8PM
                </p>
              </div>

              <div className="group p-6 rounded-2xl bg-white/65 border border-sky-100 backdrop-blur-2xl shadow-[0_10px_30px_rgba(14,165,233,0.08)] hover:bg-white/80 hover:border-sky-200 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <Mail className="w-6 h-6 text-sky-500 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-slate-800 font-semibold mb-1">
                  Email Support
                </h4>
                <p className="text-cyan-500 text-sm font-medium">
                  hello@kashmirjourney.com
                </p>
                <p className="text-slate-500 text-xs mt-2">
                  Drop us a line anytime
                </p>
              </div>
            </motion.div>

            {/* Office Location */}
            <motion.div
              variants={fadeUpVariant}
              className="group flex items-start gap-4 p-6 rounded-2xl bg-white/65 border border-sky-100 backdrop-blur-2xl shadow-[0_10px_30px_rgba(14,165,233,0.08)] hover:bg-white/80 transition-all duration-300 hover:-translate-y-1"
            >
              <MapPin className="w-6 h-6 text-cyan-500 shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <h4 className="text-slate-800 font-semibold mb-1">
                  Srinagar Office
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Boulevard Road, Dal Lake,
                  <br />
                  Srinagar, Jammu & Kashmir 190001
                </p>
              </div>
            </motion.div>

            {/* Highlighted WhatsApp CTA */}
            <motion.div
              variants={fadeUpVariant}
              className="relative group p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-sky-500/10 to-cyan-400/10 border border-sky-200 backdrop-blur-xl hover:border-sky-200 transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer mt-2"
            >
              <div className="absolute inset-0 bg-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-start xl:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <MessageCircle className="w-6 h-6 text-cyan-500" />
                    <h4 className="text-slate-900 font-semibold text-lg">
                      WhatsApp Support
                    </h4>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed max-w-xs font-light">
                    Prefer a quick chat? Our travel concierges are online and
                    ready to assist you instantly.
                  </p>
                </div>
                <button className="shrink-0 px-6 py-2.5 rounded-full bg-sky-500/15 text-sky-700 border border-sky-200 text-sm font-semibold group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300">
                  Chat Now
                </button>
              </div>
            </motion.div>

            {/* Mini Trust Stats */}
            <motion.div
              variants={fadeUpVariant}
              className="flex flex-wrap gap-3 mt-4"
            >
              <span className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/70 border border-sky-50 text-slate-700 text-xs font-medium backdrop-blur-sm shadow-[0_4px_20px_rgba(14,165,233,0.05)]">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" /> 10,000+
                Travelers
              </span>
              <span className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/70 border border-sky-50 text-slate-700 text-xs font-medium backdrop-blur-sm shadow-[0_4px_20px_rgba(14,165,233,0.05)]">
                <Sparkles className="w-3.5 h-3.5 text-cyan-500" /> 4.9/5 Rated
              </span>
              <span className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/70 border border-sky-50 text-slate-700 text-xs font-medium backdrop-blur-sm shadow-[0_4px_20px_rgba(14,165,233,0.05)]">
                <MapPin className="w-3.5 h-3.5 text-cyan-500" /> Local Experts
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
