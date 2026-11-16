"use client";

import Link from "next/link";
import { ViewTransition, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "@/components/icons";
import { getLenis } from "@/components/motion/SmoothScroll";
import { SplitText } from "@/components/motion/SplitText";
import { Photo } from "@/components/ui/Photo";
import { products, productHref } from "@/content/products";
import { useMotionTier } from "@/hooks/useMotionTier";
import { cn } from "@/lib/cn";

/**
 * PINNED HORIZONTAL SHOWCASE
 * Desktop "full" tier: GSAP ScrollTrigger pins the section and scrubs the
 * track sideways as you scroll down; each product photo gets its own
 * parallax via `containerAnimation`. GSAP is code-split (dynamic import).
 * Touch / low-power / reduced motion: a native swipeable scroll-snap row.
 *
 * Product photo + title carry `product-media-{slug}` / `product-title-{slug}`
 * view-transition names, so clicking morphs them into the product hero.
 */
export function ProductShowcase() {
  const tier = useMotionTier();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (tier !== "full" || !window.matchMedia("(min-width: 64rem)").matches) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled || !sectionRef.current || !trackRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = getLenis();
      const onLenis = () => ScrollTrigger.update();
      lenis?.on("scroll", onLenis);
      setPinned(true);

      const ctx = gsap.context(() => {
        const track = trackRef.current!;
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.9,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
        // Per-panel photo parallax tied to the horizontal motion
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.fromTo(
            el,
            { xPercent: 8 },
            {
              xPercent: -8,
              ease: "none",
              scrollTrigger: { trigger: el, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
            },
          );
        });
      }, sectionRef);

      // Fonts/images can change widths after load
      requestAnimationFrame(() => ScrollTrigger.refresh());
      cleanup = () => {
        ctx.revert();
        lenis?.off("scroll", onLenis);
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
      setPinned(false);
    };
  }, [tier]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="showcase-title"
      className="relative overflow-hidden border-t border-line bg-bg lg:min-h-[100svh]"
    >
      <div className={cn("flex flex-col", pinned && "h-[100svh]")}>
        {/* Header row */}
        <div className="container-site flex items-end justify-between gap-6 pb-8 pt-20 lg:pb-6 lg:pt-[calc(var(--header-h)+1rem)]">
          <div>
            <p className="eyebrow flex items-center gap-3 text-muted">
              <span className="text-accent-text">[ 01 ]</span>
              <span aria-hidden className="h-px w-8 bg-line-strong" />
              Product range
            </p>
            <h2 id="showcase-title" className="mt-5 text-display-lg lg:text-display-md">
              <SplitText lines={["Four standard families.", { text: "Infinite configurations.", className: "text-muted" }]} />
            </h2>
          </div>
          <Link href="/standard-truck-bodies" className="link-underline hidden shrink-0 items-center gap-2 text-sm md:inline-flex">
            All standard bodies <ArrowUpRight className="size-4" />
          </Link>
        </div>

        {/* Track */}
        <div
          className={cn(
            "relative flex-1",
            pinned ? "overflow-visible" : "no-scrollbar snap-x snap-mandatory overflow-x-auto overscroll-x-contain",
          )}
        >
          <div
            ref={trackRef}
            className={cn("flex h-full gap-3 px-[var(--gutter)] pb-10 md:gap-4 lg:pb-6", pinned && "will-change-transform")}
          >
            {products.map((p, i) => (
              <Link
                key={p.slug}
                href={productHref(p.slug)}
                prefetch
                transitionTypes={["nav-forward"]}
                data-cursor="view"
                data-cursor-label="Explore"
                className="group/panel relative flex w-[86vw] shrink-0 snap-start flex-col overflow-hidden border border-line bg-surface transition-[border-color] duration-500 hover:border-line-strong sm:w-[70vw] lg:w-[min(72vw,1100px)] lg:flex-row"
              >
                {/* Copy */}
                <div className="relative z-[2] flex flex-col justify-between gap-6 p-6 md:p-8 lg:w-[42%] lg:gap-4 lg:p-8 xl:p-10">
                  <div>
                    <span
                      aria-hidden
                      className="block font-display text-[clamp(4rem,9vw,8.5rem)] font-semibold leading-[0.8] tracking-[-0.06em] text-transparent lg:text-[clamp(3.5rem,5.5vw,6rem)] [-webkit-text-stroke:1px_var(--line-strong)] transition-[-webkit-text-stroke-color] duration-500 group-hover/panel:[-webkit-text-stroke-color:var(--accent)]"
                    >
                      {p.index}
                    </span>
                    <ViewTransition name={`product-title-${p.slug}`} share="morph" default="none">
                      <h3 className="mt-6 font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-none tracking-[-0.03em]">
                        {p.name}
                      </h3>
                    </ViewTransition>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted md:text-base">{p.tagline}</p>
                  </div>
                  <div>
                    <dl className="grid grid-cols-2 gap-px border border-line bg-line">
                      {p.highlights.map((h) => (
                        <div key={h.label} className="bg-surface p-3">
                          <dt className="eyebrow text-[0.6rem] text-muted">{h.label}</dt>
                          <dd className="mt-1.5 font-mono text-[0.8rem] text-fg">{h.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <span className="mt-6 inline-flex items-center gap-3 text-sm font-medium">
                      <span className="grid size-10 place-items-center border border-line-strong transition-[background-color,border-color,color,rotate] duration-500 group-hover/panel:rotate-45 group-hover/panel:border-accent group-hover/panel:bg-accent group-hover/panel:text-accent-ink">
                        <ArrowUpRight className="size-4" />
                      </span>
                      Explore {p.shortName.toLowerCase()} bodies
                    </span>
                  </div>
                </div>

                {/* Photo */}
                <div className="relative min-h-[15rem] flex-1 overflow-hidden bg-[radial-gradient(ellipse_at_55%_45%,#1f242b,#0f1114_70%)] sm:min-h-[20rem] lg:min-h-0">
                  <div aria-hidden className="bg-blueprint absolute inset-0 opacity-40" />
                  <ViewTransition name={`product-media-${p.slug}`} share="morph" default="none">
                    <div className="absolute inset-[6%]">
                      <div data-parallax className="size-full">
                        <div className="size-full transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover/panel:scale-[1.05]">
                          <Photo
                            id={p.hero}
                            alt={p.heroAlt}
                            sizes="(min-width: 1024px) 45vw, 86vw"
                            fit="contain"
                            priority={i === 0}
                          />
                        </div>
                      </div>
                    </div>
                  </ViewTransition>
                  <span className="absolute bottom-4 right-4 font-mono text-[0.65rem] tracking-wider text-muted">
                    {p.highlights[0].value}
                  </span>
                </div>
              </Link>
            ))}

            {/* Custom panel */}
            <Link
              href="/custom-truck-bodies"
              data-cursor="view"
              data-cursor-label="Custom"
              className="group/panel relative flex w-[86vw] shrink-0 snap-start flex-col justify-between overflow-hidden border border-line bg-accent p-6 text-accent-ink sm:w-[70vw] md:p-8 lg:w-[min(46vw,640px)] lg:p-10"
            >
              <div className="absolute inset-0 opacity-25 mix-blend-multiply">
                <Photo id="custom-body" alt="" sizes="40vw" fit="contain" imgClassName="grayscale" />
              </div>
              <span className="relative font-display text-[clamp(4rem,9vw,8.5rem)] font-semibold leading-[0.8] tracking-[-0.06em] lg:text-[clamp(3.5rem,5.5vw,6rem)]">05</span>
              <div className="relative">
                <h3 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-none tracking-[-0.03em]">
                  Custom bodies.
                  <br />
                  Built to your spec.
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-accent-ink/80 md:text-base">
                  Backpack toolboxes, beavertails, winch tracks, lift-out posts — if you can draw it, we can build it.
                </p>
                <span className="mt-6 inline-flex items-center gap-3 text-sm font-semibold">
                  <span className="grid size-10 place-items-center border border-accent-ink/40 transition-[rotate,background-color,color] duration-500 group-hover/panel:rotate-45 group-hover/panel:bg-accent-ink group-hover/panel:text-accent">
                    <ArrowUpRight className="size-4" />
                  </span>
                  Start a custom build
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Progress */}
        <div className="container-site hidden pb-6 lg:block" aria-hidden>
          <div className="flex items-center gap-4 font-mono text-[0.65rem] tracking-[0.14em] text-muted">
            <span>SCROLL</span>
            <span className="relative h-px flex-1 overflow-hidden bg-line-strong">
              <span ref={progressRef} className="absolute inset-0 origin-left scale-x-0 bg-accent" />
            </span>
            <span>05</span>
          </div>
        </div>
      </div>
    </section>
  );
}
