"use client";
import { useState } from "react";
import { useLanguage } from "./Language";
import { SYRIA_PATH, SYRIA_VIEWBOX, CITY_POINTS } from "./syria-map";

const cities: { id: keyof typeof CITY_POINTS; name: [string, string] }[] = [
  { id: "aleppo", name: ["Aleppo", "حلب"] }, { id: "latakia", name: ["Latakia", "اللاذقية"] }, { id: "tartus", name: ["Tartus", "طرطوس"] },
  { id: "hama", name: ["Hama", "حماة"] }, { id: "homs", name: ["Homs", "حمص"] }, { id: "daraa", name: ["Daraa", "درعا"] },
  { id: "sweida", name: ["As-Suwayda", "السويداء"] }, { id: "palmyra", name: ["Palmyra", "تدمر"] }, { id: "deir", name: ["Deir ez-Zor", "دير الزور"] },
];
export function ProjectMap() {
  const { t } = useLanguage();
  const [hover, setHover] = useState<string | null>(null);
  const [sel, setSel] = useState<string>("damascus");
  const on = (id: string) => hover === id || (!hover && sel === id);
  const [dx, dy] = CITY_POINTS.damascus;
  return <div className="syria-map">
    <div className="map-canvas">
    <svg viewBox={SYRIA_VIEWBOX} role="img" aria-label={t("Map of Syria showing Damascus and the cities we serve", "خريطة سوريا تظهر دمشق والمدن التي نخدمها")}>
      <defs>
        <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.6" className="map-dot" /></pattern>
        <linearGradient id="land" x1="0" y1="0" x2="1" y2="1"><stop offset="0" className="land-a" /><stop offset="1" className="land-b" /></linearGradient>
        <clipPath id="syria-clip"><path d={SYRIA_PATH} /></clipPath>
      </defs>
      <path d={SYRIA_PATH} className="map-land" fill="url(#land)" />
      <rect width="100%" height="100%" fill="url(#dots)" clipPath="url(#syria-clip)" />
      <path d={SYRIA_PATH} className="map-outline" pathLength={1} />
      {cities.map((c, i) => { const [x, y] = CITY_POINTS[c.id]; const mx = (x + dx) / 2 + (y - dy) * 0.18, my = (y + dy) / 2 - Math.abs(x - dx) * 0.22; return <path key={c.id} className={`map-arc ${on(c.id) ? "hot" : ""}`} d={`M${dx} ${dy} Q${mx} ${my} ${x} ${y}`} pathLength={1} style={{ animationDelay: `${0.6 + i * 0.12}s` }} />; })}
      {cities.map((c, i) => { const [x, y] = CITY_POINTS[c.id]; return <g key={c.id} className={`map-city ${on(c.id) ? "hot" : ""}`} transform={`translate(${x} ${y})`} style={{ animationDelay: `${1 + i * 0.12}s` }} onMouseEnter={() => setHover(c.id)} onMouseLeave={() => setHover(null)} onClick={() => setSel(c.id)} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") setSel(c.id); }} role="button" aria-pressed={sel === c.id} tabIndex={0} onFocus={() => setHover(c.id)} onBlur={() => setHover(null)}><circle r="26" className="hit" /><circle r="9" className="ring" /><circle r="7" className="core" /><text y="-22" textAnchor="middle">{t(c.name[0], c.name[1])}</text></g>; })}
      <g className={`map-hq ${on("damascus") ? "hot" : ""}`} onClick={() => setSel("damascus")} style={{ cursor: "pointer" }} transform={`translate(${dx} ${dy})`}><circle r="40" className="pulse" /><circle r="40" className="pulse p2" /><circle r="15" className="core" /><circle r="5" className="center" /><text x="26" y="7">{t("Damascus", "دمشق")}</text></g>
    </svg>
    </div>
  </div>;
}
