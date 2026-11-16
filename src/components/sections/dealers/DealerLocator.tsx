"use client";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import type * as Leaflet from "leaflet";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { ArrowRight, MapPin, Phone } from "@/components/icons";
import { dealers, US_STATES, type Dealer } from "@/content/dealers";
import { cn } from "@/lib/cn";

type Origin = { lat: number; lng: number; label: string };
type Result = Dealer & { miles?: number };

/* Tiles: default = OpenStreetMap, darkened with a CSS filter (no API key needed).
   For production traffic set NEXT_PUBLIC_MAP_TILE_URL (+ _ATTRIBUTION) to a keyed
   provider such as Stadia Maps or MapTiler dark styles. */
const CUSTOM_TILES = process.env.NEXT_PUBLIC_MAP_TILE_URL;
const TILE_URL = CUSTOM_TILES ?? "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILE_ATTR =
  process.env.NEXT_PUBLIC_MAP_TILE_ATTRIBUTION ??
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const HQ = { lat: 40.0934, lng: -75.9113 };

function haversineMiles(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 3958.8;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Dealer data will be CMS-edited (step 4) — escape before injecting into Leaflet popups. */
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);

/** Parse "PA" / "Pennsylvania" → "PA" (sync, pure). */
function parseState(q: string): string | null {
  const v = q.trim();
  if (!v) return null;
  if (US_STATES[v.toUpperCase()]) return v.toUpperCase();
  const hit = Object.entries(US_STATES).find(([, n]) => n.toLowerCase() === v.toLowerCase());
  return hit ? hit[0] : null;
}

/**
 * Interactive dealer locator
 *  - search by ZIP (geocoded via api.zippopotam.us → distance sort),
 *    state (code or name), or city / dealer name
 *  - "Use my location" (browser geolocation, never stored)
 *  - Leaflet map (code-split) with marker clustering, synced list ⇄ map
 *  - phones: Map / List toggle; everything ≥ 44px
 */
