import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import type { SeoImageAsset } from "@/data/seoImages";
import styles from "@/app/services/seo/seo.module.css";

// Server component: reserve dimensions even before photography is supplied.
// Asset paths come only from the trusted static manifest, never user input.
export function SeoImageSlot({ asset, number, priority = false }: {
  asset: SeoImageAsset; number: string; priority?: boolean;
}) {
  const available = existsSync(join(process.cwd(), "public", asset.src));
  return <div className={styles.imageSlot} style={{ aspectRatio: `${asset.width} / ${asset.height}` }}>
    {available ? <Image src={asset.src} alt={asset.alt} width={asset.width} height={asset.height}
      sizes="(max-width: 760px) calc(100vw - 28px), (max-width: 1024px) calc(100vw - 40px), 640px"
      priority={priority} className={styles.image} style={{ objectFit: asset.fit, objectPosition: asset.position }} />
      : <div className={styles.imagePlaceholder} role="img" aria-label={`Image space reserved for ${asset.label}`}>
        <span className={styles.placeholderIndex} aria-hidden="true">{number}</span>
        <div className={styles.placeholderCentre} aria-hidden="true"><span>Image reserved</span><strong>{asset.label}</strong><small>{asset.width} × {asset.height} · WebP</small></div>
        <span className={styles.placeholderFilename} aria-hidden="true">{asset.src.split("/").pop()}</span>
      </div>}
  </div>;
}
