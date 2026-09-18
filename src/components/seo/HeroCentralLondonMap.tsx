import Image from "next/image";
import styles from "./HeroCentralLondonMap.module.css";

const areas = [
  { id: "marylebone", name: "Marylebone", left: "28%", top: "16%", delay: "0.30s", path: "M500 310 Q405 220 280 96" },
  { id: "mayfair", name: "Mayfair", left: "47%", top: "24%", delay: "0.48s", path: "M500 310 Q480 250 470 165" },
  { id: "westminster", name: "Westminster", left: "22%", top: "39%", delay: "0.66s", path: "M500 310 Q370 305 220 240" },
  { id: "soho", name: "Soho", left: "45%", top: "39%", delay: "0.84s", path: "M500 310 Q475 300 450 235" },
  { id: "covent-garden", name: "Covent Garden", left: "64%", top: "40%", delay: "1.02s", path: "M500 310 Q565 300 640 240" },
  { id: "holborn", name: "Holborn", left: "71%", top: "27%", delay: "1.20s", path: "M500 310 Q630 255 715 160" },
  { id: "city-of-london", name: "City of London", left: "82%", top: "49%", delay: "1.38s", path: "M500 310 Q700 310 820 295" },
  { id: "south-bank", name: "South Bank", left: "61%", top: "76%", delay: "1.56s", path: "M500 310 Q545 410 610 470" },
] as const;

export function HeroCentralLondonMap() {
  return (
    <div
      className={styles.card}
      aria-label="Animated Central London local search reach map"
    >
      <Image
        className={styles.mapImage}
        src="/images/local-seo-london/local-seo-london-hero.webp"
        alt="Stylised map of Central London used to illustrate local SEO reach"
        width={1344}
        height={752}
        sizes="(max-width: 760px) calc(100vw - 28px), (max-width: 1024px) calc(100vw - 40px), 640px"
        priority
      />

      <div className={styles.shade} aria-hidden="true" />

      <svg
        className={styles.routes}
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <filter id="wd-local-seo-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="wd-local-seo-hub" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8797ff" stopOpacity=".9" />
            <stop offset="55%" stopColor="#6575f6" stopOpacity=".34" />
            <stop offset="100%" stopColor="#6575f6" stopOpacity="0" />
          </radialGradient>
          <marker
            id="wd-local-seo-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="5"
            orient="auto"
          >
            <path d="M0 0 L10 5 L0 10 Z" fill="#8f9cff" />
          </marker>
        </defs>

        <circle className={styles.hubAura} cx="500" cy="310" r="92" fill="url(#wd-local-seo-hub)" />

        {areas.map((area) => (
          <g key={area.id} className={styles.routeGroup}>
            <path
              className={styles.routeBase}
              d={area.path}
              pathLength="1"
              style={{ animationDelay: area.delay }}
              markerEnd="url(#wd-local-seo-arrow)"
            />
            <path
              className={styles.routeFlow}
              d={area.path}
              pathLength="1"
              style={{ animationDelay: area.delay }}
            />
          </g>
        ))}

        <g className={styles.hubPin}>
          <circle className={styles.hubRing} cx="500" cy="310" r="24" />
          <circle className={styles.hubCore} cx="500" cy="310" r="8" />
        </g>
      </svg>

      <div className={styles.labels}>
        <div className={`${styles.pin} ${styles.centerPin}`} style={{ left: "50%", top: "52%" }}>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.label}>Central London</span>
        </div>

        {areas.map((area) => (
          <div
            key={area.id}
            className={styles.pin}
            data-area={area.id}
            style={{
              left: area.left,
              top: area.top,
              animationDelay: area.delay,
            }}
          >
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.label}>{area.name}</span>
          </div>
        ))}
      </div>

      <div className={styles.scan} aria-hidden="true" />
    </div>
  );
}
