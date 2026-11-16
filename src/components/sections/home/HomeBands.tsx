import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, MapPin, Play, Shield } from "@/components/icons";

const videoPage: Record<string, string> = {
  Dump: "/standard-truck-bodies/dump-truck-bodies",
  Landscape: "/standard-truck-bodies/landscape-truck-bodies",
  Platform: "/standard-truck-bodies/platform-truck-bodies",
};
import { Counter } from "@/components/motion/Counter";
import { SplitText } from "@/components/motion/SplitText";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { VideoFacade } from "@/components/ui/VideoFacade";
import { videos } from "@/content/gallery";

/* ------------------------------------------------------------------ */
/* Warranty — light "paper" section for rhythm                         */
/* ------------------------------------------------------------------ */
export function WarrantyBand() {
  return (
    <section aria-labelledby="warranty-title" className="theme-paper relative overflow-hidden py-section">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-6">
        <div className="relative lg:col-span-5">
          <p className="eyebrow flex items-center gap-3 text-muted">
            <span className="text-accent-text">[ 04 ]</span>
            <span aria-hidden className="h-px w-8 bg-line-strong" />
            Limited warranty
          </p>
          <div className="mt-6 flex items-end gap-4">
            <span className="font-display text-[clamp(9rem,22vw,20rem)] font-semibold leading-[0.75] tracking-[-0.08em] text-signal">
              <Counter to={3} duration={1.4} />
            </span>
            <span className="mb-[0.6em] font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-none tracking-tight">
              year
              <br />
              warranty
            </span>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <h2 id="warranty-title" className="text-display-md">
            <SplitText text="Every body is backed for three years from the date of purchase." />
          </h2>
          <ul className="mt-8 grid gap-3 text-[0.95rem] text-muted" data-reveal>
            {[
              "Covers defects in material and manufacturing workmanship for the original owner",
              "Applies to all truck bodies, storage pods and associated products we manufacture",
              "Claims through your authorized SH dealer or SH customer service",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <Shield className="mt-0.5 size-5 shrink-0 text-accent-text" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3" data-reveal style={{ "--d": "120ms" } as CSSProperties}>
            <Button href="/warranty" size="lg">
              Warranty details
            </Button>
            <Button href="/warranty#claim" size="lg" variant="secondary">
              File a claim
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Dealer CTA — find (ZIP search) + become                             */
/* ------------------------------------------------------------------ */
export function DealerCta() {
  return (
    <section aria-labelledby="dealer-title" className="relative py-section">
      <div className="container-site">
        <p className="eyebrow flex items-center gap-3 text-muted">
          <span className="text-accent-text">[ 05 ]</span>
          <span aria-hidden className="h-px w-8 bg-line-strong" />
          Where to buy
        </p>
        <h2 id="dealer-title" className="mt-5 max-w-4xl text-display-lg">
          <SplitText lines={["Sold exclusively through", { text: "distributors & upfitters.", className: "text-muted" }]} />
        </h2>

        <div className="mt-12 grid gap-3 lg:grid-cols-2">
          {/* Find */}
          <div className="relative flex min-h-[26rem] flex-col justify-between overflow-hidden border border-line bg-surface p-6 md:p-10" data-reveal>
            <div aria-hidden className="absolute inset-0 opacity-30">
              <Photo id="20240510-30649-5" alt="" fit="cover" sizes="(min-width: 1024px) 50vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-surface/30" />
            </div>
            <div className="relative">
              <MapPin className="size-8 text-accent-text" />
              <h3 className="mt-6 font-display text-display-sm">Find a dealer near you</h3>
              <p className="mt-3 max-w-md text-muted">Search by ZIP code or state to find the closest SH Truck Bodies distributor.</p>
            </div>
            <form action="/where-to-buy" method="get" className="relative mt-10 flex gap-2" role="search">
              <label htmlFor="dealer-q" className="sr-only">
                ZIP code or state
              </label>
              <input
                id="dealer-q"
                name="q"
                inputMode="text"
                autoComplete="postal-code"
                placeholder="ZIP or state, e.g. 19344 or PA"
                className="field-control flex-1 bg-bg/70"
              />
              <button
                type="submit"
                aria-label="Search dealers"
                className="grid size-[3.25rem] shrink-0 place-items-center bg-accent text-accent-ink transition-colors hover:bg-accent-strong"
              >
                <ArrowRight className="size-5" />
              </button>
            </form>
          </div>

          {/* Become */}
          <div className="relative flex min-h-[26rem] flex-col justify-between overflow-hidden bg-accent p-6 text-accent-ink md:p-10" data-reveal style={{ "--d": "100ms" } as CSSProperties}>
            <span aria-hidden className="pointer-events-none absolute -bottom-[0.18em] -right-[0.04em] select-none font-display text-[clamp(10rem,24vw,22rem)] font-semibold leading-none tracking-[-0.08em] text-accent-ink/10">
              SH
            </span>
            <div className="relative">
              <p className="eyebrow">For distributors & upfitters</p>
              <h3 className="mt-6 max-w-md font-display text-display-sm">Add SH bodies to your lineup.</h3>
              <p className="mt-3 max-w-md text-accent-ink/80">
                Custom configurations, short lead times, delivery, in-house paint and a 3-year warranty your customers can count on.
              </p>
            </div>
            <div className="relative mt-10">
              <Link
                href="/where-to-buy/become-a-dealer"
                className="group/b inline-flex h-14 items-center gap-4 border border-accent-ink/40 px-6 font-semibold transition-colors hover:bg-accent-ink hover:text-accent"
              >
                Become a dealer
                <ArrowRight className="size-5 transition-transform duration-500 group-hover/b:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Videos — lazy facades                                               */
/* ------------------------------------------------------------------ */
export function HomeVideos() {
  const [main, second] = videos;
  const rest = videos.slice(2);
  return (
    <section aria-labelledby="videos-title" className="relative border-t border-line py-section">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow flex items-center gap-3 text-muted">
              <span className="text-accent-text">[ 06 ]</span>
              <span aria-hidden className="h-px w-8 bg-line-strong" />
              Watch
            </p>
            <h2 id="videos-title" className="mt-5 text-display-lg">
              <SplitText lines={["Inside the plant."]} />
            </h2>
          </div>
          <p className="max-w-sm text-muted" data-reveal>
            Walkarounds and a tour of our Honey Brook facility. Videos load only when you press play.
          </p>
        </div>
        <div className="mt-12 grid gap-3 lg:grid-cols-12">
          <div className="lg:col-span-8" data-reveal>
            <VideoFacade id={main.id} title={main.title} tag={main.tag} sizes="(min-width: 1024px) 66vw, 100vw" />
          </div>
          <div className="grid gap-3 lg:col-span-4" data-reveal style={{ "--d": "100ms" } as CSSProperties}>
            <VideoFacade id={second.id} title={second.title} tag={second.tag} sizes="(min-width: 1024px) 33vw, 100vw" />
            <ul className="grid content-start gap-px border border-line bg-line">
              {rest.map((v) => (
                <li key={v.id}>
                  <Link
                    href={`${videoPage[v.tag] ?? "/standard-truck-bodies"}#videos`}
                    className="group/v flex min-h-12 items-center justify-between gap-4 bg-bg px-4 py-3 text-sm transition-colors hover:bg-surface"
                  >
                    <span className="flex items-center gap-3">
                      <Play className="size-3.5 text-accent-text" />
                      {v.title}
                    </span>
                    <span className="eyebrow text-[0.6rem] text-muted transition-colors group-hover/v:text-fg">{v.tag}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
