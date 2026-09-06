"use client";

import { useEffect, useRef } from "react";
import styles from "./HeroAtmosphere.module.css";

type Wave = { x: number; y: number; start: number };
const CELL = 64;
const LIFE = 1450;

/** Draws the grid itself, not a spotlight on top of an unchanged grid. */
export function HeroRippleGrid({ enabled }: { enabled: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const scene = canvas?.closest<HTMLElement>("[data-hero-atmosphere]");
    const hero = canvas?.closest<HTMLElement>("[data-fluid-hero]");
    if (!canvas || !scene || !hero || !enabled) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let width = 0, height = 0, ratio = 1, frame = 0, last = 0;
    let waves: Wave[] = [];
    let lastWave = 0;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, strength: 0, target: 0 };

    function draw(now: number) {
      if (!context || !canvas) return;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      context.beginPath();
      let maximum = 0;
      const vertex = (x: number, y: number, move: boolean) => {
        const dx = x - pointer.x, dy = y - pointer.y;
        const distance = Math.max(1, Math.hypot(dx, dy));
        const field = 12 * pointer.strength * Math.exp(-((distance / 155) ** 2));
        let ox = dx / distance * field, oy = dy / distance * field;
        for (const wave of waves) {
          const wx = x - wave.x, wy = y - wave.y;
          const d = Math.max(1, Math.hypot(wx, wy));
          const age = now - wave.start;
          const ring = d - (20 + age * .22);
          const envelope = Math.exp(-((ring / 62) ** 2)) * (1 - age / LIFE) ** 2;
          const force = Math.sin(ring / 22) * envelope * 9;
          ox += wx / d * force; oy += wy / d * force;
        }
        ox = Math.max(-18, Math.min(18, ox)); oy = Math.max(-18, Math.min(18, oy));
        maximum = Math.max(maximum, Math.hypot(ox, oy));
        if (move) context.moveTo(x + ox, y + oy); else context.lineTo(x + ox, y + oy);
      };
      // One batched stroke; 16px samples keep the curves soft without a physics library.
      for (let x = 0; x <= width + CELL; x += CELL) {
        for (let y = -24; y <= height + 24; y += 16) vertex(x, y, y === -24);
      }
      for (let y = 0; y <= height + CELL; y += CELL) {
        for (let x = -24; x <= width + 24; x += 16) vertex(x, y, x === -24);
      }
      context.lineWidth = .85;
      context.strokeStyle = "rgba(125, 143, 207, 0.24)";
      context.stroke();
      canvas.dataset.displacement = maximum.toFixed(2);
    }
    function tick(now: number) {
      frame = 0;
      const dt = Math.min(34, now - (last || now - 16)); last = now;
      const ease = 1 - Math.exp(-dt / 95);
      pointer.x += (pointer.tx - pointer.x) * ease;
      pointer.y += (pointer.ty - pointer.y) * ease;
      pointer.strength += (pointer.target - pointer.strength) * ease;
      waves = waves.filter(wave => now - wave.start < LIFE);
      draw(now);
      const settling = Math.abs(pointer.tx - pointer.x) + Math.abs(pointer.ty - pointer.y) > .2
        || Math.abs(pointer.target - pointer.strength) > .002;
      if (waves.length || settling) frame = requestAnimationFrame(tick);
      else { last = 0; if (canvas) canvas.dataset.rippleState = "idle"; }
    }
    function wake() {
      if (!frame && fine.matches) { if (canvas) canvas.dataset.rippleState = "active"; frame = requestAnimationFrame(tick); }
    }
    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse" || !fine.matches || document.hidden || !canvas) return;
      const box = canvas.getBoundingClientRect();
      const x = event.clientX - box.left, y = event.clientY - box.top;
      if (!pointer.target && pointer.strength < .01) { pointer.x = x; pointer.y = y; }
      const moved = Math.hypot(x - pointer.tx, y - pointer.ty);
      pointer.tx = x; pointer.ty = y; pointer.target = 1;
      const now = performance.now();
      if (now - lastWave > 95 && moved > 5) {
        waves.push({ x, y, start: now }); waves = waves.slice(-6); lastWave = now;
      }
      wake();
    }
    function leave() { pointer.target = 0; wake(); }
    function resize() {
      if (!canvas || !scene) return;
      cancelAnimationFrame(frame); frame = 0; waves = []; last = 0;
      pointer.strength = 0; pointer.target = 0;
      const box = canvas.getBoundingClientRect(); width = box.width; height = box.height;
      ratio = Math.min(window.devicePixelRatio || 1, 1.75, Math.sqrt(3_000_000 / Math.max(1, width * height)));
      canvas.width = Math.max(1, Math.round(width * ratio)); canvas.height = Math.max(1, Math.round(height * ratio));
      scene.dataset.gridReady = fine.matches ? "true" : "false";
      canvas.dataset.rippleState = "idle";
      if (fine.matches) draw(performance.now());
    }
    const observer = new ResizeObserver(resize); observer.observe(canvas);
    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", leave);
    fine.addEventListener("change", resize);
    resize();
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      hero.removeEventListener("pointermove", move); hero.removeEventListener("pointerleave", leave);
      fine.removeEventListener("change", resize);
      scene.dataset.gridReady = "false";
      canvas.dataset.rippleState = "off"; canvas.dataset.displacement = "0";
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [enabled]);
  return <canvas ref={ref} className={styles.rippleGrid} aria-hidden="true" data-ripple-grid data-ripple-state="off" />;
}
