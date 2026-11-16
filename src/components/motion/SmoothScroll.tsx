"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSyncMotionTierAttribute } from "@/hooks/useMotionTier";

/**
 * Lenis smooth scrolling (desktop "full" tier only — touch keeps native
 * momentum scrolling, reduced-motion keeps native everything).
 *
 * The instance is a module singleton so any component can pause it
 * (e.g. the mobile menu) without React context re-renders. GSAP
 * ScrollTrigger hooks into it lazily via `getLenis()` where needed, so
 * GSAP is never part of the global bundle.
 */
let lenisInstance: Lenis | null = null;
export const getLenis = () => lenisInstance;

export function SmoothScroll() {
  const tier = useSyncMotionTierAttribute();
  const pathname = usePathname();

  useEffect(() => {
    if (tier !== "full") return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: -96 },
      autoRaf: true,
    });
    lenisInstance = lenis;
    return () => {
      lenis.destroy();
      lenisInstance = null;
    };
  }, [tier]);

  // Route change: the document height changed — let Lenis re-measure.
  useEffect(() => {
    lenisInstance?.resize();
  }, [pathname]);

  return null;
}
