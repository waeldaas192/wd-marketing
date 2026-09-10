"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useMotionPreference } from "@/lib/motion-preferences";
import { chartPath, clickSeries, impressionSeries, SEO_CHART, SEO_MOTION_DURATION, seoMotionFrame } from "@/lib/seo-motion";
import styles from "./SeoGrowthMotion.module.css";

const line = chartPath(impressionSeries, SEO_CHART.max);
const clicksLine = chartPath(clickSeries, 4800);
const area = `${line} L${SEO_CHART.right},${SEO_CHART.bottom} L${SEO_CHART.left},${SEO_CHART.bottom} Z`;
const phases = ["Build the foundations", "Find momentum", "Grow visibility"];
const finalFrame = seoMotionFrame(10_000);
const numberFormat = new Intl.NumberFormat("en-GB");

function ControlIcon({ name }: { name: "play" | "pause" | "replay" }) {
  return <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === "pause" ? <path d="M7 4v12M13 4v12" /> : name === "play" ? <path d="m6 3 10 7-10 7Z" /> : <><path d="M4 7a6.5 6.5 0 1 1-.3 5M4 3v4h4" /></>}
  </svg>;
}

function SearchIcon() {
  return <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="8" cy="8" r="5" /><path d="m12 12 5 5" /></svg>;
}

function ResultLines({ target = false }: { target?: boolean }) {
  return <>
    <div className={styles.resultIdentity}><span className={styles.favicon} /><i /></div>
    <span className={styles.resultTitle} />
    <span className={styles.resultDescription} />
    <span className={styles.resultDescriptionShort} />
    {target && <span className={styles.targetCheck}>✓</span>}
  </>;
}

