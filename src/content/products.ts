import type { BodyKey } from "@/lib/bodies";

/**
 * Product catalogue — transcribed from the current shtruckbodies.com pages.
 * Static for now; step 4 moves this into the CMS (same shape).
 * Numbers are exactly as published. Values that look like typos on the old
 * site are kept but flagged `TODO(client)`.
 */

export type SpecTable = {
  caption: string;
  columns: string[];
  rows: string[][];
  notes?: string[];
};

export type SpecGroup = { title: string; items: string[] };

export type Variant = {
  id: string;
  name: string;
  summary: string;
  image: string;
  imageAlt: string;
  shownWith?: string[];
  installOptions?: string[];
  standard: SpecGroup[];
  options?: string[];
  tables?: SpecTable[];
  notes?: string[];
};

export type Product = {
  slug: string;
  key: BodyKey;
  index: string;
  name: string;
  shortName: string;
  tagline: string;
  intro: string;
  hero: string;
  heroAlt: string;
  highlights: { label: string; value: string }[];
  variants: Variant[];
  gallery: { id: string; alt: string }[];
  videos: string[];
  related: string[];
  seo: { title: string; description: string };
};

const BASE = "/standard-truck-bodies";
export const productHref = (slug: string) => `${BASE}/${slug}`;

export const products: Product[] = [
  /* ------------------------------------------------------------ DUMP */
  {
    slug: "dump-truck-bodies",
    key: "dump",
    index: "01",
    name: "Dump Truck Bodies",
    shortName: "Dump",
    tagline: "Mason, Super Duty, Appalachian and pickup dumps — built for the daily grind.",
    intro:
      "From 8'8\" pickup dumps to 12' Super Duty bodies with 36\" sides, every SH dump body rides on structural channel long sills, is primed and painted in-house, and is ready for the hoist, tarp and hitch package your customer needs.",
    hero: "mason-dump-body",
    heroAlt: "Red SH mason dump body with cab shield on a white Ford chassis",
    highlights: [
      { label: "Lengths", value: `8'8" – 12'6"` },
      { label: "Sides", value: `12" – 36"` },
      { label: "Capacity", value: "up to 9.61 yd³" },
      { label: "Width", value: `96" OD` },
    ],
    variants: [
      {
        id: "mason-contractor",
        name: "Mason / Contractor",
        summary: "The everyday workhorse — 9'3\" to 12'6\" with 12\", 16\" or 20\" sides.",
        image: "mason-dump-body",
        imageAlt: "SH mason / contractor dump body, side view",
        shownWith: [
          "9' mason dump body",
          '36" cab shield',
          "Electric hoist",
          "ICC bar",
          "Pintle / ball combo hitch",
          "Backup alarm",
          "Trailer connector",
          "Poly wheel fenders",
          "Aluminum-wrapped side boards",
          "Aluminum underbody toolboxes",
          "Manual tarp kit with pull bar",
          "Coal chute",
        ],
        installOptions: [
          "Scissor electric or PTO dump hoist",
          "Telescopic electric hoist with compact dog box",
          "Rear hitch plate or hitch receiver",
          "Underbody toolboxes",
          "Backup alarms",
          "ICC bar",
          "Brake controllers",
          "Trailer connectors",
          "Load tarps — manual or 12V",
        ],
        standard: [
          {
            title: "Body",
            items: [
              '6" × 8.2 lb structural channel long sills',
              '3" structural channel cross members, 12" o.c.',
              "10 ga. steel floor formed with inner side wall",
              "12 ga. outer wall sides, box-formed top",
              "V-formed outside wall with two vertical braces",
              '18" cab shield (various heights available)',
              'Rear posts 6" above sides',
              "LED light kit (FMVSS108)",
              '12", 16" or 20" sides',
              '96" outside width · 86 3/4" inside',
              "Primed and painted black (other colors available)",
            ],
          },
          {
            title: "Tailgate",
            items: [
              "10 ga. steel",
              "Fully boxed frame with two 12 ga. vertical posts",
              'Standard height 6" above sides',
              "Fully double-acting",
              "Bottom release lever at driver's side",
              "Upper quick-release screw pin",
              "Spreader chains and banjo-eye chain holders",
            ],
          },
        ],
        options: [
          '7" × 14" tailgate metering chute',
          '36" or 48" cab shield',
          "Custom sizes",
          "Electric or PTO hoists",
          "Manual or 12V tarps",
          "Telescopic electric hoist with compact dog box",
        ],
        tables: [
          {
            caption: "Sizes, approximate weight & capacity",
            columns: ["Length", '12" sides', '16" sides', '20" sides'],
            rows: [
              // TODO(client): 765 lb for 9'3" × 12" is as published — likely a typo (1,765?).
              [`9'3"`, "765 lb · 2–3 yd³", "1,825 lb · 3–4 yd³", "1,922 lb · 4–5 yd³"],
              [`10'6"`, "1,947 lb · 2–3 yd³", "2,006 lb · 3–4 yd³", "2,119 lb · 4–5 yd³"],
              [`11'3"`, "2,005 lb · 3–4 yd³", "2,076 lb · 4–5 yd³", "2,193 lb · 5–6 yd³"],
              [`12'6"`, "2,187 lb · 3–4 yd³", "2,235 lb · 4–5 yd³", "2,361 lb · 5–6 yd³"],
            ],
            notes: ['Tailgate adds 3" to overall length.'],
          },
        ],
      },
      {
        id: "super-duty",
        name: "Super Duty",
        summary: "7 ga. floor and walls, 24\"–36\" sides and up to 9.61 yd³ for the heaviest hauling.",
        image: "super-duty-truck-bodies-transparent",
        imageAlt: "SH Super Duty dump body with tall sides and cab shield",
        shownWith: [
          `12' Super Duty dump body, 36" sides`,
          "Standard cab shield",
          "Tailgate metering chute",
          "Hydraulic front-mount telescopic hoist",
          '3/4" pintle hitch plate',
          "2-rung retractable bolt-on truck step",
          "ICC bar",
          "Spreader apron",
          "Steel underbody toolbox 18 × 18 × 36",
          '2 5/16" combo pintle hitch',
          "Backup alarm",
          "Brake controller",
          "Trailer connector",
          "Pull-style spring-return tarp kit",
        ],
        installOptions: [
          "Electric or PTO hoist",
          "Rear hitch plate or receiver",
          "Underbody toolboxes",
          "Backup alarms",
          "ICC bar",
          "Brake controllers",
          "Trailer connectors",
          "Manual or 12V tarps",
        ],
        standard: [
          {
            title: "Body",
            items: [
              '7" × 9.8 lb structural channel long sills',
              '4" structural channel cross members, 12" o.c.',
              "7 ga. steel floor",
              "7 ga. side walls with boxed tubing top rail and 10 ga. vertical braces",
              '18" cab shield',
              'Rear posts 10" above sides',
              "LED light kit (FMVSS108)",
              '24", 30" or 36" sides',
              '96" outside width · 86 1/2" inside',
              "Primed and painted black",
            ],
          },
          {
            title: "Tailgate",
            items: [
              "7 ga. steel",
              "Fully boxed frame with two 10 ga. horizontal and two 10 ga. vertical braces",
              'Standard height 10" above sides',
              "Top pivot, bolt-in pin style",
              "Bottom dump latch, release lever at driver's side",
              "Spreader chains and banjo-eye chain holders",
            ],
          },
        ],
        options: [
          '12 3/8" × 13 1/2" tailgate metering chute',
          '36" or 48" cab shield',
          "Custom sizes",
          "Electric or PTO hoists",
          "Manual or 12V tarps",
          "Spreader apron",
        ],
        tables: [
          {
            caption: "Sizes, approximate weight & capacity",
            columns: ["Length", '24" sides', '30" sides', '36" sides'],
            rows: [
              [`10'`, "2,805 lb · 5.33 yd³", "2,958 lb · 6.67 yd³", "3,082 lb · 8.00 yd³"],
              [`11'`, "2,986 lb · 5.87 yd³", "3,152 lb · 7.34 yd³", "3,318 lb · 8.81 yd³"],
              [`12'`, "3,179 lb · 6.40 yd³", "3,350 lb · 8.00 yd³", "3,528 lb · 9.61 yd³"],
            ],
            notes: ['Tailgate adds 3" to overall length.'],
          },
        ],
      },
      {
        id: "appalachian",
        name: "Appalachian",
        summary: "Board-pocket rear posts and a 3/16\" aluminum tailgate — shown with optional wood sides.",
        image: "appalacian-dump-body-trans",
        imageAlt: "SH Appalachian dump body with wood side boards and aluminum tailgate",
        standard: [
          {
            title: "Body",
            items: [
              '6" × 8.2 lb structural channel long sills',
              '3" cross members, 12" o.c.',
              "7 ga. steel floor",
              "12 ga. outer walls",
              '36" cab shield',
              'Rear posts 6" above sides with tall rear board pockets',
              "LED light kit (FMVSS108)",
              '12", 16" or 20" sides',
              '96" outside width · 86 3/4" inside',
              "Primed and painted black",
            ],
          },
          {
            title: "Aluminum tailgate",
            items: [
              '3/16" aluminum',
              "Fully boxed frame with two vertical posts",
              '6" above sides',
              "Fully double-acting",
              "Spreader chains and banjo-eye chain holders",
            ],
          },
        ],
        options: [
          "Custom sizes and configurations",
          "Electric or PTO hoists",
          "Manual or 12V tarps",
          "Telescopic electric hoist with compact dog box",
        ],
        tables: [
          {
            caption: "Approximate weight",
            columns: ["Length", '12" sides', '16" sides', '20" sides'],
            rows: [
              [`9'3"`, "1,954 lb", "1,999 lb", "2,099 lb"],
              [`11'3"`, "2,207 lb", "2,289 lb", "2,411 lb"],
            ],
            notes: ['Tailgate adds 3" to overall length.'],
          },
        ],
      },
      {
        id: "pickup",
        name: "Pickup Dump",
        summary: "8'8\" SRW and DRW bodies for 56\" CA box-delete chassis with a 5-ton telescopic hoist.",
        image: "26925-102324-613-rt8",
        imageAlt: "SH pickup dump body on a red crew-cab pickup",
        shownWith: [
          `8'8" SRW pickup dump body`,
          "Electric telescopic hoist",
          "ICC bar",
          '2" hitch receiver',
          "Backup alarm",
          "Trailer connector",
          "Aluminum tailgate",
          "Manual tarp kit with pull bar",
        ],
        installOptions: [
          "Electric telescopic hoist",
          "Rear hitch plate or receiver",
          "Underbody toolboxes",
          "Backup alarms",
          "ICC bar",
          "Brake controllers",
          "Trailer connectors",
          "Manual tarps",
        ],
        standard: [
          {
            title: "Body",
            items: [
              '41" bulkhead',
              "LED light kit — S/T/T and reverse (1 per side), marker & clearance",
              '5" × 6.7 lb structural channel long sills',
              '3" formed channel 12 ga. crossmembers, 12" o.c.',
              "12 ga. steel floor formed with inner side wall",
              "12 ga. outer walls with box-formed top",
              'Front and rear posts 6" above sides with sideboard brackets',
              '12" or 16" sides',
              'SRW 81" outside / 71 3/4" inside · DRW 96" outside / 86 3/4" inside',
              "Primed with black urethane top coat (other colors available)",
            ],
          },
          {
            title: "Hoist & subframe",
            items: [
              '100" angle subframe for 2019+ Ford box-delete 56" CA chassis',
              'Front-mount telescopic cylinder — 78" stroke, 47° dump angle',
              "5-ton hoist and subframe",
              "Single-acting 12V power unit",
              'Mounts on most 56" CA box-delete chassis (with modifications)',
            ],
          },
          {
            title: "Aluminum tailgate",
            items: ['3/16" aluminum', "Fully boxed, 2 vertical braces", '6" above sides', "Double acting", "Spreader chains"],
          },
        ],
        options: ["Fold-down sides", "No tarp kit", "Tapered bulkhead instead of cab shield"],
        tables: [
          {
            caption: "Sizes, weight & payload",
            columns: ["Body", "Sides", "Weight", "Payload", "Capacity"],
            rows: [
              [`8'8" SRW`, '12"', "1,610 lb", "1.3 tons¹", "1.9 yd³"],
              [`8'8" DRW`, '12"', "1,710 lb", "2.5 tons²", "2.3 yd³"],
              [`8'8" SRW`, '16"', "1,630 lb", "1.3 tons¹", "2.5 yd³"],
              [`8'8" DRW`, '16"', "1,740 lb", "2.5 tons²", "3.1 yd³"],
            ],
            notes: [
              "¹ Based on Ford F-350 SRW box-delete (11,000 GVW). ² Based on Ford F-350 DRW box-delete (14,000 GVW).",
              "True payload must be determined after the truck is weighed.",
            ],
          },
        ],
        notes: [
          "May require the chassis OEM box-delete harness and backup camera kit; the dealer may need to reprogram the truck.",
        ],
      },
    ],
    gallery: [
      { id: "img-0420", alt: "Mason dump body with aluminum toolboxes on a white chassis" },
      { id: "img-0424", alt: "Dump body raised, showing the smooth steel floor" },
      { id: "228042z5", alt: "Black dump body in the raised position on a Ram chassis" },
      { id: "g-018d8f12c1", alt: "SH dump body on a Ford F-750 tractor" },
      { id: "img-0336-2", alt: "Dump body tipped with tailgate open" },
      { id: "20220930-135303", alt: "Custom pink painted dump body on a Ram chassis" },
      { id: "super-duty-dump-bodies-2", alt: "Super Duty dump body with front-mount telescopic hoist" },
      { id: "metering-chute", alt: "Tailgate metering chute detail" },
      { id: "26925-101022-069", alt: "Double-acting tailgate latch and chain detail" },
      { id: "20240603-30711-8", alt: "Dump body with snow plow at a dealer lot" },
    ],
    videos: ["Gw0UYMfWwBA", "wpdKQK-qOEA"],
    related: ["landscape-truck-bodies", "platform-truck-bodies"],
    seo: {
      title: "Dump Truck Bodies — Mason, Super Duty, Appalachian & Pickup",
      description:
        "Wholesale dump truck bodies from SH Truck Bodies: mason/contractor, Super Duty, Appalachian and pickup dumps. 12\"–36\" sides, up to 9.61 yd³, LED FMVSS108 lighting.",
    },
  },

  /* ------------------------------------------------------- LANDSCAPE */
  {
    slug: "landscape-truck-bodies",
    key: "landscape",
    index: "02",
    name: "Landscape Truck Bodies",
    shortName: "Landscape",
    tagline: "Landscape and trash bodies with tall sides, barn doors and a 50\" curbside door.",
    intro:
      "Tall 42\" or 48\" weld-on sides, barn-door tailgates and a curbside door make SH landscape bodies the go-to for mulch, debris and trash work — with an optional removable chipper top when the job calls for it.",
    hero: "landscape-body",
    heroAlt: "SH landscape / trash body with tall sides and curbside door",
    highlights: [
      { label: "Lengths", value: `9'6" – 16'6"` },
      { label: "Sides", value: `42" / 48"` },
      { label: "Width", value: `95 1/2" OD` },
      { label: "Curbside door", value: `50"` },
    ],
    variants: [
      {
        id: "landscape-trash",
        name: "Landscape / Trash",
        summary: "Weld-on 42\" or 48\" sides, barn doors with dual cam latches and a 50\" curbside door.",
        image: "landscape-body",
        imageAlt: "SH landscape body, three-quarter rear view",
        shownWith: [
          `9' body, 36" cab shield`,
          '42" sides with curbside door',
          "Electric hoist",
          '3/4" pintle hitch plate',
          "Brake controller",
          "ICC bar",
          "8-ton pintle combo hitch",
          "Backup alarm",
          "Manual tarp kit",
        ],
        installOptions: [
          "Scissor electric or PTO hoist",
          "Telescopic electric hoist with compact dog box",
          "Rear hitch plate or receiver",
          "Underbody toolboxes",
          "Backup alarms",
          "Brake controller",
          "Trailer connectors",
          "Manual or 12V tarps",
          "ICC bars",
          "Lift gates",
        ],
        standard: [
          {
            title: "Body",
            items: [
              '7" × 9.8 lb structural channel long sills',
              '3" 10 ga. formed channel cross members, 12" o.c.',
              '4" channel rear rail',
              "10 ga. smooth steel floor with formed side rails",
              '42" or 48" weld-on bulkhead and sides',
              "10 ga. formed steel sides with box tubing top rail",
              '95 1/2" outside width · 89 1/2" inside',
              "Primed and painted black",
            ],
          },
          {
            title: "Doors & lighting",
            items: [
              "Barn-door tailgates with dual cam latch",
              '50" curbside door with dual cam latch',
              "12 ga. formed steel door with box tubing frame",
              '3/4" LED marker & clearance kit (FMVSS108) with harness',
            ],
          },
        ],
        options: [
          'Full rear 10" drop light apron (2 oval S/T/T, 1 reverse per side, marker, clearance & license lights)',
          '18", 36" or 48" cab shield',
          '18" bottom dump-through tailgate with top barn doors',
          "Rope / tarp hooks both sides",
          "Manual or 12V tarps",
          'Super Duty version — 7 ga. floor, 3" structural cross members, 7 ga. side walls',
          '30" rear barn doors (recommended with chipper top)',
          "Telescopic electric hoist",
          "Custom sizes",
        ],
        tables: [
          {
            caption: "Sizes & approximate weight",
            columns: ["Outside length", "Approx. weight"],
            rows: [
              [`9'6"`, "2,015 lb"],
              [`11'6"`, "2,295 lb"],
              [`12'6"`, "2,435 lb"],
              [`14'6"`, "2,737 lb"],
              [`16'6"`, "3,025 lb"],
            ],
            notes: ['Rear hinge and latch add 2 1/2".', 'Inside length is about 5 1/2" less than outside length.'],
          },
        ],
      },
      {
        id: "chipper-top",
        name: "Removable Chipper Top",
        summary: "Pin-on mesh top that turns a landscape body into a chip hauler in minutes.",
        image: "chipper-top-trans",
        imageAlt: "Removable expanded-mesh chipper top mounted on an SH landscape body",
        standard: [
          {
            title: "Construction",
            items: [
              '30" high standard, 96" wide',
              '89 1/4" inside width',
              'Attached with 3/4" pins through 3 × 1 tube and 3/4" pipes',
              '3/4" #9 expanded mesh screening in every panel',
              "14 ga. sheet metal",
              "Primed and painted black",
            ],
          },
        ],
        options: [
          '26" overhang for backpack toolbox',
          "Top ladder rack with access steps and grab handle",
          "Custom width and length",
          "Inside rubberized coating",
        ],
        tables: [
          {
            caption: "Chipper top weights",
            columns: ["Outside length", "Approx. weight"],
            rows: [
              [`8'6"`, "581 lb"],
              [`9'6"`, "647 lb"],
              [`10'6"`, "680 lb"],
              [`11'6"`, "763 lb"],
              [`12'6"`, "824 lb"],
              [`14'6"`, "931 lb"],
              [`16'6"`, "1,032 lb"],
            ],
          },
        ],
      },
    ],
    gallery: [
      { id: "1lb3000", alt: "SH 1LB3000 landscape body on a white cab-chassis" },
      { id: "20210413-134013-resized-1", alt: "Black landscape body on a white truck" },
      { id: "dscf1436", alt: "Landscape body with tall steel sides" },
      { id: "dscf0625", alt: "Landscape body installed on a medium-duty chassis" },
      { id: "dsc01386", alt: "Finished landscape body before installation" },
      { id: "trash-body-cab-shield", alt: "Trash body with cab shield" },
      { id: "new-dump-taigate", alt: "Barn-door tailgate on a new landscape body" },
      { id: "img-0011", alt: "Landscape body with rack sides on a dealer lot" },
    ],
    videos: ["TLP8YqTWzkk"],
    related: ["chipper-forestry-bodies", "dump-truck-bodies"],
    seo: {
      title: "Landscape & Trash Truck Bodies",
      description:
        "SH landscape / trash truck bodies: 42\" or 48\" sides, barn-door tailgates, 50\" curbside door and an optional removable chipper top. 9'6\"–16'6\" lengths.",
    },
  },

  /* -------------------------------------------------------- PLATFORM */
  {
    slug: "platform-truck-bodies",
    key: "platform",
    index: "03",
    name: "Platform Truck Bodies",
    shortName: "Platform",
    tagline: "Standard and Super Duty stake bodies, plus CPB contractor platforms.",
    intro:
      "From 7'6\" contractor platforms for pickups to 26'6\" Super Duty stake bodies, SH platforms are built on structural channel sills with heavy-duty stake pockets and your choice of steel, pine, apitong or tread-plate floor.",
    hero: "platform-body",
    heroAlt: "SH stake platform body with stake racks and bulkhead window",
    highlights: [
      { label: "Lengths", value: `7'6" – 26'6"` },
      { label: "Bulkhead", value: `37" – 60"` },
      { label: "Width", value: `96" / 102"` },
      { label: "Floors", value: "Steel · Pine · Apitong" },
    ],
    variants: [
      {
        id: "standard-platform",
        name: "Standard Platform / Stake",
        summary: "8'6\" to 26'6\" with 42\" stake racks, steel or KDAT pine floor.",
        image: "platform-body",
        imageAlt: "SH standard stake body with 42-inch stake racks",
        shownWith: [`16' body, steel floor`, "Window in bulkhead", "Stake racks", '2" hitch receiver', "ICC bar", "Trailer connector"],
        installOptions: [
          "Rear hitch plate or receiver",
          "Underbody toolboxes",
          "Electric or PTO dump hoist",
          "Backup alarm",
          "Brake controller",
          "Trailer connector",
          "Manual or 12V tarps",
          "ICC bars",
          "Lift gates",
        ],
        standard: [
          {
            title: "Body",
            items: [
              '42" or 48" weld-on bulkhead with screened window (54" or 60" available)',
              'Long sills: 8\'6"–14\'6" 6" × 8.2 lb · 16\'6"–20\'6" 7" × 9.8 lb · 22\'6"–26\'6" 8" × 11.5 lb',
              '3" structural cross members, 12" o.c.',
              '4" formed 3/16" channel rear rail with inset stake pockets',
              "10 ga. smooth steel or shiplapped KDAT pine floor",
              "10 ga. formed side rails",
              '3/16" heavy-duty exterior stake pockets with 3/8" × 2" rub rail',
              '96" overall width standard (102" optional)',
              '3/4" LED marker & clearance kit (FMVSS108) with harness',
              "Primed and painted black",
            ],
          },
          {
            title: "Stake racks",
            items: [
              '42" high, 4 slat',
              "11 ga. reinforced hat stakes, 16 ga. roll-formed slats",
              "Spring-loaded latch",
              "Optional rear swing-out racks",
              "49 lb per 4' section",
            ],
          },
        ],
        options: [
          "Apitong hardwood, tread plate or anti-slip painted floor",
          'Full rear 10" drop light apron',
          '18", 36" or 48" cab shield',
          "Custom sizes",
          "Triple window in bulkhead",
        ],
        tables: [
          {
            caption: "Approximate weight by floor",
            columns: ["Overall length", "Steel floor", "Wood floor"],
            rows: [
              [`8'6"`, "1,161 lb", "1,116 lb"],
              [`9'6"`, "1,266 lb", "1,212 lb"],
              [`10'6"`, "1,370 lb", "1,307 lb"],
              [`12'6"`, "1,575 lb", "1,496 lb"],
              [`14'6"`, "1,782 lb", "1,687 lb"],
              [`16'6"`, "2,039 lb", "1,927 lb"],
              [`18'6"`, "2,252 lb", "2,124 lb"],
              [`20'6"`, "2,464 lb", "2,319 lb"],
              [`22'6"`, "2,751 lb", "2,590 lb"],
              [`24'6"`, "2,972 lb", "2,794 lb"],
              [`26'6"`, "3,192 lb", "2,998 lb"],
            ],
            notes: ['Length includes 3" bulkhead and rear stake pockets.'],
          },
        ],
      },
      {
        id: "super-duty-platform",
        name: "Super Duty Platform / Stake",
        summary: "7 ga. floor and 6\" structural rails — 12'6\" to 26'6\".",
        image: "super-duty-platform-bodies",
        imageAlt: "SH Super Duty platform body on a tandem-axle chassis",
        shownWith: [`24' body`, "ICC bar", "Backup alarm", "Twin telescopic underbody hoist"],
        standard: [
          {
            title: "Body",
            items: [
              '48" weld-on bulkhead with screened window (54" and 60" available)',
              'Long sills: 12\'6"–18\'6" 7" × 9.8 lb · 20\'6"–26\'6" 8" × 11.5 lb',
              '4" structural cross members, 12" o.c.',
              '6" structural channel rear and side rails',
              "7 ga. smooth steel floor",
              '3/16" exterior stake pockets with 3/8" × 3" rub rail on sides and rear',
              '96" width (102" optional)',
              '3/4" LED marker & clearance kit (FMVSS108)',
              "Primed and painted black",
            ],
          },
        ],
        options: [
          "Shiplapped pine, apitong, tread plate or anti-slip floor",
          '10" drop light apron',
          "Cab shield",
          "Custom sizes",
          "Triple window bulkhead",
        ],
        tables: [
          {
            caption: "Approximate weight by floor",
            columns: ["Overall length", "Steel floor", "Wood floor"],
            rows: [
              [`12'6"`, "2,262 lb", "1,971 lb"],
              [`14'6"`, "2,556 lb", "2,210 lb"],
              [`16'6"`, "2,844 lb", "2,447 lb"],
              [`18'6"`, "3,134 lb", "2,684 lb"],
              [`20'6"`, "3,510 lb", "2,994 lb"],
              [`22'6"`, "3,797 lb", "3,241 lb"],
              [`24'6"`, "4,095 lb", "3,484 lb"],
              [`26'6"`, "4,395 lb", "3,733 lb"],
            ],
          },
        ],
      },
      {
        id: "cpb1000",
        name: "CPB1000 Contractor Platform",
        summary: "Diamond-plate contractor platform for 2019+ Ford, Ram and GM pickups.",
        image: "26925-011725-006-rt8",
        imageAlt: "SH CPB1000 contractor platform body on a white pickup",
        standard: [
          {
            title: "Body",
            items: [
              '5" formed channel long sills',
              '3" formed 12 ga. cross members, 12" o.c.',
              "12 ga. diamond plate floor with formed side rails",
              '3/16" exterior stake pockets with 1/4" × 2" tie rail on both sides and rear',
              "Fuel-fill cutout in driver's side rail",
              '37" or 39" tapered bulkhead with screen window and top cutout for cab stop light',
              'LED kit — 6" oval S/T/T and reverse in apron and bulkhead, 3/4" marker/clearance, license light (FMVSS108)',
              "Chassis-specific brackets for 2019+ Ford, Ram and GMC",
              "Primed and painted black",
            ],
          },
        ],
        options: ["Gooseneck access / hitch", "Toolbox packages", "Fold-down sides and tailgate", "Lift-out and ladder racks"],
        tables: [
          {
            caption: "Approximate weight by body length",
            columns: ["Width", `7'6"`, `8'10"`, `9'6"`, `12'`],
            rows: [
              ['84" single wheel', "890 lb", "982 lb", "1,025 lb", "—"],
              ['96" dual wheel', "959 lb", "1,059 lb", "1,106 lb", "1,276 lb"],
            ],
            notes: ["12' available on cab-chassis only."],
          },
        ],
        notes: ['Cab-chassis version: 4" structural long sills, no fuel cutout unless requested, no mounting kit.'],
      },
      {
        id: "cpb2000",
        name: "CPB2000 Contractor Platform",
        summary: "Gooseneck-ready: recessed D-rings and tapered rear corners for trailer clearance.",
        image: "26925-121724-685-rt8",
        imageAlt: "SH CPB2000 contractor platform with tapered rear corners on a red Ford",
        standard: [
          {
            title: "Body",
            items: [
              '5" formed channel long sills',
              '3" formed 12 ga. cross members, 12" o.c.',
              "12 ga. diamond plate floor with formed side rails",
              "Recessed D-rings on each side",
              "Fuel-fill cutout on driver's side",
              "Tapered rear corners for gooseneck trailer clearance",
              '37" or 39" tapered bulkhead with screen window and top cutout',
              "LED kit (FMVSS108)",
              "Chassis-specific brackets for 2019+ Ford, Ram and GMC",
              "Primed and painted black",
            ],
          },
        ],
        options: ["Gooseneck access / hitch", "Toolbox packages", "Fold-down sides and tailgate", "Lift-out and ladder racks"],
        tables: [
          {
            caption: "Approximate weight by body length",
            columns: ["Width", `7'6"`, `8'10"`, `9'6"`, `12'`],
            rows: [
              ['80" single wheel', "890 lb", "982 lb", "1,025 lb", "—"],
              ['92" dual wheel', "959 lb", "1,059 lb", "1,106 lb", "1,276 lb"],
            ],
            notes: ["12' available on cab-chassis only."],
          },
        ],
      },
    ],
    gallery: [
      { id: "20180824-080857", alt: "Stake body with racks on a Ford at a truck equipment dealer" },
      { id: "20240510-30649-5", alt: "Stake body with lift gate at a dealer" },
      { id: "26925-012422-042", alt: "Stake body on a cab-over chassis" },
      { id: "dscf1422", alt: "Stake body with 42-inch racks" },
      { id: "pb9600-4272-or4273-installed-7", alt: "PB9600 platform body installed" },
      { id: "img-0344", alt: "Wood-floor platform body raised on a dump hoist" },
      { id: "img-0348", alt: "Rear view of a wood-floor platform with bulkhead window" },
      { id: "26925-091223-132", alt: "Platform dump body tipped on a red chassis" },
      { id: "26925-040925-063-rt8", alt: "Contractor platform on a red crew-cab pickup" },
      { id: "standard-platform-body-2", alt: "Standard platform body with bulkhead, studio view" },
    ],
    videos: ["h0otNX6hwnI"],
    related: ["dump-truck-bodies", "chipper-forestry-bodies"],
    seo: {
      title: "Platform & Stake Truck Bodies — Standard, Super Duty, CPB",
      description:
        "SH platform and stake bodies: standard and Super Duty stake bodies from 8'6\" to 26'6\", and CPB1000/CPB2000 contractor platforms for 2019+ Ford, Ram and GM pickups.",
    },
  },

  /* --------------------------------------------------------- CHIPPER */
  {
    slug: "chipper-forestry-bodies",
    key: "chipper",
    index: "04",
    name: "Chipper & Forestry Bodies",
    shortName: "Chipper",
    tagline: "The CB3000 — 17 to 25 yd³ of chip capacity with a rubberized interior.",
    intro:
      "Built for tree crews: 66\" or 72\" sides with a tapered vented roof, 30\" rear barn doors and a black rubberized chip-protection coating on the floor, sides and top. Add ladder racks, pruner storage and L-pack toolboxes.",
    hero: "cb3000-a",
    heroAlt: "SH CB3000 white chipper / forestry body with ladder rack",
    highlights: [
      { label: "Lengths", value: `12' – 16'` },
      { label: "Height", value: `66" / 72"` },
      { label: "Capacity", value: "17 – 25 yd³" },
      { label: "Interior", value: "Rubberized" },
    ],
    variants: [
      {
        id: "cb3000",
        name: "CB3000 Chipper / Forestry",
        summary: "Tapered vented roof, roof bows and chip-protection coating as standard.",
        image: "cb3000-a",
        imageAlt: "SH CB3000 chipper body, three-quarter view",
        shownWith: [
          "14' body with L-pack toolboxes",
          "PTO hydraulic hoist",
          "Ladder roof rack with side access ladder",
          "Inside ladder / pruner box",
          '3/4" pintle hitch plate',
          "ICC bar",
          "8-ton pintle combo hitch",
          "Backup alarm",
        ],
        installOptions: [
          "Rear hitch plate or receiver",
          "Underbody toolboxes",
          "Electric or PTO dump hoist",
          "Backup alarm",
          "Brake controller",
          "Trailer connectors",
          "ICC bars",
        ],
        standard: [
          {
            title: "Body",
            items: [
              '66" or 72" high sides including tapered roof top with vents in sidewall',
              '30" high rear barn doors with dual cam latch',
              '7" × 9.8 lb structural channel long sills',
              '3" 10 ga. formed cross members, 12" o.c.',
              '4" × 5.4 lb channel rear rail',
              "10 ga. smooth steel floor with formed side rails",
              "14 ga. formed steel roof with roof bows",
              '95 1/2" outside width · 89 1/2" inside',
            ],
          },
          {
            title: "Finish & lighting",
            items: [
              "Painted white over primer with urethane top coat (other colors available)",
              "Black rubberized chip-protection coating on floor, sides and top",
              'LED kit — 6" oval S/T/T and reverse in apron and roof channel, 3/4" marker & clearance, harness (FMVSS108)',
            ],
          },
        ],
        options: [
          "Front cutout for B-pack toolbox overhang",
          "Bolt-on three-piece ladder rack with curbside ladder roller",
          '17" × 69" ladder with two-rung flip-down section (66" body)',
          '17" × 75" ladder (72" body)',
          "Curbside ladder storage compartment with pruner shelf",
        ],
        tables: [
          {
            caption: "Capacity",
            columns: ["Outside W × L × H", "Approx. weight", "Capacity"],
            rows: [
              [`96" × 12' × 66"`, "3,161 lb", "17 yd³"],
              [`96" × 14' × 72"`, "3,492 lb", "22 yd³"],
              [`96" × 16' × 72"`, "3,871 lb", "25 yd³"],
            ],
            notes: ['Length includes 3" bulkhead and rear stake pockets.'],
          },
        ],
      },
    ],
    gallery: [
      { id: "cb3000-c", alt: "CB3000 chipper body with rear barn doors open" },
      { id: "cb3000-b", alt: "CB3000 chipper body rear view" },
      { id: "dsc01350", alt: "White chipper / forestry body on a medium-duty truck" },
      { id: "chipper-top-trans", alt: "Removable chipper top on a landscape body" },
    ],
    videos: [],
    related: ["landscape-truck-bodies", "dump-truck-bodies"],
    seo: {
      title: "Chipper & Forestry Truck Bodies — CB3000",
      description:
        "SH CB3000 chipper / forestry bodies: 12'–16', 66\" or 72\" high, 17–25 yd³ capacity, rubberized chip-protection interior, ladder racks and pruner storage.",
    },
  },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);

