"use client";
import { Children, useRef, useState, type ReactNode } from "react";

/** Grid on desktop, swipeable snap slider with dots on phones (styles: .m-rail). */
export function Rail({ children, className = "", label }: { children: ReactNode; className?: string; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = Children.count(children);
  const onScroll = () => {
    const el = ref.current; const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    const step = first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
    setActive(Math.min(count - 1, Math.round(Math.abs(el.scrollLeft) / step)));
  };
  const go = (i: number) => {
    const el = ref.current; const item = el?.children[i] as HTMLElement | undefined;
    if (el && item) el.scrollTo({ left: item.offsetLeft - el.offsetLeft - (el.offsetWidth - item.offsetWidth) / 2, behavior: "smooth" });
  };
  return <>
    <div ref={ref} className={`${className} m-rail`} onScroll={onScroll} aria-label={label}>{children}</div>
    <div className="m-dots" aria-hidden>{Array.from({ length: count }, (_, i) => <button key={i} type="button" tabIndex={-1} className={i === active ? "on" : ""} onClick={() => go(i)} />)}</div>
  </>;
}
