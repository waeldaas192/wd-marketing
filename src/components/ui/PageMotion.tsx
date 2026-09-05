"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useMotionPreference } from "@/lib/motion-preferences";
// One observer for the page. Server-rendered content is never hidden awaiting JS.
export function PageMotion() {
  const pathname=usePathname();const {enabled}=useMotionPreference();
  useEffect(()=>{
    if(!enabled||!('IntersectionObserver' in window))return;
    const animations=new Set<Animation>();
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        observer.unobserve(entry.target);
        const element=entry.target as HTMLElement;
        if(element.dataset.revealed==='true')return;
        element.dataset.revealed='true';
        const animation=element.animate([{opacity:.45,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)'}],{duration:580,easing:'cubic-bezier(.16,1,.3,1)',fill:'none'});
        animations.add(animation);animation.onfinish=()=>animations.delete(animation);
      });
    },{threshold:.12});
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(element=>{
      // Do not fade already visible text or delay the initial CTA.
      if(element.getBoundingClientRect().top<window.innerHeight)element.dataset.revealed='true';else observer.observe(element);
    });
    return()=>{observer.disconnect();animations.forEach(animation=>animation.cancel());};
  },[enabled,pathname]);
  return null;
}
