"use client";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Plus, Check, Layers3, MapPin, BadgeCheck, Network, ScanLine, DraftingCompass, Cable, Settings2, ClipboardCheck, Headset, Building2, House } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { Rail } from "@/components/site/Rail";
import { ProjectMap } from "@/components/site/ProjectMap";
import { LanguageProvider, useLanguage } from "@/components/site/Language";
import { services } from "@/components/site/services";
import { WHATSAPP, PHONE, PHONE_DISPLAY } from "@/components/site/data";
const rack = "/images/core-rack.png";
const panel = "/images/product-panel.png";
const camera = "/images/product-camera.png";
const lock = "/images/product-lock.png";
const smart = "/images/smart-controls.png";
const network = "/images/network-security.png";
const cyber = "/images/cyber-hardware.png";
const web = "/images/digital-studio.png";
const villa = "/images/hero-villa.jpg";
const heroPoster = "/images/hero-smart-home.jpg";
const heroVideo = { url: "/images/hero-smart-home.mp4" };
const living = "/images/room-morning.jpg";

function CtaLink({ href = "#contact", children, secondary = false }: { href?: string; children: ReactNode; secondary?: boolean }) {
  return <Button asChild variant={secondary ? "clean" : "premium"} className="cta-button"><a href={href}>{children}<ArrowUpRight className="cta-arrow" /></a></Button>;
}
function SectionHead({ label, title, text, center = false }: { label?: string; title: ReactNode; text?: string; center?: boolean }) {
  return <Reveal className={`section-head ${center ? "centered" : ""}`}>{label && <p className="section-label">{label}</p>}<h2>{title}</h2>{text && <p className="section-description">{text}</p>}</Reveal>;
}
function Hero() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [mIdx, setMIdx] = useState(0);
  useEffect(() => { const id = window.setInterval(() => setMIdx(i => (i + 1) % services.length), 3800); return () => window.clearInterval(id); }, []);
  useEffect(() => {
    if (interacted || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setActive(a => (a + 1) % 4), 5500);
    return () => clearInterval(timer);
  }, [interacted]);
  return <section id="top" className="new-hero"><div className="hero-backdrop" aria-hidden><video className="hero-video" src={heroVideo.url} poster={heroPoster} autoPlay muted loop playsInline preload="metadata" /><div className="hero-veil" /></div><div className="page-width hero-heading"><Reveal><h1>{t("A smarter world.", "عالم أكثر ذكاءً.")}<br /><span>{t("Connected.", "متصل.")}</span></h1><p className="hero-description">{t("Smart spaces. Secure networks. Stronger digital experiences.", "مساحات ذكية. شبكات آمنة. تجارب رقمية أقوى.")}<br />{t("One team. Everything connected.", "فريق واحد. كل شيء متصل.")}</p><div className="hero-ctas"><CtaLink>{t("Let's build your system", "لنصمم نظامك")}</CtaLink><CtaLink href="#services" secondary>{t("Explore our services", "اكتشف خدماتنا")}</CtaLink></div></Reveal></div><div className="product-theatre" onMouseEnter={() => setInteracted(true)}><div className="theatre-line" aria-hidden /><div className="product-lineup" data-active={active}>{services.map((s, i) => <Button variant="ghost" key={s.id} className={`hero-product hero-product-${i} ${active === i ? "active" : ""}`} aria-label={t(s.title[0], s.title[1])} aria-pressed={active === i} onFocus={() => { setActive(i); setInteracted(true); }} onMouseEnter={() => setActive(i)} onClick={() => { setActive(i); setInteracted(true); }}><img src={s.image} alt={t(s.title[0], s.title[1])} width={1024} height={1024} fetchPriority={i === 0 ? "high" : undefined} loading={i === 0 ? "eager" : "lazy"} /><span className="product-floor" aria-hidden /></Button>)}</div><div className="theatre-caption"><a href={`#${services[active]?.id ?? "smart"}`} aria-label={t("Explore selected service", "اكتشف الخدمة المحددة")}><ArrowUpRight /></a></div></div><div className="hero-auto" aria-roledescription="carousel" aria-label={t("Our services", "خدماتنا")}><div className="hero-auto-stage">{services.map((s, i) => <figure key={s.id} className={`hero-auto-slide ${mIdx === i ? "on" : ""}`} aria-hidden={mIdx !== i}><img src={s.image} alt={t(s.title[0], s.title[1])} width={1024} height={1024} loading={i === 0 ? "eager" : "lazy"} /><figcaption>{t(s.title[0], s.title[1])}</figcaption></figure>)}</div><div className="hero-auto-bars" aria-hidden>{services.map((s, i) => <span key={s.id} className={mIdx === i ? "on" : mIdx > i ? "done" : ""} />)}</div></div><div className="page-width hero-service-nav">{services.map((s, i) => <Button key={s.id} variant="ghost" className={active === i ? "active" : ""} onClick={() => { setActive(i); setInteracted(true); }}>{t(s.title[0], s.title[1])}<ArrowUpRight /></Button>)}</div></section>;
}
function Trust() {
  const { t } = useLanguage();
  const stats = [{ n: "17", sup: "+", label: t("Completed projects", "مشروعاً منجزاً") }, { n: "15", label: t("Building systems", "نظاماً للمباني") }, { n: "01", label: t("Team in Damascus", "فريق في دمشق") }, { n: "Security+", sub: "CEH", label: t("Engineering credentials", "مؤهلات هندسية") }];
  return <section className="trust-strip"><div className="page-width"><Rail className="stat-panel">{stats.map(s => <div key={s.label} className="stat"><strong dir="ltr">{s.n}{s.sup && <sup>{s.sup}</sup>}{s.sub && <small>{s.sub}</small>}</strong><span>{s.label}</span></div>)}</Rail></div></section>;
}
function ProductBanner({ tone, img, eyebrow, title, text, flip = false }: { tone: string; img: string; eyebrow: string; title: string; text: string; flip?: boolean }) {
  const { t } = useLanguage();
  return <section className="banner-wrap"><div className="page-width"><Reveal className={`product-banner tone-${tone} ${flip ? "flip" : ""}`}><div className="banner-copy"><p className="banner-eyebrow">{eyebrow}</p><h2>{title}</h2><p>{text}</p><div className="banner-ctas"><CtaLink>{t("Request a quote", "اطلب عرض سعر")}</CtaLink><a className="banner-link" href="#products">{t("Learn more", "اعرف المزيد")} ›</a></div></div><div className="banner-media"><img src={img} width={1024} height={1024} loading="lazy" alt={title} /></div></Reveal></div></section>;
}
function Banners({ i }: { i: number }) {
  const { t } = useLanguage();
  const b: { tone: string; img: string; eyebrow: string; title: string; text: string; flip?: boolean }[] = [
    { tone: "sky", img: panel, eyebrow: t("Smart control", "التحكم الذكي"), title: t("Every room. One touch.", "كل غرفة. بلمسة واحدة."), text: t("In-wall touch panels for lighting, climate, curtains and scenes — installed and configured by our team.", "لوحات لمس جدارية للإضاءة والتكييف والستائر والمشاهد — يركّبها ويهيئها فريقنا.") },
    { tone: "mist", img: camera, eyebrow: t("Video surveillance", "المراقبة بالكاميرات"), title: t("See everything. Clearly.", "ترى كل شيء. بوضوح."), text: t("High-resolution CCTV, planned camera by camera for the coverage your building needs.", "كاميرات مراقبة عالية الدقة، مخططة كاميرا بكاميرا لتغطية ما يحتاجه مبناك."), flip: true },
    { tone: "sand", img: lock, eyebrow: t("Access control", "التحكم بالدخول"), title: t("The key is you.", "المفتاح هو أنت."), text: t("Fingerprint and code smart locks, connected to your alarm and home system.", "أقفال ذكية بالبصمة والرمز، مرتبطة بالإنذار ونظام المنزل.") },
  ]; const banner = b[i];
  return banner ? <ProductBanner {...banner} /> : null;
}
function Services() {
  const { t } = useLanguage();
  return <section id="services" className="section-space services-section"><div className="page-width"><SectionHead label={t("What we do", "ماذا نقدم")} title={<>{t("Four disciplines.", "أربعة تخصصات.")}<br /><span className="muted-title">{t("One connected vision.", "رؤية واحدة متكاملة.")}</span></>} /><Rail className="service-grid">{services.map((s, i) => <Reveal key={s.id} delay={i * 70} className="service-item"><div id={s.id} className="service-anchor" /><div className="service-image"><img src={s.image} alt={t(s.title[0], s.title[1])} width={1024} height={1024} loading="lazy" /><a className="service-image-link" href="#contact" aria-label={t(`Enquire about ${s.title[0]}`, `استفسر عن ${s.title[1]}`)}><ArrowUpRight /></a></div><h3>{t(s.title[0], s.title[1])}</h3><p>{t(s.description[0], s.description[1])}</p><ul>{s.details.map(d => <li key={d[0]}>{t(d[0], d[1])}</li>)}</ul><a className="text-link" href={`${WHATSAPP}?text=${encodeURIComponent(t(`Hello ORVANA, I would like to discuss ${s.title[0]}.`, `مرحباً أورفانا، أود الاستفسار عن ${s.title[1]}.`))}`} target="_blank" rel="noreferrer">{t("Discuss your project", "ناقش مشروعك")}<ArrowUpRight /></a></Reveal>)}</Rail></div></section>;
}
const layers = [
  { name: ["Connectivity", "الاتصال"], title: ["The backbone of your building.", "العمود الفقري لمبناك."], text: ["From structured cabling to managed Wi-Fi, every room and device starts with a reliable network.", "من الكابلات الهيكلية إلى الواي فاي المُدار، تبدأ كل غرفة وكل جهاز بشبكة موثوقة."], image: rack, specs: [["Structured cabling", "الكابلات الهيكلية"], ["Network installation", "تركيب الشبكات"], ["Wi-Fi coverage", "تغطية الواي فاي"]] },
  { name: ["Protection", "الحماية"], title: ["Every angle. Every entrance.", "كل زاوية. كل مدخل."], text: ["Cameras, intrusion detection, and fire alarms. Selected and installed around the risks of your building.", "كاميرات وكشف الاقتحام وإنذار الحريق. نختارها ونركبها وفق احتياجات الأمان في مبناك."], image: network, specs: [["CCTV", "كاميرات المراقبة"], ["Intrusion alarms", "إنذار الاقتحام"], ["Fire alarms", "إنذار الحريق"]] },
  { name: ["Smart control", "التحكم الذكي"], title: ["A space that responds to you.", "مساحة تستجيب لك."], text: ["Lighting, curtains, climate, and access. Individual controls or thoughtfully coordinated scenes.", "الإضاءة والستائر والتكييف والدخول. تحكم مستقل أو مشاهد منسقة بعناية."], image: smart, specs: [["Lighting & curtains", "الإضاءة والستائر"], ["Climate", "التكييف"], ["Access control", "التحكم بالدخول"]] },
  { name: ["Digital security", "الأمان الرقمي"], title: ["Protection beyond the front door.", "حماية تتجاوز باب المبنى."], text: ["Secure configurations and cybersecurity expertise help protect the network behind your connected systems.", "إعدادات آمنة وخبرة في الأمن السيبراني لحماية الشبكة التي تدعم أنظمتك المتصلة."], image: cyber, specs: [["Security assessment", "تقييم الأمان"], ["System hardening", "تحصين الأنظمة"], ["Digital forensics", "التحقيق الجنائي الرقمي"]] },
 ] as const;
