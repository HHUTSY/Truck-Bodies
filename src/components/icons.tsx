import type { SVGProps } from "react";

/** Minimal 1.5px-stroke icon set (inline, tree-shakeable, no icon-font). */
type IconProps = SVGProps<SVGSVGElement> & { size?: number | string };

function base({ size = "1em", ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "square" as const,
    strokeLinejoin: "miter" as const,
    "aria-hidden": true,
    focusable: false,
    ...props,
  };
}

export const ArrowUpRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);
export const ArrowRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);
export const ArrowDown = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 4v15M6 13l6 6 6-6" />
  </svg>
);
export const ArrowUp = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 20V5M6 11l6-6 6 6" />
  </svg>
);
export const Phone = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" />
  </svg>
);
export const Mail = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 5h18v14H3zM3 6l9 7 9-7" />
  </svg>
);
export const MapPin = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);
export const Download = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 4v11M7 10l5 5 5-5M4 20h16" />
  </svg>
);
export const Plus = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const Check = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
export const Close = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const ChevronDown = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
export const Upload = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 16V5M7 10l5-5 5 5M4 20h16" />
  </svg>
);
export const Shield = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3 4 6v6c0 4.5 3.4 8.2 8 9 4.6-.8 8-4.5 8-9V6l-8-3Z" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </svg>
);
export const Truck = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M2 6h11v10H2zM13 9h4l4 4v3h-8" />
    <circle cx="6" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </svg>
);
export const Clock = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5l3 2" />
  </svg>
);
export const Ruler = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 16 16 3l5 5L8 21l-5-5ZM7 12l2 2M10 9l2 2M13 6l2 2" />
  </svg>
);
export const SprayCan = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M8 9h7v12H8zM10 9V6h3v3M17 4h.01M20 6h.01M20 2h.01M17 8h.01" />
  </svg>
);
export const Play = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 4.5v15l13-7.5-13-7.5Z" />
  </svg>
);
