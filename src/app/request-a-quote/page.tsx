import type { Metadata } from "next";
import { Suspense, type CSSProperties } from "react";
import { PageTransition } from "@/components/motion/PageTransition";
import { CarriedConfig } from "@/components/sections/quote/CarriedConfig";
import { FormComingSoon, PageHero } from "@/components/ui/PageBlocks";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Request a wholesale quote for SH dump, landscape, platform, chipper or custom truck bodies.",
  alternates: { canonical: "/request-a-quote" },
};

const steps = ["Body type", "Dimensions", "Material & paint", "Quantity & options", "Dealer details"];

export default function QuotePage() {
  return (
    <PageTransition>
      <PageHero
        trail={[{ label: "Home", href: "/" }, { label: "Request a quote" }]}
        index="RQ"
        eyebrow="Wholesale quote"
        title={["Request", { text: "a quote.", className: "words-signal" }]}
        intro="Five quick steps. We'll reply with pricing and lead time — and you'll get a confirmation email with your reference number."
      />
      <section className="pb-section">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <ol className="grid gap-px border border-line bg-line">
              {steps.map((s, i) => (
                <li key={s} className="flex items-center gap-4 bg-bg px-5 py-4" data-reveal style={{ "--d": `${i * 60}ms` } as CSSProperties}>
                  <span className="grid size-8 place-items-center border border-line-strong font-mono text-xs text-accent-text">0{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
            <Suspense fallback={null}>
              <CarriedConfig />
            </Suspense>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <FormComingSoon
              title="Multi-step quote request"
              fields={[
                "Body type (dump, landscape, platform, chipper, custom)",
                "Length, sides / bulkhead, width",
                "Floor material & paint color",
                "Hoist, tarp, hitch & other options",
                "Quantity & target date",
                "Chassis make / model / CA",
                "Dealer company & contact",
                "Drawings or photos (file upload)",
              ]}
            />
            <p className="mt-4 text-sm text-muted">
              Need it now? Call {site.phone.display} — we sell exclusively to truck equipment distributors and upfitters.
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
