import { Variants, Easing } from "framer-motion";

/** Signature "settle" ease shared across hero entrances (text slide-in, building rise). */
export const heroEaseOutExpo: Easing = [0.16, 1, 0.3, 1];

/** Stagger wrapper — pass `custom` at the call site to tune stagger/delay per section. */
export const heroSlideInContainer: Variants = {
  hidden: { opacity: 0 },
  visible: (custom?: { staggerChildren?: number; delayChildren?: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom?.staggerChildren ?? 0.13,
      delayChildren: custom?.delayChildren ?? 0.1,
    },
  }),
};

/** Child entrance — slides in from the left while fading in. */
export const heroSlideInLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: heroEaseOutExpo } },
};
