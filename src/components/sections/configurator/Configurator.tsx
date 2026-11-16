"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowUpRight, Check } from "@/components/icons";
import { CAB_DETAILS, CAB_PATH, CAB_WINDOW, FLOOR_Y, WHEELS, WHEEL_Y, type BodyKey } from "@/lib/bodies";
import { bodyGeometry, configBodies, isLight, paintColors } from "@/lib/configurator";
import { quoteHref } from "@/lib/site";
import { cn } from "@/lib/cn";

const MORPH = { duration: 0.9, ease: [0.83, 0, 0.17, 1] as const };

/**
 * PRODUCT CONFIGURATOR (bonus)
 * Pick body type → length → side/bulkhead height → paint → options and the
 * blueprint preview morphs live (shared path structure = smooth `d` tweens,
 * CSS fill transition for paint). The configuration lives in the URL so it
 * is shareable, and "Send to quote" pre-fills the quote form (step 3).
 */
export function Configurator() {
  const params = useSearchParams();
  const initialBody = (configBodies.find((b) => b.key === params.get("body"))?.key ?? "dump") as BodyKey;

  const [body, setBody] = useState<BodyKey>(initialBody);
  const def = configBodies.find((b) => b.key === body)!;
  const [lengthIdx, setLengthIdx] = useState(1);
  const [height, setHeight] = useState(def.defaultHeight);
  const [color, setColor] = useState(paintColors[0].value);
  const [customHex, setCustomHex] = useState("#2a6f97");
  const [options, setOptions] = useState<string[]>([]);

  const safeLengthIdx = Math.min(lengthIdx, def.lengths.length - 1);
  const safeHeight = def.heights.includes(height) ? height : def.defaultHeight;
  const geo = useMemo(() => bodyGeometry(body, safeLengthIdx, def.lengths.length, safeHeight), [body, safeLengthIdx, def.lengths.length, safeHeight]);
  const paint = color === "custom" ? { label: `Custom ${customHex.toUpperCase()}`, hex: customHex } : paintColors.find((c) => c.value === color)!;
  const light = isLight(paint.hex);

  function chooseBody(k: BodyKey) {
    const next = configBodies.find((b) => b.key === k)!;
    setBody(k);
    setHeight(next.defaultHeight);
    setLengthIdx(Math.min(1, next.lengths.length - 1));
    setOptions([]);
    history.replaceState(null, "", `?body=${k}`);
  }
  const toggleOption = (o: string) => setOptions((cur) => (cur.includes(o) ? cur.filter((x) => x !== o) : [...cur, o]));

  const length = def.lengths[safeLengthIdx];
  const quoteUrl =
    `${quoteHref}?` +
    new URLSearchParams({
      body,
      length,
      [def.heightLabel.toLowerCase().includes("bulkhead") ? "bulkhead" : "sides"]: `${safeHeight}"`,
      color: paint.label,
      ...(options.length ? { options: options.join(", ") } : {}),
    }).toString();

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
      {/* ---------------- Preview ---------------- */}
      <div className="lg:col-span-7">
        <div className="sticky top-[calc(var(--header-h)+1rem)]">
          <div className="relative overflow-hidden border border-line bg-[radial-gradient(ellipse_at_55%_45%,#1a1e23,#0b0c0e_75%)]">
            <div aria-hidden className="bg-blueprint absolute inset-0 opacity-50" />
            <svg viewBox="40 60 1140 450" className="relative h-auto w-full" role="img" aria-label={`${def.name} body, ${length}, ${safeHeight}-inch, painted ${paint.label}`}>
              <defs>
                <linearGradient id="cfg-sheen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
                  <stop offset="0.45" stopColor="#fff" stopOpacity="0.04" />
                  <stop offset="1" stopColor="#000" stopOpacity="0.25" />
                </linearGradient>
              </defs>
              {/* ground */}
              <line x1="40" x2="1180" y1="470" y2="470" stroke="var(--line-strong)" vectorEffect="non-scaling-stroke" />
              <ellipse cx="610" cy="472" rx="520" ry="10" fill="#000" opacity="0.45" />
              {/* chassis + cab */}
              <g fill="none" stroke="var(--fg-muted)" strokeWidth={1.25}>
                <path d={CAB_PATH} fill="#1b1f24" vectorEffect="non-scaling-stroke" />
                <path d={CAB_WINDOW} fill="#0b0c0e" vectorEffect="non-scaling-stroke" />
                <path d={CAB_DETAILS} vectorEffect="non-scaling-stroke" opacity={0.6} />
                <rect x={140} y={FLOOR_Y} width={940} height={18} fill="#111316" vectorEffect="non-scaling-stroke" />
                {WHEELS.map((cx) => (
                  <g key={cx}>
                    <circle cx={cx} cy={WHEEL_Y} r={50} fill="#0b0c0e" vectorEffect="non-scaling-stroke" />
                    <circle cx={cx} cy={WHEEL_Y} r={31} fill="#22272d" vectorEffect="non-scaling-stroke" />
                    <circle cx={cx} cy={WHEEL_Y} r={8} vectorEffect="non-scaling-stroke" />
                  </g>
                ))}
              </g>
              {/* body */}
              <motion.path
                initial={false}
                animate={{ d: geo.outline }}
                transition={MORPH}
                style={{ fill: paint.hex, transition: "fill 600ms cubic-bezier(0.16,1,0.3,1)" }}
                stroke={light ? "#0a0b0d" : "#eceef0"}
                strokeOpacity={0.55}
                strokeWidth={1.5}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              <motion.path initial={false} animate={{ d: geo.outline }} transition={MORPH} fill="url(#cfg-sheen)" />
              <motion.path
                initial={false}
                animate={{ d: geo.ribs }}
                transition={MORPH}
                fill="none"
                stroke={light ? "#0a0b0d" : "#eceef0"}
                strokeOpacity={0.35}
                strokeWidth={1.25}
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                initial={false}
                animate={{ d: geo.rail }}
                transition={MORPH}
                fill="none"
                stroke={light ? "#0a0b0d" : "#eceef0"}
                strokeOpacity={0.4}
                strokeDasharray="5 6"
                vectorEffect="non-scaling-stroke"
              />
              {/* dimension: length */}
              <g stroke="var(--accent)" strokeWidth={1} vectorEffect="non-scaling-stroke">
                <motion.line initial={false} x1={456} y1={92} animate={{ x2: geo.rear }} y2={92} transition={MORPH} vectorEffect="non-scaling-stroke" />
                <line x1={456} x2={456} y1={82} y2={102} vectorEffect="non-scaling-stroke" />
                <motion.line initial={false} y1={82} y2={102} animate={{ x1: geo.rear, x2: geo.rear }} transition={MORPH} vectorEffect="non-scaling-stroke" />
              </g>
            </svg>

            {/* HTML labels */}
            <div className="pointer-events-none absolute inset-x-0 top-3 flex justify-center">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={`${body}-${length}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="bg-bg px-2 font-mono text-xs tracking-wider text-accent-text"
                >
                  L {length}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">
              <span>
                SH / {def.name} · {safeHeight}&quot; {def.heightLabel.toLowerCase()}
              </span>
              <span className="flex items-center gap-2">
                <span className="size-3 border border-line-strong" style={{ background: paint.hex }} />
                {paint.label}
              </span>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted">Illustrative preview — not to scale. Final dimensions are confirmed on your quote.</p>
        </div>
      </div>

      {/* ---------------- Controls ---------------- */}
      <div className="grid content-start gap-8 lg:col-span-5">
        <fieldset>
          <legend className="eyebrow text-muted">
            <span className="text-accent-text">01</span> · Body type
          </legend>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {configBodies.map((b) => (
              <label
                key={b.key}
                className={cn(
                  "flex min-h-14 cursor-pointer items-center justify-between gap-3 border px-4 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus",
                  body === b.key ? "border-accent bg-[rgb(255_91_20/0.08)]" : "border-line-strong hover:border-fg",
                )}
              >
                <input type="radio" name="cfg-body" value={b.key} checked={body === b.key} onChange={() => chooseBody(b.key)} className="sr-only" />
                <span className="font-medium">{b.name}</span>
                {body === b.key && <Check className="size-4 text-accent-text" />}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="eyebrow text-muted">
            <span className="text-accent-text">02</span> · Length
          </legend>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {def.lengths.map((l, i) => (
              <label
                key={l}
                className={cn(
                  "grid min-h-11 min-w-16 cursor-pointer place-items-center border px-3 font-mono text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-focus",
                  safeLengthIdx === i ? "border-accent bg-accent text-accent-ink" : "border-line-strong hover:border-fg",
                )}
              >
                <input type="radio" name="cfg-length" checked={safeLengthIdx === i} onChange={() => setLengthIdx(i)} className="sr-only" />
                {l}
              </label>
            ))}
            <span className="grid min-h-11 place-items-center px-2 text-xs text-muted">+ custom sizes</span>
          </div>
        </fieldset>

        <fieldset>
          <legend className="eyebrow text-muted">
            <span className="text-accent-text">03</span> · {def.heightLabel}
          </legend>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {def.heights.map((h) => (
              <label
                key={h}
                className={cn(
                  "grid min-h-11 min-w-16 cursor-pointer place-items-center border px-3 font-mono text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-focus",
                  safeHeight === h ? "border-accent bg-accent text-accent-ink" : "border-line-strong hover:border-fg",
                )}
              >
                <input type="radio" name="cfg-height" checked={safeHeight === h} onChange={() => setHeight(h)} className="sr-only" />
                {h}&quot;
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="eyebrow text-muted">
            <span className="text-accent-text">04</span> · Paint — in-house, any color
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {paintColors.map((c) => (
              <label key={c.value} title={c.label} className="relative cursor-pointer has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus">
                <input type="radio" name="cfg-color" checked={color === c.value} onChange={() => setColor(c.value)} className="sr-only" />
                <span className="sr-only">{c.label}</span>
                <span
                  aria-hidden
                  className={cn("block size-11 border-2 transition-transform", color === c.value ? "scale-110 border-fg" : "border-line-strong hover:scale-105")}
                  style={{ background: c.hex }}
                />
              </label>
            ))}
            <label className="flex h-11 cursor-pointer items-center gap-2 border border-line-strong px-3 text-sm has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-focus">
              <input
                type="color"
                value={customHex}
                onChange={(e) => {
                  setCustomHex(e.target.value);
                  setColor("custom");
                }}
                className="size-6 cursor-pointer border-0 bg-transparent p-0"
                aria-label="Custom color"
              />
              Custom
            </label>
          </div>
          <p className="mt-2 text-sm text-muted">{paint.label}</p>
        </fieldset>

        <fieldset>
          <legend className="eyebrow text-muted">
            <span className="text-accent-text">05</span> · Options
          </legend>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {def.options.map((o) => {
              const on = options.includes(o);
              return (
                <button
                  key={o}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleOption(o)}
                  className={cn(
                    "flex min-h-11 items-center gap-2 border px-3 text-sm transition-colors",
                    on ? "border-accent text-fg" : "border-line-strong text-steel-300 hover:border-fg",
                  )}
                >
                  <span className={cn("grid size-4 place-items-center border", on ? "border-accent bg-accent text-accent-ink" : "border-line-strong")}>
                    {on && <Check className="size-3" />}
                  </span>
                  {o}
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Summary */}
        <div className="border border-line bg-surface p-5 md:p-6">
          <p className="eyebrow text-muted">Your configuration</p>
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            {[
              ["Body", def.name],
              ["Length", length],
              [def.heightLabel, `${safeHeight}"`],
              ["Paint", paint.label],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">{k}</dt>
                <dd className="mt-0.5">{v}</dd>
              </div>
            ))}
            {options.length > 0 && (
              <div className="col-span-2">
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">Options</dt>
                <dd className="mt-0.5">{options.join(" · ")}</dd>
              </div>
            )}
          </dl>
          <Link href={quoteUrl} className="btn btn-primary mt-6 h-14 w-full px-6 [--cut:11px]">
            <span aria-hidden className="btn-plate" />
            <span>Send to quote</span>
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
