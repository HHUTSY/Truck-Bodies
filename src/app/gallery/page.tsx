import type { Metadata } from "next";
import { PageTransition } from "@/components/motion/PageTransition";
import { GalleryGrid } from "@/components/sections/gallery/GalleryGrid";
import { CtaBand, PageHero } from "@/components/ui/PageBlocks";
import { gallery } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Truck Body Gallery",
  description:
    "Photos of SH Truck Bodies in the field — dump, landscape, platform/stake, chipper and custom truck bodies built in Honey Brook, PA.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <PageTransition>
      <PageHero
        trail={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
        index="GA"
        eyebrow={`${gallery.length} builds`}
        title={["Built in Honey Brook.", { text: "Working everywhere.", className: "text-muted" }]}
        intro="Real bodies, real trucks — photographed at dealers, job sites and our yard. Filter by body type and tap any photo to view it full-screen."
        className="pb-8 md:pb-10"
      />
      <section aria-label="Photo gallery" className="pb-section">
        <div className="container-site">
          <GalleryGrid />
        </div>
      </section>
      <CtaBand title="See something you need?" text="Tell us which build caught your eye — we'll quote it, or customize it." />
    </PageTransition>
  );
}
