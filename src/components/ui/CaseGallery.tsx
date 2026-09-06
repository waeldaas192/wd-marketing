"use client";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { MediaAsset } from "@/lib/media";
import { MediaFrame } from "./MediaFrame";
import styles from "./CaseGallery.module.css";
export function CaseGallery({ images, project }: { images: MediaAsset[]; project: string }) {
  const available = images.filter(image => image.ready);
  const [active, setActive] = useState<number | null>(null);
  const [zoom, setZoom] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const current = active === null ? null : available[active];
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active === null) { if (dialog.open) dialog.close(); return; }
    const previous = document.body.style.overflow;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [active]);
  useEffect(() => () => { if (dialogRef.current?.open) dialogRef.current.close(); }, []);
  const close = () => { setActive(null); setZoom(false); };
  function move(delta: number) { setActive(value => value === null ? null : (value + delta + available.length) % available.length); setZoom(false); }
  function keyboard(event: KeyboardEvent<HTMLDialogElement>) {
    if (!zoom && event.key === "ArrowRight") { event.preventDefault(); move(1); }
    if (!zoom && event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
    if (event.key === "Tab") {
      const buttons = [...event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not([disabled])')].filter(el => el.getClientRects().length > 0);
      const first = buttons[0], last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  }
  return <>
    <div className={styles.grid} data-case-gallery>{images.map((image,index) => <figure key={image.originalSrc} className={styles.item}>
      {image.ready ? <button type="button" className={styles.preview} aria-label={`Enlarge image ${index+1}: ${image.alt}`} onClick={event => { opener.current = event.currentTarget; setActive(available.findIndex(item => item.src === image.src)); }}><MediaFrame asset={image} label={project}/><span className={styles.enlarge} aria-hidden="true">Enlarge ↗</span></button> : <MediaFrame asset={image} label={`${project} / ${String(index+1).padStart(2,"0")}`}/>}
      <figcaption>{image.alt}</figcaption>
    </figure>)}</div>
    <dialog ref={dialogRef} className={styles.dialog} aria-label={`${project} image gallery`} onKeyDown={keyboard} onCancel={event => { event.preventDefault(); close(); }} onClose={() => { close(); opener.current?.focus(); }}>
      <div className={styles.toolbar}><span role="status">{active === null ? "" : `${active+1} / ${available.length}`}</span><div><button type="button" onClick={() => setZoom(value => !value)} aria-pressed={zoom}>{zoom ? "Fit image" : "Zoom image"}</button><button type="button" onClick={close}>Close gallery</button></div></div>
      <div className={styles.viewport}>{current && <div className={`${styles.canvas} ${zoom ? styles.zoom : ""}`}><MediaFrame key={current.src} asset={current} label={project} sizes="100vw" contain/></div>}</div>
      <div className={styles.controls}><button type="button" onClick={() => move(-1)} disabled={available.length < 2} aria-label="Previous image">← Previous</button><p>{current?.alt}</p><button type="button" onClick={() => move(1)} disabled={available.length < 2} aria-label="Next image">Next →</button></div>
    </dialog>
  </>;
}
