"use client";

import { useSyncExternalStore } from "react";

const storageKey = "wd-motion-preference";
const changeEvent = "wd:motion-preference";
const mediaQuery = "(prefers-reduced-motion: reduce)";

// Primitive snapshots remain stable between changes (required by useSyncExternalStore).
// Bits: 1 = system reduction, 2 = explicit pause, 4 = client preference initialised.
function snapshot(): number {
  if (typeof window === "undefined") return 1;
  const setting = document.documentElement.dataset.motion;
  return (window.matchMedia(mediaQuery).matches ? 1 : 0)
    | (setting === "paused" ? 2 : 0)
    | (setting === "paused" || setting === "running" ? 4 : 0);
}

function subscribe(notify: () => void) {
  const media = window.matchMedia(mediaQuery);
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });
  media.addEventListener("change", notify);
  window.addEventListener(changeEvent, notify);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", notify);
    window.removeEventListener(changeEvent, notify);
  };
}

export function initialiseMotionPreference() {
  // Preserve a choice already applied by another mounted component.
  const root = document.documentElement;
  if (root.dataset.motion === "paused" || root.dataset.motion === "running") return;
  let saved: string | null = null;
  try { saved = window.sessionStorage.getItem(storageKey); } catch { /* Storage can be disabled. */ }
  root.dataset.motion = saved === "paused" ? "paused" : "running";
  window.dispatchEvent(new Event(changeEvent));
}

export function toggleMotionPreference() {
  const next = document.documentElement.dataset.motion === "paused" ? "running" : "paused";
  document.documentElement.dataset.motion = next;
  try { window.sessionStorage.setItem(storageKey, next); } catch { /* The control still works without storage. */ }
  window.dispatchEvent(new Event(changeEvent));
}

export function useMotionPreference() {
  const value = useSyncExternalStore(subscribe, snapshot, () => 1);
  return {
    paused: Boolean(value & 2),
    reduced: Boolean(value & 1),
    enabled: Boolean(value & 4) && !(value & 3),
  };
}
