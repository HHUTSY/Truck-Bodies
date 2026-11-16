import type { Metadata } from "next";
import { PageTransition } from "@/components/motion/PageTransition";
import { PageHero } from "@/components/ui/PageBlocks";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How SH Truck Bodies LLC collects, uses and protects information submitted through this website.",
  alternates: { canonical: "/privacy-policy" },
};

// TODO(client): have counsel review before launch; set the effective date.
const sections: { h: string; p: string[] }[] = [
  {
    h: "Information we collect",
    p: [
      "We collect the information you choose to submit through our forms — for example your name, company, email address, phone number, address and the details of a quote request, dealer application, warranty claim or catalog request, including any files you upload.",
      "Like most websites, our servers and hosting provider automatically log technical information such as IP address, browser type and pages visited, which we use to keep the site secure and working.",
    ],
  },
  {
    h: "How we use it",
    p: [
      "We use submitted information only to respond to you: preparing quotes, evaluating dealer applications, handling warranty claims, sending the catalog you requested and related follow-up.",
      "We do not sell, rent or lease your personal information to third parties.",
    ],
  },
  {
    h: "Service providers",
    p: [
      "We use trusted providers to run this site — hosting, email delivery, spam protection and maps — who process data only on our behalf. The dealer locator sends the ZIP code you search for to a geocoding service to calculate distances; if you use “Use my location”, your position is used in your browser only and is not stored.",
      "Videos are embedded with YouTube's privacy-enhanced mode and load only when you press play.",
    ],
  },
  {
    h: "Cookies & advertising",
    p: [
      "This site uses only the cookies needed for it to function. If we use analytics or advertising services (such as Google), those providers may use cookies to measure visits or show relevant ads. You can opt out of interest-based advertising from many providers at the Network Advertising Initiative (networkadvertising.org/choices).",
    ],
  },
  {
    h: "Retention & security",
    p: [
      "We keep form submissions as long as needed to handle your request and for our business records, and protect them with reasonable administrative and technical safeguards.",
    ],
  },
  {
    h: "Changes & contact",
    p: [
      "We may revise this policy from time to time; the current version will always be posted on this page.",
      `Questions? Contact ${site.legalName}, ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode} · ${site.phone.display} · ${site.email}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <PageTransition>
      <PageHero
        trail={[{ label: "Home", href: "/" }, { label: "Privacy policy" }]}
        index="PP"
        eyebrow="Legal"
        title={["Privacy policy."]}
        intro={`This policy explains how ${site.legalName} handles information submitted through this website.`}
      />
      <section className="pb-section">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-6">
          <nav aria-label="Policy sections" className="hidden lg:col-span-3 lg:block">
            <ol className="sticky top-[calc(var(--header-h)+2rem)] grid gap-2 text-sm text-muted">
              {sections.map((s, i) => (
                <li key={s.h}>
                  <a href={`#s${i + 1}`} className="link-underline hover:text-fg">
                    <span className="mr-2 font-mono text-xs text-accent-text">0{i + 1}</span>
                    {s.h}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="max-w-3xl lg:col-span-8 lg:col-start-5">
            {sections.map((s, i) => (
              <section key={s.h} id={`s${i + 1}`} className="scroll-mt-28 border-t border-line py-10 first:border-t-0 first:pt-0">
                <h2 className="font-display text-display-sm">
                  <span className="mr-3 font-mono text-sm text-accent-text">0{i + 1}</span>
                  {s.h}
                </h2>
                {s.p.map((p) => (
                  <p key={p} className="mt-4 leading-relaxed text-steel-300">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
