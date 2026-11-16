"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { ArrowRight } from "@/components/icons";
import { useMotionTier } from "@/hooks/useMotionTier";
import {
  BODY_X0,
  BODY_X1,
  bodies,
  CAB_DETAILS,
  CAB_PATH,
  CAB_WINDOW,
  FLOOR_Y,
  WHEELS,
  WHEEL_Y,
} from "@/lib/bodies";
import { cn } from "@/lib/cn";

const MORPH = { duration: 1, ease: [0.83, 0, 0.17, 1] as const };
const CYCLE_MS = 4200;

/**
 * Hero centrepiece: a technical side-elevation of a truck whose body
 * MORPHS between Dump → Landscape → Platform → Chipper.
 *
 * - SVG `d` morphing (identical path structures, see lib/bodies.ts)
 * - "plotter" wipe on first paint (pure CSS → no hydration wait)
 * - auto-advance driven by a CSS progress bar's `animationend`
 *   (paused off-screen, on hover/focus, and disabled for reduced motion)
 * - accessible tabs (roving arrow keys) — HTML labels so text stays legible
 *   on a 360px phone instead of shrinking with the SVG
 */
export function TruckShowcase({ className }: { className?: string }) {
  const tier = useMotionTier();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const body = bodies[active];
  const autoplay = tier !== "reduced";

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const next = () => setActive((i) => (i + 1) % bodies.length);

  function onTabKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const n = (i + dir + bodies.length) % bodies.length;
    setActive(n);
    tabRefs.current[n]?.focus();
  }

  const running = autoplay && inView && !paused;
  const ticks = Array.from({ length: 61 }, (_, i) => i * 20);

  return (
    <div
      ref={rootRef}
      className={cn("relative", className)}
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* ---------- Drawing ---------- */}
      <div id="showcase-panel" role="tabpanel" aria-labelledby={`showcase-tab-${body.key}`} className="@container relative">
      <Link
        href={body.href}
        aria-label={`Explore ${body.name} — side elevation drawing`}
        data-cursor="view"
        data-cursor-label="Explore"
        className="group/draw relative block"
      >
        <div className="plot-in relative" style={{ "--d": "450ms" } as CSSProperties}>
          <svg viewBox="0 0 1200 500" className="h-auto w-full overflow-visible" aria-hidden>
            <defs>
              <linearGradient id="body-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--accent)" stopOpacity="0.22" />
                <stop offset="1" stopColor="var(--accent)" stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="steel-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#eceef0" stopOpacity="0.07" />
                <stop offset="1" stopColor="#eceef0" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Ruler / ground */}
            <g stroke="var(--line-strong)" vectorEffect="non-scaling-stroke">
              <line x1="0" y1="470" x2="1200" y2="470" vectorEffect="non-scaling-stroke" />
              {ticks.map((x) => (
                <line
                  key={x}
                  x1={x}
                  x2={x}
                  y1={470}
                  y2={x % 100 === 0 ? 484 : 477}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </g>

            {/* Chassis, cab, wheels */}
            <g fill="none" stroke="var(--fg-muted)" strokeWidth={1.25}>
              <path d={CAB_PATH} fill="url(#steel-fill)" vectorEffect="non-scaling-stroke" />
              <path d={CAB_WINDOW} vectorEffect="non-scaling-stroke" opacity={0.7} />
              <path d={CAB_DETAILS} vectorEffect="non-scaling-stroke" opacity={0.6} />
              <rect x={140} y={FLOOR_Y} width={940} height={18} vectorEffect="non-scaling-stroke" />
              {WHEELS.map((cx) => (
                <g key={cx}>
                  <circle cx={cx} cy={WHEEL_Y} r={50} fill="var(--bg)" vectorEffect="non-scaling-stroke" />
                  <circle cx={cx} cy={WHEEL_Y} r={31} vectorEffect="non-scaling-stroke" opacity={0.7} />
                  <circle cx={cx} cy={WHEEL_Y} r={8} vectorEffect="non-scaling-stroke" />
                </g>
              ))}
            </g>

            {/* The morphing body */}
            <g stroke="var(--accent)" strokeWidth={1.75} strokeLinejoin="round">
              <motion.path
                initial={false}
                animate={{ d: body.outline }}
                transition={MORPH}
                fill="url(#body-fill)"
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                initial={false}
                animate={{ d: body.ribs }}
                transition={MORPH}
                fill="none"
                opacity={0.65}
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                initial={false}
                animate={{ d: body.rail }}
                transition={MORPH}
                fill="none"
                strokeDasharray="5 6"
                opacity={0.8}
                vectorEffect="non-scaling-stroke"
              />
            </g>

            {/* Dimension lines */}
            <g stroke="var(--fg-muted)" fill="none" opacity={0.75}>
              <line x1={BODY_X0} x2={BODY_X1} y1={60} y2={60} vectorEffect="non-scaling-stroke" />
              <line x1={BODY_X0} x2={BODY_X0} y1={50} y2={70} vectorEffect="non-scaling-stroke" />
              <line x1={BODY_X1} x2={BODY_X1} y1={50} y2={70} vectorEffect="non-scaling-stroke" />
              <line x1={BODY_X0} x2={BODY_X0} y1={74} y2={FLOOR_Y} strokeDasharray="3 6" opacity={0.5} vectorEffect="non-scaling-stroke" />
              <line x1={BODY_X1} x2={BODY_X1} y1={74} y2={FLOOR_Y} strokeDasharray="3 6" opacity={0.5} vectorEffect="non-scaling-stroke" />
              <motion.line
                x1={1120}
                x2={1120}
                y2={FLOOR_Y}
                initial={false}
                animate={{ y1: body.top }}
                transition={MORPH}
                vectorEffect="non-scaling-stroke"
              />
              <motion.line
                x1={1108}
                x2={1132}
                initial={false}
                animate={{ y1: body.top, y2: body.top }}
                transition={MORPH}
                vectorEffect="non-scaling-stroke"
              />
              <line x1={1108} x2={1132} y1={FLOOR_Y} y2={FLOOR_Y} vectorEffect="non-scaling-stroke" />
            </g>
          </svg>

          {/* HTML dimension labels (stay legible at any width) */}
          <span
            className="absolute -translate-x-1/2 -translate-y-1/2 bg-bg px-2 font-mono text-[0.65rem] tracking-wider text-fg sm:text-xs"
            style={{ left: `${((BODY_X0 + BODY_X1) / 2 / 1200) * 100}%`, top: `${(60 / 500) * 100}%` }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={body.key}
                className="block"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
              >
                L {body.specs[0].value}
              </motion.span>
            </AnimatePresence>
          </span>
          <motion.span
            className="absolute left-[95.2%] hidden -translate-y-1/2 whitespace-nowrap font-mono text-xs tracking-wider text-fg md:block"
            initial={false}
            animate={{ top: `${(((body.top + FLOOR_Y) / 2) / 500) * 100}%` }}
            transition={MORPH}
          >
            <span className="block rotate-180 [writing-mode:vertical-rl]">H {body.height}</span>
          </motion.span>
        </div>

        {/* Plotter scan line */}
        <span
          aria-hidden
          className="plot-scan pointer-events-none absolute inset-y-0 left-0 w-px bg-accent shadow-[0_0_24px_2px_rgba(255,91,20,0.6)]"
          style={{ "--d": "450ms", "--scan-w": "100cqw" } as CSSProperties}
        />
      </Link>
      </div>

      {/* ---------- Tabs + caption ---------- */}
      <div className="mt-6 grid gap-5 md:mt-8 md:grid-cols-12 md:items-end">
        <div role="tablist" aria-label="Body types" className="grid grid-cols-4 gap-1.5 md:col-span-8">
          {bodies.map((b, i) => (
            <button
              key={b.key}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`showcase-tab-${b.key}`}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls="showcase-panel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={cn(
                "group/tab relative flex min-h-14 flex-col justify-between gap-2 border-t pb-1 pt-3 text-left transition-colors",
                i === active ? "border-transparent text-fg" : "border-line-strong text-muted hover:text-fg",
              )}
            >
              {/* progress bar: its animationend advances the showcase */}
              <span aria-hidden className="absolute inset-x-0 -top-px h-px overflow-hidden">
                {i === active && (
                  <span
                    key={`${active}-${autoplay}`}
                    className={cn("block h-full bg-accent", autoplay ? "progress-fill" : "")}
                    style={
                      {
                        "--progress-dur": `${CYCLE_MS}ms`,
                        animationPlayState: running ? "running" : "paused",
                      } as CSSProperties
                    }
                    onAnimationEnd={next}
                  />
                )}
              </span>
              <span className="font-mono text-[0.65rem] tracking-wider text-muted">{b.index}</span>
              <span className="text-[0.8rem] leading-tight sm:text-sm md:text-base">
                {b.name.replace(" Bodies", "")}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-end justify-between gap-6 md:col-span-4 md:justify-end">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={body.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="text-sm text-muted md:text-right"
            >
              {body.note}
            </motion.p>
          </AnimatePresence>
          <Link
            href={body.href}
            aria-label={`Explore ${body.name}`}
            className="grid size-12 shrink-0 place-items-center border border-line-strong transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
          >
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
