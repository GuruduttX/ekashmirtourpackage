"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Snowflake = {
  id: number;
  x: number;
  size: number;
  delay: number;
  dur: number;
  opacity: number;
  drift: number;
};

const createSnowflakes = () =>
  Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: 1 + Math.random() * 2.8,
    delay: Math.random() * 16,
    dur: 11 + Math.random() * 15,
    opacity: 0.12 + Math.random() * 0.38,
    drift: (Math.random() - 0.5) * 70,
  }));

export default function AboutHero() {
  const [snowflakes] = useState<Snowflake[]>(createSnowflakes);

  return (
    <section className="relative flex min-h-[620px] overflow-hidden sm:min-h-[680px] lg:min-h-[760px]">
      <Image
        src="/Home/kashmir-hero.webp"
        alt="Snow-covered Kashmir landscape"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,47,73,0.28)_0%,rgba(7,89,133,0.14)_36%,rgba(3,105,161,0.18)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,15,35,0.78)_0%,rgba(8,15,35,0.52)_35%,rgba(8,15,35,0.38)_60%,rgba(8,15,35,0.55)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(8,15,35,0.55)_0%,transparent_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(180deg,transparent_0%,rgba(8,15,35,0.22)_40%,rgba(8,15,35,0.7)_100%)]" />

      <div
        className="aurora-glow absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 78% 55% at 50% 26%, rgba(103,232,249,0.14) 0%, rgba(56,189,248,0.08) 38%, transparent 68%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2]"
        style={{ height: "146px" }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 146"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <path
            className="snow-pile-grow"
            style={{ animationDelay: "560ms" }}
            d="M0,146 L0,108 C85,98 164,90 252,87 C342,84 434,93 518,88 C604,83 685,69 770,67 C856,65 947,76 1034,79 C1123,82 1213,74 1305,82 C1362,86 1408,92 1440,98 L1440,146 Z"
            fill="rgba(186,230,253,0.48)"
          />
          <path
            className="snow-pile-grow snow-settle"
            style={{ animationDelay: "320ms" }}
            d="M0,146 L0,122 C63,113 131,106 203,101 C284,95 358,102 435,98 C509,94 581,83 657,79 C733,75 805,82 881,88 C959,94 1035,91 1113,85 C1191,79 1269,82 1349,89 C1390,93 1422,98 1440,102 L1440,146 Z"
            fill="rgba(224,242,254,0.68)"
          />
          <path
            className="snow-pile-grow snow-settle"
            style={{ animationDelay: "180ms" }}
            d="M0,146 L0,132
               C36,126 76,121 114,118
               C150,115 188,117 224,121
               C260,125 296,130 332,126
               C367,122 401,113 438,107
               C476,101 516,99 554,102
               C596,105 634,114 672,117
               C710,120 746,116 784,110
               C822,104 860,100 898,102
               C940,104 978,112 1018,116
               C1057,120 1095,119 1134,112
               C1170,105 1208,99 1248,100
               C1288,101 1328,109 1368,119
               C1399,126 1424,131 1440,135
               L1440,146 Z"
            fill="rgba(248,250,252,0.9)"
          />
          <path
            className="snow-pile-grow"
            style={{ animationDelay: "260ms" }}
            d="M0,132
               C36,126 76,121 114,118
               C150,115 188,117 224,121
               C260,125 296,130 332,126
               C367,122 401,113 438,107
               C476,101 516,99 554,102
               C596,105 634,114 672,117
               C710,120 746,116 784,110
               C822,104 860,100 898,102
               C940,104 978,112 1018,116
               C1057,120 1095,119 1134,112
               C1170,105 1208,99 1248,100
               C1288,101 1328,109 1368,119
               C1399,126 1424,131 1440,135"
            stroke="rgba(255,255,255,0.95)"
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[3] overflow-hidden"
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

      <div className="relative z-10 flex w-full flex-1 items-center justify-center">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-5 pb-20 pt-28 text-center sm:px-8 sm:pt-32 lg:px-12 lg:pt-36">
          <div
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md anim-fade-in"
            style={{ animationDelay: "120ms" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 float-orb" />
            <span className="text-[0.68rem] font-medium uppercase tracking-[0.3em] text-white">
              About eKashmir Journeys
            </span>
          </div>

          <h1
            className="hero-line font-heading font-bold leading-[1.08] text-white"
            style={{
              animationDelay: "220ms",
              fontSize: "clamp(2rem, 6vw, 5rem)",
              textShadow: "0 3px 26px rgba(8,15,35,0.55)",
            }}
          >
            Crafted journeys through the{" "}
            <span className="bg-[linear-gradient(120deg,#BAE6FD_0%,#67E8F9_45%,#E0F2FE_100%)] bg-clip-text text-transparent">
              snow, stillness,
            </span>{" "}
            and soul of Kashmir.
          </h1>

          <p
            className="anim-fade-in-up mt-6 max-w-2xl text-sm font-light leading-7 text-white/82 sm:text-base sm:leading-8"
            style={{
              animationDelay: "520ms",
              textShadow: "0 1px 14px rgba(8,15,35,0.48)",
            }}
          >
            We design Kashmir holidays with local insight, thoughtful pacing,
            and a deep respect for the landscapes that make every valley, lake,
            and mountain pass unforgettable.
          </p>

          <div className="mt-9 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
            <Link
              href="/#packages"
              className="pop-in w-full rounded-2xl border border-white/30 bg-sky-500/85 px-7 py-3.5 text-center text-[0.95rem] font-medium text-white shadow-[0_10px_30px_rgba(14,165,233,0.35)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-600 sm:w-auto"
              style={{ animationDelay: "700ms" }}
            >
              Book the Tour Package
            </Link>
            <Link
              href="/#contact"
              className="pop-in w-full rounded-2xl border border-white/22 bg-white/10 px-7 py-3.5 text-center text-[0.95rem] font-medium text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/16 sm:w-auto"
              style={{ animationDelay: "820ms" }}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
