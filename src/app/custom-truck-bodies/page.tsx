import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Check } from "@/components/icons";
import { PageTransition } from "@/components/motion/PageTransition";
import { SplitText } from "@/components/motion/SplitText";
import { Button } from "@/components/ui/Button";
import { CtaBand, PageHero } from "@/components/ui/PageBlocks";
import { Photo } from "@/components/ui/Photo";
import { customExamples, customShownWith } from "@/content/products";
import { quoteHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Custom Truck Bodies — Built to Your Spec",
  description:
    "Custom truck body fabrication from SH Truck Bodies: backpack toolboxes, beavertails with fold-down ramps, lift-out side posts, winch tracks and more — for distributors and upfitters.",
  alternates: { canonical: "/custom-truck-bodies" },
};

const process = [
  { t: "Spec", d: "Send the chassis, dimensions, sketches and options — as rough or as detailed as you have." },
  { t: "Engineer", d: "We work out the build so it fits the chassis and the job." },
  { t: "Fabricate", d: "Built in-house in Honey Brook, PA." },
  { t: "Paint", d: "Finished in our in-house paint facility — any color." },
  { t: "Deliver", d: "Delivered to your shop, ready for install." },
];

export default function CustomBodiesPage() {
  return (
    <PageTransition>
      <PageHero
        trail={[{ label: "Home", href: "/" }, { label: "Custom bodies" }]}
        index="05"
        eyebrow="Custom truck body work"
        title={["If you can spec it,", { text: "we can build it.", className: "words-signal" }]}
        intro="Beyond our standard lineup, we can customize anything — from a toolbox layout to a one-off municipal platform. Tell us the job; we'll build the body."
      >
        <div className="load-in relative mt-12 aspect-[16/8] overflow-hidden border border-line bg-[radial-gradient(ellipse_at_50%_45%,#1f242b,#0f1114_72%)]" style={{ "--d": "520ms" } as CSSProperties}>
          <div aria-hidden className="bg-blueprint absolute inset-0 opacity-40" />
          <div className="absolute inset-[5%]">
            <Photo id="custom-body" alt="SH custom body with backpack toolbox, dump-style tailgate and wood stake racks" sizes="100vw" priority quality={80} />
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5">
            {customShownWith.map((s) => (
              <span key={s} className="border border-line-strong bg-bg/70 px-2.5 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-steel-300 backdrop-blur">
                {s}
              </span>
            ))}
          </div>
        </div>
      </PageHero>

      {/* Examples */}
      <section aria-labelledby="examples-title" className="border-t border-line py-section">
        <div className="container-site">
          <h2 id="examples-title" className="text-display-lg">
            <SplitText text="Examples of custom bodies" />
          </h2>
          <div className="mt-14 grid gap-16 md:gap-24">
            {customExamples.map((ex, i) => (
              <article key={ex.id} className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-6">
                <div className={i % 2 ? "lg:order-2 lg:col-span-7 lg:col-start-6" : "lg:col-span-7"} data-reveal="scale">
                  <div className="relative aspect-[4/3] overflow-hidden border border-line bg-surface">
                    <Photo id={ex.image} alt={ex.alt} sizes="(min-width: 1024px) 58vw, 100vw" fit="cover" />
                  </div>
                </div>
                <div className={i % 2 ? "lg:order-1 lg:col-span-4" : "lg:col-span-4 lg:col-start-9"}>
                  <p className="font-mono text-xs text-accent-text">Example 0{i + 1}</p>
                  <h3 className="mt-3 font-display text-display-sm">{ex.title}</h3>
                  <ul className="mt-6 border-t border-line" data-reveal>
                    {ex.features.map((f) => (
                      <li key={f} className="flex gap-3 border-b border-line py-3">
                        <Check className="mt-1 size-4 shrink-0 text-accent-text" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process-title" className="theme-paper py-section">
        <div className="container-site">
          <h2 id="process-title" className="max-w-3xl text-display-lg">
            <SplitText lines={["From sketch", { text: "to delivered body.", className: "text-muted" }]} />
          </h2>
          <ol className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {process.map((s, i) => (
              <li key={s.t} className="flex min-h-56 flex-col justify-between gap-8 bg-bg p-6" data-reveal style={{ "--d": `${i * 70}ms` } as CSSProperties}>
                <span className="font-mono text-xs text-accent-text">0{i + 1}</span>
                <div>
                  <p className="font-display text-2xl tracking-tight">{s.t}</p>
                  <p className="mt-2 text-sm text-muted">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10" data-reveal>
            <Button href={`${quoteHref}?body=custom`} size="lg">
              Start a custom quote
            </Button>
          </div>
        </div>
      </section>

      <CtaBand title="Got a build in mind?" text="Send drawings, photos or just a description — we'll work out the rest with you." />
    </PageTransition>
  );
}
