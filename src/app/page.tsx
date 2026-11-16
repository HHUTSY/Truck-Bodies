import { PageTransition } from "@/components/motion/PageTransition";
import { FeaturedGallery } from "@/components/sections/home/FeaturedGallery";
import { Hero } from "@/components/sections/home/Hero";
import { DealerCta, HomeVideos, WarrantyBand } from "@/components/sections/home/HomeBands";
import { ProductShowcase } from "@/components/sections/home/ProductShowcase";
import { WhyUs } from "@/components/sections/home/WhyUs";

/**
 * Home: hero → pinned product showcase → featured gallery → why us →
 * warranty → dealer CTA → videos → footer.
 */
export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <ProductShowcase />
      <FeaturedGallery />
      <WhyUs />
      <WarrantyBand />
      <DealerCta />
      <HomeVideos />
    </PageTransition>
  );
}
