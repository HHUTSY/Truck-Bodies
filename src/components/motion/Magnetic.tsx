"use client";

import { motion, useSpring } from "motion/react";
import { useRef, type ReactNode, type PointerEvent } from "react";
import { useMotionTier } from "@/hooks/useMotionTier";
import { cn } from "@/lib/cn";

/**
 * Magnetic wrapper: the child drifts toward the pointer and springs back.
 * Only active for mouse input on the "full" tier — on touch it is inert.
 */
export function Magnetic({
  children,
  strength = 0.32,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const tier = useMotionTier();
  const spring = { stiffness: 220, damping: 16, mass: 0.5 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  function onMove(e: PointerEvent<HTMLSpanElement>) {
    if (tier !== "full" || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x, y }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.span>
  );
}
