import { motion } from "framer-motion";

// Hand-drawn outline cloud. `drift` = how far (px) it floats side to side.
export function Cloud({ className = "", width = 140, drift = 24, duration = 9 }) {
  return (
    <motion.svg
      className={`cloud ${className}`}
      width={width}
      viewBox="-14 -4 142 48"
      fill="none"
      aria-hidden="true"
      animate={{ x: [0, drift, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M4 40 C-2 26 14 18 26 22 C28 6 50 0 60 12 C68 0 92 2 94 20 C108 16 120 28 114 40" />
      <path d="M-12 40 H126" />
    </motion.svg>
  );
}

// Zigzag strip used as a pinked-paper edge on panels and the footer
// (shape comes from a CSS mask, colour from `background`).
export function Zigzag({ className = "" }) {
  return <div className={`zigzag ${className}`} aria-hidden="true" />;
}

// Wavy bottom edge for the intro curtain.
export function Wave({ className = "" }) {
  return (
    <svg
      className={`wave ${className}`}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0 0 H1440 V40 C1260 120 1080 120 900 70 C700 15 520 10 340 60 C200 100 90 100 0 70 Z" />
    </svg>
  );
}
