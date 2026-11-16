"use client";

import { useEffect } from "react";

/**
 * One IntersectionObserver for the whole site.
 *
 * Any element (server or client component) can opt into a scroll reveal
 * purely with attributes — no per-element hydration:
 *   <div data-reveal>…</div>                      fade + rise
 *   <div data-reveal="fade|scale" style={{"--d": "120ms"}}>…</div>
 *   <SplitText trigger="view" />                  staggered word masks
 *
 * Reveals run through the Web Animations API (compositor-friendly
 * transform/opacity) and never touch classes or attributes, so they can't
 * cause hydration mismatches in client components that hydrate later.
 * The hidden start state lives in CSS (`.js [data-reveal]`), and the
 * reduced-motion `!important` rules always win over the animations.
 */
const SELECTOR = "[data-reveal], [data-split='view']";
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

function cssMs(el: Element, prop: string, fallback = 0) {
  const v = getComputedStyle(el).getPropertyValue(prop).trim();
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : fallback;
}

function reveal(el: HTMLElement, lite: boolean) {
  const delay = cssMs(el, "--d");
  if (el.dataset.split === "view") {
    const stagger = cssMs(el, "--stagger", 55);
    el.querySelectorAll<HTMLElement>(".split-inner").forEach((inner) => {
      const i = Number(inner.style.getPropertyValue("--i")) || 0;
      inner.animate(
        [{ transform: "translate3d(0,110%,0) rotate(4deg)" }, { transform: "none" }],
        { duration: lite ? 800 : 1200, delay: delay + i * stagger, easing: EASE, fill: "both" },
      );
    });
    return;
  }
  const kind = el.dataset.reveal;
  const from =
    kind === "fade"
      ? { opacity: 0 }
      : kind === "scale"
        ? { opacity: 0, transform: "scale(0.96)" }
        : { opacity: 0, transform: "translate3d(0,2rem,0)" };
  el.animate([from, { opacity: 1, transform: "none" }], {
    duration: lite ? 750 : 1000,
    delay,
    easing: EASE,
    fill: "both",
  });
}

export function RevealObserver() {
  useEffect(() => {
    const done = new WeakSet<Element>();
    const lite = () => document.documentElement.dataset.motion === "lite";

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || done.has(entry.target)) continue;
          done.add(entry.target);
          io.unobserve(entry.target);
          reveal(entry.target as HTMLElement, lite());
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );

    const scan = () =>
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (!done.has(el)) io.observe(el);
      });
    scan();

    let queued = false;
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
