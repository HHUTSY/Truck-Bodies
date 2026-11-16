import type { CSSProperties, ElementType, ReactNode } from "react";
import { SplitText } from "@/components/motion/SplitText";
import { cn } from "@/lib/cn";

/** Max-width container with fluid gutters. */
export function Container({
  as: Tag = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={cn("container-site", className)}>{children}</Tag>;
}

/** Vertical rhythm + optional light "paper" theme. */
export function Section({
  id,
  theme = "dark",
  className,
  children,
  ...rest
}: {
  id?: string;
  theme?: "dark" | "paper";
  className?: string;
  children: ReactNode;
  "aria-labelledby"?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative py-section", theme === "paper" && "theme-paper", className)}
      {...rest}
    >
      {children}
    </section>
  );
}

/** Technical label: "[ 02 ] — PRODUCT RANGE" */
export function Eyebrow({
  index,
  children,
  className,
}: {
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("eyebrow flex items-center gap-3 text-muted", className)}>
      {index && (
        <span className="text-accent-text">
          [ {index} ]
        </span>
      )}
      <span aria-hidden className="h-px w-8 bg-line-strong" />
      <span>{children}</span>
    </p>
  );
}

/** Eyebrow + split-reveal heading + optional intro, aligned on the 12-col grid. */
export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  intro,
  as: Tag = "h2",
  size = "lg",
  className,
}: {
  id?: string;
  index?: string;
  eyebrow: string;
  title: string | string[];
  intro?: ReactNode;
  as?: ElementType;
  size?: "xl" | "lg" | "md";
  className?: string;
}) {
  const sizeClass = { xl: "text-display-xl", lg: "text-display-lg", md: "text-display-md" }[size];
  return (
    <div className={cn("grid gap-8 lg:grid-cols-12 lg:gap-6", className)}>
      <div className="lg:col-span-8">
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
        <Tag id={id} className={cn("mt-6", sizeClass)}>
          <SplitText lines={Array.isArray(title) ? title : undefined} text={Array.isArray(title) ? undefined : title} />
        </Tag>
      </div>
      {intro && (
        <div
          data-reveal
          style={{ "--d": "200ms" } as CSSProperties}
          className="text-lead text-muted lg:col-span-4 lg:self-end"
        >
          {intro}
        </div>
      )}
    </div>
  );
}

/** Small spec chip used on cards and tables */
export function SpecChip({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline gap-2 border border-line px-2.5 py-1.5", className)}>
      <span className="eyebrow text-[0.625rem] text-muted">{label}</span>
      <span className="font-mono text-xs text-fg">{value}</span>
    </span>
  );
}
