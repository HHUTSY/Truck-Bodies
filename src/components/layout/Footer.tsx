import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Layout";
import { ArrowUp } from "@/components/icons";
import { footerNav, quoteHref, site } from "@/lib/site";

export function Footer() {
  const year = process.env.NEXT_PUBLIC_YEAR; // set at build time in next.config.ts
  const { address } = site;

  return (
    <footer id="site-footer" className="relative z-[1] overflow-hidden border-t border-line bg-bg">
      <div className="container-site">
        <div className="grid gap-14 py-16 md:py-24 lg:grid-cols-12 lg:gap-6">
          {/* Statement + CTAs */}
          <div className="lg:col-span-6 lg:pr-12">
            <Eyebrow index="SH">Work with us</Eyebrow>
            <h2 className="mt-6 text-display-md">
              We work —<br />
              <span className="text-muted">for the work truck industry.</span>
            </h2>
            <p className="mt-6 max-w-md text-muted">
              Wholesale only. We build exclusively for truck equipment distributors and upfitters.
              Not a dealer yet? Let&apos;s talk.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={quoteHref} size="lg" magnetic>
                Request a Quote
              </Button>
              <Button href="/where-to-buy/become-a-dealer" size="lg" variant="secondary">
                Become a Dealer
              </Button>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:col-span-6">
            {footerNav.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="eyebrow text-muted">{col.title}</h3>
                <ul className="mt-5 grid gap-1">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link
                        href={l.href}
                        className="link-underline inline-flex min-h-10 items-center text-[0.95rem] text-steel-300 transition-colors hover:text-fg"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="eyebrow text-muted">Contact</h3>
              <address className="mt-5 grid gap-4 not-italic text-[0.95rem] text-steel-300">
                <a href={site.phone.href} className="link-underline w-fit font-mono text-lg text-fg">
                  {site.phone.display}
                </a>
                <a href={`mailto:${site.email}`} className="link-underline w-fit">
                  {site.email}
                </a>
                <span>
                  {address.street}
                  <br />
                  {address.city}, {address.region} {address.postalCode}
                </span>
                <span className="font-mono text-xs text-muted">Fax {site.fax}</span>
              </address>
            </div>
          </div>
        </div>

        {/* Giant wordmark — SVG textLength makes it span exactly edge to edge at any width */}
        <div aria-hidden className="pointer-events-none relative -mb-[1.4%] select-none">
          <svg viewBox="0 0 1000 104" className="w-full overflow-visible">
            <defs>
              <linearGradient id="footer-wm" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#eceef0" stopOpacity="0.2" />
                <stop offset="1" stopColor="#eceef0" stopOpacity="0.015" />
              </linearGradient>
            </defs>
            <text
              x="0"
              y="100"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              className="font-display"
              fontWeight={600}
              fontSize={124}
              letterSpacing={-6}
              fill="url(#footer-wm)"
            >
              SH TRUCK BODIES
            </text>
          </svg>
        </div>
      </div>

      {/* Legal bar */}
      <div className="relative border-t border-line">
        <div className="container-site flex flex-col gap-4 py-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}. Formerly {site.formerly}. Honey Brook, Pennsylvania.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="font-mono uppercase tracking-[0.14em]">NTEA Member</span>
            <Link href="/privacy-policy" className="link-underline inline-flex min-h-10 items-center">
              Privacy Policy
            </Link>
            <a
              href="#top"
              className="group/top inline-flex min-h-10 items-center gap-2 text-fg"
              data-cursor="link"
            >
              Back to top
              <span className="grid size-8 place-items-center border border-line-strong transition-colors group-hover/top:border-accent group-hover/top:bg-accent group-hover/top:text-accent-ink">
                <ArrowUp className="size-3.5" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