function Systems() {
  const { t } = useLanguage(); const [active, setActive] = useState(0); const layer = layers[active] ?? layers[0]; let touch: number | null = null;
  const [tick, setTick] = useState(0);
  useEffect(() => { if (!window.matchMedia("(max-width: 760px)").matches) return; const id = window.setTimeout(() => setActive(a => (a + 1) % layers.length), 4500); return () => window.clearTimeout(id); }, [active, tick]);
  return <section id="solutions" className="systems-section section-space"><div className="page-width"><SectionHead label={t("Integrated building systems", "أنظمة مبانٍ متكاملة")} title={<>{t("One building.", "مبنى واحد.")}<br />{t("Every system.", "كل الأنظمة.")}</>} center /><div className="systems-tabs" role="tablist" aria-label={t("Building systems", "أنظمة المبنى")}>{layers.map((l, i) => <Button key={l.name[0]} role="tab" id={`layer-tab-${i}`} aria-controls="layer-panel" aria-selected={active === i} variant="ghost" className={active === i ? "active" : ""} onClick={() => setActive(i)}>{t(l.name[0], l.name[1])}</Button>)}</div><div className="system-editorial" onTouchStart={e => { touch = e.touches[0]?.clientX ?? null; }} onTouchEnd={e => { const x = e.changedTouches[0]?.clientX; if (touch == null || x == null || Math.abs(x - touch) < 40) return; const dir = (x < touch ? 1 : -1) * (document.dir === "rtl" ? -1 : 1); setActive(a => (a + dir + layers.length) % layers.length); setTick(n => n + 1); touch = null; }} id="layer-panel" role="tabpanel" aria-labelledby={`layer-tab-${active}`}><div className="system-object" key={layer.name[0]}><div className="technical-lines" aria-hidden /><img src={layer.image} alt={t(layer.title[0], layer.title[1])} width={1024} height={1024} loading="lazy" /></div><div className="system-story" key={`s-${layer.name[0]}`}><p className="section-label">{t(layer.name[0], layer.name[1])}</p><h3>{t(layer.title[0], layer.title[1])}</h3><p>{t(layer.text[0], layer.text[1])}</p><ul>{layer.specs.map(s => <li key={s[0]}><Check />{t(s[0], s[1])}</li>)}</ul><CtaLink secondary>{t("Plan your system", "خطط لنظامك")}</CtaLink></div></div><div className="hero-auto-bars systems-bars" aria-hidden>{layers.map((l, i) => <span key={`${l.name[0]}-${tick}-${active}`} className={active === i ? "on" : active > i ? "done" : ""} />)}</div></div></section>;
}
function HomeWork() {
  const { t } = useLanguage(); const [work, setWork] = useState(false);
  return <section className="home-work section-space"><div className="page-width"><div className="section-heading-row"><SectionHead label={t("Designed around you", "مصمم من أجلك")} title={t("For life. For business.", "للحياة. للأعمال.")} /><div className="segmented"><Button variant="ghost" onClick={() => setWork(false)} aria-pressed={!work} className={!work ? "active" : ""}><House />{t("Home", "المنزل")}</Button><Button variant="ghost" onClick={() => setWork(true)} aria-pressed={work} className={work ? "active" : ""}><Building2 />{t("Business", "الأعمال")}</Button></div></div><div className="home-work-layout"><img src={work ? villa : living} width={1600} height={1008} loading="lazy" alt={t(work ? "Connected building exterior" : "Smart living space", work ? "مبنى متصل" : "مساحة معيشة ذكية")} /><div><h3>{work ? t("Infrastructure that means business.", "بنية تحتية تدعم أعمالك.") : t("A home that feels effortless.", "منزل يجعل الحياة أسهل.")}</h3><p>{work ? t("From offices and factories to schools and hospitals. Networks, security, and smart systems designed for your organization.", "من المكاتب والمصانع إلى المدارس والمستشفيات. شبكات وأمان وأنظمة ذكية مصممة لمؤسستك.") : t("From your front door to the last light at night. Comfort and protection for homes and villas.", "من باب منزلك إلى آخر ضوء في الليل. راحة وحماية للمنازل والفلل.")}</p><ul>{(work ? [["Reliable networks", "شبكات موثوقة"], ["Access & surveillance", "الدخول والمراقبة"], ["Cybersecurity", "الأمن السيبراني"]] : [["Lighting & curtains", "الإضاءة والستائر"], ["Smart entry", "الدخول الذكي"], ["Cameras & alarms", "الكاميرات والإنذارات"]]).map(p => <li key={p[0]}><Check />{t(p[0] ?? "", p[1] ?? "")}</li>)}</ul><CtaLink>{t("Discuss your space", "ناقش احتياجات مساحتك")}</CtaLink></div></div></div></section>;
}
function Products() {
  const { t } = useLanguage(); const [selected, setSelected] = useState<number[]>([]);
  const products = [{ image: smart, label: ["Smart controls & access", "التحكم الذكي والدخول"] }, { image: network, label: ["Network & security equipment", "معدات الشبكة والأمان"] }, { image: cyber, label: ["Digital security hardware", "معدات الأمن الرقمي"] }];
  return <section id="products" className="section-space"><div className="page-width"><SectionHead label={t("Selected technology", "تقنيات مختارة")} title={<>{t("The right equipment.", "المعدات المناسبة.")}<br /><span className="muted-title">{t("For the right system.", "للنظام المناسب.")}</span></>} text={t("Equipment is specified for your project. Final models and availability are confirmed in your written quotation.", "نحدد المعدات وفق مشروعك. تُؤكد الموديلات النهائية والتوافر في عرض السعر المكتوب.")} /><Rail className="product-grid">{products.map((p, i) => <div className="catalogue-product" key={p.label[0]}><img src={p.image} alt={t(p.label[0] ?? "", p.label[1] ?? "")} width={1024} height={1024} loading="lazy" /><h3>{t(p.label[0] ?? "", p.label[1] ?? "")}</h3><Button variant="clean" onClick={() => setSelected(s => s.includes(i) ? s.filter(n => n !== i) : [...s, i])} aria-pressed={selected.includes(i)}>{selected.includes(i) ? <Check /> : <Plus />}{selected.includes(i) ? t("Added to enquiry", "أُضيف للاستفسار") : t("Add to enquiry", "أضف للاستفسار")}</Button></div>)}</Rail>{selected.length > 0 && <div className="quote-summary"><p>{t(`${selected.length} equipment categories selected`, `تم اختيار ${selected.length} من فئات المعدات`)}</p><CtaLink href={`${WHATSAPP}?text=${encodeURIComponent(t("Hello ORVANA, please quote: ", "مرحباً أورفانا، أرجو عرض سعر لـ: ") + selected.map(i => t(products[i]?.label[0] ?? "", products[i]?.label[1] ?? "")).join(", "))}`}>{t("Send your enquiry", "أرسل استفسارك")}</CtaLink></div>}</div></section>;
}
function Projects() {
  const { t } = useLanguage();
  return <section id="projects" className="projects-section section-space"><div className="page-width"><div className="projects-header"><div><p className="section-label">{t("Built on experience", "خبرة على أرض الواقع")}</p><h2><span>+17</span> {t("projects.", "مشروعاً.")}</h2></div><div><p>{t("Homes. Offices. Shops. Factories.", "منازل. مكاتب. متاجر. مصانع.")}</p><p>{t("Based in Damascus. Working across Syria.", "مقرنا دمشق. نعمل في جميع أنحاء سوريا.")}</p><a className="text-link" href="#contact">{t("Talk about your project", "تحدث عن مشروعك")}<ArrowUpRight /></a></div></div><ProjectMap /></div></section>;
}
function Process() {
  const { t } = useLanguage();
  const steps = [{ icon: ScanLine, title: ["Understand", "نفهم"], text: ["A conversation and site assessment. Your needs come first.", "محادثة وتقييم للموقع. احتياجاتك أولاً."] }, { icon: DraftingCompass, title: ["Design", "نصمم"], text: ["Coordinated drawings, cable routes, and the right equipment.", "مخططات متناسقة ومسارات كابلات ومعدات مناسبة."] }, { icon: Cable, title: ["Install", "نركب"], text: ["Clean cabling. Careful installation. Professional execution.", "كابلات منظمة وتركيب دقيق وتنفيذ احترافي."] }, { icon: Settings2, title: ["Configure", "نهيئ"], text: ["Systems tested. Access configured. Every detail checked.", "اختبار الأنظمة وتهيئة الصلاحيات وفحص كل التفاصيل."] }, { icon: ClipboardCheck, title: ["Handover", "نسلم"], text: ["Documentation, training, and control in your hands.", "توثيق وتدريب وتحكم كامل بين يديك."] }, { icon: Headset, title: ["Support", "ندعم"], text: ["Maintenance and technical support beyond installation.", "صيانة ودعم فني بعد التركيب."] }];
  return <section id="process" className="section-space"><div className="page-width"><SectionHead label={t("How we work", "طريقة عملنا")} title={<>{t("From the first conversation.", "من أول محادثة.")}<br /><span className="muted-title">{t("To the final detail.", "إلى آخر تفصيل.")}</span></>} /><Rail className="process-grid">{steps.map((s, i) => <Reveal key={s.title[0]} delay={i * 60} className="process-step"><div className="step-top"><s.icon strokeWidth={1.2} /><span>0{i + 1}</span></div><h3>{t(s.title[0] ?? "", s.title[1] ?? "")}</h3><p>{t(s.text[0] ?? "", s.text[1] ?? "")}</p><div className="step-progress" /></Reveal>)}</Rail></div></section>;
}
function Digital() {
  const { t } = useLanguage();
  return <section className="digital-section section-space"><div className="page-width digital-layout"><div><SectionHead label={t("Beyond the building", "ما وراء المبنى")} title={<>{t("Your business.", "أعمالك.")}<br />{t("Better connected.", "أكثر اتصالاً.")}</>} text={t("Cybersecurity, digital forensics, and thoughtful website design. The digital expertise behind your next chapter.", "أمن سيبراني وتحقيق جنائي رقمي وتصميم مواقع مدروس. الخبرة الرقمية التي تدعم خطوتك القادمة.")} /><div className="digital-links"><a href="#cyber">{t("Cybersecurity & digital forensics", "الأمن السيبراني والتحقيق الرقمي")}<ArrowUpRight /></a><a href="#web">{t("Website design & digital solutions", "تصميم المواقع والحلول الرقمية")}<ArrowUpRight /></a></div></div><img src={web} alt={t("Website design on a desktop display", "تصميم موقع على شاشة حاسوب")} width={1024} height={1024} loading="lazy" /></div></section>;
}
const faqs = [
  [["What services does ORVANA offer?", "ما الخدمات التي تقدمها أورفانا؟"], ["Four main areas: smart systems, networking and security systems, cybersecurity including digital forensics, and website design and digital solutions.", "أربعة مجالات رئيسية: الأنظمة الذكية، والشبكات وأنظمة الأمان، والأمن السيبراني بما يشمل التحقيق الجنائي الرقمي، وتصميم المواقع والحلول الرقمية."]],
  [["Can I start with just one system?", "هل يمكنني البدء بنظام واحد فقط؟"], ["Yes. Start with the system you need now. We plan the infrastructure to allow for future additions where possible.", "نعم. ابدأ بالنظام الذي تحتاجه الآن. نخطط للبنية التحتية لتسمح بالإضافات المستقبلية حيثما أمكن."]],
  [["Do you work with buildings under construction?", "هل تعملون مع المباني قيد الإنشاء؟"], ["Yes. Cable routes and equipment positions can be coordinated before walls are closed, alongside your contractor.", "نعم. يمكن تنسيق مسارات الكابلات ومواقع المعدات بالتعاون مع المقاول قبل إغلاق الجدران."]],
  [["How do I get a quotation?", "كيف أحصل على عرض سعر؟"], ["Contact us by phone or WhatsApp. We discuss your building and needs, then provide a written quotation after the required assessment.", "تواصل معنا عبر الهاتف أو واتساب. نناقش المبنى واحتياجاتك، ثم نقدم عرض سعر مكتوباً بعد التقييم المطلوب."]],
  [["Is support available after installation?", "هل يتوفر دعم بعد التركيب؟"], ["Yes. Documentation, training, maintenance, and after-installation support are discussed as part of your project. Warranty terms are confirmed in your quotation.", "نعم. نناقش التوثيق والتدريب والصيانة والدعم بعد التركيب ضمن مشروعك. تُؤكد شروط الضمان في عرض السعر."]],
  [["Where do you work?", "أين تعملون؟"], ["We are based in Damascus and work across Syria. Contact us to discuss your location or arrange a showroom visit.", "مقرنا دمشق ونعمل في جميع أنحاء سوريا. تواصل معنا لمناقشة موقعك أو ترتيب زيارة لصالة العرض."]],
];
function Faq() {
  const { t } = useLanguage();
  return <section id="faq" className="faq-section section-space"><div className="page-width faq-layout"><SectionHead label={t("A little clarity", "إجابات واضحة")} title={<>{t("Good questions.", "أسئلة مهمة.")}<br />{t("Clear answers.", "إجابات واضحة.")}</>} /><Accordion type="single" collapsible className="faq-list">{faqs.map((f, i) => <AccordionItem value={`q${i}`} className="faq-item" key={i}><AccordionTrigger className="faq-question">{t(f[0]?.[0] ?? "", f[0]?.[1] ?? "")}</AccordionTrigger><AccordionContent><p>{t(f[1]?.[0] ?? "", f[1]?.[1] ?? "")}</p></AccordionContent></AccordionItem>)}</Accordion></div></section>;
}
function Contact() {
  const { t } = useLanguage();
  return <section id="contact" className="contact-section section-space"><div className="page-width"><Reveal><p className="section-label">{t("Your next project", "مشروعك القادم")}</p><h2>{t("Let's connect", "لنجعل كل شيء")}<br /><span>{t("the possibilities.", "متصلاً.")}</span></h2><div className="contact-actions"><CtaLink href={WHATSAPP}>{t("Start on WhatsApp", "ابدأ عبر واتساب")}</CtaLink><a className="contact-phone" href={`tel:${PHONE}`} dir="ltr">{PHONE_DISPLAY}<ArrowUpRight /></a></div><p>{t("Damascus, Syria. One conversation is all it takes to begin.", "دمشق، سوريا. البداية تحتاج إلى محادثة واحدة فقط.")}</p></Reveal></div></section>;
}
export default function Index() {
  return <LanguageProvider><div className="orvana-site"><Header /><main><Hero /><Trust /><Services /><Banners i={0} /><Systems /><Banners i={1} /><HomeWork /><Products /><Banners i={2} /><Projects /><Process /><Digital /><Faq /><Contact /></main><Footer /></div></LanguageProvider>;
}
