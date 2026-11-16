import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Check } from "@/components/icons";
import { PageTransition } from "@/components/motion/PageTransition";
import { FormComingSoon, PageHero } from "@/components/ui/PageBlocks";
import { Photo } from "@/components/ui/Photo";
import { sellingPoints } from "@/lib/site";

export const metadata: Metadata = {
  title: "Become a Dealer",
  description:
    "Apply to become an SH Truck Bodies distributor. Wholesale dump, landscape, platform, chipper and custom truck bodies for truck equipment distributors and upfitters.",
  alternates: { canonical: "/where-to-buy/become-a-dealer" },
};

export default function BecomeDealerPage() {
  return (
    <PageTransition>
      <PageHero
        trail={[{ label: "Home", href: "/" }, { label: "Where to buy", href: "/where-to-buy" }, { label: "Become a dealer" }]}
        index="BD"
        eyebrow="For distributors & upfitters"
        title={["Become a dealer."]}
        intro="We build exclusively for truck equipment distributors and upfitters. Tell us about your business and we'll be in touch."
      />
      <section className="pb-section">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden border border-line" data-reveal="scale">
              <Photo id="20240510-30649-5" alt="SH stake body with lift gate on a dealer lot" sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
            <h2 className="mt-10 eyebrow text-muted">What you can offer your customers</h2>
            <ul className="mt-4 border-t border-line">
              {sellingPoints.map((s, i) => (
                <li key={s} className="flex gap-3 border-b border-line py-3" data-reveal style={{ "--d": `${i * 50}ms` } as CSSProperties}>
                  <Check className="mt-1 size-4 shrink-0 text-accent-text" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <FormComingSoon
              title="Dealer application"
              fields={[
                "Contact name",
                "Company / dealership",
                "Street, city, state, ZIP",
                "Email & phone",
                "Fax (optional)",
                "Website",
                "Body types of interest",
                "Message",
                "Attachments (line card, credit app) — file upload",
              ]}
            />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
