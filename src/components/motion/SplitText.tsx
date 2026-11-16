import { Fragment, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Staggered word-mask text reveal. Server-renderable (no hooks).
 *
 *  trigger="load" → pure CSS animation on first paint (use above the fold;
 *                   keeps LCP fast because nothing waits for hydration)
 *  trigger="view" → revealed by <RevealObserver> when scrolled into view
 *
 * Pass `lines` to control line breaks explicitly (each line can carry its
 * own className, e.g. an accent gradient), or `text` for a single run.
 */
type Line = string | { text: string; className?: string };

export function SplitText({
  text,
  lines,
  trigger = "view",
  delay = 0,
  stagger,
  className,
}: {
  text?: string;
  lines?: Line[];
  trigger?: "load" | "view";
  delay?: number;
  stagger?: number;
  className?: string;
}) {
  const source: Line[] = lines ?? [text ?? ""];
  const normalized = source.map((l) => (typeof l === "string" ? { text: l } : l));

  // Running word index (offset per line) so the stagger flows across lines.
  const wordLists = normalized.map((l) => l.text.split(" ").filter(Boolean));
  const offsets = wordLists.map((_, li) =>
    wordLists.slice(0, li).reduce((sum, w) => sum + w.length, 0),
  );
  const rendered: ReactNode[] = normalized.map((line, li) => {
    const words = wordLists[li];
    return (
      <span key={li} className={cn("split-line", line.className)}>
        {words.map((word, wi) => {
          const i = offsets[li] + wi;
          return (
            <Fragment key={wi}>
              <span className="split-word">
                <span className="split-inner" style={{ "--i": i } as CSSProperties}>
                  {word}
                </span>
              </span>
              {wi < words.length - 1 ? " " : null}
            </Fragment>
          );
        })}
      </span>
    );
  });

  const style = {
    "--d": `${delay}ms`,
    ...(stagger ? { "--stagger": `${stagger}ms` } : {}),
  } as CSSProperties;

  return (
    <span data-split={trigger} className={cn("block", className)} style={style}>
      {rendered}
    </span>
  );
}
