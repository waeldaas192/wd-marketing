// Server-only asset inspection: imported by server pages, never by client components.
import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { cache } from "react";
import placeholders from "@/data/placeholder-hashes.json";

export type MediaAsset = { src: string; alt: string; width: number; height: number; ready: boolean; originalSrc: string };
const fingerprints: Record<string, string> = placeholders;
const inspect = cache((src: string): { ready: boolean; version: string } => {
  // Only first-party asset paths from our data files may be inspected.
  if (!src.startsWith("/images/") || src.includes("..") || /[?#\\]/.test(src)) return { ready: false, version: "" };
  const file = path.join(process.cwd(), "public", src);
  try {
    const stat = statSync(file);
    if (!stat.isFile() || stat.size === 0 || stat.size > 20 * 1024 * 1024) return { ready: false, version: "" };
    const digest = createHash("sha256").update(readFileSync(file)).digest("hex");
    return { ready: digest !== fingerprints[src], version: digest.slice(0, 12) };
  } catch { return { ready: false, version: "" }; }
});
export function resolveMedia(asset: { src: string; alt: string; width: number; height: number }): MediaAsset {
  const status = inspect(asset.src);
  return { ...asset, ready: status.ready, originalSrc: asset.src, src: status.ready ? `${asset.src}?v=${status.version}` : asset.src };
}
