"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Section divider whose hairline morphs into a "dump body" notch profile
 * when it enters the viewport — a quiet nod to the product silhouette.
 * Both paths share identical command structure so `d` interpolates.
 * A signal-orange "plotter head" travels the line (transform only).
 */
const FLAT = "M0 30 L340 30 L372 30 L388 30 L560 30 L580 30 L1200 30";
const NOTCH = "M0 30 L340 30 L372 6 L388 6 L560 6 L580 30 L1200 30";
const EASE = [0.83, 0, 0.17, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -15% 0px" } as const;

export function MorphDivider({
  index,
  label,
  className,
}: {
  index?: string;
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("container-site", className)} aria-hidden>
      <div className="relative">
        <svg viewBox="0 0 1200 36" preserveAspectRatio="none" className="h-9 w-full overflow-visible">
          <motion.path
            d={FLAT}
            initial={{ d: FLAT }}
            whileInView={{ d: NOTCH }}
            viewport={VIEWPORT}
            transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
            fill="none"
            stroke="var(--line-strong)"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <motion.span
          className="absolute inset-x-0 bottom-[5px] block h-0"
          initial={{ x: "0%", opacity: 1 }}
          whileInView={{ x: "100%", opacity: [1, 1, 0] }}
          viewport={VIEWPORT}
          transition={{ duration: 2.2, ease: EASE }}
        >
          <span className="absolute -left-1 -top-1 block size-2 bg-accent" />
        </motion.span>
        {(index || label) && (
          <div className="eyebrow absolute left-0 top-full mt-3 flex gap-3 text-muted">
            {index && <span className="text-accent-text">{index}</span>}
            {label && <span>{label}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
