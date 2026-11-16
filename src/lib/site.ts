/**
 * Single source of truth for company facts, navigation and contact data.
 * Everything here is verified from the current shtruckbodies.com site
 * unless marked `TODO(client)`.
 */

export const site = {
  name: "SH Truck Bodies",
  legalName: "SH Truck Bodies LLC",
  formerly: "Swampy Hollow Manufacturing",
  tagline: "Wholesale Truck Body Manufacturer",
  audience: "Exclusively for truck equipment distributors & upfitters",
  motto: "We work — for the work truck industry.",
  description:
    "SH Truck Bodies (formerly Swampy Hollow Manufacturing) builds dump, landscape, platform, chipper/forestry and custom truck bodies in Honey Brook, PA — sold wholesale to truck equipment distributors and upfitters.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.shtruckbodies.com",
  phone: { display: "610-273-0157", href: "tel:+16102730157", e164: "+1-610-273-0157" },
  fax: "610-273-3169",
  email: "info@shtruckbodies.com",
  address: {
    street: "16 Westbrooke Dr.",
    city: "Honey Brook",
    region: "PA",
    postalCode: "19344",
    country: "US",
  },
  /** Approximate — Honey Brook, PA. TODO(client): confirm exact plant coordinates. */
  geo: { lat: 40.0934, lng: -75.9113, label: "40.09° N / 75.91° W" },
  warrantyYears: 3,
  memberships: ["NTEA — The Association for the Work Truck Industry"],
} as const;

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  /** Silhouette used in menus/cards */
  glyph?: "dump" | "landscape" | "platform" | "chipper" | "custom";
};
export type NavGroup = { label: string; href?: string; children: NavLink[] };
export type NavItem = NavLink | NavGroup;

export const productNav: NavLink[] = [
  {
    label: "Dump Bodies",
    href: "/standard-truck-bodies/dump-truck-bodies",
    glyph: "dump",
    description: "Mason, Super Duty, Appalachian & pickup dumps",
  },
  {
    label: "Landscape Bodies",
    href: "/standard-truck-bodies/landscape-truck-bodies",
    glyph: "landscape",
    description: "Landscape / trash bodies & removable chipper tops",
  },
  {
    label: "Platform Bodies",
    href: "/standard-truck-bodies/platform-truck-bodies",
    glyph: "platform",
    description: "Standard & Super Duty stake, CPB contractor platforms",
  },
  {
    label: "Chipper & Forestry",
    href: "/standard-truck-bodies/chipper-forestry-bodies",
    glyph: "chipper",
    description: "CB3000 chipper bodies, 17–25 cu. yd.",
  },
  {
    label: "Custom Bodies",
    href: "/custom-truck-bodies",
    glyph: "custom",
    description: "Built to your spec — toolboxes, beavertails, winch tracks",
  },
];

export const mainNav: NavItem[] = [
  { label: "Products", href: "/standard-truck-bodies", children: productNav },
  { label: "Gallery", href: "/gallery" },
  {
    label: "Where to Buy",
    href: "/where-to-buy",
    children: [
      { label: "Find a Dealer", href: "/where-to-buy" },
      { label: "Become a Dealer", href: "/where-to-buy/become-a-dealer" },
    ],
  },
  { label: "Warranty", href: "/warranty" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  { title: "Products", links: [...productNav, { label: "Configurator", href: "/configurator" }] },
  {
    title: "Company",
    links: [
      { label: "Gallery", href: "/gallery" },
      { label: "Find a Dealer", href: "/where-to-buy" },
      { label: "Become a Dealer", href: "/where-to-buy/become-a-dealer" },
      { label: "Warranty & Claims", href: "/warranty" },
      { label: "Catalog (PDF)", href: "/catalog" },
    ],
  },
];

export const quoteHref = "/request-a-quote";

export const sellingPoints = [
  "Custom sizes, options & configurations",
  "Shorter-than-industry lead times",
  "Full delivery service",
  "Common standard bodies in stock",
  "In-house paint facility — custom colors",
  "3-year limited warranty",
] as const;
