"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useMotionPreference } from "@/lib/motion-preferences";

// Motion stays transform-first so images and text never blink while entering.
// The page gets one subtle route entrance, then marked sections rise once on view.
export function PageMotion() {
  const pathname = usePathname();
  const { enabled } = useMotionPreference();

  useEffect(() => {
    const root = document.getElementById("main-content");
    if (!root || !enabled || !("IntersectionObserver" in window) || !Element.prototype.animate) return;

    const active = new Map<HTMLElement, Animation>();
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const routeAnimation = root.animate([
      {
        opacity: coarse ? 0.995 : 0.985,
        transform: coarse ? "translate3d(0,4px,0)" : "translate3d(0,8px,0) scale(.997)",
      },
      { opacity: 1, transform: "translate3d(0,0,0) scale(1)" },
    ], {
      id: "wd-route-enter",
      duration: coarse ? 300 : 460,
      easing: "cubic-bezier(.22,1,.36,1)",
      fill: "both",
    });

    const finish = (element: HTMLElement) => {
      active.get(element)?.cancel();
      active.delete(element);
      element.dataset.revealed = "true";
      element.dataset.revealState = "done";
    };

    const finishAll = () => {
      for (const element of active.keys()) finish(element);
    };

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        observer.unobserve(element);

        if (
          element.dataset.revealed === "true"
          || document.hidden
          || element.contains(document.activeElement)
        ) {
          finish(element);
          continue;
        }

        element.dataset.revealed = "true";
        element.dataset.revealState = "playing";
        const order = Math.max(0, Math.min(3, Number(element.dataset.revealOrder) || 0));

        const animation = element.animate([
          {
            transform: coarse
              ? "translate3d(0,8px,0)"
              : "translate3d(0,16px,0) scale(.994)",
          },
          { transform: "translate3d(0,0,0) scale(1)" },
        ], {
          id: "wd-section-reveal",
          duration: coarse ? 340 : 560,
          delay: coarse ? 0 : order * 55,
          easing: "cubic-bezier(.2,1.08,.32,1)",
          fill: "both",
        });

        active.set(element, animation);
        animation.finished
          .then(() => finish(element))
          .catch(() => { /* cancelled on focus, pause, route change or tab hiding */ });
      }
    }, { rootMargin: "0px 0px -28px 0px", threshold: 0 });

    for (const element of root.querySelectorAll<HTMLElement>("[data-reveal]")) {
      // Avoid stacked transforms when a parent and child are both marked.
      if (element.parentElement?.closest("[data-reveal]")) continue;
      if (element.dataset.revealed === "true" || element.getBoundingClientRect().top < window.innerHeight) {
        finish(element);
      } else {
        observer.observe(element);
      }
    }

    const focus = (event: FocusEvent) => {
      for (const element of active.keys()) {
        if (element.contains(event.target as Node)) finish(element);
      }
    };
    const visibility = () => {
      if (document.hidden) finishAll();
    };

    root.addEventListener("focusin", focus);
    document.addEventListener("visibilitychange", visibility);

    return () => {
      routeAnimation.cancel();
      observer.disconnect();
      finishAll();
      root.removeEventListener("focusin", focus);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [enabled, pathname]);

  return null;
}
