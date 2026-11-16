"use client";

import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Close } from "@/components/icons";
import { getLenis } from "@/components/motion/SmoothScroll";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/cn";

export type LightboxItem = { id: string; alt: string };

const EASE = [0.16, 1, 0.3, 1] as const;
const noop = () => () => {};
/** true only after hydration — portals need document.body */
const useMounted = () => useSyncExternalStore(noop, () => true, () => false);

/**
 * Full-screen photo viewer.
 *  - swipe / drag left-right (motion drag with velocity threshold)
 *  - ← → keys, Esc to close, focus moves to the dialog and returns on close
 *  - directional slide between photos, thumbnail rail on desktop
 *  - pauses Lenis + locks page scroll while open
 */
export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const open = index !== null;
  const [prevIndex, setPrevIndex] = useState(index);
  const [dir, setDir] = useState(1);
  if (prevIndex !== index) {
    if (index !== null && prevIndex !== null) {
      const forward = (index - prevIndex + items.length) % items.length <= items.length / 2;
      setDir(forward ? 1 : -1);
    }
    setPrevIndex(index);
  }

  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<Element | null>(null);

  const go = (step: number) => {
    if (index === null) return;
    onIndexChange((index + step + items.length) % items.length);
  };

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement;
    closeRef.current?.focus({ preventScroll: true });
    getLenis()?.stop();
    document.documentElement.style.overflow = "hidden";
    return () => {
      getLenis()?.start();
      document.documentElement.style.overflow = "";
      (returnFocus.current as HTMLElement | null)?.focus?.({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -70 || info.velocity.x < -450) go(1);
    else if (info.offset.x > 70 || info.velocity.x > 450) go(-1);
  }

  const item = index !== null ? items[index] : null;
  const mounted = useMounted();
  if (!mounted) return null;

  // Portal to <body>: <main> is its own stacking context, so an in-place
  // overlay could never sit above the fixed header / mobile action bar.
  return createPortal(
    <AnimatePresence>
      {open && item && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[80] flex flex-col bg-[rgb(6_7_8/0.96)] backdrop-blur-md"
        >
          {/* Top bar */}
          <div className="container-site flex h-16 shrink-0 items-center justify-between gap-4 md:h-20">
            <p className="font-mono text-xs text-muted" aria-live="polite">
              <span className="text-fg">{String(index! + 1).padStart(2, "0")}</span> / {String(items.length).padStart(2, "0")}
            </p>
            <p className="hidden max-w-xl truncate text-sm text-muted md:block">{item.alt}</p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close photo viewer"
              className="grid size-11 place-items-center border border-line-strong text-fg transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
            >
              <Close className="size-5" />
            </button>
          </div>

          {/* Stage */}
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={item.id}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ x: `${d * 18}%`, opacity: 0, scale: 0.96 }),
                  center: { x: 0, opacity: 1, scale: 1 },
                  exit: (d: number) => ({ x: `${d * -18}%`, opacity: 0, scale: 0.96 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: EASE }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={onDragEnd}
                data-cursor="drag"
                data-cursor-label="Drag"
                className="absolute inset-x-4 inset-y-2 touch-pan-y md:inset-x-24"
              >
                <Photo
                  id={item.id}
                  alt={item.alt}
                  fit="contain"
                  sizes="100vw"
                  quality={80}
                  imgClassName="pointer-events-none select-none"
                />
              </motion.div>
            </AnimatePresence>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 hidden size-12 -translate-y-1/2 place-items-center border border-line-strong bg-bg/60 text-fg backdrop-blur transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink md:grid"
                >
                  <ArrowRight className="size-5 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 hidden size-12 -translate-y-1/2 place-items-center border border-line-strong bg-bg/60 text-fg backdrop-blur transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink md:grid"
                >
                  <ArrowRight className="size-5" />
                </button>
              </>
            )}
          </div>

          {/* Caption (mobile) + thumbnail rail */}
          <div className="container-site shrink-0 py-4">
            <p className="mb-3 text-sm text-muted md:hidden">{item.alt}</p>
            <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-faint md:hidden">Swipe to browse</p>
            <div className="no-scrollbar hidden gap-2 overflow-x-auto md:flex">
              {items.map((it, i) => (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => onIndexChange(i)}
                  aria-label={`Show photo ${i + 1}`}
                  aria-current={i === index}
                  className={cn(
                    "relative h-14 w-20 shrink-0 overflow-hidden border transition-[opacity,border-color]",
                    i === index ? "border-accent opacity-100" : "border-transparent opacity-45 hover:opacity-90",
                  )}
                >
                  <Photo id={it.id} alt="" sizes="80px" fit="cover" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
