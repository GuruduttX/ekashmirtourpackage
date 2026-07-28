"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Package, RefreshCw, Plane, Send, LucideIcon } from "lucide-react";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Choose a Packages",
    description: "At Express Travel, we believe power. avid explorers ourselves.",
    icon: Package,
  },
  {
    number: "02",
    title: "Customize your plan",
    description: "At Express Travel, we believe power. avid explorers ourselves.",
    icon: RefreshCw,
  },
  {
    number: "03",
    title: "Book & Travel",
    description: "At Express Travel, we believe power. avid explorers ourselves.",
    icon: Plane,
  },
  {
    number: "04",
    title: "Enjoy & Share",
    description: "At Express Travel, we believe power. avid explorers ourselves.",
    icon: Send,
  },
];

/* Desktop wave: one shared canvas holds the wave, the nodes AND the cards.
   Each column is either [node, gap, card] (node riding the top of the wave,
   card sitting right below it) or [card, gap, node] (node riding the
   bottom of the wave, card sitting right above it) so the SVG line always
   passes through the exact center of every node. */
const NODE_SIZE = 64;
const NODE_GAP = 34;
const CARD_HEIGHT = 200;
const CARD_WIDTH = "16%";
const COLUMN_HEIGHT = NODE_SIZE + NODE_GAP + CARD_HEIGHT;
const NODE_TOP_Y = NODE_SIZE / 2;
const NODE_BOTTOM_Y = COLUMN_HEIGHT - NODE_SIZE / 2;

const DESKTOP_X = [125, 375, 625, 875]; // out of 1000 — 12.5 / 37.5 / 62.5 / 87.5%
const DESKTOP_PHASES: ("top" | "bottom")[] = ["top", "bottom", "top", "bottom"];

const DESKTOP_NODES = DESKTOP_X.map((x, i) => ({
  x,
  y: DESKTOP_PHASES[i] === "top" ? NODE_TOP_Y : NODE_BOTTOM_Y,
}));

/* Extend the curve to the edges of the section, continuing the alternation,
   so the wave runs the full 1000-wide viewBox instead of stopping at the
   outer nodes. */
const DESKTOP_PATH_POINTS = [
  { x: 0, y: DESKTOP_PHASES[0] === "top" ? NODE_BOTTOM_Y : NODE_TOP_Y },
  ...DESKTOP_NODES,
  {
    x: 1000,
    y: DESKTOP_PHASES[DESKTOP_PHASES.length - 1] === "top" ? NODE_BOTTOM_Y : NODE_TOP_Y,
  },
];

/* Mobile wave: node points in a 200 x 100 viewBox, swinging wide left/right
   (15% / 85%) so the zig-zagging cards have room beside each node. The y
   values are inset from 0/100 so the first/last circles aren't clipped. */
const MOBILE_NODES = [
  { x: 30, y: 8 },
  { x: 170, y: 36 },
  { x: 30, y: 64 },
  { x: 170, y: 92 },
];

