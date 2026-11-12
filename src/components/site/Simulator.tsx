"use client";
import { useState, type CSSProperties } from "react";
import { Lamp, Blinds, Tv, Lock, LockOpen, ShieldCheck, Shield, Minus, Plus, Thermometer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./Language";
import { roomScenes, roomPhoto, type RoomState } from "./scene-state";
const morning = "/images/room-morning.jpg";
const evening = "/images/room-evening.jpg";
const cinema = "/images/room-cinema.jpg";

export function Simulator() {
  const { t } = useLanguage();
  const [scene, setScene] = useState("morning");
  const [state, setState] = useState<RoomState>({ ...roomScenes[0].state });
  const update = (value: Partial<RoomState>) => { setScene("custom"); setState(s => ({ ...s, ...value })); };
  const photo = roomPhoto(state);
  const current = roomScenes.find(s => s.id === scene);
  const tiles = [
    { key: "tv" as const, on: state.tv, icon: Tv, label: t("Television", "التلفاز"), value: state.tv ? t("On", "يعمل") : t("Off", "مطفأ") },
    { key: "locked" as const, on: state.locked, icon: state.locked ? Lock : LockOpen, label: t("Front door", "الباب الأمامي"), value: state.locked ? t("Locked", "مقفل") : t("Unlocked", "مفتوح") },
    { key: "alarm" as const, on: state.alarm, icon: state.alarm ? ShieldCheck : Shield, label: t("Alarm", "الإنذار"), value: state.alarm ? t("Armed", "مفعّل") : t("Disarmed", "غير مفعّل") },
  ];
  return <div className="sim">
    <div className="sim-stage" data-light={state.light === 0 ? "off" : state.light < 40 ? "dim" : "on"}>
      {[{ id: "morning", src: morning }, { id: "evening", src: evening }, { id: "cinema", src: cinema }].map(p => <img key={p.id} src={p.src} alt={t(`${p.id} living room scene`, "غرفة المعيشة")} width={1220} height={768} loading="lazy" className={photo === p.id ? "active" : ""} />)}
      <div className="sim-status"><span className="sim-live" />{scene === "custom" ? t("Your scene", "مشهدك الخاص") : t(current?.label[0] ?? "", current?.label[1] ?? "")}<em>{state.temp}°</em></div>
      <div className="sim-scenes" role="group" aria-label={t("Room scenes", "مشاهد الغرفة")}>{roomScenes.map(s => <button key={s.id} type="button" aria-pressed={scene === s.id} className={scene === s.id ? "active" : ""} onClick={() => { setScene(s.id); setState({ ...s.state }); }}>{t(s.label[0], s.label[1])}</button>)}</div>
    </div>
    <div className="sim-panel">
      <div className="sim-slider"><div><Lamp /><span>{t("Lighting", "الإضاءة")}</span><strong>{state.light}%</strong></div><input aria-label={t("Lighting", "الإضاءة")} type="range" min="0" max="100" value={state.light} style={{ "--v": `${state.light}%` } as CSSProperties} onChange={e => update({ light: Number(e.target.value) })} /></div>
      <div className="sim-slider"><div><Blinds /><span>{t("Curtains", "الستائر")}</span><strong>{state.curtains === 0 ? t("Open", "مفتوحة") : state.curtains === 100 ? t("Closed", "مغلقة") : `${state.curtains}%`}</strong></div><input aria-label={t("Curtains", "الستائر")} type="range" min="0" max="100" value={state.curtains} style={{ "--v": `${state.curtains}%` } as CSSProperties} onChange={e => update({ curtains: Number(e.target.value) })} /></div>
      <div className="sim-tiles">{tiles.map(x => <button key={x.key} type="button" aria-pressed={x.on} className={x.on ? "on" : ""} onClick={() => update({ [x.key]: !x.on })}><x.icon /><span>{x.label}</span><strong>{x.value}</strong></button>)}</div>
      <div className="sim-climate"><Thermometer /><span>{t("Climate", "التكييف")}</span><Button variant="ghost" size="icon" aria-label={t("Lower temperature", "خفض الحرارة")} disabled={state.temp <= 16} onClick={() => update({ temp: state.temp - 1 })}><Minus /></Button><strong>{state.temp}°</strong><Button variant="ghost" size="icon" aria-label={t("Raise temperature", "رفع الحرارة")} disabled={state.temp >= 30} onClick={() => update({ temp: state.temp + 1 })}><Plus /></Button></div>
    </div>
  </div>;
}
