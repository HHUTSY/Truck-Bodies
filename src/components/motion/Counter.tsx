"use client";

import { animate } from "motion";
import { useEffect, useRef } from "react";

/**
 * Number counter that runs once when scrolled into view.
 * SSR renders the final value (SEO + no-JS correct); the count-up only
 * plays when the element is visible and motion is allowed.
 */
export function Counter({
  to,
  from = 0,
  duration = 2.2,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fmt = (v: number) =>
      v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.textContent = fmt(from);
    let stop: (() => void) | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const controls = animate(from, to, {
          duration,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (v) => {
            el.textContent = fmt(v);
          },
        });
        stop = () => controls.stop();
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      stop?.();
      el.textContent = fmt(to);
    };
  }, [to, from, duration, decimals]);

  return (
    <span className={className}>
      {prefix}
      <span ref={ref} className="tabular-nums">
        {to.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      </span>
      {suffix}
    </span>
  );
}
