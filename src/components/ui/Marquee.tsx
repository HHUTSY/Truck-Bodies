import { cn } from "@/lib/cn";

/** Infinite spec ticker — CSS transform animation, pauses on hover. */
export function Marquee({ items, className }: { items: readonly string[]; className?: string }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-8 pr-8 md:gap-12 md:pr-12">
          <span className="whitespace-nowrap font-display text-xl tracking-tight text-steel-300 md:text-3xl">
            {item}
          </span>
          <span aria-hidden className="chamfer size-2.5 bg-accent [--cut:3px]" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cn("marquee relative overflow-hidden border-y border-line py-5 md:py-7", className)}>
      <div className="flex w-max animate-marquee will-change-transform">
        {row(false)}
        {row(true)}
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg to-transparent md:w-40" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg to-transparent md:w-40" />
    </div>
  );
}
