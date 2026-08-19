"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { motion, Variants, Easing } from "framer-motion";
import {
  Landmark,
  IndianRupee,
  HandHeart,
  Headset,
  User,
  Phone,
  MapPin,
  Calendar,
  Users,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const MAIN_IMAGE = "https://picsum.photos/seed/kashmir-yatra-temple/1000/560";

const easeOutExpo: Easing = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOutExpo } },
};

const FEATURES = [
  { icon: Landmark, label: "Temple Routes Covered" },
  { icon: IndianRupee, label: "Special Yatra Fares" },
  { icon: HandHeart, label: "Priority Assistance" },
  { icon: Headset, label: "24/7 Dharmik Support" },
];

const inputWrap =
  "flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 transition-colors focus-within:border-sky-400 focus-within:bg-white";
const inputEl =
  "w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none";
const labelEl = "mb-2 block text-sm font-bold text-slate-900";

export default function TempleBookingSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [travellers, setTravellers] = useState("1");

  const [errors, setErrors] = useState({ name: "", phone: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    const newErrors = { name: "", phone: "" };

    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\+?[\d\s-]{10,}$/.test(phone.trim())) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.phone;
  };

  // Sembark's /trip-plan-requests only accepts name, phone, email and a single
  // comments string, so the yatra-specific fields ride along in `serviceType`
  // the way the other enquiry forms flatten theirs.
  const buildComments = () =>
    [
      "Inquiry Source:- Temple Yatra Booking Form",
      `Destination Temple:- ${destination.trim() || "Not provided"}`,
      `Preferred Date:- ${date || "Not provided"}`,
      `Travellers:- ${travellers}`,
    ].join(" | ");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/simbark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          serviceType: buildComments(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data?.success === false) {
        throw new Error(
          data.message || "Failed to submit enquiry. Please try again.",
        );
      }

      setSuccessMessage("Your enquiry has been submitted successfully.");
      setName("");
      setPhone("");
      setDestination("");
      setDate("");
      setTravellers("1");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full bg-sky-100 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center font-heading text-3xl font-extrabold sm:text-4xl">
          <span className="text-slate-900">Book your </span>
          <span className="bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
            sacred journey
          </span>
          <span className="text-slate-900"> now</span>
        </h2>

        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Image + feature cards */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="min-w-0"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl shadow-xl shadow-black/10">
              <Image
                src={MAIN_IMAGE}
                alt="Kashmir temple set against snow-capped mountains at sunrise"
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-black/45 px-5 py-4 text-center backdrop-blur-sm sm:inset-x-6">
                <p className="text-lg font-extrabold text-white sm:text-xl">
                  Book your{" "}
                  <span className="text-sky-300">sacred journey</span> now
                </p>
              </div>
            </div>

            <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible">
              {FEATURES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex w-56 shrink-0 items-center gap-3 rounded-xl bg-white px-4 py-4 shadow-sm shadow-black/5 sm:w-auto"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-500">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-black">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Enquiry form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl shadow-black/5"
          >
            <div className="flex items-center gap-4 bg-linear-to-r from-sky-500 to-cyan-400 px-6 py-5 text-white">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20">
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-bold leading-tight">Enquire for Your Yatra</p>
                <p className="text-sm text-white/85">Our team will call you back shortly</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 px-6 py-7 sm:px-8">
              {successMessage && (
                <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                  <p>{successMessage}</p>
                </div>
              )}

              {errorMessage && (
                <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
                  <p>{errorMessage}</p>
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="yatra-name" className={labelEl}>
                    Full Name
                  </label>
                  <div className={`${inputWrap} ${errors.name ? "border-red-400" : ""}`}>
                    <User className="h-4 w-4 shrink-0 text-sky-500" />
                    <input
                      id="yatra-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((p) => ({ ...p, name: "" }));
                      }}
                      placeholder="Enter your full name"
                      className={inputEl}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="yatra-phone" className={labelEl}>
                    Phone no
                  </label>
                  <div className={`${inputWrap} ${errors.phone ? "border-red-400" : ""}`}>
                    <Phone className="h-4 w-4 shrink-0 text-sky-500" />
                    <input
                      id="yatra-phone"
                      type="tel"
                      required
                      inputMode="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors((p) => ({ ...p, phone: "" }));
                      }}
                      placeholder="Enter your phone no"
                      className={inputEl}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="yatra-destination" className={labelEl}>
                  Destination Temple
                </label>
                <div className={inputWrap}>
                  <MapPin className="h-4 w-4 shrink-0 text-sky-500" />
                  <input
                    id="yatra-destination"
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Vaishno Devi Temple"
                    className={inputEl}
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="yatra-date" className={labelEl}>
                    Preferred Date
                  </label>
                  <div className={inputWrap}>
                    <Calendar className="h-4 w-4 shrink-0 text-sky-500" />
                    <input
                      id="yatra-date"
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={inputEl}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="yatra-travellers" className={labelEl}>
                    Travellers
                  </label>
                  <div className={inputWrap}>
                    <Users className="h-4 w-4 shrink-0 text-sky-500" />
                    <select
                      id="yatra-travellers"
                      value={travellers}
                      onChange={(e) => setTravellers(e.target.value)}
                      className={`${inputEl} appearance-none`}
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Adult" : "Adults"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-500 to-cyan-400 px-6 py-3.5 font-semibold text-white shadow-lg shadow-sky-200 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-75 disabled:hover:translate-y-0"
              >
                {!isLoading && <Send className="h-4 w-4" />}
                {isLoading ? "Sending..." : "Send Enquiry"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