export const customExamples = [
  {
    id: "example-1",
    title: "Toolbox & ladder-rack body",
    image: "custom-truck-body-example-1",
    alt: "Custom grey body with top-mounted toolboxes, ladder rack and spare tire holder",
    features: [
      "Custom top-mounted toolboxes",
      "Ladder rack",
      "Broom & shovel storage pockets",
      "Spare tire holder",
      "Lift-out tailgate",
    ],
  },
  {
    id: "example-2",
    title: "Beavertail with fold-down ramp",
    image: "use-for-page-25",
    alt: "Red custom beavertail body with fold-down ramp and expanded-metal bulkhead",
    features: ["Beavertail with fold-down ramp", "Fold-down sides", "Expanded-metal bulkhead with lockable toolbox"],
  },
  {
    id: "example-3",
    title: "Heavy platform with winch track",
    image: "mass-dot-complete-2824-or-2825-5",
    alt: "Yellow municipal truck with custom platform body, lift-out side posts and crane",
    features: [
      "Custom lift-out side posts with board pockets",
      "Steel floor overlay on wood",
      "Winch track with winches and straps",
    ],
  },
];

export const customShownWith = [
  "Backpack toolbox with built-on cab shield",
  "Dump-style tailgate",
  "Solid wood stake racks",
  "Tarp shield",
];
