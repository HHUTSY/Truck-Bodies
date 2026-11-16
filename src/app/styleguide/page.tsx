import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import * as Icons from "@/components/icons";
import { LogoMark } from "@/components/brand/Logo";
import { BodyGlyph } from "@/components/illustrations/BodyGlyph";
import { Counter } from "@/components/motion/Counter";
import { MorphDivider } from "@/components/motion/MorphDivider";
import { PageTransition } from "@/components/motion/PageTransition";
import { SplitText } from "@/components/motion/SplitText";
import { Button } from "@/components/ui/Button";
import { Choice, Field, Input, Select, Textarea } from "@/components/ui/Form";
import { Eyebrow, SpecChip } from "@/components/ui/Layout";
import { Marquee } from "@/components/ui/Marquee";
import { ProductCard } from "@/components/ui/ProductCard";
import { bodies } from "@/lib/bodies";

export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

const semantic = [
  { token: "--bg", value: "#0A0B0D", use: "Page background" },
  { token: "--bg-elevated", value: "#0F1114", use: "Raised panels" },
  { token: "--surface", value: "#14171B", use: "Cards, inputs" },
  { token: "--surface-strong", value: "#1A1E23", use: "Hover surfaces" },
  { token: "--fg", value: "#ECEEF0", use: "Primary text · 16.9:1" },
  { token: "--fg-muted", value: "#8F98A2", use: "Secondary text · 6.6:1" },
  { token: "--line-strong", value: "rgba(236,238,240,.18)", use: "Borders, rules" },
  { token: "--accent", value: "#FF5B14", use: "Signal orange · CTAs" },
  { token: "--accent-text", value: "#FF7B42", use: "Accent text · 7.6:1" },
];

const ramps: { name: string; steps: [string, string][] }[] = [
  {
    name: "Graphite",
    steps: [
      ["1000", "#060708"],
      ["950", "#0a0b0d"],
      ["900", "#0f1114"],
      ["850", "#14171b"],
      ["800", "#1a1e23"],
      ["700", "#242930"],
      ["600", "#323840"],
    ],
  },
  {
    name: "Steel",
    steps: [
      ["500", "#5f6872"],
      ["400", "#8f98a2"],
      ["300", "#b3bac2"],
      ["200", "#d2d6db"],
      ["100", "#eceef0"],
    ],
  },
  {
    name: "Signal",
    steps: [
      ["700", "#c2410c"],
      ["600", "#ea4f0c"],
      ["500", "#ff5b14"],
      ["400", "#ff7b42"],
      ["300", "#ffa274"],
    ],
  },
  {
    name: "Bone",
    steps: [
      ["300", "#d9d5cc"],
      ["200", "#e6e3dc"],
      ["100", "#f2f0eb"],
    ],
  },
];

const typeScale = [
  { token: "display-2xl", cls: "text-display-2xl", spec: "Space Grotesk 500 · 50 → 184px · lh .86 · −5%", sample: "Superior." },
  { token: "display-xl", cls: "text-display-xl", spec: "Space Grotesk 500 · 42 → 124px · lh .90", sample: "Built for the work." },
  { token: "display-lg", cls: "text-display-lg", spec: "Space Grotesk 500 · 35 → 84px · lh .94", sample: "Dump · Landscape · Platform" },
  { token: "display-md", cls: "text-display-md", spec: "Space Grotesk 500 · 30 → 56px · lh 1", sample: "Shorter-than-industry lead times" },
  { token: "display-sm", cls: "text-display-sm", spec: "Space Grotesk 500 · 23 → 36px · lh 1.08", sample: "In-house paint facility, custom colors" },
  { token: "lead", cls: "max-w-2xl text-lead text-muted", spec: "Inter Tight 400 · 18 → 22px · lh 1.5", sample: "Rugged construction for everyday hauling to your heaviest applications." },
  { token: "base", cls: "max-w-2xl text-base", spec: "Inter Tight 400 · 16px · lh 1.5", sample: "6\" × 8.2 lb structural channel long sills, 3\" cross members 12\" o.c., 10 ga. steel floor formed with inner side wall." },
];

const spacing = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128];