function buildWavePath(points: { x: number; y: number }[]) {
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const midX = (p0.x + p1.x) / 2;
    d += ` C ${midX} ${p0.y}, ${midX} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  return d;
}

const DESKTOP_PATH = buildWavePath(DESKTOP_PATH_POINTS);
const MOBILE_PATH = buildWavePath(MOBILE_NODES);

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

function NodeCircle({ number }: { number: string }) {
  return (
    <div
      className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white shadow-lg sm:h-16 sm:w-16 sm:text-xl"
      style={{
        background: "linear-gradient(135deg, #0ea5e9 0%, #22d3ee 100%)",
        boxShadow: "0 8px 20px -4px rgba(14,165,233,0.5)",
      }}
    >
      {number}
    </div>
  );
}

function DesktopCard({ step, inView, delay }: { step: Step; inView: boolean; delay: number }) {
  const Icon = step.icon;
  return (
    <motion.div
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="group relative h-full overflow-hidden rounded-2xl"
    >
      <div className="absolute inset-0 bg-white transition-opacity duration-500 group-hover:opacity-0" />
      <div className="absolute inset-0 bg-linear-to-br from-sky-500 to-cyan-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col items-center p-6 text-center">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-white">
          <Icon className="h-5 w-5 text-sky-500" />
        </div>
        <h3 className="mb-2 bg-linear-to-r from-sky-600 to-cyan-500 bg-clip-text text-lg font-bold text-transparent transition-all duration-500 group-hover:bg-none group-hover:text-white">
          {step.title}
        </h3>
        <p className="text-sm leading-relaxed text-slate-500 transition-colors duration-500 group-hover:text-white/85">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

function MobileCard({ step }: { step: Step }) {
  const Icon = step.icon;
  return (
    <div className="rounded-xl bg-linear-to-br from-sky-500 to-cyan-400 p-3 shadow-lg">
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
        <Icon className="h-4 w-4 text-sky-500" />
      </div>
      <h3 className="mb-1 text-sm font-bold leading-snug text-white">{step.title}</h3>
      <p className="text-xs leading-snug text-white/85">{step.description}</p>
    </div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <h2 className="mb-10 text-center font-heading text-3xl font-bold bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent sm:text-4xl">
          How it works
        </h2>
      </div>

      {/* ══ DESKTOP — full-bleed horizontal wave ══ */}
      <div
        className="relative hidden w-full lg:block"
        style={{ height: COLUMN_HEIGHT }}
      >
        <svg
          viewBox={`0 0 1000 ${COLUMN_HEIGHT}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full "
        >
          <path
            d={DESKTOP_PATH}
            fill="none"
            stroke="#38bdf8"
            strokeWidth={3}
            strokeDasharray="10 12"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {STEPS.map((step, i) => {
          const phase = DESKTOP_PHASES[i];
          const xPercent = DESKTOP_X[i] / 10;
          const nodeY = phase === "top" ? NODE_TOP_Y : NODE_BOTTOM_Y;
          const cardTop = phase === "top" ? NODE_SIZE + NODE_GAP : 0;

          return (
            <div key={step.number}>
              {/* Positioning wrapper (plain div) keeps the -50%/-50% centering;
                  the inner motion.div owns the scale animation so framer-motion
                  never overwrites the centering transform. */}
              <div
                className="absolute"
                style={{
                  left: `${xPercent}%`,
                  top: nodeY,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <motion.div
                  custom={0.1 * i}
                  variants={popIn}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <NodeCircle number={step.number} />
                </motion.div>
              </div>

              <div
                className="absolute"
                style={{
                  left: `${xPercent}%`,
                  top: cardTop,
                  height: CARD_HEIGHT,
                  width: CARD_WIDTH,
                  transform: "translateX(-50%)",
                }}
              >
                <DesktopCard step={step} inView={isInView} delay={0.15 + i * 0.1} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        {/* ══ MOBILE / TABLET — vertical zig-zag wave ══ */}
        <div className="relative lg:hidden">
          <svg
            viewBox="0 0 200 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <path
              d={MOBILE_PATH}
              fill="none"
              stroke="#38bdf8"
              strokeWidth={2}
              strokeDasharray="8 10"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {MOBILE_NODES.map((node, i) => (
            <div
              key={i}
              className="absolute z-10"
              style={{
                left: `${node.x / 2}%`,
                top: `${node.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <motion.div
                custom={0.1 * i}
                variants={popIn}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <NodeCircle number={STEPS[i].number} />
              </motion.div>
            </div>
          ))}

          <div className="relative flex flex-col gap-16 py-8">
            {STEPS.map((step, i) => {
              const alignRight = i % 2 === 0;
              return (
                <motion.div
                  key={step.number}
                  custom={0.15 + i * 0.1}
                  variants={fadeUp}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className={`w-[52%] ${alignRight ? "ml-auto" : "mr-auto"}`}
                >
                  <MobileCard step={step} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