export function DealerLocator() {
  const params = useSearchParams();
  const initialQ = params.get("q") ?? "";

  const [query, setQuery] = useState(initialQ);
  const [stateFilter, setStateFilter] = useState<string | null>(() => parseState(initialQ));
  const [text, setText] = useState<string>(() => (/^\d{5}$/.test(initialQ.trim()) || parseState(initialQ) ? "" : initialQ.trim()));
  const [origin, setOrigin] = useState<Origin | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "geo-error">("idle");
  const [selected, setSelected] = useState<string | null>(null);
  const [view, setView] = useState<"map" | "list">("list");

  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<{ L: typeof Leaflet; map: Leaflet.Map; cluster: Leaflet.MarkerClusterGroup; markers: Map<string, Leaflet.Marker>; origin?: Leaflet.Layer; pending?: Leaflet.LatLngBounds } | null>(null);
  const [mapReady, setMapReady] = useState(false);

  /* ---------- search ---------- */
  async function geocodeZip(zip: string) {
    setStatus("loading");
    try {
      const res = await fetch(`https://api.zippopotam.us/us/${zip}`);
      if (!res.ok) throw new Error("not found");
      const j = (await res.json()) as { places: { latitude: string; longitude: string; "place name": string; "state abbreviation": string }[] };
      const p = j.places[0];
      setOrigin({ lat: Number(p.latitude), lng: Number(p.longitude), label: `${p["place name"]}, ${p["state abbreviation"]} ${zip}` });
      setStatus("idle");
    } catch {
      setOrigin(null);
      setStatus("error");
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const v = query.trim();
    setSelected(null);
    setStatus("idle");
    if (/^\d{5}$/.test(v)) {
      setStateFilter(null);
      setText("");
      void geocodeZip(v);
    } else {
      setOrigin(null);
      const st = parseState(v);
      setStateFilter(st);
      setText(st ? "" : v);
    }
    const url = v ? `?q=${encodeURIComponent(v)}` : location.pathname;
    history.replaceState(null, "", url);
  }

  function locateMe() {
    if (!navigator.geolocation) return setStatus("geo-error");
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setStateFilter(null);
        setText("");
        setQuery("");
        setOrigin({ lat: pos.coords.latitude, lng: pos.coords.longitude, label: "your location" });
        setStatus("idle");
      },
      () => setStatus("geo-error"),
      { maximumAge: 600_000, timeout: 10_000 },
    );
  }

  // ZIP passed in the URL (?q=19344) → geocode once on mount (async; state set after await).
  useEffect(() => {
    const v = initialQ.trim();
    if (/^\d{5}$/.test(v)) {
      let alive = true;
      fetch(`https://api.zippopotam.us/us/${v}`)
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((j) => {
          if (!alive) return;
          const p = j.places[0];
          setOrigin({ lat: Number(p.latitude), lng: Number(p.longitude), label: `${p["place name"]}, ${p["state abbreviation"]} ${v}` });
        })
        .catch(() => alive && setStatus("error"));
      return () => {
        alive = false;
      };
    }
  }, [initialQ]);

  const results: Result[] = useMemo(() => {
    let list: Result[] = dealers;
    if (stateFilter) list = list.filter((d) => d.state === stateFilter);
    if (text) {
      const t = text.toLowerCase();
      list = list.filter((d) => `${d.name} ${d.city} ${d.state} ${d.zip}`.toLowerCase().includes(t));
    }
    if (origin) {
      list = list.map((d) => ({ ...d, miles: haversineMiles(origin, d) })).sort((a, b) => a.miles! - b.miles!);
    } else {
      list = [...list].sort((a, b) => a.state.localeCompare(b.state) || a.city.localeCompare(b.city));
    }
    return list;
  }, [stateFilter, text, origin]);

  /* ---------- map: init once (Leaflet is code-split) ---------- */
  useEffect(() => {
    let disposed = false;
    (async () => {
      const L = (await import("leaflet")).default;
      (window as unknown as { L: typeof Leaflet }).L = L; // markercluster expects a global L
      await import("leaflet.markercluster");
      if (disposed || !mapEl.current) return;
      const map = L.map(mapEl.current, { zoomControl: false, scrollWheelZoom: false, attributionControl: true }).setView([HQ.lat, HQ.lng], 6);
      L.control.zoom({ position: "bottomright" }).addTo(map);
      L.tileLayer(TILE_URL, { attribution: TILE_ATTR, maxZoom: 18, className: CUSTOM_TILES ? "" : "tiles-dark" }).addTo(map);
      // Scroll-zoom only after the map is focused/clicked (don't hijack page scroll)
      map.on("focus click", () => map.scrollWheelZoom.enable());
      map.on("blur mouseout", () => map.scrollWheelZoom.disable());

      const cluster = L.markerClusterGroup({
        showCoverageOnHover: false,
        maxClusterRadius: 48,
        iconCreateFunction: (c) =>
          L.divIcon({ html: `<span>${c.getChildCount()}</span>`, className: "dealer-cluster", iconSize: [44, 44] }),
      });
      map.addLayer(cluster);

      // HQ marker
      L.marker([HQ.lat, HQ.lng], {
        icon: L.divIcon({ className: "hq-pin", html: "<span>SH</span>", iconSize: [40, 40], iconAnchor: [20, 20] }),
        keyboard: false,
        title: "SH Truck Bodies — Honey Brook, PA",
      })
        .bindTooltip("SH Truck Bodies HQ · Honey Brook, PA", { direction: "top", offset: [0, -18] })
        .addTo(map);

      mapRef.current = { L, map, cluster, markers: new Map() };
      setMapReady(true);
    })();
    return () => {
      disposed = true;
      mapRef.current?.map.remove();
      mapRef.current = null;
    };
  }, []);

  /* ---------- map: sync markers with results ---------- */
  useEffect(() => {
    const m = mapRef.current;
    if (!mapReady || !m) return;
    const { L, map, cluster } = m;
    cluster.clearLayers();
    m.markers.clear();
    for (const d of results) {
      const marker = L.marker([d.lat, d.lng], {
        icon: L.divIcon({ className: "dealer-pin", html: "<span></span>", iconSize: [28, 36], iconAnchor: [14, 34] }),
        title: d.name,
      }).bindPopup(
        `<strong>${esc(d.name)}</strong><br/>${esc(d.street)}<br/>${esc(d.city)}, ${esc(d.state)} ${esc(d.zip)}<br/><a href="tel:${esc(d.phone)}">${esc(d.phone)}</a>`,
        { closeButton: false, offset: [0, -26] },
      );
      marker.on("click", () => setSelected(d.id));
      cluster.addLayer(marker);
      m.markers.set(d.id, marker);
    }
    m.origin?.remove();
    if (origin) {
      m.origin = L.circleMarker([origin.lat, origin.lng], { radius: 7, color: "#ffa274", weight: 2, fillColor: "#ff5b14", fillOpacity: 1 })
        .bindTooltip(`Searching from ${origin.label}`)
        .addTo(map);
    }
    const pts = (origin ? results.slice(0, 4) : results).map((d) => L.latLng(d.lat, d.lng));
    if (origin) pts.push(L.latLng(origin.lat, origin.lng));
    if (!pts.length) return;
    const bounds = L.latLngBounds(pts).pad(0.25);
    const size = map.getSize();
    // Hidden container (phone list view) has 0×0 size → Leaflet math yields NaN.
    // Remember the bounds and fit when the map becomes visible.
    if (!size.x || !size.y) m.pending = bounds;
    else map.flyToBounds(bounds, { duration: 0.9, maxZoom: 10 });
  }, [results, origin, mapReady]);

  /* ---------- map: focus selected ---------- */
  useEffect(() => {
    const m = mapRef.current;
    if (!m || !selected) return;
    const marker = m.markers.get(selected);
    const size = m.map.getSize();
    if (!marker || !size.x || !size.y) return; // opened when the map view is shown
    m.cluster.zoomToShowLayer(marker, () => marker.openPopup());
  }, [selected]);

  // Leaflet needs a size recalculation when the map becomes visible on phones
  useEffect(() => {
    if (view !== "map") return;
    const t = setTimeout(() => {
      const m = mapRef.current;
      if (!m) return;
      m.map.invalidateSize();
      if (m.pending) {
        m.map.fitBounds(m.pending, { maxZoom: 10 });
        m.pending = undefined;
      }
      if (selected) m.markers.get(selected)?.openPopup();
    }, 60);
    return () => clearTimeout(t);
  }, [view, selected]);

  const summary = origin
    ? `Nearest dealers to ${origin.label}`
    : stateFilter
      ? `Dealers in ${US_STATES[stateFilter]}`
      : text
        ? `Results for “${text}”`
        : "All dealers";

  return (
    <div className="grid gap-4">
      {/* Search */}
      <form onSubmit={onSubmit} role="search" className="grid gap-2 sm:grid-cols-[1fr_auto_auto]">
        <label htmlFor="locator-q" className="sr-only">
          ZIP code, state, or city
        </label>
        <input
          id="locator-q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ZIP, state or city — e.g. 19344, PA, Hartford"
          autoComplete="postal-code"
          className="field-control"
        />
        <button type="submit" className="btn btn-primary h-[3.25rem] px-6 [--cut:9px]">
          <span aria-hidden className="btn-plate" />
          <span>Search</span>
          <ArrowRight className="size-4" />
        </button>
        <button
          type="button"
          onClick={locateMe}
          className="flex h-[3.25rem] items-center justify-center gap-2 border border-line-strong px-5 text-sm transition-colors hover:border-fg"
        >
          <MapPin className="size-4 text-accent-text" /> Use my location
        </button>
      </form>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted" aria-live="polite">
          {status === "loading"
            ? "Searching…"
            : status === "error"
              ? "We couldn't find that ZIP code — try a state instead."
              : status === "geo-error"
                ? "Location unavailable — enter a ZIP code instead."
                : `${summary} · ${results.length} result${results.length === 1 ? "" : "s"}`}
        </p>
        {/* Phone view toggle */}
        <div role="tablist" aria-label="View" className="grid grid-cols-2 border border-line-strong lg:hidden">
          {(["list", "map"] as const).map((v) => (
            <button
              key={v}
              role="tab"
              aria-selected={view === v}
              onClick={() => setView(v)}
              className={cn("h-11 px-5 text-sm capitalize transition-colors", view === v ? "bg-fg text-bg" : "text-muted")}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 lg:h-[min(72vh,720px)] lg:grid-cols-[minmax(0,26rem)_1fr]">
        {/* List */}
        <ol
          className={cn(
            "no-scrollbar grid content-start gap-px overflow-y-auto border border-line bg-line lg:block lg:space-y-px",
            view === "map" && "hidden lg:block",
          )}
          data-lenis-prevent
          aria-label="Dealer results"
        >
          {results.map((d) => (
            <li key={d.id}>
              <button
                type="button"
                onClick={() => {
                  setSelected(d.id);
                  if (window.matchMedia("(max-width: 63.99rem)").matches) setView("map");
                }}
                aria-pressed={selected === d.id}
                className={cn(
                  "group/d grid w-full gap-2 bg-bg p-4 text-left transition-colors hover:bg-surface",
                  selected === d.id && "bg-surface shadow-[inset_3px_0_0_var(--accent)]",
                )}
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="font-display text-lg leading-tight tracking-tight">{d.name}</span>
                  {d.miles !== undefined && (
                    <span className="shrink-0 font-mono text-xs text-accent-text">{d.miles < 10 ? d.miles.toFixed(1) : Math.round(d.miles)} mi</span>
                  )}
                </span>
                <span className="text-sm text-muted">
                  {d.street}, {d.city}, {d.state} {d.zip}
                </span>
                <span className="flex flex-wrap gap-1">
                  {d.products.map((p) => (
                    <span key={p} className="border border-line px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-muted">
                      {p}
                    </span>
                  ))}
                </span>
              </button>
              <a
                href={`tel:${d.phone}`}
                className="flex min-h-11 items-center gap-2 border-t border-line bg-bg px-4 text-sm text-steel-300 hover:text-fg"
              >
                <Phone className="size-3.5 text-accent-text" /> {d.phone}
              </a>
            </li>
          ))}
          {results.length === 0 && (
            <li className="bg-bg p-6 text-sm text-muted">
              No dealers match yet. Call us at <a className="link-underline text-fg" href="tel:+16102730157">610-273-0157</a> and we&apos;ll connect you.
            </li>
          )}
        </ol>

        {/* Map */}
        <div className={cn("relative min-h-[60vh] border border-line lg:min-h-0", view === "list" && "hidden lg:block")}>
          <div ref={mapEl} className="absolute inset-0" role="region" aria-label="Dealer map" tabIndex={0} data-cursor="drag" data-cursor-label="Drag" />
          {!mapReady && <div className="absolute inset-0 grid place-items-center bg-bg-elevated font-mono text-xs text-muted">Loading map…</div>}
        </div>
      </div>
    </div>
  );
}
