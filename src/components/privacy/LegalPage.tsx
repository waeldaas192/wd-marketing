import Link from "next/link";
import type { ReactNode } from "react";
import { legal } from "@/data/legal";
import { CookieSettingsButton } from "./CookieSettingsButton";
import styles from "./LegalPage.module.css";
export function LegalPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return <section className={"legal-page " + styles.page}><div className="container">
    <p className="eyebrow">WD Marketing</p><h1>{title}</h1><p className="legal-date">Last updated: {legal.updated}</p>
    <p className={styles.intro}>{intro}</p>
    <nav className={styles.links} aria-label="Policies"><Link href="/privacy">Privacy policy</Link><Link href="/cookies">Cookie policy</Link><Link href="/terms">Website terms</Link><CookieSettingsButton/></nav>
    <div className={styles.content}>{children}</div>
    <aside className={styles.contact}><h2>Contact us</h2><p>{legal.tradingIdentity}<br/>Sole trader<br/><a href={"mailto:" + legal.email}>{legal.email}</a>{legal.correspondenceAddress && <><br/>{legal.correspondenceAddress}</>}</p></aside>
  </div></section>;
}
