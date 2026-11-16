import { ViewTransition, type ReactNode } from "react";

/**
 * Wrap each page's content (NOT the layout — layouts persist, so their
 * enter/exit never fire). Route navigations are React transitions, so the
 * browser's View Transitions API animates old → new page, while named
 * shared elements (product media/titles) morph independently.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
