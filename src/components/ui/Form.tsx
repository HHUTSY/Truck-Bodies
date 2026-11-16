import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Accessible form primitives. Labels are always visible (no placeholder-
 * only labels), errors are linked via aria-describedby, controls are
 * 52px tall with 16px text (no iOS zoom).
 */
export function Field({
  id,
  label,
  hint,
  error,
  required,
  className,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("grid content-start gap-2.5", className)}>
      <label htmlFor={id} className="eyebrow text-muted">
        {label}
        {required && (
          <span className="text-accent-text" aria-hidden>
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn("field-control", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn("field-control min-h-36 resize-y", className)} {...props} />;
}

export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <select className={cn("field-control", className)} {...props}>
      {children}
    </select>
  );
}

/** Large tappable radio/checkbox "chip" — used for body type, material, etc. */
export function Choice({
  type = "radio",
  label,
  description,
  className,
  ...props
}: Omit<ComponentProps<"input">, "type"> & {
  type?: "radio" | "checkbox";
  label: string;
  description?: string;
}) {
  return (
    <label
      className={cn(
        "group/choice relative flex min-h-14 cursor-pointer items-start gap-3 border border-line-strong p-4 transition-colors",
        "hover:border-[rgb(236_238_240/0.32)] has-[:checked]:border-accent has-[:checked]:bg-[rgb(255_91_20/0.07)]",
        "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus",
        className,
      )}
    >
      <input type={type} className="peer sr-only" {...props} />
      <span
        aria-hidden
        className={cn(
          "mt-0.5 grid size-5 shrink-0 place-items-center border border-line-strong transition-colors",
          type === "radio" ? "rounded-full" : "rounded-xs",
          "peer-checked:border-accent peer-checked:bg-accent",
        )}
      >
        <span className={cn("size-2 bg-accent-ink", type === "radio" ? "rounded-full" : "")} />
      </span>
      <span className="grid gap-1">
        <span className="font-medium leading-tight">{label}</span>
        {description && <span className="text-sm text-muted">{description}</span>}
      </span>
    </label>
  );
}
