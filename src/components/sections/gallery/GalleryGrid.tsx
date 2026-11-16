"use client";

import { ViewTransition, startTransition, useMemo, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { Lightbox } from "@/components/ui/Lightbox";
import { Photo } from "@/components/ui/Photo";
import { gallery, galleryCategories, type GalleryCategory } from "@/content/gallery";
import { photo } from "@/content/photos";
import { cn } from "@/lib/cn";

/* The open photo lives in the URL hash (#photo-<id>) so it is linkable and the
   phone/browser Back button closes the lightbox. */
const HASH_EVENT = "sh:hash";
function subscribeHash(cb: () => void) {
  window.addEventListener("hashchange", cb);
  window.addEventListener("popstate", cb);
  window.addEventListener(HASH_EVENT, cb);
  return () => {
    window.removeEventListener("hashchange", cb);
    window.removeEventListener("popstate", cb);
    window.removeEventListener(HASH_EVENT, cb);
  };
}
const readHash = () => window.location.hash;
const serverHash = () => "";

/**
 * Filterable masonry gallery.
 *  - category chips with live counts; switching crossfades via <ViewTransition>
 *  - CSS-columns masonry that keeps each photo's real aspect ratio
 *  - "View" cursor + zoom on hover; tap/click opens the swipeable lightbox
 */
export function GalleryGrid() {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const hash = useSyncExternalStore(subscribeHash, readHash, serverHash);
  const pushed = useRef(false); // did we add the #photo history entry ourselves?

  const items = useMemo(() => (filter === "all" ? gallery : gallery.filter((g) => g.category === filter)), [filter]);
  const openId = hash.startsWith("#photo-") ? hash.slice(7) : null;
  const openIndex = openId ? items.findIndex((i) => i.id === openId) : -1;

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: gallery.length };
    for (const g of gallery) c[g.category] = (c[g.category] ?? 0) + 1;
    return c;
  }, []);

  function openPhoto(id: string) {
    pushed.current = true;
    history.pushState(null, "", `#photo-${id}`);
    window.dispatchEvent(new Event(HASH_EVENT));
  }
  function showPhoto(i: number) {
    history.replaceState(null, "", `#photo-${items[i].id}`);
    window.dispatchEvent(new Event(HASH_EVENT));
  }
  function close() {
    if (pushed.current) {
      pushed.current = false;
      history.back(); // pops our #photo entry → popstate → lightbox closes
    } else {
      history.replaceState(null, "", location.pathname + location.search);
      window.dispatchEvent(new Event(HASH_EVENT));
    }
  }

  return (
    <>
      {/* Filters */}
      <div className="sticky top-0 z-30 -mx-[var(--gutter)] border-y border-line bg-[color-mix(in_oklab,var(--bg)_88%,transparent)] px-[var(--gutter)] backdrop-blur-xl">
        <div role="toolbar" aria-label="Filter photos" className="no-scrollbar flex gap-1.5 overflow-x-auto py-3">
          {galleryCategories.map((c) => {
            const active = filter === c.key;
            return (
              <button
                key={c.key}
                type="button"
                aria-pressed={active}
                onClick={() => startTransition(() => setFilter(c.key))}
                className={cn(
                  "flex min-h-11 shrink-0 items-center gap-2.5 border px-4 text-sm transition-colors",
                  active ? "border-accent bg-accent text-accent-ink" : "border-line-strong text-steel-300 hover:border-fg hover:text-fg",
                )}
              >
                {c.label}
                <span className={cn("font-mono text-[0.68rem]", active ? "text-accent-ink/70" : "text-muted")}>{counts[c.key] ?? 0}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Masonry */}
      <ViewTransition key={filter} name="gallery-grid" share="auto" enter="auto" default="none">
        <ul className="mt-8 columns-2 gap-2 md:columns-3 md:gap-3 xl:columns-4">
          {items.map((item, i) => {
            const p = photo(item.id);
            return (
              <li key={item.id} className="mb-2 break-inside-avoid md:mb-3" data-reveal="scale" style={{ "--d": `${(i % 4) * 60}ms` } as CSSProperties}>
                <button
                  type="button"
                  onClick={() => openPhoto(item.id)}
                  data-cursor="view"
                  data-cursor-label="View"
                  aria-label={`Open photo: ${item.alt}`}
                  className="group/m relative block w-full overflow-hidden bg-surface"
                  style={{ aspectRatio: `${p.width} / ${p.height}` }}
                >
                  <div className={cn("size-full transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover/m:scale-[1.06]", p.alpha && "p-4")}>
                    <Photo id={item.id} alt={item.alt} sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw" />
                  </div>
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg/85 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/m:opacity-100" />
                  <span className="absolute inset-x-0 bottom-0 hidden translate-y-2 p-3 text-left text-xs text-fg opacity-0 transition-[opacity,translate] duration-500 group-hover/m:translate-y-0 group-hover/m:opacity-100 md:block">
                    {item.alt}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </ViewTransition>

      <Lightbox
        items={items}
        index={openIndex >= 0 ? openIndex : null}
        onClose={close}
        onIndexChange={showPhoto}
      />
    </>
  );
}
