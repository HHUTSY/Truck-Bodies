import manifest from "./photos.json";

/**
 * Client photography (downloaded from the previous shtruckbodies.com media
 * library, EXIF-rotated, resized to ≤2400px masters). next/image serves
 * AVIF/WebP at the requested size; `blur` is a 16px WebP placeholder.
 * `alpha` = transparent studio cut-out (render with object-contain).
 */
export type PhotoMeta = {
  id: string;
  src: string;
  width: number;
  height: number;
  alpha: boolean;
  blur: string;
};

// Static hosting under a sub-path (GitHub Pages): unoptimized images are not auto-prefixed.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const photos = (manifest as PhotoMeta[]).map((p) => ({ ...p, src: BASE + p.src }));
const byId = new Map<string, PhotoMeta>(photos.map((p) => [p.id, p]));

export function photo(id: string): PhotoMeta {
  const p = byId.get(id);
  if (!p) throw new Error(`Unknown photo id: ${id}`);
  return p;
}

export const allPhotos = photos;
