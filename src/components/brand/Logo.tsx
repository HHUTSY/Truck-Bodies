"use client";

import Link from "next/link";
import { useAnimate } from "motion/react";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useMotionTier } from "@/hooks/useMotionTier";
import { cn } from "@/lib/cn";

/**
 * Brand mark: a dump-body silhouette on a chassis rail.
 * SVG morph: on hover (and on every route change) the body "hoists" —
 * the polygon morphs from its resting pose to a tipped pose rotated 24°
 * around the rear hinge. Both paths have identical structure.
 */
const REST = "M6 18 L12 18 L12 26 L40 26 L40 36 L6 36 Z";
const RAISED = "M16.3 5.7 L21.7 8.2 L18.5 15.5 L44.1 26.9 L40 36 L8.9 22.2 Z";
const EASE = [0.65, 0, 0.35, 1] as const;

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("size-10", className)} aria-hidden>
      <path data-logo-body d={REST} fill="var(--accent)" />
      <rect x="3" y="38.5" width="42" height="3" fill="currentColor" />
      <circle cx="12" cy="44.5" r="2.6" fill="currentColor" />
      <circle cx="36" cy="44.5" r="2.6" fill="currentColor" />
    </svg>
  );
}

export function Logo({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const [scope, animate] = useAnimate<HTMLAnchorElement>();
  const tier = useMotionTier();
  const pathname = usePathname();
  const first = useRef(true);

  // Hoist cycle on route change — doubles as a subtle "loaded" signal.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (tier === "reduced") return;
    animate(
      "[data-logo-body]",
      { d: [REST, RAISED, RAISED, REST] },
      { duration: 1.4, times: [0, 0.35, 0.6, 1], ease: EASE },
    );
  }, [pathname, tier, animate]);

  const hoist = (up: boolean) => {
    if (tier === "reduced") return;
    animate("[data-logo-body]", { d: up ? RAISED : REST }, { duration: 0.6, ease: EASE });
  };

  return (
    <Link
      ref={scope}
      href="/"
      aria-label="SH Truck Bodies — home"
      onPointerEnter={() => hoist(true)}
      onPointerLeave={() => hoist(false)}
      onFocus={() => hoist(true)}
      onBlur={() => hoist(false)}
      onClick={onNavigate}
      className={cn("group/logo flex items-center gap-2.5 text-fg", className)}
    >
      <LogoMark className="size-9 sm:size-10" />
      <span className="flex items-center gap-2.5 leading-none">
        <span className="font-display text-[1.55rem] font-semibold tracking-[-0.06em]">SH</span>
        <span aria-hidden className="h-7 w-px bg-line-strong" />
        <span className="font-mono text-[0.6rem] leading-[1.25] tracking-[0.2em] text-muted">
          TRUCK
          <br />
          BODIES
        </span>
      </span>
    </Link>
  );
}
