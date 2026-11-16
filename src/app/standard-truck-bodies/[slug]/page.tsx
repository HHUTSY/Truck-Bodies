import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition, type CSSProperties } from "react";
import { BodyGlyph } from "@/components/illustrations/BodyGlyph";
import { Check, Download, Ruler } from "@/components/icons";
import { PageTransition } from "@/components/motion/PageTransition";
import { SplitText } from "@/components/motion/SplitText";
import { ProductGallery } from "@/components/sections/product/ProductGallery";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs, CtaBand } from "@/components/ui/PageBlocks";
import { Photo } from "@/components/ui/Photo";
import { ProductCard } from "@/components/ui/ProductCard";
import { SpecTable } from "@/components/ui/SpecTable";
import { VideoFacade } from "@/components/ui/VideoFacade";
import { SpecChip } from "@/components/ui/Layout";
import { videoById } from "@/content/gallery";
import { photo } from "@/content/photos";
import { productBySlug, productHref, products } from "@/content/products";
import { quoteHref } from "@/lib/site";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/* Fully prerendered via generateStaticParams. Deliberately "blocking" (no Suspense
   around params): the shared-element morph needs the hero to render in the same
   commit as the navigation. Product links use prefetch={true}, so it is instant in prod. */
export const instant = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/standard-truck-bodies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) return {};
  return {
    title: p.seo.title,
    description: p.seo.description,
    alternates: { canonical: productHref(p.slug) },
    openGraph: { title: p.seo.title, description: p.seo.description, images: [{ url: photo(p.hero).src }] },
  };
}

