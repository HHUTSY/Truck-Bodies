import Image from "next/image";
import { photo } from "@/content/photos";
import { cn } from "@/lib/cn";

/**
 * next/image wrapper for client photography.
 *  - `fill` mode by default (parent controls the box & aspect)
 *  - blur-up placeholder from the manifest
 *  - studio cut-outs (transparent PNGs) render contained with a soft floor shadow
 */
export function Photo({
  id,
  alt,
  sizes = "100vw",
  priority = false, // maps to next/image `preload` (Next 16 replaced `priority`)
  fit,
  className,
  imgClassName,
  quality = 70,
}: {
  id: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
  className?: string;
  imgClassName?: string;
  quality?: 70 | 80;
}) {
  const p = photo(id);
  const mode = fit ?? (p.alpha ? "contain" : "cover");
  return (
    <div className={cn("relative size-full", className)}>
      <Image
        src={p.src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        preload={priority}
        placeholder={p.alpha ? "empty" : "blur"}
        blurDataURL={p.alpha ? undefined : p.blur}
        className={cn(
          mode === "contain" ? "object-contain" : "object-cover",
          p.alpha && "drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]",
          imgClassName,
        )}
      />
    </div>
  );
}
