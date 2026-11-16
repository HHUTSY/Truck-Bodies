import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "@/components/icons";
import { PageTransition } from "@/components/motion/PageTransition";
import { FormComingSoon, PageHero } from "@/components/ui/PageBlocks";
import { Photo } from "@/components/ui/Photo";
import { products, productHref } from "@/content/products";

export const metadata: Metadata = {
  title: "Product Catalog (PDF)",
  description: "Download the SH Truck Bodies product catalog — dump, landscape, platform, chipper and custom truck bodies with full specifications.",
  alternates: { canonical: "/catalog" },
};

export default function CatalogPage() {
  return (
    <PageTransition>
      <PageHero
        trail={[{ label: "Home", href: "/" }, { label: "Catalog" }]}
        index="CA"
        eyebrow="Product catalog"
        title={["The catalog,", { text: "without the 35 MB.", className: "words-signal" }]}
        intro="Full specifications for every SH body in one PDF. Enter your email and we'll send a compressed, print-ready copy instantly."
      />
      <section className="pb-section">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6">
            <div className="relative aspect-[1.6] overflow-hidden border border-line" data-reveal="scale">
              <Photo id="collage-header" alt="Collage of SH dump, landscape, platform and chipper bodies" sizes="(min-width: 1024px) 50vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="eyebrow text-accent-text">SH Truck Bodies</p>
                <p className="mt-2 font-display text-display-sm">Product catalog</p>
              </div>
            </div>
            <h2 className="mt-10 eyebrow text-muted">Inside</h2>
            <ul className="mt-4 grid gap-px border border-line bg-line">
              {products.map((p, i) => (
                <li key={p.slug} data-reveal style={{ "--d": `${i * 50}ms` } as CSSProperties}>
                  <Link href={productHref(p.slug)} className="group/l flex min-h-14 items-center justify-between gap-4 bg-bg px-4 transition-colors hover:bg-surface">
                    <span className="flex items-center gap-4">
                      <span className="font-mono text-xs text-accent-text">{p.index}</span>
                      {p.name}
                    </span>
                    <span className="flex items-center gap-2 text-xs text-muted">
                      View online <ArrowUpRight className="size-3.5 transition-transform group-hover/l:-translate-y-0.5 group-hover/l:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <FormComingSoon title="Get the catalog by email" fields={["Name", "Email", "Company (optional)", "I'm a dealer / upfitter / fleet"]} />
            <p className="mt-4 text-sm text-muted">
              Every spec is also available online — and each product page has a printable spec sheet.
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
