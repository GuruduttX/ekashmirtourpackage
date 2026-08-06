"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { motion, Variants, Easing } from "framer-motion";
import { Car, User, Phone } from "lucide-react";

// Placeholder imagery — swap for real /public assets later.
const IMAGE_MAIN =
  "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=1000&auto=format&fit=crop&q=80";
const IMAGE_INSET =
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80";

const easeOutExpo: Easing = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOutExpo } },
};

const inputWrap =
  "flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 transition-colors focus-within:border-sky-400 focus-within:bg-white";
const inputEl =
  "w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none";

export default function CabBookingSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // UI only for now — wire up submission later.
    console.log("Cab enquiry:", { name, phone });
  };

  return (
    <section className="w-full bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-7">
        {/* Images — second on mobile, first on desktop */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="order-2 lg:order-1"
        >
          <div className="relative mx-auto max-w-lg pb-16 pr-12 sm:pb-20 sm:pr-20 lg:mx-0">
            {/* Main image */}
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl shadow-xl shadow-black/10">
              <Image
                src={IMAGE_MAIN}
                alt="Travellers with luggage beside a taxi on a Kashmir mountain road"
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            {/* Inset image — overlaps the bottom-right corner */}
            <div className="absolute bottom-0 right-0 aspect-4/3 w-1/2 overflow-hidden rounded-2xl border-4 border-white shadow-xl shadow-black/15">
              <Image
                src={IMAGE_INSET}
                alt="A tempo traveller cab parked by a lake with mountains behind"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Form — first on mobile, second on desktop */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="order-1 mx-auto w-full max-w-md lg:order-2 lg:mx-0 lg:ml-auto"
        >
          <h2 className="mb-5 text-center font-heading text-3xl font-extrabold sm:text-4xl lg:text-left">
            <span className="bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
              Book your Cab Now!
            </span>
          </h2>

          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl shadow-black/5">
            {/* Card header */}
            <div className="flex items-center gap-4 bg-linear-to-r from-sky-500 to-cyan-400 px-6 py-5 text-white">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20">
                <Car className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-bold leading-tight">Book Your Taxi</p>
                <p className="text-sm text-white/85">
                  Instant confirmation. Best guaranteed rates
                </p>
              </div>
            </div>

            {/* Card body */}
            <form onSubmit={handleSubmit} className="space-y-5 px-10 py-7">
              <div>
                <label htmlFor="cab-name" className="mb-2 block text-sm font-bold text-slate-900">
                  Full Name
                </label>
                <div className={inputWrap}>
                  <User className="h-4 w-4 shrink-0 text-sky-500" />
                  <input
                    id="cab-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className={inputEl}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="cab-phone" className="mb-2 block text-sm font-bold text-slate-900">
                  Phone no
                </label>
                <div className={inputWrap}>
                  <Phone className="h-4 w-4 shrink-0 text-sky-500" />
                  <input
                    id="cab-phone"
                    type="tel"
                    required
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone no"
                    className={inputEl}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-linear-to-r from-sky-500 to-cyan-400 px-6 py-3.5 font-semibold text-white shadow-lg shadow-sky-200 transition-transform hover:-translate-y-0.5"
              >
                Next Trip Details
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
