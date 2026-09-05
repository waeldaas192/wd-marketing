"use client";
import { useEffect, useRef } from "react";

const nodes = [
  ["SEARCH", 9, 57], ["TRAFFIC", 29, 33], ["EXPERIENCE", 50, 57],
  ["LEAD", 71, 32], ["REVENUE", 91, 56],
] as const;

export function GrowthEngine() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      el.style.setProperty("--rx", `${y*-3}deg`);
      el.style.setProperty("--ry", `${x*4}deg`);
    };
    const reset=()=>{el.style.setProperty("--rx","0deg");el.style.setProperty("--ry","0deg");};
    el.addEventListener("pointermove",move); el.addEventListener("pointerleave",reset);
    return()=>{el.removeEventListener("pointermove",move);el.removeEventListener("pointerleave",reset);};
  },[]);
  return <div ref={ref} className="growth-engine" aria-label="WD Growth Engine">
    <div className="engine-top"><span>WD / GROWTH ENGINE</span><span className="live">● LIVE SYSTEM</span></div>
    <svg viewBox="0 0 1000 360" className="engine-map" aria-hidden="true">
      <defs><linearGradient id="flow"><stop stopColor="#5B7CFF"/><stop offset=".55" stopColor="#7B61FF"/><stop offset="1" stopColor="#62D9B7"/></linearGradient></defs>
      <path className="path-base" d="M80 205 C180 205 185 110 285 110 S405 205 500 205 S615 105 710 105 S820 200 920 200"/>
      <path className="path-flow" d="M80 205 C180 205 185 110 285 110 S405 205 500 205 S615 105 710 105 S820 200 920 200"/>
    </svg>
    {nodes.map(([label,x,y],i)=><div key={label} className="engine-node" style={{left:`${x}%`,top:`${y}%`,animationDelay:`${.25+i*.12}s`}}>
      <i/><small>0{i+1}</small><strong>{label}</strong>
    </div>)}
    <div className="metric ma"><small>INTENT</small><strong>HIGH</strong></div>
    <div className="metric mb"><small>SYSTEM</small><strong>CONNECTED</strong></div>
    <div className="engine-caption">Attention becomes measurable opportunity.</div>
  </div>;
}
