"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useMotionPreference } from "@/lib/motion-preferences";

// One observer; server-rendered content is never hidden waiting for JavaScript.
export function PageMotion() {
  const pathname = usePathname();
  const { enabled } = useMotionPreference();
  useEffect(() => {
    const root = document.getElementById("main-content");
    if (!root || !enabled || !("IntersectionObserver" in window) || !Element.prototype.animate) return;
    const active = new Map<HTMLElement, Animation>();
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const finish = (element: HTMLElement) => {
      active.get(element)?.cancel();
      active.delete(element);
      element.dataset.revealed = "true";
      element.dataset.revealState = "done";
    };
    const finishAll = () => { for (const element of active.keys()) finish(element); };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        observer.unobserve(element);
        if (element.dataset.revealed === "true" || document.hidden || element.contains(document.activeElement)) { finish(element); continue; }
        element.dataset.revealed = "true";
        element.dataset.revealState = "playing";
        const order = Math.max(0, Math.min(3, Number(element.dataset.revealOrder) || 0));
        // Preserve full text contrast, not a .45 opacity fade over readable text.
        const animation = element.animate([
          { transform: `translateY(${coarse ? 10 : 20}px)` },
          { transform: "none" },
        ], { id: "wd-section-reveal", duration: coarse ? 380 : 640, delay: coarse ? 0 : order * 65, easing: "cubic-bezier(.16,1,.3,1)", fill: "both" });
        active.set(element, animation);
        animation.finished.then(() => finish(element)).catch(() => { /* cancelled on focus, pause, route change or tab hiding */ });
      }
    }, { rootMargin: "0px 0px -32px 0px", threshold: 0 });
    for (const element of root.querySelectorAll<HTMLElement>("[data-reveal]")) {
      // Avoid double transforms when a section and its children are both marked.
      if (element.parentElement?.closest("[data-reveal]")) continue;
      if (element.dataset.revealed === "true" || element.getBoundingClientRect().top < window.innerHeight) finish(element);
      else observer.observe(element);
    }
    const focus = (event: FocusEvent) => { for (const element of active.keys()) if (element.contains(event.target as Node)) finish(element); };
    const visibility = () => { if (document.hidden) finishAll(); };
    root.addEventListener("focusin", focus);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      finishAll();
      root.removeEventListener("focusin", focus);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [enabled, pathname]);
  return null;
}
