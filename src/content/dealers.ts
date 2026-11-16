/**
 * Dealer directory.
 *
 * ⚠ SAMPLE DATA. The old site loads its dealer list from a WordPress plugin
 * via AJAX, so it could not be migrated from the page HTML. These entries are
 * placeholders (generic names at real city coordinates) so the locator can be
 * reviewed. Step 4's admin replaces them with the client's real list (CSV import).
 */
export type Dealer = {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  website?: string;
  lat: number;
  lng: number;
  products: ("dump" | "landscape" | "platform" | "chipper" | "custom")[];
  sample: true;
};

const all = ["dump", "landscape", "platform", "chipper", "custom"] as Dealer["products"];

export const dealers: Dealer[] = [
  { id: "d01", name: "Sample Truck Equipment — Lancaster", street: "100 Example Rd", city: "Lancaster", state: "PA", zip: "17601", phone: "555-010-0101", lat: 40.0379, lng: -76.3055, products: all, sample: true },
  { id: "d02", name: "Sample Upfitters — Harrisburg", street: "200 Example Ave", city: "Harrisburg", state: "PA", zip: "17110", phone: "555-010-0102", lat: 40.2732, lng: -76.8867, products: ["dump", "platform"], sample: true },
  { id: "d03", name: "Sample Work Truck Center — Allentown", street: "300 Example Blvd", city: "Allentown", state: "PA", zip: "18103", phone: "555-010-0103", lat: 40.6084, lng: -75.4902, products: all, sample: true },
  { id: "d04", name: "Sample Fleet Equipment — Pittsburgh", street: "400 Example St", city: "Pittsburgh", state: "PA", zip: "15222", phone: "555-010-0104", lat: 40.4406, lng: -79.9959, products: ["dump", "landscape", "platform"], sample: true },
  { id: "d05", name: "Sample Truck Bodies — Scranton", street: "500 Example Dr", city: "Scranton", state: "PA", zip: "18503", phone: "555-010-0105", lat: 41.4089, lng: -75.6624, products: ["dump", "chipper"], sample: true },
  { id: "d06", name: "Sample Equipment Co. — Hartford", street: "600 Example Way", city: "Hartford", state: "CT", zip: "06103", phone: "555-010-0106", lat: 41.7658, lng: -72.6734, products: all, sample: true },
  { id: "d07", name: "Sample Upfit — Trenton", street: "700 Example Pl", city: "Trenton", state: "NJ", zip: "08608", phone: "555-010-0107", lat: 40.2206, lng: -74.7597, products: ["dump", "landscape"], sample: true },
  { id: "d08", name: "Sample Truck & Body — Newark", street: "800 Example Ln", city: "Newark", state: "NJ", zip: "07102", phone: "555-010-0108", lat: 40.7357, lng: -74.1724, products: ["platform", "custom"], sample: true },
  { id: "d09", name: "Sample Work Trucks — Wilmington", street: "900 Example Ct", city: "Wilmington", state: "DE", zip: "19801", phone: "555-010-0109", lat: 39.7391, lng: -75.5398, products: ["dump", "platform"], sample: true },
  { id: "d10", name: "Sample Equipment — Baltimore", street: "1000 Example Pkwy", city: "Baltimore", state: "MD", zip: "21201", phone: "555-010-0110", lat: 39.2904, lng: -76.6122, products: all, sample: true },
  { id: "d11", name: "Sample Fleet Upfitters — Albany", street: "1100 Example Rd", city: "Albany", state: "NY", zip: "12207", phone: "555-010-0111", lat: 42.6526, lng: -73.7562, products: ["dump", "landscape", "chipper"], sample: true },
  { id: "d12", name: "Sample Truck Equipment — Long Island", street: "1200 Example Tpke", city: "Hauppauge", state: "NY", zip: "11788", phone: "555-010-0112", lat: 40.8257, lng: -73.2026, products: ["landscape", "chipper"], sample: true },
  { id: "d13", name: "Sample Body Works — Worcester", street: "1300 Example St", city: "Worcester", state: "MA", zip: "01608", phone: "555-010-0113", lat: 42.2626, lng: -71.8023, products: all, sample: true },
  { id: "d14", name: "Sample Upfitters — Richmond", street: "1400 Example Ave", city: "Richmond", state: "VA", zip: "23219", phone: "555-010-0114", lat: 37.5407, lng: -77.436, products: ["dump", "platform"], sample: true },
  { id: "d15", name: "Sample Work Truck Supply — Reading", street: "1500 Example Blvd", city: "Reading", state: "PA", zip: "19601", phone: "555-010-0115", lat: 40.3356, lng: -75.9269, products: all, sample: true },
];

export const US_STATES: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California", CO: "Colorado", CT: "Connecticut",
  DE: "Delaware", FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Michigan",
  MN: "Minnesota", MS: "Mississippi", MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire",
  NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio",
  OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota",
  TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington", WV: "West Virginia",
  WI: "Wisconsin", WY: "Wyoming",
};
