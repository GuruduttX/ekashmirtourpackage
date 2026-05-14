"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  HeartHandshake,
  MessageSquareText,
  Phone,
  Send,
  User,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function BlogInquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", phone: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        serviceType: `Inquiry Source:- Blog Inquiry Form, User Message:- ${formData.message.trim()}`,
      };

      const response = await fetch("/api/simbark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Attempt to parse JSON if the API returns it
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong. Please try again.",
        );
      }

      setSuccessMessage("Your enquiry has been submitted successfully.");
      setFormData({ name: "", phone: "", message: "" });
    } catch (error: any) {
      setErrorMessage(
        error.message || "Failed to submit enquiry. Please try again later.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUpVariants}
      className="relative overflow-hidden rounded-[2rem] md:border border-sky-100/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(240,249,255,0.82))] md:p-6 shadow-[0_25px_80px_rgba(14,165,233,0.08)] backdrop-blur-2xl"
    >
      {/* Ambient Glow Layers */}
      <div className="absolute -right-16 top-0 h-44 w-44 rounded-full bg-sky-400/15 blur-[100px]" />
      <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-cyan-400/10 blur-[90px]" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-1">
            {/* Icon Container */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.4rem] border border-sky-100 bg-white/80 shadow-[0_10px_30px_rgba(14,165,233,0.08)] backdrop-blur-xl">
              <HeartHandshake className="h-6 w-6 text-sky-500" />
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/70 px-3 py-1.5 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-sky-700">
                Personalized Travel Planning
              </span>
            </div>
          </div>

          <div>
            <h3 className="mt-4 text-[1.8rem] leading-[1] tracking-[-0.05em] font-extralight text-slate-900">
              Start Your
              <span className="block bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-400 bg-clip-text text-transparent font-medium">
                Kashmir Journey
              </span>
            </h3>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          {/* Global Status Messages */}
          {successMessage && (
            <div className="flex items-center gap-2 rounded-2xl border border-green-200 bg-green-50/80 p-4 text-sm text-green-700 backdrop-blur-md">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
              <p>{successMessage}</p>
            </div>
          )}

          {errorMessage && (
            <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-700 backdrop-blur-md">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Name */}
          <div>
            <div className="group relative">
              <User className="pointer-events-none absolute left-5 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-sky-500" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className={`h-14 w-full rounded-2xl border bg-white/75 pl-14 pr-5 text-[15px] text-slate-700 outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-slate-400 focus:bg-white focus:shadow-[0_10px_30px_rgba(14,165,233,0.08)] ${
                  errors.name
                    ? "border-red-400 focus:border-red-500"
                    : "border-white/70 focus:border-sky-200"
                }`}
              />
            </div>
            {errors.name && (
              <p className="mt-1.5 ml-3 text-xs font-medium text-red-500">
                {errors.name}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <div className="group relative">
              <Phone className="pointer-events-none absolute left-5 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-sky-500" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className={`h-14 w-full rounded-2xl border bg-white/75 pl-14 pr-5 text-[15px] text-slate-700 outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-slate-400 focus:bg-white focus:shadow-[0_10px_30px_rgba(14,165,233,0.08)] ${
                  errors.phone
                    ? "border-red-400 focus:border-red-500"
                    : "border-white/70 focus:border-sky-200"
                }`}
              />
            </div>
            {errors.phone && (
              <p className="mt-1.5 ml-3 text-xs font-medium text-red-500">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="group relative">
            <MessageSquareText className="pointer-events-none absolute left-5 top-5 z-10 h-5 w-5 text-slate-400 transition-colors duration-300 group-focus-within:text-sky-500" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Tell us about the kind of Kashmir experience you want..."
              className="w-full resize-none rounded-[1.7rem] border border-white/70 bg-white/75 pl-14 pr-5 pt-5 text-[15px] text-slate-700 outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-slate-400 focus:border-sky-200 focus:bg-white focus:shadow-[0_10px_30px_rgba(14,165,233,0.08)]"
            />
          </div>

          {/* CTA */}
          <motion.button
            whileHover={!isLoading ? { y: -2 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
            transition={{ duration: 0.3 }}
            type="submit"
            disabled={isLoading}
            className="group mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-slate-950 px-7 py-4 text-sm font-medium text-white shadow-[0_20px_50px_rgba(15,23,42,0.18)] transition-all duration-500 hover:bg-sky-500 disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:bg-slate-950"
          >
            {isLoading ? "Sending..." : "Plan My Kashmir Trip"}
            {!isLoading && (
              <Send className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
