"use client";

import { Download } from "@/components/icons";

/** Opens the browser print dialog — "Save as PDF" produces the spec sheet. */
export function PrintButton({ label = "Download PDF" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="btn btn-primary h-12 px-5 [--cut:9px] print:hidden"
    >
      <span aria-hidden className="btn-plate" />
      <Download className="size-4" />
      <span>{label}</span>
    </button>
  );
}