function Block({ id, index, title, children }: { id: string; index: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-16 md:py-24">
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-3">
          <Eyebrow index={index}>{title}</Eyebrow>
          <h2 id={`${id}-title`} className="sr-only">
            {title}
          </h2>
        </div>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <PageTransition>
      {/* Intro */}
      <section className="relative overflow-hidden pb-16 pt-[calc(var(--header-h)+3rem)] md:pb-24 md:pt-[calc(var(--header-h)+5rem)]">
        <div aria-hidden className="bg-blueprint absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="container-site">
          <p className="load-in eyebrow text-muted">[ DS ] SH Truck Bodies — Design System v1.0</p>
          <h1 className="mt-8 text-display-xl">
            <SplitText trigger="load" lines={["Cut-plate", { text: "design system.", className: "words-signal" }]} />
          </h1>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["Graphite & signal", "A dark steel base, one hard accent. Orange is reserved for action and emphasis — never decoration."],
              ["Cut-plate geometry", "Chamfered corners echo laser-cut steel. Sharp radii, hairline rules, technical mono labels."],
              ["Mechanical motion", "Weighted expo easing, hoists and plotter wipes. Precise, never bouncy. Reduced-motion aware."],
            ].map(([t, d], i) => (
              <div key={t} className="load-in border-t border-line-strong pt-5" style={{ "--d": `${300 + i * 90}ms` } as CSSProperties}>
                <p className="font-display text-xl">{t}</p>
                <p className="mt-2 text-sm text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Color */}
      <Block id="color" index="01" title="Color">
        <div className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">
          {semantic.map((s) => (
            <div key={s.token} className="bg-bg p-4" data-reveal>
              <div
                className="chamfer aspect-[5/3] border border-line [--cut:12px]"
                style={{ background: `var(${s.token})` }}
              />
              <p className="mt-4 font-mono text-xs text-fg">{s.token}</p>
              <p className="mt-1 font-mono text-[0.7rem] text-muted">{s.value}</p>
              <p className="mt-2 text-sm text-muted">{s.use}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-6">
          {ramps.map((r) => (
            <div key={r.name} data-reveal>
              <p className="eyebrow text-muted">{r.name}</p>
              <div className="mt-3 flex overflow-hidden border border-line">
                {r.steps.map(([k, hex]) => (
                  <div key={k} className="flex h-20 flex-1 flex-col justify-end p-2" style={{ background: hex }}>
                    <span
                      className="font-mono text-[0.65rem]"
                      style={{ color: ["100", "200", "300"].includes(k) || (r.name === "Signal" && k !== "700") ? "#0a0b0d" : "#eceef0" }}
                    >
                      {k}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="theme-paper mt-10 p-6 md:p-8" data-reveal>
          <p className="eyebrow text-muted">.theme-paper — light section variant</p>
          <p className="mt-4 font-display text-display-sm">Same tokens, bone surface.</p>
          <p className="mt-3 max-w-xl text-muted">
            Any section can flip to the light theme with one class — components read semantic tokens, so nothing else changes.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="sm">Primary</Button>
            <Button size="sm" variant="secondary">
              Secondary
            </Button>
          </div>
        </div>
      </Block>

      {/* Type */}
      <Block id="type" index="02" title="Typography">
        <div className="grid">
          {typeScale.map((t) => (
            <div key={t.token} className="grid gap-3 border-b border-line py-7 first:pt-0 md:grid-cols-[13rem_1fr] md:gap-8" data-reveal>
              <div>
                <p className="font-mono text-xs text-accent-text">text-{t.token}</p>
                <p className="mt-1.5 font-mono text-[0.7rem] leading-relaxed text-muted">{t.spec}</p>
              </div>
              <p className={t.token.startsWith("display") ? `font-display ${t.cls}` : t.cls}>
                {t.sample}
              </p>
            </div>
          ))}
          <div className="grid gap-3 py-7 md:grid-cols-[13rem_1fr] md:gap-8" data-reveal>
            <div>
              <p className="font-mono text-xs text-accent-text">eyebrow / mono</p>
              <p className="mt-1.5 font-mono text-[0.7rem] text-muted">JetBrains Mono · 12px · +16% · caps</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Eyebrow index="03">Platform bodies</Eyebrow>
              <SpecChip label="Width" value={`96" OD`} />
              <SpecChip label="Floor" value="10 GA" />
              <SpecChip label="Warranty" value="3 YR" />
            </div>
          </div>
        </div>
      </Block>

      {/* Shape */}
      <Block id="shape" index="03" title="Shape, space & elevation">
        <div className="grid gap-10 md:grid-cols-2">
          <div data-reveal>
            <p className="eyebrow text-muted">Radius</p>
            <div className="mt-4 flex flex-wrap gap-4">
              {[
                ["xs", "2px"],
                ["sm", "4px"],
                ["md", "8px"],
                ["lg", "14px"],
              ].map(([k, v]) => (
                <div key={k} className="grid gap-2 text-center">
                  <div className="size-16 border border-line-strong bg-surface" style={{ borderRadius: v }} />
                  <span className="font-mono text-[0.7rem] text-muted">{k}</span>
                </div>
              ))}
              <div className="grid gap-2 text-center">
                <div className="chamfer size-16 bg-accent [--cut:14px]" />
                <span className="font-mono text-[0.7rem] text-accent-text">chamfer</span>
              </div>
            </div>
            <p className="eyebrow mt-10 text-muted">Elevation</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="grid h-24 place-items-center border border-line bg-surface shadow-lift font-mono text-xs text-muted">shadow-lift</div>
              <div className="grid h-24 place-items-center bg-surface shadow-glow font-mono text-xs text-muted">shadow-glow</div>
            </div>
          </div>
          <div data-reveal>
            <p className="eyebrow text-muted">Spacing (4px grid)</p>
            <div className="mt-4 grid gap-2.5">
              {spacing.map((s) => (
                <div key={s} className="flex items-center gap-4">
                  <span className="w-10 font-mono text-[0.7rem] text-muted">{s}</span>
                  <span className="h-2.5 bg-accent/80" style={{ width: s * 2.4 }} />
                </div>
              ))}
              <div className="flex items-center gap-4">
                <span className="w-10 font-mono text-[0.7rem] text-muted">sect.</span>
                <span className="font-mono text-[0.7rem] text-fg">py-section · clamp(88px, 3.5rem + 8vw, 176px)</span>
              </div>
            </div>
          </div>
        </div>
      </Block>

      {/* Buttons */}
      <Block id="buttons" index="04" title="Buttons">
        <div className="grid gap-8">
          <div className="flex flex-wrap items-center gap-3" data-reveal>
            <Button size="lg" magnetic>
              Request a Quote
            </Button>
            <Button size="lg" variant="secondary">
              Become a Dealer
            </Button>
            <Button size="lg" variant="ghost">
              View specs
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3" data-reveal>
            <Button>Medium</Button>
            <Button size="sm">Small</Button>
            <Button variant="secondary" leading={<Icons.Phone />} icon={false}>
              610-273-0157
            </Button>
            <Button variant="secondary" size="sm" icon={<Icons.Download />}>
              Spec sheet (PDF)
            </Button>
          </div>
          <p className="max-w-xl text-sm text-muted" data-reveal>
            All buttons ≥ 44px tall. Primary carries graphite ink on signal orange (6.3:1). Hover floods the plate from below with a transform-only fill; the arrow swaps diagonally. <span className="text-fg">Magnetic</span> applies to mouse input on capable devices only.
          </p>
        </div>
      </Block>

      {/* Forms */}
      <Block id="forms" index="05" title="Form controls">
        <form className="grid gap-6 md:grid-cols-2" action="#">
          <Field id="sg-name" label="Dealer / company" required>
            <Input id="sg-name" placeholder="Acme Truck Equipment" autoComplete="organization" />
          </Field>
          <Field id="sg-email" label="Email" required error="Enter a valid email address">
            <Input id="sg-email" type="email" defaultValue="sales@" aria-invalid="true" aria-describedby="sg-email-error" />
          </Field>
          <Field id="sg-length" label="Body length" hint="Standard lengths shown — custom sizes available">
            <Select id="sg-length" defaultValue="">
              <option value="" disabled>
                Select a length
              </option>
              <option>9&apos;3&quot;</option>
              <option>10&apos;6&quot;</option>
              <option>11&apos;3&quot;</option>
              <option>12&apos;6&quot;</option>
            </Select>
          </Field>
          <Field id="sg-qty" label="Quantity">
            <Input id="sg-qty" type="number" inputMode="numeric" min={1} defaultValue={2} />
          </Field>
          <fieldset className="grid gap-3 md:col-span-2">
            <legend className="eyebrow mb-3 text-muted">Body type</legend>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {bodies.map((b, i) => (
                <Choice key={b.key} name="sg-body" value={b.key} label={b.name} description={b.specs[0].value} defaultChecked={i === 0} />
              ))}
            </div>
          </fieldset>
          <Field id="sg-notes" label="Notes" className="md:col-span-2">
            <Textarea id="sg-notes" placeholder="Hoist type, tarp kit, hitch, paint color…" />
          </Field>
          <div className="md:col-span-2">
            <Choice type="checkbox" name="sg-consent" label="Send me a copy of this request" description="We'll email a confirmation with your reference number." />
          </div>
        </form>
      </Block>

      {/* Cards */}
      <Block id="cards" index="06" title="Cards & data">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {bodies.slice(0, 3).map((b) => (
            <ProductCard
              key={b.key}
              slug={b.key}
              href={b.href}
              index={b.index}
              title={b.name}
              summary={b.note}
              media={
                <div className="grid size-full place-items-center bg-[radial-gradient(circle_at_60%_40%,#1a1e23,#0f1114)] p-6 text-steel-400">
                  <BodyGlyph body={b.key} detailed />
                </div>
              }
              meta={b.specs.map((s) => (
                <SpecChip key={s.label} label={s.label} value={s.value} />
              ))}
            />
          ))}
        </div>
        <dl className="mt-10 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
          {[
            { k: "Year warranty", v: <Counter to={3} /> },
            { k: "Max chipper capacity", v: <Counter to={25} suffix=" yd³" /> },
            { k: "Longest platform", v: <Counter to={26.5} decimals={1} suffix=" ft" /> },
            { k: "Standard width", v: <Counter to={96} suffix=" in" /> },
          ].map(({ k, v }) => (
            <div key={k} className="flex flex-col-reverse bg-bg p-5 md:p-6">
              <dt className="eyebrow mt-3 text-[0.65rem] text-muted">{k}</dt>
              <dd className="font-display text-display-sm">{v}</dd>
            </div>
          ))}
        </dl>
      </Block>

      {/* Motion */}
      <Block id="motion" index="07" title="Motion">
        <div className="grid gap-12">
          <div>
            <p className="eyebrow text-muted">Split-word reveal (scroll)</p>
            <p className="mt-4 text-display-md">
              <SplitText text="Short lead times. Full delivery service. Bodies in stock." />
            </p>
          </div>
          <div>
            <p className="eyebrow text-muted">Cursor states — hover each</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { c: "view", l: "View", t: "view" },
                { c: "drag", l: "Drag", t: "drag" },
                { c: "link", l: "", t: "link" },
              ].map((s) => (
                <div
                  key={s.c}
                  data-cursor={s.c}
                  data-cursor-label={s.l || undefined}
                  className="grid h-32 place-items-center border border-dashed border-line-strong font-mono text-xs text-muted transition-colors hover:bg-surface"
                >
                  data-cursor=&quot;{s.t}&quot;
                </div>
              ))}
            </div>
          </div>
          <div className="grid items-center gap-6 md:grid-cols-[auto_1fr]">
            <div className="grid size-36 place-items-center border border-line bg-surface text-fg">
              <LogoMark className="size-24" />
            </div>
            <p className="max-w-lg text-sm text-muted">
              <span className="text-fg">Logo morph.</span> The mark is a dump body on a chassis rail. Hover the header logo (or navigate between pages) and the body hoists — an SVG path morph around the rear hinge. The burger icon, section dividers, hero plates and the truck blueprint use the same identical-structure path technique.
            </p>
          </div>
          <div>
            <p className="eyebrow text-muted">Divider morph</p>
            <div className="-mx-[var(--gutter)] mt-6">
              <MorphDivider index="08" label="Section divider" />
            </div>
          </div>
        </div>
      </Block>

      {/* Icons */}
      <Block id="icons" index="08" title="Iconography">
        <ul className="grid grid-cols-4 gap-px border border-line bg-line sm:grid-cols-6 md:grid-cols-9">
          {Object.entries(Icons).map(([name, Icon]) => (
            <li key={name} className="grid aspect-square place-items-center gap-1 bg-bg p-2 text-fg">
              <Icon className="size-6" />
              <span className="font-mono text-[0.6rem] text-muted">{name}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Marquee items={["Space Grotesk", "Inter Tight", "JetBrains Mono", "Signal #FF5B14", "Graphite #0A0B0D"]} />
      <div className="h-section" />
    </PageTransition>
  );
}
