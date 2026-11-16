"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, type MouseEvent } from "react";
import { BodyGlyph } from "@/components/illustrations/BodyGlyph";
import { Button } from "@/components/ui/Button";
import { Mail, MapPin, Phone } from "@/components/icons";
import { useMotionTier } from "@/hooks/useMotionTier";
import { productNav, quoteHref, site } from "@/lib/site";
import { cn } from "@/lib/cn";

const EASE_IO = [0.83, 0, 0.17, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/* Burger ⇄ X — two strokes whose `d` morphs (same command structure). */
export type MenuOrigin = { x: number; y: number; radius: number };

const TOP = { closed: "M4 9 L20 9", open: "M6 6 L18 18" };
const BOTTOM = { closed: "M9 15 L20 15", open: "M6 18 L18 6" };

export function MenuButton({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: (origin: MenuOrigin) => void;
}) {
  function handle(e: MouseEvent<HTMLButtonElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    // radius that covers the farthest viewport corner from the button
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) + 24;
    onToggle({ x, y, radius });
  }
  return (
    <button
      type="button"
      onClick={handle}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? "Close menu" : "Open menu"}
      className="relative grid size-11 place-items-center border border-line-strong text-fg transition-colors hover:border-fg lg:hidden"
    >
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.6}>
        <motion.path initial={false} animate={{ d: open ? TOP.open : TOP.closed }} transition={{ duration: 0.45, ease: EASE_IO }} />
        <motion.path
          initial={false}
          animate={{ d: open ? BOTTOM.open : BOTTOM.closed }}
          transition={{ duration: 0.45, ease: EASE_IO }}
          stroke="var(--accent)"
        />
      </svg>
    </button>
  );
}

const primaryLinks = [
  { label: "Gallery", href: "/gallery" },
  { label: "Find a Dealer", href: "/where-to-buy" },
  { label: "Become a Dealer", href: "/where-to-buy/become-a-dealer" },
  { label: "Warranty", href: "/warranty" },
  { label: "Contact", href: "/contact" },
];

/**
 * Full-screen mobile menu. Opens with a clip-path circle that grows from the
 * burger button; links rise in with a stagger. Background content is made
 * `inert` by the Header while open, so focus stays inside header + menu.
 */
export function MobileMenu({
  open,
  origin,
  onClose,
}: {
  open: boolean;
  origin: MenuOrigin;
  onClose: () => void;
}) {
  const tier = useMotionTier();
  const firstLink = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => firstLink.current?.focus({ preventScroll: true }), 350);
    return () => window.clearTimeout(t);
  }, [open]);

  const simple = tier === "reduced";
  const at = `at ${origin.x}px ${origin.y}px`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-lenis-prevent
          initial={simple ? { opacity: 0 } : { clipPath: `circle(0px ${at})` }}
          animate={simple ? { opacity: 1 } : { clipPath: `circle(${origin.radius}px ${at})` }}
          exit={simple ? { opacity: 0 } : { clipPath: `circle(0px ${at})` }}
          transition={{ duration: simple ? 0.2 : 0.75, ease: EASE_IO }}
          className="fixed inset-0 z-[45] overflow-y-auto overscroll-contain bg-bg pt-[var(--header-h)] lg:hidden"
        >
          <div aria-hidden className="bg-blueprint pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
          <div className="container-site relative flex min-h-full flex-col pb-10 pt-6">
            {/* Products */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.25 }}
            >
              <div className="flex items-baseline justify-between">
                <p className="eyebrow text-accent-text">[ Products ]</p>
                <Link
                  ref={firstLink}
                  href="/standard-truck-bodies"
                  onClick={onClose}
                  className="link-underline eyebrow text-muted"
                >
                  View all
                </Link>
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-2">
                {productNav.map((p) => (
                  <li key={p.href} className={cn(p.glyph === "custom" && "col-span-2")}>
                    <Link
                      href={p.href}
                      onClick={onClose}
                      className="flex h-full min-h-20 flex-col justify-between gap-2 border border-line bg-surface/60 p-3 active:bg-surface"
                    >
                      <span className={cn("block text-steel-400", p.glyph === "custom" ? "w-1/2" : "w-full")}>
                        <BodyGlyph body={p.glyph ?? "dump"} />
                      </span>
                      <span className="font-display text-[1.05rem] leading-tight">{p.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Primary links */}
            <nav aria-label="Mobile" className="mt-8">
              <ul className="border-t border-line">
                {primaryLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.32 + i * 0.05 }}
                    className="border-b border-line"
                  >
                    <Link
                      href={l.href}
                      onClick={onClose}
                      className="flex min-h-16 items-center justify-between gap-4 py-3 font-display text-[clamp(1.9rem,8vw,2.6rem)] leading-none tracking-[-0.04em] active:text-accent-text"
                    >
                      {l.label}
                      <span className="font-mono text-xs tracking-normal text-muted">0{i + 1}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-auto grid gap-5 pt-10"
            >
              <Button href={quoteHref} size="lg" onClick={onClose} className="w-full">
                Request a Quote
              </Button>
              <div className="grid gap-3 text-sm text-muted">
                <a href={site.phone.href} className="flex min-h-11 items-center gap-3">
                  <Phone className="size-4 text-accent-text" /> {site.phone.display}
                </a>
                <a href={`mailto:${site.email}`} className="flex min-h-11 items-center gap-3">
                  <Mail className="size-4 text-accent-text" /> {site.email}
                </a>
                <p className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-accent-text" />
                  {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
