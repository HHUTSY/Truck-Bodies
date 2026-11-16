"use client";

import { useState, type CSSProperties } from "react";
import { SplitText } from "@/components/motion/SplitText";
import { Button } from "@/components/ui/Button";
import { Lightbox } from "@/components/ui/Lightbox";
import { Photo } from "@/components/ui/Photo";
import { gallery } from "@/content/gallery";
import { cn } from "@/lib/cn";

const featured = gallery.filter((g) => g.featured).slice(0, 8);

/** Asymmetric editorial grid of real builds; opens the swipeable lightbox. */
export function FeaturedGallery() {
  const [open, setOpen] = useState<number | null>(null);
  // Hand-tuned spans for an editorial rhythm on desktop
  const spans = [
    "lg:col-span-7 lg:row-span-2 aspect-[4/3] lg:aspect-auto",
    "lg:col-span-5 aspect-[4/3]",
    "lg:col-span-5 aspect-[4/3]",
    "lg:col-span-4 aspect-[4/5]",
    "lg:col-span-4 aspect-[4/5]",
    "lg:col-span-4 aspect-[4/5]",
    "lg:col-span-5 aspect-[4/3]",
    "lg:col-span-7 aspect-[16/9]",
  ];

  return (
    <section aria-labelledby="gallery-title" className="relative py-section">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-6">
          <div className="lg:col-span-8">
            <p className="eyebrow flex items-center gap-3 text-muted">
              <span className="text-accent-text">[ 02 ]</span>
              <span aria-hidden className="h-px w-8 bg-line-strong" />
              In the field
            </p>
            <h2 id="gallery-title" className="mt-5 text-display-lg">
              <SplitText lines={["Built, painted,", { text: "delivered.", className: "words-signal" }]} />
            </h2>
          </div>
          <div className="flex lg:col-span-4 lg:justify-end" data-reveal>
            <Button href="/gallery" variant="secondary">
              Full gallery · {gallery.length} builds
            </Button>
          </div>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-2 md:mt-16 md:gap-3 lg:grid-cols-12">
          {featured.map((item, i) => (
            <li
              key={item.id}
              data-reveal="scale"
              style={{ "--d": `${(i % 3) * 90}ms` } as CSSProperties}
              className={cn("relative", i === 0 ? "col-span-2" : i === 7 ? "col-span-2" : "col-span-1", spans[i])}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                data-cursor="view"
                data-cursor-label="View"
                aria-label={`Open photo: ${item.alt}`}
                className="group/g absolute inset-0 overflow-hidden bg-surface"
              >
                <div className="size-full transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover/g:scale-[1.06]">
                  <Photo
                    id={item.id}
                    alt={item.alt}
                    fit="cover"
                    sizes={i === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"}
                  />
                </div>
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/g:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 translate-y-3 p-4 text-left text-sm text-fg opacity-0 transition-[opacity,translate] duration-500 group-hover/g:translate-y-0 group-hover/g:opacity-100">
                  {item.alt}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Lightbox items={featured} index={open} onClose={() => setOpen(null)} onIndexChange={setOpen} />
    </section>
  );
}
