/**
 * Side-elevation geometry for the body "blueprints".
 *
 * All outlines share the SAME command structure (8 points + Z) and all
 * detail paths share the same segment count — that is what lets the SVG
 * `d` attribute morph smoothly between body types (hero, configurator,
 * mega-menu glyphs).
 *
 * Coordinate space: viewBox 0 0 1200 500. Frame top (body floor) = y 352,
 * body spans x 456 → 1068. Scale ≈ 2.86 units per inch.
 */

export type BodyKey = "dump" | "landscape" | "platform" | "chipper";

export type BodyShape = {
  key: BodyKey;
  index: string;
  name: string;
  href: string;
  /** Outer silhouette */
  outline: string;
  /** Vertical braces / posts / stakes / roof bows */
  ribs: string;
  /** Top rail / stake-rack rail / roof edge */
  rail: string;
  /** Highest y of the body (for the height dimension line) */
  top: number;
  /** Label for the vertical dimension line */
  height: string;
  specs: { label: string; value: string }[];
  note: string;
};

export const FLOOR_Y = 352;
export const BODY_X0 = 456;
export const BODY_X1 = 1068;

export const bodies: BodyShape[] = [
  {
    key: "dump",
    index: "01",
    name: "Dump Bodies",
    href: "/standard-truck-bodies/dump-truck-bodies",
    outline: "M456 150 L512 150 L512 286 L1046 286 L1068 268 L1068 352 L762 352 L456 352 Z",
    ribs: "M640 286 L640 352 M820 286 L820 352 M1000 286 L1000 352",
    rail: "M512 296 L1046 296",
    top: 150,
    height: `12" – 36" sides`,
    specs: [
      { label: "Lengths", value: `9'3" – 12'6"` },
      { label: "Sides", value: `12" – 36"` },
    ],
    note: "Mason · Super Duty · Appalachian · Pickup",
  },
  {
    key: "landscape",
    index: "02",
    name: "Landscape Bodies",
    href: "/standard-truck-bodies/landscape-truck-bodies",
    outline: "M456 200 L512 200 L512 215 L1046 215 L1068 215 L1068 352 L762 352 L456 352 Z",
    ribs: "M640 215 L640 352 M820 215 L820 352 M1000 215 L1000 352",
    rail: "M512 228 L1046 228",
    top: 200,
    height: `42" / 48" sides`,
    specs: [
      { label: "Lengths", value: `9'6" – 16'6"` },
      { label: "Sides", value: `42" / 48"` },
    ],
    note: `Barn doors · 50" curbside door · chipper top`,
  },
  {
    key: "platform",
    index: "03",
    name: "Platform Bodies",
    href: "/standard-truck-bodies/platform-truck-bodies",
    outline: "M456 212 L476 212 L476 335 L1046 335 L1068 335 L1068 352 L762 352 L456 352 Z",
    ribs: "M640 222 L640 335 M820 222 L820 335 M1000 222 L1000 335",
    rail: "M476 222 L1046 222",
    top: 212,
    height: `42" – 60" bulkhead`,
    specs: [
      { label: "Lengths", value: `8'6" – 26'6"` },
      { label: "Bulkhead", value: `42" – 60"` },
    ],
    note: "Steel or KDAT pine floor · stake racks",
  },
  {
    key: "chipper",
    index: "04",
    name: "Chipper & Forestry",
    href: "/standard-truck-bodies/chipper-forestry-bodies",
    outline: "M456 150 L512 138 L762 132 L1046 138 L1068 150 L1068 352 L762 352 L456 352 Z",
    ribs: "M640 134 L640 352 M820 135 L820 352 M1000 137 L1000 352",
    rail: "M512 150 L1046 150",
    top: 132,
    height: `66" / 72" high`,
    specs: [
      { label: "Lengths", value: `12' – 16'` },
      { label: "Capacity", value: "17 – 25 cu yd" },
    ],
    note: `66" / 72" high · rubberized chip coating`,
  },
];

export const bodyByKey = Object.fromEntries(bodies.map((b) => [b.key, b])) as Record<
  BodyKey,
  BodyShape
>;

/** Medium-duty conventional cab, side view, facing left. */
export const CAB_PATH =
  "M96 392 L96 318 L112 300 L120 246 L300 232 L350 140 L432 134 L440 150 L440 392 L312 392 A72 72 0 0 0 168 392 Z";
export const CAB_WINDOW = "M318 228 L356 154 L420 150 L424 228 Z";
export const CAB_DETAILS = "M300 240 L300 384 M398 252 L422 252 M100 278 L116 278 M100 290 L114 290";

export const WHEELS = [240, 900] as const;
export const WHEEL_Y = 420;
