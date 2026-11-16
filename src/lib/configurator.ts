import type { BodyKey } from "@/lib/bodies";

/**
 * Configurator model + parametric body geometry.
 * Paths are generated with the SAME command structure as lib/bodies.ts
 * (8-point outline, 3-segment ribs, 1-segment rail) so the preview can morph
 * between body types AND resize smoothly.
 */

export const PX_PER_IN = 2.86;
const FLOOR = 352;
const X0 = 456;
const X_MAX = 1068;

export type ConfigOption = { value: string; label: string };

export const configBodies: {
  key: BodyKey;
  name: string;
  lengths: string[];
  heightLabel: string;
  heights: number[]; // inches
  defaultHeight: number;
  options: string[];
}[] = [
  {
    key: "dump",
    name: "Dump",
    lengths: [`9'3"`, `10'6"`, `11'3"`, `12'6"`],
    heightLabel: "Side height",
    heights: [12, 16, 20, 24, 30, 36],
    defaultHeight: 16,
    options: ["Electric hoist", "PTO hoist", "Manual tarp", "12V tarp", "Metering chute", "Underbody toolboxes"],
  },
  {
    key: "landscape",
    name: "Landscape",
    lengths: [`9'6"`, `11'6"`, `12'6"`, `14'6"`, `16'6"`],
    heightLabel: "Side height",
    heights: [42, 48],
    defaultHeight: 42,
    options: ["Electric hoist", "Removable chipper top", "Rope / tarp hooks", "Lift gate", "Drop light apron"],
  },
  {
    key: "platform",
    name: "Platform",
    lengths: [`8'6"`, `10'6"`, `12'6"`, `14'6"`, `16'6"`, `18'6"`, `20'6"`, `22'6"`, `24'6"`, `26'6"`],
    heightLabel: "Bulkhead",
    heights: [42, 48, 54, 60],
    defaultHeight: 48,
    options: ["Stake racks", "Wood floor", "Dump hoist", "Lift gate", "Triple-window bulkhead"],
  },
  {
    key: "chipper",
    name: "Chipper",
    lengths: [`12'`, `14'`, `16'`],
    heightLabel: "Body height",
    heights: [66, 72],
    defaultHeight: 72,
    options: ["Ladder rack", "Pruner storage", "L-pack toolboxes", "PTO hoist", "B-pack cutout"],
  },
];

export const paintColors: { value: string; label: string; hex: string }[] = [
  { value: "black", label: "Black (standard)", hex: "#16181b" },
  { value: "white", label: "White", hex: "#e9e8e4" },
  { value: "signal", label: "Signal Orange", hex: "#ff5b14" },
  { value: "red", label: "Fleet Red", hex: "#b3201b" },
  { value: "yellow", label: "Highway Yellow", hex: "#f2b705" },
  { value: "blue", label: "Utility Blue", hex: "#1d4f91" },
  { value: "green", label: "Forest Green", hex: "#2f5d3a" },
  { value: "gray", label: "Gunmetal Gray", hex: "#5b6168" },
];

/** feet'inches" → inches */
export function parseLength(l: string) {
  const m = l.match(/(\d+)'(?:(\d+)")?/);
  return m ? Number(m[1]) * 12 + Number(m[2] ?? 0) : 0;
}

export function bodyGeometry(key: BodyKey, lengthIdx: number, lengthCount: number, heightIn: number) {
  // Length → rear x (the drawing compresses, it isn't to scale: 78% → 100% of the bed)
  const t = lengthCount > 1 ? lengthIdx / (lengthCount - 1) : 1;
  const x1 = Math.round(X0 + (X_MAX - X0) * (0.78 + 0.22 * t));
  const mid = Math.round((X0 + x1) / 2);
  const r = (f: number) => Math.round(512 + (x1 - 22 - 512) * f);
  const ribX = [r(0.28), r(0.6), r(0.92)];
  const h = Math.round(heightIn * PX_PER_IN);

  switch (key) {
    case "dump": {
      const top = FLOOR - h;
      return {
        top: 150,
        rear: x1,
        outline: `M456 150 L512 150 L512 ${top} L${x1 - 22} ${top} L${x1} ${top - 18} L${x1} ${FLOOR} L${mid} ${FLOOR} L456 ${FLOOR} Z`,
        ribs: ribX.map((x) => `M${x} ${top} L${x} ${FLOOR}`).join(" "),
        rail: `M512 ${top + 10} L${x1 - 22} ${top + 10}`,
      };
    }
    case "landscape": {
      const top = FLOOR - h;
      return {
        top: top - 15,
        rear: x1,
        outline: `M456 ${top - 15} L512 ${top - 15} L512 ${top} L${x1 - 22} ${top} L${x1} ${top} L${x1} ${FLOOR} L${mid} ${FLOOR} L456 ${FLOOR} Z`,
        ribs: ribX.map((x) => `M${x} ${top} L${x} ${FLOOR}`).join(" "),
        rail: `M512 ${top + 13} L${x1 - 22} ${top + 13}`,
      };
    }
    case "platform": {
      const bulk = FLOOR - h;
      const rack = FLOOR - Math.round(42 * PX_PER_IN);
      return {
        top: bulk,
        rear: x1,
        outline: `M456 ${bulk} L476 ${bulk} L476 335 L${x1 - 22} 335 L${x1} 335 L${x1} ${FLOOR} L${mid} ${FLOOR} L456 ${FLOOR} Z`,
        ribs: ribX.map((x) => `M${x} ${rack} L${x} 335`).join(" "),
        rail: `M476 ${rack} L${x1 - 22} ${rack}`,
      };
    }
    case "chipper": {
      const top = FLOOR - h;
      return {
        top,
        rear: x1,
        outline: `M456 ${top + 18} L512 ${top + 6} L${mid} ${top} L${x1 - 22} ${top + 6} L${x1} ${top + 18} L${x1} ${FLOOR} L${mid} ${FLOOR} L456 ${FLOOR} Z`,
        ribs: ribX.map((x) => `M${x} ${top + 3} L${x} ${FLOOR}`).join(" "),
        rail: `M512 ${top + 18} L${x1 - 22} ${top + 18}`,
      };
    }
  }
}

/** Relative luminance → choose readable detail stroke over the paint */
export function isLight(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 140;
}
