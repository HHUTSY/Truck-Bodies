"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useMotionTier } from "@/hooks/useMotionTier";

/**
 * Hero background: oversized "cut steel plates" whose outlines slowly morph
 * between angular shapes (all 6-point polygons → smooth `d` interpolation).
 * Strokes + a faint gradient only — no blur filters, so it stays cheap.
 * Pauses off-screen; static for reduced motion.
 */
const PLATE_A = [
  "M980 80 L1520 80 L1600 160 L1600 620 L1180 620 L900 340 Z",
  "M1060 40 L1560 140 L1600 300 L1560 700 L1100 560 L940 260 Z",
  "M900 160 L1440 40 L1600 220 L1500 560 L1020 700 L860 420 Z",
];
const PLATE_B = [
  "M1180 300 L1480 260 L1560 340 L1520 760 L1260 820 L1140 560 Z",
  "M1100 360 L1420 220 L1580 420 L1460 800 L1200 760 L1080 520 Z",
  "M1220 240 L1540 320 L1600 520 L1400 840 L1160 700 L1120 420 Z",
];

export function MorphPlates() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { margin: "100px" });
  const tier = useMotionTier();
  const play = inView && tier !== "reduced";

  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMaxYMin slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="plate-steel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eceef0" stopOpacity="0.07" />
          <stop offset="0.55" stopColor="#eceef0" stopOpacity="0.015" />
          <stop offset="1" stopColor="#eceef0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={PLATE_A[0]}
        initial={false}
        animate={play ? { d: [...PLATE_A, PLATE_A[0]] } : undefined}
        transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
        fill="url(#plate-steel)"
        stroke="rgb(236 238 240 / 0.08)"
        strokeWidth={1}
      />
      <motion.path
        d={PLATE_B[0]}
        initial={false}
        animate={play ? { d: [...PLATE_B, PLATE_B[0]] } : undefined}
        transition={{ duration: 17, ease: "easeInOut", repeat: Infinity, delay: 1.5 }}
        fill="none"
        stroke="rgb(255 91 20 / 0.28)"
        strokeWidth={1}
        strokeDasharray="2 10"
      />
    </svg>
  );
}
