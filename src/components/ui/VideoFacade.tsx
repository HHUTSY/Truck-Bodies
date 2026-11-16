"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "@/components/icons";
import { cn } from "@/lib/cn";

/**
 * Lazy YouTube embed: renders a lightweight thumbnail + play button and only
 * loads the (privacy-enhanced) youtube-nocookie iframe on click — zero
 * third-party JS until the visitor asks for it.
 */
export function VideoFacade({
  id,
  title,
  tag,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  id: string;
  title: string;
  tag?: string;
  className?: string;
  sizes?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={cn("relative aspect-video overflow-hidden border border-line bg-surface", className)}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          data-cursor="view"
          data-cursor-label="Play"
          className="group/video absolute inset-0 text-left"
        >
          <Image
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            fill
            sizes={sizes}
            className="object-cover opacity-70 transition-[transform,opacity] duration-[1200ms] ease-[var(--ease-out-expo)] group-hover/video:scale-[1.06] group-hover/video:opacity-90"
          />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
          <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center bg-accent text-accent-ink transition-transform duration-500 ease-[var(--ease-out-expo)] chamfer [--cut:10px] group-hover/video:scale-110 md:size-20">
            <Play className="size-6 translate-x-0.5 fill-current md:size-7" />
          </span>
          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 md:p-6">
            <span className="font-display text-lg leading-tight tracking-tight md:text-2xl">{title}</span>
            {tag && <span className="eyebrow shrink-0 text-[0.65rem] text-muted">{tag}</span>}
          </span>
        </button>
      )}
    </div>
  );
}
