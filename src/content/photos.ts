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

const byId = new Map<string, PhotoMeta>((manifest as PhotoMeta[]).map((p) => [p.id, p]));

export function photo(id: string): PhotoMeta {
  const p = byId.get(id);
  if (!p) throw new Error(`Unknown photo id: ${id}`);
  return p;
}

export const allPhotos = manifest as PhotoMeta[];
