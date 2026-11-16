import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LogoMark } from "@/components/brand/Logo";
import { Photo } from "@/components/ui/Photo";
import { PrintButton } from "@/components/ui/PrintButton";
import { productBySlug, productHref, products } from "@/content/products";
import { site } from "@/lib/site";

/**
 * Printable one-document spec sheet (Letter). On screen it previews as a
 * paper sheet; `@media print` strips site chrome so "Save as PDF" yields a
 * clean, lightweight spec sheet. (Server-generated PDFs can replace this in step 3.)
 */
/* Fully prerendered via generateStaticParams. Deliberately "blocking" (no Suspense
   around params): the shared-element morph needs the hero to render in the same
   commit as the navigation. Product links use prefetch={true}, so it is instant in prod. */
export const instant = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/standard-truck-bodies/[slug]/spec-sheet">): Promise<Metadata> {
  const { slug } = await params;
  const p = productBySlug(slug);
  return p ? { title: `${p.name} — Spec Sheet`, robots: { index: false } } : {};
}

export default async function SpecSheetPage({ params }: PageProps<"/standard-truck-bodies/[slug]/spec-sheet">) {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) notFound();

  return (
    <div className="spec-sheet-page pb-section pt-[calc(var(--header-h)+2rem)] print:p-0">
      <div className="container-site mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link href={productHref(p.slug)} className="link-underline text-sm text-muted hover:text-fg">
          ← Back to {p.name}
        </Link>
        <PrintButton />
      </div>

      <article className="theme-paper mx-auto w-full max-w-[8.5in] bg-white px-[0.6in] py-[0.55in] text-[10.5pt] leading-snug shadow-lift print:max-w-none print:p-0 print:shadow-none">
        <header className="flex items-start justify-between gap-6 border-b-2 border-[var(--graphite-950)] pb-4">
          <div className="flex items-center gap-3">
            <LogoMark className="size-11 text-[var(--graphite-950)]" />
            <div>
              <p className="font-display text-xl font-semibold tracking-tight">{site.name}</p>
              <p className="font-mono text-[8pt] uppercase tracking-[0.14em] text-muted">{site.tagline}</p>
            </div>
          </div>
          <div className="text-right font-mono text-[8pt] leading-relaxed text-muted">
            {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}
            <br />
            {site.phone.display} · {site.email}
          </div>
        </header>

        <div className="mt-6 grid grid-cols-[1.1fr_1fr] gap-6">
          <div>
            <p className="font-mono text-[8pt] uppercase tracking-[0.14em] text-accent-text">Spec sheet · SH—{p.index}</p>
            <h1 className="mt-2 font-display text-[26pt] font-semibold leading-none tracking-tight">{p.name}</h1>
            <p className="mt-3 text-muted">{p.intro}</p>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              {p.highlights.map((h) => (
                <div key={h.label} className="border-t border-line pt-1.5">
                  <dt className="font-mono text-[7.5pt] uppercase tracking-[0.12em] text-muted">{h.label}</dt>
                  <dd className="font-semibold">{h.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative aspect-[4/3] bg-[var(--bone-200)]">
            <div className="absolute inset-[6%]">
              <Photo id={p.hero} alt={p.heroAlt} sizes="4in" imgClassName="drop-shadow-none" />
            </div>
          </div>
        </div>

        {p.variants.map((v) => (
          <section key={v.id} className="mt-7 break-inside-avoid-page">
            <h2 className="border-b border-line-strong pb-1 font-display text-[14pt] font-semibold tracking-tight">{v.name}</h2>
            <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3">
              {v.standard.map((g) => (
                <div key={g.title}>
                  <h3 className="font-mono text-[7.5pt] uppercase tracking-[0.12em] text-muted">Standard — {g.title}</h3>
                  <ul className="mt-1 list-disc pl-4 text-[9pt]">
                    {g.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
              {v.options && (
                <div>
                  <h3 className="font-mono text-[7.5pt] uppercase tracking-[0.12em] text-muted">Options</h3>
                  <p className="mt-1 text-[9pt]">{v.options.join(" · ")}</p>
                </div>
              )}
            </div>
            {v.tables?.map((t) => (
              <table key={t.caption} className="mt-3 w-full border-collapse text-[8.5pt]">
                <caption className="pb-1 text-left font-mono text-[7.5pt] uppercase tracking-[0.12em] text-muted">{t.caption}</caption>
                <thead>
                  <tr>
                    {t.columns.map((c) => (
                      <th key={c} className="border border-line-strong bg-[var(--bone-200)] px-2 py-1 text-left font-semibold">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.rows.map((r, i) => (
                    <tr key={i}>
                      {r.map((cell, j) => (
                        <td key={j} className="border border-line-strong px-2 py-1 tabular-nums">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ))}
          </section>
        ))}

        <footer className="mt-8 flex justify-between border-t border-line-strong pt-3 font-mono text-[7.5pt] text-muted">
          <span>Specifications subject to change. Contact your SH dealer for current details.</span>
          <span>3-year limited warranty</span>
        </footer>
      </article>
    </div>
  );
}
