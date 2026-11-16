import type { Metadata } from "next";
import { Suspense } from "react";
import { PageTransition } from "@/components/motion/PageTransition";
import { Configurator } from "@/components/sections/configurator/Configurator";
import { PageHero } from "@/components/ui/PageBlocks";

export const metadata: Metadata = {
  title: "Truck Body Configurator",
  description: "Configure an SH truck body — pick the body type, length, side height and paint color, see a live preview and send it straight to a quote.",
  alternates: { canonical: "/configurator" },
};

export default function ConfiguratorPage() {
  return (
    <PageTransition>
      <PageHero
        trail={[{ label: "Home", href: "/" }, { label: "Configurator" }]}
        index="CF"
        eyebrow="Build & quote"
        title={["Configure", { text: "your body.", className: "words-signal" }]}
        intro="Choose a body, size and paint color and watch it take shape. Send the configuration to a quote when you're ready."
        className="pb-8 md:pb-12"
      />
      <section aria-label="Configurator" className="pb-section">
        <div className="container-site">
          <Suspense fallback={<div className="aspect-[2.5] border border-line bg-bg-elevated" />}>
            <Configurator />
          </Suspense>
        </div>
      </section>
    </PageTransition>
  );
}