export function SeoGrowthMotion() {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const root = useRef<HTMLElement>(null);
  const elapsed = useRef(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const { enabled, reduced, paused } = useMotionPreference();
  const motionAllowed = enabled && !reduced && !paused;
  const running = motionAllowed && playing && inView && visible;

  // Cache DOM handles once per mount: animation never re-renders the React tree.
  const paint = useRef<(milliseconds: number) => void>(() => {});
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const clip = element.querySelector<SVGRectElement>("[data-chart-clip]");
    const marker = element.querySelector<SVGGElement>("[data-chart-marker]");
    const cursor = element.querySelector<SVGLineElement>("[data-chart-cursor]");
    const metrics = Array.from(element.querySelectorAll<HTMLElement>("[data-seo-metric]"));
    const stageNodes = Array.from(element.querySelectorAll<HTMLElement>("[data-seo-stage]"));
    const competitors = Array.from(element.querySelectorAll<HTMLElement>("[data-search-result]"));
    const target = element.querySelector<HTMLElement>("[data-search-target]");
    const rank = element.querySelector<HTMLElement>("[data-search-rank]");
    const searchLine = element.querySelector<HTMLElement>("[data-search-query]");
    const searchFill = element.querySelector<HTMLElement>("[data-search-fill]");
    const stageLabel = element.querySelector<HTMLElement>("[data-stage-label]");
    const caption = element.querySelector<HTMLElement>("[data-rank-caption]");
    paint.current = milliseconds => {
      const frame = seoMotionFrame(milliseconds);
      clip?.setAttribute("width", String(frame.x - SEO_CHART.left + 1));
      marker?.setAttribute("transform", `translate(${frame.x} ${frame.y}) rotate(${frame.angle})`);
      cursor?.setAttribute("x1", String(frame.x));
      cursor?.setAttribute("x2", String(frame.x));
      cursor?.setAttribute("y1", String(frame.y));
      const values = [numberFormat.format(frame.impressions), numberFormat.format(frame.clicks), `${frame.visibility}%`, frame.averagePosition];
      metrics.forEach((node, index) => { if (node.textContent !== values[index]) node.textContent = values[index]; });
      stageNodes.forEach((node, index) => { node.dataset.active = String(index === frame.phase); node.dataset.reached = String(index <= frame.phase); });
      if (stageLabel) stageLabel.textContent = phases[frame.phase];
      if (target) target.style.transform = `translate(${frame.targetX}px, ${frame.position * 76}px) rotate(${frame.targetAngle}deg)`;
      competitors.forEach((node, index) => { node.style.transform = `translateY(${frame.otherPositions[index] * 76}px)`; });
      if (rank) rank.textContent = `0${frame.rank}`;
      if (caption) caption.textContent = frame.complete ? "A place to be discovered." : "Moving into view.";
      if (searchLine) searchLine.style.transform = `scaleX(${frame.searchProgress})`;
      if (searchFill) searchFill.style.transform = `scaleX(${frame.searchProgress})`;
      element.dataset.complete = String(frame.complete);
    };
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .12 });
    observer.observe(element);
    const onVisibility = () => setVisible(!document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", onVisibility); paint.current = () => {}; };
  }, []);

  // Static, completed frames are the SSR / no-JS / reduced-motion fallback.
  useEffect(() => {
    if (reduced) paint.current(10_000);
    else if (motionAllowed) paint.current(elapsed.current);
  }, [motionAllowed, reduced]);

  useEffect(() => {
    if (!running) return;
    let frameId = 0;
    let last = 0;
    const tick = (now: number) => {
      if (last) elapsed.current = (elapsed.current + Math.min(now - last, 64)) % SEO_MOTION_DURATION;
      last = now;
      paint.current(elapsed.current);
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [running]);

  const replay = useCallback(() => {
    if (!motionAllowed) return;
    elapsed.current = 0;
    paint.current(0);
    setPlaying(true);
  }, [motionAllowed]);

  return <section className={styles.section} ref={root} id="seo-growth" aria-labelledby={`${id}-title`} data-seo-motion data-complete="true">
    <div className="container">
      <div className={styles.heading}>
        <div><p className={styles.kicker}>The search journey</p><h2 id={`${id}-title`}>Small beginnings.<br /><span>Greater possibilities.</span></h2></div>
        <div className={styles.headingRight}>
          <p>Build a stronger search presence, one focused improvement at a time.</p>
          <div className={styles.controls}>
            <button type="button" onClick={() => setPlaying(value => !value)} disabled={!motionAllowed} aria-label={playing ? "Pause SEO animations" : "Play SEO animations"}><ControlIcon name={playing ? "pause" : "play"} /><span>{reduced ? "Reduced motion" : paused ? "Motion paused" : playing ? "Pause" : "Play"}</span></button>
            <button type="button" onClick={replay} disabled={!motionAllowed} aria-label="Replay SEO growth journey"><ControlIcon name="replay" /><span>Replay</span></button>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        <figure className={styles.chartCard} aria-labelledby={`${id}-chart-title`} aria-describedby={`${id}-disclaimer`}>
          <figcaption className={styles.cardHeader}><strong id={`${id}-chart-title`}>Organic search growth</strong><span>Illustrative data</span></figcaption>
          <div className={styles.chartBody} aria-hidden="true">
            <div className={styles.metrics}>
              {[{ label: "Impressions", value: "120,000", colour: "violet" }, { label: "Clicks", value: "3,200", colour: "blue" }, { label: "Visibility", value: "82%", colour: "teal" }, { label: "Avg. position", value: "3.2", colour: "indigo" }].map(metric => <div className={styles.metric} key={metric.label} data-colour={metric.colour}><span>{metric.label}</span><strong data-seo-metric>{metric.value}</strong></div>)}
            </div>
            <div className={styles.chartTop}><span className={styles.legend}><i />Impressions (left)<i />Clicks (right)</span><span data-stage-label>{phases[2]}</span></div>
            <div className={styles.chartFrame}>
            <div className={styles.axisScale}>{[120000, 80000, 40000, 0].map(value => <span key={value} style={{ top: `${(SEO_CHART.bottom - value / SEO_CHART.max * (SEO_CHART.bottom - SEO_CHART.top)) / 284 * 100}%` }}>{value ? `${value / 1000}k` : "0"}</span>)}</div>
            <div className={`${styles.axisScale} ${styles.axisScaleRight}`}>{[4800, 3200, 1600, 0].map(value => <span key={value} style={{ top: `${(SEO_CHART.bottom - value / 4800 * (SEO_CHART.bottom - SEO_CHART.top)) / 284 * 100}%` }}>{value ? `${value / 1000}k` : "0"}</span>)}</div>
            <svg className={styles.chart} viewBox="40 0 624 284" focusable="false">
              <defs>
                <linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7060ed" stopOpacity=".23" /><stop offset="100%" stopColor="#7060ed" stopOpacity="0" /></linearGradient>
                <linearGradient id={`${id}-line`} x1="0" y1="0" x2="1" y2="0"><stop stopColor="#8186f8" /><stop offset="100%" stopColor="#514cf3" /></linearGradient>
                <clipPath id={`${id}-clip`}><rect data-chart-clip x={SEO_CHART.left} y="12" width="578" height="260" /></clipPath>
              </defs>
              {[0, 40000, 80000, 120000].map(value => {
                const y = SEO_CHART.bottom - value / SEO_CHART.max * (SEO_CHART.bottom - SEO_CHART.top);
                return <line key={value} className={styles.gridLine} x1={SEO_CHART.left} x2={SEO_CHART.right} y1={y} y2={y} />;
              })}
              <g clipPath={`url(#${id}-clip)`}>
                <path d={area} fill={`url(#${id}-area)`} />
                <path d={clicksLine} className={styles.clickLine} />
                <path d={line} stroke={`url(#${id}-line)`} className={styles.impressionLine} />
              </g>
              <line data-chart-cursor x1={finalFrame.x} x2={finalFrame.x} y1={finalFrame.y} y2={SEO_CHART.bottom} className={styles.cursor} />
              <g data-chart-marker transform={`translate(${finalFrame.x} ${finalFrame.y}) rotate(${finalFrame.angle})`}>
                <circle r="15" className={styles.markerHalo} /><circle r="8" className={styles.markerCore} />
                <path d="m-3-4 4 4-4 4M-5 0h6" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
            </div>
            <div className={styles.chartXAxis}><span>Starting point</span><span>Consistent improvement →</span></div>
            <ol className={styles.stages}>{phases.map((phase, index) => <li key={phase} data-seo-stage data-active={index === 2} data-reached="true"><span>0{index + 1}</span><p>{phase}</p></li>)}</ol>
          </div>
          <p className={styles.srOnly}>An illustrative chart starts at zero and rises, with some dips, to show a possible search growth journey. It does not represent actual client data.</p>
        </figure>

        <figure className={styles.searchCard} aria-labelledby={`${id}-search-title`} aria-describedby={`${id}-disclaimer`}>
          <figcaption className={styles.cardHeader}><strong id={`${id}-search-title`}>Move into view</strong><span>Search concept</span></figcaption>
          <div className={styles.phoneScene} aria-hidden="true">
            <div className={styles.phone}>
              <div className={styles.phoneTop}><span>9:41</span><i /><span className={styles.phoneStatus}>▮▮▮ ▰</span></div>
              <div className={styles.searchBrand}>Google</div>
              <div className={styles.searchBar}><SearchIcon /><span className={styles.queryTrack}><i data-search-query /></span><span className={styles.searchSpark}>✦</span></div>
              <div className={styles.searchTabs}><span>All</span><span>Images</span><span>Maps</span><span>More</span></div>
              <div className={styles.searchLoading}><i data-search-fill /></div>
              <div className={styles.resultList}>
                {[0, 1, 2, 3].map(index => <div data-search-result className={styles.result} key={index} style={{ transform: `translateY(${(index + 1) * 76}px)` }}><ResultLines /></div>)}
                <div className={`${styles.result} ${styles.target}`} data-search-target><ResultLines target /></div>
              </div>
              <div className={styles.phoneBottom} />
            </div>
            <div className={styles.rankBadge}><span>Search position</span><strong><small>#</small><span data-search-rank>01</span></strong><span className={styles.rankFootnote}>Illustrative target</span></div>
          </div>
          <div className={styles.searchCaption}><span className={styles.captionMark}>↗</span><p data-rank-caption>A place to be discovered.</p></div>
          <p className={styles.srOnly}>A mobile search illustration shows an anonymous highlighted result moving from fifth to first position. All result titles and descriptions are represented by lines, not real websites.</p>
        </figure>
      </div>
      <p className={styles.disclaimer} id={`${id}-disclaimer`}>Illustrative SEO growth journey — not client results or a forecast. Rankings, timeframes and outcomes vary; first place is not guaranteed.</p>
    </div>
  </section>;
}
