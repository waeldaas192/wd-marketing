/** Central timing/geometry for the visible connection bead. CSS pixels, not device pixels. */
export const JOURNEY_MOTION = {
  dwell: 900,
  transfer: 1800,
  returnTransfer: 2600,
  settle: 460,
  slide: 560,
} as const;
export type JourneyPoint = { x: number; y: number; size: number };
export type Position = { x: number; y: number };

/** An input port at the icon edge keeps the settled bead visible, not underneath its glyph. */
export function connectionPort(point: JourneyPoint, vertical: boolean): Position {
  const radius = point.size / 2 + 4;
  return { x: point.x - (vertical ? 0 : radius), y: point.y - (vertical ? radius : 0) };
}
const smooth = (t: number) => t * t * (3 - 2 * t);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

export function connectionFrames(from: JourneyPoint, to: JourneyPoint, vertical: boolean, returning: boolean): Keyframe[] {
  const start = connectionPort(from, vertical);
  const end = connectionPort(to, vertical);
  const radius = from.size / 2 + 4;
  // Release around the icon, never through the symbol. The longer return route
  // runs outside the row/column so the bead cannot disappear behind middle icons.
  return Array.from({ length: 81 }, (_, index) => {
    const t = index / 80;
    let x: number, y: number;
    if (returning) {
      const p = smooth(t);
      const arc = Math.sin(Math.PI * p) * (vertical ? 42 : 68);
      x = mix(start.x, end.x, p) - (vertical ? arc : 0);
      y = mix(start.y, end.y, p) - (vertical ? 0 : arc);
    } else if (t < .42) {
      const p = smooth(t / .42);
      const angle = vertical ? -Math.PI / 2 - Math.PI * p : Math.PI + Math.PI * p;
      x = from.x + Math.cos(angle) * radius;
      y = from.y + Math.sin(angle) * radius;
    } else {
      const u = (t - .42) / .58;
      // Slow drift, then a restrained magnetic pull. No speed jump at contact.
      const p = smooth(u);
      const release = { x: from.x + (vertical ? 0 : radius), y: from.y + (vertical ? radius : 0) };
      const arc = Math.sin(Math.PI * p) * 3;
      x = mix(release.x, end.x, p) - (vertical ? arc : 0);
      y = mix(release.y, end.y, p) - (vertical ? 0 : arc);
    }
    return { transform: `translate(${x}px,${y}px)`, opacity: 1, offset: t };
  });
}
