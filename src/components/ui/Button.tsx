import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "@/components/icons";
import { Magnetic } from "@/components/motion/Magnetic";
import { cn } from "@/lib/cn";

/**
 * Button / link-button with the signature chamfered "cut plate" shape.
 *
 * - primary:   signal-orange plate, graphite ink; hover fill rises from below
 * - secondary: hairline plate; hover floods with foreground colour
 * - ghost:     text + arrow, animated underline
 *
 * Renders <Link> for internal hrefs, <a> for tel:/mailto:/external,
 * <button> otherwise. `magnetic` wraps it in the Magnetic spring.
 * Every size meets the 44px minimum touch target.
 */
type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
  /** Layout classes for the magnetic wrapper (e.g. "flex-1") — only used when `magnetic` */
  wrapperClassName?: string;
  /** Trailing icon; pass `false` to hide. Defaults to an arrow. */
  icon?: ReactNode | false;
  /** Leading icon */
  leading?: ReactNode;
  className?: string;
  children: ReactNode;
};

type AsLink = BaseProps &
  Omit<ComponentProps<"a">, "className" | "children" | "href"> & { href: string; prefetch?: boolean };
type AsButton = BaseProps &
  Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined };

const sizes: Record<Size, string> = {
  sm: "h-11 px-4 text-sm [--cut:7px]",
  md: "h-12 px-5 text-[0.95rem] [--cut:9px]",
  lg: "h-14 px-7 text-base [--cut:11px]",
};

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost px-0",
};

export function Button(props: AsLink | AsButton) {
  const {
    variant = "primary",
    size = "md",
    magnetic = false,
    wrapperClassName,
    icon,
    leading,
    className,
    children,
    ...rest
  } = props;

  const classes = cn("btn", sizes[size], variants[variant], className);
  const trailing =
    icon === false ? null : (
      <span className="btn-icon" aria-hidden>
        {icon ?? <ArrowUpRight />}
        {icon ?? <ArrowUpRight />}
      </span>
    );
  const inner = (
    <>
      {variant !== "ghost" && <span aria-hidden className="btn-plate" />}
      {leading && <span className="-ml-0.5 inline-flex text-[1.1em]">{leading}</span>}
      <span className={cn(variant === "ghost" && "link-underline")}>{children}</span>
      {trailing}
    </>
  );

  let el: ReactNode;
  if ("href" in rest && rest.href !== undefined) {
    const { href, prefetch, ...anchorRest } = rest as AsLink;
    const internal = href.startsWith("/") || href.startsWith("#");
    el = internal ? (
      <Link href={href} prefetch={prefetch} className={classes} {...anchorRest}>
        {inner}
      </Link>
    ) : (
      <a href={href} className={classes} {...anchorRest}>
        {inner}
      </a>
    );
  } else {
    const { type = "button", ...buttonRest } = rest as AsButton;
    el = (
      <button type={type} className={classes} {...buttonRest}>
        {inner}
      </button>
    );
  }

  return magnetic ? <Magnetic className={wrapperClassName}>{el}</Magnetic> : el;
}
