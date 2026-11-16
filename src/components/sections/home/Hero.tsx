import type { CSSProperties } from "react";
import { MorphPlates } from "@/components/illustrations/MorphPlates";
import { TruckShowcase } from "@/components/illustrations/TruckShowcase";
import { SplitText } from "@/components/motion/SplitText";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { quoteHref, sellingPoints, site } from "@/lib/site";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * Home hero. Everything above the fold animates with pure CSS on first
 * paint (split-word headline, load-in furniture, blueprint plot wipe) so
 * the LCP element never waits for JavaScript.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-[calc(var(--header-h)+1.75rem)] md:pt-[calc(var(--header-h)+3rem)]"
    >
      {/* Backdrop: blueprint grid, morphing plates, signal glow */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-blueprint absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_70%_35%,black_10%,transparent_70%)]" />
        <MorphPlates />
        <div className="absolute -right-[20%] top-[10%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgba(255,91,20,0.13),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="container-site">
        {/* Meta row */}
        <div className="load-in eyebrow flex items-center justify-between gap-6 text-muted" style={d(40)}>
          <span className="flex items-center gap-3">
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inset-0 animate-ping bg-accent opacity-60" />
              <span className="relative size-2 bg-accent" />
            </span>
            {site.tagline}
          </span>
          <span className="hidden md:block">
            {site.geo.label} — {site.address.city}, {site.address.region}
          </span>
        </div>

        <h1 id="hero-title" className="mt-7 text-display-2xl md:mt-10">
          <SplitText
            trigger="load"
            lines={[
              "Superior design",
              { text: "in truck body", className: "md:pl-[0.85em]" },
              { text: "fabrication.", className: "words-signal" },
            ]}
          />
        </h1>

        <div className="mt-10 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-6">
          <div className="flex flex-col gap-8 lg:col-span-4 lg:pr-6">
            <p className="load-in max-w-md text-lead text-muted" style={d(520)}>
              Rugged dump, landscape, platform and forestry bodies — from everyday hauling to your
              heaviest applications. Built in Honey Brook, PA, sold exclusively through truck
              equipment distributors &amp; upfitters.
            </p>
            <div className="load-in flex flex-wrap gap-3" style={d(640)}>
              <Button href={quoteHref} size="lg" magnetic wrapperClassName="flex-1 sm:flex-none" className="w-full">
                Request a Quote
              </Button>
              <Button href="/where-to-buy" size="lg" variant="secondary" className="flex-1 sm:flex-none">
                Find a Dealer
              </Button>
            </div>
            <dl className="load-in grid grid-cols-3 gap-4 border-t border-line pt-6" style={d(760)}>
              {[
                ["Warranty", "3 yr"],
                ["Paint", "In-house"],
                ["Sizes", "Custom"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="eyebrow text-[0.65rem] text-muted">{k}</dt>
                  <dd className="mt-2 whitespace-nowrap font-display text-[1.35rem] leading-none tracking-tight sm:text-[1.6rem]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-8">
            <TruckShowcase />
          </div>
        </div>
      </div>

      <Marquee items={sellingPoints} className="mt-16 md:mt-24" />
    </section>
  );
}
