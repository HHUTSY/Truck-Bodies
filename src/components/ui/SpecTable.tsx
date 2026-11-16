import type { SpecTable as SpecTableData } from "@/content/products";
import { cn } from "@/lib/cn";

/**
 * Responsive spec table: scrolls horizontally on phones with a sticky first
 * column, keyboard-focusable scroll region, mono numerics.
 */
export function SpecTable({ table, className }: { table: SpecTableData; className?: string }) {
  return (
    <figure className={cn("grid gap-3", className)}>
      <figcaption className="eyebrow text-muted">{table.caption}</figcaption>
      <div
        role="region"
        aria-label={table.caption}
        tabIndex={0}
        className="no-scrollbar overflow-x-auto border border-line focus-visible:outline-offset-2"
        data-lenis-prevent-wheel
      >
        <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line-strong bg-surface">
              {table.columns.map((c, i) => (
                <th
                  key={c}
                  scope="col"
                  className={cn(
                    "whitespace-nowrap px-4 py-3 font-mono text-[0.7rem] font-normal uppercase tracking-[0.12em] text-muted",
                    i === 0 && "sticky left-0 z-[1] bg-surface",
                  )}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, r) => (
              <tr key={r} className="group/row border-b border-line last:border-b-0">
                {row.map((cell, i) =>
                  i === 0 ? (
                    <th
                      key={i}
                      scope="row"
                      className="sticky left-0 z-[1] whitespace-nowrap bg-bg px-4 py-3 font-mono text-[0.85rem] font-medium text-fg transition-colors group-hover/row:bg-surface"
                    >
                      {cell}
                    </th>
                  ) : (
                    <td
                      key={i}
                      className="whitespace-nowrap px-4 py-3 font-mono text-[0.8rem] tabular-nums text-steel-300 transition-colors group-hover/row:bg-surface group-hover/row:text-fg"
                    >
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.notes?.map((n) => (
        <p key={n} className="text-xs text-muted">
          {n}
        </p>
      ))}
    </figure>
  );
}
