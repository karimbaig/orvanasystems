"use client";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./Language";
import { services } from "./services";
import { EMAIL, PHONE, PHONE_DISPLAY, WHATSAPP } from "./data";
const logo = { url: "/images/orvana-logo.jpeg" };
const english = { url: "/images/english-flag.png" };
const arabic = { url: "/images/arabic-flag.png" };

export function Logo() {
  const { t } = useLanguage();
  return <a href="#top" className="brand" aria-label={t("ORVANA home", "أورفانا الرئيسية")}><img src={logo.url} alt="ORVANA" width={64} height={64} /><span>ORVANA<small>{t("INTEGRATED SYSTEMS", "الأنظمة المتكاملة")}</small></span></a>;
}
export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  return <div className="language-switch" aria-label="Language / اللغة">{([{ id: "en", flag: english.url, label: "EN" }, { id: "ar", flag: arabic.url, label: "عربي" }] as const).map(l => <Button key={l.id} variant="ghost" onClick={() => setLanguage(l.id)} aria-pressed={language === l.id} aria-label={l.id === "en" ? "English" : "العربية"} className={language === l.id ? "selected" : ""}><img src={l.flag} width={22} height={15} alt="" />{l.label}</Button>)}</div>;
}
export function Header() {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>("smart");
  return <header className="site-header"><div className="page-width header-inner"><Logo /><div className="header-actions"><a className="header-phone" href={`tel:${PHONE}`} dir="ltr">{PHONE_DISPLAY}</a><LanguageSwitch /><Dialog.Root open={open} onOpenChange={setOpen}><Dialog.Trigger asChild><Button variant="clean" className="menu-trigger" aria-label={t("Open menu", "فتح القائمة")}><span className="hamburger" aria-hidden><i /><i /></span><span className="menu-word">{t("Menu", "القائمة")}</span></Button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="menu-overlay" /><Dialog.Content dir={language === "ar" ? "rtl" : "ltr"} className="mega-menu" aria-describedby={undefined}><div className="page-width"><div className="mega-top"><Logo /><div className="flex items-center gap-4"><LanguageSwitch /><Dialog.Close asChild><Button variant="clean" className="close-menu" aria-label={t("Close menu", "إغلاق القائمة")}><X /></Button></Dialog.Close></div></div><Dialog.Title className="sr-only">{t("Explore ORVANA", "اكتشف أورفانا")}</Dialog.Title><div className="mega-grid"><div>{services.map((s, i) => <div className="mega-group" key={s.id}><Button variant="ghost" className="mega-heading" aria-expanded={expanded === s.id} onClick={() => setExpanded(expanded === s.id ? null : s.id)}><span className="menu-number">0{i + 1}</span><span>{t(s.title[0], s.title[1])}</span><ChevronDown className={expanded === s.id ? "rotate-180" : ""} /></Button>{expanded === s.id && <div className="mega-links">{s.details.map(d => <a key={d[0]} href={`#${s.id}`} onClick={() => setOpen(false)}>{t(d[0], d[1])}<ArrowUpRight /></a>)}<a href={`#${s.id}`} onClick={() => setOpen(false)}>{t("Explore service", "اكتشف الخدمة")}<ArrowUpRight /></a></div>}</div>)}</div><aside className="mega-aside"><p className="section-label">{t("Explore", "اكتشف")}</p>{[["Projects", "المشاريع", "projects"], ["Smart home experience", "تجربة المنزل الذكي", "simulator"], ["Our approach", "منهجنا", "approach"], ["How we work", "طريقة عملنا", "process"], ["Products", "المنتجات", "products"], ["About ORVANA", "عن أورفانا", "expertise"], ["Support & warranty", "الدعم والضمان", "faq"], ["Contact", "تواصل معنا", "contact"]].map(([en, ar, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{t(en ?? "", ar ?? "")}<ArrowUpRight /></a>)}<div className="mega-contact"><p>{t("Let's talk about your project.", "لنتحدث عن مشروعك.")}</p><a href={`tel:${PHONE}`} dir="ltr">{PHONE_DISPLAY}</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a><a href={WHATSAPP} target="_blank" rel="noreferrer">{t("WhatsApp", "واتساب")} ↗</a></div></aside></div></div></Dialog.Content></Dialog.Portal></Dialog.Root></div></div></header>;
}
