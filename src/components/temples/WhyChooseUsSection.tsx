"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants, Easing } from "framer-motion";
import { Armchair, Soup, UserStar } from "lucide-react";

const HERO_IMAGE =
  "https://imgs.search.brave.com/RQDDyHK8gUnzpBmfm2ii3fM-cP9mxN65g4B2VQKfyis/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zN2Fw/MS5zY2VuZTcuY29t/L2lzL2ltYWdlL2lu/Y3JlZGlibGVpbmRp/YS9zaGFua2FyYWNo/YXJ5YS10ZW1wbGUt/c3JpbmFnYXItamFt/bXUtJi1rYXNobWly/LTItYXR0ci1oZXJv/P3FsdD04MiZ0cz0x/NzI2ODE2MzEwNDI3";

const easeOutExpo: Easing = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOutExpo } },
};

interface Feature {
  icon?: typeof Armchair;
  iconSrc?: string;
  label: string;
}

const FEATURES: Feature[] = [
  { icon: Armchair, label: "Rest & Waiting Lounge" },
  { icon: Soup, label: "Satvik Food & Counters" },
  { iconSrc: "/diya.svg", label: "Quick Pooja Booking" },
  { icon: UserStar, label: "Local Guide Support" },
];

function FeatureCard({ icon: Icon, iconSrc, label, className = "" }: Feature & { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center gap-3 rounded-2xl bg-linear-to-br from-sky-500 to-sky-300 px-5 py-8 text-center shadow-lg shadow-sky-200 ${className}`}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-sky-500 shadow-md">
        {iconSrc ? (
          <Image src={iconSrc} alt="" width={24} height={24} aria-hidden className="h-6 w-6 object-contain" />
        ) : (
          Icon && <Icon className="h-6 w-6" />
        )}
      </span>
      <p className="font-heading text-base font-bold leading-tight text-white">{label}</p>
    </div>
  );
}

export default function WhyChooseUsSection() {
  return (
    <section className="w-full bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-center font-heading text-3xl font-extrabold sm:text-4xl">
          <span className="text-slate-900">Why </span>
          <span className="bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
            Choose Us
          </span>
        </h2>

        {/* Hero banner */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative h-96 w-full overflow-hidden rounded-3xl shadow-xl shadow-black/10 sm:h-80"
        >
          <Image
            src={HERO_IMAGE}
            alt="Amarnath cave shrine with the ice lingam, framed by mountains"
            fill
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent sm:bg-linear-to-r sm:from-black/75 sm:via-black/25 sm:to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex max-w-2xl flex-col gap-3 px-6 pb-6 sm:inset-y-0 sm:left-0 sm:right-auto sm:justify-end sm:px-10 sm:pb-10">
            <h3 className="font-heading text-2xl font-extrabold leading-tight text-white sm:text-4xl">
              Explore spiritual tour with us
            </h3>
            <p className="text-sm text-white/85 sm:text-base">
              Lorem ipsum dolor sit amet consectetur. Ultrices volutpat cursus id justo turpis
              tellus. Tempor morbi aliquet volutpat varius magna sed et pharetra. Nisl vivamu
            </p>
            <Link
              href="#all-temples"
              className="mt-2 w-fit rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition-transform hover:-translate-y-0.5"
            >
              Enquire us
            </Link>
          </div>
        </motion.div>

        {/* Desktop — zigzag layout */}
        <div className="mt-16 hidden pb-6 lg:block">
          <div className="grid grid-cols-4 items-start gap-6">
            {FEATURES.map((feature, i) => (
              <FeatureCard key={feature.label} {...feature} className={i % 2 === 1 ? "mt-36" : ""} />
            ))}
          </div>
        </div>

        {/* Mobile / tablet — horizontal scroll strip */}
        <div className="no-scrollbar mt-8 flex gap-4 overflow-x-auto lg:hidden">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.label} {...feature} className="w-44 shrink-0" />
          ))}
        </div>
      </div>
    </section>
  );
}
