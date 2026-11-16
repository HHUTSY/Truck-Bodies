"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ChevronDown, Phone } from "@/components/icons";
import { BodyGlyph } from "@/components/illustrations/BodyGlyph";
import { getLenis } from "@/components/motion/SmoothScroll";
import { MobileMenu, MenuButton, type MenuOrigin } from "@/components/layout/MobileMenu";
import { mainNav, quoteHref, site, type NavGroup, type NavItem } from "@/lib/site";
import { cn } from "@/lib/cn";

const isGroup = (item: NavItem): item is NavGroup => "children" in item;
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Site header
 *  - transparent over the hero, frosted graphite once scrolled
 *  - hides on scroll-down, returns on scroll-up (never while a menu is open)
 *  - desktop: animated-underline links, Products mega panel, Where-to-Buy dropdown
 *  - mobile: morphing burger → full-screen menu
 * The header carries `view-transition-name: site-header` so it stays
 * anchored while page content transitions underneath.
 */
export function Header() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuOrigin, setMenuOrigin] = useState<MenuOrigin>({ x: 0, y: 0, radius: 1600 });
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const headerRef = useRef<HTMLElement>(null);

  // Close everything on navigation ("adjust state on prop change" pattern).
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpenGroup(null);
    setMenuOpen(false);
  }

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 16);
    if (Math.abs(y - prev) < 6) return;
    setHidden(y > 360 && y > prev);
  });

  // Mobile menu side-effects: scroll lock, inert background, Escape, html flag.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.menuOpen = String(menuOpen);
    if (!menuOpen) return;
    const background = [document.getElementById("main"), document.getElementById("site-footer")];
    const setInert = (value: boolean) => {
      for (const el of background) if (el) el.inert = value;
    };
    setInert(true);
    getLenis()?.stop();
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      setInert(false);
      getLenis()?.start();
      root.style.overflow = "";
      root.dataset.menuOpen = "false";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // Desktop dropdowns: Escape + click-outside.
  useEffect(() => {
    if (!openGroup) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenGroup(null);
      headerRef.current?.querySelector<HTMLButtonElement>(`[data-trigger="${openGroup}"]`)?.focus();
    };
    const onDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenGroup(null);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [openGroup]);

  const openNow = (label: string) => {
    window.clearTimeout(closeTimer.current);
    setOpenGroup(label);
  };
  const closeSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenGroup(null), 160);
  };

  const isActive = (href?: string) => !!href && (pathname === href || pathname.startsWith(href + "/"));
  const solid = scrolled || !!openGroup;

  return (
    <>
      <header
        id="top"
        ref={headerRef}
        style={{ viewTransitionName: "site-header" }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[translate] duration-500 ease-[var(--ease-out-expo)]",
          hidden && !openGroup && !menuOpen && "-translate-y-full",
        )}
      >
        {/* Frosted plate (fades in on scroll) */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 -z-10 border-b border-line bg-[color-mix(in_oklab,var(--bg)_78%,transparent)] backdrop-blur-xl transition-opacity duration-500",
            solid && !menuOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-6">
          <Logo onNavigate={() => setMenuOpen(false)} />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-3">
              {mainNav.map((item) =>
                isGroup(item) ? (
                  <li
                    key={item.label}
                    className="relative"
                    onPointerEnter={(e) => e.pointerType === "mouse" && openNow(item.label)}
                    onPointerLeave={(e) => e.pointerType === "mouse" && closeSoon()}
                  >
                    <button
                      type="button"
                      data-trigger={item.label}
                      aria-expanded={openGroup === item.label}
                      aria-controls={`menu-${item.label.replace(/\W+/g, "-").toLowerCase()}`}
                      onClick={() => setOpenGroup((g) => (g === item.label ? null : item.label))}
                      className={cn(
                        "link-underline flex h-11 items-center gap-1.5 px-3 text-[0.95rem] transition-colors hover:text-fg",
                        isActive(item.href) || openGroup === item.label ? "text-fg" : "text-steel-300",
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform duration-500",
                          openGroup === item.label && "rotate-180",
                        )}
                      />
                    </button>
                    {item.label !== "Products" && (
                      <SmallDropdown
                        group={item}
                        open={openGroup === item.label}
                        onPointerEnter={() => openNow(item.label)}
                        onPointerLeave={closeSoon}
                        isActive={isActive}
                      />
                    )}
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "link-underline flex h-11 items-center px-3 text-[0.95rem] transition-colors hover:text-fg",
                        isActive(item.href) ? "text-fg" : "text-steel-300",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href={site.phone.href}
              className="link-underline hidden items-center gap-2 font-mono text-sm text-steel-300 transition-colors hover:text-fg xl:flex"
            >
              <Phone className="size-4 text-accent-text" />
              {site.phone.display}
            </a>
            <Button href={quoteHref} size="sm" magnetic className="hidden sm:inline-flex">
              Get a Quote
            </Button>
            <MenuButton
              open={menuOpen}
              onToggle={(origin) => {
                setMenuOrigin(origin);
                setMenuOpen((o) => !o);
              }}
            />
          </div>
        </div>

        <MegaPanel
          open={openGroup === "Products"}
          onPointerEnter={() => openNow("Products")}
          onPointerLeave={closeSoon}
        />
      </header>

      <MobileMenu open={menuOpen} origin={menuOrigin} onClose={() => setMenuOpen(false)} />
    </>
  );
}

/* ------------------------------------------------------------------ */

function MegaPanel({
  open,
  onPointerEnter,
  onPointerLeave,
}: {
  open: boolean;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}) {
  const products = (mainNav.find((i) => i.label === "Products") as NavGroup).children;
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="menu-products"
          key="mega"
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.55, ease: EASE }}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          className="absolute inset-x-0 top-full hidden border-b border-line bg-bg-elevated shadow-lift lg:block"
        >
          <div className="container-site grid grid-cols-12 gap-6 py-10">
            <div className="col-span-3 flex flex-col justify-between border-r border-line pr-8">
              <div>
                <p className="eyebrow text-accent-text">[ Product range ]</p>
                <p className="mt-5 font-display text-2xl leading-tight tracking-tight">
                  Standard bodies, built short-lead. Custom bodies, built to spec.
                </p>
              </div>
              <div className="mt-8 grid gap-3">
                <Link href="/standard-truck-bodies" className="link-underline inline-flex w-fit items-center gap-2 text-sm">
                  All standard bodies <ArrowRight className="size-4" />
                </Link>
                <Link href="/configurator" className="link-underline inline-flex w-fit items-center gap-2 text-sm text-accent-text">
                  Open the configurator <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
            <ul className="col-span-9 grid grid-cols-5 gap-3">
              {products.map((p, i) => (
                <motion.li
                  key={p.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.08 + i * 0.05 }}
                >
                  <Link
                    href={p.href}
                    data-cursor="view"
                    data-cursor-label="Explore"
                    className="group/mega flex h-full flex-col border border-line bg-surface/50 p-4 transition-colors duration-300 hover:border-line-strong hover:bg-surface"
                  >
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                    <span className="mt-3 block text-steel-400 transition-[color,translate] duration-500 group-hover/mega:-translate-y-1 group-hover/mega:text-steel-200">
                      <BodyGlyph body={p.glyph ?? "dump"} />
                    </span>
                    <span className="mt-4 font-display text-lg leading-tight">{p.label}</span>
                    <span className="mt-1.5 text-sm leading-snug text-muted">{p.description}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SmallDropdown({
  group,
  open,
  onPointerEnter,
  onPointerLeave,
  isActive,
}: {
  group: NavGroup;
  open: boolean;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  isActive: (href?: string) => boolean;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.ul
          id={`menu-${group.label.replace(/\W+/g, "-").toLowerCase()}`}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: EASE }}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          className="absolute left-0 top-full mt-2 w-60 border border-line bg-bg-elevated/95 p-2 shadow-lift backdrop-blur-xl"
        >
          {group.children.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                aria-current={isActive(c.href) ? "page" : undefined}
                className="flex min-h-11 items-center justify-between px-3 text-sm text-steel-300 transition-colors hover:bg-surface hover:text-fg"
              >
                {c.label}
                <ArrowRight className="size-3.5" />
              </Link>
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
