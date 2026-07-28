"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/components/home/cta/whatsapp";

interface BookingPkg {
  title: string;
  price: string;
}

export default function BookingCard({ pkg }: { pkg: BookingPkg }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone.trim())) {
      newErrors.phone = "Valid phone number required.";
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
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        serviceType: `Inquiry Source:- Package Booking Form Package Name:- ${pkg.title}`,
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

      setFormData({ name: "", phone: "" });
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
    <div className="w-full min-w-0 px-2 sm:px-0">
      <div className="rounded-3xl border border-sky-100/60 bg-white p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
        {/* Price header */}
        <div className="mb-4 border-b border-slate-100 pb-4">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-sky-500">
            Trips starts from
          </p>
          <p className="mt-1 font-heading text-2xl font-extrabold text-slate-900">
            {pkg.price}
          </p>
          <p className="text-xs text-slate-500">Per person</p>
        </div>

        <form onSubmit={handleSubmit} className="min-w-0 space-y-2.5">
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
              className="mb-1 block text-xs font-medium text-slate-700"
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
              className={`w-full rounded-xl border bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:bg-white ${
                errors.name
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-200 focus:border-sky-400"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="min-w-0">
            <label
              htmlFor="phone"
              className="mb-1 block text-xs font-medium text-slate-700"
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
              className={`w-full min-w-0 rounded-xl border bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:bg-white ${
                errors.phone
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-200 focus:border-sky-400"
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-linear-to-r from-sky-500 to-cyan-400 py-3 text-sm font-semibold text-white shadow-md shadow-sky-200 transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-75 disabled:hover:translate-y-0"
          >
            {isSubmitting ? "Sending..." : "Book Now"}
          </button>
        </form>

        {/* WhatsApp */}
        <a
          href={whatsappLink(
            `Hi! I'm interested in the ${pkg.title} package. Can you help?`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500"
        >
          Any Doubt?
          <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 font-medium text-green-600 transition-colors hover:bg-green-100">
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp
          </span>
        </a>
      </div>
    </div>
  );
}
