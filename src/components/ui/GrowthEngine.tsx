"use client";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
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
type Point = { x: number; y: number };
export function GrowthEngine() {
  const id = useId();
  const figure = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const pulse = useRef<HTMLSpanElement>(null);
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
        return { x: rect ? rect.left-origin.left+rect.width/2 : 0, y: rect ? rect.top-origin.top+rect.height/2 : 0 };
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
    if (!auto || points.length !== stages.length || !pulse.current?.animate) { setTravelling(false); return; }
    let cancelled = false;
    let animation: Animation | undefined;
    const timer = window.setTimeout(() => {
      const next = (selected+1)%stages.length;
      const from = points[selected], to = points[next];
      // Complete the pulse transfer BEFORE activating the next description.
      const vertical = Math.abs(to.y-from.y) > Math.abs(to.x-from.x);
      const arc = next === 0 ? -18 : -5;
      const frames = Array.from({length:33},(_,index) => {
        const t=index/32, bend=Math.sin(Math.PI*t)*arc;
        return { transform: `translate3d(${from.x+(to.x-from.x)*t+(vertical?bend:0)}px,${from.y+(to.y-from.y)*t+(vertical?0:bend)}px,0)`, opacity: Math.min(1,t*8,(1-t)*8), offset:t };
      });
      setTravelling(true);
      animation=pulse.current?.animate(frames,{duration:1100,easing:'cubic-bezier(.4,0,.2,1)',fill:'none',id:'wd-journey-pulse'});
      animation?.finished.then(() => {
        if (!cancelled) { setTravelling(false); setSelected(next); }
      }).catch(() => { /* Cancelled by pause/focus/resize/visibility or unmount. */ });
    }, 4800);
    return () => { cancelled=true; window.clearTimeout(timer); animation?.cancel(); };
  }, [auto, selected, points]);
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
  return <figure ref={figure} className={styles.engine} aria-label="WD growth system overview" data-growth-engine data-selected={selected} data-phase={travelling?'travelling':auto?'reading':'paused'} data-animate={sceneEnabled?'on':'off'} onPointerEnter={event=>{if(event.pointerType==='mouse')setHovered(true);}} onPointerLeave={()=>setHovered(false)} onFocusCapture={event=>{if(!(event.target as HTMLElement).closest('[data-journey-control]'))setFocused(true);}} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget))setFocused(false);}}>
    <div className={styles.top}><strong>WD / Growth system</strong><button data-journey-control type="button" className={styles.play} aria-label={playing?'Pause journey':'Play journey'} onClick={()=>{setFocused(false);setPlaying(value=>!value);}}><span>{playing?'Pause journey':'Play journey'}</span><Icon name={playing?'pause':'play'}/></button></div>
    <div className={styles.intro}><p>From being discovered<br/><span>to being chosen.</span></p></div>
    <div ref={rail} className={styles.rail}>
      <svg className={styles.connections} aria-hidden="true" focusable="false"><path d={path}/></svg>
      <span ref={pulse} className={styles.pulse} aria-hidden="true"/>
      <ol className={styles.stages} aria-label="Customer journey stages">
        {stages.map((item,index)=><li key={item.title} className={styles.stage}><button ref={element=>{buttons.current[index]=element;}} type="button" id={`${id}-stage-${index}`} aria-pressed={selected===index} aria-controls={`${id}-detail`} className={styles.stageButton} onClick={()=>choose(index)} onKeyDown={event=>onKey(event,index)}><span data-stage-icon className={styles.number}><StageIcon name={item.icon}/></span><span className={styles.stageTitle}>{item.title}</span></button></li>)}
      </ol>
    </div>
    <div className={styles.detail} id={`${id}-detail`} role="region" aria-labelledby={`${id}-stage-${selected}`} aria-live={auto?'off':'polite'} aria-atomic="true" data-journey-detail>
      <div className={styles.detailStack}>{stages.map((item,index)=><div key={item.title} className={styles.detailSlide} data-current={index===selected} aria-hidden={index!==selected} inert={index!==selected}>
        <span className={styles.detailIcon}><StageIcon name={item.icon}/></span>
        <div><p className={styles.detailIndex}>0{index+1} / {item.title}</p><p className={styles.detailHeading}>{item.heading}</p><p className={styles.detailCopy}>{item.copy}</p></div>
      </div>)}</div>
      <Link href={stages[selected].href} className={styles.detailLink}>{stages[selected].link}<ArrowIcon/></Link>
    </div>
    <figcaption className={styles.caption}>A connected customer journey — not a live analytics report or a promise of results.</figcaption>
  </figure>;
}
