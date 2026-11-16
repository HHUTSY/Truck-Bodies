import type { Metadata } from "next";
import { PageTransition } from "@/components/motion/PageTransition";
import { SpecChip } from "@/components/ui/Layout";
import { CtaBand, PageHero } from "@/components/ui/PageBlocks";
import { Photo } from "@/components/ui/Photo";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { products, productHref } from "@/content/products";

export const metadata: Metadata = {
  title: "Standard Truck Bodies — Dump, Landscape, Platform & Chipper",
  description:
    "SH Truck Bodies' standard lineup: dump, landscape/trash, platform/stake and chipper/forestry bodies — wholesale for truck equipment distributors and upfitters.",
  alternates: { canonical: "/standard-truck-bodies" },
};

export default function StandardBodiesPage() {
  return (
    <PageTransition>
      <PageHero
        trail={[{ label: "Home", href: "/" }, { label: "Standard bodies" }]}
        index="SB"
        eyebrow="Standard truck bodies"
        title={["Standard bodies.", { text: "Short lead times.", className: "words-signal" }]}
        intro="Four proven families, each available in custom sizes and configurations, primed and painted in-house and backed by a 3-year limited warranty. Choose a body to see full specs, weights and options."
        aside={
          <div className="flex flex-wrap gap-3">
            <Button href="/configurator" variant="secondary">
              Open configurator
            </Button>
            <Button href="/catalog" variant="ghost">
              Download catalog
            </Button>
          </div>
        }
      />
      <section aria-label="Product families" className="pb-section">
        <div className="container-site grid gap-3 md:grid-cols-2">
          {products.map((p) => (
            <ProductCard
              key={p.slug}
              slug={p.slug}
              href={productHref(p.slug)}
              index={p.index}
              title={p.name}
              summary={p.tagline}
              media={
                <div className="absolute inset-[8%]">
                  <Photo id={p.hero} alt={p.heroAlt} sizes="(min-width: 768px) 50vw, 100vw" />
                </div>
              }
              meta={p.highlights.map((h) => (
                <SpecChip key={h.label} label={h.label} value={h.value} />
              ))}
            />
          ))}
        </div>
      </section>
      <CtaBand />
    </PageTransition>
  );
}
