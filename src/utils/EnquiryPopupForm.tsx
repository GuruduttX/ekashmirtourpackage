"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Send, Check } from "lucide-react";

export interface EnquiryPopupFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOTAL_STEPS = 3;

export default function EnquiryPopupForm({
  isOpen,
  onClose,
}: EnquiryPopupFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "General Enquiry",
    bookingTimeline: "",
  });

  // Reset step to 1 when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setStep(1), 300); // Wait for exit animation
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleServiceSelect = (service: string) => {
    setFormData((prev) => ({ ...prev, service }));
  };

  const handleTimelineSelect = (timeline: string) => {
    setFormData((prev) => ({ ...prev, bookingTimeline: timeline }));
  };

  const canGoNext = () => {
    if (step === 1) {
      return (
        formData.name.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.phone.trim() !== "" &&
        formData.message.trim() !== ""
      );
    }
    if (step === 2) return !!formData.service;
    if (step === 3) return !!formData.bookingTimeline;
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add submission logic here
    onClose();
  };

  // Step Content Variants
  const stepVariants: Variants = {
    hidden: { opacity: 0, x: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      x: -20,
      filter: "blur(4px)",
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const services = ["Tour Package", "Activity", "General Enquiry"];
  const timelines = [
    "Immediate",
    "In 2 Days",
    "In 5 Days",
    "This Week",
    "Later Planning",
    "Just Reaching Out",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/60 bg-white/95 shadow-2xl backdrop-blur-2xl"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="relative px-6 pb-2 pt-8 sm:px-8 sm:pt-10">
              <button
                onClick={onClose}
                className="group absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/50 text-slate-400 backdrop-blur-md transition-all hover:scale-105 hover:border-slate-300 hover:text-slate-700"
                aria-label="Close"
              >
                <X className="h-4 w-4 transition-transform group-hover:rotate-90" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-slate-400">
                  <span>
                    STEP {step} OF {TOTAL_STEPS}
                  </span>
                </div>
                {/* Progress Bar */}
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 to-cyan-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>

            {/* Form Content */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col px-6 pb-8 sm:px-8"
            >
              <div className="relative min-h-[320px] py-6">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-4"
                    >
                      <h2 className="text-2xl font-light text-slate-900">
                        Your{" "}
                        <span className="font-medium text-sky-500">
                          Details
                        </span>
                      </h2>
                      <div className="space-y-3">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Full Name"
                          className="w-full rounded-2xl border border-slate-200 bg-white/50 px-4 py-3.5 text-sm text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-sky-400/50 focus:bg-white focus:ring-2 focus:ring-sky-400/20"
                          required
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            className="w-full rounded-2xl border border-slate-200 bg-white/50 px-4 py-3.5 text-sm text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-sky-400/50 focus:bg-white focus:ring-2 focus:ring-sky-400/20"
                            required
                          />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="w-full rounded-2xl border border-slate-200 bg-white/50 px-4 py-3.5 text-sm text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-sky-400/50 focus:bg-white focus:ring-2 focus:ring-sky-400/20"
                            required
                          />
                        </div>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your Kashmir travel plans..."
                          rows={3}
                          className="w-full resize-none rounded-2xl border border-slate-200 bg-white/50 px-4 py-3.5 text-sm text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-sky-400/50 focus:bg-white focus:ring-2 focus:ring-sky-400/20"
                          required
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-4"
                    >
                      <h2 className="text-2xl font-light text-slate-900">
                        How can we{" "}
                        <span className="font-medium text-sky-500">help?</span>
                      </h2>
                      <div className="space-y-3 pt-2">
                        {services.map((service) => (
                          <button
                            key={service}
                            type="button"
                            onClick={() => handleServiceSelect(service)}
                            className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all ${
                              formData.service === service
                                ? "border-sky-400 bg-sky-50/50 text-sky-700 shadow-sm shadow-sky-100"
                                : "border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:bg-slate-50"
                            }`}
                          >
                            <span className="text-sm font-medium">
                              {service}
                            </span>
                            <div
                              className={`flex h-5 w-5 items-center justify-center rounded-full border ${formData.service === service ? "border-sky-400 bg-sky-400 text-white" : "border-slate-300"}`}
                            >
                              {formData.service === service && (
                                <Check className="h-3 w-3" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-4"
                    >
                      <h2 className="text-2xl font-light text-slate-900">
                        When are you{" "}
                        <span className="font-medium text-sky-500">
                          planning?
                        </span>
                      </h2>
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        {timelines.map((timeline) => (
                          <button
                            key={timeline}
                            type="button"
                            onClick={() => handleTimelineSelect(timeline)}
                            className={`flex w-full flex-col items-center justify-center rounded-2xl border px-4 py-4 text-center transition-all ${
                              formData.bookingTimeline === timeline
                                ? "border-sky-400 bg-sky-50/50 text-sky-700 shadow-sm shadow-sky-100"
                                : "border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:bg-slate-50"
                            }`}
                          >
                            <span className="text-sm font-medium">
                              {timeline}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer Actions */}
              <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex items-center text-sm font-medium text-slate-400 transition-colors hover:text-slate-700"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Back
                  </button>
                ) : (
                  <div /> // Spacer
                )}

                {step < TOTAL_STEPS ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    disabled={!canGoNext()}
                    className="group flex items-center rounded-full bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next Step
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!canGoNext()}
                    className="group flex items-center rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02] hover:shadow-sky-500/40 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Send Enquiry
                    <Send className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
