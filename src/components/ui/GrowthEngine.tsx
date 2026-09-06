"use client";
import Link from "next/link";
import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { useMotionPreference } from "@/lib/motion-preferences";
import { ArrowIcon, Icon } from "./Icons";
import styles from "./GrowthEngine.module.css";

const stages = [
  { title: "Search", heading: "Be found for the right reason.", copy: "Connect technical SEO, useful content and local search to the problems your customers are trying to solve.", href: "/services/seo", link: "Explore organic growth", icon: "search" },
  { title: "Traffic", heading: "Bring intent, not just visits.", copy: "Connect relevant search and paid campaigns to a clear offer, so the next click has a reason to become an enquiry.", href: "/services/paid-acquisition", link: "Explore paid acquisition", icon: "traffic" },
  { title: "Experience", heading: "Make the next step feel obvious.", copy: "Fast pages, useful proof and clear calls to action help visitors understand your offer on every screen.", href: "/services/web-conversion", link: "Explore web and conversion", icon: "experience" },
  { title: "Enquiry", heading: "Turn interest into a conversation.", copy: "Remove unnecessary form friction and connect enquiries to a follow-up process that your team can actually use.", href: "/services/web-conversion", link: "Explore conversion design", icon: "enquiry" },
  { title: "Revenue", heading: "Measure what happens after the click.", copy: "Connect lead quality, CRM outcomes and acquisition costs before deciding where to invest next.", href: "/services/growth-infrastructure", link: "Explore growth infrastructure", icon: "revenue" },
] as const;
type IconName = (typeof stages)[number]["icon"];
function StageIcon({ name }: { name: IconName }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {name === "search" && <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></>}
    {name === "traffic" && <><path d="M4 19h16M6 15v-4m6 4V7m6 8V3"/></>}
    {name === "experience" && <><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/></>}
    {name === "enquiry" && <><path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-6 3V6a2 2 0 0 1 2-2Z"/><path d="M7 9h10M7 13h6"/></>}
    {name === "revenue" && <><path d="M3 17 9 11l4 3 8-10m-6 0h6v6"/><path d="M3 21h18"/></>}
  </svg>;
}
type Point = { x: number; y: number; size: number };
// Travel is faster; the reading interval remains long enough to inspect the copy.
const READ_MS = 3600;
const TRANSFER_MS = 720;
const SLIDE_MS = 560;
export function GrowthEngine() {
  const id = useId();
  const figure = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const pulse = useRef<SVGGElement>(null);
  const receiver = useRef<SVGRectElement>(null);
  const drop = useRef<SVGEllipseElement>(null);
  const detail = useRef<HTMLDivElement>(null);
  const slides = useRef<(HTMLDivElement | null)[]>([]);
  const prior = useRef(0);
  const slideAnimations = useRef<Animation[]>([]);
  const [receiving, setReceiving] = useState<number | null>(null);
  const filterId = `wd-liquid-${id.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [selected, setSelected] = useState(0);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [travelling, setTravelling] = useState(false);
  const { enabled } = useMotionPreference();
  const sceneEnabled = enabled && inView && pageVisible;
  const auto = sceneEnabled && playing && !hovered && !focused;
  useEffect(() => {
    const element = figure.current, track = rail.current;
    if (!element || !track) return;
    const measure = () => {
      const origin = track.getBoundingClientRect();
      const next = buttons.current.map(button => {
        const rect = button?.querySelector('[data-stage-icon]')?.getBoundingClientRect();
        return { x: rect ? rect.left-origin.left+rect.width/2 : 0, y: rect ? rect.top-origin.top+rect.height/2 : 0, size: rect?.width || 58 };
      });
      setPoints(current => JSON.stringify(current) === JSON.stringify(next) ? current : next);
    };
    measure();
    const resize = new ResizeObserver(measure); resize.observe(track);
    buttons.current.forEach(button => { if (button) resize.observe(button); });
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .15 });
    observer.observe(element);
    const visibility = () => setPageVisible(!document.hidden);
    visibility(); document.addEventListener('visibilitychange', visibility);
    return () => { observer.disconnect(); resize.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  useEffect(() => {
    if (!auto || points.length !== stages.length || !pulse.current?.animate) {
      setTravelling(false); setReceiving(null); return;
    }
    let cancelled = false;
    const animations: Animation[] = [];
    const timer = window.setTimeout(() => {
      const next = (selected + 1) % stages.length;
      const from = points[selected], to = points[next];
      const vx = to.x - from.x, vy = to.y - from.y;
      const distance = Math.max(1, Math.hypot(vx, vy));
      const angle = Math.atan2(vy, vx) * 180 / Math.PI;
      const vertical = Math.abs(vy) > Math.abs(vx);
      setReceiving(next); setTravelling(true);
      const surface = receiver.current;
      if (surface) {
        surface.setAttribute("x", String(to.x - to.size / 2));
        surface.setAttribute("y", String(to.y - to.size / 2));
        surface.setAttribute("width", String(to.size));
        surface.setAttribute("height", String(to.size));
        surface.setAttribute("rx", String(to.size < 54 ? 18 : 20));
      }
      // Slow release, faster attraction; elongate in the direction of travel and
      // shrink into the receiving surface. Only the coloured liquid is filtered.
      const frames = Array.from({ length: 49 }, (_, index) => {
        const t = index / 48, progress = t * t * (2 - t);
        const bend = Math.sin(Math.PI * progress) * (next === 0 ? -22 : -4);
        return { transform: `translate(${from.x + vx * progress + (vertical ? bend : 0)}px,${from.y + vy * progress + (vertical ? 0 : bend)}px)`, opacity: t < .12 ? t / .12 : 1, offset: t };
      });
      const animation = pulse.current!.animate(frames, { duration: TRANSFER_MS, easing: "linear", fill: "both", id: "wd-journey-pulse" });
      animations.push(animation);
      const shape = drop.current?.animate([
        { transform: `rotate(${angle}deg) scale(.7)`, offset: 0 },
        { transform: `rotate(${angle}deg) scale(1.05,1)`, offset: .52 },
        { transform: `rotate(${angle}deg) scale(1.9,.72)`, offset: .82 },
        { transform: `rotate(${angle}deg) scale(.2,.3)`, offset: 1 },
      ], { duration: TRANSFER_MS, fill: "both", id: "wd-liquid-stretch" });
      if (shape) animations.push(shape);
      const surfaceAnimation = surface?.animate([
        { opacity: 0, offset: 0 }, { opacity: 0, offset: .58 },
        { opacity: .85, offset: .78 }, { opacity: 1, offset: 1 },
      ], { duration: TRANSFER_MS, fill: "both", id: "wd-liquid-merge" });
      if (surfaceAnimation) animations.push(surfaceAnimation);
      const target = buttons.current[next]?.querySelector<HTMLElement>("[data-stage-icon]");
      const attraction = target?.animate([
        { transform: "none", offset: 0 }, { transform: "none", offset: .58 },
        { transform: `translate(${-vx / distance * 3}px,${-vy / distance * 3}px) scale(1.055)`, offset: .83 },
        { transform: "none", offset: 1 },
      ], { duration: TRANSFER_MS, easing: "ease-in-out", id: "wd-icon-attraction" });
      if (attraction) animations.push(attraction);
      animation.finished.then(() => {
        if (cancelled) return;
        // Description activation is gated by real arrival, not a parallel timer.
        setTravelling(false); setReceiving(null); setSelected(next);
      }).catch(() => { /* Interruption retains the last completed stage. */ });
    }, READ_MS);
    return () => { cancelled = true; window.clearTimeout(timer); animations.forEach(animation => animation.cancel()); };
  }, [auto, selected, points]);

  useLayoutEffect(() => {
    let cancelled = false;
    const previous = prior.current;
    prior.current = selected;
    const clear = () => {
      slideAnimations.current.forEach(animation => animation.cancel());
      slideAnimations.current = [];
      slides.current.forEach(slide => { if (slide) delete slide.dataset.exiting; });
      if (detail.current) detail.current.dataset.sliderState = "idle";
    };
    clear();
    const outgoing = slides.current[previous], incoming = slides.current[selected];
    if (!sceneEnabled || previous === selected || !outgoing || !incoming || !incoming.animate) return clear;
    outgoing.dataset.exiting = "true";
    if (detail.current) detail.current.dataset.sliderState = "moving";
    const options = { duration: SLIDE_MS, easing: "cubic-bezier(.65,0,.35,1)", fill: "both" as FillMode };
    const exit = outgoing.animate([
      { transform: "translateX(0)", opacity: 1 },
      { transform: "translateX(-104%)", opacity: .25 },
    ], { ...options, id: "wd-description-exit" });
    const enter = incoming.animate([
      { transform: "translateX(104%)", opacity: .25 },
      { transform: "translateX(0)", opacity: 1 },
    ], { ...options, id: "wd-description-enter" });
    slideAnimations.current = [exit, enter];
    Promise.all([exit.finished, enter.finished]).then(() => { if (!cancelled) clear(); }).catch(() => {});
    return () => { cancelled = true; clear(); };
  }, [selected, sceneEnabled]);
  function choose(index: number) { setPlaying(false); setTravelling(false); setSelected(index); }
  function onKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key==='ArrowRight'||event.key==='ArrowDown') next=(index+1)%stages.length;
    else if (event.key==='ArrowLeft'||event.key==='ArrowUp') next=(index+stages.length-1)%stages.length;
    else if(event.key==='Home') next=0;
    else if(event.key==='End') next=stages.length-1;
    else return;
    event.preventDefault(); choose(next); buttons.current[next]?.focus();
  }
  const start = points[0], end = points[points.length-1];
  const path = start && end ? `M ${start.x} ${start.y} L ${end.x} ${end.y}` : '';
  return <figure ref={figure} className={styles.engine} aria-label="WD growth system overview" data-growth-engine data-transfer-ms={TRANSFER_MS} data-selected={selected} data-phase={travelling?'travelling':auto?'reading':'paused'} data-animate={sceneEnabled?'on':'off'} onPointerEnter={event=>{if(event.pointerType==='mouse')setHovered(true);}} onPointerLeave={()=>setHovered(false)} onFocusCapture={event=>{if(!(event.target as HTMLElement).closest('[data-journey-control]'))setFocused(true); if(detail.current?.contains(event.target as Node)){slideAnimations.current.forEach(animation=>animation.finish());}}} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget))setFocused(false);}}>
    <div className={styles.top}><strong>WD / Growth system</strong><button data-journey-control type="button" className={styles.play} aria-label={playing?'Pause journey':'Play journey'} onClick={()=>{setFocused(false);setPlaying(value=>!value);}}><span>{playing?'Pause journey':'Play journey'}</span><Icon name={playing?'pause':'play'}/></button></div>
    <div className={styles.intro}><p>From being discovered<br/><span>to being chosen.</span></p></div>
    <div ref={rail} className={styles.rail}>
      <svg className={styles.connections} aria-hidden="true" focusable="false"><path d={path}/></svg>
      <svg className={styles.liquid} aria-hidden="true" focusable="false" data-liquid-layer data-active={travelling}>
        <defs><filter id={filterId} x="-50%" y="-100%" width="200%" height="300%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="soft"/>
          <feColorMatrix in="soft" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"/>
        </filter></defs>
        <g filter={`url(#${filterId})`}>
          <rect ref={receiver} className={styles.receiver}/>
          <g ref={pulse} className={styles.pulse}><ellipse ref={drop} rx="10" ry="8" className={styles.drop}/></g>
        </g>
      </svg>
      <ol className={styles.stages} aria-label="Customer journey stages">
        {stages.map((item,index)=><li key={item.title} className={styles.stage}><button ref={element=>{buttons.current[index]=element;}} type="button" id={`${id}-stage-${index}`} aria-pressed={selected===index} aria-controls={`${id}-detail`} className={styles.stageButton} onClick={()=>choose(index)} onKeyDown={event=>onKey(event,index)}><span data-stage-icon data-receiving={receiving===index} className={styles.number}><StageIcon name={item.icon}/></span><span className={styles.stageTitle}>{item.title}</span></button></li>)}
      </ol>
    </div>
    <div ref={detail} className={styles.detail} id={`${id}-detail`} role="region" aria-labelledby={`${id}-stage-${selected}`} aria-live={auto?'off':'polite'} aria-atomic="true" data-journey-detail>
      <div className={styles.detailViewport}><div className={styles.detailStack}>{stages.map((item,index)=><div key={item.title} ref={element=>{slides.current[index]=element;}} className={styles.detailSlide} data-current={index===selected} aria-hidden={index!==selected} inert={index!==selected}>
        <span className={styles.detailIcon}><StageIcon name={item.icon}/></span>
        <div><p className={styles.detailIndex}>0{index+1} / {item.title}</p><p className={styles.detailHeading}>{item.heading}</p><p className={styles.detailCopy}>{item.copy}</p>
          <Link href={item.href} className={styles.detailLink}>{item.link}<ArrowIcon/></Link>
        </div>
      </div>)}</div></div>
    </div>
    <figcaption className={styles.caption}>A connected customer journey — not a live analytics report or a promise of results.</figcaption>
  </figure>;
}