export default async function ProductPage({ params }: PageProps<"/standard-truck-bodies/[slug]">) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const related = product.related.map((s) => productBySlug(s)!).filter(Boolean);
  const quote = `${quoteHref}?body=${product.key}`;

  return (
    <PageTransition>
      {/* ------------------------------------------------ HERO */}
      <section className="relative isolate overflow-hidden pt-[calc(var(--header-h)+1.5rem)] md:pt-[calc(var(--header-h)+2.5rem)]">
        <div aria-hidden className="bg-blueprint absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_70%_30%,black_10%,transparent_70%)]" />
        <div className="container-site">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Standard bodies", href: "/standard-truck-bodies" },
              { label: product.shortName },
            ]}
          />
          <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-6">
            <div className="flex flex-col lg:col-span-5">
              <p className="load-in eyebrow flex items-center gap-3 text-muted" style={d(60)}>
                <span className="text-accent-text">[ {product.index} ]</span>
                <span aria-hidden className="h-px w-8 bg-line-strong" />
                Standard truck bodies
              </p>
              <ViewTransition name={`product-title-${product.slug}`} share="morph" default="none">
                <h1 className="mt-6 text-display-lg">{product.name}</h1>
              </ViewTransition>
              <p className="load-in mt-6 text-lead text-fg" style={d(300)}>
                {product.tagline}
              </p>
              <p className="load-in mt-4 text-muted" style={d(380)}>
                {product.intro}
              </p>
              <div className="load-in mt-8 flex flex-wrap gap-3" style={d(460)}>
                <Button href={quote} size="lg" magnetic>
                  Request a Quote
                </Button>
                <Button href={`${productHref(product.slug)}/spec-sheet`} size="lg" variant="secondary" icon={<Download />}>
                  Spec sheet
                </Button>
              </div>
              <Link
                href={`/configurator?body=${product.key}`}
                className="load-in link-underline mt-6 inline-flex w-fit items-center gap-2 text-sm text-accent-text"
                style={d(540)}
              >
                <Ruler className="size-4" /> Configure size & paint color
              </Link>
            </div>

            <div className="lg:col-span-7">
              <div className="relative aspect-[16/11] overflow-hidden border border-line bg-[radial-gradient(ellipse_at_55%_45%,#1f242b,#0f1114_70%)]">
                <div aria-hidden className="bg-blueprint absolute inset-0 opacity-40" />
                <ViewTransition name={`product-media-${product.slug}`} share="morph" default="none">
                  <div className="absolute inset-[6%]">
                    <Photo id={product.hero} alt={product.heroAlt} sizes="(min-width: 1024px) 58vw, 100vw" priority quality={80} />
                  </div>
                </ViewTransition>
                <span className="absolute left-4 top-4 font-mono text-[0.65rem] tracking-wider text-muted">
                  SH—{product.index} / {product.shortName.toUpperCase()}
                </span>
                <span className="absolute bottom-4 right-4 w-28 text-steel-500 md:w-36" aria-hidden>
                  <BodyGlyph body={product.key} />
                </span>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <dl className="load-in mt-10 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4" style={d(600)}>
            {product.highlights.map((h) => (
              <div key={h.label} className="bg-bg p-4 md:p-6">
                <dt className="eyebrow text-[0.62rem] text-muted">{h.label}</dt>
                <dd className="mt-2 font-display text-xl tracking-tight md:text-2xl">{h.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------ VARIANT NAV + VARIANTS */}
      <div className="container-site mt-16 md:mt-24">
        <nav aria-label={`${product.shortName} models`} className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)]">
          {product.variants.map((v, i) => (
            <a
              key={v.id}
              href={`#${v.id}`}
              className="flex min-h-11 shrink-0 items-center gap-3 border border-line-strong px-4 text-sm transition-colors hover:border-accent hover:text-fg"
            >
              <span className="font-mono text-xs text-accent-text">
                {product.index}.{i + 1}
              </span>
              {v.name}
            </a>
          ))}
        </nav>
      </div>

      {product.variants.map((v, i) => (
        <section key={v.id} id={v.id} aria-labelledby={`${v.id}-title`} className="scroll-mt-24 border-b border-line py-16 md:py-24">
          <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
                <p className="eyebrow text-accent-text">
                  {product.index}.{i + 1}
                </p>
                <h2 id={`${v.id}-title`} className="mt-4 text-display-md">
                  <SplitText text={v.name} />
                </h2>
                <p className="mt-4 text-muted" data-reveal>
                  {v.summary}
                </p>
                <div
                  className="relative mt-8 aspect-[16/10] overflow-hidden border border-line bg-[radial-gradient(ellipse_at_50%_45%,#1f242b,#0f1114_72%)]"
                  data-reveal="scale"
                >
                  <div className="absolute inset-[5%]">
                    <Photo id={v.image} alt={v.imageAlt} sizes="(min-width: 1024px) 40vw, 100vw" />
                  </div>
                </div>
                {v.shownWith && (
                  <div className="mt-6" data-reveal>
                    <p className="eyebrow text-[0.65rem] text-muted">Shown with</p>
                    <p className="mt-3 text-sm leading-relaxed text-steel-300">{v.shownWith.join(" · ")}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid content-start gap-12 lg:col-span-7">
              {v.standard.map((g) => (
                <div key={g.title} data-reveal>
                  <h3 className="eyebrow text-muted">Standard — {g.title}</h3>
                  <ul className="mt-4 grid border-t border-line sm:grid-cols-2 sm:gap-x-8">
                    {g.items.map((item) => (
                      <li key={item} className="flex gap-3 border-b border-line py-3 text-[0.95rem]">
                        <Check className="mt-1 size-4 shrink-0 text-accent-text" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {v.tables?.map((t) => (
                <div key={t.caption} data-reveal>
                  <SpecTable table={t} />
                </div>
              ))}

              {(v.options || v.installOptions) && (
                <div className="grid gap-10 md:grid-cols-2" data-reveal>
                  {v.options && (
                    <div>
                      <h3 className="eyebrow text-muted">Body options</h3>
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {v.options.map((o) => (
                          <li key={o} className="border border-line px-3 py-2 text-sm text-steel-300">
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {v.installOptions && (
                    <div>
                      <h3 className="eyebrow text-muted">Install options</h3>
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {v.installOptions.map((o) => (
                          <li key={o} className="border border-line px-3 py-2 text-sm text-steel-300">
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {v.notes?.map((n) => (
                <p key={n} className="border-l-2 border-accent pl-4 text-sm text-muted">
                  {n}
                </p>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ------------------------------------------------ GALLERY */}
      <section aria-labelledby="product-gallery-title" className="py-16 md:py-24">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="product-gallery-title" className="text-display-md">
              <SplitText text="In the field" />
            </h2>
            <Link href="/gallery" className="link-underline text-sm text-muted hover:text-fg">
              Full gallery →
            </Link>
          </div>
          <div className="mt-10">
            <ProductGallery items={product.gallery} />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ VIDEOS */}
      {product.videos.length > 0 && (
        <section id="videos" aria-labelledby="product-videos-title" className="scroll-mt-24 border-t border-line py-16 md:py-24">
          <div className="container-site">
            <h2 id="product-videos-title" className="text-display-md">
              <SplitText text="Watch the walkaround" />
            </h2>
            <div className="mt-10 grid gap-3 md:grid-cols-2">
              {product.videos.map((id) => {
                const v = videoById(id);
                return <VideoFacade key={id} id={id} title={v?.title ?? product.name} tag={v?.tag} />;
              })}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------ RELATED */}
      <section aria-labelledby="related-title" className="border-t border-line py-16 md:py-24">
        <div className="container-site">
          <h2 id="related-title" className="text-display-md">
            <SplitText text="Related bodies" />
          </h2>
          <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ProductCard
                key={r.slug}
                slug={r.slug}
                href={productHref(r.slug)}
                index={r.index}
                title={r.name}
                summary={r.tagline}
                media={
                  <div className="absolute inset-[8%]">
                    <Photo id={r.hero} alt={r.heroAlt} sizes="(min-width: 1024px) 33vw, 100vw" />
                  </div>
                }
                meta={r.highlights.slice(0, 2).map((h) => (
                  <SpecChip key={h.label} label={h.label} value={h.value} />
                ))}
              />
            ))}
            <Link
              href="/custom-truck-bodies"
              data-cursor="view"
              data-cursor-label="Custom"
              className="group/c flex min-h-72 flex-col justify-between bg-accent p-6 text-accent-ink md:p-8"
            >
              <span className="font-mono text-xs">05</span>
              <span>
                <span className="block font-display text-[1.75rem] leading-none tracking-tight">Need something custom?</span>
                <span className="mt-3 block text-sm text-accent-ink/80">Toolboxes, ramps, winch tracks — built to your spec.</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <CtaBand title={`Quote a ${product.shortName.toLowerCase()} body`} />
    </PageTransition>
  );
}
