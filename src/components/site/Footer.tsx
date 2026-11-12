"use client";
import { Logo } from "./Header";
import { useLanguage } from "./Language";
import { services } from "./services";
import { SocialIcon } from "./Social";
import { EMAIL, PHONE, PHONE_DISPLAY, WHATSAPP, SOCIAL_LINKS } from "./data";

export function Footer() {
  const { t } = useLanguage();
  const company = [["How we work", "طريقة عملنا", "process"], ["Projects", "المشاريع", "projects"], ["Support & warranty", "الدعم والضمان", "faq"]] as const;
  return <footer className="site-footer">
    <div className="page-width">
      <div className="footer-cards">
        <div className="footer-card footer-brand"><Logo /><p>{t("Smart systems, networks, cybersecurity and digital solutions — engineered as one.", "أنظمة ذكية وشبكات وأمن سيبراني وحلول رقمية — مصممة كمنظومة واحدة.")}</p><div className="socials">{SOCIAL_LINKS.map(s => <a key={s.name} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={s.name} className={`social social-${s.name.toLowerCase()}`}><SocialIcon name={s.name} /></a>)}</div></div>
        <nav className="footer-card" aria-label={t("Services", "الخدمات")}><h3>{t("Services", "الخدمات")}</h3>{services.map(s => <a key={s.id} href={`#${s.id}`}>{t(s.title[0], s.title[1])}</a>)}</nav>
        <nav className="footer-card" aria-label={t("Company", "الشركة")}><h3>{t("Company", "الشركة")}</h3>{company.map(c => <a key={c[2]} href={`#${c[2]}`}>{t(c[0], c[1])}</a>)}</nav>
        <div className="footer-card"><h3>{t("Contact", "تواصل")}</h3><a href={`mailto:${EMAIL}`}>{EMAIL}</a><a href={`tel:${PHONE}`} dir="ltr">{PHONE_DISPLAY}</a><span>{t("Damascus, Syria", "دمشق، سوريا")}</span><span>{t("Working across Syria", "نعمل في جميع أنحاء سوريا")}</span></div>
      </div>
      <p className="footer-wordmark" aria-hidden>ORVANA</p>
      <div className="footer-bottom"><p>{t("© 2026 ORVANA Integrated Systems. All rights reserved.", "© ٢٠٢٦ أورفانا للأنظمة المتكاملة. جميع الحقوق محفوظة.")}</p><a href="#top">{t("Back to top", "العودة للأعلى")} ↑</a></div>
    </div>
  </footer>;
}
