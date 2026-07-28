"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Users, Award, Route } from "lucide-react";
import EnquiryPopupForm from "@/utils/EnquiryPopupForm";

type Snowflake = {
  id: number;
  x: number;
  size: number;
  delay: number;
  dur: number;
  opacity: number;
  drift: number;
};

type DestinationCard = {
  slug: string;
  name: string;
  cta: string;
  image: string;
  position: "left-back" | "left-front" | "right-back" | "right-front";
  rotate: number;
  delay: number;
};

const DESTINATION_CARDS: DestinationCard[] = [
  {
    slug: "gulmarg",
    name: "Gulmarg",
    cta: "Explore",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop",
    position: "left-back",
    rotate: -8,
    delay: 0,
  },
  {
    slug: "sonmarg",
    name: "Sonmarg",
    cta: "Discover",
    image:
      "https://images.unsplash.com/photo-1639647383258-abee94a76f84?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    position: "left-front",
    rotate: 6,
    delay: 0.15,
  },
  {
    slug: "pahalgam",
    name: "Pahalgam",
    cta: "Visit",
    image:
      "https://images.unsplash.com/photo-1666688449550-26a765798090?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    position: "right-back",
    rotate: -7,
    delay: 0.3,
  },
  {
    slug: "dal-lake",
    name: "Dal Lake",
    cta: "Book Now",
    image:
      "https://images.unsplash.com/photo-1600845747913-e33543f94892?q=80&w=2144&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    position: "right-front",
    rotate: 6,
    delay: 0.45,
  },
];

const POSITION_STYLES: Record<DestinationCard["position"], CSSProperties> = {
  "left-back": { left: "1.5rem", bottom: "9.5rem", zIndex: 10 },
  "left-front": { left: "13rem", bottom: "6.5rem", zIndex: 20 },
  "right-back": { right: "13rem", bottom: "9.5rem", zIndex: 10 },
  "right-front": { right: "1.5rem", bottom: "6.5rem", zIndex: 20 },
};

function DestinationPolaroid({ card }: { card: DestinationCard }) {
  return (
    <div
      className="pointer-events-auto absolute hidden w-44 lg:block xl:w-52"
      style={POSITION_STYLES[card.position]}
    >
      {/* Entrance pop-in — settles into resting rotation, also owns hover */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 80, rotate: 0 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          rotate: card.rotate,
          transition: {
            duration: 0.8,
            delay: 1.0 + card.delay,
            ease: [0.16, 1, 0.3, 1],
          },
        }}
        whileHover={{
          scale: 1.08,
          rotate: 0,
          zIndex: 40,
          transition: {
            duration: 0.18,
            delay: 0,
            ease: "easeOut",
          },
        }}
      >
        {/* Continuous gentle float loop, independent layer */}
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{
            duration: 3.6,
            delay: 1.8 + card.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Link
            href={`/destinations/${card.slug}/`}
            aria-label={`${card.cta} ${card.name}`}
            className="block"
          >
            <div
              className="rounded-2xl bg-white p-2 pb-3 shadow-xl"
              style={{
                boxShadow:
                  "0 14px 34px rgba(4,10,28,0.38), 0 3px 8px rgba(4,10,28,0.22)",
              }}
            >
              <div className="relative h-36 w-full overflow-hidden rounded-t-xl rounded-b-[3px] xl:h-44">
                <Image
                  src={card.image}
                  alt={`${card.name} — Kashmir`}
                  fill
                  sizes="208px"
                  className="object-cover"
                />
              </div>
              <div className="mt-2 flex items-center justify-between px-1">
                <span className="font-heading text-[0.78rem] font-semibold uppercase tracking-wide text-stone-800">
                  {card.name}
                </span>
                <span className="text-[0.8rem] text-amber-600">→</span>
              </div>
              <div className="px-1 text-[0.68rem] font-light text-stone-500">
                {card.cta}
              </div>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

const STATS = [
  {
    value: "4,200+",
    label: "Happy Travelers",
    Icon: Users,
    color: "#38BDF8",
    glow: "rgba(56,189,248,0.25)",
    gradient: "linear-gradient(120deg, #BAE6FD 0%, #38BDF8 60%, #0EA5E9 100%)",
  },
  {
    value: "20 yrs",
    label: "Of Experience",
    Icon: Award,
    color: "#FBBF24",
    glow: "rgba(251,191,36,0.25)",
    gradient: "linear-gradient(120deg, #FDE68A 0%, #FBBF24 60%, #F59E0B 100%)",
  },
  {
    value: "40+",
    label: "Curated Routes",
    Icon: Route,
    color: "#34D399",
    glow: "rgba(52,211,153,0.25)",
    gradient: "linear-gradient(120deg, #A7F3D0 0%, #34D399 60%, #10B981 100%)",
  },
];

const stripVariant: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 1.1 } },
};

