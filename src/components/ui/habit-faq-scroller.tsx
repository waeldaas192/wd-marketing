"use client";

import { Children, useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { initialiseMotionPreference, useMotionPreference } from "@/lib/motion-preferences";
import { cn } from "@/lib/utils";

export interface FaqItem { id: string; question: string; answer: string }
export type ScrollDirection = "left" | "right";
export type ScrollDuration = `${number}s` | `${number}ms`;
export interface FaqRow {
  id: string;
  label?: string;
  speed?: ScrollDuration;
  direction?: ScrollDirection;
  faqItems: readonly FaqItem[];
}
export interface FaqSectionData {
  mainTitle: string;
  mainSubtitle: string;
  rows: readonly FaqRow[];
}
export interface FaqCardProps { question: string; answer: string; className?: string }

/** Text-only cards deliberately have no DOM IDs or interactive descendants to duplicate. */
export function FaqCard({ question, answer, className }: FaqCardProps) {
  return <article className={cn("faq-card flex shrink-0 flex-col items-start gap-4 rounded-[24px] bg-white p-6", className)}>
    <h3 className="faq-title">{question}</h3>
    <p className="faq-answer">{answer}</p>
  </article>;
}

export interface HorizontalScrollerProps {
  children: ReactNode;
  speed?: ScrollDuration;
  direction?: ScrollDirection;
  paused?: boolean;
  readAll?: boolean;
  label?: string;
}

/** The two equal groups travel one half-track. Repeat short rows to avoid wide-screen gaps. */
export function HorizontalScroller({ children, speed = "40s", direction = "left", paused = false, readAll = false, label = "Frequently asked questions" }: HorizontalScrollerProps) {
  const viewport = useRef<HTMLDivElement>(null);
  const original = useRef<HTMLDivElement>(null);
  const [device, setDevice] = useState<"static" | "manual" | "marquee">("static");
  const [copies, setCopies] = useState(1);
  const [measured, setMeasured] = useState(false);
  const [inView, setInView] = useState(false);
  const [awake, setAwake] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const { enabled, reduced, paused: globalPaused } = useMotionPreference();
  const layout = readAll || reduced || globalPaused || !enabled ? "static" : device;
  const running = layout === "marquee" && measured && inView && awake && !paused && !hovered && !focused;
  const duration = /^(?:\d+\.?\d*|\.\d+)(?:ms|s)$/.test(speed) && parseFloat(speed) > 0 ? speed : "40s";
  const style: CSSProperties & { "--scroll-duration": string } = { "--scroll-duration": duration };
  const items = Children.toArray(children);

  useEffect(() => {
    initialiseMotionPreference();
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateDevice = () => {
      // Root-text enlargement gets the readable/manual layout as well as narrow screens.
      const rootSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      setDevice(pointer.matches && window.innerWidth >= 48 * rootSize ? "marquee" : "manual");
    };
    const visibility = () => setAwake(!document.hidden);
    updateDevice(); visibility();
    pointer.addEventListener("change", updateDevice);
    window.addEventListener("resize", updateDevice);
    const rootObserver = new MutationObserver(updateDevice);
    rootObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "class"] });
    document.addEventListener("visibilitychange", visibility);
    const element = viewport.current;
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 });
    if (element) { if (observer) observer.observe(element); else setInView(true); }
    return () => {
      pointer.removeEventListener("change", updateDevice);
      window.removeEventListener("resize", updateDevice);
      document.removeEventListener("visibilitychange", visibility);
      rootObserver.disconnect(); observer?.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    const windowElement = viewport.current, sequence = original.current;
    if (!windowElement || !sequence || layout !== "marquee") { setMeasured(false); return; }
    const measure = () => {
      const width = sequence.offsetWidth;
      if (!width) return;
      setCopies(Math.max(1, Math.ceil(windowElement.clientWidth / width)));
      setMeasured(true);
    };
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(windowElement); observer.observe(sequence);
    return () => observer.disconnect();
  }, [layout, children]);

  if (!items.length) return null;
  function sequence(copy: number, clone: boolean) {
    return <div key={copy} ref={!clone ? original : undefined} className="faq-sequence flex shrink-0 items-stretch" data-faq-sequence data-faq-clone={clone ? "" : undefined} aria-hidden={clone ? true : undefined} inert={clone ? true : undefined}>
      {items}
    </div>;
  }
  return <div ref={viewport} className="faq-scroller-row scroller-mask group relative w-full" role="group" aria-label={label} tabIndex={layout === "manual" ? 0 : undefined} data-faq-row data-layout={layout} data-direction={direction} data-running={running} onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }} onPointerLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <div className={cn("faq-scroller-track flex", direction === "right" ? "animate-scroll-horizontal-reverse" : "animate-scroll-horizontal")} style={style}>
      <div className="faq-loop-group flex shrink-0" data-faq-loop-group>
        {Array.from({ length: copies }, (_, copy) => sequence(copy, copy !== 0))}
      </div>
      <div className="faq-loop-group faq-loop-copy flex shrink-0" data-faq-loop-group data-faq-clone="" aria-hidden="true" inert>
        {Array.from({ length: copies }, (_, copy) => sequence(copy, true))}
      </div>
    </div>
  </div>;
}

export interface FaqSectionProps {
  data: FaqSectionData;
  id?: string;
  headingId?: string;
  kicker?: string;
  className?: string;
  contactHref?: string;
}

export default function FaqSection({ data, id = "faq", headingId, kicker = "Before we start", className, contactHref = "/contact" }: FaqSectionProps) {
  const instance = useId();
  const titleId = headingId ?? `${instance}-heading`;
  const rowsId = `${instance}-rows`;
  const [paused, setPaused] = useState(false);
  const [readAll, setReadAll] = useState(false);
  const [enhanced, setEnhanced] = useState(false);
  const { enabled } = useMotionPreference();
  useEffect(() => { initialiseMotionPreference(); setEnhanced(true); }, []);
  return <section id={id} aria-labelledby={titleId} className={cn("section faq-scroller-section relative w-full", className)} data-studio-section="faq" data-faq-section data-enhanced={enhanced} data-read-all={readAll}>
    <div className="container flex min-w-0 flex-col items-center gap-8">
      <header className="faq-scroller-heading relative z-10 text-center" data-reveal>
        <p className="eyebrow">{kicker}</p>
        <h2 id={titleId} className="h2">{data.mainTitle}</h2>
        <p className="faq-subtitle">{data.mainSubtitle}</p>
      </header>
      <div className="faq-controls" role="group" aria-label="FAQ display controls">
        <button type="button" className="button button-ghost" aria-controls={rowsId} onClick={() => setPaused(value => !value)} hidden={readAll || !enabled}>
          {paused ? "Resume FAQ scrolling" : "Pause FAQ scrolling"}
        </button>
        <button type="button" className="button button-ghost" aria-controls={rowsId} aria-pressed={readAll} onClick={() => setReadAll(value => !value)}>Read all questions</button>
      </div>
      <div id={rowsId} className="faq-scroller-rows relative z-10 flex w-full min-w-0 flex-col gap-6">
        {data.rows.map((row, index) => <HorizontalScroller key={row.id} label={row.label ?? `FAQ row ${index + 1}`} speed={row.speed} direction={row.direction} paused={paused} readAll={readAll}>
          {row.faqItems.map(item => <FaqCard key={item.id} question={item.question} answer={item.answer} />)}
        </HorizontalScroller>)}
      </div>
      <p className="faq-scroller-contact">Have a different question? <Link href={contactHref}>Tell us about your project.</Link></p>
    </div>
  </section>;
}
