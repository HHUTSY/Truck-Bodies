"use client";

import { useEffect, useSyncExternalStore } from "react";

/**
 * Motion tiers:
 *  - "full"    → desktop, fine pointer, capable device: everything on
 *  - "lite"    → touch or low-power device: no cursor/tilt/magnet, shorter reveals
 *  - "reduced" → prefers-reduced-motion: no movement, only opacity
 *
 * Server snapshot is "lite" so SSR never renders desktop-only chrome.
 */
export type MotionTier = "full" | "lite" | "reduced";

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

const QUERIES = ["(prefers-reduced-motion: reduce)", "(hover: hover) and (pointer: fine)"];

function subscribe(callback: () => void) {
  const mqls = QUERIES.map((q) => window.matchMedia(q));
  mqls.forEach((m) => m.addEventListener("change", callback));
  return () => mqls.forEach((m) => m.removeEventListener("change", callback));
}

function getSnapshot(): MotionTier {
  if (window.matchMedia(QUERIES[0]).matches) return "reduced";
  const nav = navigator as NavigatorWithHints;
  const lowPower =
    (nav.hardwareConcurrency ?? 8) <= 4 ||
    (nav.deviceMemory ?? 8) <= 4 ||
    nav.connection?.saveData === true;
  const finePointer = window.matchMedia(QUERIES[1]).matches;
  return finePointer && !lowPower ? "full" : "lite";
}

function getServerSnapshot(): MotionTier {
  return "lite";
}

export function useMotionTier(): MotionTier {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Mirrors the tier onto <html data-motion> so CSS can adapt too. */
export function useSyncMotionTierAttribute() {
  const tier = useMotionTier();
  useEffect(() => {
    document.documentElement.dataset.motion = tier;
  }, [tier]);
  return tier;
}
