import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "@/components/icons";
import { PageTransition } from "@/components/motion/PageTransition";
import { FormComingSoon, PageHero } from "@/components/ui/PageBlocks";
import { Photo } from "@/components/ui/Photo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact SH Truck Bodies in Honey Brook, PA — call ${site.phone.display}, email ${site.email}, or visit 16 Westbrooke Dr.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const a = site.address;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${a.street} ${a.city}, ${a.region} ${a.postalCode}`)}`;
  const cards: { icon: ReactNode; label: string; value: string; href: string; note?: string }[] = [
    { icon: <Phone className="size-5" />, label: "Call us", value: site.phone.display, href: site.phone.href, note: `Fax ${site.fax}` },
    { icon: <Mail className="size-5" />, label: "Email us", value: site.email, href: `mailto:${site.email}` },
    { icon: <MapPin className="size-5" />, label: "Visit", value: `${a.street}, ${a.city}, ${a.region} ${a.postalCode}`, href: mapsUrl, note: "Open in Google Maps" },
  ];

  return (
    <PageTransition>
      <PageHero
        trail={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        index="CO"
        eyebrow="General inquiries"
        title={["Let's talk", { text: "truck bodies.", className: "words-signal" }]}
        intro="Questions about a body, an order, or becoming a dealer — reach the SH team directly."
      />
      <section className="pb-section">
        <div className="container-site">
          <ul className="grid gap-px border border-line bg-line md:grid-cols-3">
            {cards.map((c, i) => (
              <li key={c.label} data-reveal style={{ "--d": `${i * 70}ms` } as CSSProperties}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group/c flex h-full min-h-56 flex-col justify-between gap-8 bg-bg p-6 transition-colors hover:bg-surface md:p-8"
                >
                  <span className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center border border-line-strong text-accent-text transition-colors group-hover/c:border-accent group-hover/c:bg-accent group-hover/c:text-accent-ink">
                      {c.icon}
                    </span>
                    <ArrowUpRight className="size-5 text-muted transition-transform duration-500 group-hover/c:-translate-y-1 group-hover/c:translate-x-1 group-hover/c:text-fg" />
                  </span>
                  <span>
                    <span className="eyebrow text-muted">{c.label}</span>
                    <span className="mt-3 block break-words font-display text-[clamp(1.35rem,2.2vw,1.9rem)] leading-tight tracking-tight">{c.value}</span>
                    {c.note && <span className="mt-2 block font-mono text-xs text-muted">{c.note}</span>}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-6">
              <FormComingSoon title="Send us a message" fields={["Name", "Email", "Phone (optional)", "Company", "Subject", "Message"]} />
            </div>
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden border border-line" data-reveal="scale">
                <Photo id="img-1703" alt="Finished SH truck bodies loaded for delivery" sizes="(min-width: 1024px) 50vw, 100vw" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg to-transparent p-6 pt-20">
                  <p className="eyebrow text-accent-text">Honey Brook, Pennsylvania</p>
                  <p className="mt-2 font-mono text-xs text-muted">{site.geo.label}</p>
                </div>
              </div>
              <p className="mt-6 text-sm text-muted">
                Warranty issue? Use the <Link href="/warranty#claim" className="link-underline text-fg">warranty claim form</Link> so we can
                issue a ticket number. Looking for a dealer? <Link href="/where-to-buy" className="link-underline text-fg">Find one near you</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
