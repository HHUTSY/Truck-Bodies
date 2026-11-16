import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Shield } from "@/components/icons";
import { Counter } from "@/components/motion/Counter";
import { PageTransition } from "@/components/motion/PageTransition";
import { SplitText } from "@/components/motion/SplitText";
import { FormComingSoon, PageHero } from "@/components/ui/PageBlocks";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Limited Warranty & Warranty Claims",
  description:
    "SH Truck Bodies LLC limited warranty: 3 years from date of purchase on truck bodies, storage pods and associated products. How to file a warranty claim.",
  alternates: { canonical: "/warranty" },
};

const terms = [
  {
    t: "Coverage",
    d: "SH Truck Bodies LLC warrants to the original owner that its products are free from defects in material and manufacturing workmanship for 3 years after the date of purchase.",
  },
  { t: "Applies to", d: "All truck bodies, storage pods and associated products manufactured by SH Truck Bodies." },
  { t: "Maintenance", d: "Products must be properly maintained and serviced to be eligible for warranty." },
  {
    t: "Exclusions",
    d: "Improper installation, abuse, misuse, damage from carrying corrosive materials, or accidents.",
  },
];

const steps = [
  { t: "Contact", d: "Make your claim through an authorized SH Truck Bodies dealer or SH Truck Bodies Customer Service." },
  { t: "Inspection", d: "SH may inspect the claimed defective parts and will dispose of the claim as it sees fit, including repair or replacement." },
  { t: "Approval first", d: "Warranty labor must be performed by SH or an authorized dealer and approved by SH beforehand. Unauthorized repair before inspection may void the warranty." },
];

export default function WarrantyPage() {
  return (
    <PageTransition>
      <PageHero
        trail={[{ label: "Home", href: "/" }, { label: "Warranty" }]}
        index="WA"
        eyebrow="SH Truck Bodies LLC limited warranty"
        title={["Three years.", { text: "Backed in writing.", className: "text-muted" }]}
        aside={
          <div className="flex items-end gap-4">
            <span className="font-display text-[clamp(7rem,16vw,13rem)] font-semibold leading-[0.75] tracking-[-0.08em] text-signal">
              <Counter to={3} duration={1.2} />
            </span>
            <span className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-muted">
              year limited
              <br />
              warranty
            </span>
          </div>
        }
      />

      <section aria-labelledby="terms-title" className="border-t border-line py-section">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-6">
          <h2 id="terms-title" className="text-display-md lg:col-span-4">
            <SplitText text="Warranty terms" />
          </h2>
          <dl className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-8">
            {terms.map((x, i) => (
              <div key={x.t} className="bg-bg p-6 md:p-8" data-reveal style={{ "--d": `${i * 60}ms` } as CSSProperties}>
                <dt className="flex items-center gap-3 eyebrow text-accent-text">
                  <Shield className="size-4" /> {x.t}
                </dt>
                <dd className="mt-4 text-steel-300">{x.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="claim" aria-labelledby="claim-title" className="scroll-mt-24 border-t border-line py-section">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <h2 id="claim-title" className="text-display-md">
              <SplitText text="Filing a warranty claim" />
            </h2>
            <ol className="mt-10 grid gap-px border border-line bg-line">
              {steps.map((s, i) => (
                <li key={s.t} className="grid grid-cols-[3rem_1fr] gap-4 bg-bg p-5" data-reveal style={{ "--d": `${i * 60}ms` } as CSSProperties}>
                  <span className="font-mono text-sm text-accent-text">0{i + 1}</span>
                  <div>
                    <p className="font-display text-xl tracking-tight">{s.t}</p>
                    <p className="mt-2 text-sm text-muted">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <FormComingSoon
              title="Warranty claim — you'll receive a ticket number"
              fields={[
                "Dealer / owner name",
                "Email & phone",
                "Body serial / order number",
                "Date of purchase",
                "Body type",
                "Description of the defect",
                "Photos (file upload)",
                "Preferred contact method",
              ]}
            />
            <p className="mt-4 text-sm text-muted">
              Questions about coverage? Call SH Customer Service at{" "}
              <a href={site.phone.href} className="link-underline text-fg">
                {site.phone.display}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