const capsuleVariants:Variants = {
  hidden: { opacity: 0, y: 46, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};
export default function HeroSection() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const[isOpen, setOpen] = useState(false);

  useEffect(() => {
    setSnowflakes(
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: 1.0 + Math.random() * 2.8,
        delay: Math.random() * 16,
        dur: 11 + Math.random() * 15,
        opacity: 0.12 + Math.random() * 0.38,
        drift: (Math.random() - 0.5) * 70,
      }))
    );
  }, []);

  return (
    <section className="relative flex h-[92vh] min-h-175 flex-col">
      <EnquiryPopupForm isOpen={isOpen} onClose={() => setOpen(false)} />
      {/* ── Kashmir hero image ── */}
      <Image
        src="/Home/kashmir-hero.webp"
        alt="Kashmir landscape with mountains and valley scenery"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* ── Base mood overlay — deepens image slightly for premium feel ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0, 0, 0, 0.38)",
        }}
      />

      {/* ── Left reading lane — keeps text crisp without hiding the right scenery ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(95deg, rgba(4,10,28,0.82) 0%, rgba(4,10,28,0.55) 32%, rgba(4,10,28,0.12) 60%, transparent 78%)",
        }}
      />

      {/* ── Top vignette — subtle darkness at very top ── */}
      <div
        className="absolute inset-x-0 top-0 h-32"
        style={{
          background:
            "linear-gradient(180deg, rgba(4,10,28,0.55) 0%, transparent 100%)",
        }}
      />

      {/* ── Bottom gradient — grounds the stats strip ── */}
      <div
        className="absolute inset-x-0 bottom-0 h-56"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(4,10,28,0.42) 55%, rgba(4,10,28,0.72) 100%)",
        }}
      />

      {/* ── Cold blue atmosphere — thin color wash that ties image to the brand ── */}
      <div
        className="aurora-glow absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 75% 30%, rgba(56,189,248,0.12) 0%, transparent 60%)",
        }}
      />

      {/* ════════════════════════════════════════
          SNOW ACCUMULATION — piled at hero bottom
          ════════════════════════════════════════ */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-2"
        style={{ height: "148px" }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 148"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          {/* Far back snow bank — diffuse, blue-tinted */}
          <path
            className="snow-pile-grow"
            style={{ animationDelay: "600ms" }}
            d="M0,148 L0,108 C55,96 115,88 190,82 C265,76 330,80 410,76 C490,72 555,60 640,56 C720,52 800,58 880,63 C960,68 1035,65 1115,58 C1190,51 1270,55 1355,65 C1395,70 1425,78 1440,84 L1440,148 Z"
            fill="rgba(186,230,253,0.45)"
          />

          {/* Mid snow bank */}
          <path
            className="snow-pile-grow snow-settle"
            style={{ animationDelay: "400ms" }}
            d="M0,148 L0,120 C70,110 138,100 218,96 C295,92 365,98 440,94 C515,90 572,78 652,73 C728,68 804,74 882,80 C958,86 1028,82 1108,76 C1185,70 1270,74 1355,82 C1400,86 1428,92 1440,96 L1440,148 Z"
            fill="rgba(219,234,254,0.65)"
          />

          {/* Front snow pile — the main visible mound, natural bumpy edge */}
          <path
            className="snow-pile-grow snow-settle"
            style={{ animationDelay: "200ms" }}
            d="M0,148 L0,132
               C30,127 58,122 88,118
               C114,114 138,112 162,114
               C186,116 206,122 228,120
               C250,118 268,112 292,106
               C314,100 336,96 360,93
               C386,90 410,92 435,96
               C458,100 478,104 500,102
               C524,100 544,94 568,90
               C590,86 612,84 636,82
               C660,80 682,82 706,86
               C730,90 752,96 778,100
               C802,104 824,106 848,104
               C872,102 892,96 916,92
               C938,88 960,86 984,88
               C1010,90 1034,96 1060,100
               C1084,104 1106,106 1130,104
               C1156,102 1178,96 1204,92
               C1228,88 1252,86 1278,89
               C1305,92 1335,98 1368,106
               C1398,114 1424,122 1440,128
               L1440,148 Z"
            fill="rgba(248,250,252,0.88)"
          />

          {/* Topmost thin crust — bright white ridge catching light */}
          <path
            className="snow-pile-grow"
            style={{ animationDelay: "300ms" }}
            d="M0,132
               C30,127 58,122 88,118
               C114,114 138,112 162,114
               C186,116 206,122 228,120
               C250,118 268,112 292,106
               C314,100 336,96 360,93
               C386,90 410,92 435,96
               C458,100 478,104 500,102
               C524,100 544,94 568,90
               C590,86 612,84 636,82
               C660,80 682,82 706,86
               C730,90 752,96 778,100
               C802,104 824,106 848,104
               C872,102 892,96 916,92
               C938,88 960,86 984,88
               C1010,90 1034,96 1060,100
               C1084,104 1106,106 1130,104
               C1156,102 1178,96 1204,92
               C1228,88 1252,86 1278,89
               C1305,92 1335,98 1368,106
               C1398,114 1424,122 1440,128"
            stroke="rgba(255,255,255,0.95)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Surface shimmer highlights — short bright strokes on pile top */}
          <path
            d="M90,118 C115,114 138,112 160,114"
            stroke="white"
            strokeWidth="1.2"
            fill="none"
            opacity="0.7"
          />
          <path
            d="M295,106 C318,100 338,96 358,93"
            stroke="white"
            strokeWidth="1.2"
            fill="none"
            opacity="0.65"
          />
          <path
            d="M500,102 C525,100 545,94 568,90"
            stroke="white"
            strokeWidth="1.2"
            fill="none"
            opacity="0.7"
          />
          <path
            d="M706,86 C730,90 752,96 776,100"
            stroke="white"
            strokeWidth="1.2"
            fill="none"
            opacity="0.65"
          />
          <path
            d="M916,92 C940,88 962,86 984,88"
            stroke="white"
            strokeWidth="1.2"
            fill="none"
            opacity="0.7"
          />
          <path
            d="M1130,104 C1156,102 1178,96 1202,92"
            stroke="white"
            strokeWidth="1.2"
            fill="none"
            opacity="0.65"
          />
          <path
            d="M1368,106 C1395,113 1422,121 1440,127"
            stroke="white"
            strokeWidth="1.2"
            fill="none"
            opacity="0.6"
          />

          {/* Tiny sparkle dots scattered on the pile surface */}
          {[
            [145, 113],
            [230, 120],
            [310, 102],
            [395, 92],
            [475, 101],
            [555, 89],
            [640, 82],
            [720, 87],
            [800, 101],
            [870, 103],
            [945, 90],
            [1025, 97],
            [1105, 103],
            [1185, 91],
            [1270, 89],
            [1380, 110],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="1.8"
              fill="white"
              opacity="0.75"
            />
          ))}
        </svg>
      </div>

      {/* ── Snowflakes ── */}
      <div
        className="pointer-events-none absolute inset-0 z-3 overflow-hidden"
        aria-hidden="true"
      >
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="snow-fall absolute rounded-full bg-white"
            style={
              {
                left: `${flake.x}%`,
                top: "-8px",
                width: `${flake.size}px`,
                height: `${flake.size}px`,
                opacity: flake.opacity,
                filter: "blur(0.3px)",
                "--snow-drift": `${flake.drift}px`,
                "--snow-dur": `${flake.dur}s`,
                "--snow-delay": `${flake.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* ════════════════════════════════════════
          HERO CONTENT — left-aligned, editorial
          ════════════════════════════════════════ */}
      <div className="relative z-10 flex flex-1 items-center">
        <div className="mx-auto w-full max-w-7xl px-6 pb-4 pt-5 lg:px-14">
          <div className="text-center">
            {/* Overline pill */}
            <div
              className="mb-7 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 anim-fade-in"
              style={{
                animationDelay: "100ms",
                background: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.22)",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sky-300 float-orb" />
              <span className="text-[0.68rem] font-medium tracking-[0.30em] text-white uppercase">
                Premium Kashmir Experiences
              </span>
            </div>

            {/* Heading */}
            <h1
              className="hero-line mb-5 font-heading font-extrabold leading-[1.10] text-white"
              style={{
                animationDelay: "200ms",
                fontSize: "clamp(1.75rem, 5.5vw, 3.5rem)",
                textShadow: "0 2px 24px rgba(4,10,28,0.55)",
              }}
            >
              <span
                style={{
                  background:
                    "linear-gradient(120deg, #F59E0B 0%, #FBBF24 50%, #F59E0B 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 4px 18px rgba(255, 200, 50, 0.65))",
                  textShadow: "0 0 3px rgba(255,215,120,0.2)",
                }}
              >
                Kashmir
              </span>{" "}
              Tour Packages by{" "}
              <span
                className="font-medium"
                style={{
                  background:
                    "linear-gradient(120deg, #F59E0B 0%, #FBBF24 50%, #F59E0B 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 4px 18px rgba(255, 200, 50, 0.65))",
                  textShadow: "0 0 3px rgba(255,215,120,0.2)",
                }}
              >
                Sartaj
              </span>{" "}
              a 20-year local expert
            </h1>

            {/* Answer block */}
            <p
              className="anim-fade-in-up mb-9 mx-auto max-w-xl text-[1rem] font-light leading-[1.88] text-white/78 sm:text-[1.06rem]"
              style={{
                animationDelay: "590ms",
                textShadow: "0 1px 10px rgba(4,10,28,0.50)",
              }}
            >
              Plan a Kashmir trip with packages, stays, cabs and local
              sightseeing shaped around Srinagar, Gulmarg, Pahalgam and
              Sonamarg. Sartaj helps you compare routes, seasons and inclusions
              before you book, so your itinerary is practical, transparent and
              paced for your family, honeymoon or group.
              <span className="font-normal text-sky-200">
                {" "}
                Get a custom quote before you travel.
              </span>
            </p>

            {/* CTAs */}
            <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Link
                href="#packages"
                className="pop-in w-full rounded-2xl py-3.5 text-center text-[0.92rem] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 sm:w-auto sm:px-8"
                style={{
                  animationDelay: "720ms",
                  background: "rgba(56,189,248,0.85)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  border: "1px solid rgba(255,255,255,0.38)",
                  boxShadow:
                    "0 4px 20px rgba(4,10,28,0.20), inset 0 1px 0 rgba(255,255,255,0.20)",
                }}
              >
                Explore Packages
              </Link>

              <button
                onClick={() => setOpen(true)}
                className="pop-in w-full rounded-2xl py-3.5 text-center text-[0.92rem] font-semibold transition-all duration-300 hover:-translate-y-0.5 sm:w-auto sm:px-8"
                style={{
                  animationDelay: "840ms",
                  background:
                    "linear-gradient(120deg, #F59E0B 0%, #FBBF24 50%, #F59E0B 100%)",
                  color: "#1C1917",
                  boxShadow:
                    "0 4px 20px rgba(245,158,11,0.45), 0 1px 0 rgba(255,255,255,0.20) inset",
                  border: "1px solid rgba(245,158,11,0.60)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(120deg, #FBBF24 0%, #FCD34D 50%, #FBBF24 100%)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(120deg, #F59E0B 0%, #FBBF24 50%, #F59E0B 100%)";
                }}
              >
                Get-Quote →
              </button>
            </div>

            {/* Trust badge row */}
            <div
              className="mt-6 flex flex-wrap items-center justify-center gap-3 anim-fade-in"
              style={{ animationDelay: "960ms" }}
            >
              <div className="flex -space-x-2">
                {[
                  "bg-sky-400",
                  "bg-amber-400",
                  "bg-emerald-400",
                  "bg-violet-400",
                ].map((col, i) => (
                  <div
                    key={i}
                    className={`h-6 w-6 rounded-full border-2 border-white/30 ${col} flex items-center justify-center text-[0.55rem] font-bold text-white`}
                  >
                    {["A", "S", "R", "P"][i]}
                  </div>
                ))}
              </div>
              <span className="text-[0.7rem] text-white/55 font-light">
                Trusted by{" "}
                <span className="text-amber-300 font-medium">
                  4,200+ travelers
                </span>{" "}
                from across India
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating destination cards — desktop only ── */}
      <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
        {DESTINATION_CARDS.map((card) => (
          <DestinationPolaroid key={card.slug} card={card} />
        ))}
      </div>

      {/* ════════════════════════════════════════
    STATS STRIP — trail waypoints, half on hero
    ════════════════════════════════════════ */}
      <div
        className="absolute inset-x-0 bottom-0 z-30 px-4 sm:px-6 lg:px-14"
        style={{ transform: "translateY(50%)" }}
      >
        <div className="relative mx-auto max-w-5xl">
          {/* Dashed trail connecting the waypoints */}
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
            viewBox="0 0 800 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.path
              d="M 90,50 Q 300,10 400,50 T 710,50"
              fill="none"
              stroke="rgba(148,197,255,0.35)"
              strokeWidth="2"
              strokeDasharray="1 10"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.6, delay: 1.0, ease: "easeInOut" }}
            />
          </svg>

          <motion.div
            className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            variants={stripVariant}
            initial="hidden"
            animate="visible"
          >
            {STATS.map((s) => (
              <motion.div
                key={s.label}
                variants={capsuleVariants}
                whileHover={{ y: -6, scale: 1.04 }}
                className="group relative flex flex-1 items-center gap-3 overflow-hidden rounded-full px-5 py-3.5 sm:px-6 sm:py-4"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(3,7,18,0.92) 0%, rgba(8,47,73,0.88) 100%)",
                  border: `1px solid ${s.color}40`,
                  boxShadow: `0 16px 40px rgba(4,10,28,0.45), 0 0 0 1px rgba(255,255,255,0.06) inset, 0 0 24px ${s.glow}`,
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                }}
              >
                {/* Ambient pulse ring behind icon */}
                <motion.div
                  className="absolute left-5 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full sm:left-6 sm:h-11 sm:w-11"
                  style={{ background: s.glow }}
                  animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <div
                  className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-11 sm:w-11"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: `1px solid ${s.color}80`,
                  }}
                >
                  <s.Icon
                    size={16}
                    strokeWidth={2.2}
                    color={s.color}
                    className="sm:hidden"
                  />
                  <s.Icon
                    size={19}
                    strokeWidth={2.2}
                    color={s.color}
                    className="hidden sm:block"
                  />
                </div>

                <div className="relative">
                  <div
                    className="font-heading text-base font-extrabold leading-none sm:text-xl"
                    style={{
                      background: s.gradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {s.value}
                  </div>
                  <div className="mt-1 text-[0.6rem] font-semibold tracking-wide text-white/70 uppercase sm:text-[0.66rem] sm:tracking-widest">
                    {s.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div
        className="absolute bottom-28 right-8 z-10 hidden flex-col items-center gap-3 anim-fade-in lg:flex md:right-14"
        style={{ animationDelay: "1100ms" }}
      >
        <span
          className="text-[0.58rem] tracking-[0.26em] text-white/40 uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll to explore
        </span>
        <div className="anim-scroll-pulse h-14 w-px bg-linear-to-b from-white/45 to-transparent" />
      </div>
    </section>
  );
}
