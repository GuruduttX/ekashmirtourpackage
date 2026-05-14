"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  X,
  ChevronRight,
  ChevronLeft,
  Send,
  CheckCircle2,
  Map,
} from "lucide-react";

export interface ServiceEnquiryPopupFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: string;
}

const TOTAL_STEPS = 3;

export default function ServiceEnquiryPopupForm({
  isOpen,
  onClose,
  selectedService,
}: ServiceEnquiryPopupFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: selectedService,
    name: "",
    phone: "",
    bookingTimeline: "Just Checking Out",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Sync selected service when modal opens or prop changes
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Reset form slightly after close animation completes
      setTimeout(() => {
        setStep(1);
        setFormData({
          service: selectedService,
          name: "",
          phone: "",
          bookingTimeline: "Just Checking Out",
        });
        setTouched({});
        setSubmitError("");
        setIsSubmitting(false);
      }, 300);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, selectedService]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, isSubmitting]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleTimelineSelect = (timeline: string) => {
    setFormData((prev) => ({ ...prev, bookingTimeline: timeline }));
  };

  // Validation Logic
  const isValidPhone = (phone: string) =>
    /^\+?[\d\s-]{10,}$/.test(phone.trim());

  const canGoNext = () => {
    if (step === 1) {
      return formData.name.trim() !== "" && isValidPhone(formData.phone);
    }
    return true;
  };

  // API Integration
  const handleSubmit = async () => {
    if (!canGoNext() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        serviceType: `Inquiry Source:- Service Enquiry Popup Form Selected Service:- ${formData.service} Booking Timeline:- ${formData.bookingTimeline}`,
      };

      const response = await fetch("/api/simbark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit enquiry. Please try again.",
        );
      }

      setStep(3); // Move to Success Screen
    } catch (error: any) {
      setSubmitError(
        error.message || "Something went wrong. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step Content Variants
  const stepVariants: Variants = {
    hidden: { opacity: 0, x: 15, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      x: -15,
      filter: "blur(4px)",
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const timelines = [
    "Immediate",
    "In 2 Days",
    "In 5 Days",
    "This Week",
    "Later Planning",
    "Just Checking Out",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Cinematic Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={!isSubmitting ? onClose : undefined}
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
            {/* Conditional Header (hidden on success step) */}
            {step < 3 && (
              <div className="relative px-6 pb-2 pt-8 sm:px-8 sm:pt-10">
                <button
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="group absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/50 text-slate-400 backdrop-blur-md transition-all hover:scale-105 hover:border-slate-300 hover:text-slate-700 focus:outline-none disabled:opacity-50 disabled:hover:scale-100 disabled:hover:border-slate-200 disabled:hover:text-slate-400"
                  aria-label="Close"
                >
                  <X className="h-4 w-4 transition-transform group-hover:rotate-90" />
                </button>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-slate-400">
                    <span>
                      STEP {step} OF {TOTAL_STEPS - 1}
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 to-cyan-400"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(step / (TOTAL_STEPS - 1)) * 100}%`,
                      }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Form & Content — onSubmit only prevents accidental browser submissions */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col px-6 pb-8 sm:px-8"
            >
              <div className="relative min-h-[260px] py-6">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-5"
                    >
                      <h2 className="text-2xl font-light text-slate-900">
                        Your{" "}
                        <span className="font-medium text-sky-500">
                          Details
                        </span>
                      </h2>

                      <div className="space-y-4">
                        {/* Locked Service Field */}
                        <div className="flex items-center rounded-2xl border border-sky-100 bg-sky-50/50 px-4 py-3.5 shadow-sm">
                          <Map className="mr-3 h-5 w-5 text-sky-400" />
                          <div className="flex flex-col">
                            <span className="text-xs font-medium text-sky-600">
                              Selected Service
                            </span>
                            <span className="text-sm font-medium text-slate-900 line-clamp-1">
                              {formData.service || "Premium Service"}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {/* Name Input */}
                          <div>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Full Name"
                              className={`w-full rounded-2xl border bg-white/50 px-4 py-3.5 text-sm text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 ${
                                touched.name && formData.name.trim() === ""
                                  ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                                  : "border-slate-200 focus:border-sky-400/50 focus:ring-sky-400/20"
                              }`}
                            />
                            {touched.name && formData.name.trim() === "" && (
                              <p className="ml-1 mt-1.5 text-[11px] font-medium text-red-500">
                                Name is required.
                              </p>
                            )}
                          </div>

                          {/* Phone Input */}
                          <div>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Phone Number"
                              className={`w-full rounded-2xl border bg-white/50 px-4 py-3.5 text-sm text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 ${
                                touched.phone &&
                                (formData.phone.trim() === "" ||
                                  !isValidPhone(formData.phone))
                                  ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                                  : "border-slate-200 focus:border-sky-400/50 focus:ring-sky-400/20"
                              }`}
                            />
                            {touched.phone && formData.phone.trim() === "" ? (
                              <p className="ml-1 mt-1.5 text-[11px] font-medium text-red-500">
                                Phone number is required.
                              </p>
                            ) : touched.phone &&
                              !isValidPhone(formData.phone) ? (
                              <p className="ml-1 mt-1.5 text-[11px] font-medium text-red-500">
                                Valid phone number required.
                              </p>
                            ) : null}
                          </div>
                        </div>
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
                      className="space-y-5"
                    >
                      <h2 className="text-2xl font-light text-slate-900 leading-tight">
                        When do you want <br />
                        <span className="font-medium text-sky-500">
                          to book?
                        </span>
                      </h2>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        {timelines.map((timeline) => (
                          <button
                            key={timeline}
                            type="button"
                            onClick={() => handleTimelineSelect(timeline)}
                            className={`flex w-full items-center justify-center rounded-2xl border px-3 py-4 text-center transition-all ${
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

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex min-h-[300px] flex-col items-center justify-center pt-8 text-center"
                    >
                      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
                        <CheckCircle2 className="h-10 w-10 text-green-500" />
                      </div>
                      <h2 className="mb-2 text-2xl font-medium text-slate-900">
                        Enquiry Sent
                      </h2>
                      <p className="mb-8 max-w-[280px] text-sm text-slate-500">
                        Your enquiry has been sent successfully. Our Kashmir
                        travel team will contact you shortly.
                      </p>
                      <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full bg-slate-900 px-8 py-3 text-sm font-medium text-white transition-all hover:bg-slate-800 hover:shadow-lg focus:outline-none"
                      >
                        Close Window
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer Actions (hidden on success step) */}
              {step < 3 && (
                <div className="mt-auto flex flex-col pt-2">
                  {/* Inline Error Message on Submit */}
                  <AnimatePresence>
                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-4 rounded-xl border border-red-200 bg-red-50/80 p-3 text-sm text-red-700 backdrop-blur-md"
                      >
                        {submitError}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={() => setStep((prev) => prev - 1)}
                        disabled={isSubmitting}
                        className="flex items-center text-sm font-medium text-slate-400 transition-colors hover:text-slate-700 focus:outline-none disabled:opacity-50 disabled:hover:text-slate-400"
                      >
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Back
                      </button>
                    ) : (
                      <div /> // Spacer to align Next/Complete to the right
                    )}

                    {step < TOTAL_STEPS - 1 ? (
                      <button
                        type="button"
                        onClick={() => setStep((prev) => prev + 1)}
                        disabled={!canGoNext()}
                        className="group flex items-center rounded-full bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/20 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Next
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!canGoNext() || isSubmitting}
                        className="group flex items-center rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02] hover:shadow-sky-500/40 focus:outline-none focus:ring-2 focus:ring-sky-400/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                      >
                        {isSubmitting ? "Sending..." : "Complete"}
                        {!isSubmitting && (
                          <Send className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
