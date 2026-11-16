"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useMotionTier } from "@/hooks/useMotionTier";

/**
 * Custom cursor — desktop "full" tier only.
 *
 * States are declared in markup, so server components can opt in:
 *   data-cursor="view"  data-cursor-label="View"   → filled accent disc + label
 *   data-cursor="drag"  data-cursor-label="Drag"
 *   data-cursor="link"                              → enlarged ring
 *   data-cursor="hide"                              → ring hidden (e.g. over video)
 * Links/buttons get "link" automatically; form fields fall back to the native cursor.
 *
 * Position updates go straight to motion values (no React renders per frame);
 * React only re-renders when the *state* changes.
 */
type CursorState = { kind: "default" | "link" | "view" | "drag" | "hidden"; label?: string };

const INTERACTIVE = "a, button, [role='button'], label, summary, [data-cursor]";
const FIELDS = "input, textarea, select, [contenteditable='true'], iframe";

export function Cursor() {
  const tier = useMotionTier();
  if (tier !== "full") return null;
  return <CursorInner />;
}

function CursorInner() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 420, damping: 36, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 420, damping: 36, mass: 0.6 });
  const [state, setState] = useState<CursorState>({ kind: "default" });
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;
      let next: CursorState = { kind: "default" };
      if (target.closest(FIELDS)) {
        next = { kind: "hidden" };
      } else {
        const el = target.closest(INTERACTIVE) as HTMLElement | null;
        if (el) {
          const kind = el.dataset.cursor; // "view" | "drag" | "link" | "hide" | undefined
          if (kind === "view" || kind === "drag") next = { kind, label: el.dataset.cursorLabel ?? (kind === "view" ? "View" : "Drag") };
          else if (kind === "hide") next = { kind: "hidden" };
          else next = { kind: "link" };
        }
      }
      setState((prev) => (prev.kind === next.kind && prev.label === next.label ? prev : next));
    };

    const onLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };
    const onDown = () => root.style.setProperty("--cursor-press", "0.85");
    const onUp = () => root.style.setProperty("--cursor-press", "1");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });

    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [x, y]);

  return (
    <div
      aria-hidden
      className="cursor-layer pointer-events-none fixed inset-0 z-[100] transition-opacity duration-300"
      data-visible={visible}
      style={{ viewTransitionName: "cursor" }}
    >
      <motion.div className="cursor-ring" data-state={state.kind} style={{ x: ringX, y: ringY }}>
        {/* 0×0 wrapper → scales around the pointer for the press effect */}
        <span className="absolute left-0 top-0 transition-[scale] duration-300" style={{ scale: "var(--cursor-press, 1)" }}>
          <span className="ring" />
        </span>
        <span className="label">{state.label}</span>
      </motion.div>
      <motion.div className="cursor-dot" style={{ x, y }}>
        <span />
      </motion.div>
    </div>
  );
}
