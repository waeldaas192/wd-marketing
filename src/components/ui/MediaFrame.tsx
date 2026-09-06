"use client";
import Image from "next/image";
import { useState } from "react";
import type { MediaAsset } from "@/lib/media";
import styles from "./MediaFrame.module.css";

type Props = { asset: MediaAsset; label: string; fill?: boolean; priority?: boolean; sizes?: string; className?: string; contain?: boolean };
export function MediaFrame({ asset, label, fill = false, priority = false, sizes = "(max-width: 820px) calc(100vw - 40px), 680px", className = "", contain = false }: Props) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const ready = asset.ready && failedSrc !== asset.src;
  return <div className={`${styles.frame} ${fill ? styles.fill : ""} ${className}`} style={fill ? undefined : { aspectRatio: `${asset.width} / ${asset.height}` }} data-media-state={ready ? "image" : "placeholder"}>
    {ready ? <Image src={asset.src} alt={asset.alt} fill sizes={sizes} priority={priority} className={contain ? styles.contain : styles.cover} onError={() => setFailedSrc(asset.src)}/>
      : <div className={styles.placeholder} data-studio-placeholder role="img" aria-label={`${label}. Image will be added later.`}>
        <span className={styles.monogram} aria-hidden="true">WD</span><div className={styles.lines} aria-hidden="true"><i/><i/><i/></div>
        <div className={styles.caption}><strong>{label}</strong><span>Project imagery to follow</span></div>
      </div>}
  </div>;
}
