import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { SplitText } from "@/components/motion/SplitText";
import { Button } from "@/components/ui/Button";
import { quoteHref, site } from "@/lib/site";
import { cn } from "@/lib/cn";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Breadcrumb trail (visible) — JSON-LD is added in step 5. */
export function Breadcrumbs({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="load-in eyebrow text-[0.68rem] text-muted" style={d(20)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {trail.map((t, i) => (
          <li key={t.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden className="text-faint">/</span>}
            {t.href ? (
              <Link href={t.href} className="link-underline transition-colors hover:text-fg">
                {t.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-fg">
                {t.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Standard interior page hero: breadcrumb, index, split headline, intro, optional aside. */
export function PageHero({
  trail,
  index,
  eyebrow,
  title,
  intro,
  aside,
  children,
  className,
}: {
  trail: { label: string; href?: string }[];
  index: string;
  eyebrow: string;
  title: (string | { text: string; className?: string })[];
  intro?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden pb-16 pt-[calc(var(--header-h)+1.5rem)] md:pb-24 md:pt-[calc(var(--header-h)+2.5rem)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="bg-blueprint absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_70%_20%,black_10%,transparent_70%)]"
      />
      <div className="container-site">
        <Breadcrumbs trail={trail} />
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className={aside ? "lg:col-span-7" : "lg:col-span-10"}>
            <p className="load-in eyebrow flex items-center gap-3 text-muted" style={d(60)}>
              <span className="text-accent-text">[ {index} ]</span>
              <span aria-hidden className="h-px w-8 bg-line-strong" />
              {eyebrow}
            </p>
            <h1 className="mt-6 text-display-xl">
              <SplitText trigger="load" lines={title} />
            </h1>
            {intro && (
              <div className="load-in mt-8 max-w-2xl text-lead text-muted" style={d(420)}>
                {intro}
              </div>
            )}
          </div>
          {aside && (
            <div className="load-in lg:col-span-5 lg:self-end" style={d(520)}>
              {aside}
            </div>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

/** Closing CTA band used at the bottom of interior pages. */
export function CtaBand({
  title = "Ready to spec your next body?",
  text = "Send us the chassis, dimensions and options — we'll come back with a quote and lead time.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-line py-section">
      <div aria-hidden className="absolute -left-[10%] top-1/2 h-[60vmax] w-[60vmax] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,91,20,0.12),transparent)]" />
      <div className="container-site relative grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-6">
        <h2 className="text-display-lg lg:col-span-7">
          <SplitText text={title} />
        </h2>
        <div className="grid gap-6 lg:col-span-5" data-reveal>
          <p className="text-lead text-muted">{text}</p>
          <div className="flex flex-wrap gap-3">
            <Button href={quoteHref} size="lg" magnetic>
              Request a Quote
            </Button>
            <Button href={site.phone.href} size="lg" variant="secondary" icon={false}>
              {site.phone.display}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Placeholder for forms whose submission pipeline (validation, DB, email,
 * spam protection) is built in step 3. Lists exactly what the form collects.
 */
export function FormComingSoon({
  title,
  fields,
  className,
}: {
  title: string;
  fields: string[];
  className?: string;
}) {
  return (
    <div className={cn("relative border border-dashed border-line-strong bg-surface/40 p-6 md:p-8", className)}>
      <p className="eyebrow text-accent-text">[ Form · wired up in step 3 ]</p>
      <p className="mt-4 font-display text-2xl tracking-tight">{title}</p>
      <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
        {fields.map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm text-steel-300">
            <span aria-hidden className="size-1.5 shrink-0 bg-accent" />
            {f}
          </li>
        ))}
      </ul>
      <p className="mt-8 border-t border-line pt-5 text-sm text-muted">
        In the meantime: call{" "}
        <a href={site.phone.href} className="link-underline text-fg">
          {site.phone.display}
        </a>{" "}
        or email{" "}
        <a href={`mailto:${site.email}`} className="link-underline text-fg">
          {site.email}
        </a>
        .
      </p>
    </div>
  );
}
