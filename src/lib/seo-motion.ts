// Illustrative values only. Not client results, a forecast or a ranking promise.
export const SEO_MOTION_DURATION = 13_000;
export const SEO_CHART = { left: 52, right: 628, top: 30, bottom: 268, max: 120_000 };
export const impressionSeries = [0, 2100, 4800, 4100, 11500, 16900, 15000, 28700, 36300, 33200, 53900, 70200, 65000, 93600, 102000, 120000];
export const clickSeries = [0, 40, 95, 83, 240, 365, 320, 625, 810, 735, 1260, 1730, 1590, 2390, 2680, 3200];

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const smooth = (value: number) => value * value * (3 - 2 * value);
function sample(values: number[], progress: number) {
  const position = clamp(progress) * (values.length - 1);
  const index = Math.min(values.length - 2, Math.floor(position));
  return values[index] + (values[index + 1] - values[index]) * (position - index);
}

export function chartPath(values: number[], max: number) {
  const { left, right, top, bottom } = SEO_CHART;
  return values.map((value, index) => `${index ? "L" : "M"}${left + index / (values.length - 1) * (right - left)},${bottom - value / max * (bottom - top)}`).join(" ");
}

export function seoMotionFrame(elapsed: number) {
  const progress = clamp((elapsed - 700) / 8500);
  const impressions = sample(impressionSeries, progress);
  const clicks = sample(clickSeries, progress);
  const { left, right, top, bottom, max } = SEO_CHART;
  const x = left + progress * (right - left);
  const y = bottom - impressions / max * (bottom - top);
  const index = Math.min(impressionSeries.length - 2, Math.floor(progress * (impressionSeries.length - 1)));
  const dx = (right - left) / (impressionSeries.length - 1);
  const dy = -(impressionSeries[index + 1] - impressionSeries[index]) / max * (bottom - top);
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;

  // Four separate overtakes: accelerate, lean, then settle at each result.
  const rankingTime = Math.max(0, elapsed - 1600);
  const step = Math.min(4, Math.floor(rankingTime / 1750));
  const travel = step === 4 ? 1 : clamp((rankingTime % 1750) / 1050);
  const position = step === 4 ? 0 : 4 - step - smooth(travel);
  const sway = step === 4 ? 0 : Math.sin(travel * Math.PI);
  return {
    progress, impressions: Math.round(impressions), clicks: Math.round(clicks),
    visibility: Math.round(progress * 82),
    averagePosition: progress === 0 ? "—" : (80 - progress * 76.8).toFixed(1),
    x, y, angle, phase: progress < .32 ? 0 : progress < .67 ? 1 : 2,
    position, rank: Math.min(5, Math.max(1, Math.round(position) + 1)),
    targetX: sway * 9, targetAngle: step === 4 ? 0 : sway * Math.sin(travel * Math.PI * 2) * 3,
    otherPositions: [0, 1, 2, 3].map(index => index + clamp(index + 1 - position)),
    searchProgress: clamp(elapsed / 1400), complete: position === 0,
  };
}
