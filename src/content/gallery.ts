/**
 * Gallery — client photography from the previous site's gallery + product pages.
 * Step 4 moves this into the CMS (same shape: id, category, alt, featured).
 */
export type GalleryCategory = "dump" | "landscape" | "platform" | "chipper" | "custom";

export type GalleryItem = { id: string; category: GalleryCategory; alt: string; featured?: boolean };

export const galleryCategories: { key: GalleryCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "dump", label: "Dump" },
  { key: "landscape", label: "Landscape" },
  { key: "platform", label: "Platform & Stake" },
  { key: "chipper", label: "Chipper" },
  { key: "custom", label: "Custom" },
];

export const gallery: GalleryItem[] = [
  { id: "img-0331-2", category: "dump", alt: "Black SH dump body on a Ford F-750 parked on grass", featured: true },
  { id: "20240510-30649-5", category: "platform", alt: "Stake body with lift gate in front of a truck equipment dealer", featured: true },
  { id: "img-9700-1", category: "dump", alt: "Two red trucks with SH dump bodies" },
  { id: "cb3000-a", category: "chipper", alt: "White CB3000 chipper body with ladder rack", featured: true },
  { id: "20220930-135303", category: "dump", alt: "Custom pink dump body on a Ram chassis — painted in-house", featured: true },
  { id: "use-for-page-25", category: "custom", alt: "Red custom beavertail body with fold-down ramp", featured: true },
  { id: "img-0344", category: "platform", alt: "Wood-floor platform body tipped on a dump hoist", featured: true },
  { id: "04", category: "dump", alt: "Black dump body on a crew-cab chassis at a stone yard", featured: true },
  { id: "1lb3000", category: "landscape", alt: "1LB3000 landscape body on a white cab-chassis" },
  { id: "20180824-080857", category: "platform", alt: "Stake body with racks at a truck equipment dealer" },
  { id: "20210104-084914-resized-3", category: "platform", alt: "Platform body with wood floor on a pickup" },
  { id: "20210305-092742-resized-1", category: "dump", alt: "Red dump body on a medium-duty truck" },
  { id: "20210413-134013-resized-1", category: "landscape", alt: "Black landscape body on a white truck" },
  { id: "20240603-30711-8", category: "dump", alt: "Dump body with snow plow on a dealer lot", featured: true },
  { id: "228042z5", category: "dump", alt: "Dump body raised on a Ram chassis" },
  { id: "228042z8", category: "dump", alt: "Dump body on a Ram chassis outside a dealer" },
  { id: "26925-011725-015-1", category: "platform", alt: "Platform body with headache rack on a white pickup" },
  { id: "26925-012422-019", category: "platform", alt: "Stake platform body on a crew-cab" },
  { id: "26925-012422-042", category: "platform", alt: "Stake body on a cab-over truck" },
  { id: "26925-012618-031-1", category: "platform", alt: "Contractor platform with headache rack on a dark pickup" },
  { id: "26925-031822-050", category: "platform", alt: "Stake body with 4-slat racks" },
  { id: "26925-091223-132", category: "platform", alt: "Platform dump body tipped on a red truck" },
  { id: "body-4606-1-1", category: "platform", alt: "Low-side platform body on a white Ford at a dealer" },
  { id: "db4000-installed-4149-3", category: "dump", alt: "Orange dump body installed on a white truck" },
  { id: "dsc01350", category: "chipper", alt: "White chipper / forestry body on a medium-duty chassis" },
  { id: "dsc01386", category: "landscape", alt: "Finished landscape body ready for install" },
  { id: "dscf0625", category: "landscape", alt: "Landscape body on a medium-duty chassis" },
  { id: "dscf0722-1", category: "custom", alt: "Red custom body with ramp and expanded-metal sides" },
  { id: "dscf1422", category: "platform", alt: "Stake body with 42-inch racks on gravel" },
  { id: "dscf1436", category: "landscape", alt: "Landscape body with tall steel sides" },
  { id: "g-016945c0ec", category: "platform", alt: "Platform body on a white Ford at a dealer" },
  { id: "g-017349ed4d", category: "landscape", alt: "Landscape body on a white Ford Super Duty" },
  { id: "g-018d8f12c1", category: "dump", alt: "Dump body on a black Ford F-750" },
  { id: "g-01beb1557d", category: "dump", alt: "Rear view of a black dump body" },
  { id: "g-01d4a28411", category: "dump", alt: "Dump body raised in front of a dealer sign" },
  { id: "image1", category: "dump", alt: "Dump body on a Chevrolet medium-duty truck" },
  { id: "img-0011", category: "landscape", alt: "Landscape body with mesh sides on a white truck" },
  { id: "img-0336-2", category: "dump", alt: "Dump body tipped with the tailgate swinging" },
  { id: "img-0337", category: "platform", alt: "Stake body on a dark crew-cab truck" },
  { id: "img-0348", category: "platform", alt: "Rear view of a wood-floor platform with bulkhead window" },
  { id: "img-0420", category: "dump", alt: "Mason dump body with aluminum toolboxes" },
  { id: "img-0424", category: "dump", alt: "Dump body raised, showing the steel floor" },
  { id: "img-1512", category: "dump", alt: "Dump body raised on a white chassis" },
  { id: "img-1703", category: "dump", alt: "Finished SH bodies loaded on a trailer for delivery" },
  { id: "img-8078", category: "platform", alt: "Platform body on a white crew-cab" },
  { id: "img-9655-1", category: "dump", alt: "Dump body on a crew-cab parked on asphalt" },
  { id: "img-9708", category: "platform", alt: "Platform body raised on a hoist" },
  { id: "mass-dot-complete-2824-or-2825-5", category: "custom", alt: "Yellow municipal truck with custom platform and crane" },
  { id: "pb9600-4272-or4273-installed-7", category: "platform", alt: "PB9600 stake body installed" },
  { id: "replacementpic-1", category: "dump", alt: "Appalachian dump body with wood side boards" },
  { id: "custom-truck-body-example-1", category: "custom", alt: "Custom body with toolboxes and ladder rack" },
];

export const videos = [
  { id: "jzukq3kPf3Y", title: "SH Truck Bodies plant tour", tag: "Plant tour" },
  { id: "VwdWG6x8ieg", title: "SH Truck Bodies — brand film", tag: "Brand" },
  { id: "wpdKQK-qOEA", title: "Mason / contractor dump body", tag: "Dump" },
  { id: "Gw0UYMfWwBA", title: "SH dump body walkaround", tag: "Dump" },
  { id: "TLP8YqTWzkk", title: "Landscape body", tag: "Landscape" },
  { id: "h0otNX6hwnI", title: "Stake body", tag: "Platform" },
] as const;

export const videoById = (id: string) => videos.find((v) => v.id === id);
