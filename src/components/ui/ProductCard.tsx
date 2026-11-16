"use client";

import Link from "next/link";
import { motion, useSpring } from "motion/react";
import { ViewTransition, useRef, type PointerEvent, type ReactNode } from "react";
import { ArrowUpRight } from "@/components/icons";
import { useMotionTier } from "@/hooks/useMotionTier";
import { cn } from "@/lib/cn";

/**
 * Product card
 *  - 3D parallax tilt + counter-moving media (mouse, "full" tier only)
 *  - pointer-tracked signal glow (CSS vars, no re-render)
 *  - lift + glow border on hover; press-scale on touch
 *  - media and title are wrapped in named <ViewTransition>s so they MORPH
 *    into the product page hero (`product-media-{slug}` / `product-title-{slug}`)
 */
export function ProductCard({
  slug,
  href,
  index,
  title,
  summary,
  media,
  meta,
  className,
}: {
  slug: string;
  href: string;
  index: string;
  title: string;
  summary?: string;
  media: ReactNode;
  meta?: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const tier = useMotionTier();
  const spring = { stiffness: 160, damping: 18, mass: 0.6 };
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const mediaX = useSpring(0, spring);
  const mediaY = useSpring(0, spring);

  function onMove(e: PointerEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    el.style.setProperty("--mx", `${px}px`);
    el.style.setProperty("--my", `${py}px`);
    if (tier !== "full" || e.pointerType !== "mouse") return;
    const nx = px / r.width - 0.5;
    const ny = py / r.height - 0.5;
    rotateX.set(-ny * 7);
    rotateY.set(nx * 9);
    mediaX.set(-nx * 18);
    mediaY.set(-ny * 14);
  }
  function onLeave() {
    rotateX.set(0);
    rotateY.set(0);
    mediaX.set(0);
    mediaY.set(0);
  }

  return (
    <Link
      ref={ref}
      href={href}
      prefetch
      transitionTypes={["nav-forward"]}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      data-cursor="view"
      data-cursor-label="View"
      className={cn("group/card block [perspective:1400px] active:scale-[0.985] transition-[scale] duration-300", className)}
    >
      <motion.article
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative flex h-full flex-col overflow-hidden border border-line bg-surface transition-[translate,box-shadow,border-color] duration-500 ease-[var(--ease-out-expo)] group-hover/card:-translate-y-1.5 group-hover/card:border-transparent group-hover/card:shadow-glow"
      >
        <div className="card-glow" aria-hidden />

        {/* Media */}
        <div className="relative aspect-[4/3] overflow-hidden bg-bg-elevated">
          <ViewTransition name={`product-media-${slug}`} share="morph" default="none">
            <div className="absolute inset-0">
              <motion.div style={{ x: mediaX, y: mediaY }} className="absolute -inset-[5%]">
                <div className="size-full scale-100 transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover/card:scale-[1.07]">
                  {media}
                </div>
              </motion.div>
            </div>
          </ViewTransition>
          <span className="absolute left-4 top-4 font-mono text-xs text-muted">{index}</span>
        </div>

        {/* Copy */}
        <div className="relative z-[2] flex flex-1 flex-col gap-3 border-t border-line p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <ViewTransition name={`product-title-${slug}`} share="morph" default="none">
              <h3 className="font-display text-2xl leading-none tracking-tight md:text-[1.75rem]">{title}</h3>
            </ViewTransition>
            <span className="grid size-10 shrink-0 place-items-center border border-line-strong transition-[background-color,border-color,color,rotate] duration-500 group-hover/card:rotate-45 group-hover/card:border-accent group-hover/card:bg-accent group-hover/card:text-accent-ink">
              <ArrowUpRight className="size-4" />
            </span>
          </div>
          {summary && <p className="text-sm leading-relaxed text-muted">{summary}</p>}
          {meta && <div className="mt-auto flex flex-wrap gap-1.5 pt-2">{meta}</div>}
        </div>
      </motion.article>
    </Link>
  );
}
