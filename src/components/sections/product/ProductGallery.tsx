"use client";

import { useState } from "react";
import { Lightbox, type LightboxItem } from "@/components/ui/Lightbox";
import { Photo } from "@/components/ui/Photo";

/** Horizontal, swipeable photo strip that opens the lightbox. */
export function ProductGallery({ items }: { items: LightboxItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <ul className="no-scrollbar -mx-[var(--gutter)] flex snap-x snap-mandatory gap-2 overflow-x-auto px-[var(--gutter)] md:gap-3" data-lenis-prevent-wheel>
        {items.map((it, i) => (
          <li key={it.id} className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw]">
            <button
              type="button"
              onClick={() => setOpen(i)}
              data-cursor="view"
              data-cursor-label="View"
              aria-label={`Open photo: ${it.alt}`}
              className="group/pg relative block aspect-[4/3] w-full overflow-hidden bg-surface"
            >
              <div className="size-full transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover/pg:scale-[1.06]">
                <Photo id={it.id} alt={it.alt} sizes="(min-width: 1024px) 30vw, 78vw" />
              </div>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndexChange={setOpen} />
    </>
  );
}
