"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const AVATARS = [
  "https://i.pravatar.cc/150?img=51",
  "https://i.pravatar.cc/150?img=12",
  "https://i.pravatar.cc/150?img=32",
  "https://i.pravatar.cc/150?img=47",
];

const STATS = [
  { value: "180", label: "Tour Available" },
  { value: "24+", label: "Destinations" },
  { value: "4.9", label: "Rating", withStar: true },
];

export default function AboutUs() {
  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-10 lg:py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_0.85fr_1fr] lg:gap-8 lg:px-12">
        {/* LEFT: Heading + Avatars */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-left"
        >
          <p className="font-heading text-lg font-semibold text-slate-900">
            About Us
          </p>
          <h2 className="mt-3 font-heading text-4xl font-bold leading-tight bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent sm:text-[2.6rem] text-center md:text-start">
            Start your Kashmir Journey With us
          </h2>

          <div className="mt-10 flex items-center">
            <div className="flex -space-x-4">
              {AVATARS.map((src, i) => (
                <div
                  key={src}
                  className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-white shadow-md"
                  style={{ zIndex: AVATARS.length - i }}
                >
                  <Image
                    src={src}
                    alt="Happy traveler"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div
              className="relative -ml-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-linear-to-r from-sky-400 to-cyan-300 text-sm font-semibold text-white shadow-md"
              style={{ zIndex: 0 }}
            >
              20k
            </div>
          </div>
        </motion.div>

        {/* MIDDLE: Image collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto h-[460px] md:h-[460px] w-[412px] max-w-sm sm:h-[480px]"
        >
          <div className="absolute right-[13%] md:right-0 md:top-0  h-[85%] md:h-[85%] md:w-[78%] w-[70%] overflow-hidden rounded-t-[119px] rounded-b-[119px] shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1706021173837-5918d8bae041?q=80&w=978&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Kashmir mountains reflected in a lake"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-5 md:left-0 h-[150px] md:h-[200px] w-[150px] md:w-[200px] overflow-hidden rounded-full border-10 border-white md:shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1658009250465-374c761daeaa?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Shikara boat on Dal Lake"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* RIGHT: Text, stats, CTA */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
          className="text-center md:text-left"
        >
          <p className="max-w-md text-base leading-8 text-slate-600">
            Lorem ipsum dolor sit amet consectetur. Sit dui pharetra pulvinar
            nisi magna arcu in. Id convallis sed tortor volutpat. Id eu tellus
            convallis aliquam enim pretium mi est. Ut nibh a amet pulvinar
            vestibulum Natoque augue tristique quam vitae.
          </p>

          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6 justify-center md:justify-start">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="flex items-center gap-1.5 font-heading text-3xl font-bold text-sky-500">
                  {stat.value}
                  {stat.withStar && (
                    <Star className="h-6 w-6 fill-sky-500 text-sky-500" />
                  )}
                </div>
                <p className="mt-1 text-sm font-medium text-slate-800">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/kashmir-tour-packages/"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-8 py-4 font-semibold text-white shadow-lg shadow-sky-200 transition-transform hover:-translate-y-0.5"
          >
            Explore Packages
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
