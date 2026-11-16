import type { CSSProperties, ReactNode } from "react";
import { Clock, Ruler, SprayCan, Truck, Check } from "@/components/icons";
import { Counter } from "@/components/motion/Counter";
import { SplitText } from "@/components/motion/SplitText";
import { Photo } from "@/components/ui/Photo";
import { site } from "@/lib/site";

const reasons: { icon: ReactNode; title: string; text: string; photo: string; alt: string }[] = [
  {
    icon: <Clock className="size-5" />,
    title: "Shorter lead times",
    text: "Shorter-than-industry-standard lead times — and common standard bodies kept in stock — so your customers' trucks get back to work sooner.",
    photo: "img-0331-2",
    alt: "Finished SH dump body on a Ford F-750",
  },
  {
    icon: <Ruler className="size-5" />,
    title: "Custom sizes & configurations",
    text: "Length, side height, floor, cab shield, hoist, toolboxes — every dimension and option can be customized. We can customize anything.",
    photo: "use-for-page-25",
    alt: "Custom red beavertail body with fold-down ramp",
  },
  {
    icon: <SprayCan className="size-5" />,
    title: "In-house paint facility",
    text: "A state-of-the-art paint facility under our roof. Standard black, white for forestry, or any custom color your customer specs.",
    photo: "20220930-135303",
    alt: "Pink custom-painted dump body",
  },
  {
    icon: <Truck className="size-5" />,
    title: "Full delivery service",
    text: "Finished bodies delivered to your door, ready for install — one less thing for your shop to coordinate.",
    photo: "img-1703",
    alt: "SH bodies loaded on a trailer for delivery",
  },
];

/**
 * Why SH: sticky statement on the left, reasons on the right. Each row
 * reveals a photo that slides out on hover (desktop) / shows inline (mobile).
 * Stats use only published facts — see site.ts for client-supplied numbers.
 */
export function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="relative border-t border-line py-section">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <p className="eyebrow flex items-center gap-3 text-muted">
              <span className="text-accent-text">[ 03 ]</span>
              <span aria-hidden className="h-px w-8 bg-line-strong" />
              Why distributors choose SH
            </p>
            <h2 id="why-title" className="mt-5 text-display-lg">
              <SplitText lines={["Wholesale only.", { text: "Built for the people who sell trucks.", className: "text-muted" }]} />
            </h2>
            <p className="mt-8 max-w-md text-muted" data-reveal>
              {site.description}
            </p>
          </div>
        </div>

        <ol className="lg:col-span-7 lg:col-start-6">
          {reasons.map((r, i) => (
            <li
              key={r.title}
              data-reveal
              style={{ "--d": `${i * 60}ms` } as CSSProperties}
              className="group/row relative border-t border-line py-8 last:border-b md:py-10"
            >
              <div className="grid gap-5 md:grid-cols-[4.5rem_1fr_12rem] md:items-start md:gap-6">
                <span className="flex items-center gap-3 font-mono text-xs text-muted md:flex-col md:items-start">
                  <span className="text-accent-text">0{i + 1}</span>
                  <span className="grid size-10 place-items-center border border-line-strong text-fg transition-colors duration-500 group-hover/row:border-accent group-hover/row:bg-accent group-hover/row:text-accent-ink">
                    {r.icon}
                  </span>
                </span>
                <div>
                  <h3 className="font-display text-[clamp(1.5rem,2.4vw,2.25rem)] leading-none tracking-[-0.03em]">{r.title}</h3>
                  <p className="mt-3 max-w-lg text-muted">{r.text}</p>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden bg-surface md:[clip-path:inset(0_0_0_100%)] md:transition-[clip-path] md:duration-700 md:ease-[var(--ease-out-expo)] md:group-hover/row:[clip-path:inset(0_0_0_0)]">
                  <div className="size-full scale-110 transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover/row:scale-100">
                    <Photo id={r.photo} alt={r.alt} fit="cover" sizes="(min-width: 768px) 192px, 100vw" />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Stats band — published facts only */}
      <div className="container-site mt-section">
        <dl className="grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
          {[
            { label: "Year limited warranty", value: <Counter to={3} /> },
            { label: "Standard body families", value: <Counter to={4} suffix=" + custom" /> },
            { label: "Longest stake body", value: <Counter to={26.5} decimals={1} suffix=" ft" /> },
            { label: "Max chipper capacity", value: <Counter to={25} suffix=" yd³" /> },
          ].map((s) => (
            <div key={s.label} className="flex flex-col-reverse justify-between gap-6 bg-bg p-5 md:p-8">
              <dt className="eyebrow text-[0.65rem] text-muted">{s.label}</dt>
              <dd className="font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-none tracking-[-0.04em]">{s.value}</dd>
            </div>
          ))}
        </dl>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted">
          {["NTEA member", "LED lighting to FMVSS108", "Structural channel long sills", "Primed & painted in-house"].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <Check className="size-4 text-accent-text" /> {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
