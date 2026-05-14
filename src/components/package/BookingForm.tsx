"use client";

import { useState } from "react";

export default function BookingCard({ pkg }: { pkg: any }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    travelDate: "",
    travelerCount: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    // Name Validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    // Phone Validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone.trim())) {
      newErrors.phone = "Valid phone number required.";
      isValid = false;
    }

    // Email Validation (Optional but formatted if present)
    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Valid email address required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Construct CRM Comments (Only include optional fields if they have values)
      let comments = `Inquiry Source:- Package Booking Form Package Name:- ${pkg.title}`;
      if (formData.travelDate) {
        comments += ` Travel Date:- ${formData.travelDate}`;
      }
      if (formData.travelerCount) {
        comments += ` Traveler Count:- ${formData.travelerCount}`;
      }
      if (formData.email.trim()) {
        comments += ` Email Address:- ${formData.email.trim()}`;
      }
      if (formData.message.trim()) {
        comments += ` User Message:- ${formData.message.trim()}`;
      }

      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        serviceType: comments,
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
          data.message || "Failed to submit enquiry. Please try again."
        );
      }

      setStatus({
        type: "success",
        message: "Your enquiry has been submitted successfully.",
      });

      // Clear form on success
      setFormData({
        name: "",
        phone: "",
        email: "",
        travelDate: "",
        travelerCount: "",
        message: "",
      });
    } catch (error: any) {
      setStatus({
        type: "error",
        message:
          error.message || "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sticky top-28 w-full min-w-0 px-2 sm:px-0">
      <div className="rounded-3xl border border-sky-100/60 bg-white p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
        <div className="mb-4 border-b border-slate-100 pb-4">
          <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.24em] text-sky-500">
            Enquiry Form
          </p>
          <h3 className="font-heading text-xl font-bold text-slate-900">
            Plan Your Trip
          </h3>
          <p className="mt-2 text-sm leading-5 text-slate-500">
            Share your dates and group size for{" "}
            <span className="font-medium text-slate-700">{pkg.title}</span>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="min-w-0 space-y-3.5">
          {/* Status Messages */}
          {status.message && (
            <div
              className={`rounded-2xl border px-4 py-3 text-sm ${
                status.type === "success"
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {status.message}
            </div>
          )}

          <div className="min-w-0">
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className={`w-full rounded-2xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:bg-white ${
                errors.name
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-200 focus:border-sky-400"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="min-w-0 grid gap-4 sm:grid-cols-2">
            <div className="min-w-0">
              <label
                htmlFor="phone"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className={`w-full min-w-0 rounded-2xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:bg-white ${
                  errors.phone
                    ? "border-red-400 focus:border-red-500"
                    : "border-slate-200 focus:border-sky-400"
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
              )}
            </div>
            <div className="min-w-0 hidden md:block">
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full min-w-0 rounded-2xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:bg-white ${
                  errors.email
                    ? "border-red-400 focus:border-red-500"
                    : "border-slate-200 focus:border-sky-400"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="hidden min-w-0 md:grid gap-4 sm:grid-cols-2">
            <div className="min-w-0">
              <label
                htmlFor="travelDate"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Travel Date
              </label>
              <input
                id="travelDate"
                name="travelDate"
                type="date"
                value={formData.travelDate}
                onChange={handleChange}
                className="w-full min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-sky-400 focus:bg-white"
              />
            </div>
            <div className="min-w-0">
              <label
                htmlFor="travelerCount"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Traveler Count
              </label>
              <input
                id="travelerCount"
                name="travelerCount"
                type="number"
                min="1"
                value={formData.travelerCount}
                onChange={handleChange}
                placeholder="2"
                className="w-full min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-sky-400 focus:bg-white"
              />
            </div>
          </div>

          <div className="min-w-0 hidden md:block">
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Share preferences or any special request."
              className="w-full min-w-0 resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-sky-400 focus:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-[#3B82F6] py-4 text-[0.95rem] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2563EB] disabled:cursor-not-allowed disabled:opacity-75 disabled:hover:translate-y-0"
          >
            {isSubmitting ? "Sending..." : "Send Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
}