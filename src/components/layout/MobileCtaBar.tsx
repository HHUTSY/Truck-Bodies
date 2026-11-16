import Link from "next/link";
import { ArrowUpRight, Phone } from "@/components/icons";
import { quoteHref, site } from "@/lib/site";

/**
 * Sticky thumb-zone action bar for phones/tablets (< lg).
 * Slides away while the full-screen menu is open (html[data-menu-open]).
 */
export function MobileCtaBar() {
  return (
    <div
      className="mobile-cta fixed inset-x-0 bottom-0 z-40 border-t border-line bg-[color-mix(in_oklab,var(--bg)_86%,transparent)] pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
      style={{ viewTransitionName: "mobile-cta" }}
    >
      <div className="container-site grid grid-cols-[1fr_1.35fr] gap-2 py-2.5">
        <a
          href={site.phone.href}
          className="flex h-12 items-center justify-center gap-2.5 border border-line-strong text-[0.95rem] font-medium active:bg-surface"
          aria-label={`Call ${site.name} at ${site.phone.display}`}
        >
          <Phone className="size-4 text-accent-text" />
          Call
        </a>
        <Link
          href={quoteHref}
          className="chamfer flex h-12 items-center justify-center gap-2 bg-accent text-[0.95rem] font-semibold text-accent-ink [--cut:9px] active:bg-accent-strong"
        >
          Get a Quote
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
