"use client";

import { useSearchParams } from "next/navigation";

const LABELS: Record<string, string> = {
  body: "Body",
  length: "Length",
  sides: "Sides",
  bulkhead: "Bulkhead",
  color: "Paint",
  options: "Options",
};

/** Shows the configuration handed over from the configurator / product pages. */
export function CarriedConfig() {
  const params = useSearchParams();
  const entries = Object.keys(LABELS)
    .map((k) => [k, params.get(k)] as const)
    .filter(([, v]) => v);
  if (!entries.length) return null;
  return (
    <div className="mt-6 border border-accent/60 bg-[rgb(255_91_20/0.06)] p-5">
      <p className="eyebrow text-accent-text">Carried over from your configuration</p>
      <dl className="mt-4 grid gap-2 text-sm">
        {entries.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 border-b border-line pb-2 last:border-0">
            <dt className="text-muted">{LABELS[k]}</dt>
            <dd className="text-right capitalize">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
