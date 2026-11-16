import type { Metadata } from "next";
import { Suspense } from "react";
import { PageTransition } from "@/components/motion/PageTransition";
import { DealerLocator } from "@/components/sections/dealers/DealerLocator";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageBlocks";
import { SplitText } from "@/components/motion/SplitText";

export const metadata: Metadata = {
  title: "Where to Buy — Find an SH Truck Bodies Dealer",
  description:
    "Find the closest SH Truck Bodies distributor or upfitter. Search by ZIP code or state — SH sells exclusively through truck equipment distributors.",
  alternates: { canonical: "/where-to-buy" },
};

export default function WhereToBuyPage() {
  return (
    <PageTransition>
      <PageHero
        trail={[{ label: "Home", href: "/" }, { label: "Where to buy" }]}
        index="WB"
        eyebrow="Find a dealer"
        title={["Where to buy."]}
        intro="SH Truck Bodies sells exclusively through truck equipment distributors and upfitters. Find the dealer closest to you."
        className="pb-8 md:pb-12"
      />

      <section aria-label="Dealer locator" className="pb-section">
        <div className="container-site">
          <p className="mb-6 border-l-2 border-accent pl-4 text-sm text-muted">
            <strong className="font-medium text-fg">Preview data:</strong> the dealer list below is sample data so the
            locator can be reviewed. The real dealer network is imported in the admin panel (step 4).
          </p>
          <Suspense fallback={<div className="h-[60vh] border border-line bg-bg-elevated" />}>
            <DealerLocator />
          </Suspense>
        </div>
      </section>

      <section aria-labelledby="become-title" className="theme-paper py-section">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-6">
          <h2 id="become-title" className="text-display-lg lg:col-span-7">
            <SplitText lines={["Not a dealer yet?", { text: "Let's build together.", className: "words-signal" }]} />
          </h2>
          <div className="grid gap-6 lg:col-span-5" data-reveal>
            <p className="text-lead text-muted">
              Add SH dump, landscape, platform, chipper and custom bodies to your lineup — with short lead times, delivery and a
              3-year warranty.
            </p>
            <div>
              <Button href="/where-to-buy/become-a-dealer" size="lg">
                Become a dealer
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
